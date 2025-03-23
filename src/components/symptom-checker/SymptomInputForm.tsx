
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Send, Loader2, Info, Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

interface SymptomInputFormProps {
  symptoms: string;
  setSymptoms: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
}

// Common symptom suggestions
const SYMPTOM_SUGGESTIONS = [
  "Headache",
  "Fever",
  "Cough",
  "Fatigue",
  "Shortness of breath",
  "Nausea",
  "Dizziness",
  "Chest pain",
  "Abdominal pain",
  "Rash",
  "Sore throat",
  "Joint pain",
  "Muscle aches",
  "Chills",
  "Loss of appetite"
];

const SymptomInputForm = ({
  symptoms,
  setSymptoms,
  handleSubmit,
  isLoading,
}: SymptomInputFormProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Add a symptom suggestion to the current text
  const addSymptomSuggestion = (suggestion: string) => {
    const currentValue = symptoms.trim();
    if (currentValue) {
      if (currentValue.endsWith(",") || currentValue.endsWith(".") || currentValue.endsWith(";")) {
        setSymptoms(`${currentValue} ${suggestion.toLowerCase()}`);
      } else {
        setSymptoms(`${currentValue}, ${suggestion.toLowerCase()}`);
      }
    } else {
      setSymptoms(suggestion);
    }
    
    // Focus back on textarea
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };
  
  // Handle voice input if supported by browser
  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast.error("Voice input is not supported in your browser");
      return;
    }
    
    // This is a type assertion for TypeScript
    const SpeechRecognition = window.webkitSpeechRecognition as any;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    
    setIsRecording(true);
    toast.info("Listening for symptoms...");
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSymptoms(symptoms ? `${symptoms}, ${transcript}` : transcript);
      setIsRecording(false);
    };
    
    recognition.onerror = () => {
      setIsRecording(false);
      toast.error("Could not recognize speech. Please try again.");
    };
    
    recognition.onend = () => {
      setIsRecording(false);
    };
    
    recognition.start();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <Textarea
          ref={textareaRef}
          placeholder="Describe your symptoms in detail (e.g., 'I have a headache, fever, and sore throat for the past 2 days')"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          rows={5}
          className="w-full resize-none pr-12"
          disabled={isLoading || isRecording}
        />
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    type="button"
                    className="absolute top-2 right-2 h-8 w-8"
                    disabled={isLoading || isRecording}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-2" align="end">
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm">Common symptoms</h3>
                    <div className="flex flex-wrap gap-1">
                      {SYMPTOM_SUGGESTIONS.map((suggestion) => (
                        <Button
                          key={suggestion}
                          variant="outline"
                          size="sm"
                          type="button"
                          className="text-xs h-7"
                          onClick={() => addSymptomSuggestion(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add common symptoms</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Button 
                    type="button" 
                    variant="outline"
                    size="icon"
                    onClick={handleVoiceInput}
                    disabled={isLoading || isRecording}
                  >
                    <Mic className={`h-4 w-4 ${isRecording ? 'text-red-500 animate-pulse' : ''}`} />
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Describe your symptoms using voice input</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="px-0" type="button">
                  <Info className="h-4 w-4 mr-1" />
                  <span className="text-xs text-muted-foreground">Be specific about location, duration and severity</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-80">
                <p>For better analysis, include:</p>
                <ul className="list-disc pl-4 text-xs mt-1">
                  <li>Where you feel symptoms</li>
                  <li>When they started</li>
                  <li>How severe they are (mild, moderate, severe)</li>
                  <li>Any relevant medical history</li>
                </ul>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <Button type="submit" disabled={isLoading || isRecording || !symptoms.trim()}>
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
