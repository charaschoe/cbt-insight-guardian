
import MainLayout from "@/layouts/MainLayout";
import { LineChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Insights = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Insights</h1>
        <p className="text-muted-foreground">Personalized insights based on your data</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Thought Patterns</CardTitle>
            <LineChart className="h-5 w-5 text-therapy-primary" />
          </CardHeader>
          <CardContent>
            <CardDescription className="mt-2">
              Analysis of your recurring thought patterns over the past 30 days
            </CardDescription>
            <div className="h-48 mt-4 flex items-center justify-center bg-muted/50 rounded-md">
              <p className="text-sm text-muted-foreground">Thought pattern visualization</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Mood Correlations</CardTitle>
            <LineChart className="h-5 w-5 text-therapy-primary" />
          </CardHeader>
          <CardContent>
            <CardDescription className="mt-2">
              Factors that correlate with your mood changes
            </CardDescription>
            <div className="h-48 mt-4 flex items-center justify-center bg-muted/50 rounded-md">
              <p className="text-sm text-muted-foreground">Mood correlation chart</p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Weekly Analysis</CardTitle>
            <LineChart className="h-5 w-5 text-therapy-primary" />
          </CardHeader>
          <CardContent>
            <CardDescription className="mt-2">
              AI-powered analysis of your progress and areas for focus
            </CardDescription>
            <div className="p-4 mt-4 border rounded-md">
              <p className="text-sm">Your anxiety levels have decreased by 12% this week, potentially correlated with your increased outdoor activities. The data suggests continuing with daily walks and breathing exercises.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Insights;
