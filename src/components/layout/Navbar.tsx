
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Stethoscope, UserCircle, BarChart3 } from "lucide-react";

const Navbar = () => {
  return (
    <header className="py-4 px-6 sticky top-0 z-50 backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="h-10 w-10 rounded-lg health-gradient flex items-center justify-center shadow-sm"
          >
            <Heart className="text-white h-5 w-5" />
          </motion.div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-gray-900 dark:text-white group-hover:health-gradient-text transition-all duration-300">
              Arogya AI
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Your AI Doctor
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
          <NavLink 
            to="/profile"
            className={({ isActive }) => 
              `relative flex items-center justify-center h-10 w-10 rounded-full ${
                isActive 
                  ? 'bg-health-100 text-health-700 dark:bg-health-900 dark:text-health-400' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
              } transition-all duration-300`
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
