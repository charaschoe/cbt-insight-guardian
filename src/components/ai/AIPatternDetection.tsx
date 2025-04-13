
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, Lightbulb, Activity } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for pattern detection - in a real app this would come from AI analysis
const mockPatterns = [
  {
    id: "rumination",
    name: "Rumination",
    description: "Tendency to dwell on negative past experiences",
    frequency: "High",
    examples: [
      "Journal entries show repeated references to past work conflicts",
      "Multiple mentions of regret in therapy sessions"
    ],
    severity: "moderate",
    category: "cognitive"
  },
  {
    id: "career-anxiety",
    name: "Career Anxiety",
    description: "Recurring worries about professional future",
    frequency: "Medium",
    examples: [
      "Consistent mentions of workplace stress",
      "Concerns about performance evaluations"
    ],
    severity: "high",
    category: "situational"
  },
  {
    id: "all-or-nothing",
    name: "All-or-Nothing Thinking",
    description: "Viewing situations in black-and-white terms",
    frequency: "Medium",
    examples: [
      "Uses absolute terms like \"always\" and \"never\"",
      "Expresses perfectionist tendencies"
    ],
    severity: "low",
    category: "cognitive"
  }
];

export const AIPatternDetection = () => {
  const [patterns, setPatterns] = useState(mockPatterns);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter patterns by category when selectedCategory changes
  const filteredPatterns = selectedCategory 
    ? patterns.filter(pattern => pattern.category === selectedCategory)
    : patterns;

  const refreshPatterns = () => {
    setIsLoading(true);
    // Simulate API call to get new patterns from AI
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, this would be replaced with actual AI analysis results
    }, 1500);
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-therapy-primary" />
          AI Pattern Detection
        </CardTitle>
        <CardDescription>
          Our AI has analyzed your journal entries, therapy sessions, and mood tracking data to identify recurring patterns
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge 
            className={`cursor-pointer ${selectedCategory === null ? 'bg-therapy-primary' : 'bg-muted hover:bg-therapy-primary/50'}`}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Badge>
          <Badge 
            className={`cursor-pointer ${selectedCategory === 'cognitive' ? 'bg-therapy-primary' : 'bg-muted hover:bg-therapy-primary/50'}`}
            onClick={() => setSelectedCategory('cognitive')}
          >
            Cognitive
          </Badge>
          <Badge 
            className={`cursor-pointer ${selectedCategory === 'situational' ? 'bg-therapy-primary' : 'bg-muted hover:bg-therapy-primary/50'}`}
            onClick={() => setSelectedCategory('situational')}
          >
            Situational
          </Badge>
          <Badge 
            className={`cursor-pointer ${selectedCategory === 'emotional' ? 'bg-therapy-primary' : 'bg-muted hover:bg-therapy-primary/50'}`}
            onClick={() => setSelectedCategory('emotional')}
          >
            Emotional
          </Badge>
        </div>

        <div className="space-y-3">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-therapy-primary"></div>
            </div>
          ) : (
            filteredPatterns.map((pattern) => (
              <div key={pattern.id} className="border rounded-lg p-4 transition-all hover:border-therapy-primary">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-therapy-primary" />
                      {pattern.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{pattern.description}</p>
                  </div>
                  <Badge variant={pattern.severity === "high" ? "destructive" : pattern.severity === "moderate" ? "outline" : "secondary"}>
                    {pattern.frequency}
                  </Badge>
                </div>
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground mb-1">Examples detected:</p>
                  <ul className="text-xs space-y-1 list-disc pl-4">
                    {pattern.examples.map((example, i) => (
                      <li key={i}>{example}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-3">
                  <Button asChild size="sm" variant="outline" className="w-full">
                    <Link to={`/patterns/${pattern.id}`}>
                      Explore This Pattern
                    </Link>
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={refreshPatterns} 
          disabled={isLoading}
          variant="outline" 
          className="w-full"
        >
          <Activity className="h-4 w-4 mr-2" />
          {isLoading ? "Analyzing Data..." : "Refresh Pattern Analysis"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AIPatternDetection;
