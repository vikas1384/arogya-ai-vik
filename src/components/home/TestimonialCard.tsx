
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  location: string;
  rating: number;
  initials: string;
}

const TestimonialCard = ({ quote, author, location, rating = 5, initials }: TestimonialCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="glass-card p-6 rounded-xl hover:shadow-lg transition-all duration-300 h-full flex flex-col"
    >
      <div className="flex items-center mb-4">
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-5 h-5 ${i < rating ? "fill-current" : ""}`} 
            />
          ))}
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{quote}</p>
      <div className="flex items-center mt-auto">
        <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 h-10 w-10 flex items-center justify-center font-bold text-health-600 dark:text-health-400">
          {initials}
        </div>
        <div className="ml-3">
          <p className="font-medium">{author}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{location}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
