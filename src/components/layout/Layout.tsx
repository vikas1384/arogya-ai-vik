
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import MobileNav from "./MobileNav";
import Footer from "./Footer";
import { useIsMobile } from "@/hooks/use-mobile";

const Layout = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Check if the current route is the symptom analyzer
  const isSymptomAnalyzer = location.pathname === "/symptom-analyzer";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Enhanced animated background gradient */}
      <div className="fixed inset-0 z-[-1]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-sky-50 dark:from-gray-900 dark:via-indigo-950 dark:to-gray-800 opacity-70"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/30 via-transparent to-transparent dark:from-blue-900/10 dark:via-transparent dark:to-transparent"></div>
      </div>
      
      {/* Background shapes */}
      <div className="fixed inset-0 z-[-1] overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.5 }}
          className="absolute top-10 right-[10%] w-64 h-64 rounded-full bg-health-200/30 dark:bg-health-700/10 blur-3xl"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute bottom-10 left-[5%] w-72 h-72 rounded-full bg-indigo-200/30 dark:bg-indigo-700/10 blur-3xl"
        />
      </div>
      
      {/* Desktop navbar - hide on symptom analyzer if mobile for full immersion */}
      {!isMobile && <Navbar />}
      
      {/* Page content with enhanced animation */}
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
        className={`mx-auto flex-grow ${
          isSymptomAnalyzer 
            ? "max-w-6xl px-0 sm:px-4 pt-0 sm:pt-6" 
            : "max-w-6xl px-4 sm:px-6 lg:px-8 pt-6"
        } pb-24`}
      >
        <Outlet />
      </motion.main>
      
      {/* Footer - hide on symptom analyzer for full immersion */}
      {!isSymptomAnalyzer && <Footer />}
      
      {/* Mobile navigation - hide on symptom analyzer for full immersion */}
      {isMobile && !isSymptomAnalyzer && <MobileNav />}
      {isMobile && isSymptomAnalyzer && (
        <div className="fixed bottom-4 right-4 z-40">
          <a
            href="/"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg border border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-800 dark:text-gray-200"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </a>
        </div>
      )}
    </div>
  );
};

export default Layout;
