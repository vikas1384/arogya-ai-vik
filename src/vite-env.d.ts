
/// <reference types="vite/client" />

/**
 * Global declarations for TypeScript
 * These ensure proper typing across the application
 */
declare global {
  // Core variables
  const category: string;
  
  // Enhanced global object with comprehensive health platform variables
  interface Window {
    category: string;
    globalArogyaVars: {
      category: string;
      version: string;
      features: {
        symptomAnalysis: boolean;
        doctorConsultation: boolean;
        healthInsights: boolean;
        aiDiagnosis?: boolean;
        teleMedicine?: boolean;
        realTimeMonitoring?: boolean;
      };
      user?: {
        isAuthenticated: boolean;
        preferredLanguage?: string;
        accessLevel?: 'basic' | 'premium' | 'professional';
      };
      system?: {
        isOnline: boolean;
        lastUpdated: string;
        apiEndpoints?: Record<string, string>;
      };
    };
  }
}

// This export ensures this file is treated as a module
export {};
