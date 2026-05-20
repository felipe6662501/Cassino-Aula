import { useState } from 'react';
import { Button } from 'primereact/button'; 

export function HeroSection() {
  const [balance] = useState(1000); 

  return (
    <div className="surface-card p-5 shadow-2 border-round text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Bem-vindo ao Cassino App 🎰</h1>
      <p className="text-gray-600 mb-5">O seu espaço de entretenimento digital focado em Black Jack.</p>
      
      {/* Caixa de Saldo com margem inferior para não colar no botão */}
      <div className="inline-block bg-green-100 text-green-800 font-bold px-4 py-3 border-round text-xl mb-5">
        Seu Saldo: ${balance}
      </div>

      {/* 2. O Botão de Ação do PrimeReact */}
      <div className="flex justify-content-center">
        <Button 
          label="Jogar Black Jack 🃏" 
          severity="success" 
          size="large" 
          rounded 
          raised 
          className="px-6 py-3 font-bold text-xl"
          onClick={() => alert('Em breve o jogo será iniciado!')}
        />
      </div>
    </div>
  );
}