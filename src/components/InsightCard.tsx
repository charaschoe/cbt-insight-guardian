
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface InsightCardProps {
  className?: string;
  title: string;
  description: string;
}

const InsightCard = ({ className, title, description }: InsightCardProps) => {
  return (
    <Card className={cn("overflow-hidden gradient-card", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-therapy-primary/10 p-2">
            <Lightbulb className="h-4 w-4 text-therapy-primary" />
          </div>
          <CardTitle className="text-base">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default InsightCard;
