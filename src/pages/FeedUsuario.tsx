import { useState } from 'react';
import { Search, CreditCard, User, Settings, ArrowRight, Home } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

interface Service {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  image: string;
}

const FeedUsuario = () => {
  const [activeTab, setActiveTab] = useState('inicio');
  const navigate = useNavigate();

  const recommendedServices: Service[] = [
    {
      id: '1',
      category: 'Serviço de Limpeza',
      title: 'Limpeza Residencial Completa',
      subtitle: 'Brilho & Conforto',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
    },
    {
      id: '2',
      category: 'Serviço de Manutenção',
      title: 'Reparos Domésticos Urgentes',
      subtitle: 'Soluções Rápidas',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop'
    },
    {
      id: '3',
      category: 'Serviço de Jardinagem',
      title: 'Jardinagem e Paisagismo',
      subtitle: 'Verde e Beleza',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop'
    },
    {
      id: '4',
      category: 'Serviço de Pintura',
      title: 'Pintura Residencial Personalizada',
      subtitle: 'Cores e Estilo',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f9fbf9] max-w-sm mx-auto shadow-lg">
      {/* Header */}
      <div className="flex items-center bg-[#f9fbf9] p-4 pb-2 justify-between">
        <h2 className="text-[#121a0f] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pl-12">
          Início
        </h2>
        <div className="flex w-12 items-center justify-end">
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-transparent text-[#121a0f] gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0">
            <Settings className="text-[#121a0f] w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Recommended Services */}
      <h2 className="text-[#121a0f] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Recomendados para você
      </h2>

      <div className="space-y-4">
        {recommendedServices.map((service) => (
          <div key={service.id} className="px-4">
            <div className="flex items-stretch justify-between gap-4 rounded-lg">
              <div className="flex flex-[2_2_0px] flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-[#639155] text-sm font-normal leading-normal">
                    {service.category}
                  </p>
                  <p className="text-[#121a0f] text-base font-bold leading-tight">
                    {service.title}
                  </p>
                  <p className="text-[#639155] text-sm font-normal leading-normal">
                    {service.subtitle}
                  </p>
                </div>
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 flex-row-reverse bg-[#ebf2e9] text-[#121a0f] pr-2 gap-1 text-sm font-medium leading-normal w-fit hover:bg-[#d1e7c8] transition-colors">
                  <ArrowRight className="text-[#121a0f] w-4 h-4" />
                  <span className="truncate">Contratar agora</span>
                </button>
              </div>
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-1"
                style={{ backgroundImage: `url(${service.image})` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="mt-auto">
        <div className="flex gap-2 border-t border-[#ebf2e9] bg-[#f9fbf9] px-4 pb-3 pt-2">
          <Link 
            to="/feed"
            className={`flex flex-1 flex-col items-center justify-end gap-1 rounded-full ${
              activeTab === 'inicio' ? 'text-[#121a0f]' : 'text-[#639155]'
            }`}
            onClick={() => setActiveTab('inicio')}
          >
            <Home className={`flex h-8 items-center justify-center ${
              activeTab === 'inicio' ? 'text-[#121a0f]' : 'text-[#639155]'
            }`} />
            <p className={`text-xs font-medium leading-normal tracking-[0.015em] ${
              activeTab === 'inicio' ? 'text-[#121a0f]' : 'text-[#639155]'
            }`}>
              Início
            </p>
          </Link>
          
          <Link 
            to="/busca"
            className={`flex flex-1 flex-col items-center justify-end gap-1 ${
              activeTab === 'buscar' ? 'text-[#121a0f]' : 'text-[#639155]'
            }`}
            onClick={() => setActiveTab('buscar')}
          >
            <Search className={`flex h-8 items-center justify-center ${
              activeTab === 'buscar' ? 'text-[#121a0f]' : 'text-[#639155]'
            }`} />
            <p className={`text-xs font-medium leading-normal tracking-[0.015em] ${
              activeTab === 'buscar' ? 'text-[#121a0f]' : 'text-[#639155]'
            }`}>
              Buscar
            </p>
          </Link>
          
          <Link 
            to="/perfil"
            className={`flex flex-1 flex-col items-center justify-end gap-1 ${
              activeTab === 'credito' ? 'text-[#121a0f]' : 'text-[#639155]'
            }`}
            onClick={() => setActiveTab('credito')}
          >
            <CreditCard className={`flex h-8 items-center justify-center ${
              activeTab === 'credito' ? 'text-[#121a0f]' : 'text-[#639155]'
            }`} />
            <p className={`text-xs font-medium leading-normal tracking-[0.015em] ${
              activeTab === 'credito' ? 'text-[#121a0f]' : 'text-[#639155]'
            }`}>
              Crédito
            </p>
          </Link>
          
          <Link 
            to="/perfil"
            className={`flex flex-1 flex-col items-center justify-end gap-1 ${
              activeTab === 'perfil' ? 'text-[#121a0f]' : 'text-[#639155]'
            }`}
            onClick={() => setActiveTab('perfil')}
          >
            <User className={`flex h-8 items-center justify-center ${
              activeTab === 'perfil' ? 'text-[#121a0f]' : 'text-[#639155]'
            }`} />
            <p className={`text-xs font-medium leading-normal tracking-[0.015em] ${
              activeTab === 'perfil' ? 'text-[#121a0f]' : 'text-[#639155]'
            }`}>
              Perfil
            </p>
          </Link>
        </div>
        <div className="h-5 bg-[#f9fbf9]"></div>
      </div>
    </div>
  );
};

export default FeedUsuario;
