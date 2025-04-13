
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, CheckCircle, Brain, Clock, ArrowRight } from "lucide-react";

// Mock data - in a real app would come from an API/database
const exercisesData = {
  "cognitive-reframing": {
    title: "Cognitive Reframing Exercise",
    description: "Practice identifying and challenging negative thought patterns",
    difficulty: "medium",
    duration: "10 min",
    targetPatterns: ["catastrophizing", "all-or-nothing"],
    instructions: "Cognitive reframing is a technique used to identify negative or unhelpful thought patterns and replace them with more positive and realistic ones. This exercise will guide you through the process of identifying and challenging a negative thought.",
    steps: [
      {
        title: "Identify the Negative Thought",
        description: "Write down a recent negative thought that caused you distress. Be as specific as possible.",
        inputType: "textarea",
        placeholder: "e.g., \"If I make a mistake in my presentation, everyone will think I'm incompetent.\"",
        aiPrompt: "Think about a recent situation where you felt anxious, sad, or stressed. What thoughts were going through your mind?"
      },
      {
        title: "Identify the Evidence",
        description: "List the evidence that supports this negative thought.",
        inputType: "textarea",
        placeholder: "e.g., \"I stumbled over my words in a previous presentation.\"",
        aiPrompt: "What facts or experiences make you believe this thought is true?"
      },
      {
        title: "Challenge the Evidence",
        description: "Now list evidence that contradicts or doesn't support this negative thought.",
        inputType: "textarea",
        placeholder: "e.g., \"I've given successful presentations before. One mistake doesn't define my abilities.\"",
        aiPrompt: "What facts or experiences suggest this thought might not be entirely accurate?"
      },
      {
        title: "Create a Balanced Alternative",
        description: "Based on all the evidence, write a more balanced and realistic alternative to your original thought.",
        inputType: "textarea",
        placeholder: "e.g., \"I might make mistakes in my presentation, but that's normal and doesn't mean I'm incompetent.\"",
        aiPrompt: "Considering both supporting and contradicting evidence, what's a more balanced way to think about this situation?"
      }
    ],
    aiInsight: "Cognitive reframing is particularly effective for addressing catastrophizing and all-or-nothing thinking. By systematically challenging negative thoughts and finding balanced alternatives, you can reduce anxiety and improve your emotional response to challenging situations."
  },
  "mindful-observation": {
    title: "Mindful Observation Exercise",
    description: "Reduce rumination by practicing present-moment awareness",
    difficulty: "easy",
    duration: "5 min",
    targetPatterns: ["rumination", "anxiety"],
    instructions: "Mindful observation is a simple technique that helps bring your attention to the present moment, reducing rumination and anxiety. This exercise will guide you through the process of focused attention and present-moment awareness.",
    steps: [
      {
        title: "Find a Comfortable Position",
        description: "Sit in a comfortable position with your back straight but not tense. You can close your eyes or keep them open with a soft gaze.",
        inputType: "checkbox",
        placeholder: "I've found a comfortable position",
        aiPrompt: "Take a moment to find a position where you can be comfortable but alert."
      },
      {
        title: "Focus on Your Breath",
        description: "Bring your attention to your breathing. Notice the sensation of air entering and leaving your body. Don't try to control your breath, just observe it naturally.",
        inputType: "checkbox",
        placeholder: "I've focused on my breath for at least 1 minute",
        aiPrompt: "Can you notice the feeling of your breath? Where do you feel it most prominently?"
      },
      {
        title: "Notice Wandering Thoughts",
        description: "When you notice your mind wandering (which is completely normal), gently acknowledge the thoughts without judgment, and return your focus to your breath.",
        inputType: "textarea",
        placeholder: "e.g., \"My mind wandered to my to-do list three times. I noticed without judgment and returned to my breath.\"",
        aiPrompt: "What thoughts arose during this practice? How did you respond to them?"
      },
      {
        title: "Reflect on the Experience",
        description: "Take a moment to reflect on how you feel after this brief mindfulness practice.",
        inputType: "textarea",
        placeholder: "e.g., \"I feel calmer and more centered. My thoughts seem less overwhelming.\"",
        aiPrompt: "How do you feel now compared to before the exercise? What did you notice about your experience?"
      }
    ],
    aiInsight: "Regular mindfulness practice has been shown to reduce rumination and anxiety by strengthening your ability to observe thoughts without becoming caught up in them. Even short sessions can interrupt negative thought patterns and create space for more balanced thinking."
  }
};

