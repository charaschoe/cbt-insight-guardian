
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
    <Card className={cn("p-5", className)}>
      <h3 className="text-lg font-medium mb-4">How are you feeling today?</h3>
      
      <div className="flex justify-between mb-6">
        {moodOptions.map((mood) => (
          <div 
            key={mood.value}
            className={cn(
              "mood-circle",
              mood.color,
              selectedMood === mood.value && "selected"
            )}
            onClick={() => setSelectedMood(mood.value)}
          >
            <span className="text-xl">{mood.emoji}</span>
          </div>
        ))}
      </div>
      
      {selectedMood && (
        <div className="mb-4 animate-fade-in">
          <label className="block text-sm font-medium mb-1">Add a note about your mood</label>
          <textarea 
            className="w-full p-2 border rounded-md text-sm" 
            rows={2}
            placeholder="What's on your mind?"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      )}
      
      <div className="mt-6">
        <h4 className="text-sm font-medium mb-2">This week</h4>
        <div className="mood-tracker-grid">
          {weekData.map((day, index) => (
            <div 
              key={index} 
              className={cn(
                "day-cell",
                day.isToday && "ring-1 ring-therapy-primary",
                !day.hasMood && "opacity-50"
              )}
            >
              <div className="flex flex-col items-center">
                <span className="text-xs font-medium">{day.day}</span>
                {day.hasMood && day.mood && (
                  <span className="text-xs mt-1">
                    {moodOptions[day.mood - 1].emoji}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default MoodTracker;
