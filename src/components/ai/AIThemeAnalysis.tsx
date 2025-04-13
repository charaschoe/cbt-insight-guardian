
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, FileText, Zap, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for theme analysis - in a real app this would come from AI analysis
const mockThemes = {
  cognitive: [
    {
      id: "catastrophizing",
      name: "Catastrophizing",
      description: "Tendency to assume the worst possible outcome in situations",
      matchScore: 78,
      examples: [
        "\"If I fail this presentation, my career is over\"",
        "\"Making a mistake means everyone will lose respect for me\""
      ],
      resourceLink: "/themes/catastrophizing"
    },
    {
      id: "mind-reading",
      name: "Mind Reading",
      description: "Assuming you know what others are thinking without evidence",
      matchScore: 65,
      examples: [
        "\"They didn't reply to my email, they must be angry with me\"",
        "\"My boss thinks I'm incompetent based on their expression\""
      ],
      resourceLink: "/themes/mind-reading"
    }
  ],
  emotional: [
    {
      id: "rejection-sensitivity",
      name: "Rejection Sensitivity",
      description: "Heightened emotional response to perceived rejection",
      matchScore: 82,
      examples: [
        "Strong emotional response to minor social slights",
        "Avoidance of social situations due to fear of rejection"
      ],
      resourceLink: "/themes/rejection-sensitivity"
    },
    {
      id: "emotional-reasoning",
      name: "Emotional Reasoning",
      description: "Taking feelings as evidence for truth",
      matchScore: 71,
      examples: [
        "\"I feel inadequate, so I must be inadequate\"",
        "\"I feel anxious about the trip, so it must be dangerous\""
      ],
      resourceLink: "/themes/emotional-reasoning"
    }
  ],
  behavioral: [
    {
      id: "avoidance",
      name: "Avoidance Behavior",
      description: "Tendency to avoid situations that cause anxiety",
      matchScore: 83,
      examples: [
        "Putting off difficult conversations",
        "Skipping social events due to anxiety"
      ],
      resourceLink: "/themes/avoidance"
    },
    {
      id: "procrastination",
      name: "Procrastination",
      description: "Delaying important tasks despite negative consequences",
      matchScore: 75,
      examples: [
        "Waiting until deadlines to start work",
        "Repeatedly postponing making important decisions"
      ],
      resourceLink: "/themes/procrastination"
    }
  ]
};

export const AIThemeAnalysis = () => {
  const [activeTab, setActiveTab] = useState<string>("cognitive");
  const [isShowingAIProcess, setIsShowingAIProcess] = useState<boolean>(false);

  const handleShowAIProcess = () => {
    setIsShowingAIProcess(!isShowingAIProcess);
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-therapy-primary" />
          Thinking Pattern Analysis
        </CardTitle>
        <CardDescription>
          AI-identified thinking patterns based on your communication and behavior
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="cognitive" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="cognitive">Cognitive</TabsTrigger>
            <TabsTrigger value="emotional">Emotional</TabsTrigger>
            <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
          </TabsList>

          {Object.keys(mockThemes).map((category) => (
            <TabsContent key={category} value={category} className="space-y-4">
              {mockThemes[category as keyof typeof mockThemes].map((theme) => (
                <div key={theme.id} className="border rounded-lg p-4 hover:border-therapy-primary transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium flex items-center gap-2">
                      <Zap className="h-4 w-4 text-therapy-primary" />
                      {theme.name}
                    </h3>
                    <Badge variant="outline" className="bg-therapy-light">
                      {theme.matchScore}% Match
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{theme.description}</p>
                  
                  <div className="bg-muted/30 p-3 rounded-md mb-3">
                    <p className="text-xs font-medium mb-1">Examples in your communication:</p>
                    <ul className="text-xs space-y-1 list-disc pl-4">
                      {theme.examples.map((example, i) => (
                        <li key={i}>{example}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button asChild size="sm" variant="outline" className="w-full">
                    <Link to={theme.resourceLink}>
                      <FileText className="h-4 w-4 mr-2" />
                      Learn More About This Pattern
                    </Link>
                  </Button>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>

        {isShowingAIProcess && (
          <div className="border rounded-md p-4 mt-4 bg-muted/20">
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <Brain className="h-4 w-4 text-therapy-primary" />
              AI Analysis Process
            </h4>
            <ol className="text-xs space-y-2 list-decimal pl-4">
              <li className="p-1">Data collection from journal entries, chat conversations, and mood tracking</li>
              <li className="p-1">Natural language processing to identify emotional patterns and recurring themes</li>
              <li className="p-1">Classification of language against CBT cognitive distortion frameworks</li>
              <li className="p-1">Pattern recognition across temporal data to identify situational triggers</li>
              <li className="p-1">Insight generation through comparative analysis with therapeutic frameworks</li>
            </ol>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button 
          onClick={handleShowAIProcess} 
          variant="ghost" 
          size="sm"
          className="w-full"
        >
          {isShowingAIProcess ? "Hide AI Process" : "Show AI Analysis Process"}
        </Button>
        <Button asChild variant="outline" size="sm" className="w-full">
          <Link to="/themes">
            <ExternalLink className="h-4 w-4 mr-2" />
            Explore All Thinking Patterns
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AIThemeAnalysis;
