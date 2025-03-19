
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import MobileNav from "./MobileNav";
import { useIsMobile } from "@/hooks/use-mobile";

const Layout = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Check if the current route is the symptom analyzer
  const isSymptomAnalyzer = location.pathname === "/symptom-analyzer";

  return (
    <div className="min-h-screen bg-background">
      {/* Background gradient */}
      <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 opacity-50"></div>
      
      {/* Desktop navbar - hide on symptom analyzer if mobile for full immersion */}
      {!isMobile && <Navbar />}
      
      {/* Page content with animation */}
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
        className={`mx-auto ${
          isSymptomAnalyzer 
            ? "max-w-6xl px-0 sm:px-4 pt-0 sm:pt-6" 
            : "max-w-6xl px-4 sm:px-6 lg:px-8 pt-6"
        } pb-24`}
      >
        <Outlet />
      </motion.main>
      
      {/* Mobile navigation - hide on symptom analyzer for full immersion */}
      {isMobile && !isSymptomAnalyzer && <MobileNav />}
      {isMobile && isSymptomAnalyzer && (
        <div className="fixed bottom-4 right-4 z-40">
          <a
            href="/"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-lg border border-gray-200 dark:border-gray-700"
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
