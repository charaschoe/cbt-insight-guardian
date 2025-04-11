
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Brain, MessageSquare, Activity, AlertTriangle, Clock, Heart } from "lucide-react";

const AIFramework = () => {
  const aiCapabilities = [
    {
      title: "Contextually-Aware Conversation",
      icon: Brain,
      description: "Long-term memory across sessions, tracking therapeutic progress and emotional history",
      tech: ["Persistent memory architecture", "Conversational state tracking", "Emotional intelligence"]
    },
    {
      title: "Therapy-Fine-Tuned LLMs",
      icon: MessageSquare,
      description: "Specialized models adapted to CBT with knowledge of thought distortions and coping strategies",
      tech: ["CBT transcript fine-tuning", "Psychotherapy frameworks", "Reinforcement learning"]
    },
    {
      title: "Socratic Dialogue Engine",
      icon: Activity,
      description: "Guiding users through self-discovery with smart, open-ended questions",
      tech: ["Guided questioning strategies", "Cognitive distortion detection", "Adaptive pacing"]
    },
    {
      title: "Emotion & Intent Recognition",
      icon: Heart,
      description: "Detecting user emotions and intentions to guide conversation intelligently",
      tech: ["Affective computing", "Intent classification", "Emotional pattern recognition"]
    },
    {
      title: "Safety & Bias Mitigation",
      icon: AlertTriangle,
      description: "Risk assessment and ethical guardrails ensuring appropriate care",
      tech: ["Risk triage system", "Content filters", "Human fallback mechanisms"]
    },
    {
      title: "Multimodal Integration",
      icon: Clock,
      description: "Processing text, voice, and visual cues for comprehensive user understanding",
      tech: ["Speech recognition", "Emotion analysis", "Adaptive response timing"]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Advanced AI Framework</h2>
        <p className="text-muted-foreground">
          Our platform leverages cutting-edge AI technologies to provide natural, human-like therapeutic interactions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {aiCapabilities.map((capability, index) => (
          <Card key={index} className="border-therapy-muted hover:border-therapy-primary transition-colors">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-therapy-primary/10 p-2">
                  <capability.icon className="h-5 w-5 text-therapy-primary" />
                </div>
                <CardTitle className="text-base">{capability.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-2">{capability.description}</CardDescription>
              <div className="space-y-1 mt-3">
                {capability.tech.map((tech, idx) => (
                  <div key={idx} className="text-xs px-2 py-1 bg-therapy-light rounded-sm">
                    {tech}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AIFramework;
