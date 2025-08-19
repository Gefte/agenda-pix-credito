import { Building2, Star, TrendingUp, Heart, User, Search, CreditCard, Smartphone } from "lucide-react";

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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Soluções para{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              empresas e pessoas
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Seja para expandir seu negócio ou organizar suas finanças pessoais
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Empresa Section */}
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  EMPRESA
                </span>
              </h3>
              <p className="text-muted-foreground">
                Cresça sua empresa e conquiste crédito
              </p>
            </div>

            <div className="space-y-4">
              {businessFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="flex gap-4 p-6 rounded-lg bg-card border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-card animate-fade-in group"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pessoa Section */}
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                <span className="bg-gradient-secondary bg-clip-text text-transparent">
                  PESSOA
                </span>
              </h3>
              <p className="text-muted-foreground">
                Planeje, compre e construa seu crédito
              </p>
            </div>

            <div className="space-y-4">
              {userFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="flex gap-4 p-6 rounded-lg bg-card border border-border hover:border-secondary/20 transition-all duration-300 hover:shadow-card animate-slide-in group"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;