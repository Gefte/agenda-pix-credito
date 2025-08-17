import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle } from "lucide-react";

const LeadRegistrationForm = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    explicacao: "",
    tipo_uso: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      tipo_uso: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.email || !formData.telefone || !formData.explicacao || !formData.tipo_uso) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('leads')
        .insert([formData]);

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Sucesso!",
        description: "Cadastro realizado com sucesso! Em breve entraremos em contato.",
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Erro",
        description: "Houve um erro ao enviar o formulário. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-card rounded-2xl p-8 text-center border border-border">
            <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Cadastro realizado com sucesso!
            </h2>
            <p className="text-muted-foreground text-lg">
              Em breve entraremos em contato.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="lead-form" className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Registre-se para Mais Informações
          </h2>
          <p className="text-muted-foreground text-lg">
            Preencha o formulário abaixo e entraremos em contato em breve
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 border border-border space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                name="nome"
                type="text"
                value={formData.nome}
                onChange={handleInputChange}
                placeholder="Seu nome completo"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              name="telefone"
              type="tel"
              value={formData.telefone}
              onChange={handleInputChange}
              placeholder="(11) 99999-9999"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="explicacao">Para que você pretende usar o crédito?</Label>
            <Textarea
              id="explicacao"
              name="explicacao"
              value={formData.explicacao}
              onChange={handleInputChange}
              placeholder="Descreva como pretende utilizar o crédito..."
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-medium">Tipo de uso</Label>
            <RadioGroup value={formData.tipo_uso} onValueChange={handleRadioChange}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pessoal" id="pessoal" />
                <Label htmlFor="pessoal">Uso Pessoal</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="empresa" id="empresa" />
                <Label htmlFor="empresa">Uso Empresarial</Label>
              </div>
            </RadioGroup>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Enviar Cadastro"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default LeadRegistrationForm;