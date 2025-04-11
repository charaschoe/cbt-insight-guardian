
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, MessageSquare, FileText, Lightbulb, Calendar, MessageCircle, ArrowRight, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface AISelfTherapyModeProps {
  className?: string;
}

const AISelfTherapyMode = ({ className }: AISelfTherapyModeProps) => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { role: "ai", content: "Hello! I'm your AI therapy assistant. I'm here to provide support and guidance for mild to moderate mental health concerns. How are you feeling today?" }
  ]);
  const { toast } = useToast();
  
  // Simulated Socratic responses based on common inputs
  const socraticResponses = {
    anxiety: [
      "What aspects of this situation are causing you the most concern?",
      "When you notice these anxious thoughts, what typically happens next?",
      "How would you rate the likelihood of your fear actually happening?",
      "What evidence do you have that supports or contradicts this worry?"
    ],
    depression: [
      "What activities used to bring you joy that you're not doing currently?",
      "How would you describe the thoughts that come up when you're feeling low?",
      "Is there a pattern to when these feelings are strongest or weakest?",
      "What small step might feel manageable for you right now?"
    ],
    work: [
      "What aspects of your work situation feel most challenging?",
      "How does this work situation compare to previous experiences?",
      "What would an ideal outcome look like for you?",
      "What resources or support might help in this situation?"
    ],
    relationships: [
      "How do you think the other person might view this situation?",
      "What patterns do you notice in how this relationship functions?",
      "What needs of yours aren't being met in this interaction?",
      "How have you handled similar situations in the past?"
    ],
    general: [
      "Could you tell me more about that?",
      "How does that make you feel?",
      "What thoughts come up for you when that happens?",
      "What would be helpful for you right now?"
    ]
  };
  
  const getAIResponse = (userMessage: string) => {
    // Simple keyword matching for demo purposes
    const lowercaseMessage = userMessage.toLowerCase();
    let responseCategory = "general";
    
    if (lowercaseMessage.includes("anxious") || lowercaseMessage.includes("worry") || lowercaseMessage.includes("stress")) {
      responseCategory = "anxiety";
    } else if (lowercaseMessage.includes("sad") || lowercaseMessage.includes("depress") || lowercaseMessage.includes("low")) {
      responseCategory = "depression";
    } else if (lowercaseMessage.includes("work") || lowercaseMessage.includes("job") || lowercaseMessage.includes("career")) {
      responseCategory = "work";
    } else if (lowercaseMessage.includes("relationship") || lowercaseMessage.includes("partner") || lowercaseMessage.includes("friend")) {
      responseCategory = "relationships";
    }
    
    const responses = socraticResponses[responseCategory as keyof typeof socraticResponses];
    return responses[Math.floor(Math.random() * responses.length)];
  };
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message to chat
    const userMessage = message.trim();
    setChatHistory(prev => [...prev, { role: "user", content: userMessage }]);
    setMessage("");
    setIsSending(true);
    
    // Simulate AI response with a delay
    setTimeout(() => {
      const aiResponse = getAIResponse(userMessage);
      setChatHistory(prev => [...prev, { role: "ai", content: aiResponse }]);
      setIsSending(false);
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
            <div className="border rounded-lg p-4 bg-muted/30 h-72 overflow-y-auto space-y-4">
              {chatHistory.map((msg, index) => (
                <div key={index} className="flex gap-3">
                  <div className={`rounded-full h-8 w-8 flex items-center justify-center text-white shrink-0 ${
                    msg.role === "ai" ? "bg-therapy-primary" : "bg-gray-500"
                  }`}>
                    {msg.role === "ai" ? "AI" : "You"}
                  </div>
                  <div className="bg-white rounded-lg p-3 text-sm">
                    {msg.content}
                  </div>
                </div>
              ))}
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

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="socratic">
                <AccordionTrigger className="text-sm">
                  <span className="flex items-center">
                    <Brain className="h-4 w-4 mr-2 text-therapy-primary" />
                    About Socratic Dialogue
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="text-xs text-muted-foreground space-y-2">
                    <p>
                      Our AI uses Socratic questioning to help you explore your thoughts without rushing to conclusions 
                      or diagnoses. This method encourages self-discovery through reflective questions.
                    </p>
                    <p>
                      The AI will ask open-ended questions to help you:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Examine your thought patterns</li>
                      <li>Consider alternative perspectives</li>
                      <li>Identify cognitive distortions</li>
                      <li>Develop your own insights</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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
            <Button variant="outline" size="sm" className="gap-1" asChild>
              <div className="flex items-center gap-1">
                <Settings className="h-4 w-4" />
                <span>Customize</span>
              </div>
            </Button>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <Button variant="outline" size="sm" className="gap-1">
              <Brain className="h-4 w-4" />
              Change AI Approach
            </Button>
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
