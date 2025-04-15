
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
import { motion } from "framer-motion";

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

type MemoryItem = {
  id: string;
  content: string;
  category: string;
  date: Date;
  importance: number;
};

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
  const [liveThoughtProcess, setLiveThoughtProcess] = useState<ThoughtProcess[]>([]);
  const [transcript, setTranscript] = useState("");
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [permanentMemory, setPermanentMemory] = useState<MemoryItem[]>([
    {
      id: "initial-1",
      content: "User seems to prefer voice interaction",
      category: "preferences",
      date: new Date(),
      importance: 0.7
    }
  ]);
  const [isMemoryUpdated, setIsMemoryUpdated] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { therapyMode } = useAIMode();
  const navigate = useNavigate();
  const location = useLocation();
  const transcriptionTimeout = useRef<NodeJS.Timeout | null>(null);
  const liveAnalysisTimeout = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const isEmergency = searchParams.get('emergency') === 'true';
    
    if (isEmergency) {
      navigate('/emergency');
    }
  }, [location, navigate]);

  useEffect(() => {
    // Add CSS for the orb animation
    const style = document.createElement('style');
    style.textContent = `
      .voice-orb {
        position: relative;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        transition: all 0.5s ease;
      }
      
      .orb-standard {
        background: radial-gradient(circle at center, #4c7eff, #2952cc);
        box-shadow: 0 0 30px rgba(76, 126, 255, 0.5);
      }
      
      .orb-clinical {
        background: radial-gradient(circle at center, #42d392, #1ea666);
        box-shadow: 0 0 30px rgba(66, 211, 146, 0.5);
      }
      
      .orb-corporate {
        background: radial-gradient(circle at center, #9a66ff, #7133e2);
        box-shadow: 0 0 30px rgba(154, 102, 255, 0.5);
      }
      
      .orb-relaxation {
        background: radial-gradient(circle at center, #ffb561, #e68a19);
        box-shadow: 0 0 30px rgba(255, 181, 97, 0.5);
      }
      
      .orb-pulse {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 50%;
      }
      
      .orb-inner {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 140px;
        height: 140px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(5px);
        z-index: 2;
      }
      
      .listening .orb-pulse {
        animation: pulse 2s infinite;
      }
      
      @keyframes pulse {
        0% {
          box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
        }
        70% {
          box-shadow: 0 0 0 50px rgba(255, 255, 255, 0);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
        }
      }
      
      .live-transcript {
        position: relative;
        padding: 16px;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 500px;
        margin: 0 auto;
      }
      
      .ai-reasoning-container {
        position: relative;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 12px;
        padding: 12px;
        width: 100%;
        max-width: 500px;
        margin: 0 auto;
        backdrop-filter: blur(8px);
        height: 200px;
        overflow-y: auto;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, thoughtProcessSteps]);

  const extractEntities = (message: string) => {
    const entities = {
      people: [] as string[],
      dates: [] as string[],
      events: [] as string[],
      feelings: [] as string[],
      locations: [] as string[]
    };
    
    // Extract people (simple heuristic for capitalized names)
    const nameRegex = /\b[A-Z][a-z]+\b/g;
    const possibleNames = message.match(nameRegex) || [];
    const commonWords = ["I", "The", "A", "An", "In", "On", "At", "With", "And", "But", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    entities.people = possibleNames.filter(name => !commonWords.includes(name));
    
    // Extract dates
    const dateRegex = /\b(next|this) (Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b|tomorrow|yesterday|today|\b\d{1,2}(st|nd|rd|th)?\s+(of\s+)?(January|February|March|April|May|June|July|August|September|October|November|December)\b/gi;
    entities.dates = message.match(dateRegex) || [];
    
    // Extract potential events
    const eventRegex = /\b(meeting|presentation|assignment|project|deadline|appointment|session|interview|exam|test)\b/gi;
    entities.events = message.match(eventRegex) || [];
    
    // Extract feelings
    const feelingRegex = /\b(stress|anxious|worried|nervous|excited|happy|sad|angry|frustrated|overwhelmed|tired|exhausted)\b/gi;
    entities.feelings = message.match(feelingRegex) || [];
    
    // Extract locations
    const locationRegex = /\b(at|in)\s+(work|home|school|office|university|college)\b/gi;
    const locMatches = [...message.matchAll(locationRegex)];
    entities.locations = locMatches.map(match => match[2]);
    
    return entities;
  };

  const shouldAddToMemory = (entity: string, category: string): boolean => {
    // Check if entity is already in memory
    return !permanentMemory.some(
      item => item.content.toLowerCase().includes(entity.toLowerCase()) && 
              item.category === category
    );
  };

  const updateMemoryWithEntities = (message: string) => {
    const entities = extractEntities(message);
    const newMemoryItems: MemoryItem[] = [];
    
    // Add people to memory
    entities.people.forEach(person => {
      if (shouldAddToMemory(person, "people")) {
        newMemoryItems.push({
          id: Date.now() + Math.random().toString(),
          content: `User mentioned person: ${person}`,
          category: "people",
          date: new Date(),
          importance: 0.8
        });
      }
    });
    
    // Add dates and events together for context
    if (entities.dates.length > 0 && entities.events.length > 0) {
      const date = entities.dates[0];
      const event = entities.events[0];
      newMemoryItems.push({
        id: Date.now() + Math.random().toString(),
        content: `User has ${event} on ${date}`,
        category: "schedule",
        date: new Date(),
        importance: 0.9
      });
    }
    
    // Add feelings
    entities.feelings.forEach(feeling => {
      newMemoryItems.push({
        id: Date.now() + Math.random().toString(),
        content: `User expressed feeling ${feeling}`,
        category: "emotions",
        date: new Date(),
        importance: 0.7
      });
    });
    
    if (newMemoryItems.length > 0) {
      setPermanentMemory(prev => [...prev, ...newMemoryItems]);
      setIsMemoryUpdated(true);
      setTimeout(() => setIsMemoryUpdated(false), 3000);
      
      // Add memory entries to thought process
      newMemoryItems.forEach(item => {
        setLiveThoughtProcess(prev => [
          ...prev,
          {
            id: Date.now() + Math.random().toString(),
            type: "memory",
            content: `Adding to memory: ${item.content}`
          }
        ]);
      });
    }
  };

  const analyzeLiveTranscript = (text: string) => {
    if (!text || text.length < 5) return;
    
    // Clear existing timeout to prevent rapid updates
    if (liveAnalysisTimeout.current) {
      clearTimeout(liveAnalysisTimeout.current);
    }
    
    liveAnalysisTimeout.current = setTimeout(() => {
      // Generate live thought process as user is speaking
      const entities = extractEntities(text);
      const liveThoughts: ThoughtProcess[] = [];
      
      // Add observation based on the transcript so far
      if (text.length > 10) {
        liveThoughts.push({
          id: Date.now().toString(),
          type: "observation",
          content: `Live transcript analysis: User is discussing ${
            entities.people.length > 0 ? `person named ${entities.people[0]}` : 
            entities.events.length > 0 ? `an ${entities.events[0]}` : 
            entities.feelings.length > 0 ? `feelings of ${entities.feelings[0]}` : 
            "a topic I'm analyzing"
          }`
        });
      }
      
      // Add analysis if we detect important entities
      if (entities.people.length > 0 && entities.events.length > 0) {
        liveThoughts.push({
          id: (Date.now() + 1).toString(),
          type: "analysis",
          content: `User mentions ${entities.people[0]} in relation to ${entities.events[0]}${
            entities.dates.length > 0 ? ` scheduled for ${entities.dates[0]}` : ""
          }. This appears to be a significant upcoming event.`
        });
      } else if (entities.feelings.length > 0) {
        liveThoughts.push({
          id: (Date.now() + 1).toString(),
          type: "analysis",
          content: `User is expressing ${entities.feelings[0]} feelings${
            entities.events.length > 0 ? ` about ${entities.events[0]}` : ""
          }. This may indicate their current emotional state.`
        });
      }
      
      // Only update if we have new thoughts to add
      if (liveThoughts.length > 0) {
        setLiveThoughtProcess(liveThoughts);
      }
      
      // Add to permanent memory if we have substantial information
      updateMemoryWithEntities(text);
      
    }, 500); // Debounce live analysis to avoid excessive updates
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
    
    // Process entities and add relevant thoughts
    const entities = extractEntities(userMessage);
    
    if (entities.people.length > 0) {
      thoughts.push({
        id: (Date.now() + 2).toString(),
        type: "analysis",
        content: `User mentioned person: ${entities.people.join(", ")}. This person appears to be significant in the current context.`
      });
    }
    
    if (entities.dates.length > 0 && entities.events.length > 0) {
      thoughts.push({
        id: (Date.now() + 3).toString(),
        type: "analysis",
        content: `User mentioned event: ${entities.events[0]} on ${entities.dates[0]}. This is likely causing time-based pressure.`
      });
    }

    // Add to permanent memory if this is a significant insight
    updateMemoryWithEntities(userMessage);
    
    thoughts.push({
      id: (Date.now() + 4).toString(),
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

  const findRelevantMemoryItems = (message: string): MemoryItem[] => {
    const entities = extractEntities(message);
    const relevantItems: MemoryItem[] = [];
    
    // Look for relevant memory items based on people mentioned
    if (entities.people.length > 0) {
      permanentMemory.forEach(item => {
        entities.people.forEach(person => {
          if (item.content.toLowerCase().includes(person.toLowerCase())) {
            relevantItems.push(item);
          }
        });
      });
    }
    
    // Look for relevant memory items based on events mentioned
    if (entities.events.length > 0) {
      permanentMemory.forEach(item => {
        entities.events.forEach(event => {
          if (item.content.toLowerCase().includes(event.toLowerCase())) {
            relevantItems.push(item);
          }
        });
      });
    }
    
    // Look for relevant memory items based on feelings mentioned
    if (entities.feelings.length > 0) {
      permanentMemory.forEach(item => {
        if (item.category === "emotions") {
          relevantItems.push(item);
        }
      });
    }
    
    // Deduplicate items
    return Array.from(new Set(relevantItems.map(item => item.id)))
      .map(id => relevantItems.find(item => item.id === id))
      .filter(Boolean) as MemoryItem[];
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
    setLiveThoughtProcess([]);
    
    setTimeout(() => {
      const thoughts = generateThoughtProcess(messageContent);
      setThoughtProcessSteps(thoughts);
    }, 300);
    
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
        // Generate AI response based on therapy mode, user message and memory
        let aiResponse = "";
        const category = determineCategory(messageContent);
        const relevantMemory = findRelevantMemoryItems(messageContent);
        
        // Find if we have any memory about Sarah
        const sarahMemory = permanentMemory.find(item => 
          item.content.toLowerCase().includes("sarah")
        );
        
        // Find if we have any memory about assignment or presentation
        const assignmentMemory = permanentMemory.find(item => 
          item.content.toLowerCase().includes("assignment") || 
          item.content.toLowerCase().includes("presentation")
        );
        
        // Customize response based on detected entities and memory
        if (messageContent.toLowerCase().includes("sarah") && messageContent.toLowerCase().includes("stress")) {
          aiResponse = `I understand Sarah at work has been causing you stress. ${assignmentMemory ? 
            "And this is connected to your upcoming presentation, correct? How much of the presentation have you completed so far?" : 
            "Can you tell me more about how Sarah's behavior is affecting your work?"}`;
        } else if (messageContent.toLowerCase().includes("presentation") || messageContent.toLowerCase().includes("assignment")) {
          aiResponse = `Regarding your upcoming assignment due on Monday, how much progress have you made? What specific aspects are feeling most challenging right now?`;
        } else if (therapyMode === 'clinical') {
          aiResponse = `From a clinical perspective, ${category} concerns often benefit from structured approaches. ${
            relevantMemory.length > 0 ? `I notice you've mentioned ${relevantMemory[0].content.split(":")[1]} before. How is that situation evolving?` : 
            "Can you tell me more about when these feelings first began and how they've evolved over time?"
          }`;
        } else if (therapyMode === 'corporate') {
          aiResponse = `In workplace contexts, ${category} can impact professional performance. ${
            relevantMemory.length > 0 ? `I recall you mentioned ${relevantMemory[0].content.split(":")[1]}. How is that affecting your work environment now?` : 
            "Let's explore some strategies that might help you maintain balance while achieving your career goals."
          }`;
        } else if (therapyMode === 'relaxation') {
          aiResponse = `Let's focus on easing your ${category} with some relaxation techniques. ${
            relevantMemory.length > 0 ? `I remember you mentioned ${relevantMemory[0].content.split(":")[1]}. How are you feeling about that now?` : 
            "First, could we try a brief breathing exercise to center ourselves before exploring this further?"
          }`;
        } else {
          // Standard/AI mode
          aiResponse = `I notice you mentioned something related to ${category}. ${
            relevantMemory.length > 0 ? `Based on our previous conversations about ${relevantMemory[0].content.split(":")[1]}, how are you coping with this situation now?` : 
            "How long have you been experiencing these feelings, and what tends to trigger them?"
          }`;
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
    }, 2000);
  };

  const handleToggleMic = () => {
    if (!isRecording) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
          setIsRecording(true);
          setIsTranscribing(true);
          setLiveThoughtProcess([]);
          
          // Simulate live transcription
          let phrases: string[] = [];
          
          // Detect if we've already set up memory about Sarah and the assignment
          const hasSarahMemory = permanentMemory.some(item => 
            item.content.toLowerCase().includes("sarah")
          );
          
          const hasAssignmentMemory = permanentMemory.some(item => 
            item.content.toLowerCase().includes("assignment") || 
            item.content.toLowerCase().includes("presentation")
          );
          
          if (!hasSarahMemory && !hasAssignmentMemory) {
            // First-time conversation about Sarah and the assignment
            phrases = [
              "Sarah has been ",
              "Sarah has been really ",
              "Sarah has been really stressing me out ",
              "Sarah has been really stressing me out at ",
              "Sarah has been really stressing me out at work ",
              "Sarah has been really stressing me out at work with ",
              "Sarah has been really stressing me out at work with the ",
              "Sarah has been really stressing me out at work with the upcoming ",
              "Sarah has been really stressing me out at work with the upcoming assignment ",
              "Sarah has been really stressing me out at work with the upcoming assignment that is due ",
              "Sarah has been really stressing me out at work with the upcoming assignment that is due next ",
              "Sarah has been really stressing me out at work with the upcoming assignment that is due next Monday.",
            ];
          } else {
            // Follow-up conversation about the assignment progress
            phrases = [
              "I've only ",
              "I've only finished ",
              "I've only finished about ",
              "I've only finished about half ",
              "I've only finished about half of ",
              "I've only finished about half of the ",
              "I've only finished about half of the presentation ",
              "I've only finished about half of the presentation and ",
              "I've only finished about half of the presentation and I'm ",
              "I've only finished about half of the presentation and I'm worried ",
              "I've only finished about half of the presentation and I'm worried I ",
              "I've only finished about half of the presentation and I'm worried I won't ",
              "I've only finished about half of the presentation and I'm worried I won't finish ",
              "I've only finished about half of the presentation and I'm worried I won't finish in ",
              "I've only finished about half of the presentation and I'm worried I won't finish in time.",
            ];
          }
          
          let i = 0;
          const transcriptionInterval = setInterval(() => {
            if (i < phrases.length) {
              setTranscript(phrases[i]);
              // Analyze the transcript as it grows
              analyzeLiveTranscript(phrases[i]);
              i++;
            } else {
              clearInterval(transcriptionInterval);
              
              if (transcriptionTimeout.current) {
                clearTimeout(transcriptionTimeout.current);
              }
              
              transcriptionTimeout.current = setTimeout(() => {
                setIsRecording(false);
                setIsTranscribing(false);
                
                // Auto-send after brief pause
                setTimeout(() => {
                  handleSendMessage();
                }, 500);
              }, 500);
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
      
      if (transcriptionTimeout.current) {
        clearTimeout(transcriptionTimeout.current);
      }
    }
  };

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => {
        setIsSpeaking(false);
        // Automatically start listening for response after AI finishes speaking
        if (chatMode === 'voice') {
          setTimeout(() => {
            handleToggleMic();
          }, 500);
        }
      };
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
            <motion.div
              animate={isRecording ? { scale: [1, 1.05, 1] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mt-16 mb-8"
            >
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
            </motion.div>
            
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
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-8 live-transcript"
              >
                <p className="text-sm">{transcript || "Listening..."}</p>
              </motion.div>
            )}
            
            {/* AI reasoning for live transcript */}
            {showThoughtProcess && liveThoughtProcess.length > 0 && isTranscribing && (
              <div className="ai-reasoning-container mt-4">
                <ScrollArea className="h-full pr-4">
                  <div className="space-y-2">
                    {liveThoughtProcess.map((step) => (
                      <OnboardingReasoning
                        key={step.id}
                        reasoning={step.content}
                        type={step.type}
                        isLive={true}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
            
            {/* AI reasoning for completed analysis */}
            {showThoughtProcess && thoughtProcessSteps.length > 0 && !isTranscribing && (
              <div className="ai-reasoning-container mt-4">
                <ScrollArea className="h-full pr-4">
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
            
            {/* Memory display */}
            {permanentMemory.length > 0 && showThoughtProcess && (
              <motion.div 
                initial={isMemoryUpdated ? { scale: 1.05, borderColor: "#fbbf24" } : {}}
                animate={isMemoryUpdated ? { scale: 1, borderColor: "" } : {}}
                transition={{ duration: 0.5 }}
                className={`mt-4 p-3 rounded-lg text-xs shadow-sm border ${
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
                    <li key={i}>{item.content}</li>
                  ))}
                  {permanentMemory.length > 3 && (
                    <li className="text-muted-foreground">+ {permanentMemory.length - 3} more items</li>
                  )}
                </ul>
              </motion.div>
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
