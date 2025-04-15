
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Brain, Activity, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface AIInsightsSectionProps {
  className?: string;
}

const AIInsightsSection = ({ className }: AIInsightsSectionProps) => {
  const navigate = useNavigate();
  
  const handleSeeAllInsights = () => {
    navigate('/insights');
  };
  
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Brain className="h-5 w-5 text-therapy-primary" />
          AI Insights
        </CardTitle>
        <Badge variant="outline" className="bg-therapy-light text-therapy-primary">
          Updated Today
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border border-therapy-muted hover:border-therapy-primary transition-all duration-200">
              <CardContent className="p-3">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-sm font-medium">Patient Recognition</h3>
                  <Badge variant="outline" className="bg-therapy-light text-xs">+9%</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-1">
                  Your mood tends to decrease on workdays following insufficient sleep (under 6 hours).
                </p>
                <div className="text-xs text-therapy-primary flex items-center justify-end gap-1 font-medium cursor-pointer hover:underline mt-1">
                  <span>Explore correlation</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-therapy-muted hover:border-therapy-primary transition-all duration-200">
              <CardContent className="p-3">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-sm font-medium">Cognitive Distortion Detection</h3>
                  <Badge variant="outline" className="bg-therapy-light text-xs">6 days</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-1">
                  All-or-nothing thinking appears in your negative thought entries.
                </p>
                <div className="text-xs text-therapy-primary flex items-center justify-end gap-1 font-medium cursor-pointer hover:underline mt-1">
                  <span>View examples</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-therapy-muted hover:border-therapy-primary transition-all duration-200">
              <CardContent className="p-3">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-sm font-medium">Therapy Progress</h3>
                  <Badge variant="outline" className="bg-therapy-light text-xs">Positive</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-1">
                  You've shown a 27% increase in positive thought reframing this month.
                </p>
                <div className="text-xs text-therapy-primary flex items-center justify-end gap-1 font-medium cursor-pointer hover:underline mt-1">
                  <span>View progress</span>
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

export default AIInsightsSection;
