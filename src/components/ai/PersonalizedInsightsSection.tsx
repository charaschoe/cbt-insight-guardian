
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Frown, ArrowRight, TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface PersonalizedInsightsSectionProps {
  className?: string;
}

const PersonalizedInsightsSection = ({ className }: PersonalizedInsightsSectionProps) => {
  const navigate = useNavigate();
  
  const handleSeeAllInsights = () => {
    navigate('/insights');
  };
  
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-therapy-primary" />
          Personalized Insights
        </CardTitle>
        <Badge variant="outline" className="bg-therapy-light text-therapy-primary">
          Adaptive Learning
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-40 w-full bg-muted/30 rounded-md flex items-center justify-center mb-3">
            <p className="text-xs text-muted-foreground">Progress visualization chart</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border border-therapy-muted hover:border-therapy-primary transition-all duration-200">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="rounded-full bg-therapy-primary/10 p-1.5">
                    <Frown className="h-4 w-4 text-therapy-primary" />
                  </div>
                  <h3 className="text-sm font-medium">Thought Patterns</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-1">
                  When under pressure, you tend to catastrophize, especially in challenging work scenarios.
                </p>
                <div className="text-xs text-therapy-primary flex items-center justify-end gap-1 font-medium cursor-pointer hover:underline mt-1">
                  <span>Cognitive Re-framing Exercise</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-therapy-muted hover:border-therapy-primary transition-all duration-200">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="rounded-full bg-therapy-primary/10 p-1.5">
                    <TreePine className="h-4 w-4 text-therapy-primary" />
                  </div>
                  <h3 className="text-sm font-medium">Environmental Impact</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-1">
                  Time spent in nature leads to significant mood improvement. Consider adding more outdoor activities.
                </p>
                <div className="text-xs text-therapy-primary flex items-center justify-end gap-1 font-medium cursor-pointer hover:underline mt-1">
                  <span>View suggested activities</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-center mt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs"
              onClick={handleSeeAllInsights}
            >
              See All Insights
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalizedInsightsSection;
