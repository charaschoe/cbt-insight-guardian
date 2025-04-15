
import MainLayout from "@/layouts/MainLayout";
import { LineChart, Brain, Heart, Activity, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AIInsightsSection from "@/components/ai/AIInsightsSection";
import PersonalizedInsightsSection from "@/components/ai/PersonalizedInsightsSection";
import AITherapyModeTab from "@/components/ai/AITherapyModeTab";
import { InfoButton } from "@/components/ui/info-button";

const Insights = () => {
  return (
    <MainLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Insights</h1>
          <p className="text-muted-foreground">Personalized insights based on your data</p>
        </div>
        <InfoButton 
          tooltip="These insights are generated based on your journal entries, therapy sessions, and other data you've shared with the platform."
        />
      </div>

      <Tabs defaultValue="ai-insights">
        <TabsList className="mb-6">
          <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
          <TabsTrigger value="personalized">Personalized Insights</TabsTrigger>
          <TabsTrigger value="patterns">Thought Patterns</TabsTrigger>
          <TabsTrigger value="correlations">Lifestyle Correlations</TabsTrigger>
        </TabsList>

        <TabsContent value="ai-insights">
          <AIInsightsSection className="mb-6" />
        </TabsContent>
        
        <TabsContent value="personalized">
          <PersonalizedInsightsSection className="mb-6" />
        </TabsContent>
        
        <TabsContent value="patterns">
          <AITherapyModeTab className="mb-6" />
        </TabsContent>
        
        <TabsContent value="correlations">
          <Card className="md:col-span-2 mb-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Lifestyle Correlations</CardTitle>
              <LineChart className="h-5 w-5 text-therapy-primary" />
            </CardHeader>
            <CardContent>
              <CardDescription className="mt-2">
                AI-detected correlations between your lifestyle factors and mental wellbeing
              </CardDescription>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="border rounded-md p-4">
                  <h3 className="text-sm font-medium mb-2">Sleep Quality</h3>
                  <div className="h-32 bg-muted/30 rounded-md flex items-center justify-center mb-3">
                    <p className="text-xs text-muted-foreground">Sleep-mood correlation chart</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <strong>Strong correlation:</strong> 7+ hours of sleep correlates with 23% lower anxiety levels the following day.
                  </p>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="text-sm font-medium mb-2">Physical Activity</h3>
                  <div className="h-32 bg-muted/30 rounded-md flex items-center justify-center mb-3">
                    <p className="text-xs text-muted-foreground">Exercise-mood correlation chart</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <strong>Moderate correlation:</strong> Days with 20+ minutes of exercise show improved mood scores in the evening.
                  </p>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="text-sm font-medium mb-2">Social Interaction</h3>
                  <div className="h-32 bg-muted/30 rounded-md flex items-center justify-center mb-3">
                    <p className="text-xs text-muted-foreground">Social-mood correlation chart</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <strong>Positive correlation:</strong> Meaningful social interactions correlate with reduced feelings of isolation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Insights;
