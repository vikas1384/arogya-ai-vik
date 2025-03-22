
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor?: string;
  iconColor?: string;
}

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  bgColor = "bg-blue-100 dark:bg-blue-900/30", 
  iconColor = "text-health-600" 
}: FeatureCardProps) => {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="glass-card-hover p-6 rounded-xl flex flex-col items-center text-center h-full"
    >
      <div className={`${bgColor} p-3 rounded-full mb-4`}>
        <div className={iconColor}>{icon}</div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;
