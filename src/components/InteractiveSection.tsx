import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Home, TrendingUp, ShoppingCart, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const InteractiveSection = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const options = [
    {
      id: "bills",
      icon: CreditCard,
      title: "Pagar contas em atraso",
      description: "Organize suas finanças e quite pendências"
    },
    {
      id: "services",
      icon: Home,
      title: "Contratar serviços para casa",
      description: "Reformas, limpeza, manutenção e mais"
    },
    {
      id: "business",
      icon: TrendingUp,
      title: "Investir no meu negócio",
      description: "Capital de giro e expansão"
    },
    {
      id: "shopping",
      icon: ShoppingCart,
      title: "Compras parceladas sem cartão",
      description: "Produtos e serviços via Pix"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOption || !email || !name) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos e selecione uma opção.",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    setIsSubmitted(true);
    toast({
      title: "Sucesso! 🎉",
      description: "Você foi adicionado à nossa lista de interesse. Te avisaremos quando o app for lançado!",
    });
  };

  if (isSubmitted) {
    return (
      <section className="py-20 bg-gradient-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-8 animate-scale-in">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Obrigado pelo seu interesse! 🚀
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8">
              Te notificaremos assim que o app estiver disponível. 
              Prepare-se para revolucionar sua forma de lidar com crédito!
            </p>
            
            <div className="p-6 bg-card rounded-lg border border-border">
              <p className="text-sm text-muted-foreground">
                <strong>Próximos passos:</strong> Acompanhe seu email e nossas redes sociais 
                para não perder as novidades do lançamento.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Como você usaria seu{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                crédito hoje?
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Nos conte sua necessidade e seja avisado quando o app estiver disponível
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Options Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {options.map((option, index) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedOption(option.id)}
                  className={`p-6 rounded-lg border-2 transition-all duration-300 text-left animate-fade-in group ${
                    selectedOption === option.id
                      ? "border-primary bg-primary/5 shadow-card"
                      : "border-border bg-card hover:border-primary/40 hover:shadow-sm"
                  }`}
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      selectedOption === option.id
                        ? "bg-gradient-primary"
                        : "bg-muted group-hover:bg-gradient-primary"
                    }`}>
                      <option.icon className={`w-6 h-6 transition-colors duration-300 ${
                        selectedOption === option.id || "group-hover:text-white"
                          ? "text-white"
                          : "text-muted-foreground"
                      }`} />
                    </div>
                    
                    <div className="space-y-1 flex-1">
                      <h3 className="font-semibold text-foreground">
                        {option.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Form Fields */}
            <div className="grid md:grid-cols-2 gap-6 p-8 bg-card rounded-lg border border-border">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <Button 
                type="submit" 
                variant="cta" 
                size="xl"
                className="min-w-80"
                disabled={!selectedOption || !email || !name}
              >
                Avise-me quando o app for lançado
              </Button>
              
              <p className="text-sm text-muted-foreground mt-4">
                🔒 Seus dados estão seguros e não serão compartilhados
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default InteractiveSection;