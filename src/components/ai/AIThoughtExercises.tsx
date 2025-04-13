
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Lightbulb, Brain, CheckCircle, RefreshCw, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for thought exercises - in a real app this would come from AI recommendations
const mockExercises = [
  {
    id: "cognitive-reframing",
    title: "Cognitive Reframing",
    description: "Practice identifying and challenging negative thought patterns",
    difficulty: "medium",
    duration: "10 min",
    targetPatterns: ["catastrophizing", "all-or-nothing"],
    steps: [
      "Identify a recent negative thought",
      "Question the evidence supporting this thought",
      "Generate 3 alternative interpretations",
      "Choose the most realistic interpretation"
    ],
    completed: false
  },
  {
    id: "mindful-observation",
    title: "Mindful Observation",
    description: "Reduce rumination by practicing present-moment awareness",
    difficulty: "easy",
    duration: "5 min",
    targetPatterns: ["rumination", "anxiety"],
    steps: [
      "Find a comfortable position",
      "Focus attention on your breathing",
      "When thoughts arise, acknowledge them without judgment",
      "Gently return focus to your breath"
    ],
    completed: false
  },
  {
    id: "thought-record",
    title: "CBT Thought Record",
    description: "Document and analyze thoughts to identify distortions",
    difficulty: "hard",
    duration: "15 min",
    targetPatterns: ["mind-reading", "emotional-reasoning"],
    steps: [
      "Describe the situation that triggered negative emotions",
      "Record automatic thoughts that occurred",
      "Identify emotions and their intensity (0-100)",
      "List evidence that supports and contradicts each thought",
      "Develop a balanced alternative perspective"
    ],
    completed: false
  }
];

export const AIThoughtExercises = () => {
  const [exercises, setExercises] = useState(mockExercises);
  const [difficultyFilter, setDifficultyFilter] = useState<string[]>([]);
  const [durationFilter, setDurationFilter] = useState<string[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter exercises based on selected filters
  const filteredExercises = exercises.filter(exercise => {
    const difficultyMatch = difficultyFilter.length === 0 || difficultyFilter.includes(exercise.difficulty);
    const durationMatch = durationFilter.length === 0 || 
      (durationFilter.includes("short") && exercise.duration === "5 min") ||
      (durationFilter.includes("medium") && exercise.duration === "10 min") ||
      (durationFilter.includes("long") && exercise.duration === "15 min");
    
    return difficultyMatch && durationMatch;
  });

  const markAsCompleted = (id: string) => {
    setExercises(exercises.map(ex => 
      ex.id === id ? { ...ex, completed: true } : ex
    ));
  };

  const refreshExercises = () => {
    setIsRefreshing(true);
    // Simulate API call to get new exercises from AI
    setTimeout(() => {
      setIsRefreshing(false);
      // In a real app, this would be replaced with actual AI recommendations
    }, 1500);
  };

  const DifficultyBadge = ({ level }: { level: string }) => {
    switch(level) {
      case 'easy':
        return <Badge className="bg-green-500">Easy</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500">Medium</Badge>;
      case 'hard':
        return <Badge className="bg-red-500">Challenging</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-therapy-primary" />
          Daily Thought Exercises
        </CardTitle>
        <CardDescription>
          Personalized exercises based on your identified thought patterns
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Difficulty:</p>
            <ToggleGroup 
              type="multiple" 
              variant="outline"
              value={difficultyFilter}
              onValueChange={setDifficultyFilter}
            >
              <ToggleGroupItem value="easy" size="sm">Easy</ToggleGroupItem>
              <ToggleGroupItem value="medium" size="sm">Medium</ToggleGroupItem>
              <ToggleGroupItem value="hard" size="sm">Hard</ToggleGroupItem>
            </ToggleGroup>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Duration:</p>
            <ToggleGroup 
              type="multiple" 
              variant="outline"
              value={durationFilter}
              onValueChange={setDurationFilter}
            >
              <ToggleGroupItem value="short" size="sm">Short</ToggleGroupItem>
              <ToggleGroupItem value="medium" size="sm">Medium</ToggleGroupItem>
              <ToggleGroupItem value="long" size="sm">Long</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        <div className="space-y-3">
          {isRefreshing ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-therapy-primary"></div>
            </div>
          ) : filteredExercises.length > 0 ? (
            filteredExercises.map((exercise) => (
              <div 
                key={exercise.id} 
                className={`border rounded-lg p-4 hover:border-therapy-primary transition-all ${exercise.completed ? 'bg-green-50 border-green-200' : ''}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium flex items-center gap-2">
                    {exercise.completed && <CheckCircle className="h-4 w-4 text-green-500" />}
                    {exercise.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{exercise.duration}</Badge>
                    <DifficultyBadge level={exercise.difficulty} />
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{exercise.description}</p>
                
                <div className="mb-3">
                  <p className="text-xs font-medium mb-1">Targets patterns:</p>
                  <div className="flex flex-wrap gap-1">
                    {exercise.targetPatterns.map((pattern, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs bg-therapy-light">
                        {pattern}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button 
                    asChild
                    size="sm" 
                    variant="outline" 
                    className={exercise.completed ? 'border-green-500 text-green-700' : ''}
                  >
                    <Link to={`/exercises/${exercise.id}`}>
                      <BookOpen className="h-4 w-4 mr-2" />
                      {exercise.completed ? 'Review Exercise' : 'Start Exercise'}
                    </Link>
                  </Button>
                  
                  {!exercise.completed && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => markAsCompleted(exercise.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark as Completed
                    </Button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 border rounded-lg">
              <p className="text-muted-foreground">No exercises match your filters</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={refreshExercises}
          disabled={isRefreshing}
          variant="outline"
          className="w-full"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Generating Exercises...' : 'Refresh Exercises'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AIThoughtExercises;
