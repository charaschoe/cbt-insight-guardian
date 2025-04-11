
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

interface ProgressData {
  day: string;
  mood: number;
  anxiety: number;
}

const dummyData: ProgressData[] = [
  { day: "Mon", mood: 3, anxiety: 5 },
  { day: "Tue", mood: 2, anxiety: 7 },
  { day: "Wed", mood: 3, anxiety: 6 },
  { day: "Thu", mood: 4, anxiety: 4 },
  { day: "Fri", mood: 3, anxiety: 5 },
  { day: "Sat", mood: 4, anxiety: 3 },
  { day: "Sun", mood: 5, anxiety: 2 },
];

interface WeeklyProgressProps {
  className?: string;
}

const WeeklyProgress = ({ className }: WeeklyProgressProps) => {
  const formatYAxis = (value: number) => {
    if (value === 0) return "Low";
    if (value === 5) return "Med";
    if (value === 10) return "High";
    return "";
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded-md shadow-sm">
          <p className="text-xs font-medium">{label}</p>
          <p className="text-xs text-therapy-primary">
            Mood: {payload[0].value} 
            <span className="text-xs ml-1 text-muted-foreground">
              ({payload[0].value <= 2 ? "Low" : payload[0].value >= 4 ? "High" : "Medium"})
            </span>
          </p>
          <p className="text-xs text-therapy-dark">
            Anxiety: {payload[1].value}
            <span className="text-xs ml-1 text-muted-foreground">
              ({payload[1].value >= 7 ? "High" : payload[1].value <= 3 ? "Low" : "Medium"})
            </span>
          </p>
        </div>
      );
    }
  
    return null;
  };

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Weekly Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={dummyData}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                domain={[0, 10]} 
                axisLine={false} 
                tickLine={false}
                tickFormatter={formatYAxis}
                tick={{ fontSize: 10 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="mood" 
                stroke="#4C8BF5" 
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2, fill: "white" }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="anxiety" 
                stroke="#2C5282" 
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2, fill: "white" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-therapy-primary"></div>
            <span className="text-xs">Mood</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-therapy-dark"></div>
            <span className="text-xs">Anxiety</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyProgress;
