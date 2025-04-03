import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Activity, TrendingUp, Clock, ThumbsUp, AlertCircle, ArrowRight, ArrowUpRight } from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Sample data for charts
const healthScoreData = [
  { day: "Mon", score: 72 },
  { day: "Tue", score: 75 },
  { day: "Wed", score: 79 },
  { day: "Thu", score: 76 },
  { day: "Fri", score: 81 },
  { day: "Sat", score: 83 },
  { day: "Sun", score: 85 },
];

const heartRateData = [
  { time: "6am", rate: 62 },
  { time: "9am", rate: 78 },
  { time: "12pm", rate: 72 },
  { time: "3pm", rate: 75 },
  { time: "6pm", rate: 81 },
  { time: "9pm", rate: 70 },
  { time: "12am", rate: 65 },
];

const sleepData = [
  { day: "Mon", hours: 6.5 },
  { day: "Tue", hours: 7.2 },
  { day: "Wed", hours: 6.8 },
  { day: "Thu", hours: 7.5 },
  { day: "Fri", hours: 8.0 },
  { day: "Sat", hours: 8.5 },
  { day: "Sun", hours: 7.8 },
];

const healthInsights = [
  {
    id: 1,
    title: "Sleep Pattern Improvement",
    description: "Your sleep quality has improved by 12% this week. Keep maintaining your regular sleep schedule.",
    type: "positive",
    icon: <ThumbsUp />,
    action: "View sleep data",
  },
  {
    id: 2,
    title: "Heart Rate Variability",
    description: "Your heart rate shows healthy variability. This is a good indicator of cardiac health.",
    type: "positive",
    icon: <Heart />,
    action: "Learn more",
  },
  {
    id: 3,
    title: "Stress Level Alert",
    description: "Your stress levels have been elevated for the past 3 days. Consider incorporating mindfulness exercises.",
    type: "warning",
    icon: <AlertCircle />,
    action: "Stress management tips",
  },
];

const healthTips = [
  {
    id: 1,
    title: "Stay Hydrated",
    description: "Aim to drink at least 8 glasses of water daily for optimal health.",
    imageUrl: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?q=80&w=200&auto=format",
  },
  {
    id: 2,
    title: "Regular Exercise",
    description: "Even 30 minutes of moderate activity daily can significantly improve your health.",
    imageUrl: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=200&auto=format",
  },
  {
    id: 3,
    title: "Mindful Eating",
    description: "Pay attention to hunger cues and enjoy meals without distractions.",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=200&auto=format",
  },
  {
    id: 4,
    title: "योग और प्राणायाम का महत्व",
    description: "दैनिक योग और प्राणायाम से शारीरिक और मानसिक स्वास्थ्य में सुधार होता है।",
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=200&auto=format",
  },
  {
    id: 5,
    title: "आयुर्वेदिक दिनचर्या",
    description: "स्वस्थ जीवन के लिए आयुर्वेद के अनुसार दिनचर्या का पालन करें।",
    imageUrl: "https://images.unsplash.com/photo-1611071536600-66f4f726c3bf?q=80&w=200&auto=format",
  },
  {
    id: 6,
    title: "Balanced Diet Essentials",
    description: "Include all six essential nutrients in your diet: proteins, carbohydrates, fats, vitamins, minerals, and water.",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=200&auto=format",
  },
  {
    id: 7,
    title: "Quality Sleep Matters",
    description: "Aim for 7-9 hours of quality sleep daily. Maintain a consistent sleep schedule.",
    imageUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=200&auto=format",
  },
  {
    id: 8,
    title: "Mental Health Care",
    description: "Practice meditation, deep breathing, or any mindfulness activity for 10 minutes daily.",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=200&auto=format",
  },
  {
    id: 9,
    title: "स्वस्थ पाचन के नुस्खे",
    description: "भोजन के बाद 10-15 मिनट टहलें और पाचन को बेहतर बनाएं।",
    imageUrl: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=200&auto=format",
  },
  {
    id: 10,
    title: "Stress Management",
    description: "Identify stress triggers and develop healthy coping mechanisms like exercise or hobbies.",
    imageUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=200&auto=format",
  },
  {
    id: 11,
    title: "Immunity Boosting",
    description: "Include vitamin C-rich foods, exercise regularly, and get adequate sleep to strengthen immunity.",
    imageUrl: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=200&auto=format",
  },
  {
    id: 12,
    title: "Heart Health",
    description: "Maintain healthy cholesterol levels through diet, exercise, and stress management.",
    imageUrl: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=200&auto=format",
  },
  {
    id: 13,
    title: "Digital Eye Care",
    description: "Follow the 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds.",
    imageUrl: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=200&auto=format",
  }
];

