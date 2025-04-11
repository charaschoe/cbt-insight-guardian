
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, MessageCircle, VideoIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface UpcomingSessionProps {
  className?: string;
}

const UpcomingSession = ({ className }: UpcomingSessionProps) => {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Upcoming Therapy Session</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-muted rounded-lg p-4 mb-4">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-therapy-primary/10 p-3 mt-1">
              <CalendarDays className="h-5 w-5 text-therapy-primary" />
            </div>
            <div>
              <h3 className="font-medium">Thursday, July 28</h3>
              <p className="text-sm text-muted-foreground">2:00 PM - 3:00 PM</p>
              <p className="text-sm font-medium mt-2">Dr. Sophia Chen</p>
              <div className="flex gap-2 mt-3">
                <Button variant="default" size="sm" className="gap-1">
                  <VideoIcon className="h-4 w-4" />
                  Join Video
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <MessageCircle className="h-4 w-4" />
                  Message
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Session Preparation</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-muted w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                1
              </div>
              <span>Review thought logs from the past week</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-muted w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                2
              </div>
              <span>Note any patterns or triggers you've observed</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-muted w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                3
              </div>
              <span>Prepare questions about techniques that were challenging</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingSession;
