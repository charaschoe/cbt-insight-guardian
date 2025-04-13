
import { useState, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { PhoneCall, MessageCircle, ExternalLink, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

const EmergencySupport = () => {
  const [messages, setMessages] = useState([
    {
      id: "system-1",
      content: "You've been connected to our emergency support system. A crisis counselor will join this conversation immediately. Please share what's happening so we can help you.",
      sender: "system",
      timestamp: new Date(),
    }
  ]);
  
  const [newMessage, setNewMessage] = useState("");
  const [counselorJoining, setCounselorJoining] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate counselor joining
    const timer = setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: "counselor-1",
          content: "Hi, I'm Lisa, a crisis counselor. I'm here to help you through this difficult time. Can you tell me a bit about what's going on right now?",
          sender: "counselor",
          timestamp: new Date(),
        }
      ]);
      
      setCounselorJoining(false);
      
      toast({
        title: "Crisis Counselor Joined",
        description: "Lisa, a certified crisis counselor, is now here to help you.",
      });
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [toast]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    const userMessage = {
      id: `user-${Date.now()}`,
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    
    // Simulate counselor response
    setTimeout(() => {
      const responseOptions = [
        "I understand that must be incredibly difficult. Can you tell me more about how you're feeling right now?",
        "Thank you for sharing that with me. How long have you been feeling this way?",
        "You're not alone in this. I'm here to listen and help. What would feel most supportive to you right now?",
        "That sounds really overwhelming. Let's take this one step at a time. What's the most immediate concern for you?",
        "I'm here with you. Have you had thoughts like this before, and if so, what has helped you get through similar situations?",
      ];
      
      const counselorMessage = {
        id: `counselor-${Date.now()}`,
        content: responseOptions[Math.floor(Math.random() * responseOptions.length)],
        sender: "counselor",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, counselorMessage]);
    }, 3000);
  };
  
  return (
    <MainLayout>
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-red-600">Emergency Support</h1>
            <p className="text-muted-foreground">You're connected to priority crisis support</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <PhoneCall className="h-4 w-4" />
              Call Helpline
            </Button>
            <Button variant="destructive" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              Emergency Services
            </Button>
          </div>
        </div>
      </div>
      
      <Card className="flex flex-col h-[calc(100vh-220px)]">
        <div className="p-4 border-b bg-red-50">
          <div className="flex items-center gap-3">
            <div className="relative rounded-full h-12 w-12 flex items-center justify-center bg-red-100 text-red-600">
              {counselorJoining ? (
                <Clock className="h-6 w-6 animate-pulse" />
              ) : (
                <div className="bg-green-600 text-white rounded-full h-full w-full flex items-center justify-center text-sm font-semibold">
                  LC
                </div>
              )}
              {counselorJoining && (
                <div className="absolute inset-0 rounded-full border-2 border-red-400 animate-pulse" />
              )}
            </div>
            <div>
              <h3 className="font-medium">
                {counselorJoining ? "Connecting to Crisis Counselor..." : "Lisa, Crisis Counselor"}
              </h3>
              <p className="text-xs text-muted-foreground">
                {counselorJoining ? "Prioritized connection" : "Certified crisis intervention specialist"}
              </p>
            </div>
          </div>
        </div>
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.sender !== "user" && (
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center mr-2">
                    {message.sender === "system" ? (
                      <MessageCircle className="h-4 w-4 text-red-500" />
                    ) : (
                      <div className="bg-green-600 text-white rounded-full h-full w-full flex items-center justify-center text-xs font-semibold">
                        LC
                      </div>
                    )}
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-red-500 text-white"
                      : message.sender === "counselor"
                        ? "bg-green-100 border border-green-300"
                        : "bg-red-50 border border-red-200"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                
                {message.sender === "user" && (
                  <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center ml-2">
                    <span className="text-white text-xs">You</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 resize-none"
              rows={1}
            />
            <Button type="submit" className="bg-red-600 hover:bg-red-700">
              <MessageCircle className="h-4 w-4" />
            </Button>
          </form>
          
          <div className="mt-3 text-xs text-muted-foreground flex items-center justify-between">
            <p className="italic">
              This is a secure and confidential conversation.
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                <PhoneCall className="h-3 w-3 mr-1" />
                Switch to Call
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </MainLayout>
  );
};

export default EmergencySupport;
