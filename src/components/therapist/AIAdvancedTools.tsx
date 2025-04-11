
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, FileText, LineChart, AlertTriangle, MessageSquare, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const AIAdvancedTools = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-therapy-primary" />
            Advanced AI Capabilities
          </CardTitle>
          <CardDescription>
            Leverage advanced AI technologies to enhance your therapeutic practice
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="analysis">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="analysis">Session Analysis</TabsTrigger>
              <TabsTrigger value="patterns">Pattern Detection</TabsTrigger>
              <TabsTrigger value="treatment">Treatment Planning</TabsTrigger>
              <TabsTrigger value="research">Research Assistant</TabsTrigger>
            </TabsList>
            
            <TabsContent value="analysis" className="space-y-4">
              <div className="space-y-3">
                <div className="border p-4 rounded-md">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium">Session Notes Analyzer</h3>
                      <p className="text-sm text-muted-foreground">Extract key insights from therapy session transcripts</p>
                    </div>
                    <Badge variant="outline" className="bg-therapy-light">Contextually-Aware AI</Badge>
                  </div>
                  <p className="text-sm mb-3">
                    Our AI can process session recordings or your notes to identify key therapeutic moments, 
                    track progress against treatment goals, and suggest relevant CBT techniques for follow-up sessions.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button size="sm" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Analyze Recent Session
                    </Button>
                    <Button size="sm" variant="outline">
                      <Activity className="h-4 w-4 mr-2" />
                      View Analysis Examples
                    </Button>
                  </div>
                </div>
                
                <div className="border p-4 rounded-md">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium">Socratic Dialogue Assistant</h3>
                      <p className="text-sm text-muted-foreground">AI-powered Socratic questioning suggestions</p>
                    </div>
                    <Badge variant="outline" className="bg-therapy-light">Real-time Assistance</Badge>
                  </div>
                  <p className="text-sm mb-3">
                    During live sessions, receive AI-suggested follow-up questions based on client responses. 
                    Helps with guided discovery and cognitive restructuring without leading the client.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button size="sm" variant="outline">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Activate for Next Session
                    </Button>
                    <Button size="sm" variant="outline">
                      <Brain className="h-4 w-4 mr-2" />
                      Customize Questioning Style
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="patterns" className="space-y-4">
              <div className="space-y-3">
                <div className="border p-4 rounded-md">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium">Cognitive Distortion Detector</h3>
                      <p className="text-sm text-muted-foreground">Identify thought patterns across patient interactions</p>
                    </div>
                    <Badge variant="outline" className="bg-therapy-light">Pattern Recognition</Badge>
                  </div>
                  <p className="text-sm mb-3">
                    The AI analyzes patient journal entries, chat messages, and session notes to identify recurring 
                    cognitive distortions and thought patterns, categorizing them based on CBT frameworks.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button size="sm" variant="outline">
                      <Activity className="h-4 w-4 mr-2" />
                      View Patient Patterns
                    </Button>
                    <Button size="sm" variant="outline">
                      <LineChart className="h-4 w-4 mr-2" />
                      Generate Pattern Report
                    </Button>
                  </div>
                </div>
                
                <div className="border p-4 rounded-md">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium">Affective Computing Analysis</h3>
                      <p className="text-sm text-muted-foreground">Emotion detection through text and optional voice</p>
                    </div>
                    <Badge variant="outline" className="bg-therapy-light">Multimodal AI</Badge>
                  </div>
                  <p className="text-sm mb-3">
                    Detect emotional patterns and intensity through linguistic analysis of patient communications.
                    Helps identify emotional triggers and track emotional regulation progress over time.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button size="sm" variant="outline">
                      <Brain className="h-4 w-4 mr-2" />
                      Analyze Patient Communications
                    </Button>
                    <Button size="sm" variant="outline">
                      <LineChart className="h-4 w-4 mr-2" />
                      View Emotional Trends
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="treatment" className="space-y-4">
              <div className="space-y-3">
                <div className="border p-4 rounded-md">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium">Treatment Plan Generator</h3>
                      <p className="text-sm text-muted-foreground">AI-assisted therapy planning tailored to patient needs</p>
                    </div>
                    <Badge variant="outline" className="bg-therapy-light">Evidence-Based</Badge>
                  </div>
                  <p className="text-sm mb-3">
                    Generate personalized treatment plans based on patient assessment data, progress history, 
                    and evidence-based protocols. Includes session structure suggestions and homework exercises.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button size="sm" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate New Plan
                    </Button>
                    <Button size="sm" variant="outline">
                      <Activity className="h-4 w-4 mr-2" />
                      Modify Existing Plan
                    </Button>
                  </div>
                </div>
                
                <div className="border p-4 rounded-md">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium">Progress Prediction Model</h3>
                      <p className="text-sm text-muted-foreground">Predictive analytics for treatment outcomes</p>
                    </div>
                    <Badge variant="outline" className="bg-therapy-light">Predictive AI</Badge>
                  </div>
                  <p className="text-sm mb-3">
                    Based on similar case histories and current progress metrics, this tool estimates likely 
                    treatment outcomes and suggests adjustments to improve effectiveness.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button size="sm" variant="outline">
                      <LineChart className="h-4 w-4 mr-2" />
                      View Outcome Predictions
                    </Button>
                    <Button size="sm" variant="outline">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Identify At-Risk Patients
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="research" className="space-y-4">
              <div className="space-y-3">
                <div className="border p-4 rounded-md">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium">Clinical Research Assistant</h3>
                      <p className="text-sm text-muted-foreground">Evidence-based knowledge at your fingertips</p>
                    </div>
                    <Badge variant="outline" className="bg-therapy-light">Research-Backed</Badge>
                  </div>
                  <p className="text-sm mb-3">
                    Search and summarize recent research relevant to specific patient conditions or treatment approaches.
                    Provides evidence-based recommendations from peer-reviewed literature.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button size="sm" variant="outline">
                      <Brain className="h-4 w-4 mr-2" />
                      Research a Condition
                    </Button>
                    <Button size="sm" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      View Recent Evidence
                    </Button>
                  </div>
                </div>
                
                <div className="border p-4 rounded-md">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium">Intervention Effectiveness Explorer</h3>
                      <p className="text-sm text-muted-foreground">Compare treatment approaches based on outcomes</p>
                    </div>
                    <Badge variant="outline" className="bg-therapy-light">Comparative Analysis</Badge>
                  </div>
                  <p className="text-sm mb-3">
                    Compare the effectiveness of different CBT techniques and approaches based on anonymized aggregate
                    data from similar cases and published research.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button size="sm" variant="outline">
                      <Activity className="h-4 w-4 mr-2" />
                      Compare Approaches
                    </Button>
                    <Button size="sm" variant="outline">
                      <LineChart className="h-4 w-4 mr-2" />
                      View Effectiveness Data
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-xs text-yellow-800">
          <strong>Important Note:</strong> These AI tools are designed to assist therapists, not replace clinical judgment. 
          All AI-generated suggestions should be reviewed before implementation with patients.
        </p>
      </div>
    </div>
  );
};

export default AIAdvancedTools;
