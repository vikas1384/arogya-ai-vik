
import { motion } from "framer-motion";
import { ActivitySquare, Shield, Heart } from "lucide-react";
import FeatureCard from "./FeatureCard";

const FeaturesSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-24 mb-16 w-full max-w-6xl px-4"
    >
      <h2 className="text-3xl font-bold text-center mb-12 health-gradient-text">
        Why Choose Arogya AI?
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          icon={<ActivitySquare className="h-6 w-6" />}
          title="AI-Powered Symptom Analysis"
          description="Advanced algorithms analyze your symptoms and provide potential conditions with remarkable accuracy."
        />
        
        <FeatureCard
          icon={<Shield className="h-6 w-6" />}
          title="Privacy Focused"
          description="Your health data is encrypted and protected. We maintain the highest standards of medical data privacy."
        />
        
        <FeatureCard
          icon={<Heart className="h-6 w-6" />}
          title="Personalized Health Insights"
          description="Receive customized recommendations based on your health profile, activity, and medical history."
        />
      </div>
    </motion.div>
  );
};

export default FeaturesSection;
