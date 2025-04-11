
import MainLayout from "@/layouts/MainLayout";
import { Calendar, Clock, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Sessions = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Therapy Sessions</h1>
        <p className="text-muted-foreground">Schedule and manage your therapy appointments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
              <CardDescription>Your scheduled therapy appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-therapy-primary/20 p-2">
                        <Video className="h-5 w-5 text-therapy-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Video Session with Dr. Rebecca Müller</h3>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          <span>Thursday, April 28, 2025</span>
                          <span className="mx-2">•</span>
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          <span>2:00 PM - 3:00 PM</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm">Join</Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-therapy-primary/20 p-2">
                        <Video className="h-5 w-5 text-therapy-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Video Session with Dr. Rebecca Müller</h3>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          <span>Thursday, May 5, 2025</span>
                          <span className="mx-2">•</span>
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          <span>2:00 PM - 3:00 PM</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Reschedule</Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Schedule New Session</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Session Notes</CardTitle>
              <CardDescription>Recent notes from your therapy sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    <span>April 14, 2025</span>
                    <span className="mx-2">•</span>
                    <span>Dr. Rebecca Müller</span>
                  </div>
                  <p className="text-sm">Discussed anxiety triggers and introduced new breathing techniques. Client reported improvement in sleep patterns. Planning to focus on cognitive restructuring exercises next week.</p>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    <span>April 7, 2025</span>
                    <span className="mx-2">•</span>
                    <span>Dr. Rebecca Müller</span>
                  </div>
                  <p className="text-sm">Reviewed thought records. Client identified catastrophic thinking patterns around work presentations. Created action plan to challenge these thoughts using evidence-based techniques.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Your Therapist</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-muted mb-4 overflow-hidden">
                <div className="bg-therapy-primary text-white rounded-full h-full w-full flex items-center justify-center text-2xl font-semibold">
                  DR
                </div>
              </div>
              <h3 className="font-medium">Dr. Rebecca Müller</h3>
              <p className="text-sm text-muted-foreground mb-4">Licensed Cognitive Behavioral Therapist</p>
              <div className="text-sm text-left w-full space-y-2">
                <p className="flex items-start">
                  <span className="font-medium mr-2">Specialties:</span>
                  <span>Anxiety, Depression, Stress Management</span>
                </p>
                <p className="flex items-start">
                  <span className="font-medium mr-2">Experience:</span>
                  <span>12 years</span>
                </p>
                <p className="flex items-start">
                  <span className="font-medium mr-2">Languages:</span>
                  <span>English, German</span>
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button className="w-full" variant="outline">View Profile</Button>
              <Button className="w-full">Send Message</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Sessions;
