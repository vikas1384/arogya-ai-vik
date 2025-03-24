import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, ArrowLeft } from "lucide-react";
import Navbar from "./Navbar";
import MobileNav from "./MobileNav";
import Footer from "./Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

const Layout = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [theme, setTheme] = useState<"light" | "dark">(
    localStorage.getItem("theme") as "light" | "dark" || "light"
  );
  
  const isSymptomAnalyzer = location.pathname === "/symptom-analyzer";
  const isSymptomChecker = location.pathname === "/symptom-checker";
  const shouldHideNavAndFooter = isSymptomAnalyzer || (isMobile && isSymptomChecker);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="fixed inset-0 z-[-1] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-sky-50 dark:from-gray-900 dark:via-indigo-950 dark:to-gray-800 opacity-70 transition-colors duration-700"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/30 via-transparent to-transparent dark:from-blue-900/10 dark:via-transparent dark:to-transparent transition-colors duration-700"></div>
        
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
      
      {!shouldHideNavAndFooter && <Navbar theme={theme} toggleTheme={toggleTheme} />}
      
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
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-health-600 focus:outline-none focus:ring-2 focus:ring-health-600"
        >
          Skip to main content
        </a>
        
        <div id="main-content">
          <Outlet />
        </div>
      </motion.main>
      
      {!shouldHideNavAndFooter && <Footer />}
      
      {isMobile && !shouldHideNavAndFooter && <MobileNav toggleTheme={toggleTheme} theme={theme} />}
      
      {shouldHideNavAndFooter && (
        <div className="fixed bottom-4 right-4 z-40 flex items-center gap-3">
          <Button 
            onClick={toggleTheme} 
            size="icon" 
            variant="outline" 
            className="rounded-full h-10 w-10 backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 shadow-md"
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div 
                key={theme}
                initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 20, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </motion.div>
            </AnimatePresence>
          </Button>
          <a
            href="/"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg border border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform duration-300"
          >
            <ArrowLeft className="text-gray-800 dark:text-gray-200 h-5 w-5" />
          </a>
        </div>
      )}
    </div>
  );
};

export default Layout;
