
import { useState } from 'react';
import { analyzeSymptoms as apiAnalyzeSymptoms } from '@/services/api/symptomAnalysis';
import { toast } from "sonner";

export type Diagnosis = {
  condition: string;
  probability: number;
  description: string;
  recommendations: string[];
  severity: 'low' | 'medium' | 'high';
};

export type SymptomHistory = {
  id: string;
  timestamp: Date;
  symptoms: string;
  diagnoses: Diagnosis[];
};

export const useSymptomAnalysis = () => {
  const [diagnosis, setDiagnosis] = useState<Diagnosis[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<SymptomHistory[]>(() => {
    const savedHistory = localStorage.getItem('symptom-history');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const analyzeSymptoms = async (symptoms: string, options?: { includeInHistory: boolean }) => {
    if (!symptoms.trim()) {
      toast.error("Please enter your symptoms before analyzing");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const result = await apiAnalyzeSymptoms(symptoms);
      setDiagnosis(result);
      
      // Save to history if option is enabled (default true)
      const includeInHistory = options?.includeInHistory !== false;
      if (includeInHistory && result.length > 0) {
        const newHistoryEntry: SymptomHistory = {
          id: Date.now().toString(),
          timestamp: new Date(),
          symptoms,
          diagnoses: result,
        };
        
        const updatedHistory = [newHistoryEntry, ...history].slice(0, 10); // Keep last 10 entries
        setHistory(updatedHistory);
        localStorage.setItem('symptom-history', JSON.stringify(updatedHistory));
      }
      
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during symptom analysis';
      setError(errorMessage);
      toast.error(errorMessage);
      setDiagnosis(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('symptom-history');
    toast.success("Symptom history cleared");
  };

  return {
    diagnosis,
    isLoading,
    error,
    analyzeSymptoms,
    history,
    clearHistory,
  };
};
