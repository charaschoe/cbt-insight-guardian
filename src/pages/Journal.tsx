
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Search, Calendar, ArrowUp, ArrowDown, BookOpen } from "lucide-react";
import { useState } from "react";

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: Date;
  mood: number;
  tags: string[];
  aiAnalysis?: {
    distortions: string[];
    summary: string;
    insights: string;
  };
}

// Sample journal entries
const sampleEntries: JournalEntry[] = [
  {
    id: "1",
    title: "Challenging day at work",
    content: "Today was really difficult. I had a presentation that didn't go well, and I felt like everyone was judging me. My boss didn't say anything negative, but I could tell he was disappointed. I'm worried this might affect my upcoming performance review.",
    date: new Date(),
    mood: 2,
    tags: ["work", "anxiety", "presentation"],
    aiAnalysis: {
      distortions: ["Mind reading", "Fortune telling", "Emotional reasoning"],
      summary: "Feeling anxious about work presentation and interpreting neutral responses negatively.",
      insights: "You often assume others' thoughts without evidence. Try checking these assumptions."
    }
  },
  {
    id: "2",
    title: "Weekend with friends",
    content: "Spent time with Sarah and Mark today. We went hiking and had lunch at that new café. It was really nice to disconnect from work and be outdoors. I noticed I was much less anxious than I've been during the week.",
    date: new Date(Date.now() - 172800000), // 2 days ago
    mood: 4,
    tags: ["social", "outdoors", "relaxation"],
    aiAnalysis: {
      distortions: [],
      summary: "Positive social experience with reduced anxiety during outdoor activities.",
      insights: "Being in nature and socializing appears to significantly reduce your anxiety levels."
    }
  },
  {
    id: "3",
    title: "Can't sleep again",
    content: "It's 2 AM and I'm still awake. My mind keeps racing about the project deadline next week. I'm worried I won't finish in time and everyone will realize I'm not qualified for this job. This always happens to me before big deadlines.",
    date: new Date(Date.now() - 259200000), // 3 days ago
    mood: 1,
    tags: ["insomnia", "work stress", "self-doubt"],
    aiAnalysis: {
      distortions: ["Catastrophizing", "Overgeneralization", "Labeling"],
      summary: "Experiencing insomnia due to work anxiety and self-doubt about capabilities.",
      insights: "You tend to catastrophize future events and use 'always' statements when stressed."
    }
  }
];

const Journal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [entries] = useState<JournalEntry[]>(sampleEntries);
  
  const filteredEntries = entries.filter(entry => 
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const sortedEntries = [...filteredEntries].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.date.getTime() - b.date.getTime();
    } else {
      return b.date.getTime() - a.date.getTime();
    }
  });

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  const getMoodEmoji = (mood: number): string => {
    const emojis = ["😢", "😕", "😐", "🙂", "😄"];
    return emojis[mood - 1] || "😐";
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Journal</h1>
          <p className="text-muted-foreground">Record and reflect on your thoughts</p>
        </div>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          New Entry
        </Button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search journal entries..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Calendar className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          {sortOrder === "asc" ? (
            <ArrowUp className="h-4 w-4" />
          ) : (
            <ArrowDown className="h-4 w-4" />
          )}
        </Button>
      </div>

      {sortedEntries.length > 0 ? (
        <div className="space-y-6">
          {sortedEntries.map((entry) => (
            <Card key={entry.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{entry.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{formatDate(entry.date)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl" title={`Mood: ${entry.mood}/5`}>
                      {getMoodEmoji(entry.mood)}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">{entry.content}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {entry.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="text-xs bg-muted px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                {entry.aiAnalysis && (
                  <div className="mt-4 border-t pt-4">
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <div className="bg-therapy-primary text-white rounded-full p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      AI Analysis
                    </h4>
                    
                    {entry.aiAnalysis.distortions.length > 0 && (
                      <div className="mb-2">
                        <p className="text-xs text-muted-foreground mb-1">Potential Cognitive Distortions:</p>
                        <div className="flex flex-wrap gap-1">
                          {entry.aiAnalysis.distortions.map((distortion, idx) => (
                            <span 
                              key={idx} 
                              className="text-xs bg-therapy-muted px-2 py-1 rounded-full"
                            >
                              {distortion}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="mb-2">
                      <p className="text-xs text-muted-foreground mb-1">Summary:</p>
                      <p className="text-sm">{entry.aiAnalysis.summary}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Insights:</p>
                      <p className="text-sm">{entry.aiAnalysis.insights}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end mt-4">
                  <Button variant="outline" size="sm">Read More</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No entries found</h3>
          <p className="text-muted-foreground mb-6">
            {searchTerm ? "No entries match your search." : "You haven't created any journal entries yet."}
          </p>
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Your First Entry
          </Button>
        </div>
      )}
    </MainLayout>
  );
};

export default Journal;
