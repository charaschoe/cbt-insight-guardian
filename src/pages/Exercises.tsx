
import MainLayout from "@/layouts/MainLayout";
import { Lightbulb, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const Exercises = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">CBT Exercises</h1>
        <p className="text-muted-foreground">Practice cognitive behavioral techniques</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Recommended for You</CardTitle>
            <CardDescription>Based on your recent progress and therapy goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="rounded-full bg-therapy-primary/20 p-2 w-fit mb-2">
                    <Lightbulb className="h-5 w-5 text-therapy-primary" />
                  </div>
                  <CardTitle className="text-base">Thought Records</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Identify and challenge negative thinking patterns</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Start Exercise</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="rounded-full bg-therapy-primary/20 p-2 w-fit mb-2">
                    <Lightbulb className="h-5 w-5 text-therapy-primary" />
                  </div>
                  <CardTitle className="text-base">Breathing Techniques</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Guided breathing exercises for anxiety reduction</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Start Exercise</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="rounded-full bg-therapy-primary/20 p-2 w-fit mb-2">
                    <Lightbulb className="h-5 w-5 text-therapy-primary" />
                  </div>
                  <CardTitle className="text-base">Behavioral Activation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Plan and engage in positive activities</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Start Exercise</Button>
                </CardFooter>
              </Card>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-6 md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Exercise Library</CardTitle>
              <CardDescription>Browse all available CBT exercises</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-between">
                  <span>Cognitive Restructuring</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="ghost" className="w-full justify-between">
                  <span>Exposure Therapy</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="ghost" className="w-full justify-between">
                  <span>Mindfulness Practices</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="ghost" className="w-full justify-between">
                  <span>Relaxation Techniques</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="ghost" className="w-full justify-between">
                  <span>Problem-Solving Skills</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Exercises</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Current Progress</CardTitle>
              <CardDescription>Your ongoing exercise modules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-1">Anxiety Management Module</h3>
                  <Progress value={35} className="h-2 mb-2" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">3 of 8 exercises completed</span>
                    <Button size="sm">Continue</Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-1">Sleep Improvement</h3>
                  <Progress value={75} className="h-2 mb-2" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">6 of 8 exercises completed</span>
                    <Button size="sm">Continue</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Daily Practice</CardTitle>
              <CardDescription>Maintain your therapy momentum</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-4 mb-4">
                <h3 className="font-medium mb-2">Today's Exercise</h3>
                <p className="text-sm text-muted-foreground mb-3">5-minute breathing exercise</p>
                <Button className="w-full">Begin Practice</Button>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Weekly Streak</h3>
                <div className="grid grid-cols-7 gap-1">
                  {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <span className="text-xs text-muted-foreground mb-1">{day}</span>
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${index < 4 ? "bg-therapy-primary text-white" : "bg-muted"}`}>
                        {index < 4 && <span className="text-xs">✓</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View Practice History</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Exercises;
