
import React from "react";
import { Check, AlertTriangle, AlertCircle, Info } from "lucide-react";

export type SeverityLevel = 'low' | 'medium' | 'high';

// Get the severity color based on the severity level
export const getSeverityColor = (severity: SeverityLevel): string => {
  switch (severity) {
    case 'low':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case 'high':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  }
};

// Get the severity icon based on the severity level
export const getSeverityIcon = (severity: SeverityLevel) => {
  switch (severity) {
    case 'low':
      return <Check className="h-4 w-4 text-green-600 dark:text-green-400" />;
    case 'medium':
      return <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />;
    case 'high':
      return <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />;
    default:
      return <Info className="h-4 w-4" />;
  }
};

// Get the numeric value for severity for sorting
export const getSeverityValue = (severity: SeverityLevel): number => {
  switch (severity) {
    case 'low': return 1;
    case 'medium': return 2;
    case 'high': return 3;
    default: return 0;
  }
};
