
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="w-full max-w-6xl px-4 mb-24 text-center"
    >
      <div className="health-gradient p-10 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to take control of your health?
        </h2>
        <p className="text-white/90 mb-8 max-w-2xl mx-auto">
          Join thousands of users who trust Arogya AI for their health monitoring and medical consultation needs.
        </p>
        <Button size="lg" variant="secondary" className="group">
          Get Started Today
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </motion.div>
  );
};

export default CTASection;
