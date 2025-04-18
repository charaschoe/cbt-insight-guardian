
import { useEffect, useState } from "react";
import { useOnboarding } from "@/hooks/use-onboarding";
import OnboardingQuestion from "./OnboardingQuestion";
import OnboardingProgress from "./OnboardingProgress";
import OnboardingReasoning from "./OnboardingReasoning";
import OnboardingRecommendation from "./OnboardingRecommendation";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ExternalLink, 
  HelpCircle, 
  LifeBuoy, 
  ArrowLeft, 
  ArrowRight,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const OnboardingExperience = () => {
  const { 
    isOnboardingActive,
    currentQuestionIndex,
    questions,
    calculateProgress,
    goToPreviousQuestion,
    goToNextQuestion,
    setAnswer,
    reasoning,
    answers,
    currentStep,
    totalSteps
  } = useOnboarding();
  
  const [showReasoning, setShowReasoning] = useState(false);
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = calculateProgress();
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  
  // Find existing answer for current question
  const currentAnswer = answers.find(a => a.questionId === currentQuestion?.id);
  
  const canContinue = currentAnswer || currentQuestion?.type === 'singleChoice' || currentQuestion?.id === 'complete';
  
  // Get current reasoning text - either from context or specifically for the user's answer
  const getCurrentReasoning = () => {
    // For questions where reasoning changes based on selected answer
    if (currentQuestion?.id === 'previous_therapy' && currentAnswer) {
      if (currentAnswer.value === 'yes_current') {
        return "Current therapy indicates you're actively working on your mental health. This insight helps us provide complementary support rather than replacement.";
      } else if (currentAnswer.value === 'yes_past') {
        return "Past therapy experience suggests familiarity with mental health concepts. We can build on this foundation with our approach.";
      } else if (currentAnswer.value === 'no') {
        return "No previous therapy experience helps us know we should introduce concepts more gradually and provide additional educational resources.";
      }
    }
    
    if (currentQuestion?.id === 'primary_concern' && currentAnswer) {
      return `We've noted your concerns about ${currentAnswer.value.join(', ')}. Understanding these specific issues helps us tailor our approach to your needs.`;
    }
    
    if (currentQuestion?.id === 'severity' && currentAnswer) {
      const severityLevel = parseInt(currentAnswer.value);
      if (severityLevel >= 8) {
        return "You've indicated your concerns are significantly impacting your daily life. We'll focus on providing more intensive support strategies.";
      } else if (severityLevel >= 4) {
        return "You've indicated a moderate impact on your daily life. We'll balance educational content with practical coping strategies.";
      } else {
        return "You've indicated a lower impact on your daily life. We'll focus on preventative approaches and skill-building.";
      }
    }
    
    // Default to the standard reasoning for this question
    return reasoning;
  };
  
  // In case of complete, show the recommendation screen
  if (currentQuestion?.id === 'complete') {
    return <OnboardingRecommendation />;
  }
  
  if (!isOnboardingActive) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl mx-auto rounded-xl shadow-lg">
        <CardContent className="p-0">
          <div className="p-6">
            <OnboardingProgress 
              currentStep={currentStep} 
              totalSteps={totalSteps} 
              progress={progress} 
            />
            
            <div className="mt-6">
              <OnboardingQuestion
                question={currentQuestion}
                currentAnswer={currentAnswer?.value}
                onAnswer={(value) => setAnswer(currentQuestion.id, value)}
              />
            </div>
            
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={goToPreviousQuestion}
                disabled={isFirstQuestion}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowReasoning(!showReasoning)}
                  className="flex items-center gap-2"
                >
                  <Info className="h-4 w-4" />
                  {showReasoning ? "Hide Insight" : "Show Insight"}
                </Button>
                
                {currentQuestion.id === 'crisis_assessment' && (
                  <Button asChild variant="destructive" className="flex items-center gap-2">
                    <Link to="/emergency">
                      <LifeBuoy className="h-4 w-4" />
                      Emergency Help
                    </Link>
                  </Button>
                )}
                
                {currentQuestion.id === 'crisis_support' && (
                  <Button asChild variant="destructive" className="flex items-center gap-2">
                    <Link to="/emergency">
                      <ExternalLink className="h-4 w-4" />
                      Connect Now
                    </Link>
                  </Button>
                )}
                
                {currentQuestion.type !== 'singleChoice' && currentQuestion.id !== 'complete' && (
                  <Button 
                    onClick={goToNextQuestion} 
                    disabled={!canContinue}
                    className="flex items-center gap-2"
                  >
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          {showReasoning && (
            <OnboardingReasoning reasoning={getCurrentReasoning()} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingExperience;
