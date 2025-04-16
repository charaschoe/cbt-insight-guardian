
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wind, Pause, Play, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";

const breathPatterns = [
  { name: "Box Breathing", inhale: 4, hold1: 4, exhale: 4, hold2: 4, color: "from-green-200 to-green-300" },
  { name: "4-7-8 Technique", inhale: 4, hold1: 7, exhale: 8, hold2: 0, color: "from-blue-200 to-blue-300" },
  { name: "Calm Breath", inhale: 5, hold1: 0, exhale: 5, hold2: 0, color: "from-purple-200 to-purple-300" },
];

interface BreathworkTimerProps {
  className?: string;
}

const BreathworkTimer = ({ className }: BreathworkTimerProps) => {
  const [selectedPattern, setSelectedPattern] = useState(breathPatterns[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<"inhale" | "hold1" | "exhale" | "hold2">("inhale");
  const [timeLeft, setTimeLeft] = useState(selectedPattern.inhale);
  const [totalCycles, setTotalCycles] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Move to next phase
            if (phase === "inhale") {
              setPhase("hold1");
              return selectedPattern.hold1 || 1;
            } else if (phase === "hold1") {
              setPhase("exhale");
              return selectedPattern.exhale;
            } else if (phase === "exhale") {
              setPhase("hold2");
              return selectedPattern.hold2 || 1;
            } else {
              setPhase("inhale");
              setTotalCycles(c => c + 1);
              return selectedPattern.inhale;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(timer);
  }, [isRunning, phase, selectedPattern]);
  
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };
  
  const resetTimer = () => {
    setIsRunning(false);
    setPhase("inhale");
    setTimeLeft(selectedPattern.inhale);
    setTotalCycles(0);
  };
  
  const selectPattern = (pattern: typeof breathPatterns[0]) => {
    setSelectedPattern(pattern);
    setPhase("inhale");
    setTimeLeft(pattern.inhale);
    setIsRunning(false);
  };
  
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Wind className="h-5 w-5 text-therapy-primary" />
          Breathwork Timer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {breathPatterns.map((pattern) => (
            <Button
              key={pattern.name}
              variant={selectedPattern.name === pattern.name ? "default" : "outline"}
              size="sm"
              onClick={() => selectPattern(pattern)}
              className="whitespace-nowrap"
            >
              {pattern.name}
            </Button>
          ))}
        </div>
        
        <div className="relative w-full h-48 flex items-center justify-center">
          <div className={cn(
            "absolute inset-0 rounded-full bg-gradient-to-r animate-pulse transition-all duration-1000",
            selectedPattern.color,
            phase === "inhale" ? "scale-100 opacity-20" : 
            phase === "hold1" ? "scale-100 opacity-40" : 
            phase === "exhale" ? "scale-90 opacity-20" : "scale-90 opacity-10"
          )}></div>
          
          <div className="z-10 text-center">
            <div className="text-4xl font-bold mb-1">{timeLeft}</div>
            <div className="text-sm font-medium capitalize mb-3">{phase.replace("1", "").replace("2", "")}</div>
            <div className="text-xs text-muted-foreground">Cycles: {totalCycles}</div>
          </div>
        </div>
        
        <div className="flex justify-center gap-3">
          <Button 
            variant="outline" 
            size="icon"
            onClick={resetTimer}
          >
            <RefreshCcw className="h-4 w-4" />
          </Button>
          <Button 
            size="lg"
            onClick={toggleTimer}
            className="px-8"
          >
            {isRunning ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {isRunning ? "Pause" : "Start"}
          </Button>
        </div>
        
        <div className="text-xs text-center text-muted-foreground pt-2">
          <p>Take a moment to breathe and center yourself</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BreathworkTimer;
