
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, ArrowRight, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface AITherapyModeTabProps {
  className?: string;
}

const AITherapyModeTab = ({ className }: AITherapyModeTabProps) => {
  const navigate = useNavigate();
  
  const handleStartSession = () => {
    navigate('/chat');
  };
  
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-therapy-primary" />
          AI Therapy Sessions
        </CardTitle>
        <Badge variant="outline" className="bg-therapy-light text-therapy-primary">
          Personalized
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          <p className="text-sm text-muted-foreground">
            Our AI-powered therapy sessions are tailored to your unique needs and progress. 
            Choose a mode below to begin.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="border border-therapy-muted hover:border-therapy-primary transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-medium">CBT Session</h3>
                  <Badge variant="outline" className="text-xs">25 min</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Cognitive behavioral therapy focused on challenging negative thought patterns.
                </p>
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" className="gap-1 text-xs text-therapy-primary">
                    <PlayCircle className="h-3 w-3" />
                    Start
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-therapy-muted hover:border-therapy-primary transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-medium">Guided Meditation</h3>
                  <Badge variant="outline" className="text-xs">15 min</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Mindfulness meditation to reduce stress and increase present-moment awareness.
                </p>
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" className="gap-1 text-xs text-therapy-primary">
                    <PlayCircle className="h-3 w-3" />
                    Start
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Button 
            className="w-full mt-2 gap-1"
            onClick={handleStartSession}
          >
            Start Custom Session
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AITherapyModeTab;
