
import React from "react";
import { AnimatePresence } from "framer-motion";
import { Diagnosis } from "@/hooks/use-symptom-analysis";
import DiagnosisCard from "./DiagnosisCard";

interface ConditionsTabProps {
  sortedDiagnosis: Diagnosis[];
}

const ConditionsTab = ({ sortedDiagnosis }: ConditionsTabProps) => {
  return (
    <div className="space-y-6 pt-4">
      <AnimatePresence initial={false}>
        {sortedDiagnosis.map((result, index) => (
          <DiagnosisCard 
            key={result.condition} 
            result={result} 
            index={index} 
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ConditionsTab;
