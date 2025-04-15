
import { useState } from "react";
import { OnboardingQuestion } from "@/hooks/use-onboarding";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface OnboardingQuestionProps {
  question: OnboardingQuestion;
  currentAnswer: any;
  onAnswer: (value: any) => void;
}

const OnboardingQuestionComponent = ({ question, currentAnswer, onAnswer }: OnboardingQuestionProps) => {
  const [textValue, setTextValue] = useState<string>(currentAnswer || '');
  const [scaleValue, setScaleValue] = useState<number[]>([currentAnswer || 5]);
  const [multiChoiceValues, setMultiChoiceValues] = useState<string[]>(currentAnswer || []);
  
  const handleScaleChange = (value: number[]) => {
    setScaleValue(value);
  };
  
  const handleTextSubmit = () => {
    if (textValue.trim()) {
      onAnswer(textValue);
    }
  };
  
  const handleMultiChoiceChange = (value: string) => {
    setMultiChoiceValues(prev => {
      if (prev.includes(value)) {
        return prev.filter(v => v !== value);
      } else {
        return [...prev, value];
      }
    });
  };
  
  const handleMultiChoiceSubmit = () => {
    if (multiChoiceValues.length > 0) {
      onAnswer(multiChoiceValues);
    }
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">{question.text}</h3>
      
      {question.type === 'singleChoice' && question.options && (
        <RadioGroup 
          value={currentAnswer} 
          onValueChange={onAnswer}
          className="space-y-3"
        >
          {question.options.map(option => (
            <div key={option.id} className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-muted transition-colors">
              <RadioGroupItem value={option.value} id={option.id} />
              <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                {option.text}
              </Label>
            </div>
          ))}
        </RadioGroup>
      )}
      
      {question.type === 'multiChoice' && question.options && (
        <div className="space-y-5">
          <div className="space-y-3">
            {question.options.map(option => (
              <div key={option.id} className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-muted transition-colors">
                <Checkbox 
                  id={option.id} 
                  checked={multiChoiceValues.includes(option.value)} 
                  onCheckedChange={() => handleMultiChoiceChange(option.value)}
                />
                <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                  {option.text}
                </Label>
              </div>
            ))}
          </div>
          <Button onClick={handleMultiChoiceSubmit} disabled={multiChoiceValues.length === 0}>
            Continue
          </Button>
        </div>
      )}
      
      {question.type === 'text' && (
        <div className="space-y-4">
          <Input 
            placeholder="Type your answer here..." 
            value={textValue} 
            onChange={(e) => setTextValue(e.target.value)}
            className="w-full"
          />
          <Button onClick={handleTextSubmit} disabled={!textValue.trim()}>
            Continue
          </Button>
        </div>
      )}
      
      {question.type === 'scale' && (
        <div className="space-y-8">
          <div>
            <div className="flex justify-between mb-2 text-sm">
              <span>Low</span>
              <span>High</span>
            </div>
            <Slider
              value={scaleValue}
              min={1}
              max={10}
              step={1}
              onValueChange={handleScaleChange}
              className="mt-2"
            />
            <div className="flex justify-between mt-1 text-xs text-muted-foreground">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <span key={num}>{num}</span>
              ))}
            </div>
          </div>
          <div className="text-center font-medium text-xl">
            Selected: {scaleValue[0]}
          </div>
          <Button onClick={() => onAnswer(scaleValue[0])}>
            Continue
          </Button>
        </div>
      )}
    </div>
  );
};

export default OnboardingQuestionComponent;
