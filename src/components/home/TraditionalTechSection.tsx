
import { motion } from "framer-motion";
import { Stethoscope, Languages, Globe } from "lucide-react";
import FeatureCard from "./FeatureCard";

const TraditionalTechSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="w-full max-w-6xl px-4 mb-16"
    >
      <h2 className="text-3xl font-bold text-center mb-12 health-gradient-text">
        Traditional Meets Technology
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          icon={<Stethoscope className="h-6 w-6" />}
          title="Ayurvedic Insights"
          description="Blending ancient Ayurvedic principles with modern medicine for holistic health recommendations."
          bgColor="bg-green-100 dark:bg-green-900/30"
          iconColor="text-green-600"
        />
        
        <FeatureCard
          icon={<Languages className="h-6 w-6" />}
          title="Indian Languages Support"
          description="Access healthcare in 12+ Indian languages including Hindi, Tamil, Telugu, Bengali, and more."
          bgColor="bg-purple-100 dark:bg-purple-900/30"
          iconColor="text-purple-600"
        />
        
        <FeatureCard
          icon={<Globe className="h-6 w-6" />}
          title="Rural Healthcare Access"
          description="Bringing quality healthcare to remote villages through our offline-capable mobile application."
          bgColor="bg-amber-100 dark:bg-amber-900/30"
          iconColor="text-amber-600"
        />
      </div>
    </motion.div>
  );
};

export default TraditionalTechSection;
