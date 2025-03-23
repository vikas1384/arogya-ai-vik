
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Send, Stethoscope, AlertCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useSymptomAnalysis } from "@/hooks/use-symptom-analysis";
import SymptomResults from "@/components/symptom-checker/SymptomResults";
import SymptomInputForm from "@/components/symptom-checker/SymptomInputForm";

const SymptomChecker = () => {
  const { toast } = useToast();
  const [symptoms, setSymptoms] = useState<string>("");
  const { analyzeSymptoms, diagnosis, isLoading, error } = useSymptomAnalysis();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!symptoms.trim()) {
      toast({
        title: "Please enter symptoms",
        description: "You need to describe your symptoms to get a diagnosis.",
        variant: "destructive",
      });
      return;
    }

    await analyzeSymptoms(symptoms);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto py-8 px-4 max-w-4xl"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 health-gradient-text">Symptom Analyzer</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Describe your symptoms below and our AI will analyze them to provide possible diagnoses
        </p>
      </div>

      <Card className="mb-8 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="text-health-500" />
            Describe Your Symptoms
          </CardTitle>
          <CardDescription>
            Please be as detailed as possible about what you're experiencing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SymptomInputForm 
            symptoms={symptoms}
            setSymptoms={setSymptoms}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>

      {(diagnosis || isLoading) && (
        <SymptomResults
          diagnosis={diagnosis}
          isLoading={isLoading}
          error={error}
        />
      )}
    </motion.div>
  );
};

export default SymptomChecker;
