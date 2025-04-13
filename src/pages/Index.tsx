
import MainLayout from "@/layouts/MainLayout";
import MoodTracker from "@/components/MoodTracker";
import ThoughtLog from "@/components/ThoughtLog";
import UpcomingSession from "@/components/UpcomingSession";
import WeeklyProgress from "@/components/WeeklyProgress";
import AIInsights from "@/components/AIInsights";
import InsightCard from "@/components/InsightCard";
import AISelfTherapyMode from "@/components/AISelfTherapyMode";
import AIFramework from "@/components/AIFramework";
import TherapyModeSelector from "@/components/TherapyModeSelector";
import AIPatternDetection from "@/components/ai/AIPatternDetection";
import AIThemeAnalysis from "@/components/ai/AIThemeAnalysis";
import AIThoughtExercises from "@/components/ai/AIThoughtExercises";
import AIResearchSequence from "@/components/ai/AIResearchSequence";
import { ChevronDown, ChevronUp, HelpCircle, BellRing, Brain, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useAIMode } from "@/hooks/use-ai-mode";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const Index = () => {
  const { isAIMode, toggleAIMode } = useAIMode();
  const { toast } = useToast();

  const handleModeToggle = () => {
    toggleAIMode();
    toast({
      title: isAIMode ? "Standard Mode Activated" : "AI Self-Therapy Mode Activated",
      description: isAIMode 
        ? "Switched to standard therapy mode with clinician support."
        : "Switched to AI-guided self-therapy mode for mild to moderate concerns.",
    });
  };

  return (
    <MainLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Welcome back, Alex</h1>
          <p className="text-muted-foreground">Track your progress and manage your mental wellness</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Switch id="ai-mode" checked={isAIMode} onCheckedChange={handleModeToggle} />
            <label htmlFor="ai-mode" className="text-sm flex items-center gap-1 cursor-pointer">
              <Brain className="h-4 w-4 text-therapy-primary" />
              AI Self-Therapy Mode
            </label>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-xs max-w-[250px]">
                  Switch to AI Self-Therapy Mode for mild to moderate concerns. This mode provides automated guidance without clinician involvement.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {isAIMode ? (
        <Tabs defaultValue="therapy">
          <TabsList className="mb-4">
            <TabsTrigger value="therapy">AI Therapy</TabsTrigger>
            <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
            <TabsTrigger value="approaches">Therapy Approaches</TabsTrigger>
            <TabsTrigger value="framework">AI Framework</TabsTrigger>
          </TabsList>
          
          <TabsContent value="therapy">
            <AISelfTherapyMode />
          </TabsContent>

          <TabsContent value="analysis">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <AIPatternDetection />
              <AIThemeAnalysis />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <AIThoughtExercises />
              <AIResearchSequence />
            </div>
            
            <div className="text-center mt-4">
              <Button asChild>
                <Link to="/analysis" className="flex items-center">
                  Explore Full AI Analysis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="approaches">
            <TherapyModeSelector />
          </TabsContent>
          
          <TabsContent value="framework">
            <AIFramework />
          </TabsContent>
        </Tabs>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="gradient-card">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-muted p-2">
                      <ChevronUp className="h-4 w-4 text-green-500" />
                    </div>
                    <h3 className="text-sm font-medium">Mood Trend</h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <HelpCircle className="h-3 w-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs max-w-[200px]">
                            Your average mood score over the past 7 days compared to previous period
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-2xl font-semibold">+12%</p>
                    <p className="text-xs text-muted-foreground">vs last week</p>
                  </div>
                  <div className="text-xs font-medium text-green-600 flex items-center gap-1">
                    <span>Improving</span>
                    <ChevronUp className="h-3 w-3" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-muted p-2">
                      <ChevronDown className="h-4 w-4 text-green-500" />
                    </div>
                    <h3 className="text-sm font-medium">Anxiety Level</h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <HelpCircle className="h-3 w-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs max-w-[200px]">
                            Your average anxiety score over the past 7 days compared to previous period
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-2xl font-semibold">-9%</p>
                    <p className="text-xs text-muted-foreground">vs last week</p>
                  </div>
                  <div className="text-xs font-medium text-green-600 flex items-center gap-1">
                    <span>Improving</span>
                    <ChevronUp className="h-3 w-3" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-muted p-2">
                      <BellRing className="h-4 w-4 text-therapy-primary" />
                    </div>
                    <h3 className="text-sm font-medium">Active Streak</h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <HelpCircle className="h-3 w-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs max-w-[200px]">
                            Number of consecutive days you've logged your mood and thoughts
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-2xl font-semibold">6 days</p>
                    <p className="text-xs text-muted-foreground">Keep it up!</p>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5, 6].map((day) => (
                      <div
                        key={day}
                        className="h-1.5 w-6 bg-therapy-primary rounded-full opacity-90"
                      ></div>
                    ))}
                    <div className="h-1.5 w-6 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-6 md:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MoodTracker />
                <UpcomingSession />
              </div>
              <WeeklyProgress />
              <ThoughtLog />
            </div>

            <div className="space-y-6">
              <AIInsights />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Personalized Insights</h3>
                
                <InsightCard 
                  title="Environmental Impact" 
                  description="Your mood tends to improve on days with more than 30 minutes of sunlight exposure. Consider a morning walk routine." 
                />
                
                <InsightCard 
                  title="Thought Pattern" 
                  description="Your journal entries show improvement in challenging catastrophic thinking. Keep practicing cognitive reframing." 
                />
                
                <InsightCard 
                  title="Sleep Connection" 
                  description="Nights with 7+ hours of sleep correlate with 23% lower anxiety levels the following day." 
                />
              </div>
            </div>
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default Index;
