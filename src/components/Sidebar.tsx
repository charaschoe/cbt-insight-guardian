
import { 
  BarChart4, 
  BookOpen, 
  Calendar, 
  Home, 
  LineChart, 
  Lightbulb,
  Users,
  MessageCircle,
  Brain
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAIMode } from "@/hooks/use-ai-mode";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const { pathname } = useLocation();
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  const { isAIMode } = useAIMode();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: "Dashboard", path: "/", icon: Home },
    { name: "Journal", path: "/journal", icon: BookOpen },
    { name: "Chat", path: "/chat", icon: MessageCircle },
    { name: "Insights", path: "/insights", icon: LineChart },
    { name: "Progress", path: "/progress", icon: BarChart4 },
    { name: "Sessions", path: "/sessions", icon: Calendar },
    { name: "Exercises", path: "/exercises", icon: Lightbulb },
    { name: "Community", path: "/community", icon: Users },
  ];

  // Add AI Analysis link if AI mode is enabled
  if (isAIMode) {
    navItems.push({ name: "AI Analysis", path: "/analysis", icon: Brain });
  }

  if (!mounted) return null;

  return (
    <div 
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex flex-col w-64 bg-card border-r shadow-lg transition-transform duration-300 ease-in-out",
        isMobile && !isOpen ? "-translate-x-full" : "translate-x-0"
      )}
    >
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="space-y-6">
          <div className="space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={pathname === item.path ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 font-normal",
                  pathname === item.path
                    ? "bg-therapy-primary text-white"
                    : "text-muted-foreground hover:text-foreground"
                )}
                size="sm"
                asChild
                onClick={isMobile ? toggleSidebar : undefined}
              >
                <Link to={item.path}>
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="p-4 border-t">
        <div className="rounded-lg bg-muted p-4">
          <h4 className="text-sm font-medium mb-2">Next Session</h4>
          <p className="text-xs text-muted-foreground mb-2">Thursday, 28 July</p>
          <p className="text-xs text-muted-foreground">2:00 PM - 3:00 PM</p>
          <Button variant="outline" size="sm" className="w-full mt-3" asChild>
            <Link to="/sessions">
              <Calendar className="h-3 w-3 mr-2" />
              View Details
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
