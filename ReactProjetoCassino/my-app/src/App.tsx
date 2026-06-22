import React, { useState } from 'react';
import { Header } from './componentes/header';
import { Banner } from './componentes/banner';
import { HeroSection } from './componentes/heroSection';
import { GameTable } from './componentes/gameTable';
import { Footer } from './componentes/footer';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'game'>('home');

  return (
    <div className="min-h-screen flex flex-column bg-gray-50">
      <Header />
      
      <main className="flex-grow-1 p-4 max-w-7xl mx-auto w-full">
        {/* Renderização Caondicional */}
        {currentScreen === 'home' ? (
          <>
            <Banner /> 
            <HeroSection onPlayClick={() => setCurrentScreen('game')} />
          </>
        ) : (
          <GameTable onBackToHome={() => setCurrentScreen('home')} />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;