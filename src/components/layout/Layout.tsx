
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import MobileNav from "./MobileNav";
import { useIsMobile } from "@/hooks/use-mobile";

const Layout = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      {/* Background gradient */}
      <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 opacity-50"></div>
      
      {/* Desktop navbar */}
      {!isMobile && <Navbar />}
      
      {/* Page content with animation */}
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24"
      >
        <Outlet />
      </motion.main>
      
      {/* Mobile navigation */}
      {isMobile && <MobileNav />}
    </div>
  );
};

export default Layout;
