
import React from "react";
import { Info, AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Diagnosis } from "@/hooks/use-symptom-analysis";

interface HealthSummaryTabProps {
  sortedDiagnosis: Diagnosis[];
}

const HealthSummaryTab = ({ sortedDiagnosis }: HealthSummaryTabProps) => {
  return (
    <div className="space-y-4">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Summary of Analysis</AlertTitle>
        <AlertDescription>
          Based on the symptom analysis, here's a comprehensive health summary.
        </AlertDescription>
      </Alert>
      
      <div className="rounded-lg border p-4">
        <h3 className="font-medium mb-2">Key Findings</h3>
        <ul className="space-y-2">
          {sortedDiagnosis.length > 0 && (
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                <strong>Primary concern:</strong> {sortedDiagnosis[0].condition} 
                ({Math.round(sortedDiagnosis[0].probability * 100)}% likelihood)
              </span>
            </li>
          )}
          
          {sortedDiagnosis.some(d => d.severity === 'high') && (
            <li className="flex items-start text-red-600 dark:text-red-400">
              <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>
                <strong>Attention required:</strong> Some conditions detected have high severity. 
                Medical consultation is recommended.
              </span>
            </li>
          )}
          
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>
              <strong>Found {sortedDiagnosis.length} potential {sortedDiagnosis.length === 1 ? 'condition' : 'conditions'}</strong> matching your symptoms.
            </span>
          </li>
        </ul>
      </div>
      
      <div className="rounded-lg border p-4">
        <h3 className="font-medium mb-2">General Recommendations</h3>
        <ul className="space-y-1">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>
              Monitor your symptoms and keep track of any changes.
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>
              Stay hydrated and get adequate rest.
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>
              Consult with a healthcare provider for a proper diagnosis.
            </span>
          </li>
          {sortedDiagnosis.some(d => d.severity === 'high') && (
            <li className="flex items-start font-medium">
              <span className="mr-2">•</span>
              <span>
                Seek medical attention promptly due to potential serious conditions.
              </span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default HealthSummaryTab;
