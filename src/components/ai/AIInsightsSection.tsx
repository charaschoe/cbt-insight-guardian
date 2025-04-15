
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LightbulbIcon, BrainCircuit, LineChart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AIInsightsSectionProps {
  className?: string;
}

const AIInsightsSection = ({ className }: AIInsightsSectionProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-gradient-to-br from-therapy-primary to-therapy-accent p-1.5">
            <LightbulbIcon className="h-4 w-4 text-white" />
          </div>
          <CardTitle className="text-lg">AI Insights</CardTitle>
        </div>
        <Badge variant="outline" className="bg-therapy-light text-therapy-primary">New Analysis</Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          <div className="p-4 rounded-lg bg-therapy-light border border-therapy-muted hover:border-therapy-primary transition-all duration-200">
            <div className="flex items-center gap-2 mb-2">
              <BrainCircuit className="h-4 w-4 text-therapy-primary" />
              <h4 className="text-sm font-medium">Cognitive Pattern Detected</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Your mood tends to decrease on workdays following insufficient sleep (under 6 hours).
            </p>
            <div className="text-xs text-therapy-primary flex items-center justify-end gap-1 font-medium cursor-pointer hover:underline">
              <span>Explore correlation</span>
              <ArrowRight className="h-3 w-3" />
            </div>
          </div>

          <div className="p-4 rounded-lg bg-therapy-light border border-therapy-muted hover:border-therapy-primary transition-all duration-200">
            <div className="flex items-center gap-2 mb-2">
              <LineChart className="h-4 w-4 text-therapy-primary" />
              <h4 className="text-sm font-medium">Therapy Progress</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              You've shown a 27% increase in positive thought reframing over the past month.
            </p>
            <div className="text-xs text-therapy-primary flex items-center justify-end gap-1 font-medium cursor-pointer hover:underline">
              <span>View progress</span>
              <ArrowRight className="h-3 w-3" />
            </div>
          </div>
        </div>

        <Button variant="outline" className="w-full mt-6">
          See All AI Insights
        </Button>
      </CardContent>
    </Card>
  );
};

export default AIInsightsSection;
