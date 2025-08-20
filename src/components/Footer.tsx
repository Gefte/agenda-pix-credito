import { Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Logo and Description */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">
                Agenda e Finanças Colaborativas
              </h3>
            </div>
            
            <p className="text-muted-foreground max-w-md">
              Sua agenda de serviços e crédito inteligente em um só lugar. 
              Construa histórico financeiro e parcele via Pix.
            </p>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-light rounded-full border border-accent/20">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-sm font-medium text-accent">
                Lançamento em breve
              </span>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-6">
            <h4 className="font-semibold text-foreground">Redes Sociais</h4>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Linkedin, href: "#", label: "LinkedIn" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-10 mt-12">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Agenda e Finanças Colaborativas, NoPix. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;