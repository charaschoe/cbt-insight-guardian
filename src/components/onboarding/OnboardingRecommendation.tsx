
import { useEffect, useState } from "react";
import { useOnboarding } from "@/hooks/use-onboarding";
import { Brain, Briefcase, Circle, MoveRight, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const OnboardingRecommendation = () => {
  const { 
    determineRecommendedMode, 
    completeOnboarding, 
    profileData 
  } = useOnboarding();
  
  const [analyzing, setAnalyzing] = useState(true);
  const [progress, setProgress] = useState(0);
  const [recommendedMode, setRecommendedMode] = useState<'clinical' | 'ai' | 'corporate' | null>(null);
  
  // Simulate analysis process
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 5;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setAnalyzing(false);
            setRecommendedMode(determineRecommendedMode());
          }, 500);
          return 100;
        }
        return next;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, [determineRecommendedMode]);
  
  if (analyzing) {
    return (
      <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-card p-6 rounded-xl shadow-lg space-y-6 text-center">
          <h2 className="text-xl font-semibold">Analyzing Your Responses</h2>
          <p className="text-muted-foreground">
            We're determining the best experience based on your unique needs...
          </p>
          <Progress value={progress} className="h-2 w-full" />
          <div className="flex justify-center gap-3">
            <Circle className="h-4 w-4 animate-pulse text-therapy-primary" />
            <Circle className="h-4 w-4 animate-pulse text-therapy-primary animation-delay-200" />
            <Circle className="h-4 w-4 animate-pulse text-therapy-primary animation-delay-400" />
          </div>
        </div>
      </div>
    );
  }
  
  const modeInfo = {
    'clinical': {
      title: 'Clinical Support Mode',
      icon: Stethoscope,
      description: 'Recommended for users experiencing significant distress or with complex mental health needs.',
      features: [
        'Access to clinical frameworks',
        'Crisis resources and safety planning',
        'Progress tracking with clinical metrics',
        'Integration with therapy sessions'
      ]
    },
    'ai': {
      title: 'AI Self-Therapy Mode',
      icon: Brain,
      description: 'Ideal for self-exploration and mild to moderate mental health concerns.',
      features: [
        'Advanced AI pattern recognition',
        'Personalized insights and recommendations',
        'Research-backed interventions',
        'Self-guided therapeutic exercises'
      ]
    },
    'corporate': {
      title: 'Corporate Wellness Mode',
      icon: Briefcase,
      description: 'Designed for workplace wellness and professional development needs.',
      features: [
        'Work-life balance optimization',
        'Stress management techniques',
        'Professional development insights',
        'Goal setting and tracking'
      ]
    }
  };
  
  if (!recommendedMode) return null;
  
  const { title, icon: Icon, description, features } = modeInfo[recommendedMode];
  
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card p-6 rounded-xl shadow-lg space-y-6">
        <div className="space-y-2 text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
        
        <div className="rounded-lg bg-muted p-4">
          <p className="font-medium mb-2">Your experience will include:</p>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <Circle className="h-2 w-2 fill-current text-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        {profileData.name && (
          <p className="text-center text-muted-foreground">
            Welcome, {profileData.name}! We're excited to support your journey.
          </p>
        )}
        
        <Button 
          onClick={completeOnboarding} 
          className="w-full"
        >
          Begin Your Journey
          <MoveRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default OnboardingRecommendation;
