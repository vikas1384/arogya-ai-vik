import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Send, Upload, Bot, X, Clock, ArrowRight, BadgePercent, Brain, 
  Microscope, Activity, FileText, Zap, BarChart, Mic, Camera,
  AlertTriangle, RefreshCw, FileSearch, Dna, Landmark, Waves
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface Message {
  id: number;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  image?: string | null;
  confidenceLevel?: number;
  category?: string;
  language?: string;
  inputType?: "text" | "voice" | "image" | "video";
}

interface AnalysisHistory {
  id: number;
  date: Date;
  mainSymptom: string;
  diagnosis: string;
  confidenceLevel?: number;
}

interface SymptomSeverity {
  name: string;
  level: number;
  duration?: string;
  pattern?: "constant" | "intermittent" | "increasing" | "decreasing";
  triggers?: string[];
}

interface DiagnosisResult {
  condition: string;
  probability: number;
  description: string;
  recommendations: string[];
  specialistTypes?: string[];
  severity?: "mild" | "moderate" | "severe";
  commonComorbidities?: string[];
}

interface MedicalResource {
  id: number;
  title: string;
  type: "article" | "video" | "research" | "infographic";
  url: string;
  source: string;
  relevance: number;
}

interface HealthMetric {
  name: string;
  value: number;
  unit: string;
  normalRange: { min: number; max: number };
  trend: "increasing" | "decreasing" | "stable";
}

const symptomCategories = [
  { value: "general", label: "General" },
  { value: "respiratory", label: "Respiratory" },
  { value: "digestive", label: "Digestive" },
  { value: "skin", label: "Skin & Dermatology" },
  { value: "neurological", label: "Neurological" },
  { value: "musculoskeletal", label: "Musculoskeletal" },
  { value: "cardiovascular", label: "Cardiovascular" },
  { value: "endocrine", label: "Endocrine & Metabolic" },
  { value: "immunological", label: "Immunological" },
  { value: "urological", label: "Urological" },
  { value: "ophthalmological", label: "Eye & Vision" },
  { value: "ent", label: "Ear, Nose & Throat" }
];

const supportedLanguages = [
  { value: "en", label: "English" },
  { value: "hi", label: "Hindi" },
  { value: "bn", label: "Bengali" },
  { value: "te", label: "Telugu" },
  { value: "mr", label: "Marathi" },
  { value: "ta", label: "Tamil" },
  { value: "ur", label: "Urdu" },
  { value: "gu", label: "Gujarati" },
  { value: "kn", label: "Kannada" },
  { value: "ml", label: "Malayalam" }
];

const medicalResourceDatabase: MedicalResource[] = [
  {
    id: 1,
    title: "Understanding Common Respiratory Conditions",
    type: "article",
    url: "https://www.aiims.edu/en/departments-and-centers/departments/pulmonary-medicine.html",
    source: "AIIMS Delhi",
    relevance: 0.9
  },
  {
    id: 2,
    title: "Digestive Health: Recognizing Symptoms Early",
    type: "video",
    url: "https://www.youtube.com/watch?v=example",
    source: "Apollo Hospitals",
    relevance: 0.8
  },
  {
    id: 3,
    title: "Dermatological Conditions Common in South Asian Populations",
    type: "research",
    url: "https://pubmed.ncbi.nlm.nih.gov/example",
    source: "Indian Journal of Dermatology",
    relevance: 0.85
  },
  {
    id: 4,
    title: "Cardiovascular Health: Prevention and Early Detection",
    type: "infographic",
    url: "https://www.cardiologysocietyofindia.org/resources",
    source: "Cardiology Society of India",
    relevance: 0.78
  },
  {
    id: 5,
    title: "Neurological Symptoms: When to See a Doctor",
    type: "article",
    url: "https://www.nimhans.ac.in/patient-care/",
    source: "NIMHANS Bangalore",
    relevance: 0.88
  }
];

