
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Brain, BookOpen, MessageSquare, FileSpreadsheet } from "lucide-react";

export const AIInsightTools = () => {
  const [sessionNotes, setSessionNotes] = useState("");
  const [patientJournal, setPatientJournal] = useState("");
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">AI-Powered CBT Tools</h2>
      <p className="text-muted-foreground">Leverage AI to enhance your therapeutic practice</p>
      
      <Tabs defaultValue="session" className="space-y-4">
        <TabsList>
          <TabsTrigger value="session">Session Assistant</TabsTrigger>
          <TabsTrigger value="analysis">Journal Analysis</TabsTrigger>
          <TabsTrigger value="patterns">Pattern Detection</TabsTrigger>
          <TabsTrigger value="treatment">Treatment Planning</TabsTrigger>
        </TabsList>
        
        <TabsContent value="session" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Session Notes Assistant</CardTitle>
              <CardDescription>
                Get AI assistance to analyze session notes and extract insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Textarea 
                    placeholder="Enter or paste your session notes here..."
                    className="min-h-[200px]"
                    value={sessionNotes}
                    onChange={(e) => setSessionNotes(e.target.value)}
                  />
                </div>
                <div className="flex space-x-2">
                  <Select defaultValue="summary">
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Analysis Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="summary">Generate Summary</SelectItem>
                      <SelectItem value="thoughts">Identify Thought Patterns</SelectItem>
                      <SelectItem value="behaviors">Extract Behavioral Patterns</SelectItem>
                      <SelectItem value="homework">Suggest Homework</SelectItem>
                      <SelectItem value="progress">Assess Progress</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="flex-1">
                    <Brain className="mr-2 h-4 w-4" />
                    Generate Insights
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <h3 className="font-medium mb-2">Example Results</h3>
              <Card className="w-full p-4 border bg-muted/50">
                <p className="text-sm mb-3">
                  <span className="font-semibold">Summary:</span> Patient discussed work-related anxiety, focusing on upcoming presentation. Reported difficulty sleeping and increased heart rate when thinking about the event.
                </p>
                <p className="text-sm mb-3">
                  <span className="font-semibold">Thought Patterns:</span> Catastrophizing about presentation outcome ("everyone will laugh"), mind-reading ("my boss thinks I'm incompetent"), all-or-nothing thinking ("if I make one mistake, I'm a failure").
                </p>
                <p className="text-sm mb-3">
                  <span className="font-semibold">Behavioral Patterns:</span> Procrastination on presentation prep, avoiding team meetings, increased caffeine consumption to counter sleep issues.
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Homework Suggestions:</span> Thought record targeting catastrophic predictions, progressive muscle relaxation before bed, practice presentation with trusted colleague for feedback.
                </p>
              </Card>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Journal Analysis</CardTitle>
              <CardDescription>
                Analyze patient journals to identify patterns and insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Select defaultValue="upload">
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Journal Source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upload">Upload Journal Text</SelectItem>
                      <SelectItem value="api">Connect to Patient App</SelectItem>
                      <SelectItem value="paste">Paste Journal Text</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex-1">
                    <Select defaultValue="julia">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Patient" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="anna">Anna Schmidt</SelectItem>
                        <SelectItem value="thomas">Thomas Becker</SelectItem>
                        <SelectItem value="maria">Maria Wagner</SelectItem>
                        <SelectItem value="julia">Julia Fischer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Textarea 
                  placeholder="Paste journal content here or select upload option above..."
                  className="min-h-[200px]"
                  value={patientJournal}
                  onChange={(e) => setPatientJournal(e.target.value)}
                />
                
                <Button className="w-full">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Analyze Journal Content
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <h3 className="font-medium mb-2">AI Analysis Example</h3>
              <Card className="w-full p-4 border bg-muted/50">
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold">Mood Tracking</h4>
                    <p className="text-sm">Detected mood fluctuations correlating with work events. Weekend entries show improved mood (avg +28%), while weekday morning entries show heightened anxiety.</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Cognitive Patterns</h4>
                    <p className="text-sm">Consistent catastrophizing around social interactions. Self-criticism most prominent in evening entries.</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Behavioral Insights</h4>
                    <p className="text-sm">Positive correlation between reported exercise and mood improvements. Sleep disruptions appear linked to evening screen time.</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Treatment Opportunities</h4>
                    <p className="text-sm">Consider focusing on cognitive restructuring for work-related thoughts. Journal shows openness to breathing exercises but resistance to social exposure tasks.</p>
                  </div>
                </div>
              </Card>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="patterns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Pattern Detection</CardTitle>
              <CardDescription>
                Use AI to detect complex cognitive and behavioral patterns across data sources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h3 className="font-medium">Data Sources to Analyze</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="sessionNotes" className="rounded" defaultChecked />
                      <label htmlFor="sessionNotes" className="text-sm">Session Notes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="journalEntries" className="rounded" defaultChecked />
                      <label htmlFor="journalEntries" className="text-sm">Journal Entries</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="moodTracking" className="rounded" defaultChecked />
                      <label htmlFor="moodTracking" className="text-sm">Mood Tracking Data</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="appUsage" className="rounded" />
                      <label htmlFor="appUsage" className="text-sm">App Usage Patterns</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="assignments" className="rounded" />
                      <label htmlFor="assignments" className="text-sm">Homework Assignments</label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium">Pattern Detection Focus</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="cognitive" className="rounded" defaultChecked />
                      <label htmlFor="cognitive" className="text-sm">Cognitive Distortions</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="behavioral" className="rounded" defaultChecked />
                      <label htmlFor="behavioral" className="text-sm">Behavioral Patterns</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="emotional" className="rounded" defaultChecked />
                      <label htmlFor="emotional" className="text-sm">Emotional Triggers</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="resistance" className="rounded" />
                      <label htmlFor="resistance" className="text-sm">Treatment Resistance</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="progress" className="rounded" />
                      <label htmlFor="progress" className="text-sm">Progress Indicators</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <Select defaultValue="julia">
                  <SelectTrigger>
                    <SelectValue placeholder="Select Patient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="anna">Anna Schmidt</SelectItem>
                    <SelectItem value="thomas">Thomas Becker</SelectItem>
                    <SelectItem value="maria">Maria Wagner</SelectItem>
                    <SelectItem value="julia">Julia Fischer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mt-4">
                <Button className="w-full">
                  <Brain className="mr-2 h-4 w-4" />
                  Run Advanced Pattern Analysis
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Card className="w-full p-4 border bg-muted/50">
                <h3 className="font-medium mb-2">Example AI Insights</h3>
                <p className="text-sm mb-3">
                  The AI pattern detection system has identified several key insights for patient Julia Fischer:
                </p>
                <ul className="list-disc pl-5 text-sm space-y-2">
                  <li>Consistent correlation between social media usage (evenings) and increased anxiety reporting the following morning</li>
                  <li>Patient's journaling language shows 34% reduction in negative self-talk when therapy focuses on work-life boundaries</li>
                  <li>Weather patterns appear to influence mood reports (22% more negative on cloudy days)</li>
                  <li>Cognitive restructuring exercises show highest completion rates on Tuesday and Wednesday</li>
                  <li>Patient demonstrates increased openness to challenging thoughts after mindfulness practice</li>
                </ul>
              </Card>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="treatment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Treatment Planning Assistant</CardTitle>
              <CardDescription>
                Generate personalized treatment plans based on patient data and evidence-based approaches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Patient</label>
                    <Select defaultValue="maria">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Patient" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="anna">Anna Schmidt</SelectItem>
                        <SelectItem value="thomas">Thomas Becker</SelectItem>
                        <SelectItem value="maria">Maria Wagner</SelectItem>
                        <SelectItem value="julia">Julia Fischer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Primary Diagnosis</label>
                    <Select defaultValue="depression">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Diagnosis" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gad">Generalized Anxiety</SelectItem>
                        <SelectItem value="depression">Major Depression</SelectItem>
                        <SelectItem value="social">Social Anxiety</SelectItem>
                        <SelectItem value="ptsd">PTSD</SelectItem>
                        <SelectItem value="ocd">OCD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Treatment Duration</label>
                  <Select defaultValue="12">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">6 weeks</SelectItem>
                      <SelectItem value="8">8 weeks</SelectItem>
                      <SelectItem value="12">12 weeks</SelectItem>
                      <SelectItem value="16">16 weeks</SelectItem>
                      <SelectItem value="24">24 weeks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Additional Notes (Optional)</label>
                  <Textarea placeholder="Enter any specific considerations or goals..." />
                </div>
                
                <Button className="w-full">
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Generate Treatment Plan
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <h3 className="font-medium mb-2">Sample AI-Generated Treatment Plan</h3>
              <Card className="w-full p-4 border bg-muted/50">
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold">Phase 1: Weeks 1-4 (Stabilization)</h4>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Daily mood tracking with contextual journaling</li>
                      <li>Psychoeducation on depression and CBT model</li>
                      <li>Introduction to thought records focusing on situations triggering hopelessness</li>
                      <li>Behavioral activation starting with low-effort pleasant activities</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold">Phase 2: Weeks 5-8 (Core CBT Work)</h4>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Advanced thought challenging focusing on all-or-nothing patterns</li>
                      <li>Graded exposure to social activities (based on hierarchy)</li>
                      <li>Behavioral experiments to test negative predictions</li>
                      <li>Sleep hygiene protocol implementation</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold">Phase 3: Weeks 9-12 (Consolidation)</h4>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Development of personalized cognitive restructuring scripts</li>
                      <li>Relapse prevention planning and identification of early warning signs</li>
                      <li>Practice with challenging situations in multiple contexts</li>
                      <li>Building maintenance plan including booster sessions</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold">Digital Support Recommendations</h4>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Daily mood check-ins with contextual prompts</li>
                      <li>Twice-weekly cognitive restructuring exercises</li>
                      <li>Behavioral activation reminders and tracking</li>
                      <li>Weekly progress visualization and reinforcement</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
