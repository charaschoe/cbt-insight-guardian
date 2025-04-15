
import MainLayout from "@/layouts/MainLayout";
import AISelfTherapyMode from "@/components/AISelfTherapyMode";
import AIInsightsSection from "@/components/ai/AIInsightsSection";
import PersonalizedInsightsSection from "@/components/ai/PersonalizedInsightsSection";
import AITherapyModeTab from "@/components/ai/AITherapyModeTab";
import { InfoButton } from "@/components/ui/info-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Sparkles } from "lucide-react";

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
  
  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-muted-foreground">Your personal therapy insights and tools</p>
          </div>
          <InfoButton tooltip="This dashboard provides an overview of your therapy progress, insights, and tools to help you manage your mental health." />
        </div>
        
        {/* Wellness Score Card */}
        <Card className="border-therapy-muted mb-6">
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <AIInsightsSection />
            <PersonalizedInsightsSection />
          </div>
          
          <div className="space-y-8">
            <AITherapyModeTab />
            <AISelfTherapyMode className="w-full" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
