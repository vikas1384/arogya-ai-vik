
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Stethoscope, Users, BarChart3, UserCircle } from "lucide-react";

const MobileNav = () => {
  return (
    <nav className="fixed bottom-0 inset-x-0 glassmorphism border-t border-gray-200 dark:border-gray-800 py-2 px-4 z-50 shadow-lg">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex justify-around items-center"
      >
        <NavItem 
          to="/" 
          icon={
            <div className="flex items-center justify-center h-6 w-6 bg-blue-50 rounded-full">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-health-600">
                <path d="M3 12H7.5L9.5 6L13.5 18L15.5 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          } 
          label="Home" 
        />
        <NavItem to="/symptom-analyzer" icon={<Stethoscope />} label="Symptoms" />
        <NavItem to="/doctor-consultation" icon={<Users />} label="Doctors" />
        <NavItem to="/health-insights" icon={<BarChart3 />} label="Insights" />
        <NavItem to="/profile" icon={<UserCircle />} label="Profile" />
      </motion.div>
    </nav>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem = ({ to, icon, label }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      className="relative px-3 py-2"
    >
      {({ isActive }) => (
        <div className="flex flex-col items-center">
          <span 
            className={`h-6 w-6 mb-1 ${isActive ? 'text-health-600 dark:text-health-400' : 'text-gray-500 dark:text-gray-400'}`}
          >
            {icon}
          </span>
          <span 
            className={`text-xs ${isActive ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
          >
            {label}
          </span>
          {isActive && (
            <motion.div
              layoutId="mobile-nav-indicator"
              className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-health-500 rounded-full shadow-sm shadow-health-500/50"
              transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
            />
          )}
        </div>
      )}
    </NavLink>
  );
};

export default MobileNav;
