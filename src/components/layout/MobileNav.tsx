
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Stethoscope, UserCircle, BarChart3, Menu, X, Moon, Sun } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface MobileNavProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const MobileNav = ({ theme, toggleTheme }: MobileNavProps) => {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  
  const closeSheet = () => setOpen(false);

  const navItems = [
    { 
      path: "/", 
      name: "Home", 
      icon: <Home className="h-5 w-5" />,
      exact: true
    },
    { 
      path: "/symptom-analyzer", 
      name: "Symptom Analyzer", 
      icon: <Stethoscope className="h-5 w-5" /> 
    },
    { 
      path: "/doctor-consultation", 
      name: "Find Doctors", 
      icon: <UserCircle className="h-5 w-5" /> 
    },
    { 
      path: "/health-insights", 
      name: "Health Insights", 
      icon: <BarChart3 className="h-5 w-5" /> 
    }
  ];

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 p-3 flex items-center justify-between bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <motion.div 
          initial={false}
          animate={open ? "open" : "closed"}
          className="flex-1 flex items-center"
        >
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full"
                aria-label="Open navigation menu"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={open ? "close" : "open"}
                    initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 10, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </motion.div>
                </AnimatePresence>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 max-w-[280px] sm:max-w-[320px]">
              <div className="h-full flex flex-col pb-12">
                <div className="px-4 py-6 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shadow-sm">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-health-600">
                        <path d="M3 12H7.5L9.5 6L13.5 18L15.5 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-lg text-health-600">
                        Arogya AI
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Your AI Doctor
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 px-2 py-4 overflow-y-auto">
                  <nav className="flex flex-col gap-1">
                    {navItems.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.exact}
                        onClick={closeSheet}
                        className={({ isActive }) =>
                          `relative flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                            isActive
                              ? 'text-health-700 dark:text-health-400 bg-health-50 dark:bg-health-900/30'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`
                        }
                      >
                        {item.icon}
                        <span className="ml-3">{item.name}</span>
                      </NavLink>
                    ))}
                  </nav>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-800 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Theme
                    </span>
                    <Button 
                      onClick={toggleTheme} 
                      size="icon" 
                      variant="outline" 
                      className="rounded-full h-9 w-9"
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
                          {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                        </motion.div>
                      </AnimatePresence>
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </motion.div>
        
        <div className="flex-1 flex justify-center">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `flex items-center justify-center h-10 w-10 rounded-full ${
                isActive 
                  ? 'bg-health-50 text-health-700 dark:bg-health-900/50 dark:text-health-400' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
              } transition-all duration-300`
            }
          >
            <Home className="h-5 w-5" />
          </NavLink>
        </div>
        
        <div className="flex-1 flex justify-end items-center gap-2">
          {/* Theme toggle button */}
          <Button 
            onClick={toggleTheme} 
            size="icon" 
            variant="outline" 
            className="rounded-full h-10 w-10"
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
              `flex items-center justify-center h-10 w-10 rounded-full ${
                isActive 
                  ? 'bg-health-50 text-health-700 dark:bg-health-900/50 dark:text-health-400' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
              } transition-all duration-300`
            }
          >
            <UserCircle className="h-5 w-5" />
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
