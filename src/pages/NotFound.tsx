
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card rounded-2xl p-8 max-w-lg w-full text-center shadow-xl"
      >
        <div className="mb-6 inline-flex items-center justify-center relative">
          <div className="h-24 w-24 rounded-full bg-blue-50 flex items-center justify-center shadow-inner">
            <AlertCircle className="h-12 w-12 text-red-500" />
          </div>
          <span className="absolute text-2xl font-bold text-red-500 top-10">404</span>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Page Not Found</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          We couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="flex items-center justify-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center mr-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-health-600">
                <path d="M3 12H7.5L9.5 6L13.5 18L15.5 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="button-primary flex items-center justify-center shadow-lg shadow-health-500/20">
              Go to Home
            </span>
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="button-secondary flex items-center justify-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
