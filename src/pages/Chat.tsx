
import { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";

type Message = {
  id: string;
  content: string;
  sender: "user" | "therapist";
  timestamp: Date;
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello Alex, how are you feeling today?",
      sender: "therapist",
      timestamp: new Date(new Date().getTime() - 30000),
    },
    {
      id: "2",
      content: "I'm feeling a bit better than yesterday, but still struggling with some anxiety in the mornings.",
      sender: "user",
      timestamp: new Date(new Date().getTime() - 25000),
    },
    {
      id: "3",
      content: "It's good to hear you're feeling a bit better. Can you tell me more about your morning anxiety? What thoughts come up?",
      sender: "therapist",
      timestamp: new Date(new Date().getTime() - 20000),
    },
  ]);
  
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage("");
    
    // Simulate therapist response after a short delay
    setTimeout(() => {
      const therapistMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thank you for sharing that. Have you been practicing the breathing exercises we discussed in our last session?",
        sender: "therapist",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, therapistMessage]);
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Chat with your Therapist</h1>
        <p className="text-muted-foreground">Secure messaging between sessions</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="flex flex-col h-[calc(100vh-220px)]">
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <div className="bg-therapy-primary text-white rounded-full h-full w-full flex items-center justify-center text-lg font-semibold">
                  DR
                </div>
              </Avatar>
              <div>
                <h3 className="font-medium">Dr. Rebecca Müller</h3>
                <p className="text-xs text-muted-foreground">Licensed Therapist • Online</p>
              </div>
            </div>
          </div>
          
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[75%] rounded-lg p-3 ${
                      message.sender === 'user' 
                        ? 'bg-therapy-primary text-white' 
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t">
            <form 
              className="flex gap-2" 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <Input 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Chat;
