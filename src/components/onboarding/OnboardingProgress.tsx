
import { Progress } from "@/components/ui/progress";

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
  progress: number;
}

const OnboardingProgress = ({ currentStep, totalSteps, progress }: OnboardingProgressProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium">Step {currentStep} of {totalSteps}</p>
        <p className="text-sm text-muted-foreground">{progress}% Complete</p>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};

export default OnboardingProgress;
