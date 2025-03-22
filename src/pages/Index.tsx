
import { motion } from "framer-motion";

// Import refactored components
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import TraditionalTechSection from "@/components/home/TraditionalTechSection";
import AdvancedFeaturesSection from "@/components/home/AdvancedFeaturesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import StatisticsSection from "@/components/home/StatisticsSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* New Indian Ayurveda Feature Section */}
      <TraditionalTechSection />

      {/* Advanced Features Section */}
      <AdvancedFeaturesSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Statistics Cards Section */}
      <StatisticsSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};

export default Index;
