
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Briefcase, Users, AlertTriangle, Lightbulb, HeartPulse } from "lucide-react";

const TherapyModeSelector = () => {
  const therapyApproaches = [
    {
      category: "Quick Support (Mild Issues)",
      percentile: "1-5th Percentile",
      approaches: [
        { name: "Mindfulness Practice", icon: Brain },
        { name: "Lifestyle Optimization", icon: HeartPulse },
        { name: "Gratitude & Ikigai", icon: Lightbulb },
        { name: "Anxiety Auditing", icon: AlertTriangle }
      ]
    },
    {
      category: "Standard Therapy (Most Cases)",
      percentile: "5-95th Percentile",
      approaches: [
        { name: "Cognitive Behavioral Therapy", icon: Brain },
        { name: "Dialectical Behavior Therapy", icon: Lightbulb },
        { name: "Acceptance & Commitment", icon: HeartPulse }
      ]
    },
    {
      category: "Intensive Support (Severe Cases)",
      percentile: "95th+ Percentile",
      approaches: [
        { name: "Clinical Referral", icon: Users },
        { name: "Crisis Support", icon: AlertTriangle },
        { name: "Supervised AI Therapy", icon: Brain }
      ]
    }
  ];

  return (
    <Tabs defaultValue="approaches" className="space-y-4">
      <TabsList className="grid grid-cols-3">
        <TabsTrigger value="approaches">Therapy Approaches</TabsTrigger>
        <TabsTrigger value="corporate">Corporate Wellness</TabsTrigger>
        <TabsTrigger value="clinical">Clinical Integration</TabsTrigger>
      </TabsList>
      
      <TabsContent value="approaches" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {therapyApproaches.map((category, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle className="text-base">{category.category}</CardTitle>
                <CardDescription>{category.percentile}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.approaches.map((approach, i) => (
                    <div key={i} className="flex items-center justify-between p-2 border rounded-md hover:border-therapy-primary hover:bg-therapy-light transition-colors cursor-pointer">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-therapy-primary/10 p-1.5">
                          <approach.icon className="h-4 w-4 text-therapy-primary" />
                        </div>
                        <span className="text-sm font-medium">{approach.name}</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-therapy-primary" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="corporate" className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-therapy-primary/10 p-2">
                <Briefcase className="h-5 w-5 text-therapy-primary" />
              </div>
              <div>
                <CardTitle>Corporate Wellness Mode</CardTitle>
                <CardDescription>Workplace-focused mental wellness support</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm">
                Designed for professionals experiencing workplace stress, burnout, or motivation challenges. Features bite-sized sessions and exercises tailored to corporate environments.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="border rounded-md p-3 hover:border-therapy-primary cursor-pointer transition-colors">
                  <h4 className="font-medium mb-1">5-Minute Stress Relief</h4>
                  <p className="text-xs text-muted-foreground">Quick exercises for workplace stress management</p>
                </div>
                
                <div className="border rounded-md p-3 hover:border-therapy-primary cursor-pointer transition-colors">
                  <h4 className="font-medium mb-1">Burnout Prevention</h4>
                  <p className="text-xs text-muted-foreground">Recognize and address early signs of burnout</p>
                </div>
                
                <div className="border rounded-md p-3 hover:border-therapy-primary cursor-pointer transition-colors">
                  <h4 className="font-medium mb-1">Workplace Motivation</h4>
                  <p className="text-xs text-muted-foreground">Reconnect with purpose in your professional life</p>
                </div>
                
                <div className="border rounded-md p-3 hover:border-therapy-primary cursor-pointer transition-colors">
                  <h4 className="font-medium mb-1">Difficult Conversations</h4>
                  <p className="text-xs text-muted-foreground">Prepare for challenging workplace interactions</p>
                </div>
              </div>
              
              <Button className="w-full">Activate Corporate Wellness Mode</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="clinical" className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-therapy-primary/10 p-2">
                <Users className="h-5 w-5 text-therapy-primary" />
              </div>
              <div>
                <CardTitle>Clinical Integration Mode</CardTitle>
                <CardDescription>Enhanced support for patients with therapists</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm">
                Designed to complement traditional therapy sessions with your healthcare provider. Offers homework tracking, session preparation, and progress sharing with your therapist.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="border rounded-md p-3 hover:border-therapy-primary cursor-pointer transition-colors">
                  <h4 className="font-medium mb-1">Session Preparation</h4>
                  <p className="text-xs text-muted-foreground">Gather thoughts and topics before therapy sessions</p>
                </div>
                
                <div className="border rounded-md p-3 hover:border-therapy-primary cursor-pointer transition-colors">
                  <h4 className="font-medium mb-1">Therapist Dashboard</h4>
                  <p className="text-xs text-muted-foreground">Share insights and progress with your provider</p>
                </div>
                
                <div className="border rounded-md p-3 hover:border-therapy-primary cursor-pointer transition-colors">
                  <h4 className="font-medium mb-1">CBT Homework</h4>
                  <p className="text-xs text-muted-foreground">Complete assigned therapeutic exercises</p>
                </div>
                
                <div className="border rounded-md p-3 hover:border-therapy-primary cursor-pointer transition-colors">
                  <h4 className="font-medium mb-1">Crisis Support</h4>
                  <p className="text-xs text-muted-foreground">Access immediate help between sessions</p>
                </div>
              </div>
              
              <Button className="w-full">Connect With Your Therapist</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default TherapyModeSelector;
