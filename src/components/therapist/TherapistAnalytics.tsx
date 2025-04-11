
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AreaChart, BarChart, LineChart, PieChart } from "lucide-react";

export const TherapistAnalytics = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Therapy Analytics</h2>
        <div className="flex items-center space-x-2">
          <Select defaultValue="month">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="outcomes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="outcomes">Treatment Outcomes</TabsTrigger>
          <TabsTrigger value="engagement">Patient Engagement</TabsTrigger>
          <TabsTrigger value="patterns">Therapy Patterns</TabsTrigger>
          <TabsTrigger value="efficiency">Efficiency Metrics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="outcomes" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Overall Treatment Progress</CardTitle>
                <CardDescription>Aggregated across all patients</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex items-center justify-center h-full">
                  <div className="text-center space-y-2">
                    <LineChart className="h-16 w-16 mx-auto text-therapy-primary/50" />
                    <p className="text-sm text-muted-foreground">Treatment progress visualization</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Condition Improvements</CardTitle>
                <CardDescription>By primary diagnosis</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex items-center justify-center h-full">
                  <div className="text-center space-y-2">
                    <BarChart className="h-16 w-16 mx-auto text-therapy-primary/50" />
                    <p className="text-sm text-muted-foreground">Condition improvement rates</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>AI-Detected Patterns in Treatment Success</CardTitle>
              <CardDescription>Correlations between therapy methods and patient outcomes</CardDescription>
            </CardHeader>
            <CardContent className="h-80 p-6">
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Anxiety Treatment Success Factors</h3>
                  <p className="text-sm text-muted-foreground mb-2">AI analysis detected strong correlation between:</p>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground">
                    <li>Daily breathing exercise adherence (83% correlation)</li>
                    <li>Regular sleep schedule (78% correlation)</li>
                    <li>Cognitive restructuring journaling (72% correlation)</li>
                  </ul>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Depression Recovery Indicators</h3>
                  <p className="text-sm text-muted-foreground mb-2">AI analysis detected strong correlation between:</p>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground">
                    <li>Social activity increases (85% correlation)</li>
                    <li>Physical exercise consistency (81% correlation)</li>
                    <li>Daylight exposure duration (76% correlation)</li>
                  </ul>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Treatment Resistance Factors</h3>
                  <p className="text-sm text-muted-foreground mb-2">AI analysis detected pattern indicating resistance:</p>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground">
                    <li>Inconsistent app usage patterns (91% correlation)</li>
                    <li>Incomplete homework assignments (87% correlation)</li>
                    <li>Missed session frequency (82% correlation)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="engagement" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>App Engagement Metrics</CardTitle>
                <CardDescription>Usage patterns by feature</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex items-center justify-center h-full">
                  <div className="text-center space-y-2">
                    <PieChart className="h-16 w-16 mx-auto text-therapy-primary/50" />
                    <p className="text-sm text-muted-foreground">App feature usage distribution</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Homework Completion Rates</CardTitle>
                <CardDescription>By assignment type</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex items-center justify-center h-full">
                  <div className="text-center space-y-2">
                    <BarChart className="h-16 w-16 mx-auto text-therapy-primary/50" />
                    <p className="text-sm text-muted-foreground">Homework completion statistics</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="patterns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Detected Cognitive Patterns</CardTitle>
              <CardDescription>Common thought distortions across patient populations</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <div className="space-y-4 p-4">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium">Catastrophizing</h3>
                  <div className="flex items-center mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-therapy-primary h-2.5 rounded-full" style={{ width: "78%" }}></div>
                    </div>
                    <span className="text-sm ml-2">78%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Detected in 78% of anxiety patients</p>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium">All-or-Nothing Thinking</h3>
                  <div className="flex items-center mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-therapy-primary h-2.5 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                    <span className="text-sm ml-2">65%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Common in perfectionist patients</p>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium">Negative Filtering</h3>
                  <div className="flex items-center mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-therapy-primary h-2.5 rounded-full" style={{ width: "82%" }}></div>
                    </div>
                    <span className="text-sm ml-2">82%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Prevalent in depression cases</p>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium">Overgeneralization</h3>
                  <div className="flex items-center mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-therapy-primary h-2.5 rounded-full" style={{ width: "59%" }}></div>
                    </div>
                    <span className="text-sm ml-2">59%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Common across all diagnostic groups</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="efficiency" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Session Effectiveness</CardTitle>
                <CardDescription>Improvement rate by session time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex items-center justify-center h-full">
                  <div className="text-center space-y-2">
                    <AreaChart className="h-16 w-16 mx-auto text-therapy-primary/50" />
                    <p className="text-sm text-muted-foreground">Session effectiveness metrics</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Treatment Length Optimization</CardTitle>
                <CardDescription>Optimal treatment duration by condition</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex items-center justify-center h-full">
                  <div className="text-center space-y-2">
                    <LineChart className="h-16 w-16 mx-auto text-therapy-primary/50" />
                    <p className="text-sm text-muted-foreground">Treatment length optimization chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
