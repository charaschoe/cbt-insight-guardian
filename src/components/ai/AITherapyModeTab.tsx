
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, MessageSquare, FileText, Activity, CircleHelp } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AITherapyModeTabProps {
  className?: string;
}

const AITherapyModeTab = ({ className }: AITherapyModeTabProps) => {
  const [activeCategory, setActiveCategory] = useState<string>("cognitive");
  
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-therapy-primary" />
            AI Pattern Detection
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <CircleHelp className="h-5 w-5 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  AI analyzes your communication patterns to identify cognitive
                  distortions and provide personalized insights.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Tabs defaultValue="thinking-pattern" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="thinking-pattern">Cognitive</TabsTrigger>
              <TabsTrigger value="emotional">Emotional</TabsTrigger>
              <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
            </TabsList>
            
            <TabsContent value="thinking-pattern">
              <div className="space-y-3">
                <Card className="border border-therapy-primary">
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-medium">Catastrophizing</h3>
                      <Badge variant="outline" className="bg-therapy-light text-therapy-primary">
                        78% Match
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 mb-2">
                      Tendency to assume the worst possible outcome in situations
                    </p>
                    <div className="bg-muted/30 p-2 rounded-md text-xs">
                      <p className="font-medium mb-1">Examples:</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>"If I fail this presentation, my career is over"</li>
                        <li>"Making a mistake means everyone will lose respect for me"</li>
                      </ul>
                    </div>
                    <Button size="sm" variant="outline" className="w-full mt-2 text-xs">
                      <FileText className="h-3 w-3 mr-1" />
                      Learn More About This Pattern
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="border">
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-medium">Mind Reading</h3>
                      <Badge variant="outline" className="bg-muted/50">
                        65% Match
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Assuming you know what others are thinking without evidence
                    </p>
                    <Button size="sm" variant="ghost" className="w-full mt-2 text-xs">
                      <Activity className="h-3 w-3 mr-1" />
                      See Details
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="emotional">
              <div className="space-y-3">
                <Card className="border border-therapy-primary">
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-medium">Rejection Sensitivity</h3>
                      <Badge variant="outline" className="bg-therapy-light text-therapy-primary">
                        82% Match
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 mb-2">
                      Heightened emotional response to perceived rejection
                    </p>
                    <div className="bg-muted/30 p-2 rounded-md text-xs">
                      <p className="font-medium mb-1">Patterns:</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Strong emotional response to minor social slights</li>
                        <li>Avoidance of social situations due to fear of rejection</li>
                      </ul>
                    </div>
                    <Button size="sm" variant="outline" className="w-full mt-2 text-xs">
                      <FileText className="h-3 w-3 mr-1" />
                      Learn More About This Pattern
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="behavioral">
              <div className="space-y-3">
                <Card className="border border-therapy-primary">
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-medium">Avoidance Behavior</h3>
                      <Badge variant="outline" className="bg-therapy-light text-therapy-primary">
                        83% Match
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 mb-2">
                      Tendency to avoid situations that cause anxiety
                    </p>
                    <div className="bg-muted/30 p-2 rounded-md text-xs">
                      <p className="font-medium mb-1">Examples:</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Putting off difficult conversations</li>
                        <li>Skipping social events due to anxiety</li>
                      </ul>
                    </div>
                    <Button size="sm" variant="outline" className="w-full mt-2 text-xs">
                      <FileText className="h-3 w-3 mr-1" />
                      Learn More About This Pattern
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-between mt-2">
            <Button variant="outline" size="sm" className="text-xs">
              <Brain className="h-3 w-3 mr-1" />
              View All AI Analysis
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <MessageSquare className="h-3 w-3 mr-1" />
              Discuss With AI
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AITherapyModeTab;
