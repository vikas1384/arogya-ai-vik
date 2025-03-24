
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Stethoscope, Search, ArrowRight, ShieldCheck, Clock, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import refactored components
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import TraditionalTechSection from "@/components/home/TraditionalTechSection";
import AdvancedFeaturesSection from "@/components/home/AdvancedFeaturesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import StatisticsSection from "@/components/home/StatisticsSection";
import CTASection from "@/components/home/CTASection";

const FeatureCard = ({ icon, title, description, color = "blue" }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string,
  color?: "blue" | "green" | "purple" 
}) => {
  const colorClasses = {
    blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    green: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
    purple: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
  };
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
    >
      <div className={`rounded-full p-3 w-14 h-14 flex items-center justify-center ${colorClasses[color]} mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
    </motion.div>
  );
};

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
        className="w-full max-w-4xl mx-auto mb-16 px-4"
      >
        <div className="glassmorphism p-8 text-center soft-shadow">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex flex-col items-center mb-6"
          >
            <div className="h-16 w-16 rounded-full bg-health-50 dark:bg-health-900/30 flex items-center justify-center mb-4 shadow-sm">
              <Stethoscope className="h-8 w-8 text-health-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 health-gradient-text">
              AI-Powered Symptom Analysis
            </h2>
          </motion.div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
            Describe your symptoms in natural language and receive an instant AI-powered health assessment with possible conditions and next steps.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <FeatureCard 
              icon={<ShieldCheck className="h-6 w-6" />}
              title="Private & Secure"
              description="Your health data stays private with end-to-end encryption and strict privacy controls"
              color="blue"
            />
            <FeatureCard 
              icon={<Clock className="h-6 w-6" />}
              title="Instant Results"
              description="Get analysis in seconds, eliminating the wait for traditional medical consultations"
              color="green"
            />
            <FeatureCard 
              icon={<Activity className="h-6 w-6" />}
              title="Advanced Analysis"
              description="Our AI compares your symptoms against thousands of conditions for accuracy"
              color="purple"
            />
          </div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button asChild size="lg" className="bg-health-500 hover:bg-health-600 rounded-full px-8 py-6 shadow-lg h-auto font-medium text-base">
              <Link to="/symptom-checker" className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Analyze Your Symptoms
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
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
