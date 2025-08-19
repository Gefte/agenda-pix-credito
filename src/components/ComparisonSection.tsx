import { Building2, Star, TrendingUp, Heart, User, Search, CreditCard, Smartphone, Building, UserCheck } from "lucide-react";

const ComparisonSection = () => {
  const businessFeatures = [
    {
      icon: Building2,
      title: "Perfil da empresa com reputação e avaliações",
      description: "Construa sua credibilidade com avaliações de clientes reais"
    },
    {
      icon: Star,
      title: "Divulgação de serviços no feed de clientes",
      description: "Alcance novos clientes diretamente no aplicativo"
    },
    {
      icon: TrendingUp,
      title: "Limite de crédito baseado em clientes e serviços",
      description: "Quanto mais você cresce, maior seu limite disponível"
    },
    {
      icon: Heart,
      title: "Programas de recuperação financeira personalizados",
      description: "Soluções inteligentes para manter sua saúde financeira"
    }
  ];

  const userFeatures = [
    {
      icon: User,
      title: "Criação de perfil pessoal",
      description: "Monte seu perfil e comece a construir sua reputação"
    },
    {
      icon: Search,
      title: "Busca e contratação de serviços",
      description: "Encontre profissionais qualificados na sua região"
    },
    {
      icon: CreditCard,
      title: "Crédito desbloqueado conforme uso do app",
      description: "Quanto mais você usa, maior seu limite disponível"
    },
    {
      icon: Smartphone,
      title: "Parcelamento via Pix sem cartão",
      description: "Parcele suas compras direto pelo Pix, sem complicação"
    }
  ];

  return (
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Soluções para{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              empresas
            </span>
            {" "}e{" "}
            <span className="bg-gradient-secondary bg-clip-text text-transparent">
              pessoas
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light">
            Seja para expandir seu negócio ou organizar suas finanças pessoais, 
            temos a solução ideal para você
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Empresa Card */}
          <div className="group">
            <div className="bg-card rounded-3xl p-8 border border-border shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              {/* Card Header */}
              <div className="text-center mb-10">
                <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Building className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-3">
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    EMPRESA
                  </span>
                </h3>
                <p className="text-muted-foreground text-lg font-medium">
                  Cresça sua empresa e conquiste crédito
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 gap-6">
                {businessFeatures.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-muted/30 hover:bg-primary/5 transition-all duration-300 hover:shadow-md group/item"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground text-lg leading-tight">
                        {feature.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pessoa Card */}
          <div className="group">
            <div className="bg-card rounded-3xl p-8 border border-border shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              {/* Card Header */}
              <div className="text-center mb-10">
                <div className="w-20 h-20 bg-gradient-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <UserCheck className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-3">
                  <span className="bg-gradient-secondary bg-clip-text text-transparent">
                    PESSOA
                  </span>
                </h3>
                <p className="text-muted-foreground text-lg font-medium">
                  Planeje, compre e construa seu crédito
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 gap-6">
                {userFeatures.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-muted/30 hover:bg-secondary/5 transition-all duration-300 hover:shadow-md group/item"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground text-lg leading-tight">
                        {feature.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;