const HealthInsights = () => {
  const [activeInsightIndex, setActiveInsightIndex] = useState(0);
  const [selectedMetric, setSelectedMetric] = useState("health");
  
  const renderMetricChart = () => {
    switch (selectedMetric) {
      case "health":
        return (
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={healthScoreData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="healthScoreGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis domain={[60, 100]} hide={true} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(255, 255, 255, 0.8)', 
                  border: 'none', 
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  padding: '8px 12px',
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="score" 
                stroke="#0ea5e9" 
                strokeWidth={3}
                fill="url(#healthScoreGradient)" 
                activeDot={{ r: 6, fill: "#0ea5e9", stroke: "#fff", strokeWidth: 2 }} 
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      case "heart":
        return (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={heartRateData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="time" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis domain={[50, 100]} hide={true} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(255, 255, 255, 0.8)', 
                  border: 'none', 
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  padding: '8px 12px',
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="rate" 
                stroke="#ef4444" 
                strokeWidth={3}
                dot={{ r: 0 }}
                activeDot={{ r: 6, fill: "#ef4444", stroke: "#fff", strokeWidth: 2 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case "sleep":
        return (
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={sleepData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="sleepGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis domain={[0, 10]} hide={true} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(255, 255, 255, 0.8)', 
                  border: 'none', 
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  padding: '8px 12px',
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="hours" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                fill="url(#sleepGradient)" 
                activeDot={{ r: 6, fill: "#8b5cf6", stroke: "#fff", strokeWidth: 2 }} 
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  const MetricButton = ({ type, label, active, icon }: { type: string; label: string; active: boolean; icon: React.ReactNode }) => {
    return (
      <button
        onClick={() => setSelectedMetric(type)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
          active 
            ? 'bg-health-500 text-white shadow-md' 
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
        }`}
      >
        <span className="h-4 w-4">{icon}</span>
        {label}
      </button>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Health Insights</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Track your health metrics and get personalized recommendations
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card rounded-2xl p-6 md:col-span-2"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Health Metrics</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">Monitoring your vitals and activity</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <MetricButton 
                type="health" 
                label="Health Score" 
                active={selectedMetric === "health"} 
                icon={<Activity className="text-health-500" />} 
              />
              <MetricButton 
                type="heart" 
                label="Heart Rate" 
                active={selectedMetric === "heart"} 
                icon={<Heart className="text-red-500" />} 
              />
              <MetricButton 
                type="sleep" 
                label="Sleep" 
                active={selectedMetric === "sleep"} 
                icon={<Clock className="text-purple-500" />} 
              />
            </div>
          </div>

          <div className="h-[200px]">
            {renderMetricChart()}
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Current</div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedMetric === "health" ? "85" : selectedMetric === "heart" ? "72 bpm" : "7.8 hrs"}
                </span>
                <span className="flex items-center text-sm font-medium text-green-500">
                  <TrendingUp className="h-4 w-4 mr-0.5" /> 
                  {selectedMetric === "health" ? "4%" : selectedMetric === "heart" ? "Normal" : "+0.6"}
                </span>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Average</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedMetric === "health" ? "79" : selectedMetric === "heart" ? "75 bpm" : "7.3 hrs"}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Target</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedMetric === "health" ? "90+" : selectedMetric === "heart" ? "60-80 bpm" : "8 hrs"}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card rounded-2xl p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Personal Insights</h2>
          
          <div className="space-y-4">
            {healthInsights.map((insight, index) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className={`p-4 rounded-xl border border-gray-100 dark:border-gray-700 ${
                  insight.type === "positive" 
                    ? "bg-green-50 dark:bg-green-900/10" 
                    : "bg-amber-50 dark:bg-amber-900/10"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${
                    insight.type === "positive" 
                      ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400" 
                      : "bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400"
                  }`}>
                    <span className="h-4 w-4">{insight.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{insight.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{insight.description}</p>
                    <button className="text-sm font-medium mt-2 flex items-center gap-1 text-health-600 dark:text-health-400 hover:gap-2 transition-all">
                      {insight.action} <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Health Tips</h2>
          <button className="text-sm font-medium flex items-center gap-1 text-health-600 dark:text-health-400">
            View all <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {healthTips.map((tip, index) => (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="glass-card-hover rounded-2xl overflow-hidden hover-lift cursor-pointer"
            >
              <div className="h-36 overflow-hidden">
                <img 
                  src={tip.imageUrl} 
                  alt={tip.title} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{tip.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{tip.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default HealthInsights;
