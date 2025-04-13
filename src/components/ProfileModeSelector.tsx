
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAIMode } from "@/hooks/use-ai-mode";
import { useToast } from "@/hooks/use-toast";
import { Briefcase, HeartPulse, Stethoscope } from "lucide-react";

const ProfileModeSelector = () => {
  const { therapyMode, setTherapyMode } = useAIMode();
  const { toast } = useToast();
  const [selectedMode, setSelectedMode] = useState<string>(therapyMode);

  const handleModeChange = (value: string) => {
    setSelectedMode(value);
  };

  const handleSaveMode = () => {
    setTherapyMode(selectedMode as any);
    
    let modeDescription = "Standard therapy mode";
    
    if (selectedMode === 'corporate') {
      modeDescription = "Corporate wellness mode activated with focus on workplace challenges";
    } else if (selectedMode === 'relaxation') {
      modeDescription = "Relaxation mode activated with focus on stress reduction and mindfulness";
    } else if (selectedMode === 'clinical') {
      modeDescription = "Medical/Clinical mode activated for comprehensive mental health support";
    }
    
    toast({
      title: "Therapy Mode Updated",
      description: modeDescription
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Therapy Mode Settings</CardTitle>
        <CardDescription>
          Select the therapy mode that best suits your current needs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup 
          value={selectedMode} 
          onValueChange={handleModeChange} 
          className="space-y-4"
        >
          <div className="flex items-start space-x-3 border p-4 rounded-md hover:border-therapy-primary transition-colors">
            <RadioGroupItem value="standard" id="standard" />
            <div className="space-y-1">
              <Label htmlFor="standard" className="font-medium">Standard Mode</Label>
              <p className="text-sm text-muted-foreground">
                Default therapy experience with balanced support and personalized guidance
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 border p-4 rounded-md hover:border-therapy-primary transition-colors">
            <RadioGroupItem value="corporate" id="corporate" />
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <Label htmlFor="corporate" className="font-medium">Corporate Wellness Mode</Label>
                <Briefcase className="h-4 w-4 text-blue-600" />
              </div>
              <p className="text-sm text-muted-foreground">
                Focus on workplace stress, burnout prevention, and professional development
              </p>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="text-xs p-2 bg-blue-50 rounded-md">Quick stress relief</div>
                <div className="text-xs p-2 bg-blue-50 rounded-md">Work-life balance</div>
                <div className="text-xs p-2 bg-blue-50 rounded-md">Productivity hacks</div>
                <div className="text-xs p-2 bg-blue-50 rounded-md">Career guidance</div>
              </div>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 border p-4 rounded-md hover:border-therapy-primary transition-colors">
            <RadioGroupItem value="relaxation" id="relaxation" />
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <Label htmlFor="relaxation" className="font-medium">Relaxation Mode</Label>
                <HeartPulse className="h-4 w-4 text-green-600" />
              </div>
              <p className="text-sm text-muted-foreground">
                Focus on mindfulness, stress reduction, and holistic wellness approaches
              </p>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="text-xs p-2 bg-green-50 rounded-md">Breathing exercises</div>
                <div className="text-xs p-2 bg-green-50 rounded-md">Meditation</div>
                <div className="text-xs p-2 bg-green-50 rounded-md">Sleep improvement</div>
                <div className="text-xs p-2 bg-green-50 rounded-md">Nature connection</div>
              </div>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 border p-4 rounded-md hover:border-therapy-primary transition-colors">
            <RadioGroupItem value="clinical" id="clinical" />
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <Label htmlFor="clinical" className="font-medium">Medical/Clinical Mode</Label>
                <Stethoscope className="h-4 w-4 text-red-600" />
              </div>
              <p className="text-sm text-muted-foreground">
                Comprehensive support for diagnosed mental health conditions with clinical integration
              </p>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="text-xs p-2 bg-red-50 rounded-md">Depression support</div>
                <div className="text-xs p-2 bg-red-50 rounded-md">Anxiety management</div>
                <div className="text-xs p-2 bg-red-50 rounded-md">Clinical tools</div>
                <div className="text-xs p-2 bg-red-50 rounded-md">Provider integration</div>
              </div>
            </div>
          </div>
        </RadioGroup>
        
        <Button onClick={handleSaveMode} className="w-full">
          Apply Mode Settings
        </Button>
        
        <div className="text-xs p-3 bg-muted rounded-md">
          <p className="font-medium mb-1">About Therapy Modes</p>
          <p className="text-muted-foreground">
            Your selected mode will customize the content, exercises, and approach of your therapy experience. 
            You can change your therapy mode at any time.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileModeSelector;
