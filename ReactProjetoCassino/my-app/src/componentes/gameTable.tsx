import React, { useState, useEffect, useRef} from 'react';
import { Button } from 'primereact/button';

interface CardObject {
  name: string;  // "A", "2", "J", etc.
  value: number; // Calculado perfeitamente pelo Java
}

interface GameTableProps {
  onBackToHome: () => void;
}

function PlayingCard({ card, isHidden }: { card: CardObject; isHidden?: boolean }) {
  if (isHidden) {
    return (
      <div 
        className="bg-red-700 text-white border-round shadow-4 flex align-items-center justify-content-center m-1 select-none animate-fadein"
        style={{ width: '70px', height: '100px', border: '2px solid #fff', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)' }}
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
      style={{ width: '70px', height: '100px', border: '1px solid #ccc', color: isRed ? '#d32f2f' : '#1a1a1a', fontFamily: 'monospace' }}
    >
      <div className="text-left font-bold text-lg leading-none">{card.name}</div>
      <div className="text-center text-3xl my-auto">{suit}</div>
      <div className="text-right font-bold text-lg leading-none" style={{ transform: 'rotate(180deg)' }}>{card.name}</div>
    </div>
  );
}

export function GameTable({ onBackToHome }: GameTableProps) {
  const [playerCards, setPlayerCards] = useState<CardObject[]>([]);
  const [dealerCards, setDealerCards] = useState<CardObject[]>([]);
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [dealerScore, setDealerScore] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<string>('Carregando mesa...');
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  
  // Placar local mantido e persistido entre rodadas
  const [playerWins, setPlayerWins] = useState<number>(0);
  const [dealerWins, setDealerWins] = useState<number>(0);

  // URL Base do seu servidor Spring Boot
  const API_URL = 'http://localhost:8080/api/blackjack';

  // Função auxiliar para processar e atualizar as respostas do Java
  // Substitua a antiga "class ResponseProcessor" por esta função simples:
  // Função auxiliar explícita para processar as respostas do Java
  const processResponse = (data: any) => {
    // Log temporário: Abra o console do navegador (F12) se precisar ver exatamente o JSON
    console.log("Dados recebidos do Java:", data);

    setPlayerCards(data.playerCards || []);
    setDealerCards(data.dealerCards || []);
    setPlayerScore(data.playerScore ?? 0);
    
    // Aceita tanto dealerScore quanto dScore se o Java mudar
    setDealerScore(data.dealerScore ?? 0);
    
    // CORREÇÃO CRUCIAL: Mapeia 'gameOver' (padrão do Jackson) ou 'isGameOver'
    const gameOverStatus = data.gameOver !== undefined ? data.gameOver : data.isGameOver;
    setIsGameOver(!!gameOverStatus);
    
    setGameStatus(data.gameStatus || '');

    if (gameOverStatus) {
      const status = data.gameStatus || '';
      if (status.includes("Você ganhou") || status.includes("O Dealer estourou") || status.includes("Blackjack")) {
        setPlayerWins(prev => prev + 1);
      } else if (status.includes("Dealer ganhou") || status.includes("Você estourou")) {
        setDealerWins(prev => prev + 1);
      }
    }
  };

  // Garanta que suas funções de clique usem a nova função simplificada 'processResponse':
  const startNewGame = async () => {
    try {
      const response = await fetch(`${API_URL}/start`, { method: 'POST' });
      const data = await response.json();
      processResponse(data);
    } catch (error) {
      setGameStatus('Erro ao conectar com o Servidor Java ❌');
    }
  };

  const handleHit = async () => {
    if (isGameOver) return;
    try {
      const response = await fetch(`${API_URL}/hit`, { method: 'POST' });
      const data = await response.json();
      processResponse(data);
    } catch (error) {
      setGameStatus('Erro de conexão ao pedir carta ❌');
    }
  };

  const handleStand = async () => {
    if (isGameOver) return;
    try {
      const response = await fetch(`${API_URL}/stand`, { method: 'POST' });
      const data = await response.json();
      processResponse(data);
    } catch (error) {
      setGameStatus('Erro de conexão ao parar ❌');
    }
  };

  // Inicia o jogo automaticamente assim que entra na mesa
  const hasInitialized = useRef(false);

  useEffect(() => {
  if (hasInitialized.current) return; // Se já rodou uma vez, bloqueia a segunda
    hasInitialized.current = true;

    startNewGame();
  }, []);

  return (
    <div className="surface-card p-5 shadow-2 border-round text-center bg-green-800 text-white">
      <div className="text-left mb-4 flex justify-content-between align-items-center">
        <Button icon="pi pi-arrow-left" label="Sair da Mesa" className="p-button-text text-white p-0" onClick={onBackToHome} />
        {isGameOver && <Button icon="pi pi-refresh" label="Jogar Novamente" severity="success" onClick={startNewGame} />}
      </div>

      <h1 className="text-3xl font-bold mb-2">Mesa de Black Jack 🃏</h1>

      {/* Placar de Vitórias */}
      <div className="flex justify-content-center align-items-center gap-3 mb-4 text-xl font-bold tracking-wide uppercase">
        <div className="px-3 py-1 border-round-left border-1" style={{ backgroundColor: '#052e16', borderColor: '#15803d', color: '#4ade80' }}>
          Você: <span className="text-white text-2xl font-black ml-1">{playerWins}</span>
        </div>
        <div className="text-gray-400 font-medium text-sm">VS</div>
        <div className="px-3 py-1 border-round-right border-1" style={{ backgroundColor: '#052e16', borderColor: '#15803d', color: '#f87171' }}>
          Dealer: <span className="text-white text-2xl font-black ml-1">{dealerWins}</span>
        </div>
      </div>

      {/* Mensagem de Status */}
      <p className="bg-green-900 inline-block px-4 py-2 border-round font-medium mb-5 border-1 border-green-700 text-yellow-400">
        {gameStatus}
      </p>

      {/* Grid das Mãos */}
      <div className="grid grid-nogutter justify-content-center gap-6 mb-5">
        {/* MÃO DO DEALER */}
        <div className="bg-green-900 p-4 border-round min-w-18rem border-1 border-green-600 shadow-3 flex flex-column align-items-center">
          <h3 className="text-gray-300 text-sm uppercase font-bold mb-3">Mão do Dealer</h3>
          <div className="flex flex-wrap justify-content-center mb-3 min-h-7rem">
            {dealerCards.map((card, index) => {
              const shouldHide = index === 1 && !isGameOver;
              return <PlayingCard key={index} card={card} isHidden={shouldHide} />;
            })}
          </div>
          <span className="text-xs text-green-300 bg-green-950 px-2 py-1 border-round">
            {/* Se o jogo acabou, mostra o dealerScore total vindo do Java. Se não, mostra o valor da primeira carta exposta */}
            Pontos: {isGameOver ? dealerScore : (dealerCards[0]?.name === 'A' ? 11 : (dealerCards[0]?.value === 1 ? 11 : (dealerCards[0]?.value || 0)))}
          </span>
        </div>

        {/* SUA MÃO */}
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