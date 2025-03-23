
import { motion } from "framer-motion";

// Import refactored components
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import TraditionalTechSection from "@/components/home/TraditionalTechSection";
import AdvancedFeaturesSection from "@/components/home/AdvancedFeaturesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import StatisticsSection from "@/components/home/StatisticsSection";
import CTASection from "@/components/home/CTASection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Stethoscope } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center py-8">
      {/* Hero Section */}
      <HeroSection />

      {/* Quick Access to Symptom Checker */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="w-full max-w-3xl mx-auto mb-16 px-4"
      >
        <div className="bg-gradient-to-r from-health-50 to-blue-50 dark:from-health-950/30 dark:to-blue-950/30 p-6 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-3 health-gradient-text">Try Our New Symptom Checker</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Describe your symptoms and get an AI-powered analysis in seconds
          </p>
          <Button asChild size="lg" className="bg-health-500 hover:bg-health-600">
            <Link to="/symptom-checker" className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5" />
              Check Your Symptoms Now
            </Link>
          </Button>
        </div>
      </motion.div>

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
