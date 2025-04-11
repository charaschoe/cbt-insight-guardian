
import MainLayout from "@/layouts/MainLayout";
import { MessageCircle, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

const Community = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Community Support</h1>
        <p className="text-muted-foreground">Connect with others on similar journeys</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Discussion Groups</CardTitle>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-8 h-9 w-[200px]" placeholder="Search groups..." />
                </div>
              </div>
              <CardDescription>Join moderated groups focused on specific topics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <div className="rounded-full bg-therapy-primary/20 p-2 h-fit">
                        <Users className="h-5 w-5 text-therapy-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Anxiety Support</h3>
                        <p className="text-sm text-muted-foreground mt-1">A safe space to discuss anxiety management techniques and share experiences</p>
                        <div className="flex items-center mt-2">
                          <div className="flex -space-x-2">
                            {[1, 2, 3].map((i) => (
                              <Avatar key={i} className="h-6 w-6 border-2 border-background">
                                <div className="bg-muted h-full w-full"></div>
                              </Avatar>
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground ml-2">248 members</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm">Join</Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <div className="rounded-full bg-therapy-primary/20 p-2 h-fit">
                        <Users className="h-5 w-5 text-therapy-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Mindfulness Practice</h3>
                        <p className="text-sm text-muted-foreground mt-1">Daily mindfulness exercises and discussions about present-moment awareness</p>
                        <div className="flex items-center mt-2">
                          <div className="flex -space-x-2">
                            {[1, 2, 3].map((i) => (
                              <Avatar key={i} className="h-6 w-6 border-2 border-background">
                                <div className="bg-muted h-full w-full"></div>
                              </Avatar>
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground ml-2">173 members</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm">Join</Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <div className="rounded-full bg-therapy-primary/20 p-2 h-fit">
                        <Users className="h-5 w-5 text-therapy-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">CBT Techniques</h3>
                        <p className="text-sm text-muted-foreground mt-1">Discussions and shared experiences with cognitive behavioral therapy methods</p>
                        <div className="flex items-center mt-2">
                          <div className="flex -space-x-2">
                            {[1, 2, 3].map((i) => (
                              <Avatar key={i} className="h-6 w-6 border-2 border-background">
                                <div className="bg-muted h-full w-full"></div>
                              </Avatar>
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground ml-2">305 members</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Joined</Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Groups</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Discussions</CardTitle>
              <CardDescription>Popular topics from your groups</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <div className="bg-muted h-full w-full"></div>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">Breathing techniques for sudden anxiety?</h3>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <span>Posted by Sarah</span>
                        <span className="mx-2">•</span>
                        <span>Anxiety Support Group</span>
                        <span className="mx-2">•</span>
                        <span>2 hours ago</span>
                      </div>
                      <div className="flex items-center mt-2">
                        <MessageCircle className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">14 replies</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <div className="bg-muted h-full w-full"></div>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">Weekly challenge: 5-minute daily meditation</h3>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <span>Posted by Michael</span>
                        <span className="mx-2">•</span>
                        <span>Mindfulness Practice</span>
                        <span className="mx-2">•</span>
                        <span>1 day ago</span>
                      </div>
                      <div className="flex items-center mt-2">
                        <MessageCircle className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">28 replies</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Community Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <p>Our community is a safe space for everyone. Please follow these guidelines:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Be respectful and supportive of others</li>
                  <li>Maintain confidentiality</li>
                  <li>No promotion of harmful content</li>
                  <li>Respect differing opinions and experiences</li>
                  <li>Report any concerning content</li>
                </ul>
                <p className="text-muted-foreground mt-4">All groups are moderated by licensed mental health professionals to ensure a supportive environment.</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View Full Guidelines</Button>
            </CardFooter>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Your Groups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  <span>CBT Techniques</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  <span>Sleep Improvement</span>
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Find New Groups</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Community;
