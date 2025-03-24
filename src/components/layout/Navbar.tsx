import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Stethoscope, UserCircle, BarChart3, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const Navbar = ({ theme, toggleTheme }: NavbarProps) => {
  return (
    <header className="py-4 px-6 sticky top-0 z-50 backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center shadow-sm"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-health-600">
              <path d="M3 12H7.5L9.5 6L13.5 18L15.5 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-xl text-health-600 group-hover:text-health-700 transition-all duration-300">
              Arogya AI
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Your AI Doctor, Anytime, Anywhere.
            </span>
          </div>
        </NavLink>

        <nav className="hidden md:flex items-center justify-center space-x-1">
          <NavItem to="/" exact>
            Home
          </NavItem>
          <NavItem to="/symptom-analyzer" icon={<Stethoscope className="h-4 w-4 mr-1.5" />}>
            Symptom Analyzer
          </NavItem>
          <NavItem to="/doctor-consultation" icon={<UserCircle className="h-4 w-4 mr-1.5" />}>
            Find Doctors
          </NavItem>
          <NavItem to="/health-insights" icon={<BarChart3 className="h-4 w-4 mr-1.5" />}>
            Health Insights
          </NavItem>
        </nav>

        <div className="flex items-center gap-3">
          <Button 
            onClick={toggleTheme} 
            size="icon" 
            variant="outline" 
            className="rounded-full h-10 w-10 backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 shadow-sm hover:shadow-md transition-all duration-300"
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

          <NavLink 
            to="/profile"
            className={({ isActive }) => 
              `relative flex items-center justify-center h-10 w-10 rounded-full ${
                isActive 
                  ? 'bg-health-50 text-health-700 dark:bg-health-900/50 dark:text-health-400' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
              } transition-all duration-300 shadow-sm hover:shadow-md`
            }
          >
            <UserCircle className="h-5 w-5" />
          </NavLink>
        </div>
      </div>
    </header>
  );
};

interface NavItemProps {
  to: string;
  exact?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const NavItem = ({ to, exact = false, icon, children }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      end={exact}
      className={({ isActive }) => 
        `relative px-4 py-2 rounded-full text-sm font-medium flex items-center transition-all duration-300 ${
          isActive 
            ? 'text-health-700 dark:text-health-400' 
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {icon && icon}
          {children}
          {isActive && (
            <motion.div
              layoutId="navbar-indicator"
              className="absolute inset-0 bg-health-50 dark:bg-health-900/30 rounded-full z-[-1]"
              transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
            />
          )}
        </>
      )}
    </NavLink>
  );
};

export default Navbar;
