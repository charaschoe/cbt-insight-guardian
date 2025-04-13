
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, ArrowLeft, FileText, BookOpen, AlertTriangle, ExternalLink } from "lucide-react";

// Mock data - in a real app would come from an API/database
const themeData = {
  "catastrophizing": {
    name: "Catastrophizing",
    description: "Tendency to assume the worst possible outcome in situations",
    category: "cognitive",
    matchScore: 78,
    examples: [
      "\"If I fail this presentation, my career is over\"",
      "\"Making a mistake means everyone will lose respect for me\"",
      "\"If I get rejected from this job, I'll never find employment\""
    ],
    alternatives: [
      "\"If I don't perform perfectly, I might get feedback to improve\"",
      "\"One mistake doesn't define my whole professional identity\"",
      "\"Rejection is part of the process and helps me find the right fit\""
    ],
    exercises: [
      {
        id: "catastrophe-scale",
        title: "Catastrophe Scale Exercise",
        description: "Rate potential outcomes on a scale to gain perspective"
      },
      {
        id: "evidence-examination",
        title: "Evidence Examination",
        description: "Analyze evidence for and against worst-case scenarios"
      },
      {
        id: "decatastrophizing",
        title: "Decatastrophizing Script",
        description: "Step-by-step process to reframe catastrophic thoughts"
      }
    ],
    resources: [
      {
        title: "Understanding Catastrophizing",
        type: "article",
        link: "#"
      },
      {
        title: "Breaking the Cycle of Catastrophic Thinking",
        type: "video",
        link: "#"
      },
      {
        title: "CBT Techniques for Catastrophizing",
        type: "workbook",
        link: "#"
      }
    ]
  },
  "mind-reading": {
    name: "Mind Reading",
    description: "Assuming you know what others are thinking without evidence",
    category: "cognitive",
    matchScore: 65,
    examples: [
      "\"They didn't reply to my email, they must be angry with me\"",
      "\"My boss thinks I'm incompetent based on their expression\"",
      "\"Everyone at the meeting noticed my nervous voice\""
    ],
    alternatives: [
      "\"There could be many reasons they haven't replied to my email yet\"",
      "\"I don't know what my boss is thinking without asking directly\"",
      "\"People are usually focused on themselves, not scrutinizing me\""
    ],
    exercises: [
      {
        id: "assumption-testing",
        title: "Assumption Testing",
        description: "Learn to test your mind-reading assumptions with evidence"
      },
      {
        id: "perspective-taking",
        title: "Perspective Taking Exercise",
        description: "Practice seeing situations from others' viewpoints"
      },
      {
        id: "communication-skills",
        title: "Direct Communication Practice",
        description: "Learn to ask clarifying questions instead of assuming"
      }
    ],
    resources: [
      {
        title: "The Mind Reading Trap",
        type: "article",
        link: "#"
      },
      {
        title: "Overcoming Mind Reading Tendencies",
        type: "audio",
        link: "#"
      },
      {
        title: "CBT Workbook: Mind Reading",
        type: "workbook",
        link: "#"
      }
    ]
  }
};

const ThemeDetail = () => {
  const { themeId } = useParams<{ themeId: string }>();
  
  // Check if theme exists
  if (!themeId || !themeData[themeId as keyof typeof themeData]) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-semibold mb-4">Theme Not Found</h1>
          <p className="text-muted-foreground mb-6">The thinking pattern you're looking for doesn't exist or has been removed.</p>
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
  
  const theme = themeData[themeId as keyof typeof themeData];

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
          <Brain className="h-6 w-6 text-therapy-primary" />
          <div>
            <h1 className="text-2xl font-semibold">{theme.name}</h1>
            <p className="text-muted-foreground">{theme.description}</p>
          </div>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <Badge variant="outline" className="bg-therapy-light">
          {theme.category} pattern
        </Badge>
        <Badge variant="outline" className="bg-therapy-light">
          {theme.matchScore}% Match
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Pattern Examples
            </CardTitle>
            <CardDescription>Examples of this thinking pattern in your communication</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {theme.examples.map((example, index) => (
                <li key={index} className="p-3 bg-red-50 border border-red-100 rounded-md text-sm">
                  {example}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-green-600" />
              Alternative Perspectives
            </CardTitle>
            <CardDescription>Healthier ways to think about similar situations</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {theme.alternatives.map((alternative, index) => (
                <li key={index} className="p-3 bg-green-50 border border-green-100 rounded-md text-sm">
                  {alternative}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-therapy-primary" />
            Recommended Exercises
          </CardTitle>
          <CardDescription>
            Exercises specifically designed to address this thinking pattern
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {theme.exercises.map((exercise, index) => (
              <Card key={index} className="border">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">{exercise.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <p className="text-sm text-muted-foreground mb-4">{exercise.description}</p>
                  <Button asChild size="sm" className="w-full">
                    <Link to={`/exercises/${exercise.id}`}>
                      Start Exercise
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-therapy-primary" />
            Additional Resources
          </CardTitle>
          <CardDescription>
            Learn more about this thinking pattern and how to overcome it
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {theme.resources.map((resource, index) => (
              <Card key={index} className="border">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Badge variant="outline">{resource.type}</Badge>
                    <div>
                      <h4 className="font-medium text-sm mb-2">{resource.title}</h4>
                      <Button asChild size="sm" variant="ghost" className="p-0 h-auto">
                        <a href={resource.link} className="flex items-center gap-1 text-xs text-therapy-primary">
                          <ExternalLink className="h-3 w-3" />
                          View Resource
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default ThemeDetail;
