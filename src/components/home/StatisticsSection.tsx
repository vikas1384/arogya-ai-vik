
import { motion } from "framer-motion";
import { Sparkles, Brain } from "lucide-react";
import StatisticsCard from "./StatisticsCard";
import AdvancedStatCard from "./AdvancedStatCard";

const StatisticsSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="w-full max-w-6xl px-4 mb-24"
    >
      <h2 className="text-3xl font-bold text-center mb-12 health-gradient-text">
        Making a Difference
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatisticsCard value="500K+" description="Active Users Across India" />
        <StatisticsCard value="10K+" description="Verified Medical Practitioners" />
        <StatisticsCard value="95%" description="Diagnostic Accuracy Rate" />
        <StatisticsCard value="2M+" description="Successful Consultations" />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
        <AdvancedStatCard
          icon={<Sparkles className="h-6 w-6" />}
          title="Multilingual Support"
          description="Our platform supports 14 Indian languages including Hindi, Tamil, Bengali, Telugu, Marathi, Gujarati, and more, making healthcare accessible across the nation."
          gradientFrom="health-200"
          gradientTo="blue-300"
          darkGradientFrom="health-800"
          darkGradientTo="blue-700"
          footer={
            <div className="flex gap-2 flex-wrap">
              <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 rounded-full text-health-700 dark:text-health-300">Hindi</span>
              <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 rounded-full text-health-700 dark:text-health-300">Tamil</span>
              <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 rounded-full text-health-700 dark:text-health-300">Telugu</span>
              <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 rounded-full text-health-700 dark:text-health-300">Bengali</span>
              <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 rounded-full text-health-700 dark:text-health-300">+10 more</span>
            </div>
          }
        />

        <AdvancedStatCard
          icon={<Brain className="h-6 w-6" />}
          title="AI Diagnostic Accuracy"
          description="Our AI models are trained on millions of medical records and validated by top medical institutions across India, achieving diagnostic accuracy that rivals experienced specialists."
          gradientFrom="purple-200"
          gradientTo="indigo-300"
          darkGradientFrom="purple-800"
          darkGradientTo="indigo-700"
          footer={
            <>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-health-600 h-2.5 rounded-full" style={{ width: '95%' }}></div>
              </div>
              <span className="ml-auto text-sm font-medium text-health-600">95% accuracy</span>
            </>
          }
        />
      </div>
    </motion.div>
  );
};

export default StatisticsSection;
