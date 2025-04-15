
import { useEffect, useState } from "react";
import { useOnboarding } from "@/hooks/use-onboarding";
import OnboardingQuestion from "./OnboardingQuestion";
import OnboardingProgress from "./OnboardingProgress";
import OnboardingReasoning from "./OnboardingReasoning";
import OnboardingRecommendation from "./OnboardingRecommendation";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, HelpCircle, LifeBuoy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const OnboardingExperience = () => {
  const { 
    isOnboardingActive,
    currentQuestionIndex,
    questions,
    calculateProgress,
    goToPreviousQuestion,
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
              >
                Back
              </Button>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowReasoning(!showReasoning)}
                  className="flex items-center gap-2"
                >
                  <HelpCircle className="h-4 w-4" />
                  {showReasoning ? "Hide Reasoning" : "Show Reasoning"}
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
              </div>
            </div>
          </div>
          
          {showReasoning && (
            <OnboardingReasoning reasoning={reasoning} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingExperience;
