
import { motion } from "framer-motion";
import { Shield, Heart, ArrowRight, ActivitySquare, Star, Sparkles, Brain, Cpu, Network, MicrochipIcon, Globe, Languages, Focus, Stethoscope, FileText, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl px-4"
      >
        <div className="mx-auto mb-8 h-24 w-24 rounded-full bg-blue-50 flex items-center justify-center shadow-sm">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-health-600">
            <path d="M3 12H7.5L9.5 6L13.5 18L15.5 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 className="text-4xl font-bold mb-6 health-gradient-text">Welcome to Arogya AI</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Your intelligent health companion powered by artificial intelligence. Monitor symptoms, connect with doctors, and gain valuable health insights.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/symptom-analyzer" className="button-primary">
            Analyze Symptoms
          </a>
          <a href="/doctor-consultation" className="button-secondary">
            Find Doctors
          </a>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-24 mb-16 w-full max-w-6xl px-4"
      >
        <h2 className="text-3xl font-bold text-center mb-12 health-gradient-text">Why Choose Arogya AI?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="glass-card-hover p-6 rounded-xl flex flex-col items-center text-center">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-4">
              <ActivitySquare className="h-6 w-6 text-health-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Symptom Analysis</h3>
            <p className="text-gray-600 dark:text-gray-300">Advanced algorithms analyze your symptoms and provide potential conditions with remarkable accuracy.</p>
          </div>
          
          {/* Feature 2 */}
          <div className="glass-card-hover p-6 rounded-xl flex flex-col items-center text-center">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-4">
              <Shield className="h-6 w-6 text-health-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Privacy Focused</h3>
            <p className="text-gray-600 dark:text-gray-300">Your health data is encrypted and protected. We maintain the highest standards of medical data privacy.</p>
          </div>
          
          {/* Feature 3 */}
          <div className="glass-card-hover p-6 rounded-xl flex flex-col items-center text-center">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-4">
              <Heart className="h-6 w-6 text-health-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Personalized Health Insights</h3>
            <p className="text-gray-600 dark:text-gray-300">Receive customized recommendations based on your health profile, activity, and medical history.</p>
          </div>
        </div>
      </motion.div>

      {/* New Indian Ayurveda Feature Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="w-full max-w-6xl px-4 mb-16"
      >
        <h2 className="text-3xl font-bold text-center mb-12 health-gradient-text">Traditional Meets Technology</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Ayurveda Feature */}
          <div className="glass-card-hover p-6 rounded-xl flex flex-col items-center text-center">
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mb-4">
              <Stethoscope className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Ayurvedic Insights</h3>
            <p className="text-gray-600 dark:text-gray-300">Blending ancient Ayurvedic principles with modern medicine for holistic health recommendations.</p>
          </div>
          
          {/* Multilingual Feature */}
          <div className="glass-card-hover p-6 rounded-xl flex flex-col items-center text-center">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full mb-4">
              <Languages className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Indian Languages Support</h3>
            <p className="text-gray-600 dark:text-gray-300">Access healthcare in 12+ Indian languages including Hindi, Tamil, Telugu, Bengali, and more.</p>
          </div>
          
          {/* Rural Healthcare Feature */}
          <div className="glass-card-hover p-6 rounded-xl flex flex-col items-center text-center">
            <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full mb-4">
              <Globe className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Rural Healthcare Access</h3>
            <p className="text-gray-600 dark:text-gray-300">Bringing quality healthcare to remote villages through our offline-capable mobile application.</p>
          </div>
        </div>
      </motion.div>

      {/* Advanced Features Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="w-full max-w-6xl px-4 mb-24"
      >
        <h2 className="text-3xl font-bold text-center mb-12 health-gradient-text">Advanced AI Capabilities</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Advanced Card 1 */}
          <Card className="hover:scale-105 transition-all duration-300">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-2">
                <Brain className="h-6 w-6 text-health-600" />
              </div>
              <CardTitle>Neural Networks</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Our deep learning models continuously improve diagnosis accuracy through neural network training.</CardDescription>
            </CardContent>
          </Card>

          {/* Advanced Card 2 */}
          <Card className="hover:scale-105 transition-all duration-300">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-2">
                <MicrochipIcon className="h-6 w-6 text-health-600" />
              </div>
              <CardTitle>Edge Computing</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Process health data locally on your device for faster results and enhanced privacy protection.</CardDescription>
            </CardContent>
          </Card>

          {/* Advanced Card 3 */}
          <Card className="hover:scale-105 transition-all duration-300">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-2">
                <Network className="h-6 w-6 text-health-600" />
              </div>
              <CardTitle>Medical Network</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Access India's largest network of AI-verified healthcare providers across all specialties.</CardDescription>
            </CardContent>
          </Card>

          {/* Advanced Card 4 */}
          <Card className="hover:scale-105 transition-all duration-300">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-2">
                <Cpu className="h-6 w-6 text-health-600" />
              </div>
              <CardTitle>Smart Diagnostics</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Our algorithms identify patterns in symptoms that human diagnosticians might overlook.</CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Additional Advanced Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {/* New Feature Card 1 */}
          <Card className="hover:scale-105 transition-all duration-300">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-2">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Medical Records</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Securely store and access your medical records, prescriptions, and test results from anywhere.</CardDescription>
            </CardContent>
          </Card>

          {/* New Feature Card 2 */}
          <Card className="hover:scale-105 transition-all duration-300">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-2">
                <Focus className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Mental Wellness</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>AI-powered tools to monitor, analyze, and improve your mental health and emotional wellbeing.</CardDescription>
            </CardContent>
          </Card>

          {/* New Feature Card 3 */}
          <Card className="hover:scale-105 transition-all duration-300">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-2">
                <Zap className="h-6 w-6 text-amber-600" />
              </div>
              <CardTitle>Instant Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Receive instant analysis of medical reports with highlighted concerns and simplified explanations.</CardDescription>
            </CardContent>
          </Card>

          {/* New Feature Card 4 */}
          <Card className="hover:scale-105 transition-all duration-300">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-2">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle>Emergency Care</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>One-tap emergency assistance with automatic location sharing and medical history access.</CardDescription>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Testimonials Section - Updated with more Indian reviews */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="w-full max-w-6xl px-4 mb-24"
      >
        <h2 className="text-3xl font-bold text-center mb-12 health-gradient-text">What Our Users Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Testimonial 1 */}
          <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">"Arogya AI helped me identify my symptoms quickly and connected me with a specialist. The process was seamless and saved me hours of anxiety!"</p>
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 h-10 w-10 flex items-center justify-center font-bold text-health-600">RK</div>
              <div className="ml-3">
                <p className="font-medium">Rahul Kumar</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">New Delhi</p>
              </div>
            </div>
          </div>
          
          {/* Testimonial 2 */}
          <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">"As a busy professional, I don't always have time to visit a doctor for minor concerns. Arogya AI gives me peace of mind with accurate health assessments."</p>
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 h-10 w-10 flex items-center justify-center font-bold text-health-600">PM</div>
              <div className="ml-3">
                <p className="font-medium">Priya Mehta</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Mumbai</p>
              </div>
            </div>
          </div>
          
          {/* Testimonial 3 */}
          <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">"After struggling to find a specialist for my daughter's rare condition, Arogya AI connected us with the right doctor within hours. Truly a life-changing app."</p>
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 h-10 w-10 flex items-center justify-center font-bold text-health-600">SP</div>
              <div className="ml-3">
                <p className="font-medium">Sunita Patel</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Ahmedabad</p>
              </div>
            </div>
          </div>
        </div>

        {/* Second row of testimonials - Updated with more Indian reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Testimonial 4 */}
          <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">"Being a diabetic patient, I use Arogya AI to monitor my symptoms daily. The health insights have helped me maintain better glucose levels consistently."</p>
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 h-10 w-10 flex items-center justify-center font-bold text-health-600">VR</div>
              <div className="ml-3">
                <p className="font-medium">Vikram Reddy</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Hyderabad</p>
              </div>
            </div>
          </div>
          
          {/* Testimonial 5 */}
          <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">"The doctor consultation feature saved me during the pandemic. I could consult with top specialists from the comfort of my home. Highly recommended!"</p>
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 h-10 w-10 flex items-center justify-center font-bold text-health-600">AG</div>
              <div className="ml-3">
                <p className="font-medium">Anjali Gupta</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Bengaluru</p>
              </div>
            </div>
          </div>
          
          {/* Testimonial 6 */}
          <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="w-5 h-5" />
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">"I use Arogya AI for my entire family. The preventive health recommendations are practical and have helped us adopt healthier lifestyle choices."</p>
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 h-10 w-10 flex items-center justify-center font-bold text-health-600">MD</div>
              <div className="ml-3">
                <p className="font-medium">Manoj Desai</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pune</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Third row of testimonials - New Indian reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Testimonial 7 */}
          <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">"The Ayurvedic integration with modern medicine suggestions in Arogya AI is remarkable. It helped me find the perfect balance for my chronic condition."</p>
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 h-10 w-10 flex items-center justify-center font-bold text-health-600">KB</div>
              <div className="ml-3">
                <p className="font-medium">Kavita Bajaj</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Jaipur</p>
              </div>
            </div>
          </div>
          
          {/* Testimonial 8 */}
          <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">"My elderly parents live in a remote village. Arogya AI has been a lifeline, connecting them to specialists and providing regular health monitoring without travel."</p>
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 h-10 w-10 flex items-center justify-center font-bold text-health-600">RG</div>
              <div className="ml-3">
                <p className="font-medium">Rajendra Gupta</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Lucknow</p>
              </div>
            </div>
          </div>
          
          {/* Testimonial 9 */}
          <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">"As a medical student, I use Arogya AI to validate my diagnoses. Its accuracy and detailed explanations have become an essential part of my learning."</p>
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 h-10 w-10 flex items-center justify-center font-bold text-health-600">DS</div>
              <div className="ml-3">
                <p className="font-medium">Dr. Sanjay Sharma</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Chennai</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fourth row of testimonials - New Indian reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Testimonial 10 */}
          <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">"आरोग्य AI ने मेरे बच्चे के स्वास्थ्य को ट्रैक करने में मदद की। हिंदी में सुविधा होने से मुझे इसका उपयोग करना आसान लगता है।"</p>
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 h-10 w-10 flex items-center justify-center font-bold text-health-600">SY</div>
              <div className="ml-3">
                <p className="font-medium">Seema Yadav</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Varanasi</p>
              </div>
            </div>
          </div>
          
          {/* Testimonial 11 */}
          <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">"ஆரோக்கிய AI என் பாரம்பரிய மருத்துவத்துடன் நவீன மருத்துவத்தை இணைக்கிறது. இது என் நாள்பட்ட வலிக்கு உதவியது."</p>
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 h-10 w-10 flex items-center justify-center font-bold text-health-600">NK</div>
              <div className="ml-3">
                <p className="font-medium">Nandhini Krishnan</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Coimbatore</p>
              </div>
            </div>
          </div>
          
          {/* Testimonial 12 */}
          <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">"मी ग्रामीण भागात आरोग्य सेवा देतो. आरोग्य AI मला दूरस्थ रुग्णांसाठी अचूक निदान करण्यात मदत करते."</p>
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 h-10 w-10 flex items-center justify-center font-bold text-health-600">AP</div>
              <div className="ml-3">
                <p className="font-medium">Dr. Aditya Patil</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Nagpur</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Statistics Cards Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="w-full max-w-6xl px-4 mb-24"
      >
        <h2 className="text-3xl font-bold text-center mb-12 health-gradient-text">Making a Difference</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Stat Card 1 */}
          <Card className="text-center hover:scale-105 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-health-600">500K+</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">Active Users Across India</p>
            </CardContent>
          </Card>

          {/* Stat Card 2 */}
          <Card className="text-center hover:scale-105 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-health-600">10K+</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">Verified Medical Practitioners</p>
            </CardContent>
          </Card>

          {/* Stat Card 3 */}
          <Card className="text-center hover:scale-105 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-health-600">95%</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">Diagnostic Accuracy Rate</p>
            </CardContent>
          </Card>

          {/* Stat Card 4 */}
          <Card className="text-center hover:scale-105 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-health-600">2M+</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">Successful Consultations</p>
            </CardContent>
          </Card>
        </div>
        
        {/* New advanced feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          {/* Advanced Stat Card 1 */}
          <Card className="hover:scale-105 transition-all duration-300 border-health-200 dark:border-health-800">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-health-200 to-blue-300 dark:from-health-800 dark:to-blue-700 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Multilingual Support</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base mt-2">
                Our platform supports 14 Indian languages including Hindi, Tamil, Bengali, Telugu, Marathi, Gujarati, and more, making healthcare accessible across the nation.
              </CardDescription>
            </CardContent>
            <CardFooter className="pt-4 border-t">
              <div className="flex gap-2 flex-wrap">
                <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 rounded-full text-health-700 dark:text-health-300">Hindi</span>
                <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 rounded-full text-health-700 dark:text-health-300">Tamil</span>
                <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 rounded-full text-health-700 dark:text-health-300">Telugu</span>
                <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 rounded-full text-health-700 dark:text-health-300">Bengali</span>
                <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 rounded-full text-health-700 dark:text-health-300">+10 more</span>
              </div>
            </CardFooter>
          </Card>

          {/* Advanced Stat Card 2 */}
          <Card className="hover:scale-105 transition-all duration-300 border-health-200 dark:border-health-800">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-200 to-indigo-300 dark:from-purple-800 dark:to-indigo-700 flex items-center justify-center">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <CardTitle>AI Diagnostic Accuracy</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base mt-2">
                Our AI models are trained on millions of medical records and validated by top medical institutions across India, achieving diagnostic accuracy that rivals experienced specialists.
              </CardDescription>
            </CardContent>
            <CardFooter className="pt-4 border-t">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-health-600 h-2.5 rounded-full" style={{ width: '95%' }}></div>
              </div>
              <span className="ml-auto text-sm font-medium text-health-600">95% accuracy</span>
            </CardFooter>
          </Card>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="w-full max-w-6xl px-4 mb-24 text-center"
      >
        <div className="health-gradient p-10 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to take control of your health?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">Join thousands of users who trust Arogya AI for their health monitoring and medical consultation needs.</p>
          <Button size="lg" variant="secondary" className="group">
            Get Started Today
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
