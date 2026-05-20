import { useState } from 'react';
import { Header } from './componentes/header';
import { HeroSection } from './componentes/heroSection';
import { Banner } from './componentes/banner';
import { Footer } from './componentes/footer';
import './App.css';

function App() {
  return (
    <div className="min-h-screen flex flex-column bg-gray-50">
      {/* 1. Seu topo */}
      <Header />
      
      {/* 2. Seu centro */}
      <main className="flex-grow-1 p-4 max-w-7xl mx-auto w-full">
        <Banner />

        <HeroSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;