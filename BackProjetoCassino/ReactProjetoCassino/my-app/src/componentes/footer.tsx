export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6 mt-8 border-top-1 border-gray-800">
      <div className="max-w-7xl mx-auto px-4 w-full">
        
        {/* Grid de Conteúdo */}
        <div className="grid grid-nogutter md:flex justify-content-between align-items-center pb-4 border-bottom-1 border-gray-800">
          
          {/* Lado Esquerdo: Logo e Direitos */}
          <div className="col-12 md:col-6 text-center md:text-left mb-4 md:mb-0">
            <span className="font-bold text-xl text-white block mb-2">🎰 Casino App</span>
            <p className="text-sm m-0">&copy; 2026 Casino App. Todos os direitos reservados.</p>
          </div>

          {/* Lado Direito: Selos de Confiança e Avisos */}
          <div className="col-12 md:col-6 flex justify-content-center md:justify-content-end gap-4 align-items-center">
            <span className="text-xs border-1 border-gray-600 px-2 py-1 border-round font-bold text-gray-300">
              🔞 JOGO RESPONSÁVEL
            </span>
            <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 border-round">
              +18
            </span>
          </div>
          
        </div>

        {/* Texto de Aviso de Isenção lá embaixo */}
        <div className="pt-4 text-center">
          <p className="text-xs text-gray-600 max-w-3xl mx-auto m-0">
            Aviso: Este é um projeto de demonstração acadêmica focado no jogo Black Jack. 
            Não há apostas com dinheiro real, depósitos ou pagamentos envolvidos neste site. 
            Divirta-se com responsabilidade.
          </p>
        </div>

      </div>
    </footer>
  );
}