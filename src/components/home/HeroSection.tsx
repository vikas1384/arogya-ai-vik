
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-3xl px-4"
    >
      <div className="mx-auto mb-8 h-24 w-24 rounded-full bg-blue-50 flex items-center justify-center shadow-sm">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-health-600">
          <path d="M3 12H7.5L9.5 6L13.5 18L15.5 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h1 className="text-4xl font-bold mb-6 health-gradient-text">Welcome to Arogya AI</h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
        Your intelligent health companion powered by artificial intelligence. Monitor symptoms, connect with doctors, and gain valuable health insights.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <a href="/symptom-analyzer" className="button-primary">
          Analyze Symptoms
        </a>
        <a href="/doctor-consultation" className="button-secondary">
          Find Doctors
        </a>
      </div>
    </motion.div>
  );
};

export default HeroSection;