const ExerciseDetail = () => {
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);
  
  // Check if exercise exists
  if (!exerciseId || !exercisesData[exerciseId as keyof typeof exercisesData]) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-semibold mb-4">Exercise Not Found</h1>
          <p className="text-muted-foreground mb-6">The exercise you're looking for doesn't exist or has been removed.</p>
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
  
  const exercise = exercisesData[exerciseId as keyof typeof exercisesData];
  
  const handleNext = () => {
    if (currentStep < exercise.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleResponseChange = (value: string) => {
    const newResponses = [...responses];
    newResponses[currentStep] = value;
    setResponses(newResponses);
  };
  
  return (
    <MainLayout>
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-2">
          <Link to="/analysis">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Exercises
          </Link>
        </Button>
        
        <div className="flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-therapy-primary" />
          <div>
            <h1 className="text-2xl font-semibold">{exercise.title}</h1>
            <p className="text-muted-foreground">{exercise.description}</p>
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-md">
          <Badge variant={exercise.difficulty === "easy" ? "outline" : exercise.difficulty === "medium" ? "secondary" : "destructive"}>
            {exercise.difficulty}
          </Badge>
          <span className="text-sm">Difficulty</span>
        </div>
        <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-md">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{exercise.duration}</span>
        </div>
        <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-md">
          <span className="text-sm">Targets:</span>
          <div className="flex gap-1">
            {exercise.targetPatterns.map((pattern, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {pattern}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {!completed ? (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center mb-2">
              <Badge variant="outline">{`Step ${currentStep + 1} of ${exercise.steps.length}`}</Badge>
              <div className="flex space-x-1">
                {exercise.steps.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 w-8 rounded-full ${
                      idx === currentStep ? 'bg-therapy-primary' : 
                      idx < currentStep ? 'bg-therapy-primary/50' : 'bg-gray-200'
                    }`}
                  ></div>
                ))}
              </div>
            </div>
            <CardTitle>{exercise.steps[currentStep].title}</CardTitle>
            <CardDescription>{exercise.steps[currentStep].description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-3 mb-4 bg-therapy-light rounded-md border border-therapy-primary/30">
              <div className="flex items-start gap-2">
                <Brain className="h-5 w-5 text-therapy-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">{exercise.steps[currentStep].aiPrompt}</p>
              </div>
            </div>
            
            {exercise.steps[currentStep].inputType === 'textarea' ? (
              <Textarea
                value={responses[currentStep] || ''}
                onChange={(e) => handleResponseChange(e.target.value)}
                placeholder={exercise.steps[currentStep].placeholder}
                className="min-h-[120px]"
              />
            ) : exercise.steps[currentStep].inputType === 'checkbox' ? (
              <div className="flex items-center space-x-2 p-2">
                <input 
                  type="checkbox" 
                  id="confirm-step" 
                  checked={!!responses[currentStep]}
                  onChange={(e) => handleResponseChange(e.target.checked ? 'true' : '')}
                  className="rounded"
                />
                <label htmlFor="confirm-step">{exercise.steps[currentStep].placeholder}</label>
              </div>
            ) : (
              <Input
                value={responses[currentStep] || ''}
                onChange={(e) => handleResponseChange(e.target.value)}
                placeholder={exercise.steps[currentStep].placeholder}
              />
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              onClick={handlePrevious} 
              disabled={currentStep === 0}
              variant="outline"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <Button 
              onClick={handleNext}
              disabled={!responses[currentStep]}
            >
              {currentStep === exercise.steps.length - 1 ? (
                <>
                  Complete Exercise
                  <CheckCircle className="h-4 w-4 ml-2" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <CardTitle>Exercise Completed</CardTitle>
            </div>
            <CardDescription>Great job completing this exercise!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
              <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Brain className="h-4 w-4 text-therapy-primary" />
                AI Insights
              </h3>
              <p className="text-sm">{exercise.aiInsight}</p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Your Responses</h3>
              
              {exercise.steps.map((step, idx) => (
                <div key={idx} className="border rounded-md p-3">
                  <h4 className="text-xs font-medium mb-1">{step.title}</h4>
                  <p className="text-sm bg-muted/30 p-2 rounded">
                    {responses[idx] || "(No response)"}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button asChild variant="outline" className="flex-1">
              <Link to="/analysis">
                Return to Exercises
              </Link>
            </Button>
            <Button className="flex-1">
              <CheckCircle className="h-4 w-4 mr-2" />
              Save Progress
            </Button>
          </CardFooter>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>About This Exercise</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-4">{exercise.instructions}</p>
          
          <div className="bg-muted/30 p-4 rounded-md">
            <h3 className="text-sm font-medium mb-2">Benefits</h3>
            <ul className="text-sm space-y-1 list-disc pl-4">
              <li>Helps identify and challenge negative thought patterns</li>
              <li>Increases awareness of how thoughts affect emotions</li>
              <li>Builds skills for more balanced thinking</li>
              <li>Can reduce symptoms of anxiety and depression over time</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground">
            This exercise is based on evidence-based cognitive behavioral therapy techniques.
          </p>
        </CardFooter>
      </Card>
    </MainLayout>
  );
};

export default ExerciseDetail;
