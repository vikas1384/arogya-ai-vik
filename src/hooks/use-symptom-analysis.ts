
import { useState } from 'react';
import { analyzeSymptoms as apiAnalyzeSymptoms } from '@/services/api/symptomAnalysis';

export type Diagnosis = {
  condition: string;
  probability: number;
  description: string;
  recommendations: string[];
  severity: 'low' | 'medium' | 'high';
};

export const useSymptomAnalysis = () => {
  const [diagnosis, setDiagnosis] = useState<Diagnosis[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeSymptoms = async (symptoms: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await apiAnalyzeSymptoms(symptoms);
      setDiagnosis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during symptom analysis');
      setDiagnosis(null);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    diagnosis,
    isLoading,
    error,
    analyzeSymptoms,
  };
};
