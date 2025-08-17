import { useState } from 'react';
import { ArrowLeft, CreditCard, Lock, Leaf, Droplets, Palette, Home, Search, User } from 'lucide-react';

const PerfilUsuario = () => {
  const [creditType, setCreditType] = useState<'disponivel' | 'bloqueado'>('disponivel');

  const monthlyExpenses = [
    { month: 'Jan', value: 70 },
    { month: 'Feb', value: 10 },
    { month: 'Mar', value: 90 },
    { month: 'Apr', value: 90 },
    { month: 'May', value: 10 },
    { month: 'Jun', value: 20 }
  ];

  const contractedServices = [
    {
      id: '1',
      icon: Leaf,
      title: 'Manutenção de jardim',
      date: '15 de Maio',
      color: 'text-green-500'
    },
    {
      id: '2',
      icon: Droplets,
      title: 'Limpeza de piscina',
      date: '20 de Abril',
      color: 'text-blue-500'
    }
  ];

  const activeInstallments = [
    {
      id: '1',
      icon: Palette,
      title: 'Serviço de pintura',
      installments: '3 de 6 parcelas',
      color: 'text-purple-500'
    },
    {
      id: '2',
      icon: Home,
      title: 'Reparo de telhado',
      installments: '1 de 3 parcelas',
      color: 'text-orange-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 max-w-sm mx-auto bg-white shadow-lg h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center p-4 border-b border-gray-200">
        <button className="text-gray-600">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800 ml-4">Meu Crédito</h1>
      </header>

      <main className="flex-grow p-6 overflow-y-auto">
        {/* Credit Type Toggle */}
        <div className="flex justify-center mb-6">
          <div className="flex bg-gray-100 rounded-full p-1">
            <button 
              className={`text-sm font-medium py-2 px-6 rounded-full transition-colors ${
                creditType === 'disponivel' 
                  ? 'bg-green-500 text-white' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setCreditType('disponivel')}
            >
              Crédito Disponível
            </button>
            <button 
              className={`text-sm font-medium py-2 px-6 rounded-full transition-colors ${
                creditType === 'bloqueado' 
                  ? 'bg-green-500 text-white' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setCreditType('bloqueado')}
            >
              Crédito Bloqueado
            </button>
          </div>
        </div>

        {/* Credit Cards Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-100 p-4 rounded-xl">
            <p className="text-xl font-bold text-gray-800">R$7.000,00</p>
            <p className="text-sm text-gray-500">Limite disponível</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-xl flex items-center justify-center">
            <CreditCard className="text-yellow-500 w-9 h-9" />
          </div>
          <div className="bg-gray-100 p-4 rounded-xl">
            <p className="text-xl font-bold text-gray-800">R$18.000,00</p>
            <p className="text-sm text-gray-500">Limite bloqueado</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl flex items-center justify-center">
            <Lock className="text-white w-9 h-9" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <p className="text-sm text-gray-500 mb-2">60% desbloqueado</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{ width: '60%' }}></div>
          </div>
        </div>

        {/* Monthly Expenses */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Despesas Mensais</h2>
          <p className="text-sm text-gray-500">Despesas</p>
          <p className="text-4xl font-bold text-gray-900 mb-2">R$350</p>
          <p className="text-sm text-green-600 font-medium">Este mês</p>
          
          <div className="flex items-end justify-between mt-6 h-32">
            <div className="grid min-h-[180px] grid-flow-col gap-6 grid-rows-[1fr_auto] items-end justify-items-center px-3">
              {monthlyExpenses.map((expense, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className="border-[#45a17d] bg-[#e6f4ef] border-t-2 w-full rounded-t"
                    style={{ height: `${expense.value}%` }}
                  ></div>
                  <p className="text-[#45a17d] text-[13px] font-bold leading-normal tracking-[0.015em] mt-2">
                    {expense.month}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contracted Services */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Serviços Contratados</h2>
          <div className="space-y-4">
            {contractedServices.map((service) => (
              <div key={service.id} className="flex items-center">
                <div className="bg-gray-100 p-3 rounded-full">
                  <service.icon className={`w-6 h-6 ${service.color}`} />
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-800">{service.title}</p>
                  <p className="text-sm text-gray-500">{service.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Active Installments */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Parcelamentos Ativos</h2>
          <div className="space-y-4">
            {activeInstallments.map((service) => (
              <div key={service.id} className="flex items-center">
                <div className="bg-gray-100 p-3 rounded-full">
                  <service.icon className={`w-6 h-6 ${service.color}`} />
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-800">{service.title}</p>
                  <p className="text-sm text-gray-500">{service.installments}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer Navigation */}
      <footer className="flex justify-around items-center p-4 border-t border-gray-200 bg-white">
        <button className="flex flex-col items-center text-gray-500 hover:text-gray-700 transition-colors">
          <Home className="w-6 h-6" />
          <span className="text-xs">Início</span>
        </button>
        <button className="flex flex-col items-center text-gray-500 hover:text-gray-700 transition-colors">
          <Search className="w-6 h-6" />
          <span className="text-xs">Buscar</span>
        </button>
        <button className="flex flex-col items-center text-green-600">
          <CreditCard className="w-6 h-6" />
          <span className="text-xs">Crédito</span>
        </button>
        <button className="flex flex-col items-center text-gray-500 hover:text-gray-700 transition-colors">
          <User className="w-6 h-6" />
          <span className="text-xs">Perfil</span>
        </button>
      </footer>
    </div>
  );
};

export default PerfilUsuario;
