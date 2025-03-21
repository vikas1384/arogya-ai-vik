
/// <reference types="vite/client" />

// Global declarations for TypeScript
declare global {
  // Allow 'category' to be used in any file without explicit import
  const category: string;
  
  // Add more global types as needed
  interface Window {
    category: string;
    globalArogyaVars: {
      category: string;
      version: string;
      features: {
        symptomAnalysis: boolean;
        doctorConsultation: boolean;
        healthInsights: boolean;
      };
    };
  }
}

// This export ensures this file is treated as a module
export {};
