import { useState, useRef, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send, 
  Mic, 
  MicOff, 
  MessageCircle, 
  Volume, 
  VolumeX, 
  Brain,
  AlertCircle,
  Lightbulb,
  CheckCircle,
  XCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAIMode } from "@/hooks/use-ai-mode";
import { useNavigate, useLocation } from "react-router-dom";
import SOSButton from "@/components/SOSButton";

type Message = {
  id: string;
  content: string;
  sender: "user" | "ai" | "therapist";
  timestamp: Date;
  isEscalated?: boolean;
};

type ThoughtProcess = {
  id: string;
  type: "observation" | "analysis" | "conclusion" | "question";
  content: string;
};

type ChatMode = "text" | "voice";

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello, I'm your AI therapy assistant. How are you feeling today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  
  const [newMessage, setNewMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [thoughtRating, setThoughtRating] = useState<string | null>(null);
  const [showThoughtPrompt, setShowThoughtPrompt] = useState(false);
  const [chatMode, setChatMode] = useState<ChatMode>("voice");
  const [aiThinking, setAiThinking] = useState(false);
  const [showThoughtProcess, setShowThoughtProcess] = useState(true);
  const [thoughtProcessSteps, setThoughtProcessSteps] = useState<ThoughtProcess[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { therapyMode } = useAIMode();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const isEmergency = searchParams.get('emergency') === 'true';
    
    if (isEmergency) {
      navigate('/emergency');
    }
  }, [location, navigate]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, thoughtProcessSteps]);

  const cbtQuestions = {
    anxiety: [
      "What are you feeling anxious about specifically?",
      "On a scale of 1-10, how likely do you think this worry will actually happen?",
      "What's the worst that could happen? How would you cope if it did?",
      "What evidence do you have that supports your worry? Is there evidence that contradicts it?",
    ],
    depression: [
      "What activities used to bring you joy that you're not doing currently?",
      "Have you noticed any patterns in when you feel most down?",
      "What thoughts come to mind when you're feeling this way?",
      "How would you respond if a friend shared these same feelings with you?",
    ],
    stress: [
      "What specifically is causing you to feel stressed right now?",
      "How is this stress affecting your daily life and physical well-being?",
      "What coping strategies have worked for you in the past?",
      "What aspects of this situation are within your control, and what aren't?",
    ],
    relationships: [
      "How does this relationship situation make you feel?",
      "What expectations do you have in this relationship? Are they realistic?",
      "How might the other person's perspective differ from yours?",
      "What patterns have you noticed in how you respond in relationships?",
    ],
    work: [
      "What aspects of your work situation feel most challenging?",
      "How does this compare to past experiences you've successfully navigated?",
      "What thoughts arise when you consider your work situation?",
      "What boundaries might you need to establish or maintain?",
    ],
    general: [
      "Could you tell me more about what you're experiencing?",
      "How long have you been feeling this way?",
      "What thoughts come up when you feel this way?",
      "Have you noticed any patterns or triggers for these feelings?",
    ],
  };

  const shouldEscalateToTherapist = (message: string): boolean => {
    const emergencyKeywords = [
      "suicide", "kill myself", "end my life", "harm myself", 
      "self-harm", "die", "emergency", "crisis", "immediate help",
      "can't take it anymore", "give up", "no reason to live"
    ];
    
    return emergencyKeywords.some(keyword => 
      message.toLowerCase().includes(keyword)
    );
  };

  const determineCategory = (message: string): keyof typeof cbtQuestions => {
    const lowercaseMsg = message.toLowerCase();
    
    if (lowercaseMsg.includes("anxious") || lowercaseMsg.includes("worry") || lowercaseMsg.includes("fear") || lowercaseMsg.includes("panic")) {
      return "anxiety";
    } else if (lowercaseMsg.includes("sad") || lowercaseMsg.includes("depress") || lowercaseMsg.includes("down") || lowercaseMsg.includes("hopeless")) {
      return "depression";
    } else if (lowercaseMsg.includes("stress") || lowercaseMsg.includes("overwhelm") || lowercaseMsg.includes("pressure")) {
      return "stress";
    } else if (lowercaseMsg.includes("relationship") || lowercaseMsg.includes("partner") || lowercaseMsg.includes("friend") || lowercaseMsg.includes("family")) {
      return "relationships";
    } else if (lowercaseMsg.includes("work") || lowercaseMsg.includes("job") || lowercaseMsg.includes("career") || lowercaseMsg.includes("boss")) {
      return "work";
    }
    
    return "general";
  };

  const generateThoughtProcess = (userMessage: string): ThoughtProcess[] => {
    const category = determineCategory(userMessage);
    const thoughts: ThoughtProcess[] = [];
    
    thoughts.push({
      id: Date.now().toString(),
      type: "observation",
      content: `User message mentions keywords related to ${category}. Tone suggests ${
        category === "anxiety" ? "heightened worry" : 
        category === "depression" ? "low mood" :
        category === "stress" ? "feeling overwhelmed" :
        category === "relationships" ? "attribution errors or communication patterns" :
        category === "work" ? "performance anxiety or imposter syndrome" : "unclear thought patterns"
      }.`
    });
    
    thoughts.push({
      id: (Date.now() + 1).toString(),
      type: "analysis",
      content: `Based on CBT frameworks, this appears to be a potential case of ${
        category === "anxiety" ? "catastrophic thinking and future-focused worry" : 
        category === "depression" ? "negative self-perception and past-focused rumination" :
        category === "stress" ? "perception of inadequate coping resources" :
        category === "relationships" ? "attribution errors or communication patterns" :
        category === "work" ? "performance anxiety or imposter syndrome" : "unclear thought patterns"
      }. Checking for cognitive distortions...`
    });
    
    const techniques = {
      anxiety: ["thought challenging", "decatastrophizing", "grounding techniques"],
      depression: ["behavioral activation", "thought records", "gratitude practice"],
      stress: ["problem-solving matrix", "stress inventory", "mindfulness"],
      relationships: ["perspective-taking", "communication skills", "boundary setting"],
      work: ["task breakdown", "success journaling", "identity affirmation"],
      general: ["mindful awareness", "cognitive restructuring", "behavioral experiments"]
    };
    
    thoughts.push({
      id: (Date.now() + 2).toString(),
      type: "conclusion",
      content: `Recommended approach: ${techniques[category].join(", ")}. Will ask probing questions to help user identify thought patterns before suggesting specific techniques.`
    });
    
    thoughts.push({
      id: (Date.now() + 3).toString(),
      type: "question",
      content: `Selecting appropriate Socratic question from CBT framework to explore ${category}-related thoughts without reinforcing cognitive distortions.`
    });
    
    return thoughts;
  };

  const generateAIResponse = (userMessage: string): string => {
    const category = determineCategory(userMessage);
    const questions = cbtQuestions[category];
    
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    
    if (messages.length % 3 === 0 && !showThoughtPrompt) {
      setShowThoughtPrompt(true);
      return "Before we continue, I'd like to understand how you're evaluating this situation. On a scale of 1-5, how realistic do you think your thoughts about this situation are?";
    }
    
    if (messages.length % 5 === 0) {
      switch(category) {
        case "anxiety":
          return `${randomQuestion}\n\nHave you tried the 5-4-3-2-1 grounding technique? Focus on 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.`;
        case "depression":
          return `${randomQuestion}\n\nSometimes scheduling one small pleasurable activity each day can help break negative patterns. What's one small thing you might enjoy doing tomorrow?`;
        case "stress":
          return `${randomQuestion}\n\nHave you tried deep breathing? Inhale slowly for 4 counts, hold for 2, and exhale for 6. This can help activate your parasympathetic nervous system.`;
        default:
          return randomQuestion;
      }
    }
    
    return randomQuestion;
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const userMessageObj: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessageObj]);
    setNewMessage("");
    setAiThinking(true);
    setShowThoughtPrompt(false);
    
    setTimeout(() => {
      const thoughts = generateThoughtProcess(userMessage);
      setThoughtProcessSteps(thoughts);
    }, 500);
    
    const needsEscalation = shouldEscalateToTherapist(newMessage);
    const userMessage = newMessage;
    
    setTimeout(() => {
      setAiThinking(false);
      
      if (needsEscalation) {
        const escalationMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: "I'm concerned about what you've shared. I'm connecting you with a human therapist for immediate support. They'll be with you momentarily.",
          sender: "ai",
          timestamp: new Date(),
          isEscalated: true
        };
        
        setMessages(prev => [...prev, escalationMessage]);
        
        setTimeout(() => {
          toast({
            title: "Emergency Protocol Activated",
            description: "Redirecting you to our emergency support system",
            variant: "destructive",
          });
          
          setTimeout(() => {
            navigate('/emergency');
          }, 1500);
        }, 2000);
      } else {
        const aiResponse = generateAIResponse(userMessage);
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: aiResponse,
          sender: "ai",
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, aiMessage]);
        setThoughtProcessSteps([]);
        
        if (chatMode === "voice" && !isSpeaking) {
          speakMessage(aiResponse);
        }
      }
    }, 3000);
  };

  const handleToggleMic = () => {
    if (!isRecording) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
          setIsRecording(true);
          toast({
            title: "Voice recording started",
            description: "I'm listening... Speak clearly and I'll respond when you're done.",
          });
          
          setTimeout(() => {
            setIsRecording(false);
            const simulatedTranscript = "I've been feeling anxious about an upcoming presentation at work.";
            setNewMessage(simulatedTranscript);
            
            setTimeout(() => {
              handleSendMessage();
            }, 500);
          }, 4000);
        })
        .catch(error => {
          toast({
            title: "Microphone access denied",
            description: "Please enable microphone access to use voice chat",
            variant: "destructive",
          });
          console.error("Error accessing microphone:", error);
        });
    } else {
      setIsRecording(false);
      toast({
        title: "Voice recording stopped",
        description: "Processing what you said...",
      });
    }
  };

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    } else {
      toast({
        title: "Text-to-speech not supported",
        description: "Your browser doesn't support speech synthesis",
        variant: "destructive",
      });
    }
  };

  const handleToggleSpeech = () => {
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const lastAiMessage = [...messages].reverse().find(msg => msg.sender === "ai");
      if (lastAiMessage) {
        speakMessage(lastAiMessage.content);
      }
    }
  };

  const handleThoughtRatingSubmit = () => {
    if (!thoughtRating) return;
    
    const ratingMessage: Message = {
      id: Date.now().toString(),
      content: `I rated my thought as ${thoughtRating}/5 in terms of how realistic it is.`,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, ratingMessage]);
    setThoughtRating(null);
    setShowThoughtPrompt(false);
    setAiThinking(true);
    
    setTimeout(() => {
      setAiThinking(false);
      const rating = parseInt(thoughtRating);
      let aiResponse = "";
      
      if (rating <= 2) {
        aiResponse = "It sounds like you recognize these thoughts might not fully reflect reality. That's a great insight! What evidence do you have that might contradict these thoughts?";
      } else if (rating <= 4) {
        aiResponse = "You seem somewhat convinced by these thoughts. Let's explore them further. What evidence supports these thoughts, and is there any evidence that doesn't fit with them?";
      } else {
        aiResponse = "You feel these thoughts are very realistic. That can make situations feel overwhelming. If we examine them more closely, are there any aspects that might be influenced by how you're feeling right now?";
      }
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      if (chatMode === "voice" && !isSpeaking) {
        speakMessage(aiResponse);
      }
    }, 1500);
  };

  const toggleThoughtProcess = () => {
    setShowThoughtProcess(prev => !prev);
  };

  return (
    <MainLayout>
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">AI Therapy Chat</h1>
            <p className="text-muted-foreground">Using advanced CBT techniques with voice interaction</p>
          </div>
          <div className="flex items-center gap-2">
            <SOSButton />
            <Button 
              variant="outline" 
              size="sm" 
              className={`gap-1 ${chatMode === 'text' ? 'bg-therapy-primary text-white' : ''}`}
              onClick={() => setChatMode('text')}
            >
              <MessageCircle className="h-4 w-4" />
              Text
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className={`gap-1 ${chatMode === 'voice' ? 'bg-therapy-primary text-white' : ''}`}
              onClick={() => setChatMode('voice')}
            >
              <Mic className="h-4 w-4" />
              Voice
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={toggleThoughtProcess}
            >
              <Brain className="h-4 w-4" />
              {showThoughtProcess ? "Hide Reasoning" : "Show Reasoning"}
            </Button>
          </div>
        </div>
        
        <div className="mt-2">
          <Badge className="bg-therapy-primary">
            {therapyMode === 'standard' && 'Standard Mode'}
            {therapyMode === 'clinical' && 'Clinical Mode'}
            {therapyMode === 'corporate' && 'Workplace Mode'}
            {therapyMode === 'relaxation' && 'Relaxation Mode'}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="flex flex-col h-[calc(100vh-220px)]">
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <div className={`relative rounded-full h-12 w-12 flex items-center justify-center ${isRecording || isSpeaking || aiThinking ? 'bg-therapy-primary' : 'bg-muted'} transition-colors duration-300`}>
                <Brain className={`h-6 w-6 ${isRecording || isSpeaking || aiThinking ? 'text-white' : 'text-therapy-primary'}`} />
                {(isRecording || isSpeaking || aiThinking) && (
                  <div className="absolute inset-0 rounded-full border-2 border-therapy-primary animate-pulse" />
                )}
              </div>
              <div>
                <h3 className="font-medium">AI Therapy Assistant</h3>
                <p className="text-xs text-muted-foreground">
                  {isRecording ? 'Listening...' : isSpeaking ? 'Speaking...' : aiThinking ? 'Thinking...' : 'Ready'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-1 overflow-hidden">
            <ScrollArea className={`p-4 ${showThoughtProcess && thoughtProcessSteps.length > 0 ? 'w-2/3' : 'w-full'}`}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender !== 'user' && (
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center mr-2">
                        {message.sender === 'ai' ? (
                          <Brain className="h-4 w-4 text-therapy-primary" />
                        ) : (
                          <div className="bg-green-600 text-white rounded-full h-full w-full flex items-center justify-center text-xs font-semibold">
                            DR
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div 
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'user' 
                          ? 'bg-therapy-primary text-white' 
                          : message.sender === 'therapist'
                            ? 'bg-green-100 border border-green-300'
                            : message.isEscalated
                              ? 'bg-yellow-50 border border-yellow-300'
                              : 'bg-muted'
                      }`}
                    >
                      {message.isEscalated && (
                        <div className="flex items-center gap-1 mb-2 text-yellow-700">
                          <AlertCircle className="h-4 w-4" />
                          <span className="text-xs font-semibold">Escalating to human therapist</span>
                        </div>
                      )}
                      
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    
                    {message.sender === 'user' && (
                      <div className="h-8 w-8 rounded-full bg-therapy-primary flex items-center justify-center ml-2">
                        <span className="text-white text-xs">You</span>
                      </div>
                    )}
                  </div>
                ))}
                
                {aiThinking && (
                  <div className="flex justify-start">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center mr-2">
                      <Brain className="h-4 w-4 text-therapy-primary" />
                    </div>
                    <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 bg-therapy-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="h-2 w-2 bg-therapy-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="h-2 w-2 bg-therapy-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                {showThoughtPrompt && !aiThinking && (
                  <div className="bg-therapy-light border border-therapy-muted rounded-lg p-4 my-4">
                    <h4 className="font-medium text-sm mb-2">Rate how realistic you believe your thoughts are:</h4>
                    <RadioGroup value={thoughtRating || ""} onValueChange={setThoughtRating} className="flex space-x-2 mb-3">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <div key={value} className="flex items-center space-x-1">
                          <RadioGroupItem value={value.toString()} id={`rating-${value}`} />
                          <Label htmlFor={`rating-${value}`}>{value}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                    <div className="flex justify-between text-xs text-muted-foreground mb-3">
                      <span>Not realistic at all</span>
                      <span>Completely realistic</span>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={handleThoughtRatingSubmit}
                      disabled={!thoughtRating}
                      className="w-full"
                    >
                      Submit Rating
                    </Button>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            
            {showThoughtProcess && thoughtProcessSteps.length > 0 && (
              <div className="w-1/3 border-l p-4 bg-gray-50 overflow-auto">
                <h3 className="font-medium text-sm mb-3 flex items-center gap-2">
                  <Brain className="h-4 w-4 text-therapy-primary" />
                  AI Reasoning Process
                </h3>
                <div className="space-y-3">
                  {thoughtProcessSteps.map((step) => (
                    <div key={step.id} className="bg-white rounded-lg p-3 border">
                      <div className="flex items-center gap-2 mb-1">
                        {step.type === "observation" && <AlertCircle className="h-4 w-4 text-blue-500" />}
                        {step.type === "analysis" && <Brain className="h-4 w-4 text-therapy-primary" />}
                        {step.type === "conclusion" && <CheckCircle className="h-4 w-4 text-green-500" />}
                        {step.type === "question" && <Lightbulb className="h-4 w-4 text-amber-500" />}
                        <h4 className="text-xs font-medium capitalize">{step.type}</h4>
                      </div>
                      <p className="text-xs text-gray-700">{step.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t">
            {chatMode === 'text' ? (
              <form 
                className="flex gap-2" 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
              >
                <Textarea 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 resize-none"
                  rows={1}
                />
                <Button type="submit" size="icon" disabled={!newMessage.trim() || aiThinking}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={handleToggleMic}
                    className={`rounded-full p-5 ${
                      isRecording 
                        ? 'bg-red-100 border-2 border-red-500' 
                        : 'bg-therapy-primary text-white hover:bg-therapy-primary/90'
                    } transition-all duration-300 flex items-center justify-center`}
                    disabled={aiThinking}
                  >
                    {isRecording ? (
                      <MicOff className="h-8 w-8 text-red-500" />
                    ) : (
                      <Mic className="h-8 w-8" />
                    )}
                  </button>
                </div>
                
                <div className="text-center text-sm">
                  {isRecording ? "Listening... Click to stop" : "Click to start speaking"}
                </div>
                
                <div className="flex justify-center gap-4 mt-2">
                  <Button 
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={handleToggleSpeech}
                    disabled={messages.length <= 1 || isRecording}
                  >
                    {isSpeaking ? (
                      <>
                        <VolumeX className="h-4 w-4" />
                        <span>Mute</span>
                      </>
                    ) : (
                      <>
                        <Volume className="h-4 w-4" />
                        <span>Listen</span>
                      </>
                    )}
                  </Button>
                </div>
                
                {!isRecording && newMessage && (
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground mb-1">Transcript:</p>
                    <div className="bg-muted p-2 rounded-md text-sm">
                      {newMessage}
                    </div>
                    <div className="flex justify-end mt-2">
                      <Button 
                        type="button" 
                        size="sm" 
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim() || aiThinking}
                      >
                        <Send className="h-4 w-4 mr-1" />
                        Send
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <div className="mt-3 text-xs text-muted-foreground">
              <p className="italic">
                This AI assistant uses CBT techniques but is not a replacement for professional therapy. 
                In crisis situations, please contact emergency services or a mental health professional.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Chat;
