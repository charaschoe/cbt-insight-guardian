
import MainLayout from "@/layouts/MainLayout";
import { useAIMode } from "@/hooks/use-ai-mode";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import AIPatternDetection from "@/components/ai/AIPatternDetection";
import AIThemeAnalysis from "@/components/ai/AIThemeAnalysis";
import AIThoughtExercises from "@/components/ai/AIThoughtExercises";
import AIResearchSequence from "@/components/ai/AIResearchSequence";
import { Brain, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const AIAnalysis = () => {
  const { isAIMode, therapyMode } = useAIMode();

  // If not in AI mode, show a message suggesting to enable it
  if (!isAIMode) {
    return (
      <MainLayout>
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">AI Analysis</h1>
          <p className="text-muted-foreground">Advanced AI-powered insights and exercises</p>
        </div>
        
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
            <AlertTriangle className="h-12 w-12 text-amber-500" />
            <h2 className="text-xl font-medium">AI Mode Not Enabled</h2>
            <p className="text-muted-foreground">
              To access AI Analysis features, please enable the AI Self-Therapy Mode from the main dashboard.
            </p>
            <Button asChild>
              <a href="/">
                <Brain className="h-4 w-4 mr-2" />
                Return to Dashboard
              </a>
            </Button>
          </CardContent>
        </Card>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">AI Analysis</h1>
        <p className="text-muted-foreground">Advanced AI-powered insights and exercises</p>
      </div>

      <Tabs defaultValue="patterns" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
          <TabsTrigger value="themes">Themes</TabsTrigger>
          <TabsTrigger value="exercises">Exercises</TabsTrigger>
          <TabsTrigger value="process">AI Process</TabsTrigger>
        </TabsList>
        
        <TabsContent value="patterns">
          <AIPatternDetection />
        </TabsContent>
        
        <TabsContent value="themes">
          <AIThemeAnalysis />
        </TabsContent>
        
        <TabsContent value="exercises">
          <AIThoughtExercises />
        </TabsContent>
        
        <TabsContent value="process">
          <AIResearchSequence />
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default AIAnalysis;
