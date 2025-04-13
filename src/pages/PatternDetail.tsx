
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, ArrowLeft, LineChart, BookOpen, Clock, Calendar } from "lucide-react";

// Mock data - in a real app would come from an API/database
const patternData = {
  "rumination": {
    name: "Rumination",
    description: "A pattern of repetitive thinking, often about negative experiences or emotions",
    category: "cognitive",
    frequency: "High",
    impact: "Significant",
    firstDetected: "2023-11-15",
    examples: [
      "Journal entries show repeated references to past work conflicts",
      "Multiple mentions of regret in therapy sessions",
      "Circular thinking patterns about past decisions"
    ],
    triggers: [
      "Work stress",
      "Social rejection",
      "Evening solitude"
    ],
    recommendations: [
      {
        id: "mindfulness-meditation",
        title: "Mindfulness Meditation",
        description: "Practice staying present to reduce rumination"
      },
      {
        id: "thought-stopping",
        title: "Thought Stopping Technique",
        description: "Learn to interrupt rumination cycles"
      },
      {
        id: "behavioral-activation",
        title: "Behavioral Activation",
        description: "Engage in enjoyable activities to break rumination"
      }
    ],
    trends: [
      { date: "Week 1", value: 85 },
      { date: "Week 2", value: 82 },
      { date: "Week 3", value: 78 },
      { date: "Week 4", value: 72 },
      { date: "Week 5", value: 75 },
      { date: "Week 6", value: 68 },
    ]
  },
  "career-anxiety": {
    name: "Career Anxiety",
    description: "Persistent worry about professional future and work performance",
    category: "situational",
    frequency: "Medium",
    impact: "Moderate",
    firstDetected: "2023-12-03",
    examples: [
      "Consistent mentions of workplace stress",
      "Concerns about performance evaluations",
      "Worry about job security and advancement"
    ],
    triggers: [
      "Performance reviews",
      "Team meetings",
      "Comparing to colleagues"
    ],
    recommendations: [
      {
        id: "cognitive-reframing",
        title: "Cognitive Reframing",
        description: "Challenge catastrophic thinking about career"
      },
      {
        id: "career-values",
        title: "Career Values Assessment",
        description: "Clarify what truly matters in your professional life"
      },
      {
        id: "anxiety-management",
        title: "Workplace Anxiety Management",
        description: "Techniques for managing anxiety in professional settings"
      }
    ],
    trends: [
      { date: "Week 1", value: 72 },
      { date: "Week 2", value: 75 },
      { date: "Week 3", value: 68 },
      { date: "Week 4", value: 64 },
      { date: "Week 5", value: 62 },
      { date: "Week 6", value: 58 },
    ]
  },
  "all-or-nothing": {
    name: "All-or-Nothing Thinking",
    description: "Viewing situations in black-and-white terms without acknowledging middle ground",
    category: "cognitive",
    frequency: "Medium",
    impact: "Moderate",
    firstDetected: "2023-10-22",
    examples: [
      "Uses absolute terms like \"always\" and \"never\"",
      "Expresses perfectionist tendencies",
      "Views partial success as complete failure"
    ],
    triggers: [
      "Making mistakes",
      "Receiving feedback",
      "Comparing to ideals"
    ],
    recommendations: [
      {
        id: "grey-thinking",
        title: "Grey Thinking Exercise",
        description: "Practice finding middle ground between extremes"
      },
      {
        id: "cognitive-distortions",
        title: "Cognitive Distortions Challenge",
        description: "Identify and counter black-and-white thinking"
      },
      {
        id: "perfectionism-workbook",
        title: "Perfectionism Workbook",
        description: "Structured exercises to address perfectionism"
      }
    ],
    trends: [
      { date: "Week 1", value: 68 },
      { date: "Week 2", value: 65 },
      { date: "Week 3", value: 63 },
      { date: "Week 4", value: 60 },
      { date: "Week 5", value: 62 },
      { date: "Week 6", value: 55 },
    ]
  }
};

const PatternDetail = () => {
  const { patternId } = useParams<{ patternId: string }>();
  
  // Check if pattern exists
  if (!patternId || !patternData[patternId as keyof typeof patternData]) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-semibold mb-4">Pattern Not Found</h1>
          <p className="text-muted-foreground mb-6">The pattern you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/analysis">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to AI Analysis
            </Link>
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  const pattern = patternData[patternId as keyof typeof patternData];

  return (
    <MainLayout>
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-2">
          <Link to="/analysis">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Analysis
          </Link>
        </Button>
        
        <div className="flex items-center gap-3">
          <TrendingUp className="h-6 w-6 text-therapy-primary" />
          <div>
            <h1 className="text-2xl font-semibold">{pattern.name}</h1>
            <p className="text-muted-foreground">{pattern.description}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-md">
          <Badge>{pattern.category}</Badge>
          <span className="text-sm">Category</span>
        </div>
        <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-md">
          <Badge>{pattern.frequency}</Badge>
          <span className="text-sm">Frequency</span>
        </div>
        <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-md">
          <Badge>{pattern.impact}</Badge>
          <span className="text-sm">Impact</span>
        </div>
        <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-md">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">First detected: {pattern.firstDetected}</span>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="exercises">Recommended Exercises</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Examples Detected</CardTitle>
                <CardDescription>How this pattern appears in your communication</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {pattern.examples.map((example, index) => (
                    <li key={index} className="p-3 bg-muted/30 rounded-md text-sm flex gap-2">
                      <div className="rounded-full h-2 w-2 bg-therapy-primary mt-1.5 flex-shrink-0"></div>
                      {example}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Common Triggers</CardTitle>
                <CardDescription>Situations that often activate this pattern</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {pattern.triggers.map((trigger, index) => (
                    <li key={index} className="p-3 bg-muted/30 rounded-md text-sm flex gap-2">
                      <div className="rounded-full h-2 w-2 bg-amber-500 mt-1.5 flex-shrink-0"></div>
                      {trigger}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Brain className="h-4 w-4 mr-2" />
                  Identify More Triggers
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Pattern Frequency Over Time</CardTitle>
              <CardDescription>How often this pattern has been detected in your data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full bg-muted/30 rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Pattern frequency chart visualization</p>
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-3">AI Analysis</h3>
                <p className="text-sm p-4 border rounded-md">
                  This pattern has shown a {pattern.trends[0].value > pattern.trends[pattern.trends.length-1].value ? 'decline' : 'increase'} over the past 6 weeks. 
                  The frequency has decreased from {pattern.trends[0].value}% to {pattern.trends[pattern.trends.length-1].value}%, 
                  suggesting your work with cognitive exercises is having a positive effect. 
                  Continue with the recommended exercises to further reduce this pattern.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <LineChart className="h-4 w-4 mr-2" />
                View Detailed Analytics
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="exercises">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Exercises to Address This Pattern</h3>
            
            {pattern.recommendations.map((exercise, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-md flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-therapy-primary" />
                    {exercise.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{exercise.description}</p>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Clock className="h-4 w-4" />
                    <span>Estimated time: 10-15 minutes</span>
                  </div>
                  
                  <Button asChild className="w-full">
                    <Link to={`/exercises/${exercise.id}`}>
                      Start Exercise
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default PatternDetail;
