
import React from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface DiagnosisErrorProps {
  error: string;
}

const DiagnosisError = ({ error }: DiagnosisErrorProps) => {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error analyzing symptoms</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
};

export default DiagnosisError;
