
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AIProvider } from "@/hooks/use-ai-mode";
import Index from "./pages/Index";
import Journal from "./pages/Journal";
import Chat from "./pages/Chat";
import Insights from "./pages/Insights";
import Progress from "./pages/Progress";
import Sessions from "./pages/Sessions";
import Exercises from "./pages/Exercises";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import TherapistDashboard from "./pages/TherapistDashboard";
import NotFound from "./pages/NotFound";
import AIAnalysis from "./pages/AIAnalysis";
import PatternDetail from "./pages/PatternDetail";
import ThemeDetail from "./pages/ThemeDetail";
import ExerciseDetail from "./pages/ExerciseDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AIProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/exercises/:exerciseId" element={<ExerciseDetail />} />
            <Route path="/community" element={<Community />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/therapist-dashboard" element={<TherapistDashboard />} />
            <Route path="/analysis" element={<AIAnalysis />} />
            <Route path="/patterns/:patternId" element={<PatternDetail />} />
            <Route path="/themes/:themeId" element={<ThemeDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AIProvider>
  </QueryClientProvider>
);

export default App;
