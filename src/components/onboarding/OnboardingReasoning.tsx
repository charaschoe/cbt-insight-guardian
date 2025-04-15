
import { CpuIcon } from "lucide-react";

interface OnboardingReasoningProps {
  reasoning: string;
}

const OnboardingReasoning = ({ reasoning }: OnboardingReasoningProps) => {
  return (
    <div className="border-t p-6 bg-muted/50">
      <div className="flex items-start gap-3">
        <CpuIcon className="h-5 w-5 text-therapy-primary mt-0.5" />
        <div>
          <h4 className="text-sm font-medium mb-1">AI Reasoning Process</h4>
          <p className="text-sm text-muted-foreground">
            {reasoning}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingReasoning;
