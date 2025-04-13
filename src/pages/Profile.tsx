
import MainLayout from "@/layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import ProfileModeSelector from "@/components/ProfileModeSelector";
import { UserCircle, Bell, Globe, Lock, Settings, Mail, Phone } from "lucide-react";
import { useAIMode } from "@/hooks/use-ai-mode";

const Profile = () => {
  const { isAIMode } = useAIMode();

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Your Profile</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="col-span-1 h-fit">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src="/placeholder.svg" alt="Alex Johnson" />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold">Alex Johnson</h2>
            <p className="text-sm text-muted-foreground mb-4">Member since May 2023</p>
            
            <div className="w-full space-y-2">
              <Button variant="outline" className="w-full">Edit Profile</Button>
              <Button variant="outline" className="w-full">Change Password</Button>
            </div>
            
            <div className="border-t w-full mt-6 pt-4">
              <p className="text-sm font-medium mb-2">Account Status</p>
              <div className="flex items-center justify-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                <span className="text-sm">Active</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="col-span-1 md:col-span-3">
          <Tabs defaultValue="personal">
            <TabsList className="mb-6 grid grid-cols-5 w-full">
              <TabsTrigger value="personal">
                <UserCircle className="h-4 w-4 mr-2" />
                Personal
              </TabsTrigger>
              <TabsTrigger value="therapy">
                <Settings className="h-4 w-4 mr-2" />
                Therapy
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="privacy">
                <Lock className="h-4 w-4 mr-2" />
                Privacy
              </TabsTrigger>
              <TabsTrigger value="integrations">
                <Globe className="h-4 w-4 mr-2" />
                Integrations
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="Alex" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Johnson" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="alex@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" defaultValue="I'm on a journey to better mental health and self-improvement." className="min-h-[100px]" />
                  </div>
                  
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Contact Preferences</CardTitle>
                  <CardDescription>Manage how we contact you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base" htmlFor="emailUpdates">Email Updates</Label>
                      <p className="text-sm text-muted-foreground">Receive important updates via email</p>
                    </div>
                    <Switch id="emailUpdates" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base" htmlFor="smsReminders">SMS Reminders</Label>
                      <p className="text-sm text-muted-foreground">Get session reminders via text</p>
                    </div>
                    <Switch id="smsReminders" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base" htmlFor="appNotifications">App Notifications</Label>
                      <p className="text-sm text-muted-foreground">Push notifications on mobile and desktop</p>
                    </div>
                    <Switch id="appNotifications" defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="therapy" className="space-y-6">
              <ProfileModeSelector />
              
              {isAIMode && (
                <Card>
                  <CardHeader>
                    <CardTitle>AI Therapy Settings</CardTitle>
                    <CardDescription>Customize your AI therapy experience</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base" htmlFor="aiMode">AI Self-Therapy Mode</Label>
                        <p className="text-sm text-muted-foreground">Enable AI-powered therapy without clinician involvement</p>
                      </div>
                      <Switch id="aiMode" checked={isAIMode} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base" htmlFor="patternAnalysis">Pattern Analysis</Label>
                        <p className="text-sm text-muted-foreground">Allow AI to identify recurring thought patterns</p>
                      </div>
                      <Switch id="patternAnalysis" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base" htmlFor="themeAnalysis">Theme Analysis</Label>
                        <p className="text-sm text-muted-foreground">Allow AI to identify overarching themes in your thoughts</p>
                      </div>
                      <Switch id="themeAnalysis" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base" htmlFor="showResearch">Show Research Process</Label>
                        <p className="text-sm text-muted-foreground">Display how the AI processes information</p>
                      </div>
                      <Switch id="showResearch" defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Manage when and how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Session Reminders</Label>
                      <p className="text-sm text-muted-foreground">Upcoming therapy sessions</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Journal Reminders</Label>
                      <p className="text-sm text-muted-foreground">Daily reminders to journal</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Exercise Completion</Label>
                      <p className="text-sm text-muted-foreground">When exercises are due or completed</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">New AI Insights</Label>
                      <p className="text-sm text-muted-foreground">When the AI identifies new patterns or insights</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Messages</Label>
                      <p className="text-sm text-muted-foreground">New messages from your therapist or community</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="privacy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>Control your data and privacy preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Data Collection</Label>
                      <p className="text-sm text-muted-foreground">Allow anonymous data collection to improve services</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Share Progress with Therapist</Label>
                      <p className="text-sm text-muted-foreground">Allow your therapist to view your activity and progress</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Community Visibility</Label>
                      <p className="text-sm text-muted-foreground">Make your profile visible to the community</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="mt-6 space-y-2">
                    <Button variant="outline" className="w-full">Download My Data</Button>
                    <Button variant="outline" className="w-full text-red-500 hover:text-red-500 hover:bg-red-50">Delete Account</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="integrations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Connected Services</CardTitle>
                  <CardDescription>Manage integrations with external services</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-md">
                        <Mail className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Google Calendar</h4>
                        <p className="text-sm text-muted-foreground">For session scheduling</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded-md">
                        <Phone className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Apple Health</h4>
                        <p className="text-sm text-muted-foreground">For fitness and sleep data</p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-100 p-2 rounded-md">
                        <Globe className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">EHR Integration</h4>
                        <p className="text-sm text-muted-foreground">For medical record access</p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                  
                  <Button variant="outline" className="w-full mt-2">Connect New Service</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
