import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Global Variable Initialization
 * Safely initializes global state variables across different environments
 */
(function initGlobalHealthPlatform() {
  // Check for window to ensure we're in a browser environment
  if (typeof window !== 'undefined') {
    try {
      // Primary category identifier
      window.category = "arogya";
      
      // Comprehensive platform configuration
      window.globalArogyaVars = {
        category: "arogya",
        version: "1.2.0", // Semantic versioning
        features: {
          symptomAnalysis: true,
          doctorConsultation: true,
          healthInsights: true,
          aiDiagnosis: true,
          teleMedicine: true,
          realTimeMonitoring: false // Feature flag for upcoming functionality
        },
        user: {
          isAuthenticated: false,
          preferredLanguage: navigator.language || 'en-US',
          accessLevel: 'basic'
        },
        system: {
          isOnline: navigator.onLine,
          lastUpdated: new Date().toISOString(),
          apiEndpoints: {
            symptoms: '/api/symptoms',
            doctors: '/api/doctors',
            insights: '/api/insights'
          }
        }
      };
      
      // Add event listeners to track system state
      window.addEventListener('online', () => {
        if (window.globalArogyaVars?.system) {
          window.globalArogyaVars.system.isOnline = true;
        }
      });
      
      window.addEventListener('offline', () => {
        if (window.globalArogyaVars?.system) {
          window.globalArogyaVars.system.isOnline = false;
        }
      });
      
      console.log("✅ Global Arogya Platform initialized successfully");
    } catch (error) {
      console.error("⚠️ Failed to initialize global Arogya variables:", error);
    }
  }
})();

// Also make category available in module scope for better reliability
// @ts-ignore - Creating a module-level pseudo-global
globalThis.category = "arogya";

// Card Components
// Enhanced shadcn/ui card components with improved animations and interactions

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] hover:border-primary/30 dark:hover:border-primary/50 group",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight group-hover:text-primary/90 transition-colors duration-300",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
