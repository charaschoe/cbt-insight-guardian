
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
  AlertCircle 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAIMode } from "@/hooks/use-ai-mode";

type Message = {
  id: string;
  content: string;
  sender: "user" | "ai" | "therapist";
  timestamp: Date;
  isEscalated?: boolean;
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
  const [chatMode, setChatMode] = useState<ChatMode>("text");
  const [aiThinking, setAiThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { therapyMode } = useAIMode();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // CBT question patterns based on user input
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

  // Simulate AI analyzing user input for escalation
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

  // Get an AI response based on CBT techniques
  const generateAIResponse = (userMessage: string): string => {
    const category = determineCategory(userMessage);
    const questions = cbtQuestions[category];
    
    // Randomly select a question appropriate to the detected category
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    
    // Occasionally prompt for thought rating after a few exchanges
    if (messages.length % 3 === 0 && !showThoughtPrompt) {
      setShowThoughtPrompt(true);
      return "Before we continue, I'd like to understand how you're evaluating this situation. On a scale of 1-5, how realistic do you think your thoughts about this situation are?";
    }
    
    // Occasionally provide a CBT technique based on the conversation
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
    
    // Add user message
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
    
    // Check if this needs therapist escalation
    const needsEscalation = shouldEscalateToTherapist(newMessage);
    
    // Simulate AI response or therapist intervention
    setTimeout(() => {
      setAiThinking(false);
      
      if (needsEscalation) {
        // Add escalation message from AI
        const escalationMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: "I'm concerned about what you've shared. I'm connecting you with a human therapist for immediate support. They'll be with you momentarily.",
          sender: "ai",
          timestamp: new Date(),
          isEscalated: true
        };
        
        setMessages(prev => [...prev, escalationMessage]);
        
        // Simulate therapist joining after a short delay
        setTimeout(() => {
          const therapistMessage: Message = {
            id: (Date.now() + 2).toString(),
            content: "Hi there, I'm Dr. Rebecca. I'm here to provide immediate support. Let's talk about what you're experiencing right now. Can you tell me more about your immediate concerns?",
            sender: "therapist",
            timestamp: new Date(),
          };
          
          setMessages(prev => [...prev, therapistMessage]);
          
          toast({
            title: "Human therapist has joined the chat",
            description: "You've been connected with a licensed therapist for immediate support",
            variant: "default",
          });
        }, 3000);
      } else {
        // Normal AI response
        const aiResponse = generateAIResponse(newMessage);
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: aiResponse,
          sender: "ai",
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, aiMessage]);
        
        // If in voice mode, speak the response
        if (chatMode === "voice" && !isSpeaking) {
          speakMessage(aiResponse);
        }
      }
    }, 1500);
  };

  const handleToggleMic = () => {
    if (!isRecording) {
      // Request microphone access
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
          setIsRecording(true);
          toast({
            title: "Voice recording started",
            description: "I'm listening... Speak clearly and I'll respond when you're done.",
          });
          
          // Simulate speech recognition (in a real app, use Web Speech API or similar)
          setTimeout(() => {
            setIsRecording(false);
            const simulatedTranscript = "I've been feeling anxious about an upcoming presentation at work.";
            setNewMessage(simulatedTranscript);
            
            // Auto-send after a short delay
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
    // Basic implementation of text-to-speech
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
      // Find the last AI message
      const lastAiMessage = [...messages].reverse().find(msg => msg.sender === "ai");
      if (lastAiMessage) {
        speakMessage(lastAiMessage.content);
      }
    }
  };

  const handleThoughtRatingSubmit = () => {
    if (!thoughtRating) return;
    
    // Add user rating as a message
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
    
    // Simulate AI response based on rating
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

  return (
    <MainLayout>
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">AI Therapy Chat</h1>
            <p className="text-muted-foreground">Chat with an AI trained in CBT techniques</p>
          </div>
          <div className="flex items-center gap-2">
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
          </div>
        </div>
        
        {/* Mode indicator */}
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
          {/* Chat header */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              {chatMode === 'voice' ? (
                <div className={`relative rounded-full h-12 w-12 flex items-center justify-center ${isRecording || isSpeaking || aiThinking ? 'bg-therapy-primary' : 'bg-muted'} transition-colors duration-300`}>
                  <Brain className={`h-6 w-6 ${isRecording || isSpeaking || aiThinking ? 'text-white' : 'text-therapy-primary'}`} />
                  {(isRecording || isSpeaking || aiThinking) && (
                    <div className="absolute inset-0 rounded-full border-2 border-therapy-primary animate-pulse" />
                  )}
                </div>
              ) : (
                <Avatar className="h-12 w-12">
                  <div className="bg-therapy-primary text-white rounded-full h-full w-full flex items-center justify-center text-lg font-semibold">
                    AI
                  </div>
                </Avatar>
              )}
              <div>
                <h3 className="font-medium">AI Therapy Assistant</h3>
                <p className="text-xs text-muted-foreground">
                  Using CBT techniques • {aiThinking ? 'Thinking...' : 'Online'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Messages area */}
          <ScrollArea className="flex-1 p-4">
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
              
              {/* AI thinking indicator */}
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
              
              {/* Thought rating prompt */}
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
          
          {/* Input area */}
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
                  maxRows={3}
                />
                <Button type="submit" size="icon" disabled={!newMessage.trim() || aiThinking}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <Input 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Voice transcript will appear here..."
                    className="flex-1"
                    readOnly={isRecording}
                  />
                  <Button 
                    type="button" 
                    size="icon" 
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim() || isRecording || aiThinking}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex justify-center gap-4">
                  <Button 
                    type="button"
                    variant="outline"
                    size="sm"
                    className={`gap-2 ${isRecording ? 'bg-red-100' : ''}`}
                    onClick={handleToggleMic}
                  >
                    {isRecording ? (
                      <>
                        <MicOff className="h-4 w-4 text-red-500" />
                        <span className="text-red-500">Stop</span>
                      </>
                    ) : (
                      <>
                        <Mic className="h-4 w-4" />
                        <span>Speak</span>
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={handleToggleSpeech}
                    disabled={messages.length <= 1}
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
