import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import appMockup from "@/assets/app-mockup.png";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-background min-h-screen flex items-center">
      <div className="absolute inset-0 bg-gradient-hero opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Sua agenda de serviços e{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  crédito inteligente
                </span>{" "}
                em um só lugar
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                Construa histórico financeiro, aumente seu limite e parcele via Pix – 
                sem precisar de cartão de crédito.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="xl"
                className="group"
              >
                Quero fazer parte
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button 
                variant="soft" 
                size="xl"
                className="group"
              >
                <Play className="transition-transform group-hover:scale-110" />
                Ver demonstração
              </Button>
            </div>

            <div className="pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                🚀 <strong>Lançamento em breve</strong> • Seja um dos primeiros a testar
              </p>
            </div>
          </div>

          {/* App Mockup */}
          <div className="relative animate-scale-in">
            <div className="relative z-10">
              <img 
                src={appMockup} 
                alt="Mockup do aplicativo Agenda e Finanças Colaborativas"
                className="w-full max-w-md mx-auto drop-shadow-elegant"
              />
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-primary rounded-full opacity-20 animate-pulse" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-secondary rounded-full opacity-15 animate-pulse" style={{animationDelay: '1s'}} />
            <div className="absolute top-1/2 -right-8 w-16 h-16 bg-accent/20 rounded-full animate-pulse" style={{animationDelay: '2s'}} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;