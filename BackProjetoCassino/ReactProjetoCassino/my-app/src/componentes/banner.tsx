import { Galleria } from 'primereact/galleria';

export function Banner() {
  const images = [
    {
      itemImageSrc: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&w=1200&q=80',
      alt: 'Mesa de Jogo',
      title: 'Estratégia e Emoção'
    }
  ];

  const itemTemplate = (item: any) => {
    return (
        <div className="relative w-full overflow-hidden border-round shadow-4" style={{ height: '350px' }}>
            <img 
                src={item.itemImageSrc} 
                alt={item.alt} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
            />
            {/* Texto sobreposto na imagem (efeito escurecido para dar leitura) */}
            <div className="absolute top-0 left-0 w-full height-100 bg-black-alpha-50 flex flex-column justify-content-center p-5 border-round text-white h-full">
                <h2 className="text-4xl font-bold mb-2 text-yellow-400">Sinta a experiência de Las Vegas</h2>
                <p className="text-xl max-w-2xl text-gray-200">Desafie o dealer no clássico 21. Gráficos limpos, resposta rápida e diversão garantida.</p>
            </div>
        </div>
    );
  };

  return (
    <div className="mb-5">
      <Galleria 
        value={images} 
        responsiveOptions={[{ breakpoint: '1024px', numVisible: 1 }]} 
        numVisible={1} 
        item={itemTemplate} 
        showThumbnails={false} 
        showIndicators={false}
        circular
        autoPlay
        transitionInterval={4000}
      />
    </div>
  );
}