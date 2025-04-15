
import { useState, useRef, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Mic, 
  MicOff, 
  MessageCircle, 
  Volume, 
  VolumeX, 
  Brain,
  AlertCircle,
  Lightbulb,
  CheckCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAIMode } from "@/hooks/use-ai-mode";
import { useNavigate, useLocation } from "react-router-dom";
import OnboardingReasoning from "@/components/onboarding/OnboardingReasoning";

type Message = {
  id: string;
  content: string;
  sender: "user" | "ai" | "therapist";
  timestamp: Date;
  isEscalated?: boolean;
};

type ThoughtProcess = {
  id: string;
  type: "observation" | "analysis" | "conclusion" | "memory";
  content: string;
};

type ChatMode = "text" | "voice";

const getTherapyModeClass = (mode: string) => {
  switch (mode) {
    case 'standard':
    case 'ai':
      return 'orb-standard';
    case 'clinical':
      return 'orb-clinical';
    case 'corporate':
      return 'orb-corporate';
    case 'relaxation':
      return 'orb-relaxation';
    default:
      return 'orb-standard';
  }
};

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
  const [chatMode, setChatMode] = useState<ChatMode>("voice");
  const [aiThinking, setAiThinking] = useState(false);
  const [showThoughtProcess, setShowThoughtProcess] = useState(true);
  const [thoughtProcessSteps, setThoughtProcessSteps] = useState<ThoughtProcess[]>([]);
  const [transcript, setTranscript] = useState("");
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [permanentMemory, setPermanentMemory] = useState<string[]>([]);
  
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

  const determineCategory = (message: string): string => {
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

    // Add to permanent memory if this is a significant insight
    if (category !== "general" && Math.random() > 0.5) {
      const memoryItem = `User has expressed ${category}-related concerns on ${new Date().toLocaleDateString()}`;
      if (!permanentMemory.includes(memoryItem)) {
        setPermanentMemory(prev => [...prev, memoryItem]);
        
        thoughts.push({
          id: (Date.now() + 3).toString(),
          type: "memory",
          content: `Adding to permanent memory: ${memoryItem}`
        });
      }
    }
    
    thoughts.push({
      id: (Date.now() + 2).toString(),
      type: "conclusion",
      content: `This conversation will be approached with ${
        therapyMode === 'ai' ? 'balanced AI techniques combining CBT and mindfulness' :
        therapyMode === 'clinical' ? 'evidence-based clinical frameworks and structured therapeutic techniques' :
        therapyMode === 'corporate' ? 'workplace-focused strategies and professional development perspective' :
        therapyMode === 'relaxation' ? 'relaxation techniques and stress management focus' :
        'standard therapeutic conversation techniques'
      }.`
    });
    
    return thoughts;
  };

  const handleSendMessage = () => {
    if (!transcript.trim() && !newMessage.trim()) return;
    
    const messageContent = transcript.trim() || newMessage.trim();
    
    const userMessageObj: Message = {
      id: Date.now().toString(),
      content: messageContent,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessageObj]);
    setNewMessage("");
    setTranscript("");
    setAiThinking(true);
    
    setTimeout(() => {
      const thoughts = generateThoughtProcess(messageContent);
      setThoughtProcessSteps(thoughts);
    }, 500);
    
    const needsEscalation = shouldEscalateToTherapist(messageContent);
    
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
        // Generate AI response based on therapy mode and user message
        let aiResponse = "";
        const category = determineCategory(messageContent);
        
        if (therapyMode === 'clinical') {
          aiResponse = `From a clinical perspective, ${category} concerns often benefit from structured approaches. Can you tell me more about when these feelings first began and how they've evolved over time?`;
        } else if (therapyMode === 'corporate') {
          aiResponse = `In workplace contexts, ${category} can impact professional performance. Let's explore some strategies that might help you maintain balance while achieving your career goals.`;
        } else if (therapyMode === 'relaxation') {
          aiResponse = `Let's focus on easing your ${category} with some relaxation techniques. First, could we try a brief breathing exercise to center ourselves before exploring this further?`;
        } else {
          // Standard/AI mode
          aiResponse = `I notice you mentioned something related to ${category}. How long have you been experiencing these feelings, and what tends to trigger them?`;
        }
        
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: aiResponse,
          sender: "ai",
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, aiMessage]);
        setThoughtProcessSteps([]);
        
        if (!isSpeaking) {
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
          setIsTranscribing(true);
          
          // Simulate live transcription
          const phrases = [
            "I've been ",
            "I've been feeling ",
            "I've been feeling really ",
            "I've been feeling really anxious ",
            "I've been feeling really anxious about ",
            "I've been feeling really anxious about an ",
            "I've been feeling really anxious about an upcoming ",
            "I've been feeling really anxious about an upcoming presentation ",
            "I've been feeling really anxious about an upcoming presentation at ",
            "I've been feeling really anxious about an upcoming presentation at work.",
          ];
          
          let i = 0;
          const transcriptionInterval = setInterval(() => {
            if (i < phrases.length) {
              setTranscript(phrases[i]);
              i++;
            } else {
              clearInterval(transcriptionInterval);
              setIsRecording(false);
              setIsTranscribing(false);
              
              // Auto-send after brief pause
              setTimeout(() => {
                handleSendMessage();
              }, 1000);
            }
          }, 300);
          
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
      setIsTranscribing(false);
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

  const toggleThoughtProcess = () => {
    setShowThoughtProcess(prev => !prev);
  };

  return (
    <MainLayout>
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">AI Therapy Chat</h1>
            <p className="text-muted-foreground">
              {therapyMode === 'standard' && 'Standard conversational therapy experience'}
              {therapyMode === 'ai' && 'Advanced AI-driven CBT techniques'}
              {therapyMode === 'clinical' && 'Evidence-based clinical approach'}
              {therapyMode === 'corporate' && 'Workplace wellness and professional development'}
              {therapyMode === 'relaxation' && 'Relaxation and stress management focus'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className={`gap-1 ${chatMode === 'text' ? 'bg-primary text-white' : ''}`}
              onClick={() => setChatMode('text')}
            >
              <MessageCircle className="h-4 w-4" />
              Text
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className={`gap-1 ${chatMode === 'voice' ? 'bg-primary text-white' : ''}`}
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
          <Badge className={`
            ${therapyMode === 'ai' ? 'bg-blue-500' : 
            therapyMode === 'clinical' ? 'bg-green-500' : 
            therapyMode === 'corporate' ? 'bg-purple-500' : 
            therapyMode === 'relaxation' ? 'bg-amber-500' : 
            'bg-therapy-primary'}
          `}>
            {therapyMode === 'standard' && 'Standard Mode'}
            {therapyMode === 'ai' && 'AI Mode'}
            {therapyMode === 'clinical' && 'Clinical Mode'}
            {therapyMode === 'corporate' && 'Corporate Mode'}
            {therapyMode === 'relaxation' && 'Relaxation Mode'}
          </Badge>
          {permanentMemory.length > 0 && (
            <Badge variant="outline" className="ml-2">
              {permanentMemory.length} Memory Item{permanentMemory.length !== 1 ? 's' : ''}
            </Badge>
          )}
        </div>
      </div>

      {chatMode === 'text' ? (
        // Text chat view - traditional message interface
        <div className="grid grid-cols-1 gap-6">
          <div className="border rounded-lg shadow-sm flex flex-col h-[calc(100vh-220px)]">
            <div className="p-4 border-b">
              <div className="flex items-center gap-3">
                <div className={`relative rounded-full h-12 w-12 flex items-center justify-center ${
                  therapyMode === 'ai' ? 'bg-blue-500' : 
                  therapyMode === 'clinical' ? 'bg-green-500' : 
                  therapyMode === 'corporate' ? 'bg-purple-500' : 
                  therapyMode === 'relaxation' ? 'bg-amber-500' : 
                  'bg-therapy-primary'
                } transition-colors duration-300`}>
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">AI Therapy Assistant</h3>
                  <p className="text-xs text-muted-foreground">
                    {aiThinking ? 'Thinking...' : 'Ready'}
                  </p>
                </div>
              </div>
            </div>
            
            <ScrollArea className="flex-1 p-4">
              {/* Messages will go here */}
              <div className="space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender !== 'user' && (
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-2 ${
                        therapyMode === 'ai' ? 'bg-blue-100' : 
                        therapyMode === 'clinical' ? 'bg-green-100' : 
                        therapyMode === 'corporate' ? 'bg-purple-100' : 
                        therapyMode === 'relaxation' ? 'bg-amber-100' : 
                        'bg-muted'
                      }`}>
                        <Brain className={`h-4 w-4 ${
                          therapyMode === 'ai' ? 'text-blue-500' : 
                          therapyMode === 'clinical' ? 'text-green-500' : 
                          therapyMode === 'corporate' ? 'text-purple-500' : 
                          therapyMode === 'relaxation' ? 'text-amber-500' : 
                          'text-therapy-primary'
                        }`} />
                      </div>
                    )}
                    
                    <div 
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'user' 
                          ? `${
                              therapyMode === 'ai' ? 'bg-blue-500' : 
                              therapyMode === 'clinical' ? 'bg-green-500' : 
                              therapyMode === 'corporate' ? 'bg-purple-500' : 
                              therapyMode === 'relaxation' ? 'bg-amber-500' : 
                              'bg-therapy-primary'
                            } text-white` 
                          : message.sender === 'therapist'
                            ? 'bg-green-100 border border-green-300'
                            : message.isEscalated
                              ? 'bg-yellow-50 border border-yellow-300'
                              : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    
                    {message.sender === 'user' && (
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ml-2 ${
                        therapyMode === 'ai' ? 'bg-blue-500' : 
                        therapyMode === 'clinical' ? 'bg-green-500' : 
                        therapyMode === 'corporate' ? 'bg-purple-500' : 
                        therapyMode === 'relaxation' ? 'bg-amber-500' : 
                        'bg-therapy-primary'
                      }`}>
                        <span className="text-white text-xs">You</span>
                      </div>
                    )}
                  </div>
                ))}
                
                {aiThinking && (
                  <div className="flex justify-start">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-2 ${
                      therapyMode === 'ai' ? 'bg-blue-100' : 
                      therapyMode === 'clinical' ? 'bg-green-100' : 
                      therapyMode === 'corporate' ? 'bg-purple-100' : 
                      therapyMode === 'relaxation' ? 'bg-amber-100' : 
                      'bg-muted'
                    }`}>
                      <Brain className={`h-4 w-4 ${
                        therapyMode === 'ai' ? 'text-blue-500' : 
                        therapyMode === 'clinical' ? 'text-green-500' : 
                        therapyMode === 'corporate' ? 'text-purple-500' : 
                        therapyMode === 'relaxation' ? 'text-amber-500' : 
                        'text-therapy-primary'
                      }`} />
                    </div>
                    <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                      <div className="flex space-x-1">
                        <div className={`h-2 w-2 rounded-full animate-bounce ${
                          therapyMode === 'ai' ? 'bg-blue-500' : 
                          therapyMode === 'clinical' ? 'bg-green-500' : 
                          therapyMode === 'corporate' ? 'bg-purple-500' : 
                          therapyMode === 'relaxation' ? 'bg-amber-500' : 
                          'bg-therapy-primary'
                        }`} style={{ animationDelay: '0ms' }}></div>
                        <div className={`h-2 w-2 rounded-full animate-bounce ${
                          therapyMode === 'ai' ? 'bg-blue-500' : 
                          therapyMode === 'clinical' ? 'bg-green-500' : 
                          therapyMode === 'corporate' ? 'bg-purple-500' : 
                          therapyMode === 'relaxation' ? 'bg-amber-500' : 
                          'bg-therapy-primary'
                        }`} style={{ animationDelay: '150ms' }}></div>
                        <div className={`h-2 w-2 rounded-full animate-bounce ${
                          therapyMode === 'ai' ? 'bg-blue-500' : 
                          therapyMode === 'clinical' ? 'bg-green-500' : 
                          therapyMode === 'corporate' ? 'bg-purple-500' : 
                          therapyMode === 'relaxation' ? 'bg-amber-500' : 
                          'bg-therapy-primary'
                        }`} style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            
            {showThoughtProcess && thoughtProcessSteps.length > 0 && (
              <div className="border-t p-2">
                <ScrollArea className="h-28">
                  <div className="space-y-2">
                    {thoughtProcessSteps.map((step) => (
                      <OnboardingReasoning 
                        key={step.id} 
                        reasoning={step.content} 
                        type={step.type}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        </div>
      ) : (
        // Voice chat view - orb-centered interface
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-full max-w-4xl rounded-2xl bg-white/50 backdrop-blur-sm shadow-lg p-6 pb-24 mx-auto flex flex-col items-center">
            {/* Centered Orb */}
            <div className="mt-16 mb-8">
              <div className={`voice-orb ${getTherapyModeClass(therapyMode)} ${isRecording ? 'listening' : ''}`}>
                <div className="orb-pulse"></div>
                <div className="orb-inner flex items-center justify-center">
                  {isRecording ? (
                    <Mic className="h-12 w-12 text-white drop-shadow-lg" />
                  ) : isSpeaking ? (
                    <Volume className="h-12 w-12 text-white drop-shadow-lg" />
                  ) : (
                    <Brain className="h-12 w-12 text-white drop-shadow-lg" />
                  )}
                </div>
              </div>
            </div>
            
            {/* Voice controls */}
            <div className="flex gap-4 mt-4">
              <Button
                onClick={handleToggleMic}
                variant="outline"
                size="lg"
                className={`rounded-full w-14 h-14 ${isRecording ? 'bg-red-100 border-red-400' : ''}`}
              >
                {isRecording ? <MicOff className="h-6 w-6 text-red-500" /> : <Mic className="h-6 w-6" />}
              </Button>
              
              <Button
                onClick={handleToggleSpeech}
                variant="outline"
                size="lg"
                className={`rounded-full w-14 h-14 ${isSpeaking ? 'bg-primary/20' : ''}`}
              >
                {isSpeaking ? <VolumeX className="h-6 w-6" /> : <Volume className="h-6 w-6" />}
              </Button>
              
              <Button
                onClick={toggleThoughtProcess}
                variant="outline"
                size="lg"
                className={`rounded-full w-14 h-14 ${showThoughtProcess ? 'bg-primary/20' : ''}`}
              >
                <Brain className="h-6 w-6" />
              </Button>
            </div>
            
            {/* Live transcript */}
            {(isTranscribing || transcript) && (
              <div className="mt-8 live-transcript">
                <p className="text-sm">{transcript || "Listening..."}</p>
              </div>
            )}
            
            {/* AI reasoning */}
            {showThoughtProcess && thoughtProcessSteps.length > 0 && (
              <div className="ai-reasoning-container mt-4">
                <ScrollArea className="h-full pr-4">
                  <div className="space-y-2">
                    {thoughtProcessSteps.map((step) => (
                      <div key={step.id} className="mb-2">
                        <div className="flex items-center gap-2 mb-1">
                          {step.type === "observation" && <AlertCircle className="h-4 w-4 text-blue-500" />}
                          {step.type === "analysis" && <Brain className="h-4 w-4 text-therapy-primary" />}
                          {step.type === "conclusion" && <CheckCircle className="h-4 w-4 text-green-500" />}
                          {step.type === "memory" && <Lightbulb className="h-4 w-4 text-amber-500" />}
                          <h4 className="text-xs font-medium capitalize">{step.type}</h4>
                        </div>
                        <p className="text-xs text-gray-700 pl-6">{step.content}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
            
            {/* Memory display */}
            {permanentMemory.length > 0 && showThoughtProcess && (
              <div className={`mt-4 p-3 rounded-lg text-xs shadow-sm border ${
                therapyMode === 'ai' ? 'bg-blue-50 border-blue-100' : 
                therapyMode === 'clinical' ? 'bg-green-50 border-green-100' : 
                therapyMode === 'corporate' ? 'bg-purple-50 border-purple-100' : 
                therapyMode === 'relaxation' ? 'bg-amber-50 border-amber-100' : 
                'bg-therapy-light border-therapy-muted'
              }`}>
                <div className="flex items-center gap-1 mb-1">
                  <Lightbulb className="h-3 w-3" />
                  <span className="font-medium">Permanent Memory</span>
                </div>
                <ul className="list-disc pl-5 space-y-1">
                  {permanentMemory.slice(-3).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                  {permanentMemory.length > 3 && (
                    <li className="text-muted-foreground">+ {permanentMemory.length - 3} more items</li>
                  )}
                </ul>
              </div>
            )}
          </div>
          
          <p className="text-xs text-center mt-4 text-muted-foreground max-w-md">
            This AI assistant uses therapeutic techniques tailored to your selected mode. 
            In crisis situations, please use the emergency button at the top of the screen.
          </p>
        </div>
      )}
    </MainLayout>
  );
};

export default Chat;
