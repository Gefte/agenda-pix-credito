import HeroSection from "@/components/HeroSection";
import BusinessSection from "@/components/BusinessSection";
import UserSection from "@/components/UserSection";
import DifferentialsSection from "@/components/DifferentialsSection";
import InteractiveSection from "@/components/InteractiveSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-background">
      <HeroSection />
      <BusinessSection />
      <UserSection />
      <DifferentialsSection />
      <InteractiveSection />
      <Footer />
    </div>
  );
};

export default Index;
