
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Stethoscope, Info, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useSymptomAnalysis } from "@/hooks/use-symptom-analysis";
import SymptomResults from "@/components/symptom-checker/SymptomResults";
import SymptomInputForm from "@/components/symptom-checker/SymptomInputForm";
import { Link } from "react-router-dom";

const SymptomChecker = () => {
  const { toast } = useToast();
  const [symptoms, setSymptoms] = useState<string>("");
  const { analyzeSymptoms, diagnosis, isLoading, error } = useSymptomAnalysis();
  const [showTips, setShowTips] = useState(false);

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
    <AnimatePresence mode="wait">
      <motion.div
        key="symptom-checker"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="container mx-auto py-8 px-4 max-w-4xl"
      >
        <div className="flex items-center mb-6">
          <Link to="/" className="mr-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold health-gradient-text">AI Symptom Analyzer</h1>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-center mb-8"
        >
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Describe your symptoms in detail and our AI will provide a comprehensive analysis
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="mb-8 shadow-lg interactive-card border border-gray-100 dark:border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-xl">
                <div className="h-8 w-8 rounded-full bg-health-100 dark:bg-health-900/50 flex items-center justify-center">
                  <Stethoscope className="h-4 w-4 text-health-600" />
                </div>
                Describe Your Symptoms
              </CardTitle>
              
              <CardDescription className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-0 h-auto text-xs text-muted-foreground flex items-center gap-1"
                  onClick={() => setShowTips(!showTips)}
                >
                  <Info className="h-3.5 w-3.5" />
                  {showTips ? "Hide tips" : "Show tips for better results"}
                </Button>
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <AnimatePresence>
                {showTips && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-blue-800 dark:text-blue-300"
                  >
                    <h3 className="font-medium mb-1">Tips for the best analysis:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Describe when symptoms started and how they've changed</li>
                      <li>Mention the location and severity of any pain</li>
                      <li>Include any relevant medical history</li>
                      <li>List any medications you're currently taking</li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <SymptomInputForm 
                symptoms={symptoms}
                setSymptoms={setSymptoms}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
              />
            </CardContent>
          </Card>
        </motion.div>

        <AnimatePresence>
          {(diagnosis || isLoading) && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <SymptomResults
                diagnosis={diagnosis}
                isLoading={isLoading}
                error={error}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default SymptomChecker;
