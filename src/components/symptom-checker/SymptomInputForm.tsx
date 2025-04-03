
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Send, Loader2, Plus, Sparkles } from "lucide-react";
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

// Common symptom suggestions organized by category
const SYMPTOM_SUGGESTIONS = {
  General: ["Fever", "Fatigue", "Chills", "Loss of appetite", "Weight loss", "Night sweats"],
  Pain: ["Headache", "Chest pain", "Abdominal pain", "Joint pain", "Muscle aches", "Back pain"],
  Respiratory: ["Cough", "Shortness of breath", "Sore throat", "Runny nose", "Congestion"],
  Digestive: ["Nausea", "Vomiting", "Diarrhea", "Constipation", "Bloating"],
  Neurological: ["Dizziness", "Confusion", "Memory loss", "Difficulty speaking", "Numbness"],
  Skin: ["Rash", "Itching", "Discoloration", "Swelling", "Bruising"]
};

const SymptomInputForm = ({
  symptoms,
  setSymptoms,
  handleSubmit,
  isLoading,
}: SymptomInputFormProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("General");
  const [recordingDuration, setRecordingDuration] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Effect to handle recording timer
  useEffect(() => {
    if (isRecording) {
      recordingTimerRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        setRecordingDuration(0);
      }
    }
    
    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    };
  }, [isRecording]);
  
  // Format recording time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
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

  // Generate a sample symptom description for demonstration
  const generateSample = () => {
    const samples = [
      "I've had a headache for the past 3 days, along with fever and a runny nose. My temperature is around 100°F.",
      "I'm experiencing sharp abdominal pain on my lower right side since yesterday morning. It gets worse when I move. No vomiting but I feel nauseous.",
      "I've been coughing for a week with yellow phlegm. I also feel tired all the time and sometimes short of breath.",
      "I've noticed a red rash on my chest that's slightly itchy. It started 2 days ago and seems to be spreading.",
      "I've been having trouble sleeping, feeling anxious, and experiencing heart palpitations for the past 10 days. No previous heart issues."
    ];
    
    const randomSample = samples[Math.floor(Math.random() * samples.length)];
    setSymptoms(randomSample);
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
          className="w-full resize-none pr-12 focus:ring-2 focus:ring-health-500 transition-all duration-300"
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
                    className="absolute top-2 right-2 h-8 w-8 rounded-full hover:bg-health-100 dark:hover:bg-health-900/30"
                    disabled={isLoading || isRecording}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-3" align="end">
                  <div className="space-y-3">
                    <h3 className="font-medium text-sm mb-2">Add symptoms to your description</h3>
                    
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {Object.keys(SYMPTOM_SUGGESTIONS).map((category) => (
                        <Button 
                          key={category}
                          variant={selectedCategory === category ? "default" : "outline"} 
                          size="sm"
                          type="button"
                          className="text-xs h-7"
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto p-1">
                      {SYMPTOM_SUGGESTIONS[selectedCategory as keyof typeof SYMPTOM_SUGGESTIONS].map((suggestion) => (
                        <Button
                          key={suggestion}
                          variant="outline"
                          size="sm"
                          type="button"
                          className="text-xs h-7 bg-white dark:bg-gray-900"
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
      
      <div className="flex flex-wrap items-center gap-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Button 
                  type="button" 
                  variant={isRecording ? "default" : "outline"}
                  size="sm"
                  onClick={handleVoiceInput}
                  disabled={isLoading || isRecording}
                  className={`flex items-center gap-1.5 ${isRecording ? 'bg-red-500 hover:bg-red-600' : ''}`}
                >
                  {isRecording ? (
                    <>
                      <div className="voice-wave text-white">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <span>{formatTime(recordingDuration)}</span>
                    </>
                  ) : (
                    <>
                      <Mic className="h-4 w-4" />
                      <span>Voice</span>
                    </>
                  )}
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
              <Button 
                variant="outline" 
                size="sm" 
                type="button"
                className="flex items-center gap-1.5"
                onClick={generateSample}
                disabled={isLoading || isRecording}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Sample</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Use a sample symptom description</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="flex-1"></div>
        
        <Button 
          type="submit" 
          disabled={isLoading || isRecording || !symptoms.trim()}
          size="sm"
          className="bg-health-600 hover:bg-health-700 text-white rounded-full px-6 transition-all duration-300 hover:scale-105"
        >
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
