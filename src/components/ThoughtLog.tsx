
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ThoughtLogEntry {
  id: string;
  situation: string;
  automaticThought: string;
  emotions: string;
  distortions: string[];
  rationalResponse: string;
  date: Date;
}

// Sample thought log entries
const sampleThoughtLogs: ThoughtLogEntry[] = [
  {
    id: "1",
    situation: "Received critical feedback on work project",
    automaticThought: "My work is terrible. I'll never improve.",
    emotions: "Sadness (70%), Anxiety (80%)",
    distortions: ["All-or-nothing thinking", "Catastrophizing"],
    rationalResponse: "The feedback highlighted specific areas to improve, not that my entire work is bad.",
    date: new Date(Date.now() - 86400000) // 1 day ago
  },
  {
    id: "2",
    situation: "Friend didn't respond to my message for hours",
    automaticThought: "They're ignoring me because they don't like me anymore.",
    emotions: "Anxiety (60%), Rejection (75%)",
    distortions: ["Mind reading", "Jumping to conclusions"],
    rationalResponse: "They might be busy. People don't always respond right away for many reasons.",
    date: new Date(Date.now() - 172800000) // 2 days ago
  }
];

interface ThoughtLogProps {
  className?: string;
}

const ThoughtLog = ({ className }: ThoughtLogProps) => {
  const [logs] = useState<ThoughtLogEntry[]>(sampleThoughtLogs);
  const [expandedLog, setExpandedLog] = useState<string | null>(null);

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  const toggleExpand = (id: string) => {
    if (expandedLog === id) {
      setExpandedLog(null);
    } else {
      setExpandedLog(id);
    }
  };

  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Recent Thought Log</CardTitle>
        <Button variant="outline" size="sm">
          <PlusCircle className="h-4 w-4 mr-2" />
          New Entry
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {logs.map((log) => (
            <div 
              key={log.id} 
              className="border rounded-lg overflow-hidden"
            >
              <div 
                className="p-3 flex justify-between items-center cursor-pointer bg-muted/50"
                onClick={() => toggleExpand(log.id)}
              >
                <div>
                  <div className="font-medium text-sm">{log.situation}</div>
                  <div className="text-xs text-muted-foreground">{formatDate(log.date)}</div>
                </div>
                <Button variant="ghost" size="sm">
                  {expandedLog === log.id ? "Hide" : "View"}
                </Button>
              </div>
              
              {expandedLog === log.id && (
                <div className="p-3 border-t animate-accordion-down">
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground">Automatic Thought</h4>
                      <p className="text-sm">{log.automaticThought}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground">Emotions</h4>
                      <p className="text-sm">{log.emotions}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground">Cognitive Distortions</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {log.distortions.map((distortion, idx) => (
                          <span 
                            key={idx} 
                            className="text-xs bg-therapy-muted px-2 py-1 rounded-full"
                          >
                            {distortion}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground">Rational Response</h4>
                      <p className="text-sm">{log.rationalResponse}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ThoughtLog;
