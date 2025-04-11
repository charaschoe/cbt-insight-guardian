
import MainLayout from "@/layouts/MainLayout";
import { BarChart4 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const ProgressPage = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Progress</h1>
        <p className="text-muted-foreground">Track your therapy journey and goals</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Therapy Goals</CardTitle>
            <BarChart4 className="h-5 w-5 text-therapy-primary" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium">Anxiety Management</p>
                  <span className="text-xs text-muted-foreground">68%</span>
                </div>
                <Progress value={68} className="h-2" />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium">Cognitive Restructuring</p>
                  <span className="text-xs text-muted-foreground">45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium">Sleep Improvement</p>
                  <span className="text-xs text-muted-foreground">76%</span>
                </div>
                <Progress value={76} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Mood Trends</CardTitle>
            <BarChart4 className="h-5 w-5 text-therapy-primary" />
          </CardHeader>
          <CardContent>
            <CardDescription className="mt-2">
              Your mood patterns over the last 30 days
            </CardDescription>
            <div className="h-48 mt-4 flex items-center justify-center bg-muted/50 rounded-md">
              <p className="text-sm text-muted-foreground">Mood trend chart</p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Skills Practice</CardTitle>
            <BarChart4 className="h-5 w-5 text-therapy-primary" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-md p-4">
                <h3 className="text-sm font-medium mb-2">Breathing Exercises</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">12 of 14 days</span>
                  <span className="text-xs font-medium text-green-600">86%</span>
                </div>
                <Progress value={86} className="h-2 mt-2" />
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="text-sm font-medium mb-2">Thought Records</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">8 of 14 days</span>
                  <span className="text-xs font-medium text-amber-600">57%</span>
                </div>
                <Progress value={57} className="h-2 mt-2" />
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="text-sm font-medium mb-2">Mindfulness</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">5 of 14 days</span>
                  <span className="text-xs font-medium text-red-600">36%</span>
                </div>
                <Progress value={36} className="h-2 mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ProgressPage;
