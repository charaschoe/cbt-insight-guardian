
import MainLayout from "@/layouts/MainLayout";
import { LineChart, Brain, Heart, Activity, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Insights = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Insights</h1>
        <p className="text-muted-foreground">Personalized insights based on your data</p>
      </div>

      <Tabs defaultValue="patterns">
        <TabsList className="mb-6">
          <TabsTrigger value="patterns">Thought Patterns</TabsTrigger>
          <TabsTrigger value="emotions">Emotional Intelligence</TabsTrigger>
          <TabsTrigger value="correlations">Lifestyle Correlations</TabsTrigger>
        </TabsList>

        <TabsContent value="patterns">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Thought Patterns</CardTitle>
                <LineChart className="h-5 w-5 text-therapy-primary" />
              </CardHeader>
              <CardContent>
                <CardDescription className="mt-2">
                  Analysis of your recurring thought patterns over the past 30 days
                </CardDescription>
                <div className="h-48 mt-4 flex items-center justify-center bg-muted/50 rounded-md">
                  <p className="text-sm text-muted-foreground">Thought pattern visualization</p>
                </div>
                
                <div className="mt-6 space-y-3">
                  <div className="border rounded-md p-3">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium">Catastrophizing</h4>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700">Moderate</Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Tendency to assume worst-case scenarios in work-related contexts
                    </p>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium">All-or-Nothing Thinking</h4>
                      <Badge variant="outline" className="bg-green-50 text-green-700">Improving</Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Reduced instances of binary thinking in social situations
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Cognitive Restructuring</CardTitle>
                <Brain className="h-5 w-5 text-therapy-primary" />
              </CardHeader>
              <CardContent>
                <CardDescription className="mt-2">
                  AI-suggested reframing techniques based on your thought patterns
                </CardDescription>
                
                <div className="mt-4 space-y-3">
                  <div className="border rounded-md p-3">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-therapy-primary/10 p-1.5">
                        <AlertTriangle className="h-4 w-4 text-therapy-primary" />
                      </div>
                      <h4 className="text-sm font-medium">Distorted Thought Pattern</h4>
                    </div>
                    <p className="mt-2 text-sm">
                      "If I make a mistake in this presentation, my career will be ruined."
                    </p>
                  </div>
                  
                  <div className="border border-therapy-primary rounded-md p-3 bg-therapy-light">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-therapy-primary/20 p-1.5">
                        <Brain className="h-4 w-4 text-therapy-primary" />
                      </div>
                      <h4 className="text-sm font-medium">Reframing Suggestion</h4>
                    </div>
                    <p className="mt-2 text-sm">
                      "If I make a mistake, I'll learn from it. One presentation doesn't define my entire career."
                    </p>
                    
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="outline" className="text-xs">Try This Reframe</Button>
                      <Button size="sm" variant="ghost" className="text-xs">See Alternative</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="emotions">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-therapy-primary/10 p-2">
                  <Heart className="h-5 w-5 text-therapy-primary" />
                </div>
                <div>
                  <CardTitle>Affective Computing Analysis</CardTitle>
                  <CardDescription>Advanced emotional intelligence insights from your interactions</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm">
                  Our AI analyzes your language patterns to detect emotional states and provide insights to help you 
                  build emotional intelligence. Below are the key findings from your recent interactions.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Activity className="h-4 w-4 text-therapy-primary" />
                        Emotional Range
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-24 mb-2 bg-muted/30 rounded-md flex items-center justify-center">
                        <p className="text-xs text-muted-foreground">Emotion spectrum visualization</p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        You express a wide range of emotions with a healthy balance between positive and negative states.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-therapy-primary" />
                        Emotional Triggers
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-xs space-y-2">
                        <li className="p-2 bg-red-50 rounded-sm">Work deadlines (anxiety)</li>
                        <li className="p-2 bg-blue-50 rounded-sm">Family conversations (mixed)</li>
                        <li className="p-2 bg-green-50 rounded-sm">Morning exercise (positive)</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Heart className="h-4 w-4 text-therapy-primary" />
                        Emotion Regulation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs">Self-awareness</span>
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-therapy-primary w-4/5"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs">Expression</span>
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-therapy-primary w-3/5"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs">Regulation</span>
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-therapy-primary w-2/5"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="text-sm font-medium mb-2">Personalized Emotional Intelligence Exercises</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="border p-3 rounded-md hover:border-therapy-primary transition-colors cursor-pointer">
                      <h4 className="text-xs font-medium">Anxiety Recognition Practice</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Early physical and mental anxiety cues identification exercise
                      </p>
                    </div>
                    <div className="border p-3 rounded-md hover:border-therapy-primary transition-colors cursor-pointer">
                      <h4 className="text-xs font-medium">Emotional Vocabulary Expansion</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Learn to precisely name and describe complex emotional states
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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
              
              <div className="p-4 mt-4 border rounded-md">
                <h3 className="text-sm font-medium mb-2">AI-Generated Weekly Analysis</h3>
                <p className="text-sm">
                  Your anxiety levels have decreased by 12% this week, potentially correlated with your increased outdoor activities. 
                  The data suggests continuing with daily walks and breathing exercises. Consider adding a consistent bedtime routine 
                  to further improve sleep quality, as this shows the strongest impact on your overall wellbeing.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Insights;
