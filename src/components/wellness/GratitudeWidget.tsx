
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeartHandshake, PlusCircle, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface GratitudeWidgetProps {
  className?: string;
}

// Sample prompts for gratitude practice
const gratitudePrompts = [
  "What made you smile today?",
  "Name something beautiful you noticed",
  "What's something you're looking forward to?",
  "Who made a positive difference in your day?",
  "What's something you accomplished today?",
  "What's something that brings you comfort?",
  "What's a small pleasure you enjoyed today?",
  "What's something you're proud of?",
];

const GratitudeWidget = ({ className }: GratitudeWidgetProps) => {
  const [gratitude, setGratitude] = useState("");
  const [gratitudeList, setGratitudeList] = useState<string[]>([
    "My morning coffee ritual",
    "The supportive text from my friend"
  ]);
  const [currentPrompt, setCurrentPrompt] = useState(gratitudePrompts[0]);
  const { toast } = useToast();
  
  const addGratitude = () => {
    if (!gratitude.trim()) return;
    
    setGratitudeList([gratitude, ...gratitudeList]);
    setGratitude("");
    
    // Get new random prompt
    const newPrompt = gratitudePrompts[Math.floor(Math.random() * gratitudePrompts.length)];
    setCurrentPrompt(newPrompt);
    
    toast({
      title: "Gratitude Added",
      description: "Your moment of gratitude has been saved",
      duration: 3000,
    });
  };
  
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <HeartHandshake className="h-5 w-5 text-therapy-primary" />
            Gratitude Practice
          </CardTitle>
          <Badge variant="outline" className="bg-therapy-light text-therapy-primary">
            Daily
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-3">
          <p className="text-sm font-medium">{currentPrompt}</p>
          <div className="flex gap-2">
            <input 
              type="text"
              value={gratitude}
              onChange={(e) => setGratitude(e.target.value)}
              placeholder="I'm grateful for..."
              className="flex-1 p-2 text-sm border rounded-md"
              onKeyDown={(e) => e.key === 'Enter' && addGratitude()}
            />
            <Button onClick={addGratitude} size="sm">
              <PlusCircle className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Recent Gratitude Moments</h4>
          <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
            {gratitudeList.map((item, index) => (
              <div 
                key={index} 
                className={cn(
                  "p-3 rounded-md border flex items-start gap-2",
                  index === 0 ? "bg-therapy-light border-therapy-primary/30 animate-fade-in" : ""
                )}
              >
                <Heart className="h-4 w-4 text-therapy-primary mt-0.5" />
                <p className="text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-xs text-center text-muted-foreground pt-2 border-t">
          <p className="mt-2">Practicing gratitude has been linked to increased happiness and reduced stress</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GratitudeWidget;
