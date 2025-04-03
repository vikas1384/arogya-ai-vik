
import { motion } from "framer-motion";
import { Brain, MicrochipIcon, Network, Cpu, FileText, Focus, Zap, Heart } from "lucide-react";
import FeatureCard2 from "./FeatureCard2";

const AdvancedFeaturesSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="w-full max-w-6xl px-4 mb-24"
    >
      <h2 className="text-3xl font-bold text-center mb-12 health-gradient-text">
        Advanced AI Capabilities
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard2
          icon={<Brain className="h-6 w-6" />}
          title="Neural Networks"
          description="Our deep learning models continuously improve diagnosis accuracy through neural network training."
        />

        <FeatureCard2
          icon={<MicrochipIcon className="h-6 w-6" />}
          title="Edge Computing"
          description="Process health data locally on your device for faster results and enhanced privacy protection."
        />

        <FeatureCard2
          icon={<Network className="h-6 w-6" />}
          title="Medical Network"
          description="Access India's largest network of AI-verified healthcare providers across all specialties."
        />

        <FeatureCard2
          icon={<Cpu className="h-6 w-6" />}
          title="Smart Diagnostics"
          description="Our algorithms identify patterns in symptoms that human diagnosticians might overlook."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <FeatureCard2
          icon={<FileText className="h-6 w-6" />}
          title="Medical Records"
          description="Securely store and access your medical records, prescriptions, and test results from anywhere."
          bgColor="bg-green-100 dark:bg-green-900/30"
          iconColor="text-green-600"
        />

        <FeatureCard2
          icon={<Focus className="h-6 w-6" />}
          title="Mental Wellness"
          description="AI-powered tools to monitor, analyze, and improve your mental health and emotional wellbeing."
          bgColor="bg-purple-100 dark:bg-purple-900/30"
          iconColor="text-purple-600"
        />

        <FeatureCard2
          icon={<Zap className="h-6 w-6" />}
          title="Instant Reports"
          description="Receive instant analysis of medical reports with highlighted concerns and simplified explanations."
          bgColor="bg-amber-100 dark:bg-amber-900/30"
          iconColor="text-amber-600"
        />

        <FeatureCard2
          icon={<Heart className="h-6 w-6" />}
          title="Emergency Care"
          description="One-tap emergency assistance with automatic location sharing and medical history access."
          bgColor="bg-red-100 dark:bg-red-900/30"
          iconColor="text-red-600"
        />
      </div>
    </motion.div>
  );
};

export default AdvancedFeaturesSection;
