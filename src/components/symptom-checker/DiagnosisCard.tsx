
import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Diagnosis } from "@/hooks/use-symptom-analysis";
import { getSeverityColor, getSeverityIcon } from "./utils/severity-utils";

interface DiagnosisCardProps {
  result: Diagnosis;
  index: number;
}

const DiagnosisCard = ({ result, index }: DiagnosisCardProps) => {
  return (
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
        <Progress 
          value={result.probability * 100} 
          className="h-2" 
          color={
            result.probability > 0.7 ? "var(--health-600)" : 
            result.probability > 0.4 ? "var(--health-400)" : "var(--health-300)"
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
  );
};

export default DiagnosisCard;
