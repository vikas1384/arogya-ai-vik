
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Upload, Bot, X, Clock, ArrowRight, BadgePercent, Brain, Microscope, Activity, FileText, Zap, BarChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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

interface Message {
  id: number;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  image?: string | null;
  confidenceLevel?: number;
  category?: string;
}

interface AnalysisHistory {
  id: number;
  date: Date;
  mainSymptom: string;
  diagnosis: string;
}

interface SymptomSeverity {
  name: string;
  level: number;
}

interface DiagnosisResult {
  condition: string;
  probability: number;
  description: string;
  recommendations: string[];
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
  { value: "immunological", label: "Immunological" }
];

const SymptomAnalyzer = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm your AI medical assistant. How can I help you today? You can describe your symptoms or upload a relevant image for analysis.",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("general");
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [activeSymptoms, setActiveSymptoms] = useState<SymptomSeverity[]>([]);
  const [diagnosisResults, setDiagnosisResults] = useState<DiagnosisResult[]>([]);
  const [analysisMode, setAnalysisMode] = useState<"standard" | "advanced">("standard");
  const [secondaryAnalysis, setSecondaryAnalysis] = useState(false);
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);
  const [currentAnalysisProgress, setCurrentAnalysisProgress] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const form = useForm();

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

  const handleSendMessage = () => {
    if (!inputText.trim() && !uploadedImage) return;

    const userMessage: Message = {
      id: Date.now(),
      content: inputText,
      sender: "user",
      timestamp: new Date(),
      image: uploadedImage,
      category: selectedCategory
    };

    setMessages([...messages, userMessage]);
    setInputText("");
    setUploadedImage(null);
    setIsLoading(true);
    setSecondaryAnalysis(false);
    setShowDetailedAnalysis(false);

    // Extract symptoms from input for advanced analysis
    const extractedSymptoms = extractSymptoms(inputText);
    setActiveSymptoms(extractedSymptoms);

    // Set analysis mode based on complexity of symptoms
    const complexAnalysis = extractedSymptoms.length > 2 || inputText.length > 50 || uploadedImage !== null;
    setAnalysisMode(complexAnalysis ? "advanced" : "standard");

    // Simulate AI response delay with randomness for realism
    setTimeout(() => {
      const aiResponse = getAIResponse(inputText, uploadedImage, selectedCategory, extractedSymptoms);
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);

      // Generate diagnosis results
      const results = generateDiagnosisResults(inputText, selectedCategory, extractedSymptoms);
      setDiagnosisResults(results);

      // Add to history if it's a symptom analysis (not just a greeting)
      if (inputText.trim() || uploadedImage) {
        const newHistoryItem: AnalysisHistory = {
          id: Date.now(),
          date: new Date(),
          mainSymptom: extractMainSymptom(inputText, selectedCategory, extractedSymptoms),
          diagnosis: results.length > 0 ? results[0].condition : "Analysis completed"
        };
        setAnalysisHistory(prev => [newHistoryItem, ...prev]);
      }
    }, 1500 + Math.random() * 2000);
  };

  const extractSymptoms = (text: string): SymptomSeverity[] => {
    if (!text.trim()) return [];
    
    const keywords = [
      "headache", "pain", "fever", "cough", "rash", 
      "nausea", "fatigue", "dizzy", "sore", "breathing",
      "throat", "chest", "heart", "stomach", "joint",
      "back", "diarrhea", "vomiting", "chills", "swelling"
    ];
    
    const foundSymptoms: SymptomSeverity[] = [];
    
    for (const keyword of keywords) {
      if (text.toLowerCase().includes(keyword)) {
        // Attempt to extract severity based on context
        let severity = 5; // Default moderate severity
        
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
          level: severity
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

  const generateDiagnosisResults = (text: string, category: string, symptoms: SymptomSeverity[]): DiagnosisResult[] => {
    const results: DiagnosisResult[] = [];
    
    // Return empty results if no significant input
    if (!text.trim() && symptoms.length === 0) return results;
    
    // Generate primary condition based on category and symptoms
    if (category === "respiratory") {
      if (symptoms.some(s => s.name === "cough") || text.toLowerCase().includes("cough")) {
        const isSevereCough = symptoms.find(s => s.name === "cough")?.level >= 7;
        const hasFever = symptoms.some(s => s.name === "fever") || text.toLowerCase().includes("fever");
        const hasChestPain = symptoms.some(s => s.name === "chest") || text.toLowerCase().includes("chest");
        
        if (isSevereCough && hasFever) {
          results.push({
            condition: "Bronchitis",
            probability: 0.78,
            description: "Inflammation of the lining of the bronchial tubes that carry air to and from the lungs.",
            recommendations: [
              "Rest and stay hydrated",
              "Use a humidifier to ease breathing",
              "Over-the-counter cough suppressants may help",
              "Consult a doctor if symptoms persist beyond 3 weeks"
            ]
          });
          
          results.push({
            condition: "Influenza",
            probability: 0.65,
            description: "Viral infection that attacks your respiratory system - your nose, throat and lungs.",
            recommendations: [
              "Rest and avoid physical exertion",
              "Stay hydrated and take fever reducers if needed",
              "Consult a doctor about antiviral medications if caught early"
            ]
          });
        } else if (hasChestPain) {
          results.push({
            condition: "Pneumonia",
            probability: 0.72,
            description: "Infection that inflames air sacs in one or both lungs, which may fill with fluid.",
            recommendations: [
              "Seek medical attention immediately",
              "Prescription antibiotics will likely be needed",
              "Rest and hydration are essential"
            ]
          });
        } else {
          results.push({
            condition: "Upper Respiratory Infection",
            probability: 0.82,
            description: "Common cold or viral infection affecting the nose, throat, and airways.",
            recommendations: [
              "Rest and stay hydrated",
              "Over-the-counter decongestants may provide relief",
              "Use saltwater gargle for sore throat"
            ]
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
            probability: 0.85,
            description: "Inflammation of the lining of the stomach and intestines, often due to viral or bacterial infection.",
            recommendations: [
              "Stay hydrated with clear fluids",
              "Try the BRAT diet (Bananas, Rice, Applesauce, Toast)",
              "Avoid dairy, caffeine, and spicy foods",
              "Seek medical attention if symptoms persist beyond 48 hours"
            ]
          });
        } else if (hasStomachPain) {
          results.push({
            condition: "Gastritis",
            probability: 0.76,
            description: "Inflammation of the lining of the stomach, often caused by bacterial infection or prolonged use of certain medications.",
            recommendations: [
              "Avoid spicy, acidic, and fatty foods",
              "Eat smaller, more frequent meals",
              "Consider over-the-counter antacids",
              "Consult a doctor if symptoms continue"
            ]
          });
          
          results.push({
            condition: "Peptic Ulcer",
            probability: 0.58,
            description: "Open sore that develops on the inside lining of the stomach and the upper portion of the small intestine.",
            recommendations: [
              "Avoid spicy, acidic foods and alcohol",
              "Take antacids as directed for temporary relief",
              "Consult a doctor for proper diagnosis and treatment"
            ]
          });
        } else {
          results.push({
            condition: "Food Intolerance",
            probability: 0.68,
            description: "Difficulty digesting certain foods due to lack of specific enzymes.",
            recommendations: [
              "Keep a food diary to identify trigger foods",
              "Stay hydrated and consider short-term dietary adjustments",
              "Consult with a dietitian for personalized advice"
            ]
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
            probability: 0.86,
            description: "Recurring type of headache that causes moderate to severe pain, often with additional symptoms like nausea and sensitivity to light and sound.",
            recommendations: [
              "Rest in a dark, quiet room",
              "Apply cold compresses to the forehead",
              "Consider over-the-counter migraine medications",
              "Consult a doctor for recurring migraines"
            ]
          });
        } else if (isSevereHeadache) {
          results.push({
            condition: "Tension Headache",
            probability: 0.79,
            description: "Most common type of headache that causes mild to moderate pain, often described as feeling like a tight band around the head.",
            recommendations: [
              "Practice stress-reduction techniques",
              "Use over-the-counter pain relievers as directed",
              "Apply warm or cold compresses to the neck or head",
              "Maintain good posture and take regular breaks from screens"
            ]
          });
        } else if (hasDizziness) {
          results.push({
            condition: "Vestibular Dysfunction",
            probability: 0.65,
            description: "Disorder of the inner ear that can lead to dizziness and balance problems.",
            recommendations: [
              "Avoid sudden movements and stand up slowly",
              "Stay hydrated and consider vestibular exercises",
              "Consult a healthcare provider for proper diagnosis"
            ]
          });
        }
      }
    } else {
      // Generic conditions for other categories based on common symptoms
      if (symptoms.some(s => s.name === "fever") || text.toLowerCase().includes("fever")) {
        results.push({
          condition: "Viral Infection",
          probability: 0.75,
          description: "General viral infection that may cause fever, fatigue, and various other symptoms.",
          recommendations: [
            "Rest and stay hydrated",
            "Take fever reducers like acetaminophen if needed",
            "Monitor temperature and other symptoms",
            "Seek medical attention if fever persists beyond 3 days or exceeds 39.4°C (103°F)"
          ]
        });
      }
      
      if (symptoms.some(s => s.name === "fatigue") || text.toLowerCase().includes("tired") || text.toLowerCase().includes("fatigue")) {
        results.push({
          condition: "Stress or Overexertion",
          probability: 0.72,
          description: "Physical and mental fatigue due to stress, poor sleep, or overexertion.",
          recommendations: [
            "Prioritize quality sleep (7-9 hours nightly)",
            "Practice stress-reduction techniques",
            "Ensure proper nutrition and hydration",
            "Consider reducing workload temporarily"
          ]
        });
        
        results.push({
          condition: "Vitamin Deficiency",
          probability: 0.58,
          description: "Lack of essential vitamins, particularly Vitamin B12, D, or Iron, which can cause fatigue.",
          recommendations: [
            "Consult a healthcare provider for blood tests",
            "Consider dietary changes to include nutrient-rich foods",
            "Supplements may be recommended based on test results"
          ]
        });
      }
    }
    
    // If we couldn't determine specific conditions, add a generic analysis
    if (results.length === 0 && (text.trim() || symptoms.length > 0)) {
      results.push({
        condition: "Non-specific Symptoms",
        probability: 0.60,
        description: "Your symptoms don't clearly indicate a specific condition, which may be due to a mild temporary issue or the early stage of a developing condition.",
        recommendations: [
          "Monitor your symptoms for any changes",
          "Ensure adequate rest, hydration, and nutrition",
          "If symptoms persist or worsen, consult a healthcare provider"
        ]
      });
    }
    
    return results;
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
          ]
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
          ]
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
          ]
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
        ]
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
      toast({
        title: "Invalid file",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string);
      toast({
        title: "Image uploaded",
        description: "Your symptom image has been added for analysis",
      });
    };
    reader.readAsDataURL(file);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
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

  const getAIResponse = (text: string, image: string | null, category: string, symptoms: SymptomSeverity[]): Message => {
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

    // Add disclaimer
    responseContent += "\n\nRemember: This analysis is for informational purposes only and does not replace professional medical advice. If your symptoms are severe or concerning, please seek immediate medical attention.";

    return {
      id: Date.now() + 1,
      content: responseContent,
      sender: "ai",
      timestamp: new Date(),
      confidenceLevel: confidenceLevel
    };
  };

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Advanced AI Symptom Analyzer</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Describe your symptoms or upload an image for AI-powered health analysis
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
      </div>

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
                      <p className="font-medium text-sm">{item.mainSymptom}</p>
                      <p className="text-xs text-gray-500">{item.date.toLocaleString()}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
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

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <label className="button-secondary !py-2 cursor-pointer">
                <Upload className="h-4 w-4" />
                <input 
                  type="file" 
                  className="hidden"
                  accept="image/*" 
                  onChange={handleImageUpload}
                />
              </label>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder={`Describe your ${selectedCategory} symptoms...`}
                className="flex-1 input-field !py-2 text-gray-800 dark:text-gray-200"
              />
              <button 
                onClick={handleSendMessage}
                disabled={!inputText.trim() && !uploadedImage}
                className={`button-primary !py-2 !px-4 ${
                  (!inputText.trim() && !uploadedImage) 
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
                        <span className="font-medium">{result.condition}</span>
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
                      <p className="font-medium mb-2 capitalize">{symptom.name}</p>
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
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

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
        {message.category && (
          <div className="mb-2">
            <span className="text-xs font-medium inline-block px-2 py-0.5 rounded-full bg-health-100 dark:bg-health-900/50 text-health-600 dark:text-health-400">
              {symptomCategories.find(cat => cat.value === message.category)?.label || message.category}
            </span>
          </div>
        )}
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

export default SymptomAnalyzer;
