
import React from "react";
import { motion } from "framer-motion";
import { Shield, ArrowUpDown } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Diagnosis } from "@/hooks/use-symptom-analysis";
import { getSeverityValue } from "./utils/severity-utils";
import DiagnosisLoading from "./DiagnosisLoading";
import DiagnosisError from "./DiagnosisError";
import ConditionsTab from "./ConditionsTab";
import HealthSummaryTab from "./HealthSummaryTab";

interface SymptomResultsProps {
  diagnosis: Diagnosis[] | null;
  isLoading: boolean;
  error: string | null;
}

const SymptomResults = ({ diagnosis, isLoading, error }: SymptomResultsProps) => {
  const [sortBy, setSortBy] = React.useState<'probability' | 'severity'>('probability');
  
  // Loading state
  if (isLoading) {
    return <DiagnosisLoading />;
  }

  // Error state
  if (error) {
    return <DiagnosisError error={error} />;
  }

  // No diagnosis yet
  if (!diagnosis || diagnosis.length === 0) {
    return null;
  }

  // Sort diagnoses based on selected sort method
  const sortedDiagnosis = [...diagnosis].sort((a, b) => {
    if (sortBy === 'probability') {
      return b.probability - a.probability;
    } else {
      return getSeverityValue(b.severity) - getSeverityValue(a.severity);
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl flex items-center gap-2">
              <Shield className="text-health-500" />
              Symptom Analysis Results
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortBy(sortBy === 'probability' ? 'severity' : 'probability')}
              className="text-xs h-8"
            >
              <ArrowUpDown className="mr-2 h-3 w-3" />
              Sort by {sortBy === 'probability' ? 'Severity' : 'Probability'}
            </Button>
          </div>
          <CardDescription>
            Based on your symptoms, here are the potential conditions
          </CardDescription>
        </CardHeader>
        
        <Tabs defaultValue="conditions" className="w-full">
          <div className="px-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="conditions">Possible Conditions</TabsTrigger>
              <TabsTrigger value="summary">Health Summary</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="conditions">
            <CardContent>
              <ConditionsTab sortedDiagnosis={sortedDiagnosis} />
            </CardContent>
          </TabsContent>
          
          <TabsContent value="summary">
            <CardContent className="pt-4">
              <HealthSummaryTab sortedDiagnosis={sortedDiagnosis} />
            </CardContent>
          </TabsContent>
        </Tabs>

        <CardFooter className="flex justify-center border-t pt-4 px-6">
          <p className="text-xs text-center text-gray-500 dark:text-gray-400 max-w-md">
            <span className="font-semibold">Important Disclaimer:</span> This analysis is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default SymptomResults;
