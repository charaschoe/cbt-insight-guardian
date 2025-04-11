
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, MessageSquare, FileText, Lightbulb, Calendar, MessageCircle, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AISelfTherapyModeProps {
  className?: string;
}

const AISelfTherapyMode = ({ className }: AISelfTherapyModeProps) => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setIsSending(true);
    
    // Simulate AI response with a delay
    setTimeout(() => {
      toast({
        title: "AI Therapist Response",
        description: "I've received your message and I'm here to help. Let's explore strategies to manage these feelings together.",
      });
      setIsSending(false);
      setMessage("");
    }, 1500);
  };
  
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-therapy-primary/10 p-2">
            <Brain className="h-5 w-5 text-therapy-primary" />
          </div>
          <div>
            <CardTitle>AI Self-Therapy Mode</CardTitle>
            <CardDescription>Get guidance and support for mild to moderate mental health concerns</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="chat">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="chat">
              <MessageSquare className="h-4 w-4 mr-2" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="exercises">
              <Brain className="h-4 w-4 mr-2" />
              Exercises
            </TabsTrigger>
            <TabsTrigger value="journal">
              <FileText className="h-4 w-4 mr-2" />
              Journal
            </TabsTrigger>
            <TabsTrigger value="insights">
              <Lightbulb className="h-4 w-4 mr-2" />
              Insights
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="space-y-4">
            <div className="border rounded-lg p-4 bg-muted/30 h-48 overflow-y-auto space-y-4">
              <div className="flex gap-3">
                <div className="rounded-full bg-therapy-primary h-8 w-8 flex items-center justify-center text-white shrink-0">
                  AI
                </div>
                <div className="bg-white rounded-lg p-3 text-sm">
                  Hello! I'm your AI therapy assistant. I'm here to provide support and guidance for mild to moderate mental health concerns. How are you feeling today?
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Input
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} disabled={isSending || !message.trim()}>
                {isSending ? "Sending..." : "Send"}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="exercises" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 hover:border-therapy-primary cursor-pointer transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <div className="rounded-full bg-therapy-primary/10 p-2">
                    <Brain className="h-4 w-4 text-therapy-primary" />
                  </div>
                  <h3 className="font-medium">Thought Reframing</h3>
                </div>
                <p className="text-sm text-muted-foreground">Challenge negative thought patterns with guided cognitive restructuring.</p>
              </div>
              
              <div className="border rounded-lg p-4 hover:border-therapy-primary cursor-pointer transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <div className="rounded-full bg-therapy-primary/10 p-2">
                    <Calendar className="h-4 w-4 text-therapy-primary" />
                  </div>
                  <h3 className="font-medium">Mindfulness Meditation</h3>
                </div>
                <p className="text-sm text-muted-foreground">Guided mindfulness practices to reduce stress and improve focus.</p>
              </div>
              
              <div className="border rounded-lg p-4 hover:border-therapy-primary cursor-pointer transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <div className="rounded-full bg-therapy-primary/10 p-2">
                    <MessageCircle className="h-4 w-4 text-therapy-primary" />
                  </div>
                  <h3 className="font-medium">Positive Affirmations</h3>
                </div>
                <p className="text-sm text-muted-foreground">AI-generated personalized affirmations based on your needs.</p>
              </div>
              
              <div className="border rounded-lg p-4 hover:border-therapy-primary cursor-pointer transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <div className="rounded-full bg-therapy-primary/10 p-2">
                    <Lightbulb className="h-4 w-4 text-therapy-primary" />
                  </div>
                  <h3 className="font-medium">Behavioral Activation</h3>
                </div>
                <p className="text-sm text-muted-foreground">Plan and track mood-boosting activities tailored to your interests.</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="journal" className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">AI-Guided Journaling</h3>
              <Button variant="outline" size="sm">New Entry</Button>
            </div>
            
            <div className="space-y-3">
              <div className="border rounded-lg p-4 hover:border-therapy-primary cursor-pointer transition-colors">
                <h4 className="font-medium mb-1">Today's Reflection</h4>
                <p className="text-sm text-muted-foreground mb-2">The AI will analyze your entries to identify thought patterns and suggest cognitive techniques.</p>
                <div className="text-xs text-therapy-primary flex items-center justify-end gap-1 font-medium">
                  <span>Start journaling</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </div>
              
              <div className="border rounded-lg p-4 hover:border-therapy-primary cursor-pointer transition-colors">
                <h4 className="font-medium mb-1">Gratitude Practice</h4>
                <p className="text-sm text-muted-foreground mb-2">Record three things you're grateful for today with AI prompts to guide you.</p>
                <div className="text-xs text-therapy-primary flex items-center justify-end gap-1 font-medium">
                  <span>Start practice</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="insights" className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Your AI Therapy Insights</h3>
              <p className="text-sm text-muted-foreground mb-4">Based on your interactions, journal entries, and exercise completions, the AI has identified these patterns:</p>
              
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-therapy-light border border-therapy-muted">
                  <h4 className="text-sm font-medium mb-1">Sleep Impact</h4>
                  <p className="text-sm text-muted-foreground">Your mood tends to be lower on days following less than 7 hours of sleep.</p>
                </div>
                
                <div className="p-3 rounded-lg bg-therapy-light border border-therapy-muted">
                  <h4 className="text-sm font-medium mb-1">Thought Pattern</h4>
                  <p className="text-sm text-muted-foreground">You show a tendency toward "catastrophizing" when facing work challenges.</p>
                </div>
                
                <div className="p-3 rounded-lg bg-therapy-light border border-therapy-muted">
                  <h4 className="text-sm font-medium mb-1">Progress Highlight</h4>
                  <p className="text-sm text-muted-foreground">You've reduced negative self-talk by 18% over the past two weeks.</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 border-t pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">AI Therapy Mode</p>
              <p className="text-xs text-muted-foreground">
                Self-guided therapy with AI assistance for mild to moderate concerns
              </p>
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              <MessageCircle className="h-4 w-4" />
              Get Human Support
            </Button>
          </div>
          
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800">
              <strong>Important:</strong> AI Self-Therapy is designed for mild to moderate concerns. Please seek professional help for severe symptoms, crisis situations, or if you experience thoughts of self-harm.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AISelfTherapyMode;
