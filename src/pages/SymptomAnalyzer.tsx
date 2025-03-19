
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Upload, Bot, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SymptomAnalyzer = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm your AI medical assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!inputText.trim() && !uploadedImage) return;

    const userMessage: Message = {
      id: Date.now(),
      content: inputText,
      sender: "user",
      timestamp: new Date(),
      image: uploadedImage,
    };

    setMessages([...messages, userMessage]);
    setInputText("");
    setUploadedImage(null);
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = getAIResponse(inputText, uploadedImage);
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
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

  const getAIResponse = (text: string, image: string | null): Message => {
    let responseContent = "I'm analyzing your symptoms... ";

    if (text.toLowerCase().includes("headache")) {
      responseContent += "Your headache could be due to various causes such as stress, dehydration, or tension. I recommend staying hydrated and resting in a quiet, dark room. If it persists for more than 24 hours, please consult a doctor.";
    } else if (text.toLowerCase().includes("fever")) {
      responseContent += "Fever is often a sign that your body is fighting an infection. Rest, stay hydrated, and take over-the-counter fever reducers if needed. If your temperature exceeds 103°F (39.4°C) or lasts more than three days, seek medical attention.";
    } else if (text.toLowerCase().includes("cough")) {
      responseContent += "Your cough could be due to a viral infection, allergies, or irritants. Stay hydrated and consider using honey for soothing (unless you're under 1 year old). If you experience difficulty breathing or the cough persists for more than a week, please consult a doctor.";
    } else if (image) {
      responseContent += "Based on the image you've shared, I can see some skin-related symptoms. It appears to be a mild rash, potentially caused by an allergic reaction. I recommend avoiding potential allergens and monitoring for changes. If it spreads or worsens, please consult a dermatologist.";
    } else {
      responseContent += "Based on what you've told me, these symptoms could have several causes. I recommend monitoring them and resting. If they persist or worsen, please consult with a healthcare professional for a proper diagnosis.";
    }

    return {
      id: Date.now() + 1,
      content: responseContent,
      sender: "ai",
      timestamp: new Date(),
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
              placeholder="Describe your symptoms..."
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

interface Message {
  id: number;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  image?: string | null;
}

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
        <p className={`text-sm ${isUser ? "text-white" : "text-gray-800 dark:text-gray-200"}`}>
          {message.content}
        </p>
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
