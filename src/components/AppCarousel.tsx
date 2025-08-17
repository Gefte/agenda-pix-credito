import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '@/lib/utils';

interface AppScreen {
  id: string;
  title: string;
  design: string;
}

const PhoneFrame = ({ children }: { children: React.ReactNode }) => (
  <div className="relative mx-auto w-[375px] h-[750px]">
    <div className="absolute inset-0 bg-gray-900 rounded-[3rem] shadow-xl border-[14px] border-gray-900">
      <div className="absolute top-0 inset-x-0 h-6 bg-gray-900 rounded-t-2xl">
        <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-800 rounded-full"></div>
      </div>
      <div className="h-full w-full bg-white overflow-hidden rounded-2xl">
        {children}
      </div>
    </div>
  </div>
);

const AppCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    dragFree: false,
    skipSnaps: false,
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentSlide(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const appScreens: AppScreen[] = [
    {
      id: 'feed',
      title: 'Feed de Usuário',
      design: 'design/feed-usuario-recomendacao.html'
    },
    {
      id: 'busca',
      title: 'Busca de Serviços',
      design: 'design/feed-busca-servico-usuario.html'
    },
    {
      id: 'perfil',
      title: 'Meu Crédito',
      design: 'design/perfil-usuario-credito-disponivel.html'
    },
    {
      id: 'perfil',
      title: 'Crédito Bloqueado',
      design: 'design/perfil-usuario-credito-bloqueado.html'
    },
    {
      id: 'lista-desejos',
      title: 'Lista de Desejos',
      design: 'design/lista-desejo-usuario.html'
    },
    {
      id: 'empresa',
      title: 'Perfil Empresa',
      design: 'design/perfil-empresa.html'
    }
  ];

  return (
    <section className="py-8 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            📱 Conheça o NoPix
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Um app moderno para gerenciar serviços e crédito
          </p>
        </div>

        <div className="relative max-w-[1200px] mx-auto" ref={emblaRef}>
          <div className="flex">
            {appScreens.map((screen, index) => (
              <div 
                key={screen.id} 
                className="flex-[0_0_100%] min-w-0 px-2"
                style={{
                  transform: `scale(${currentSlide === index ? '1' : '0.9'})`,
                  opacity: currentSlide === index ? 1 : 0.5,
                  transition: 'all 0.3s ease-out',
                }}
              >
                <div className="relative flex justify-center">
                  <PhoneFrame>
                    <div className="h-full w-full relative">
                      <iframe
                        src={screen.design}
                        className="w-full h-full border-0"
                        style={{
                          pointerEvents: 'none'
                        }}
                        onError={(e) => {
                          console.error(`Error loading ${screen.design}:`, e);
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm opacity-0 transition-opacity group-[.error]/frame:opacity-100">
                        <div className="text-center px-4">
                          <p className="text-red-600 font-semibold mb-2">Erro ao carregar a tela</p>
                          <p className="text-sm text-gray-600">{screen.title}</p>
                        </div>
                      </div>
                    </div>
                  </PhoneFrame>
                </div>
              </div>
            ))}
          </div>

          <button
            className={cn(
              "absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white shadow-xl hover:bg-gray-50 transition-all",
              !prevBtnEnabled && "opacity-50 cursor-not-allowed"
            )}
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white shadow-xl hover:bg-gray-50 transition-all",
              !nextBtnEnabled && "opacity-50 cursor-not-allowed"
            )}
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="flex justify-center gap-1.5 mt-6">
          {appScreens.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all",
                index === currentSlide 
                  ? "bg-gray-900 scale-100" 
                  : "bg-gray-300 scale-90 hover:scale-95"
              )}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>

        <div className="text-center mt-4">
          <p className="text-lg font-semibold text-gray-900">
            {appScreens[currentSlide].title}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AppCarousel;
