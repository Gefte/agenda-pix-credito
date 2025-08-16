import { User, Search, CreditCard, Smartphone, Lock } from "lucide-react";

const UserSection = () => {
  const features = [
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
            Planeje, compre e{" "}
            <span className="bg-gradient-secondary bg-clip-text text-transparent">
              construa seu crédito
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Para pessoas que querem facilidade e inteligência na gestão financeira pessoal
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex gap-4 p-6 rounded-lg bg-card border border-border hover:border-secondary/20 transition-all duration-300 hover:shadow-card animate-slide-in group"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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

        {/* Credit Highlight */}
        <div className="max-w-2xl mx-auto">
          <div className="relative p-8 rounded-xl bg-gradient-primary border border-primary/20 shadow-elegant animate-scale-in">
            <div className="absolute top-4 right-4">
              <Lock className="w-6 h-6 text-white/70" />
            </div>
            
            <div className="text-center text-white">
              <h3 className="text-2xl font-bold mb-2">
                Crédito potencial de até R$ 20.000
              </h3>
              <p className="text-white/90 mb-4">
                🔒 <strong>Bloqueado</strong> e liberado por engajamento
              </p>
              <p className="text-sm text-white/80">
                Quanto mais você usar o app, maior será seu limite de crédito disponível
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserSection;