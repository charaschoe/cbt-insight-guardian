
import { Brain, LightbulbIcon, CircleCheckIcon, AlertCircleIcon } from "lucide-react";
import { useAIMode } from "@/hooks/use-ai-mode";
import { motion } from "framer-motion";

interface OnboardingReasoningProps {
  reasoning: string;
  type?: "observation" | "analysis" | "conclusion" | "memory" | "default";
  showIcon?: boolean;
  isLive?: boolean;
}

const OnboardingReasoning = ({ 
  reasoning, 
  type = "default", 
  showIcon = true,
  isLive = false
}: OnboardingReasoningProps) => {
  const { therapyMode } = useAIMode();
  
  const getIcon = () => {
    switch (type) {
      case "observation":
        return <AlertCircleIcon className="h-5 w-5 text-therapy-primary mt-0.5" />;
      case "analysis":
        return <Brain className="h-5 w-5 text-therapy-primary mt-0.5" />;
      case "conclusion":
        return <CircleCheckIcon className="h-5 w-5 text-therapy-primary mt-0.5" />;
      case "memory":
        return <LightbulbIcon className="h-5 w-5 text-therapy-primary mt-0.5" />;
      default:
        return <Brain className="h-5 w-5 text-therapy-primary mt-0.5" />;
    }
  };

  const getTitle = () => {
    switch (type) {
      case "observation":
        return "AI Observation";
      case "analysis":
        return "AI Analysis";
      case "conclusion":
        return "AI Conclusion";
      case "memory":
        return "Added to Memory";
      default:
        return "AI Reasoning Process";
    }
  };

  return (
    <motion.div 
      initial={isLive ? { opacity: 0, y: 10 } : {}}
      animate={isLive ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3 }}
      className={`border-t p-4 ${therapyMode === 'ai' ? 'bg-blue-50' : 
                                  therapyMode === 'clinical' ? 'bg-green-50' : 
                                  therapyMode === 'corporate' ? 'bg-purple-50' : 
                                  therapyMode === 'relaxation' ? 'bg-amber-50' : 
                                  'bg-muted/50'}`}
    >
      <div className="flex items-start gap-3">
        {showIcon && getIcon()}
        <div>
          <h4 className="text-sm font-medium mb-1">{getTitle()}</h4>
          <p className="text-sm text-muted-foreground">
            {reasoning}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default OnboardingReasoning;
