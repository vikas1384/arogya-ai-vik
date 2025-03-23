
import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, Check, Info, AlertTriangle, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Diagnosis } from "@/hooks/use-symptom-analysis";

interface SymptomResultsProps {
  diagnosis: Diagnosis[] | null;
  isLoading: boolean;
  error: string | null;
}

const SymptomResults = ({ diagnosis, isLoading, error }: SymptomResultsProps) => {
  // Loading state
  if (isLoading) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2 mt-2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error analyzing symptoms</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  // No diagnosis yet
  if (!diagnosis || diagnosis.length === 0) {
    return null;
  }

  // Get the severity color based on the severity level
  const getSeverityColor = (severity: 'low' | 'medium' | 'high') => {
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
  const getSeverityIcon = (severity: 'low' | 'medium' | 'high') => {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Shield className="text-health-500" />
            Diagnosis Results
          </CardTitle>
          <CardDescription>
            Based on your symptoms, here are the potential conditions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {diagnosis.map((result, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{result.condition}</h3>
                <Badge variant="outline" className={getSeverityColor(result.severity)}>
                  <span className="flex items-center gap-1">
                    {getSeverityIcon(result.severity)}
                    {result.severity.charAt(0).toUpperCase() + result.severity.slice(1)} Severity
                  </span>
                </Badge>
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between mb-1 text-sm">
                  <span>Probability</span>
                  <span>{Math.round(result.probability * 100)}%</span>
                </div>
                <Progress value={result.probability * 100} className="h-2" />
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{result.description}</p>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-sm font-medium">
                    Recommendations
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      {result.recommendations.map((rec, recIndex) => (
                        <li key={recIndex}>{rec}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-4">
          <p className="text-xs text-center text-gray-500 dark:text-gray-400 max-w-md">
            <span className="font-semibold">Disclaimer:</span> This analysis is based on the symptoms you provided and is not a substitute for professional medical advice. Please consult a healthcare provider for proper diagnosis and treatment.
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default SymptomResults;