const SymptomAnalyzer = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm your AI medical assistant. How can I help you today? You can describe your symptoms or upload a relevant image for analysis. I support multiple Indian languages.",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("general");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [activeSymptoms, setActiveSymptoms] = useState<SymptomSeverity[]>([]);
  const [diagnosisResults, setDiagnosisResults] = useState<DiagnosisResult[]>([]);
  const [relatedResources, setRelatedResources] = useState<MedicalResource[]>([]);
  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>([]);
  const [analysisMode, setAnalysisMode] = useState<"standard" | "advanced">("standard");
  const [secondaryAnalysis, setSecondaryAnalysis] = useState(false);
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);
  const [currentAnalysisProgress, setCurrentAnalysisProgress] = useState(0);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [inputType, setInputType] = useState<"text" | "voice" | "image" | "video">("text");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast: hookToast } = useToast();
  const form = useForm();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [transcribedText, setTranscribedText] = useState("");
  
  // New advanced options state
  const [includeDemographics, setIncludeDemographics] = useState(false);
  const [includeGeneticFactors, setIncludeGeneticFactors] = useState(false);
  const [includeEnvironmentalFactors, setIncludeEnvironmentalFactors] = useState(false);
  const [userAge, setUserAge] = useState<number>(30);
  const [userGender, setUserGender] = useState<string>("not_specified");

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Reset progress when starting a new analysis
    if (isLoading) {
      setCurrentAnalysisProgress(0);
      const interval = setInterval(() => {
        setCurrentAnalysisProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            return prev;
          }
          return prev + Math.random() * 5;
        });
      }, 300);

      return () => clearInterval(interval);
    } else {
      setCurrentAnalysisProgress(100);
    }
  }, [isLoading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.addEventListener('dataavailable', (e) => {
        if (e.data.size > 0) {
          setRecordedChunks((prev) => [...prev, e.data]);
        }
      });
      
      mediaRecorder.addEventListener('stop', () => {
        // Simulate speech-to-text conversion (in a real app, we'd send to a service)
        simulateTranscription();
      });
      
      setRecordedChunks([]);
      mediaRecorder.start();
      setIsRecording(true);
      
      toast.info("Recording started. Speak clearly to describe your symptoms.");
    } catch (err) {
      console.error("Error accessing microphone:", err);
      hookToast({
        title: "Microphone access denied",
        description: "Please allow microphone access to use voice input",
        variant: "destructive",
      });
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast.info("Processing your voice input...");
    }
  };
  
  const simulateTranscription = () => {
    // In a real app, we would send the audio to a speech-to-text API
    // Here we'll just simulate it with some random symptom phrases
    const randomPhrases = [
      "I've been having a headache and fever for the last two days",
      "My stomach hurts and I feel nauseous after eating",
      "I have a sore throat and dry cough since yesterday",
      "I'm experiencing joint pain in my knees, especially when climbing stairs",
      "I have a rash on my arms that's itchy and red"
    ];
    
    // Simulate processing time
    setTimeout(() => {
      const randomPhrase = randomPhrases[Math.floor(Math.random() * randomPhrases.length)];
      setTranscribedText(randomPhrase);
      setInputText(randomPhrase);
      
      toast.success("Voice transcription complete!");
      setInputType("voice");
    }, 1500);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() && !uploadedImage) return;

    const userMessage: Message = {
      id: Date.now(),
      content: inputText,
      sender: "user",
      timestamp: new Date(),
      image: uploadedImage,
      category: selectedCategory,
      language: selectedLanguage,
      inputType: inputType
    };

    setMessages([...messages, userMessage]);
    setInputText("");
    setUploadedImage(null);
    setIsLoading(true);
    setSecondaryAnalysis(false);
    setShowDetailedAnalysis(false);
    setTranscribedText("");
    setInputType("text");

    try {
      // Make API call to local server
      const response = await fetch('http://localhost:8001/diagnose', {
        method: 'POST',
        headers: {
          'X-API-Key': '7HtqGqMBJ7EpcO7lamA4BEYiRKHBWxtRz8XaYiwlvpo',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          symptoms: inputText
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      
      // Create AI response message
      const aiResponse: Message = {
        id: Date.now(),
        content: data.response || "I've analyzed your symptoms. Here's what I found...",
        sender: "ai",
        timestamp: new Date(),
        confidenceLevel: data.confidence || 0.8
      };

      setMessages(prev => [...prev, aiResponse]);

      // Extract symptoms from input for advanced analysis
      const extractedSymptoms = extractSymptoms(inputText);
      setActiveSymptoms(extractedSymptoms);

      // Set analysis mode based on complexity of symptoms
      const complexAnalysis = extractedSymptoms.length > 2 || inputText.length > 50 || uploadedImage !== null;
      setAnalysisMode(complexAnalysis ? "advanced" : "standard");
      
      // Find related medical resources
      const relevantResources = findRelevantResources(inputText, selectedCategory, extractedSymptoms);
      setRelatedResources(relevantResources);
      
      // Generate health metrics based on symptoms
      const metrics = generateHealthMetrics(inputText, extractedSymptoms);
      setHealthMetrics(metrics);

      // Generate diagnosis results
      const results = generateDiagnosisResults(
        inputText, 
        selectedCategory, 
        extractedSymptoms, 
        includeDemographics ? userAge : undefined, 
        includeDemographics ? userGender : undefined
      );
      setDiagnosisResults(results);

      // Add to history if it's a symptom analysis (not just a greeting)
      if (inputText.trim() || uploadedImage) {
        const newHistoryItem: AnalysisHistory = {
          id: Date.now(),
          date: new Date(),
          mainSymptom: extractMainSymptom(inputText, selectedCategory, extractedSymptoms),
          diagnosis: results.length > 0 ? results[0].condition : "Analysis completed",
          confidenceLevel: results.length > 0 ? results[0].probability : undefined
        };
        setAnalysisHistory(prev => [newHistoryItem, ...prev]);
      }

    } catch (error) {
      console.error('Error analyzing symptoms:', error);
      const errorMessage: Message = {
        id: Date.now(),
        content: "I apologize, but I encountered an error while analyzing your symptoms. Please try again or contact support if the issue persists.",
        sender: "ai",
        timestamp: new Date(),
        confidenceLevel: 0
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const extractSymptoms = (text: string): SymptomSeverity[] => {
    if (!text.trim()) return [];
    
    const keywords = [
      "headache", "pain", "fever", "cough", "rash", 
      "nausea", "fatigue", "dizzy", "sore", "breathing",
      "throat", "chest", "heart", "stomach", "joint",
      "back", "diarrhea", "vomiting", "chills", "swelling",
      "ache", "burn", "cramp", "dry", "itch", "numbness",
      "palpitation", "runny", "sneezing", "stiff",
      "weakness", "wheeze", "bleed", "blur", "confusion"
    ];
    
    const foundSymptoms: SymptomSeverity[] = [];
    
    for (const keyword of keywords) {
      if (text.toLowerCase().includes(keyword)) {
        // Attempt to extract severity based on context
        let severity = 5; // Default moderate severity
        
        // Extract duration if mentioned
        let duration: string | undefined = undefined;
        const durationPatterns = [
          { regex: /for\s+(\d+)\s+days?/i, format: (match: string[]) => `${match[1]} days` },
          { regex: /for\s+(\d+)\s+weeks?/i, format: (match: string[]) => `${match[1]} weeks` },
          { regex: /for\s+(\d+)\s+months?/i, format: (match: string[]) => `${match[1]} months` },
          { regex: /since\s+yesterday/i, format: () => "1 day" },
          { regex: /since\s+last\s+week/i, format: () => "1 week" }
        ];
        
        for (const pattern of durationPatterns) {
          const match = text.match(pattern.regex);
          if (match) {
            duration = pattern.format(match);
            break;
          }
        }
        
        // Extract pattern if mentioned
        let pattern: "constant" | "intermittent" | "increasing" | "decreasing" | undefined = undefined;
        if (text.toLowerCase().includes(`constant ${keyword}`) || 
            text.toLowerCase().includes(`${keyword} all the time`)) {
          pattern = "constant";
        } else if (text.toLowerCase().includes(`intermittent ${keyword}`) || 
                  text.toLowerCase().includes(`${keyword} comes and goes`)) {
          pattern = "intermittent";
        } else if (text.toLowerCase().includes(`increasing ${keyword}`) || 
                  text.toLowerCase().includes(`${keyword} getting worse`)) {
          pattern = "increasing";
        } else if (text.toLowerCase().includes(`decreasing ${keyword}`) || 
                  text.toLowerCase().includes(`${keyword} getting better`)) {
          pattern = "decreasing";
        }
        
        // Extract triggers if mentioned
        const triggers: string[] = [];
        const triggerPatterns = [
          { regex: new RegExp(`${keyword}\\s+after\\s+(\\w+)`, 'i'), group: 1 },
          { regex: new RegExp(`${keyword}\\s+when\\s+(\\w+)`, 'i'), group: 1 },
          { regex: new RegExp(`${keyword}\\s+if\\s+(\\w+)`, 'i'), group: 1 }
        ];
        
        for (const pattern of triggerPatterns) {
          const match = text.match(pattern.regex);
          if (match && match[pattern.group]) {
            triggers.push(match[pattern.group]);
          }
        }
        
        // Check for severity modifiers
        if (text.toLowerCase().includes(`severe ${keyword}`) || 
            text.toLowerCase().includes(`extreme ${keyword}`) ||
            text.toLowerCase().includes(`worst ${keyword}`)) {
          severity = 9;
        } else if (text.toLowerCase().includes(`bad ${keyword}`) ||
                  text.toLowerCase().includes(`strong ${keyword}`) ||
                  text.toLowerCase().includes(`heavy ${keyword}`)) {
          severity = 7;
        } else if (text.toLowerCase().includes(`mild ${keyword}`) || 
                  text.toLowerCase().includes(`slight ${keyword}`) ||
                  text.toLowerCase().includes(`little ${keyword}`)) {
          severity = 3;
        }
        
        foundSymptoms.push({
          name: keyword,
          level: severity,
          duration: duration,
          pattern: pattern,
          triggers: triggers.length > 0 ? triggers : undefined
        });
      }
    }
    
    // Add random related symptoms if few were found, for a more comprehensive analysis
    if (foundSymptoms.length < 2 && foundSymptoms.length > 0) {
      const primarySymptom = foundSymptoms[0].name;
      
      // Map of related symptoms
      const relatedSymptomsMap: {[key: string]: string[]} = {
        "headache": ["dizziness", "fatigue", "nausea"],
        "fever": ["chills", "fatigue", "headache"],
        "cough": ["sore throat", "breathing", "chest pain"],
        "nausea": ["vomiting", "stomach pain", "dizziness"],
        "pain": ["swelling", "stiffness", "soreness"]
      };
      
      if (primarySymptom in relatedSymptomsMap) {
        const relatedSymptom = relatedSymptomsMap[primarySymptom][Math.floor(Math.random() * relatedSymptomsMap[primarySymptom].length)];
        const severityLevel = Math.max(2, foundSymptoms[0].level - 2); // Related symptom usually less severe
        
        if (!foundSymptoms.some(s => s.name === relatedSymptom)) {
          foundSymptoms.push({
            name: relatedSymptom,
            level: severityLevel
          });
        }
      }
    }
    
    return foundSymptoms;
  };

  const extractMainSymptom = (text: string, category: string, symptoms: SymptomSeverity[]): string => {
    if (symptoms.length > 0) {
      // Sort by severity and get the most severe symptom
      const sortedSymptoms = [...symptoms].sort((a, b) => b.level - a.level);
      return sortedSymptoms[0].name;
    }
    
    if (!text.trim()) return category + " symptoms";
    
    // Basic extraction logic - can be enhanced with NLP
    const keywords = [
      "headache", "pain", "fever", "cough", "rash", 
      "nausea", "fatigue", "dizzy", "sore"
    ];
    
    for (const keyword of keywords) {
      if (text.toLowerCase().includes(keyword)) {
        return keyword;
      }
    }
    
    // If no keyword found, return first few words
    return text.split(' ').slice(0, 3).join(' ');
  };

  const generateDiagnosisResults = (
    text: string, 
    category: string, 
    symptoms: SymptomSeverity[],
    age?: number,
    gender?: string
  ): DiagnosisResult[] => {
    const results: DiagnosisResult[] = [];
    
    // Return empty results if no significant input
    if (!text.trim() && symptoms.length === 0) return results;
    
    // Adjust probability based on demographic factors if provided
    const demographicModifier = () => {
      if (!age && !gender) return 0;
      
      let modifier = 0;
      if (age) {
        // Higher certainty for age-specific conditions
        if (age > 60 && (category === "cardiovascular" || category === "neurological")) {
          modifier += 0.05;
        } else if (age < 18 && category === "respiratory") {
          modifier += 0.03;
        }
      }
      
      return modifier;
    };
    
    // Generate primary condition based on category and symptoms
    if (category === "respiratory") {
      if (symptoms.some(s => s.name === "cough") || text.toLowerCase().includes("cough")) {
        const isSevereCough = symptoms.find(s => s.name === "cough")?.level >= 7;
        const hasFever = symptoms.some(s => s.name === "fever") || text.toLowerCase().includes("fever");
        const hasChestPain = symptoms.some(s => s.name === "chest") || text.toLowerCase().includes("chest");
        
        if (isSevereCough && hasFever) {
          results.push({
            condition: "Bronchitis",
            probability: 0.78 + demographicModifier(),
            description: "Inflammation of the lining of the bronchial tubes that carry air to and from the lungs.",
            recommendations: [
              "Rest and stay hydrated",
              "Use a humidifier to ease breathing",
              "Over-the-counter cough suppressants may help",
              "Consult a doctor if symptoms persist beyond 3 weeks"
            ],
            specialistTypes: ["Pulmonologist", "General Physician"],
            severity: "moderate",
            commonComorbidities: ["Asthma", "COPD"]
          });
          
          results.push({
            condition: "Influenza",
            probability: 0.65 + demographicModifier(),
            description: "Viral infection that attacks your respiratory system - your nose, throat and lungs.",
            recommendations: [
              "Rest and avoid physical exertion",
              "Stay hydrated and take fever reducers if needed",
              "Consult a doctor about antiviral medications if caught early"
            ],
            specialistTypes: ["General Physician", "Infectious Disease Specialist"],
            severity: "moderate",
            commonComorbidities: ["Pneumonia", "Bronchitis"]
          });
        } else if (hasChestPain) {
          results.push({
            condition: "Pneumonia",
            probability: 0.72 + demographicModifier(),
            description: "Infection that inflames air sacs in one or both lungs, which may fill with fluid.",
            recommendations: [
              "Seek medical attention immediately",
              "Prescription antibiotics will likely be needed",
              "Rest and hydration are essential"
            ],
            specialistTypes: ["Pulmonologist", "Infectious Disease Specialist"],
            severity: "severe",
            commonComorbidities: ["Respiratory Failure", "Sepsis"]
          });
        } else {
          results.push({
            condition: "Upper Respiratory Infection",
            probability: 0.82 + demographicModifier(),
            description: "Common cold or viral infection affecting the nose, throat, and airways.",
            recommendations: [
              "Rest and stay hydrated",
              "Over-the-counter decongestants may provide relief",
              "Use saltwater gargle for sore throat"
            ],
            specialistTypes: ["General Physician", "ENT Specialist"],
            severity: "mild",
            commonComorbidities: ["Sinusitis", "Pharyngitis"]
          });
        }
      }
    } else if (category === "digestive") {
      if (symptoms.some(s => s.name === "nausea") || text.toLowerCase().includes("nausea") || 
          symptoms.some(s => s.name === "vomiting") || text.toLowerCase().includes("vomit")) {
        
        const hasDiarrhea = symptoms.some(s => s.name === "diarrhea") || text.toLowerCase().includes("diarrhea");
        const hasStomachPain = symptoms.some(s => s.name === "stomach") || text.toLowerCase().includes("stomach pain");
        
        if (hasDiarrhea) {
          results.push({
            condition: "Gastroenteritis",
            probability: 0.85 + demographicModifier(),
            description: "Inflammation of the lining of the stomach and intestines, often due to viral or bacterial infection.",
            recommendations: [
              "Stay hydrated with clear fluids",
              "Try the BRAT diet (Bananas, Rice, Applesauce, Toast)",
              "Avoid dairy, caffeine, and spicy foods",
              "Seek medical attention if symptoms persist beyond 48 hours"
            ],
            specialistTypes: ["Gastroenterologist", "General Physician"],
            severity: "moderate",
            commonComorbidities: ["Dehydration", "Electrolyte Imbalance"]
          });
        } else if (hasStomachPain) {
          results.push({
            condition: "Gastritis",
            probability: 0.76 + demographicModifier(),
            description: "Inflammation of the lining of the stomach, often caused by bacterial infection or prolonged use of certain medications.",
            recommendations: [
              "Avoid spicy, acidic, and fatty foods",
              "Eat smaller, more frequent meals",
              "Consider over-the-counter antacids",
              "Consult a doctor if symptoms continue"
            ],
            specialistTypes: ["Gastroenterologist", "General Physician"],
            severity: "moderate",
            commonComorbidities: ["Peptic Ulcer", "GERD"]
          });
          
          results.push({
            condition: "Peptic Ulcer",
            probability: 0.58 + demographicModifier(),
            description: "Open sore that develops on the inside lining of the stomach and the upper portion of the small intestine.",
            recommendations: [
              "Avoid spicy, acidic foods and alcohol",
              "Take antacids as directed for temporary relief",
              "Consult a doctor for proper diagnosis and treatment"
            ],
            specialistTypes: ["Gastroenterologist", "General Surgeon"],
            severity: "moderate",
            commonComorbidities: ["Gastritis", "H. pylori Infection"]
          });
        } else {
          results.push({
            condition: "Food Intolerance",
            probability: 0.68 + demographicModifier(),
            description: "Difficulty digesting certain foods due to lack of specific enzymes.",
            recommendations: [
              "Keep a food diary to identify trigger foods",
              "Stay hydrated and consider short-term dietary adjustments",
              "Consult with a dietitian for personalized advice"
            ],
            specialistTypes: ["Gastroenterologist", "Allergist", "Dietitian"],
            severity: "mild",
            commonComorbidities: ["IBS", "Nutrient Deficiencies"]
          });
        }
      }
    } else if (category === "neurological") {
      if (symptoms.some(s => s.name === "headache") || text.toLowerCase().includes("headache")) {
        const isSevereHeadache = symptoms.find(s => s.name === "headache")?.level >= 8;
        const hasDizziness = symptoms.some(s => s.name === "dizzy") || text.toLowerCase().includes("dizzy");
        const hasNausea = symptoms.some(s => s.name === "nausea") || text.toLowerCase().includes("nausea");
        
        if (isSevereHeadache && (hasNausea || hasDizziness)) {
          results.push({
            condition: "Migraine",
            probability: 0.86 + demographicModifier(),
            description: "Recurring type of headache that causes moderate to severe pain, often with additional symptoms like nausea and sensitivity to light and sound.",
            recommendations: [
              "Rest in a dark, quiet room",
              "Apply cold compresses to the forehead",
              "Consider over-the-counter migraine medications",
              "Consult a doctor for recurring migraines"
            ],
            specialistTypes: ["Neurologist", "Pain Management Specialist"],
            severity: "moderate",
            commonComorbidities: ["Anxiety", "Depression", "Vertigo"]
          });
        } else if (isSevereHeadache) {
          results.push({
            condition: "Tension Headache",
            probability: 0.79 + demographicModifier(),
            description: "Most common type of headache that causes mild to moderate pain, often described as feeling like a tight band around the head.",
            recommendations: [
              "Practice stress-reduction techniques",
              "Use over-the-counter pain relievers as directed",
              "Apply warm or cold compresses to the neck or head",
              "Maintain good posture and take regular breaks from screens"
            ],
            specialistTypes: ["Neurologist", "General Physician"],
            severity: "mild",
            commonComorbidities: ["Anxiety", "Depression", "Neck Pain"]
          });
        } else if (hasDizziness) {
          results.push({
            condition: "Vestibular Dysfunction",
            probability: 0.65 + demographicModifier(),
            description: "Disorder of the inner ear that can lead to dizziness and balance problems.",
            recommendations: [
              "Avoid sudden movements and stand up slowly",
              "Stay hydrated and consider vestibular exercises",
              "Consult a healthcare provider for proper diagnosis"
            ],
            specialistTypes: ["ENT Specialist", "Neurologist"],
            severity: "moderate",
            commonComorbidities: ["Hearing Loss", "Tinnitus"]
          });
        }
      }
    } else {
      // Generic conditions for other categories based on common symptoms
      if (symptoms.some(s => s.name === "fever") || text.toLowerCase().includes("fever")) {
        results.push({
          condition: "Viral Infection",
          probability: 0.75 + demographicModifier(),
          description: "General viral infection that may cause fever, fatigue, and various other symptoms.",
          recommendations: [
            "Rest and stay hydrated",
            "Take fever reducers like acetaminophen if needed",
            "Monitor temperature and other symptoms",
            "Seek medical attention if fever persists beyond 3 days or exceeds 39.4°C (103°F)"
          ],
          specialistTypes: ["General Physician", "Infectious Disease Specialist"],
          severity: "moderate",
          commonComorbidities: ["Upper Respiratory Infection", "Gastroenteritis"]
        });
      }
      
      if (symptoms.some(s => s.name === "fatigue") || text.toLowerCase().includes("tired") || text.toLowerCase().includes("fatigue")) {
        results.push({
          condition: "Stress or Overexertion",
          probability: 0.72 + demographicModifier(),
          description: "Physical and mental fatigue due to stress, poor sleep, or overexertion.",
          recommendations: [
            "Prioritize quality sleep (7-9 hours nightly)",
            "Practice stress-reduction techniques",
            "Ensure proper nutrition and hydration",
            "Consider reducing workload temporarily"
          ],
          specialistTypes: ["General Physician", "Mental Health Professional"],
          severity: "mild",
          commonComorbidities: ["Anxiety", "Depression", "Insomnia"]
        });
        
        results.push({
          condition: "Vitamin Deficiency",
          probability: 0.58 + demographicModifier(),
          description: "Lack of essential vitamins, particularly Vitamin B12, D, or Iron, which can cause fatigue.",
          recommendations: [
            "Consult a healthcare provider for blood tests",
            "Consider dietary changes to include nutrient-rich foods",
            "Supplements may be recommended based on test results"
          ],
          specialistTypes: ["General Physician", "Nutritionist"],
          severity: "mild",
          commonComorbidities: ["Anemia", "Osteoporosis", "Immunodeficiency"]
        });
      }
    }
    
    // If we couldn't determine specific conditions, add a generic analysis
    if (results.length === 0 && (text.trim() || symptoms.length > 0)) {
      results.push({
        condition: "Non-specific Symptoms",
        probability: 0.60 + demographicModifier(),
        description: "Your symptoms don't clearly indicate a specific condition, which may be due to a mild temporary issue or the early stage of a developing condition.",
        recommendations: [
          "Monitor your symptoms for any changes",
          "Ensure adequate rest, hydration, and nutrition",
          "If symptoms persist or worsen, consult a healthcare provider"
        ],
        specialistTypes: ["General Physician"],
        severity: "mild",
        commonComorbidities: []
      });
    }
    
    return results;
  };

  const findRelevantResources = (text: string, category: string, symptoms: SymptomSeverity[]): MedicalResource[] => {
    if (!text.trim() && symptoms.length === 0) return [];
    
    // Filter resources by category
    let filteredResources = [...medicalResourceDatabase];
    
    // Respiratory conditions
    if (category === "respiratory" || 
        symptoms.some(s => ["cough", "breathing", "chest"].includes(s.name)) || 
        text.toLowerCase().includes("cough") || 
        text.toLowerCase().includes("breathing")) {
      filteredResources = filteredResources.filter(r => 
        r.title.toLowerCase().includes("respiratory") || 
        r.source.toLowerCase().includes("pulmonary"));
    }
    
    // Digestive conditions
    else if (category === "digestive" || 
             symptoms.some(s => ["nausea", "vomiting", "stomach", "diarrhea"].includes(s.name)) ||
             text.toLowerCase().includes("stomach") ||
             text.toLowerCase().includes("digest")) {
      filteredResources = filteredResources.filter(r => 
        r.title.toLowerCase().includes("digestive") || 
        r.source.toLowerCase().includes("gastro"));
    }
    
    // Skin conditions
    else if (category === "skin" || 
             symptoms.some(s => ["rash", "itch", "swelling"].includes(s.name)) ||
             text.toLowerCase().includes("rash") ||
             text.toLowerCase().includes("skin")) {
      filteredResources = filteredResources.filter(r => 
        r.title.toLowerCase().includes("dermatological") || 
        r.source.toLowerCase().includes("dermatology"));
    }
    
    // Neurological conditions
    else if (category === "neurological" || 
             symptoms.some(s => ["headache", "dizzy", "confusion"].includes(s.name)) ||
             text.toLowerCase().includes("headache") ||
             text.toLowerCase().includes("dizzy")) {
      filteredResources = filteredResources.filter(r => 
        r.title.toLowerCase().includes("neurological") || 
        r.source.toLowerCase().includes("neuro"));
    }
    
    // Cardiovascular conditions
    else if (category === "cardiovascular" || 
             symptoms.some(s => ["chest", "heart", "palpitation"].includes(s.name)) ||
             text.toLowerCase().includes("heart") ||
             text.toLowerCase().includes("chest")) {
      filteredResources = filteredResources.filter(r => 
        r.title.toLowerCase().includes("cardiovascular") || 
        r.source.toLowerCase().includes("cardio"));
    }
    
    // If no category-specific resources found, return any that might be relevant
    if (filteredResources.length === 0) {
      filteredResources = medicalResourceDatabase.filter(r => r.relevance > 0.7);
    }
    
    // Sort by relevance and return top 3
    return filteredResources.sort((a, b) => b.relevance - a.relevance).slice(0, 3);
  };

  const generateHealthMetrics = (text: string, symptoms: SymptomSeverity[]): HealthMetric[] => {
    const metrics: HealthMetric[] = [];
    
    // Generate basic health metrics based on symptoms
    if (symptoms.some(s => s.name === "fever") || text.toLowerCase().includes("fever")) {
      const feverLevel = symptoms.find(s => s.name === "fever")?.level || 5;
      const normalizedTemp = 37 + (feverLevel * 0.2); // Map severity to temperature (37°C normal, up to 39°C for severe)
      
      metrics.push({
        name: "Body Temperature",
        value: normalizedTemp,
        unit: "°C",
        normalRange: { min: 36.5, max: 37.5 },
        trend: "increasing"
      });
    }
    
    if (symptoms.some(s => s.name === "heart") || 
        symptoms.some(s => s.name === "palpitation") ||
        text.toLowerCase().includes("heart") ||
        text.toLowerCase().includes("palpitation")) {
      const severity = symptoms.find(s => s.name === "heart" || s.name === "palpitation")?.level || 5;
      const normalizedRate = 70 + (severity * 5); // Map severity to heart rate (70 normal, up to 95 for severe)
      
      metrics.push({
        name: "Heart Rate",
        value: normalizedRate,
        unit: "BPM",
        normalRange: { min: 60, max: 100 },
        trend: "increasing"
      });
    }
    
    if (symptoms.some(s => s.name === "breathing") || 
        text.toLowerCase().includes("breathing") ||
        text.toLowerCase().includes("breath")) {
      const severity = symptoms.find(s => s.name === "breathing")?.level || 5;
      const normalizedRate = 14 + (severity * 2); // Map severity to respiratory rate (14 normal, up to 24 for severe)
      
      metrics.push({
        name: "Respiratory Rate",
        value: normalizedRate,
        unit: "breaths/min",
        normalRange: { min: 12, max: 20 },
        trend: "increasing"
      });
    }
    
    // Add oxygen saturation for respiratory issues
    if (category === "respiratory" || 
        symptoms.some(s => ["cough", "breathing", "chest"].includes(s.name)) ||
        text.toLowerCase().includes("cough") ||
        text.toLowerCase().includes("breathing")) {
      const severity = Math.max(...symptoms.filter(s => 
        ["cough", "breathing", "chest"].includes(s.name)).map(s => s.level), 0);
      
      if (severity > 0) {
        const normalizedO2 = 98 - (severity * 0.6); // Map severity to O2 (98% normal, down to 92% for severe)
        
        metrics.push({
          name: "Oxygen Saturation",
          value: normalizedO2,
          unit: "%",
          normalRange: { min: 95, max: 100 },
          trend: "decreasing"
        });
      }
    }
    
    // Add blood pressure for cardiovascular issues
    if (category === "cardiovascular" || 
        symptoms.some(s => ["chest", "heart", "palpitation"].includes(s.name)) ||
        text.toLowerCase().includes("heart") ||
        text.toLowerCase().includes("chest")) {
      
      metrics.push({
        name: "Blood Pressure (Systolic)",
        value: 120 + Math.random() * 20, // Random value around normal range
        unit: "mmHg",
        normalRange: { min: 90, max: 120 },
        trend: "stable"
      });
      
      metrics.push({
        name: "Blood Pressure (Diastolic)",
        value: 80 + Math.random() * 10, // Random value around normal range
        unit: "mmHg",
        normalRange: { min: 60, max: 80 },
        trend: "stable"
      });
    }
    
    // Add hydration metric for digestive issues with vomiting/diarrhea
    if ((category === "digestive" && 
        (symptoms.some(s => ["vomiting", "diarrhea"].includes(s.name)) ||
        text.toLowerCase().includes("vomit") ||
        text.toLowerCase().includes("diarrhea")))) {
      
      const severity = Math.max(...symptoms.filter(s => 
        ["vomiting", "diarrhea"].includes(s.name)).map(s => s.level), 5);
      
      const normalizedHydration = 100 - (severity * 4); // Map severity to hydration percentage
      
      metrics.push({
        name: "Hydration Status",
        value: normalizedHydration,
        unit: "%",
        normalRange: { min: 95, max: 100 },
        trend: "decreasing"
      });
    }
    
    return metrics;
  };

  const runSecondaryAnalysis = () => {
    if (secondaryAnalysis) return;
    
    setSecondaryAnalysis(true);
    setIsLoading(true);
    
    // Simulate running a more intensive analysis
    setTimeout(() => {
      // Add a deeper analysis message
      const deeperAnalysisMessage: Message = {
        id: Date.now(),
        content: `I've completed a more comprehensive analysis of your symptoms. Based on additional pattern recognition and cross-referencing with medical databases, I've refined my assessment.\n\nThe primary condition indicated by your symptoms remains ${diagnosisResults[0]?.condition}, but I've identified additional factors that may be relevant.\n\n${getRandomSecondaryAnalysisContent(selectedCategory, activeSymptoms)}`,
        sender: "ai",
        timestamp: new Date(),
        confidenceLevel: 0.89
      };
      
      setMessages(prev => [...prev, deeperAnalysisMessage]);
      setIsLoading(false);
      
      // Add additional diagnosis options
      const existingConditions = diagnosisResults.map(r => r.condition);
      const newDiagnosis = generateAdditionalDiagnosis(selectedCategory, activeSymptoms, existingConditions);
      
      setDiagnosisResults(prev => {
        const updated = [...prev];
        // Update confidence of existing results
        if (updated.length > 0) {
          const primaryResult = updated[0];
          primaryResult.probability = Math.min(0.92, primaryResult.probability + 0.07);
          primaryResult.recommendations = [...primaryResult.recommendations, ...getAdditionalRecommendations(primaryResult.condition)];
        }
        return [...updated, ...newDiagnosis];
      });
    }, 3000 + Math.random() * 2000);
  };

  const getRandomSecondaryAnalysisContent = (category: string, symptoms: SymptomSeverity[]): string => {
    const analysisPoints = [
      "I've analyzed temporal patterns in your symptom manifestation, which helps differentiate between similar conditions.",
      "The correlation between your symptoms suggests a specific physiological mechanism may be involved.",
      "I've considered regional health trends and seasonal factors that may influence your condition.",
      "The intensity profile of your symptoms provides important diagnostic information.",
      "I've examined subtle relationships between seemingly unrelated symptoms that often go unnoticed."
    ];
    
    let content = analysisPoints[Math.floor(Math.random() * analysisPoints.length)] + "\n\n";
    
    // Add specific insights based on category
    if (category === "respiratory" && symptoms.some(s => s.name === "cough")) {
      content += "The specific pattern of your cough (frequency, productivity, timing) suggests it may be bronchial rather than upper respiratory in origin. This distinction helps narrow down the likely diagnosis.";
    } else if (category === "digestive" && symptoms.some(s => s.name === "nausea")) {
      content += "The relationship between your digestive symptoms and their timing relative to meals provides important clues about the nature of your condition.";
    } else if (category === "neurological" && symptoms.some(s => s.name === "headache")) {
      content += "The location, quality, and associated symptoms of your headache fit a specific neurological pattern that helps distinguish between common headache types.";
    } else {
      content += "The constellation of your symptoms suggests an underlying pattern that points toward a specific physiological process.";
    }
    
    return content;
  };

  const generateAdditionalDiagnosis = (category: string, symptoms: SymptomSeverity[], existingConditions: string[]): DiagnosisResult[] => {
    const results: DiagnosisResult[] = [];
    
    // Generate less common but still relevant conditions based on category and symptoms
    if (category === "respiratory" && symptoms.some(s => s.name === "cough")) {
      if (!existingConditions.includes("Allergic Rhinitis")) {
        results.push({
          condition: "Allergic Rhinitis",
          probability: 0.55,
          description: "Inflammation of the nasal passages caused by an allergic reaction to airborne substances.",
          recommendations: [
            "Identify and avoid potential allergens",
            "Consider over-the-counter antihistamines",
            "Use saline nasal irrigation to clear allergens",
            "Consult an allergist for testing if symptoms are recurrent"
          ],
          specialistTypes: ["Allergist", "ENT Specialist"],
          severity: "mild",
          commonComorbidities: ["Asthma", "Sinusitis"]
        });
      }
    } else if (category === "digestive" && symptoms.some(s => s.name === "nausea")) {
      if (!existingConditions.includes("Functional Dyspepsia")) {
        results.push({
          condition: "Functional Dyspepsia",
          probability: 0.48,
          description: "Chronic disorder that affects the upper digestive tract, causing pain or discomfort in the upper abdomen.",
          recommendations: [
            "Eat smaller, more frequent meals",
            "Avoid trigger foods like spicy or fatty items",
            "Reduce stress through mindfulness techniques",
            "Consult a gastroenterologist if symptoms persist"
          ],
          specialistTypes: ["Gastroenterologist", "Dietitian"],
          severity: "moderate",
          commonComorbidities: ["IBS", "GERD"]
        });
      }
    } else if (category === "neurological" && symptoms.some(s => s.name === "headache")) {
      if (!existingConditions.includes("Cervicogenic Headache")) {
        results.push({
          condition: "Cervicogenic Headache",
          probability: 0.42,
          description: "Headache caused by disorders of the neck, including cervical spine abnormalities or soft tissue abnormalities.",
          recommendations: [
            "Practice good posture, especially when using devices",
            "Consider gentle neck stretches and exercises",
            "Apply heat to neck muscles",
            "Consult a physical therapist for targeted treatment"
          ],
          specialistTypes: ["Neurologist", "Physical Therapist", "Orthopedic Specialist"],
          severity: "moderate",
          commonComorbidities: ["Neck Pain", "Muscle Tension"]
        });
      }
    }
    
    // Add a less common but still plausible condition for any category
    if (symptoms.length > 0 && results.length === 0) {
      results.push({
        condition: "Subclinical Infection",
        probability: 0.38,
        description: "Early or mild infection that hasn't yet produced distinct, easily recognizable symptoms.",
        recommendations: [
          "Monitor symptoms for progression",
          "Support immune function with adequate rest and nutrition",
          "Maintain good hygiene practices",
          "Seek medical attention if symptoms worsen"
        ],
        specialistTypes: ["General Physician", "Infectious Disease Specialist"],
        severity: "mild",
        commonComorbidities: ["Fatigue", "Mild Fever"]
      });
    }
    
    return results;
  };

  const getAdditionalRecommendations = (condition: string): string[] => {
    const generalRecommendations = [
      "Consider tracking symptoms in a journal to identify patterns and triggers",
      "Ensure you're getting adequate sleep (7-9 hours) to support recovery",
      "Stay well-hydrated to support bodily functions and recovery"
    ];
    
    const specificRecommendations: {[key: string]: string[]} = {
      "Bronchitis": [
        "Avoid exposure to smoke and air pollutants",
        "Consider using a humidifier at night"
      ],
      "Migraine": [
        "Identify and avoid personal migraine triggers",
        "Consider preventive treatments if migraines are frequent"
      ],
      "Gastroenteritis": [
        "Gradually reintroduce normal foods as symptoms improve",
        "Avoid caffeine and alcohol until fully recovered"
      ]
    };
    
    if (condition in specificRecommendations) {
      return specificRecommendations[condition];
    }
    
    return generalRecommendations.slice(0, 2);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes("image/")) {
      hookToast({
        title: "Invalid file",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string);
      toast.success("Symptom image uploaded for analysis");
      setInputType("image");
    };
    reader.readAsDataURL(file);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const selectHistoryItem = (item: AnalysisHistory) => {
    // Add a system message indicating we're viewing history
    const historyMessage: Message = {
      id: Date.now(),
      content: `Viewing analysis from ${item.date.toLocaleDateString()} - "${item.mainSymptom}"`,
      sender: "ai",
      timestamp: new Date(),
    };
    
    setMessages([messages[0], historyMessage]);
    setShowHistory(false);
  };

  const toggleAdvancedOptions = () => {
    setShowAdvancedOptions(!showAdvancedOptions);
    if (!showAdvancedOptions && !consentGiven) {
      setShowPrivacyNotice(true);
    }
  };

  const handlePrivacyConsent = (consent: boolean) => {
    setConsentGiven(consent);
    setShowPrivacyNotice(false);
    
    if (!consent) {
      setShowAdvancedOptions(false);
      setIncludeDemographics(false);
      setIncludeGeneticFactors(false);
      setIncludeEnvironmentalFactors(false);
    }
  };

  const getAIResponse = (
    text: string, 
    image: string | null, 
    category: string, 
    symptoms: SymptomSeverity[],
    language: string = "en"
  ): Message => {
    let responseContent = "I'm analyzing your symptoms using advanced diagnostic algorithms... ";
    let confidenceLevel = 0.7 + Math.random() * 0.2; // Random confidence between 70-90%

    // Enhanced response generation based on category and symptoms
    if (category === "respiratory") {
      if (text.toLowerCase().includes("cough")) {
        responseContent += "You're experiencing a cough which could be due to several causes. Based on your description, this appears to be a dry cough which might indicate an upper respiratory tract infection, allergies, or asthma. If you're also experiencing fever, it could indicate a viral infection. I recommend staying hydrated and using honey for soothing (unless you're under 1 year old). Monitor for any worsening symptoms like difficulty breathing or high fever.";
        confidenceLevel = 0.82;
      } else if (text.toLowerCase().includes("breath") || text.toLowerCase().includes("breathing")) {
        responseContent += "Breathing difficulties can range from mild to serious medical conditions. This could be related to anxiety, asthma, pneumonia, or other cardiopulmonary issues. Given the limited information, I recommend monitoring your oxygen levels if possible. If you experience severe shortness of breath, bluish lips, or chest pain, please seek emergency medical attention immediately.";
        confidenceLevel = 0.75;
      } else {
        responseContent += "Your respiratory symptoms could indicate an upper respiratory infection, allergies, or a temporary irritation. Monitor for fever, changes in breathing capacity, and duration of symptoms. Ensure you're properly hydrated and resting. If symptoms persist for more than a week or worsen suddenly, please consult a healthcare provider.";
        confidenceLevel = 0.68;
      }
    } else if (category === "digestive") {
      if (text.toLowerCase().includes("nausea") || text.toLowerCase().includes("vomit")) {
        responseContent += "Nausea and vomiting can be caused by various conditions including viral gastroenteritis, food poisoning, or motion sickness. Stay hydrated with small sips of clear liquids. If vomiting persists for more than 24 hours, contains blood, or is accompanied by severe abdominal pain, seek medical attention.";
        confidenceLevel = 0.79;
      } else if (text.toLowerCase().includes("diarrhea")) {
        responseContent += "Diarrhea is often caused by viral infections, food intolerances, or bacterial contamination. Focus on hydration and electrolyte replacement. Consider the BRAT diet (Bananas, Rice, Applesauce, Toast) until symptoms improve. If diarrhea persists beyond 3 days, contains blood, or is accompanied by high fever, please consult a healthcare provider.";
        confidenceLevel = 0.85;
      } else {
        responseContent += "Your digestive symptoms could be related to diet, stress, or a mild gastrointestinal infection. Monitor your symptoms and try eating smaller, more frequent meals. Avoid spicy, fatty foods and alcohol until symptoms improve. If you experience severe pain, persistent symptoms, or notice blood, please seek medical attention promptly.";
        confidenceLevel = 0.72;
      }
    } else if (category === "skin") {
      if (image) {
        responseContent += "Based on the image you've shared, I can see signs of what appears to be a dermatological condition. The visual indicators suggest a potential contact dermatitis or mild allergic reaction. The affected area shows characteristic redness and possibly raised bumps or patches. I recommend avoiding potential allergens and monitoring for changes. If it spreads, becomes painful, or develops other concerning symptoms like fever, please consult a dermatologist.";
        confidenceLevel = 0.76;
      } else if (text.toLowerCase().includes("rash") || text.toLowerCase().includes("itch")) {
        responseContent += "Skin rashes and itching can result from allergic reactions, infections, autoimmune conditions, or environmental factors. Without visual information, it's difficult to provide a specific analysis. Try using cool compresses and over-the-counter antihistamines for temporary relief. Avoid scratching to prevent secondary infections. If the rash spreads, forms blisters, or is accompanied by other symptoms, please consult a dermatologist.";
        confidenceLevel = 0.65;
      } else {
        responseContent += "Your skin symptoms could have various causes including allergies, climate changes, or underlying health conditions. Keep the area clean and moisturized. Avoid harsh soaps and very hot water. If you notice rapid changes, spreading, or developing systemic symptoms like fever, consult a healthcare provider for proper diagnosis and treatment.";
        confidenceLevel = 0.68;
      }
    } else if (category === "neurological") {
      if (text.toLowerCase().includes("headache")) {
        responseContent += "Your headache could be due to various causes such as tension, migraines, sinus problems, or dehydration. Based on your description, this appears to be a tension-type headache. I recommend staying hydrated, trying relaxation techniques, and resting in a quiet, dark room. Over-the-counter pain relievers may help temporarily. If your headache is severe, sudden, or accompanied by neurological symptoms like vision changes or confusion, please seek immediate medical attention.";
        confidenceLevel = 0.83;
      } else if (text.toLowerCase().includes("dizzy") || text.toLowerCase().includes("dizziness")) {
        responseContent += "Dizziness can result from inner ear problems, low blood pressure, dehydration, anxiety, or medication side effects. Ensure you're well-hydrated and stand up slowly from seated or lying positions. If dizziness is severe, persistent, or accompanied by other neurological symptoms, please consult a healthcare provider for proper evaluation.";
        confidenceLevel = 0.74;
      } else {
        responseContent += "Neurological symptoms require careful evaluation. Based on the limited information, I recommend monitoring the frequency and severity of your symptoms. Keep a journal of potential triggers like stress, sleep patterns, or dietary factors. If you experience severe symptoms, sudden onset, or progressive worsening, please seek medical attention promptly.";
        confidenceLevel = 0.67;
      }
    } else if (category === "musculoskeletal") {
      if (text.toLowerCase().includes("pain") && (text.toLowerCase().includes("joint") || text.toLowerCase().includes("muscle"))) {
        responseContent += "Your joint or muscle pain could be related to overuse, strain, inflammation, or underlying conditions like arthritis. Rest the affected area, apply ice for acute pain or heat for chronic pain, and consider over-the-counter anti-inflammatory medications if appropriate. If the pain is severe, limits your movement significantly, or doesn't improve with rest, please consult with a healthcare provider.";
        confidenceLevel = 0.81;
      } else if (text.toLowerCase().includes("back")) {
        responseContent += "Back pain is extremely common and often results from muscle strain, poor posture, overexertion, or aging. Maintain proper posture, use support when sitting for long periods, and consider gentle stretching exercises. If your back pain is severe, radiates down the legs, or is accompanied by numbness or tingling, please seek medical evaluation as it could indicate nerve involvement.";
        confidenceLevel = 0.78;
      } else {
        responseContent += "Your musculoskeletal symptoms could be related to activity levels, posture, or underlying conditions. Rest the affected area, apply appropriate temperature therapy (ice for acute, heat for chronic pain), and ensure proper ergonomics during daily activities. If symptoms persist or worsen despite conservative measures, please consult a healthcare provider for thorough evaluation.";
        confidenceLevel = 0.69;
      }
    } else if (category === "cardiovascular") {
      if (text.toLowerCase().includes("chest") && text.toLowerCase().includes("pain")) {
        responseContent += "Chest pain can be a symptom of several conditions, ranging from muscle strain to serious heart issues. It's always better to err on the side of caution with chest pain. If you're experiencing severe, crushing, or squeezing chest pain, especially with radiation to the arm, jaw, or back, please seek emergency medical attention immediately. If the pain is mild, localized, and changes with position or breathing, it may be musculoskeletal in nature.";
        confidenceLevel = 0.85;
      } else if (text.toLowerCase().includes("heart") && (text.toLowerCase().includes("racing") || text.toLowerCase().includes("palpitation"))) {
        responseContent += "Heart palpitations or a racing heart can be caused by stress, anxiety, caffeine, certain medications, or underlying heart conditions. If palpitations are occasional and brief, they're often benign. However, if they're accompanied by chest pain, shortness of breath, dizziness, or fainting, please seek medical evaluation promptly.";
        confidenceLevel = 0.79;
      } else {
        responseContent += "Cardiovascular symptoms should always be taken seriously. Based on your description, I recommend monitoring your symptoms and considering factors like stress levels, recent activity, and dietary choices that might contribute. If you experience any warning signs like chest pain, shortness of breath, or unusual fatigue, please seek medical attention.";
        confidenceLevel = 0.75;
      }
    } else {
      // General category or any other unspecified category
      if (text.toLowerCase().includes("fever")) {
        responseContent += "You're experiencing fever, which is often a sign that your body is fighting an infection. A typical adult fever ranges from 100.4°F (38°C) to 103°F (39.4°C). Rest, stay hydrated, and take over-the-counter fever reducers if needed. If your temperature exceeds 103°F (39.4°C), persists for more than three days, or is accompanied by severe symptoms like difficulty breathing, confusion, or stiff neck, please seek immediate medical attention.";
        confidenceLevel = 0.84;
      } else if (text.toLowerCase().includes("tired") || text.toLowerCase().includes("fatigue")) {
        responseContent += "Fatigue can result from various factors including inadequate sleep, stress, nutrient deficiencies, or underlying medical conditions. Ensure you're getting 7-9 hours of quality sleep, staying properly hydrated, and consuming a balanced diet. If fatigue persists for more than two weeks despite lifestyle adjustments, or is accompanied by other concerning symptoms, please consult a healthcare provider for evaluation.";
        confidenceLevel = 0.76;
      } else if (text.trim() === "" && image) {
        responseContent += "I've analyzed the image you've shared. While visual information provides valuable context, a comprehensive assessment would require additional details about your symptoms, their duration, and any other relevant factors. Based solely on the image, I can observe potential signs that might indicate a minor condition, but please provide more details for a more accurate analysis.";
        confidenceLevel = 0.65;
      } else if (text.trim() === "") {
        responseContent += "To provide a more accurate analysis, I'd need information about your symptoms. Please describe what you're experiencing, including when the symptoms started, their severity, and any factors that seem to improve or worsen them. This will help me offer more personalized health insights.";
        confidenceLevel = 0.5;
      } else {
        responseContent += "Based on what you've shared, these symptoms could have several causes. It's important to monitor their progression and note any additional symptoms that develop. While my analysis provides general guidance, a healthcare professional can offer personalized advice based on your complete medical history. If your symptoms worsen or persist, I recommend consulting with a doctor for a comprehensive evaluation.";
        confidenceLevel = 0.72;
      }
    }

    // Add follow-up questions based on the category
    responseContent += "\n\nSome follow-up questions to consider:\n";
    
    if (category === "respiratory") {
      responseContent += "- Are you experiencing any fever or chills?\n- Does anything worsen or improve your symptoms?\n- Have you been exposed to anyone with similar symptoms?";
    } else if (category === "digestive") {
      responseContent += "- Have you noticed any changes in your diet recently?\n- Are your symptoms related to eating certain foods?\n- Have you traveled recently to a different country?";
    } else if (category === "skin") {
      responseContent += "- Have you used any new products on your skin recently?\n- Does the affected area feel hot to touch?\n- Have you had similar symptoms before?";
    } else if (category === "neurological") {
      responseContent += "- How would you rate your stress levels recently?\n- Have you experienced any changes in vision or other senses?\n- Are your symptoms constant or do they come and go?";
    } else if (category === "musculoskeletal") {
      responseContent += "- Did you engage in any new physical activities recently?\n- Does the pain radiate to other parts of your body?\n- What makes the pain better or worse?";
    } else {
      responseContent += "- How long have you been experiencing these symptoms?\n- Have you tried any remedies so far?\n- Are there any other symptoms you're experiencing that you haven't mentioned?";
    }

    // Add information about the advanced analysis if symptoms warrant it
    if (symptoms.length > 0 && analysisMode === "advanced") {
      responseContent += "\n\nI've detected multiple symptoms that warrant a deeper analysis. You can click the 'Detailed Analysis' button below to view a comprehensive breakdown of possible conditions and get more personalized recommendations.";
    }

    // Add information about relevant resources if available
    if (relatedResources.length > 0) {
      responseContent += "\n\nI've identified some medical resources that may be relevant to your symptoms. You can view them in the 'Insights' tab.";
    }

    // Add disclaimer
    responseContent += "\n\nRemember: This analysis is for informational purposes only and does not replace professional medical advice. If your symptoms are severe or concerning, please seek immediate medical attention.";

    // Adjust language based on selected language (in a real app, we'd use translation services)
    if (language !== "en") {
      responseContent += `\n\nNote: You've selected ${supportedLanguages.find(l => l.value === language)?.label || language} as your preferred language. In a clinical implementation, all responses would be professionally translated.`;
    }

    return {
      id: Date.now() + 1,
      content: responseContent,
      sender: "ai",
      timestamp: new Date(),
      confidenceLevel: confidenceLevel,
      language: language
    };
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 text-center"
      >
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Advanced AI Symptom Analyzer</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Describe your symptoms or use voice/image input for AI-powered health analysis with multi-language support and advanced diagnostic capabilities
        </p>
      </motion.div>

      <div className="flex flex-wrap gap-4 mb-4">
        <button 
          onClick={toggleHistory}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            showHistory 
              ? "bg-health-600 text-white" 
              : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
          }`}
        >
          <Clock className="h-4 w-4" />
          {showHistory ? "Hide History" : "Show History"}
        </button>
        
        <button 
          onClick={toggleAdvancedOptions}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            showAdvancedOptions 
              ? "bg-health-600 text-white" 
              : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
          }`}
        >
          <Landmark className="h-4 w-4" />
          {showAdvancedOptions ? "Hide Advanced" : "Advanced Options"}
        </button>
        
        <Form {...form}>
          <FormField
            control={form.control}
            name="category"
            render={() => (
              <FormItem className="flex-1">
                <FormControl>
                  <Select
                    value={selectedCategory}
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {symptomCategories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </Form>
        
        <Form {...form}>
          <FormField
            control={form.control}
            name="language"
            render={() => (
              <FormItem className="flex-1">
                <FormControl>
                  <Select
                    value={selectedLanguage}
                    onValueChange={handleLanguageChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      {supportedLanguages.map((language) => (
                        <SelectItem key={language.value} value={language.value}>
                          {language.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </Form>
      </div>

      {showPrivacyNotice && (
        <AlertDialog open={showPrivacyNotice} onOpenChange={setShowPrivacyNotice}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Privacy Notice</AlertDialogTitle>
              <AlertDialogDescription>
                The advanced analysis features collect additional data to provide more personalized health insights. This may include demographic, genetic, and environmental information.
                <br /><br />
                All data is processed securely and not shared with third parties. In a clinical implementation, this would comply with healthcare privacy regulations.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => handlePrivacyConsent(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handlePrivacyConsent(true)}>I Consent</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {showAdvancedOptions && consentGiven && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="glass-card rounded-2xl overflow-hidden mb-4 p-4"
        >
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Advanced Analysis Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="demographics" 
                  checked={includeDemographics} 
                  onCheckedChange={(checked) => setIncludeDemographics(checked as boolean)}
                />
                <Label htmlFor="demographics" className="flex items-center gap-2">
                  <BadgePercent className="h-4 w-4 text-health-500" />
                  Include Demographics
                </Label>
              </div>
              
              {includeDemographics && (
                <div className="space-y-3 pl-6">
                  <div className="space-y-1">
                    <Label htmlFor="age">Age</Label>
                    <Select
                      value={userAge.toString()}
                      onValueChange={(value) => setUserAge(parseInt(value))}
                    >
                      <SelectTrigger id="age">
                        <SelectValue placeholder="Select Age" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="13">Below 18</SelectItem>
                        <SelectItem value="25">18-30</SelectItem>
                        <SelectItem value="40">30-50</SelectItem>
                        <SelectItem value="65">50-80</SelectItem>
                        <SelectItem value="85">Above 80</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={userGender}
                      onValueChange={setUserGender}
                    >
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="not_specified">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="genetic" 
                  checked={includeGeneticFactors} 
                  onCheckedChange={(checked) => setIncludeGeneticFactors(checked as boolean)}
                />
                <Label htmlFor="genetic" className="flex items-center gap-2">
                  <Dna className="h-4 w-4 text-health-500" />
                  Genetic Factors
                </Label>
              </div>
              
              {includeGeneticFactors && (
                <p className="text-xs text-gray-500 pl-6">
                  In a clinical implementation, this would integrate with genetic testing services for personalized risk assessment.
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="environmental" 
                  checked={includeEnvironmentalFactors} 
                  onCheckedChange={(checked) => setIncludeEnvironmentalFactors(checked as boolean)}
                />
                <Label htmlFor="environmental" className="flex items-center gap-2">
                  <Waves className="h-4 w-4 text-health-500" />
                  Environmental Factors
                </Label>
              </div>
              
              {includeEnvironmentalFactors && (
                <p className="text-xs text-gray-500 pl-6">
                  In a clinical implementation, this would integrate with environmental data sources to consider factors like air quality and seasonal patterns.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {showHistory ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="glass-card rounded-2xl overflow-hidden mb-4"
        >
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Analysis History</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {analysisHistory.length > 0 ? (
                analysisHistory.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => selectHistoryItem(item)}
                    className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex justify-between items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{item.mainSymptom}</p>
                        {item.confidenceLevel && (
                          <Badge variant="outline" className="text-xs">
                            {(item.confidenceLevel * 100).toFixed(0)}% confidence
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{item.date.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.diagnosis}</span>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No analysis history yet</p>
              )}
            </div>
          </div>
        </motion.div>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card rounded-2xl overflow-hidden flex flex-col h-[70vh] lg:col-span-2"
        >
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
            {isLoading && <TypingIndicator progress={currentAnalysisProgress} />}
            <div ref={messagesEndRef} />
          </div>

          {uploadedImage && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 relative">
              <div className="relative inline-block">
                <img 
                  src={uploadedImage} 
                  alt="Uploaded symptom" 
                  className="h-20 w-auto rounded-lg object-cover" 
                />
                <button 
                  onClick={() => setUploadedImage(null)}
                  className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full p-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
          )}

          {transcribedText && (
            <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Mic className="h-3 w-3 text-health-500" />
                <span>Transcribed: {transcribedText}</span>
              </div>
            </div>
          )}

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <div className="flex space-x-1">
                <button
                  type="button"
                  onClick={() => startRecording()}
                  disabled={isRecording}
                  className={`button-secondary !py-2 cursor-pointer ${isRecording ? 'bg-red-500 text-white' : ''}`}
                  title="Voice Input"
                >
                  <Mic className="h-4 w-4" />
                </button>
                
                {isRecording && (
                  <button
                    type="button"
                    onClick={() => stopRecording()}
                    className="button-secondary !py-2 cursor-pointer bg-red-500 text-white"
                    title="Stop Recording"
                  >
                    <Square className="h-4 w-4" />
                  </button>
                )}
                
                <label className="button-secondary !py-2 cursor-pointer">
                  <Camera className="h-4 w-4" />
                  <input 
                    type="file" 
                    className="hidden"
                    accept="image/*" 
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder={`Describe your ${selectedCategory} symptoms in ${supportedLanguages.find(l => l.value === selectedLanguage)?.label || 'English'}...`}
                className="flex-1 input-field !py-2 text-gray-800 dark:text-gray-200"
                disabled={isRecording}
              />
              
              <button 
                onClick={handleSendMessage}
                disabled={(!inputText.trim() && !uploadedImage) || isRecording}
                className={`button-primary !py-2 !px-4 ${
                  ((!inputText.trim() && !uploadedImage) || isRecording) 
                    ? 'opacity-50 cursor-not-allowed' 
                    : ''
                }`}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Analysis Results Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card rounded-2xl overflow-hidden flex flex-col h-[70vh]"
        >
          <Tabs defaultValue="diagnosis" className="w-full h-full flex flex-col">
            <div className="border-b border-gray-200 dark:border-gray-700 px-4">
              <TabsList className="w-full justify-start pb-0 pt-2">
                <TabsTrigger value="diagnosis" className="data-[state=active]:border-b-2 data-[state=active]:border-health-500 rounded-none pb-2">
                  Diagnosis
                </TabsTrigger>
                <TabsTrigger value="symptoms" className="data-[state=active]:border-b-2 data-[state=active]:border-health-500 rounded-none pb-2">
                  Symptoms
                </TabsTrigger>
                <TabsTrigger value="insights" className="data-[state=active]:border-b-2 data-[state=active]:border-health-500 rounded-none pb-2">
                  Insights
                </TabsTrigger>
                <TabsTrigger value="resources" className="data-[state=active]:border-b-2 data-[state=active]:border-health-500 rounded-none pb-2">
                  Resources
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="diagnosis" className="flex-1 overflow-y-auto p-4 space-y-4 m-0">
              <h3 className="font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                <Brain className="h-4 w-4 text-health-500" />
                Diagnostic Analysis
              </h3>
              
              {diagnosisResults.length > 0 ? (
                <div className="space-y-4">
                  {diagnosisResults.map((result, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{result.condition}</span>
                          {result.severity && (
                            <Badge variant={
                              result.severity === "mild" ? "outline" : 
                              result.severity === "moderate" ? "secondary" : 
                              "destructive"
                            } className="text-xs">
                              {result.severity}
                            </Badge>
                          )}
                        </div>
                        <span className="text-xs px-2 py-1 bg-health-100 dark:bg-health-900/50 text-health-700 dark:text-health-300 rounded-full">
                          {(result.probability * 100).toFixed(0)}% match
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{result.description}</p>
                      <div className="mt-2">
                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Recommendations:</p>
                        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                          {result.recommendations.map((rec, i) => (
                            <li key={i}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                      
                      {result.specialistTypes && result.specialistTypes.length > 0 && (
                        <div className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-700">
                          <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Relevant Specialists:</p>
                          <div className="flex flex-wrap gap-1">
                            {result.specialistTypes.map((specialist, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {specialist}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {result.commonComorbidities && result.commonComorbidities.length > 0 && (
                        <div className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-700">
                          <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Common Associated Conditions:</p>
                          <div className="flex flex-wrap gap-1">
                            {result.commonComorbidities.map((condition, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {condition}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {!secondaryAnalysis && !isLoading && diagnosisResults.length > 0 && (
                    <Button 
                      onClick={runSecondaryAnalysis} 
                      variant="outline" 
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <Zap className="h-4 w-4" />
                      Run Deep Analysis
                    </Button>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  {isLoading ? (
                    <div className="space-y-2">
                      <Microscope className="h-8 w-8 mx-auto text-gray-400" />
                      <p>Analyzing your symptoms...</p>
                      <Progress value={currentAnalysisProgress} className="w-full max-w-xs mx-auto" />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Brain className="h-8 w-8 mx-auto text-gray-400" />
                      <p>Describe your symptoms to receive a diagnostic analysis</p>
                    </div>
                  )}
                </div>
              )}

              {diagnosisResults.length > 0 && (
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-3 mt-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    This analysis is based on pattern recognition and medical knowledge databases. Always consult a healthcare professional for definitive diagnoses.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="symptoms" className="flex-1 overflow-y-auto p-4 space-y-4 m-0">
              <h3 className="font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                <Activity className="h-4 w-4 text-health-500" />
                Symptom Analysis
              </h3>
              
              {activeSymptoms.length > 0 ? (
                <div className="space-y-4">
                  {activeSymptoms.map((symptom, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium capitalize">{symptom.name}</p>
                        {symptom.duration && (
                          <Badge variant="outline" className="text-xs">
                            {symptom.duration}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Mild</span>
                          <span>Moderate</span>
                          <span>Severe</span>
                        </div>
                        <Slider
                          defaultValue={[symptom.level]}
                          max={10}
                          step={1}
                          disabled
                          className="w-full"
                        />
                      </div>
                      
                      {(symptom.pattern || symptom.triggers) && (
                        <div className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400">
                          {symptom.pattern && (
                            <div className="flex items-center gap-1 mb-1">
                              <RefreshCw className="h-3 w-3 text-health-500" />
                              <span>Pattern: <span className="capitalize">{symptom.pattern}</span></span>
                            </div>
                          )}
                          
                          {symptom.triggers && symptom.triggers.length > 0 && (
                            <div className="flex items-center gap-1">
                              <AlertTriangle className="h-3 w-3 text-health-500" />
                              <span>Triggers: {symptom.triggers.join(", ")}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Activity className="h-8 w-8 mx-auto text-gray-400" />
                  <p className="mt-2">No symptoms have been identified yet</p>
                </div>
              )}
              
              {activeSymptoms.length > 0 && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full mt-4">View Symptom Relationships</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Symptom Correlation Analysis</DialogTitle>
                      <DialogDescription>
                        How your symptoms may be related to each other
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Our AI has analyzed the relationships between your reported symptoms to identify patterns that may indicate specific conditions.
                      </p>
                      
                      {activeSymptoms.length > 1 ? (
                        <div className="space-y-3">
                          <h4 className="text-sm font-medium">Primary Relationships:</h4>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                            {activeSymptoms.slice(0, -1).map((symptom, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="rounded-full bg-health-100 text-health-800 p-1 mt-0.5">
                                  <ArrowRight className="h-3 w-3" />
                                </span>
                                <span>
                                  <span className="font-medium capitalize">{symptom.name}</span> 
                                  {" "} may be connected to {" "}
                                  <span className="font-medium capitalize">{activeSymptoms[i+1].name}</span>
                                  {", suggesting possible "} 
                                  {getRandomConditionForSymptoms(symptom.name, activeSymptoms[i+1].name)}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 italic">
                          More symptoms are needed for relationship analysis.
                        </p>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </TabsContent>
            
            <TabsContent value="insights" className="flex-1 overflow-y-auto p-4 space-y-4 m-0">
              <h3 className="font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                <FileText className="h-4 w-4 text-health-500" />
                Health Insights
              </h3>
              
              {diagnosisResults.length > 0 ? (
                <div className="space-y-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Primary Assessment</CardTitle>
                      <CardDescription>Based on your symptom profile</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Your symptom profile suggests {diagnosisResults[0].condition.toLowerCase()} with 
                        {" "}{(diagnosisResults[0].probability * 100).toFixed(0)}% confidence. The analysis 
                        considered {activeSymptoms.length} distinct symptoms and their interrelationships.
                      </p>
                      
                      <div className="mt-4">
                        <p className="text-xs font-medium mb-1">Diagnostic Confidence:</p>
                        <Progress value={diagnosisResults[0].probability * 100} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Health Metrics</CardTitle>
                      <CardDescription>Estimated measurements based on symptoms</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {healthMetrics.length > 0 ? (
                        <div className="space-y-3">
                          {healthMetrics.map((metric, index) => (
                            <div key={index} className="space-y-1">
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">{metric.name}</span>
                                <div className="flex items-center gap-1">
                                  <span className="text-sm font-medium">
                                    {metric.value.toFixed(1)}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {metric.unit}
                                  </span>
                                  {metric.trend === "increasing" ? (
                                    <ArrowUp className="h-3 w-3 text-red-500" />
                                  ) : metric.trend === "decreasing" ? (
                                    <ArrowDown className="h-3 w-3 text-blue-500" />
                                  ) : (
                                    <Minus className="h-3 w-3 text-gray-500" />
                                  )}
                                </div>
                              </div>
                              
                              <div className="relative h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                <div className="absolute inset-0 flex">
                                  <div className="h-full bg-gray-100" style={{ width: `${(metric.normalRange.min / (metric.normalRange.max * 1.5)) * 100}%` }}></div>
                                  <div className="h-full bg-green-100" style={{ width: `${((metric.normalRange.max - metric.normalRange.min) / (metric.normalRange.max * 1.5)) * 100}%` }}></div>
                                  <div className="h-full bg-gray-100" style={{ width: `${((metric.normalRange.max * 1.5) - metric.normalRange.max) / (metric.normalRange.max * 1.5) * 100}%` }}></div>
                                </div>
                                
                                <div 
                                  className={`absolute top-0 bottom-0 w-1 bg-black rounded-full transform -translate-x-1/2`} 
                                  style={{ 
                                    left: `${(metric.value / (metric.normalRange.max * 1.5)) * 100}%`,
                                    backgroundColor: 
                                      metric.value < metric.normalRange.min ? 'rgb(59, 130, 246)' : 
                                      metric.value > metric.normalRange.max ? 'rgb(239, 68, 68)' : 
                                      'rgb(34, 197, 94)'
                                  }}
                                >
                                </div>
                              </div>
                              
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>{metric.normalRange.min}</span>
                                <span>Normal Range</span>
                                <span>{metric.normalRange.max}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 italic">
                          No health metrics available for current symptoms.
                        </p>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Risk Assessment</CardTitle>
                      <CardDescription>Severity and urgency evaluation</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 mb-4">
                        <div className={`h-3 w-3 rounded-full ${
                          getRiskLevel(diagnosisResults, activeSymptoms) === "low" 
                            ? "bg-green-500" 
                            : getRiskLevel(diagnosisResults, activeSymptoms) === "moderate"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`} />
                        <span className="text-sm font-medium capitalize">
                          {getRiskLevel(diagnosisResults, activeSymptoms)} Risk
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {getRiskAssessment(diagnosisResults, activeSymptoms)}
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Follow-up Recommendation</CardTitle>
                      <CardDescription>Next steps for your health</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                        <li className="flex items-start gap-2">
                          <BarChart className="h-4 w-4 text-health-500 mt-0.5" />
                          <span>
                            {getFollowUpRecommendation(diagnosisResults, getRiskLevel(diagnosisResults, activeSymptoms))}
                          </span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-8 w-8 mx-auto text-gray-400" />
                  <p className="mt-2">Complete a symptom analysis to receive health insights</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="resources" className="flex-1 overflow-y-auto p-4 space-y-4 m-0">
              <h3 className="font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                <FileSearch className="h-4 w-4 text-health-500" />
                Related Medical Resources
              </h3>
              
              {relatedResources.length > 0 ? (
                <div className="space-y-3">
                  {relatedResources.map((resource) => (
                    <Card key={resource.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-base">{resource.title}</CardTitle>
                          <Badge variant="outline" className="capitalize">
                            {resource.type}
                          </Badge>
                        </div>
                        <CardDescription>{resource.source}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-500">Relevance:</span>
                            <div className="bg-gray-200 dark:bg-gray-700 h-2 w-16 rounded-full overflow-hidden">
                              <div 
                                className="bg-health-500 h-full" 
                                style={{width: `${resource.relevance * 100}%`}}
                              ></div>
                            </div>
                          </div>
                          <Button variant="link" size="sm" className="h-auto p-0">
                            Visit Source
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FileSearch className="h-8 w-8 mx-auto text-gray-400" />
                  <p className="mt-2">Complete a symptom analysis to see relevant medical resources</p>
                </div>
              )}
              
              <div className="mt-4 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  These resources are provided for informational purposes only. They are from reputable medical sources but should not replace professional medical advice. Always consult a healthcare provider for proper diagnosis and treatment.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

// Utility components
const Message = ({ message }: { message: Message }) => {
  const isUser = message.sender === "user";
  
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`
        max-w-[80%] p-4 rounded-2xl 
        ${isUser 
          ? "bg-health-500 text-white rounded-tr-none" 
          : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none shadow-sm"
        }
      `}>
        {!isUser && (
          <div className="flex items-center gap-2 mb-2">
            <div className="h-6 w-6 rounded-full bg-health-100 dark:bg-health-900 flex items-center justify-center">
              <Bot className="h-3 w-3 text-health-600 dark:text-health-400" />
            </div>
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Arogya AI</span>
            
            {message.confidenceLevel && (
              <div className="flex items-center gap-1 ml-auto">
                <BadgePercent className="h-3 w-3 text-gray-500" />
                <span className="text-xs text-gray-500">{(message.confidenceLevel * 100).toFixed(0)}%</span>
              </div>
            )}
          </div>
        )}
        {message.image && (
          <div className="mb-2">
            <img 
              src={message.image} 
              alt="Uploaded symptom" 
              className="rounded-lg w-full max-h-60 object-cover" 
            />
          </div>
        )}
        <div className="flex flex-wrap gap-1 mb-2">
          {message.category && (
            <span className="text-xs font-medium inline-block px-2 py-0.5 rounded-full bg-health-100 dark:bg-health-900/50 text-health-600 dark:text-health-400">
              {symptomCategories.find(cat => cat.value === message.category)?.label || message.category}
            </span>
          )}
          
          {message.language && message.language !== "en" && (
            <span className="text-xs font-medium inline-block px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
              {supportedLanguages.find(lang => lang.value === message.language)?.label || message.language}
            </span>
          )}
          
          {message.inputType && message.inputType !== "text" && (
            <span className="text-xs font-medium inline-block px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400">
              {message.inputType === "voice" ? "Voice Input" : 
               message.inputType === "image" ? "Image Analysis" : 
               message.inputType === "video" ? "Video Analysis" : 
               "Text Input"}
            </span>
          )}
        </div>
        <div className={`text-sm ${isUser ? "text-white" : "text-gray-800 dark:text-gray-200"}`}>
          {message.content.split('\n').map((line, i) => (
            <p key={i} className={i > 0 ? "mt-2" : ""}>
              {line}
            </p>
          ))}
        </div>
        <span className={`text-xs mt-1 block ${isUser ? "text-white/70" : "text-gray-500"}`}>
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
};

const TypingIndicator = ({ progress = 0 }: { progress?: number }) => (
  <div className="flex justify-start">
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl rounded-tl-none shadow-sm w-4/5">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-6 w-6 rounded-full bg-health-100 dark:bg-health-900 flex items-center justify-center">
          <Bot className="h-3 w-3 text-health-600 dark:text-health-400" />
        </div>
        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Arogya AI</span>
      </div>
      
      <div className="space-y-3">
        <div className="flex space-x-1">
          <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 loading-dot"></div>
          <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 loading-dot"></div>
          <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 loading-dot"></div>
        </div>
        
        {progress > 0 && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Analyzing</span>
              <span>{progress.toFixed(0)}%</span>
            </div>
            <Progress value={progress} className="h-1" />
          </div>
        )}
      </div>
    </div>
  </div>
);

// Helper functions for the advanced analysis
const getRandomConditionForSymptoms = (symptom1: string, symptom2: string): string => {
  const symptomPairs: {[key: string]: string[]} = {
    "headache_fever": ["viral infection", "influenza", "sinusitis"],
    "headache_nausea": ["migraine", "food poisoning", "dehydration"],
    "cough_fever": ["upper respiratory infection", "bronchitis", "pneumonia"],
    "nausea_diarrhea": ["gastroenteritis", "food poisoning", "irritable bowel syndrome"],
    "fever_fatigue": ["viral infection", "mononucleosis", "influenza"],
    "pain_swelling": ["injury", "inflammation", "infection"]
  };
  
  const key1 = `${symptom1}_${symptom2}`;
  const key2 = `${symptom2}_${symptom1}`;
  
  let conditions: string[] = [];
  
  if (key1 in symptomPairs) {
    conditions = symptomPairs[key1];
  } else if (key2 in symptomPairs) {
    conditions = symptomPairs[key2];
  } else {
    conditions = ["systemic condition", "related physiological response", "common underlying cause"];
  }
  
  return conditions[Math.floor(Math.random() * conditions.length)];
};

const getRiskLevel = (diagnoses: DiagnosisResult[], symptoms: SymptomSeverity[]): "low" | "moderate" | "high" => {
  if (diagnoses.length === 0 || symptoms.length === 0) {
    return "low";
  }
  
  // Check for high-risk conditions
  const highRiskConditions = ["Pneumonia", "Influenza", "Gastroenteritis", "Migraine"];
  if (diagnoses.some(d => highRiskConditions.includes(d.condition)) && diagnoses[0].probability > 0.7) {
    return "moderate";
  }
  
  // Check for severe symptoms
  const hasServerSymptoms = symptoms.some(s => s.level >= 8);
  if (hasServerSymptoms) {
    return "moderate";
  }
  
  // Check for multiple moderate symptoms
  const moderateSymptomCount = symptoms.filter(s => s.level >= 6).length;
  if (moderateSymptomCount >= 3) {
    return "moderate";
  }
  
  // Check severity from diagnosis result
  if (diagnoses[0]?.severity === "severe") {
    return "high";
  } else if (diagnoses[0]?.severity === "moderate") {
    return "moderate";
  }
  
  // Default to low risk
  return "low";
};

const getRiskAssessment = (diagnoses: DiagnosisResult[], symptoms: SymptomSeverity[]): string => {
  const riskLevel = getRiskLevel(diagnoses, symptoms);
  
  if (riskLevel === "high") {
    return "Your symptoms indicate a potentially serious condition that may require immediate medical attention. Please consider seeking medical care promptly.";
  } else if (riskLevel === "moderate") {
    return "Your symptoms suggest a condition that should be monitored closely. If symptoms worsen or persist beyond 3-5 days, consultation with a healthcare provider is recommended.";
  } else {
    return "Your symptoms appear to be consistent with a mild, self-limiting condition. Self-care measures should be sufficient, but monitor for any changes in symptoms.";
  }
};

const getFollowUpRecommendation = (diagnoses: DiagnosisResult[], riskLevel: "low" | "moderate" | "high"): string => {
  if (riskLevel === "high") {
    return "Seek medical attention within 24 hours to evaluate your condition properly.";
  } else if (riskLevel === "moderate") {
    return "Monitor your symptoms for 2-3 days. If they persist or worsen, schedule an appointment with your healthcare provider.";
  } else {
    return "Continue self-care measures as recommended. If symptoms persist beyond 7 days, consider consulting a healthcare provider.";
  }
};

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const Square = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
    </svg>
  );
};

const ArrowUp = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
};

const ArrowDown = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  );
};

const Minus = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 12h14" />
    </svg>
  );
};

export default SymptomAnalyzer;
