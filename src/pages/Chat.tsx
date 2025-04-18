import { useState, useRef, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea"; 
import { 
  Mic, 
  MicOff, 
  MessageCircle, 
  Volume, 
  VolumeX, 
  Brain,
  AlertCircle,
  Lightbulb,
  CheckCircle,
  Send
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
  const chatInputRef = useRef<HTMLTextAreaElement>(null);
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
      
      // More varied and contextual observations based on the transcript
      if (text.length > 10) {
        const contextPatterns = [
          `Live transcript analysis: User is discussing ${entities.people.length > 0 ? `person named ${entities.people[0]}` : 
            entities.events.length > 0 ? `an ${entities.events[0]}` : 
            entities.feelings.length > 0 ? `feelings of ${entities.feelings[0]}` : 
            "a topic I'm analyzing"}`,
          `I notice the user is expressing thoughts about ${entities.people.length > 0 ? `their relationship with ${entities.people[0]}` : 
            entities.events.length > 0 ? `an upcoming ${entities.events[0]}` : 
            entities.feelings.length > 0 ? `their emotional state of ${entities.feelings[0]}` : 
            "their personal experiences"}`,
          `The user's speech pattern indicates ${entities.feelings.length > 0 ? `${entities.feelings[0]} emotions` : 
            entities.events.length > 0 ? `concern about a specific event` : 
            "a neutral emotional state with potential underlying concerns"}`
        ];
        
        liveThoughts.push({
          id: Date.now().toString(),
          type: "observation",
          content: contextPatterns[Math.floor(Math.random() * contextPatterns.length)]
        });
      }
      
      // More varied analysis if we detect important entities
      if (entities.people.length > 0 && entities.events.length > 0) {
        const interpersonalAnalysis = [
          `User mentions ${entities.people[0]} in relation to ${entities.events[0]}${
            entities.dates.length > 0 ? ` scheduled for ${entities.dates[0]}` : ""
          }. This appears to be a significant upcoming event.`,
          `The relationship between the user and ${entities.people[0]} seems to be affected by ${entities.events[0]}. This may be causing interpersonal tension.`,
          `${entities.people[0]} plays a key role in the user's concerns about ${entities.events[0]}. This relationship dynamic warrants exploration.`
        ];
        
        liveThoughts.push({
          id: (Date.now() + 1).toString(),
          type: "analysis",
          content: interpersonalAnalysis[Math.floor(Math.random() * interpersonalAnalysis.length)]
        });
      } else if (entities.feelings.length > 0) {
        const emotionalAnalysis = [
          `User is expressing ${entities.feelings[0]} feelings${
            entities.events.length > 0 ? ` about ${entities.events[0]}` : ""
          }. This may indicate their current emotional state.`,
          `The ${entities.feelings[0]} emotion appears to be a predominant theme, possibly linked to recent experiences or ongoing situations.`,
          `I'm detecting emotional content related to ${entities.feelings[0]}, which suggests this is a meaningful emotional trigger for the user.`
        ];
        
        liveThoughts.push({
          id: (Date.now() + 1).toString(),
          type: "analysis",
          content: emotionalAnalysis[Math.floor(Math.random() * emotionalAnalysis.length)]
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
    
    // More complex pattern matching for different emotional and situational categories
    const patterns = {
      anxiety: ["anxious", "worry", "fear", "panic", "nervous", "tense", "on edge", "apprehensive", "dread", "uneasy"],
      depression: ["sad", "depress", "down", "hopeless", "empty", "worthless", "tired", "exhausted", "meaningless", "numb"],
      stress: ["stress", "overwhelm", "pressure", "burden", "stretched thin", "burnout", "can't cope", "too much"],
      relationships: ["relationship", "partner", "friend", "family", "colleague", "supervisor", "team", "connection", "bond", "trust"],
      work: ["work", "job", "career", "boss", "coworker", "project", "deadline", "performance", "promotion", "workload"],
      identity: ["who am i", "purpose", "meaning", "identity", "authentic", "real self", "true self", "values", "beliefs"],
      health: ["health", "sick", "pain", "doctor", "diagnosis", "illness", "condition", "symptoms", "treatment"],
      grief: ["loss", "grief", "died", "death", "missing", "gone", "mourning", "remember"]
    };
    
    // Check each pattern category and find the best match
    for (const [category, keywords] of Object.entries(patterns)) {
      for (const keyword of keywords) {
        if (lowercaseMsg.includes(keyword)) {
          return category;
        }
      }
    }
    
    return "general";
  };

  const generateThoughtProcess = (userMessage: string): ThoughtProcess[] => {
    const category = determineCategory(userMessage);
    const thoughts: ThoughtProcess[] = [];
    
    // More contextual observations based on message content
    const observationTemplates = {
      anxiety: [
        `User message mentions keywords related to anxiety. Tone suggests heightened worry and future-focused concerns.`,
        `I detect anxiety-related language patterns. The user appears to be experiencing anticipatory worry about upcoming events.`,
        `The message contains anxiety markers, including uncertainty about future outcomes and seeking reassurance.`
      ],
      depression: [
        `User message suggests low mood indicators. Content shows negative self-perception and past-focused rumination.`,
        `I notice depression-related language patterns with themes of hopelessness and diminished energy.`,
        `The message contains depressive content focused on perceived inadequacy and pessimistic outlook.`
      ],
      stress: [
        `User message indicates stress patterns. Content suggests perception of inadequate coping resources.`,
        `I detect language consistent with feeling overwhelmed by external demands and internal pressure.`,
        `The message contains stress markers related to time pressure and competing responsibilities.`
      ],
      relationships: [
        `User message focuses on interpersonal dynamics. Content suggests attribution errors or communication patterns.`,
        `I notice relationship-focused language that indicates boundary concerns or unmet expectations.`,
        `The message contains relationship themes centered on trust issues and emotional safety concerns.`
      ],
      work: [
        `User message references workplace challenges. Content suggests performance anxiety or imposter syndrome.`,
        `I detect work-related concerns focusing on achievement pressure and professional identity.`,
        `The message contains workplace themes related to balancing productivity and wellbeing.`
      ],
      identity: [
        `User message explores existential themes. Content suggests identity exploration and meaning-making.`,
        `I notice self-reflection patterns that indicate reassessment of core values and life direction.`,
        `The message contains existential questions related to purpose and authentic expression.`
      ],
      health: [
        `User message mentions health concerns. Content suggests health anxiety and bodily hypervigilance.`,
        `I detect health-related worries that may be affecting overall quality of life and functioning.`,
        `The message contains health themes centered on uncertainty about physical symptoms.`
      ],
      grief: [
        `User message indicates grief responses. Content suggests processing of loss and adjustment challenges.`,
        `I notice grief-related language patterns showing the emotional impact of significant loss.`,
        `The message contains grief themes related to meaning-making after loss and maintaining connection.`
      ],
      general: [
        `User message contains mixed themes that don't fit clearly into a specific pattern.`,
        `I detect a combination of concerns that suggest complex interrelated issues.`,
        `The message contains varied content that requires an integrative therapeutic approach.`
      ]
    };
    
    thoughts.push({
      id: Date.now().toString(),
      type: "observation",
      content: observationTemplates[category as keyof typeof observationTemplates][
        Math.floor(Math.random() * observationTemplates[category as keyof typeof observationTemplates].length)
      ]
    });
    
    // More varied and contextualized analysis
    const analysisTemplates = {
      anxiety: [
        `Based on CBT frameworks, this appears to be a potential case of catastrophic thinking and future-focused worry.`,
        `The cognitive patterns suggest anxiety maintenance through avoidance behaviors and safety-seeking.`,
        `Using ACT principles, I notice experiential avoidance of uncertainty and cognitive fusion with threat narratives.`
      ],
      depression: [
        `From a cognitive perspective, there are patterns of negative self-schemas and selective attention to failure.`,
        `The narrative suggests ruminative thought patterns that maintain low mood through analytical self-focus.`,
        `Using behavioral activation concepts, I notice potential withdrawal from reward-generating activities.`
      ],
      stress: [
        `Through a stress management lens, I see indications of perceived demand exceeding perceived resources.`,
        `The language suggests allostatic load may be building through chronic activation of stress response systems.`,
        `Using mindfulness concepts, I notice potential difficulty detaching from work concerns during rest periods.`
      ],
      relationships: [
        `From an attachment theory perspective, I notice patterns that suggest activation of core relational schemas.`,
        `The interpersonal dynamics described may relate to unexamined expectations and communication patterns.`,
        `Using systemic concepts, I see reciprocal interaction patterns that may be maintaining relational distress.`
      ],
      work: [
        `Through an occupational health lens, I notice potential work-life boundary concerns and role strain.`,
        `The professional challenges described may connect to core beliefs about performance and self-worth.`,
        `Using career development concepts, I see tensions between current role demands and longer-term aspirations.`
      ],
      general: [
        `Drawing on integrated approaches, this appears to involve interconnected cognitive, emotional and behavioral patterns.`,
        `The presentation suggests multilevel concerns that would benefit from both symptom management and deeper exploration.`,
        `Using transdiagnostic principles, I notice emotional regulation challenges across different life domains.`
      ]
    };
    
    thoughts.push({
      id: (Date.now() + 1).toString(),
      type: "analysis",
      content: analysisTemplates[category as keyof typeof analysisTemplates] ? 
        analysisTemplates[category as keyof typeof analysisTemplates][
          Math.floor(Math.random() * analysisTemplates[category as keyof typeof analysisTemplates].length)
        ] : 
        analysisTemplates.general[Math.floor(Math.random() * analysisTemplates.general.length)]
    });
    
    // Process entities and add relevant thoughts
    const entities = extractEntities(userMessage);
    
    if (entities.people.length > 0) {
      const peopleAnalysis = [
        `User mentioned person: ${entities.people.join(", ")}. This person appears to be significant in the current context.`,
        `The reference to ${entities.people.join(", ")} suggests an important relationship dynamic worth exploring further.`,
        `${entities.people.join(", ")} seems to play a meaningful role in the user's current situation or emotional state.`
      ];
      
      thoughts.push({
        id: (Date.now() + 2).toString(),
        type: "analysis",
        content: peopleAnalysis[Math.floor(Math.random() * peopleAnalysis.length)]
      });
    }
    
    if (entities.dates.length > 0 && entities.events.length > 0) {
      const timeBasedAnalysis = [
        `User mentioned event: ${entities.events[0]} on ${entities.dates[0]}. This is likely causing time-based pressure.`,
        `The upcoming ${entities.events[0]} on ${entities.dates[0]} appears to be a significant temporal anchor in their concerns.`,
        `The reference to ${entities.events[0]} happening on ${entities.dates[0]} suggests anticipatory processing of this event.`
      ];
      
      thoughts.push({
        id: (Date.now() + 3).toString(),
        type: "analysis",
        content: timeBasedAnalysis[Math.floor(Math.random() * timeBasedAnalysis.length)]
      });
    }

    // Add to permanent memory if this is a significant insight
    updateMemoryWithEntities(userMessage);
    
    // More contextual and mode-specific approach conclusions
    const conclusionTemplates = {
      ai: [
        `This conversation will be approached with balanced AI techniques combining CBT and mindfulness.`,
        `I'll use an integrative AI approach drawing on evidence-based techniques tailored to the user's needs.`,
        `My response strategy will utilize AI-optimized therapeutic techniques with personalized pacing.`
      ],
      clinical: [
        `This conversation will be approached with evidence-based clinical frameworks and structured therapeutic techniques.`,
        `I'll employ a clinical approach using research-supported interventions appropriate for these presenting concerns.`,
        `My response strategy will follow clinical best practices while maintaining appropriate therapeutic boundaries.`
      ],
      corporate: [
        `This conversation will be approached with workplace-focused strategies and professional development perspective.`,
        `I'll utilize workplace wellness frameworks that balance performance optimization with wellbeing priorities.`,
        `My response strategy will address both professional effectiveness and personal sustainability.`
      ],
      relaxation: [
        `This conversation will be approached with relaxation techniques and stress management focus.`,
        `I'll emphasize physiological regulation strategies and attentional training techniques.`,
        `My response strategy will prioritize immediate relief while building longer-term resilience resources.`
      ],
      standard: [
        `This conversation will be approached with standard therapeutic conversation techniques.`,
        `I'll use a balanced approach combining supportive listening with gentle exploration.`,
        `My response strategy will focus on creating a space for reflection while offering practical tools.`
      ]
    };
    
    thoughts.push({
      id: (Date.now() + 4).toString(),
      type: "conclusion",
      content: conclusionTemplates[therapyMode as keyof typeof conclusionTemplates] ? 
        conclusionTemplates[therapyMode as keyof typeof conclusionTemplates][
          Math.floor(Math.random() * conclusionTemplates[therapyMode as keyof typeof conclusionTemplates].length)
        ] : 
        conclusionTemplates.standard[Math.floor(Math.random() * conclusionTemplates.standard.length)]
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
        
        // Large dataset of varied responses based on context and therapy mode
        const responseTemplates = {
          sarah_stress: [
            `I understand Sarah at work has been causing you stress. ${assignmentMemory ? 
              "And this is connected to your upcoming presentation, correct? How much of the presentation have you completed so far?" : 
              "Can you tell me more about how Sarah's behavior is affecting your work environment?"}`,
            `It sounds like your interactions with Sarah are creating workplace tension. ${assignmentMemory ? 
              "This seems particularly challenging with your presentation approaching. What aspects of the presentation feel most affected by this situation?" : 
              "What specific interactions with Sarah have been most difficult for you to navigate?"}`,
            `Sarah's impact on your work experience appears significant. ${assignmentMemory ? 
              "With your presentation deadline approaching, how are you balancing these interpersonal challenges with your preparation?" : 
              "How has this situation evolved over time? Have there been any patterns in your interactions?"}`
          ],
          assignment_presentation: [
            `Regarding your upcoming assignment due on Monday, how much progress have you made? What specific aspects are feeling most challenging right now?`,
            `With the presentation deadline approaching, which parts of the preparation are consuming most of your mental energy? What would help you feel more prepared?`,
            `I'd like to understand more about this assignment that's due soon. What are your expectations for yourself regarding this presentation, and how does that compare with what's actually required?`
          ],
          clinical_approach: {
            anxiety: [
              `From a clinical perspective, anxiety concerns often benefit from structured approaches. ${
                relevantMemory.length > 0 ? `I notice you've mentioned ${relevantMemory[0].content.split(":")[1]} before. How is that situation evolving?` : 
                "Can you tell me more about when these worries first began and how they've evolved over time?"
              }`,
              `When looking at anxiety through a clinical lens, it's helpful to identify specific triggers and thought patterns. ${
                relevantMemory.length > 0 ? `You've previously mentioned ${relevantMemory[0].content.split(":")[1]}. Has this continued to be a source of concern?` : 
                "Can you describe a recent situation where you felt this anxiety most intensely?"
              }`,
              `In clinical treatment for anxiety, we often examine both physiological and cognitive components. ${
                relevantMemory.length > 0 ? `Given your previous mention of ${relevantMemory[0].content.split(":")[1]}, how have you been managing the physical sensations of anxiety?` : 
                "What physical sensations do you notice when these worries are strongest?"
              }`
            ],
            depression: [
              `From a clinical perspective, mood concerns often have both cognitive and behavioral components. ${
                relevantMemory.length > 0 ? `I recall you mentioned ${relevantMemory[0].content.split(":")[1]}. How has that been affecting your daily functioning?` : 
                "Can you tell me about your energy levels and any changes in activities you've enjoyed in the past?"
              }`,
              `When approaching depression clinically, we look at patterns over time. ${
                relevantMemory.length > 0 ? `You previously shared about ${relevantMemory[0].content.split(":")[1]}. Has there been any shift in how you've been feeling since then?` : 
                "Have you noticed any patterns to when these feelings are stronger or somewhat lighter?"
              }`,
              `Clinical approaches to low mood often involve examining both thoughts and behaviors. ${
                relevantMemory.length > 0 ? `Considering your earlier mention of ${relevantMemory[0].content.split(":")[1]}, what thoughts tend to come up most frequently?` : 
                "What thoughts tend to accompany these feelings of sadness or emptiness?"
              }`
            ],
            general: [
              `From a clinical perspective, ${category} concerns often benefit from structured approaches. ${
                relevantMemory.length > 0 ? `I notice you've mentioned ${relevantMemory[0].content.split(":")[1]} before. How is that situation evolving?` : 
                "Can you tell me more about when these feelings first began and how they've evolved over time?"
              }`,
              `When looking at this through a clinical lens, it's helpful to identify specific patterns and triggers. ${
                relevantMemory.length > 0 ? `You've previously mentioned ${relevantMemory[0].content.split(":")[1]}. How has this been affecting you recently?` : 
                "Can you describe a recent situation where you felt this most intensely?"
              }`,
              `In clinical treatment for ${category}-related concerns, we often examine both emotional and cognitive components. ${
                relevantMemory.length > 0 ? `Given your previous mention of ${relevantMemory[0].content.split(":")[1]}, how have you been managing these experiences?` : 
                "What thoughts tend to accompany these feelings?"
              }`
            ]
          },
          corporate_approach: {
            work: [
              `In workplace contexts, work stress can impact professional performance. ${
                relevantMemory.length > 0 ? `I recall you mentioned ${relevantMemory[0].content.split(":")[1]}. How is that affecting your work environment now?` : 
                "Let's explore some strategies that might help you maintain balance while achieving your career goals."
              }`,
              `From a professional development perspective, these workplace challenges present both obstacles and opportunities. ${
                relevantMemory.length > 0 ? `Based on what you shared about ${relevantMemory[0].content.split(":")[1]}, what would a better workplace dynamic look like for you?` : 
                "What aspects of your professional identity feel most affected by the current situation?"
              }`,
              `When considering workplace wellness, it's important to address both immediate stressors and longer-term career alignment. ${
                relevantMemory.length > 0 ? `You mentioned ${relevantMemory[0].content.split(":")[1]} previously. Have there been any developments in that situation?` : 
                "How would you describe the gap between your current work experience and your ideal professional environment?"
              }`
            ],
            general: [
              `In workplace contexts, ${category} can impact professional performance. ${
                relevantMemory.length > 0 ? `I recall you mentioned ${relevantMemory[0].content.split(":")[1]}. How is that affecting your work environment now?` : 
                "Let's explore some strategies that might help you maintain balance while achieving your career goals."
              }`,
              `From a professional development perspective, this situation presents both challenges and opportunities. ${
                relevantMemory.length > 0 ? `Based on what you shared about ${relevantMemory[0].content.split(":")[1]}, how is this affecting your workplace functioning?` : 
                "How would you like to approach this situation differently from a professional standpoint?"
              }`,
              `When considering workplace wellness, it's important to address both immediate concerns and longer-term professional goals. ${
                relevantMemory.length > 0 ? `You mentioned ${relevantMemory[0].content.split(":")[1]} previously. How does this relate to your career aspirations?` : 
                "What workplace resources or approaches might help you navigate this situation more effectively?"
              }`
            ]
          },
          relaxation_approach: {
            stress: [
              `Let's focus on easing your stress with some relaxation techniques. ${
                relevantMemory.length > 0 ? `I remember you mentioned ${relevantMemory[0].content.split(":")[1]}. How are you feeling about that now?` : 
                "First, could we try a brief breathing exercise to center ourselves before exploring this further?"
              }`,
              `For stress reduction, creating moments of physiological calm can help shift your nervous system state. ${
                relevantMemory.length > 0 ? `Considering what you shared about ${relevantMemory[0].content.split(":")[1]}, where in your body do you feel this stress most intensely?` : 
                "Would you be open to trying a quick grounding exercise to help regulate your nervous system?"
              }`,
              `Stress management often begins with creating small pauses throughout your day. ${
                relevantMemory.length > 0 ? `Given your mention of ${relevantMemory[0].content.split(":")[1]}, what brief relaxation practices might fit into your schedule?` : 
                "Let's start with a simple relaxation technique - can you take three slow, deep breaths right now?"
              }`
            ],
            general: [
              `Let's focus on easing your ${category} with some relaxation techniques. ${
                relevantMemory.length > 0 ? `I remember you mentioned ${relevantMemory[0].content.split(":")[1]}. How are you feeling about that now?` : 
                "First, could we try a brief calming exercise to center ourselves before exploring this further?"
              }`,
              `For managing these feelings, creating moments of physiological calm can be helpful. ${
                relevantMemory.length > 0 ? `Considering what you shared about ${relevantMemory[0].content.split(":")[1]}, when do you notice these feelings intensifying?` : 
                "Would you be open to trying a quick grounding practice that might offer some immediate relief?"
              }`,
              `Addressing ${category} often begins with small self-regulation practices throughout your day. ${
                relevantMemory.length > 0 ? `Given your mention of ${relevantMemory[0].content.split(":")[1]}, what calming activities have helped you in the past?` : 
                "What simple relaxation practices have you found helpful in similar situations?"
              }`
            ]
          },
          standard_approach: {
            general: [
              `I notice you mentioned something related to ${category}. ${
                relevantMemory.length > 0 ? `Based on our previous conversations about ${relevantMemory[0].content.split(":")[1]}, how are you coping with this situation now?` : 
                "How long have you been experiencing these feelings, and what tends to trigger them?"
              }`,
              `It sounds like you're dealing with some ${category}-related concerns. ${
                relevantMemory.length > 0 ? `We've talked before about ${relevantMemory[0].content.split(":")[1]}. Has your perspective on that changed recently?` : 
                "Could you tell me more about how these experiences are affecting your daily life?"
              }`,
              `I'm hearing themes related to ${category} in what you're sharing. ${
                relevantMemory.length > 0 ? `Given what you've shared previously about ${relevantMemory[0].content.split(":")[1]}, how does this current situation compare?` : 
                "What aspects of this situation feel most important for us to focus on right now?"
              }`
            ]
          }
        };
        
        // Customize response based on detected entities, memory, and therapy mode
        if (messageContent.toLowerCase().includes("sarah") && messageContent.toLowerCase().includes("stress")) {
          const sarahResponses = responseTemplates.sarah_stress;
          aiResponse = sarahResponses[Math.floor(Math.random() * sarahResponses.length)];
        } else if (messageContent.toLowerCase().includes("presentation") || messageContent.toLowerCase().includes("assignment")) {
          const presentationResponses = responseTemplates.assignment_presentation;
          aiResponse = presentationResponses[Math.floor(Math.random() * presentationResponses.length)];
        } else if (therapyMode === 'clinical') {
          const clinicalResponses = responseTemplates.clinical_approach[category as keyof typeof responseTemplates.clinical_approach] || 
                                   responseTemplates.clinical_approach.general;
          aiResponse = clinicalResponses[Math.floor(Math.random() * clinicalResponses.length)];
        } else if (therapyMode === 'corporate') {
          const corporateResponses = responseTemplates.corporate_approach[category as keyof typeof responseTemplates.corporate_approach] || 
                                   responseTemplates.corporate_approach.general;
          aiResponse = corporateResponses[Math.floor(Math.random() * corporateResponses.length)];
        } else if (therapyMode === 'relaxation') {
          const relaxationResponses = responseTemplates.relaxation_approach[category as keyof typeof responseTemplates.relaxation_approach] || 
                                     responseTemplates.relaxation_approach.general;
          aiResponse = relaxationResponses[Math.floor(Math.random() * relaxationResponses.length)];
        } else {
          // Standard/AI mode
          const standardResponses = responseTemplates.standard_approach.general;
          aiResponse = standardResponses[Math.floor(Math.random() * standardResponses.length)];
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Enter (without shift for newline)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Focus chat input when in text mode
  useEffect(() => {
    if (chatMode === 'text' && chatInputRef.current) {
      chatInputRef.current.focus();
    }
  }, [chatMode]);

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
            
            {/* Chat input box */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Type your message here..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  ref={chatInputRef}
                  className="min-h-[50px] resize-none"
                  rows={2}
                />
                <Button 
                  onClick={handleSendMessage} 
                  disabled={isSending || !newMessage.trim()}
                  className="self-end"
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
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
            
            {/* Text input in voice mode */}
            <div className="w-full max-w-md mt-6">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Type a message instead..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="min-h-[50px] resize-none"
                  rows={1}
                />
                <Button 
                  onClick={handleSendMessage} 
                  disabled={isSending || (!newMessage.trim() && !transcript.trim())}
                  className="self-end"
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
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
