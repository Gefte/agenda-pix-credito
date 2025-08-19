import HeroSection from "@/components/HeroSection";
import ComparisonSection from "@/components/ComparisonSection";
import DifferentialsSection from "@/components/DifferentialsSection";
import LeadRegistrationForm from "@/components/LeadRegistrationForm";
import AppCarousel from "@/components/AppCarousel";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-background">
      <HeroSection />
      <ComparisonSection />
      <DifferentialsSection />
      <LeadRegistrationForm />
      
      {/* App Carousel Section */}
      <AppCarousel />
      
      <Footer />
    </div>
  );
};

export default Index;
