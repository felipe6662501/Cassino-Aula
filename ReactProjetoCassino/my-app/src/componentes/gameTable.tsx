import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';

interface CardObject {
  name: string;  // "A", "2", "J", "K", etc.
  value: number; // 1, 2, 10, 11, etc. (Calculado pelo Back)
}

interface GameTableProps {
  onBackToHome: () => void;
}

// Componente Visual da Carta adaptado para a nova assinatura
function PlayingCard({ card, isHidden }: { card: CardObject; isHidden?: boolean }) {
  // Se a carta estiver oculta, renderiza o verso estilizado
  if (isHidden) {
    return (
      <div 
        className="bg-red-700 text-white border-round shadow-4 flex align-items-center justify-content-center m-1 select-none animate-fadein"
        style={{ 
          width: '70px', 
          height: '100px', 
          border: '2px solid #fff',
          boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)'
        }}
      >
        <div className="text-xl font-bold opacity-50">🎰</div>
      </div>
    );
  }

  const suits = ['♠', '♥', '♦', '♣'];
  const suitIndex = (card.name.charCodeAt(0) || 0) % 4;
  const suit = suits[suitIndex];
  const isRed = suit === '♥' || suit === '♦';

  return (
    <div 
      className="bg-white text-black border-round shadow-4 flex flex-column justify-content-between p-2 m-1 select-none animate-fadein"
      style={{ 
        width: '70px', 
        height: '100px', 
        border: '1px solid #ccc',
        color: isRed ? '#d32f2f' : '#1a1a1a',
        fontFamily: 'monospace'
      }}
    >
      <div className="text-left font-bold text-lg leading-none">{card.name}</div>
      <div className="text-center text-3xl my-auto">{suit}</div>
      <div className="text-right font-bold text-lg leading-none" style={{ transform: 'rotate(180deg)' }}>{card.name}</div>
    </div>
  );
}

export function GameTable({ onBackToHome }: GameTableProps) {
  // 2. ESTADOS ATUALIZADOS PARA TRABALHAR COM OBJETOS
  const [playerCards, setPlayerCards] = useState<CardObject[]>([]);
  const [dealerCards, setDealerCards] = useState<CardObject[]>([]);
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [dealerScore, setDealerScore] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<string>('Sua vez! Pede ou Para?');
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [playerWins, setPlayerWins] = useState<number>(0);
  const [dealerWins, setDealerWins] = useState<number>(0);

  // SIMULAÇÃO DO BACK-END: Essa lista reflete o seu HashMap do Java
  const mockDeck = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  // Função provisória que simula as regras do seu arquivo Cards.java
  const simulateBackEndDraw = (currentHand: CardObject[]): CardObject => {
    const randomName = mockDeck[Math.floor(Math.random() * mockDeck.length)];
    const currentScore = currentHand.reduce((sum, c) => sum + c.value, 0);
    
    let value = 0;

    // Regra do seu HashMap Java
    if (randomName === 'J' || randomName === 'Q' || randomName === 'K') {
      value = 10;
    } else if (randomName === 'A') {
      // Simula exatamente o seu método getAValue(handValue) do Java
      value = currentScore > 10 ? 1 : 11;
    } else {
      value = parseInt(randomName);
    }

    return { name: randomName, value: value };
  };

  // 3. CÁLCULO DE PONTOS (Baseado na propriedade .value enviada pelo modelo)
  useEffect(() => {
    const pSum = playerCards.reduce((sum, card) => sum + card.value, 0);
    const dSum = dealerCards.reduce((sum, card) => sum + card.value, 0);
    
    setPlayerScore(pSum);
    setDealerScore(dSum);

    if (pSum > 21) {
      setGameStatus('Você estourou os 21 pontos! O Dealer ganhou. ❌');
      setIsGameOver(true);
      setDealerWins(prev => prev + 1);
    }
  }, [playerCards, dealerCards]);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const card1 = simulateBackEndDraw([]);
    const card2 = simulateBackEndDraw([card1]);
  
    // Dealer agora inicia com DUAS cartas reais na mão
    const dealerCard1 = simulateBackEndDraw([]);
    const dealerCard2 = simulateBackEndDraw([dealerCard1]);

    setPlayerCards([card1, card2]);
    setDealerCards([dealerCard1, dealerCard2]); // Guarda as duas no estado
    setGameStatus('Nova rodada! Pede carta (Hit) ou Para (Stand)?');
    setIsGameOver(false);
    };

  const handleHit = () => {
    if (isGameOver) return;
    const newCard = simulateBackEndDraw(playerCards);
    setPlayerCards([...playerCards, newCard]);
  };

  const handleStand = () => {
    if (isGameOver) return;

    let currentDealerCards = [...dealerCards];
    let currentDealerScore = currentDealerCards.reduce((sum, c) => sum + c.value, 0);

    while (currentDealerScore < 17) {
      const newCard = simulateBackEndDraw(currentDealerCards);
      currentDealerCards.push(newCard);
      currentDealerScore += newCard.value;
    }

    setDealerCards(currentDealerCards);
    setIsGameOver(true);

    const finalPlayerScore = playerScore;
    
    if (currentDealerScore > 21) {
      setGameStatus('O Dealer estourou! Você ganhou! 🎉');
      setPlayerWins(prev => prev + 1);
    } else if (finalPlayerScore > currentDealerScore) {
      setGameStatus(`Você ganhou com ${finalPlayerScore} contra ${currentDealerScore}! 🏆`);
      setPlayerWins(prev => prev + 1);
    } else if (finalPlayerScore < currentDealerScore) {
      setGameStatus(`O Dealer ganhou com ${currentDealerScore} contra ${finalPlayerScore}. 🎴`);
      setDealerWins(prev => prev + 1);
    } else {
      setGameStatus(`Empate! Ambos ficaram com ${finalPlayerScore} pontos.`);
    }
  };

