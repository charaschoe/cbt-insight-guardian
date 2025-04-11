
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AIInsightsProps {
  className?: string;
}

const AIInsights = ({ className }: AIInsightsProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-gradient-to-br from-therapy-primary to-therapy-accent p-1">
              <Lightbulb className="h-4 w-4 text-white" />
            </div>
            <CardTitle className="text-lg">AI Insights</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-3 rounded-lg bg-therapy-light border border-therapy-muted">
            <h4 className="text-sm font-medium mb-1">Pattern Recognition</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Your mood tends to decrease on workdays following insufficient sleep (under 6 hours).
            </p>
            <div className="text-xs text-therapy-primary flex items-center justify-end gap-1 font-medium cursor-pointer hover:underline">
              <span>Explore correlation</span>
              <ArrowRight className="h-3 w-3" />
            </div>
          </div>

          <div className="p-3 rounded-lg bg-therapy-light border border-therapy-muted">
            <h4 className="text-sm font-medium mb-1">Cognitive Distortion Detection</h4>
            <p className="text-sm text-muted-foreground mb-2">
              All-or-nothing thinking appears in 68% of your negative thought entries.
            </p>
            <div className="text-xs text-therapy-primary flex items-center justify-end gap-1 font-medium cursor-pointer hover:underline">
              <span>View examples</span>
              <ArrowRight className="h-3 w-3" />
            </div>
          </div>

          <div className="p-3 rounded-lg bg-therapy-light border border-therapy-muted">
            <h4 className="text-sm font-medium mb-1">Therapy Progress</h4>
            <p className="text-sm text-muted-foreground mb-2">
              You've shown a 27% increase in positive thought reframing over the past month.
            </p>
            <div className="text-xs text-therapy-primary flex items-center justify-end gap-1 font-medium cursor-pointer hover:underline">
              <span>View progress</span>
              <ArrowRight className="h-3 w-3" />
            </div>
          </div>
        </div>

        <Button variant="outline" className="w-full mt-4">
          See All Insights
        </Button>
      </CardContent>
    </Card>
  );
};

export default AIInsights;
