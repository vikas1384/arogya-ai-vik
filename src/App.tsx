
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";

// Pages
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";
import SymptomChecker from "./pages/SymptomChecker";

// Lazy loaded pages for better performance
const SymptomAnalyzer = lazy(() => import("./pages/SymptomAnalyzer"));
const DoctorConsultation = lazy(() => import("./pages/DoctorConsultation"));
const HealthInsights = lazy(() => import("./pages/HealthInsights"));
const Profile = lazy(() => import("./pages/Profile"));

// Create a client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="symptom-checker" element={<SymptomChecker />} />
              <Route path="symptom-analyzer" element={
                <Suspense fallback={<PageLoader />}>
                  <SymptomAnalyzer />
                </Suspense>
              } />
              <Route path="doctor-consultation" element={
                <Suspense fallback={<PageLoader />}>
                  <DoctorConsultation />
                </Suspense>
              } />
              <Route path="health-insights" element={
                <Suspense fallback={<PageLoader />}>
                  <HealthInsights />
                </Suspense>
              } />
              <Route path="profile" element={
                <Suspense fallback={<PageLoader />}>
                  <Profile />
                </Suspense>
              } />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[80vh]">
    <div className="flex space-x-2">
      <div className="w-4 h-4 rounded-full bg-health-500 loading-dot"></div>
      <div className="w-4 h-4 rounded-full bg-health-500 loading-dot"></div>
      <div className="w-4 h-4 rounded-full bg-health-500 loading-dot"></div>
    </div>
  </div>
);

export default App;
