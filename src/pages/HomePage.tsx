
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star, Calendar, Heart, UploadCloud, User2, CheckCircle, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const HomePage = () => {
  const isMobile = useIsMobile();
  const [hasScrolled, setHasScrolled] = useState(false);

  // Add scroll event listener
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    });
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <div className="pt-4 sm:pt-10 pb-20">
      {/* Hero section */}
      <motion.section 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="inline-block mb-4">
          <motion.span 
            className="inline-block px-4 py-2 rounded-full bg-health-50 text-health-700 text-sm font-medium dark:bg-health-900/30 dark:text-health-400 shadow-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Star className="inline-block w-4 h-4 mr-1.5 mb-0.5" /> Revolutionizing Healthcare with AI
          </motion.span>
        </div>
        
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Your <span className="health-gradient-text">AI Doctor</span>,<br />
          Anytime, Anywhere
        </motion.h1>
        
        <motion.p 
          className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Experience the future of healthcare with advanced AI diagnosis, 
          personalized health insights, and seamless doctor consultations.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link to="/symptom-analyzer">
            <motion.button 
              className="button-primary flex items-center justify-center gap-2 w-full sm:w-auto shadow-lg shadow-health-500/20"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Analyze Symptoms <ArrowRight className="h-4 w-4" />
            </motion.button>
          </Link>
          <Link to="/doctor-consultation">
            <motion.button 
              className="button-secondary flex items-center justify-center gap-2 w-full sm:w-auto"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Find a Doctor <User2 className="h-4 w-4" />
            </motion.button>
          </Link>
        </motion.div>
      </motion.section>

      {/* Features section */}
      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4"
      >
        <FeatureCard
          variants={item}
          icon={<Star className="h-6 w-6 text-health-600" />}
          title="AI Symptom Analysis"
          description="Analyze your symptoms with our advanced AI for accurate health insights and recommendations."
          link="/symptom-analyzer"
        />

        <FeatureCard
          variants={item}
          icon={<UploadCloud className="h-6 w-6 text-health-600" />}
          title="Visual Analysis"
          description="Upload photos of visual symptoms for enhanced AI-powered diagnosis."
          link="/symptom-analyzer"
        />

        <FeatureCard
          variants={item}
          icon={<User2 className="h-6 w-6 text-health-600" />}
          title="Doctor Matching"
          description="Connect with specialist doctors based on your symptoms and preferences."
          link="/doctor-consultation"
        />

        <FeatureCard
          variants={item}
          icon={<Calendar className="h-6 w-6 text-health-600" />}
          title="Quick Appointments"
          description="Book virtual or in-person appointments with top healthcare providers."
          link="/doctor-consultation"
        />

        <FeatureCard
          variants={item}
          icon={<Heart className="h-6 w-6 text-health-600" />}
          title="Health Insights"
          description="Track health metrics and receive personalized recommendations."
          link="/health-insights"
        />

        <FeatureCard
          variants={item}
          icon={<CheckCircle className="h-6 w-6 text-health-600" />}
          title="Personalized Care"
          description="Get customized health plans tailored to your unique health profile."
          link="/health-insights"
        />
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="mt-20 max-w-5xl mx-auto px-4"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted by <span className="text-health-600">thousands</span> worldwide
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            See what our users have to say about their experience with Arogya AI
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TestimonialCard
            quote="Arogya AI helped identify my condition quickly, saving me time and money on unnecessary doctor visits."
            author="Sarah J."
            role="User"
          />
          <TestimonialCard
            quote="The symptom analyzer is incredibly accurate. It suggested exactly what my doctor later diagnosed!"
            author="Michael T."
            role="Regular User"
          />
        </div>
      </motion.section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, link, variants }: any) => {
  return (
    <motion.div
      variants={variants}
      className="glass-card-hover rounded-2xl p-6 hover-lift flex flex-col h-full"
      whileHover={{ scale: 1.02, y: -5 }}
    >
      <div className="bg-health-50 dark:bg-health-900/30 p-3 rounded-xl w-fit mb-4 shadow-sm">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm flex-grow">{description}</p>
      <Link 
        to={link} 
        className="mt-4 text-health-600 dark:text-health-400 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all duration-300"
      >
        Learn more <ArrowRight className="h-3 w-3" />
      </Link>
    </motion.div>
  );
};

const TestimonialCard = ({ quote, author, role }: { quote: string, author: string, role: string }) => {
  return (
    <motion.div 
      className="glass-card rounded-xl p-6 shadow-md"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Trophy className="h-6 w-6 text-health-500 mb-4" />
      <p className="text-gray-700 dark:text-gray-300 italic mb-4">"{quote}"</p>
      <div className="flex items-center">
        <div className="bg-health-100 dark:bg-health-800/50 h-10 w-10 rounded-full flex items-center justify-center text-health-600 dark:text-health-400 font-semibold">
          {author.charAt(0)}
        </div>
        <div className="ml-3">
          <h4 className="font-medium text-gray-900 dark:text-white">{author}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage;
