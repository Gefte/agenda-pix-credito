import { useState } from 'react';
import { Search, Filter, MapPin, Star, Clock, DollarSign, Home, CreditCard, User } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

interface Service {
  id: string;
  title: string;
  category: string;
  rating: number;
  price: string;
  time: string;
  location: string;
  image: string;
  isFavorite: boolean;
}

const BuscaServicos = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('buscar');
  const navigate = useNavigate();

  const services: Service[] = [
    {
      id: '1',
      title: 'Limpeza Residencial Profissional',
      category: 'Limpeza',
      rating: 4.8,
      price: 'R$ 120',
      time: '2-3 horas',
      location: 'São Paulo, SP',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      isFavorite: false
    },
    {
      id: '2',
      title: 'Manutenção Elétrica Residencial',
      category: 'Manutenção',
      rating: 4.9,
      price: 'R$ 200',
      time: '1-2 horas',
      location: 'São Paulo, SP',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
      isFavorite: true
    },
    {
      id: '3',
      title: 'Jardinagem e Paisagismo',
      category: 'Jardinagem',
      rating: 4.7,
      price: 'R$ 150',
      time: '3-4 horas',
      location: 'São Paulo, SP',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
      isFavorite: false
    },
    {
      id: '4',
      title: 'Pintura Residencial',
      category: 'Pintura',
      rating: 4.6,
      price: 'R$ 300',
      time: '4-6 horas',
      location: 'São Paulo, SP',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
      isFavorite: false
    }
  ];

  const toggleFavorite = (id: string) => {
    // Implementar lógica para favoritar
    console.log('Toggle favorite:', id);
  };

  return (
    <div className="min-h-screen bg-[#f9fbf9] max-w-sm mx-auto shadow-lg">
      {/* Header */}
      <div className="flex items-center bg-[#f9fbf9] p-4 pb-2 justify-between">
        <h2 className="text-[#121a0f] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pl-12">
          Buscar Serviços
        </h2>
        <div className="flex w-12 items-center justify-end">
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-transparent text-[#121a0f] gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0">
            <Filter className="text-[#121a0f] w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar serviços..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Services List */}
      <div className="px-4 space-y-4">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex">
              <div className="w-24 h-24 flex-shrink-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 p-3">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-800 text-sm leading-tight">
                    {service.title}
                  </h3>
                  <button
                    onClick={() => toggleFavorite(service.id)}
                    className={`p-1 rounded-full ${
                      service.isFavorite ? 'text-red-500' : 'text-gray-400'
                    } hover:text-red-500 transition-colors`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill={service.isFavorite ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>
                
                <p className="text-[#639155] text-xs mb-2">{service.category}</p>
                
                <div className="flex items-center mb-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-xs text-gray-600 ml-1">{service.rating}</span>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {service.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {service.location}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-bold text-green-600">{service.price}</span>
                  <button className="bg-[#ebf2e9] text-[#121a0f] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#d1e7c8] transition-colors">
                    Contratar
                  </button>
                </div>
              </div>
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

export default BuscaServicos;
