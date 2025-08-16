import { Building2, Star, TrendingUp, Heart } from "lucide-react";

const BusinessSection = () => {
  const features = [
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

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Cresça sua empresa e{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              conquiste crédito
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Para empresários que querem expandir seus negócios com acesso facilitado ao crédito
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex gap-4 p-6 rounded-lg border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-card animate-fade-in group"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessSection;