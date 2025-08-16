import { CreditCard, TrendingUp, Shield } from "lucide-react";

const DifferentialsSection = () => {
  const differentials = [
    {
      icon: CreditCard,
      title: "Crédito sem cartão",
      subtitle: "Via Pix",
      description: "Parcele suas compras usando apenas o Pix, sem necessidade de cartão de crédito",
      color: "from-primary to-primary-glow"
    },
    {
      icon: TrendingUp,
      title: "Score baseado no uso",
      subtitle: "Inteligente",
      description: "Seu score cresce conforme você usa o app e mantém bom relacionamento",
      color: "from-secondary to-accent"
    },
    {
      icon: Shield,
      title: "Segurança e acessibilidade",
      subtitle: "Confiável",
      description: "Tecnologia de ponta para garantir segurança em todas as transações",
      color: "from-accent to-success"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Por que escolher a{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              nossa plataforma?
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Diferenciais únicos que tornam sua experiência financeira mais inteligente
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {differentials.map((differential, index) => (
            <div 
              key={index}
              className="group relative"
            >
              <div className="relative p-8 rounded-xl bg-card border border-border hover:border-primary/20 transition-all duration-500 hover:shadow-elegant animate-fade-in h-full"
                   style={{animationDelay: `${index * 0.2}s`}}>
                
                {/* Icon with gradient background */}
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${differential.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <differential.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      {differential.title}
                    </h3>
                    <p className="text-sm font-medium text-primary">
                      {differential.subtitle}
                    </p>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {differential.description}
                  </p>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferentialsSection;