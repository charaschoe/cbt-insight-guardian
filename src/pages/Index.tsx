
import MainLayout from "@/layouts/MainLayout";
import AISelfTherapyMode from "@/components/AISelfTherapyMode";
import AIInsightsSection from "@/components/ai/AIInsightsSection";
import PersonalizedInsightsSection from "@/components/ai/PersonalizedInsightsSection";
import AITherapyModeTab from "@/components/ai/AITherapyModeTab";
import { InfoButton } from "@/components/ui/info-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Sparkles, CalendarRange, TrendingUp } from "lucide-react";
import MoodTracker from "@/components/MoodTracker";
import BreathworkTimer from "@/components/wellness/BreathworkTimer";
import GratitudeWidget from "@/components/wellness/GratitudeWidget";
import { Button } from "@/components/ui/button";

const Index = () => {
  // Dummy data for the mental wellness score
  const wellnessScoreData = [
    { day: "Mon", score: 65 },
    { day: "Tue", score: 60 },
    { day: "Wed", score: 68 },
    { day: "Thu", score: 73 },
    { day: "Fri", score: 80 },
    { day: "Sat", score: 85 },
    { day: "Sun", score: 82 },
  ];

  const currentScore = wellnessScoreData[wellnessScoreData.length - 1].score;
  
  // Dummy streak data
  const streakData = {
    currentStreak: 7,
    longestStreak: 14,
    totalCheckIns: 42,
    lastWeekMood: 3.8,
  };
  
  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Welcome Back</h1>
            <p className="text-muted-foreground">Your personal wellness dashboard</p>
          </div>
          <InfoButton tooltip="This dashboard provides tools and insights to support your daily mental wellness routine." />
        </div>
        
        {/* Wellness Score Card */}
        <Card className="border-therapy-muted bg-gradient-to-r from-therapy-light to-white mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-therapy-primary" />
              Mental Wellness Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-col">
                <span className="text-4xl font-bold text-therapy-primary">{currentScore}</span>
                <span className="text-sm text-muted-foreground">Your current score</span>
              </div>
              <div className="bg-therapy-light px-3 py-1 rounded-full text-sm">
                <span className="text-therapy-primary font-medium">+7 points</span> from last week
              </div>
            </div>
            <div className="h-[120px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={wellnessScoreData}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} />
                  <YAxis domain={[50, 100]} hide />
                  <Tooltip 
                    formatter={(value) => [`${value}`, 'Score']}
                    labelFormatter={(label) => `${label}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#4C8BF5" 
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2, fill: "white" }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col items-center">
                <CalendarRange className="h-8 w-8 text-therapy-primary mb-1" />
                <span className="text-xl font-bold">{streakData.currentStreak}</span>
                <span className="text-xs text-center text-muted-foreground">Day Streak</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col items-center">
                <TrendingUp className="h-8 w-8 text-therapy-primary mb-1" />
                <span className="text-xl font-bold">{streakData.totalCheckIns}</span>
                <span className="text-xs text-center text-muted-foreground">Check-ins</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col items-center">
                <Sparkles className="h-8 w-8 text-therapy-primary mb-1" />
                <span className="text-xl font-bold">{streakData.lastWeekMood}</span>
                <span className="text-xs text-center text-muted-foreground">Avg. Mood</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col items-center justify-center h-full">
                <Button variant="outline" size="sm" className="mb-1 w-full">View More</Button>
                <span className="text-xs text-center text-muted-foreground">Stats</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            <MoodTracker />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BreathworkTimer />
              <GratitudeWidget />
            </div>
            <AIInsightsSection />
          </div>
          
          {/* Right Column */}
          <div className="lg:col-span-5 space-y-6">
            <PersonalizedInsightsSection />
            <AITherapyModeTab />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
