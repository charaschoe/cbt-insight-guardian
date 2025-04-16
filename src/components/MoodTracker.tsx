
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { HeartHandshake, CalendarDays } from "lucide-react";

const moodOptions = [
  { emoji: "😢", label: "Very Sad", color: "bg-blue-200", value: 1 },
  { emoji: "😕", label: "Sad", color: "bg-blue-100", value: 2 },
  { emoji: "😐", label: "Neutral", color: "bg-gray-100", value: 3 },
  { emoji: "🙂", label: "Happy", color: "bg-green-100", value: 4 },
  { emoji: "😄", label: "Very Happy", color: "bg-green-200", value: 5 },
];

interface MoodTrackerProps {
  className?: string;
}

const MoodTracker = ({ className }: MoodTrackerProps) => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState("");
  
  // Get current day of week
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const today = new Date().getDay();
  
  // Generate dummy data for the week
  const weekData = Array.from({ length: 7 }, (_, i) => ({
    day: days[i],
    isToday: i === today,
    hasMood: i < today || (i === today && selectedMood !== null),
    mood: i < today ? Math.floor(Math.random() * 5) + 1 : (i === today ? selectedMood : null),
  }));

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <HeartHandshake className="h-5 w-5 text-therapy-primary" />
          Daily Check-in
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <h3 className="text-base font-medium">How are you feeling today?</h3>
        
        <div className="flex justify-between gap-2 mb-4">
          {moodOptions.map((mood) => (
            <div 
              key={mood.value}
              className={cn(
                "flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer transition-all hover:scale-105",
                mood.color,
                selectedMood === mood.value && "ring-2 ring-therapy-primary"
              )}
              onClick={() => setSelectedMood(mood.value)}
            >
              <span className="text-2xl mb-1">{mood.emoji}</span>
              <span className="text-xs font-medium">{mood.label}</span>
            </div>
          ))}
        </div>
        
        {selectedMood && (
          <div className="animate-fade-in space-y-3">
            <label className="block text-sm font-medium">Add a note about your mood</label>
            <textarea 
              className="w-full p-3 border rounded-md text-sm" 
              rows={2}
              placeholder="What's on your mind today?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <Button className="w-full">Save Check-in</Button>
          </div>
        )}
        
        <div className="pt-4 border-t">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium flex items-center gap-1">
              <CalendarDays className="h-4 w-4" /> 
              This week
            </h4>
            <Button variant="ghost" size="sm" className="text-xs">View History</Button>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {weekData.map((day, index) => (
              <div 
                key={index} 
                className={cn(
                  "flex flex-col items-center justify-center p-2 rounded-md",
                  day.isToday && "ring-1 ring-therapy-primary bg-therapy-light/30",
                  !day.hasMood && "opacity-60"
                )}
              >
                <span className="text-xs font-medium">{day.day}</span>
                {day.hasMood && day.mood && (
                  <span className="text-lg mt-1">
                    {moodOptions[day.mood - 1].emoji}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodTracker;
