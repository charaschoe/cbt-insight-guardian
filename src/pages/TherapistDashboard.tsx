
import MainLayout from "@/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart4, Users, Brain, Calendar, MessageSquare, LineChart } from "lucide-react";
import { PatientList } from "@/components/therapist/PatientList";
import { TherapistAnalytics } from "@/components/therapist/TherapistAnalytics";
import { AIInsightTools } from "@/components/therapist/AIInsightTools";

const TherapistDashboard = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Therapist Dashboard</h1>
        <p className="text-muted-foreground">Manage patients and review analytics</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="ai-tools">AI Tools</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
                <Users className="h-4 w-4 text-therapy-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sessions This Week</CardTitle>
                <Calendar className="h-4 w-4 text-therapy-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">3 remaining today</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
                <MessageSquare className="h-4 w-4 text-therapy-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">From 3 different patients</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Upcoming Sessions</CardTitle>
                <CardDescription>Your schedule for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((session) => (
                    <div key={session} className="flex justify-between items-center border-b pb-3">
                      <div>
                        <p className="font-medium">Anna Schmidt</p>
                        <p className="text-sm text-muted-foreground">2:00 PM - 3:00 PM</p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>Video Session</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Patient Alerts</CardTitle>
                <CardDescription>Patients needing attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-md bg-red-50">
                    <p className="font-medium">Maria Wagner</p>
                    <p className="text-sm text-muted-foreground">Reported severe anxiety symptoms</p>
                  </div>
                  <div className="p-3 border rounded-md bg-amber-50">
                    <p className="font-medium">Thomas Becker</p>
                    <p className="text-sm text-muted-foreground">Missed last 2 check-ins</p>
                  </div>
                  <div className="p-3 border rounded-md bg-blue-50">
                    <p className="font-medium">Julia Fischer</p>
                    <p className="text-sm text-muted-foreground">New journal entry needs review</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Aggregate Outcomes</CardTitle>
              <CardDescription>Overall patient progress metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <BarChart4 className="h-12 w-12 mx-auto text-therapy-primary/50" />
                  <p className="text-sm text-muted-foreground">Therapy outcome visualization</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="patients">
          <PatientList />
        </TabsContent>
        
        <TabsContent value="analytics">
          <TherapistAnalytics />
        </TabsContent>

        <TabsContent value="ai-tools">
          <AIInsightTools />
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default TherapistDashboard;
