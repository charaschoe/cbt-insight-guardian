
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Search, Database, Share2, ChevronRight, BarChart } from "lucide-react";

export const AIResearchSequence = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = [
    {
      id: "data-collection",
      title: "Data Collection",
      description: "Gathering user input and historical data",
      icon: <Database className="h-5 w-5" />,
      details: [
        "Analyzing journal entries for emotional content",
        "Processing conversation history for recurring themes",
        "Reviewing mood tracking data for patterns",
        "Evaluating completed thought exercises and responses"
      ]
    },
    {
      id: "pattern-analysis",
      title: "Pattern Analysis",
      description: "Identifying cognitive and behavioral patterns",
      icon: <Search className="h-5 w-5" />,
      details: [
        "Running NLP algorithms to detect linguistic patterns",
        "Identifying cognitive distortions in communication",
        "Mapping emotional responses to triggers",
        "Comparing patterns to established psychological frameworks"
      ]
    },
    {
      id: "insight-generation",
      title: "Insight Generation",
      description: "Creating meaningful insights from patterns",
      icon: <Brain className="h-5 w-5" />,
      details: [
        "Correlating identified patterns with therapeutic frameworks",
        "Generating hypotheses about underlying thought processes",
        "Assessing severity and impact on daily functioning",
        "Prioritizing patterns based on frequency and intensity"
      ]
    },
    {
      id: "recommendation-engine",
      title: "Recommendation Engine",
      description: "Developing personalized recommendations",
      icon: <Share2 className="h-5 w-5" />,
      details: [
        "Matching patterns to evidence-based interventions",
        "Tailoring exercise difficulty to user engagement history",
        "Sequencing recommendations for optimal learning",
        "Adapting content based on user feedback and progress"
      ]
    },
    {
      id: "outcome-prediction",
      title: "Outcome Prediction",
      description: "Forecasting potential benefits of interventions",
      icon: <BarChart className="h-5 w-5" />,
      details: [
        "Estimating effectiveness based on similar user profiles",
        "Projecting timeline for symptom reduction",
        "Identifying potential challenges to adherence",
        "Calculating confidence intervals for improvement metrics"
      ]
    }
  ];

  const runAnimation = () => {
    setIsAnimating(true);
    setCurrentStep(0);
    
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setIsAnimating(false);
          return steps.length - 1;
        }
        return prev + 1;
      });
    }, 2000);
    
    return () => clearInterval(interval);
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-therapy-primary" />
          AI Research Sequence
        </CardTitle>
        <CardDescription>
          Visualize how our AI processes your information to generate insights
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute left-4 h-full w-0.5 bg-muted"></div>
            
            {steps.map((step, index) => (
              <div key={step.id} className="relative pl-10 pb-8">
                <div className={`absolute left-0 p-2 rounded-full transition-all duration-500 ${index <= currentStep ? 'bg-therapy-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                  {step.icon}
                </div>
                
                <div className={`transition-opacity duration-300 ${index <= currentStep ? 'opacity-100' : 'opacity-50'}`}>
                  <h3 className="font-medium flex items-center gap-2">
                    {step.title}
                    {index === currentStep && isAnimating && (
                      <div className="animate-pulse">
                        <ChevronRight className="h-4 w-4 text-therapy-primary" />
                      </div>
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                  
                  {index <= currentStep && (
                    <div className="bg-muted/30 rounded-md p-3 mt-2">
                      <ul className="text-xs space-y-1">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="rounded-full h-1.5 w-1.5 bg-therapy-primary mt-1.5"></div>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={runAnimation}
          disabled={isAnimating}
          className="w-full"
        >
          <Brain className="h-4 w-4 mr-2" />
          {isAnimating ? "Processing..." : "Visualize AI Process"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AIResearchSequence;
