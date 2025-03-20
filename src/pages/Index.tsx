
import { motion } from "framer-motion";
import { Shield, Heart, ArrowRight, ActivitySquare, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center">
      {/* Hero Section */}
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

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-24 mb-16 w-full max-w-6xl px-4"
      >
        <h2 className="text-3xl font-bold text-center mb-12 health-gradient-text">Why Choose Arogya AI?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="glass-card-hover p-6 rounded-xl flex flex-col items-center text-center">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-4">
              <ActivitySquare className="h-6 w-6 text-health-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Symptom Analysis</h3>
            <p className="text-gray-600 dark:text-gray-300">Advanced algorithms analyze your symptoms and provide potential conditions with remarkable accuracy.</p>
          </div>
          
          {/* Feature 2 */}
          <div className="glass-card-hover p-6 rounded-xl flex flex-col items-center text-center">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-4">
              <Shield className="h-6 w-6 text-health-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Privacy Focused</h3>
            <p className="text-gray-600 dark:text-gray-300">Your health data is encrypted and protected. We maintain the highest standards of medical data privacy.</p>
          </div>
          
          {/* Feature 3 */}
          <div className="glass-card-hover p-6 rounded-xl flex flex-col items-center text-center">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-4">
              <Heart className="h-6 w-6 text-health-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Personalized Health Insights</h3>
            <p className="text-gray-600 dark:text-gray-300">Receive customized recommendations based on your health profile, activity, and medical history.</p>
          </div>
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="w-full max-w-6xl px-4 mb-24"
      >
        <h2 className="text-3xl font-bold text-center mb-12 health-gradient-text">What Our Users Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Testimonial 1 */}
          <div className="glass-card p-6 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">"Arogya AI helped me identify my symptoms quickly and connected me with a specialist. The process was seamless and saved me hours of anxiety!"</p>
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 h-10 w-10 flex items-center justify-center font-bold text-health-600">RK</div>
              <div className="ml-3">
                <p className="font-medium">Rahul Kumar</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">New Delhi</p>
              </div>
            </div>
          </div>
          
          {/* Testimonial 2 */}
          <div className="glass-card p-6 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">"As a busy professional, I don't always have time to visit a doctor for minor concerns. Arogya AI gives me peace of mind with accurate health assessments."</p>
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 h-10 w-10 flex items-center justify-center font-bold text-health-600">PM</div>
              <div className="ml-3">
                <p className="font-medium">Priya Mehta</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Mumbai</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="w-full max-w-6xl px-4 mb-24 text-center"
      >
        <div className="health-gradient p-10 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to take control of your health?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">Join thousands of users who trust Arogya AI for their health monitoring and medical consultation needs.</p>
          <Button size="lg" variant="secondary" className="group">
            Get Started Today
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