return (
    <div className="surface-card p-5 shadow-2 border-round text-center bg-green-800 text-white">
      {/* Topo com ações de navegação */}
      <div className="text-left mb-4 flex justify-content-between align-items-center">
        <Button icon="pi pi-arrow-left" label="Sair da Mesa" className="p-button-text text-white p-0" onClick={onBackToHome} />
        {isGameOver && <Button icon="pi pi-refresh" label="Jogar Novamente" severity="success" onClick={startNewGame} />}
      </div>

      <h1 className="text-3xl font-bold mb-2">Mesa de Black Jack 🃏</h1>

        {/* Placar de Vitórias com Estilo Inline Forçado */}
        <div className="flex justify-content-center align-items-center gap-3 mb-4 text-xl font-bold tracking-wide uppercase">
  
          {/* Box do Jogador (Fundo verde escuro, texto verde claro) */}
          <div 
            className="px-3 py-1 border-round-left border-1"
            style={{ backgroundColor: '#052e16', borderColor: '#15803d', color: '#4ade80' }}
          >
          Você: <span className="text-white text-2xl font-black ml-1">{playerWins}</span>
        </div>

        <div className="text-gray-400 font-medium text-sm">VS</div>

        {/* Box do Dealer (Fundo verde escuro, texto vermelho vivo) */}
        <div 
          className="px-3 py-1 border-round-right border-1"
          style={{ backgroundColor: '#052e16', borderColor: '#15803d', color: '#f87171' }}
        >
          Dealer: <span className="text-white text-2xl font-black ml-1">{dealerWins}</span>
        </div>
  
</div>

{/* Mensagem de Status continua aqui embaixo */}
<p className="bg-green-900 inline-block px-4 py-2 border-round font-medium mb-5 border-1 border-green-700 text-yellow-400">
  {gameStatus}
</p>

      {/* Grid das Mãos */}
      <div className="grid grid-nogutter justify-content-center gap-6 mb-5">
        
        {/* 1. MÃO DO DEALER */}
        <div className="bg-green-900 p-4 border-round min-w-18rem border-1 border-green-600 shadow-3 flex flex-column align-items-center">
          <h3 className="text-gray-300 text-sm uppercase font-bold mb-3">Mão do Dealer</h3>
          
          <div className="flex flex-wrap justify-content-center mb-3 min-h-7rem">
            {dealerCards.map((card, index) => {
              // Esconde a segunda carta (index 1) apenas enquanto o jogo não terminar
              const shouldHide = index === 1 && !isGameOver;
              return (
                <PlayingCard key={index} card={card} isHidden={shouldHide} />
              );
            })}
          </div>
          
          <span className="text-xs text-green-300 bg-green-950 px-2 py-1 border-round">
            {/* Se o jogo não acabou, mostra apenas os pontos da primeira carta para manter o suspense */}
            Pontos: {isGameOver ? dealerScore : (dealerCards[0]?.value || 0)}
          </span>
        </div>

        {/* 2. SUA MÃO (O jogador voltou para o lugar certo!) */}
        <div className="bg-green-900 p-4 border-round min-w-18rem border-1 border-green-600 shadow-3 flex flex-column align-items-center">
          <h3 className="text-gray-300 text-sm uppercase font-bold mb-3">Sua Mão</h3>
          
          <div className="flex flex-wrap justify-content-center mb-3 min-h-7rem">
            {playerCards.map((card, index) => (
              <PlayingCard key={index} card={card} />
            ))}
          </div>
          
          <span className="text-xs text-green-300 bg-green-950 px-2 py-1 border-round">
            Pontos: {playerScore}
          </span>
        </div>

      </div>

      {/* Botões de Decisão */}
      <div className="flex justify-content-center gap-3">
        <Button label="Pedir Carta (Hit)" severity="warning" className="font-bold px-4 py-2" onClick={handleHit} disabled={isGameOver} />
        <Button label="Parar (Stand)" severity="danger" className="font-bold px-4 py-2" onClick={handleStand} disabled={isGameOver} />
      </div>
    </div>
  );
}