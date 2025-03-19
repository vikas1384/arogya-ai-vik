
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Upload, Bot, X, Clock, ArrowRight, BadgePercent } from "lucide-react";
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

const symptomCategories = [
  { value: "general", label: "General" },
  { value: "respiratory", label: "Respiratory" },
  { value: "digestive", label: "Digestive" },
  { value: "skin", label: "Skin & Dermatology" },
  { value: "neurological", label: "Neurological" },
  { value: "musculoskeletal", label: "Musculoskeletal" }
];

const SymptomAnalyzer = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm your AI medical assistant. How can I help you today? You can describe your symptoms or upload a relevant image.",
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const form = useForm();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

    // Simulate AI response delay with randomness for realism
    setTimeout(() => {
      const aiResponse = getAIResponse(inputText, uploadedImage, selectedCategory);
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);

      // Add to history if it's a symptom analysis (not just a greeting)
      if (inputText.trim() || uploadedImage) {
        const newHistoryItem: AnalysisHistory = {
          id: Date.now(),
          date: new Date(),
          mainSymptom: extractMainSymptom(inputText, selectedCategory),
          diagnosis: extractDiagnosis(aiResponse.content)
        };
        setAnalysisHistory(prev => [newHistoryItem, ...prev]);
      }
    }, 1500 + Math.random() * 1000);
  };

  const extractMainSymptom = (text: string, category: string): string => {
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

  const extractDiagnosis = (aiResponse: string): string => {
    // Extract the first sentence after "analyzing your symptoms"
    const match = aiResponse.match(/analyzing your symptoms[^.]*\.(.*?)\./i);
    if (match && match[1]) {
      return match[1].trim();
    }
    return "Analysis completed";
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

  const getAIResponse = (text: string, image: string | null, category: string): Message => {
    let responseContent = "I'm analyzing your symptoms... ";
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
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">AI Symptom Analyzer</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Describe your symptoms or upload an image for AI-powered health analysis
        </p>
      </motion.div>

      <div className="flex gap-4 mb-4">
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass-card rounded-2xl overflow-hidden flex flex-col h-[70vh]"
      >
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
          {isLoading && <TypingIndicator />}
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

const TypingIndicator = () => (
  <div className="flex justify-start">
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl rounded-tl-none shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-6 w-6 rounded-full bg-health-100 dark:bg-health-900 flex items-center justify-center">
          <Bot className="h-3 w-3 text-health-600 dark:text-health-400" />
        </div>
        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Arogya AI</span>
      </div>
      <div className="flex space-x-1">
        <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 loading-dot"></div>
        <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 loading-dot"></div>
        <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 loading-dot"></div>
      </div>
    </div>
  </div>
);

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export default SymptomAnalyzer;
