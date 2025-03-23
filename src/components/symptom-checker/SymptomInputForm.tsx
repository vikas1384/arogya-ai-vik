
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface SymptomInputFormProps {
  symptoms: string;
  setSymptoms: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
}

const SymptomInputForm = ({
  symptoms,
  setSymptoms,
  handleSubmit,
  isLoading,
}: SymptomInputFormProps) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder="Describe your symptoms in detail (e.g., 'I have a headache, fever, and sore throat for the past 2 days')"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        rows={5}
        className="w-full resize-none"
        disabled={isLoading}
      />
      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Analyze Symptoms
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default SymptomInputForm;
