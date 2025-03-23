
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Check, Info, AlertTriangle, Shield, ArrowUpDown, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Diagnosis } from "@/hooks/use-symptom-analysis";

interface SymptomResultsProps {
  diagnosis: Diagnosis[] | null;
  isLoading: boolean;
  error: string | null;
}

const SymptomResults = ({ diagnosis, isLoading, error }: SymptomResultsProps) => {
  const [sortBy, setSortBy] = React.useState<'probability' | 'severity'>('probability');
  
  // Loading state
  if (isLoading) {
    return (
      <Card className="shadow-lg border-2 border-muted/50">
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

  // Get the numeric value for severity for sorting
  const getSeverityValue = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'low': return 1;
      case 'medium': return 2;
      case 'high': return 3;
      default: return 0;
    }
  };

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
            <CardContent className="space-y-6 pt-4">
              <AnimatePresence initial={false}>
                {sortedDiagnosis.map((result, index) => (
                  <motion.div
                    key={result.condition}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border rounded-lg p-4 shadow-sm"
                  >
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
                        <span>Likelihood</span>
                        <span>{Math.round(result.probability * 100)}%</span>
                      </div>
                      <Progress value={result.probability * 100} className="h-2" 
                        indicatorClassName={
                          result.probability > 0.7 ? "bg-health-600" : 
                          result.probability > 0.4 ? "bg-health-400" : "bg-health-300"
                        }
                      />
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{result.description}</p>
                    
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value={`recommendations-${index}`}>
                        <AccordionTrigger className="text-sm font-medium">
                          Recommendations
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            {result.recommendations.map((rec, recIndex) => (
                              <li key={recIndex}>{rec}</li>
                            ))}
                          </ul>
                          <div className="mt-3 pt-3 border-t border-dashed">
                            <Button 
                              variant="link" 
                              className="text-xs p-0 h-auto" 
                              onClick={() => window.open(`https://www.mayoclinic.org/search/search-results?q=${encodeURIComponent(result.condition)}`, '_blank')}
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Learn more about {result.condition}
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </motion.div>
                ))}
              </AnimatePresence>
            </CardContent>
          </TabsContent>
          
          <TabsContent value="summary">
            <CardContent className="pt-4">
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
