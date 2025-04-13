
import { Bell, Menu, Settings, User, MessageCircle, Brain, Briefcase, HeartPulse, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAIMode } from "@/hooks/use-ai-mode";
import { Badge } from "@/components/ui/badge";
import SOSButton from "./SOSButton";

interface NavBarProps {
  toggleSidebar?: () => void;
}

const NavBar = ({ toggleSidebar }: NavBarProps) => {
  const isMobile = useIsMobile();
  const [notifications] = useState(2);
  const location = useLocation();
  const { isAIMode, therapyMode } = useAIMode();
  
  // Check if we're on the index page to help with AI Mode indicator
  const isIndexPage = location.pathname === "/";

  return (
    <div className="w-full px-4 py-3 border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isMobile && toggleSidebar && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <Link to="/" className="flex items-center">
            <div className="bg-therapy-primary text-white rounded-lg p-1 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold">CBT Insight Guardian</h1>
              {isIndexPage && (
                <>
                  {isAIMode && (
                    <span className="text-xs text-therapy-primary flex items-center">
                      <Brain className="h-3 w-3 mr-1" /> AI Self-Therapy Mode
                    </span>
                  )}
                  {therapyMode === 'corporate' && (
                    <span className="text-xs text-blue-600 flex items-center">
                      <Briefcase className="h-3 w-3 mr-1" /> Corporate Wellness Mode
                    </span>
                  )}
                  {therapyMode === 'relaxation' && (
                    <span className="text-xs text-green-600 flex items-center">
                      <HeartPulse className="h-3 w-3 mr-1" /> Relaxation Mode
                    </span>
                  )}
                  {therapyMode === 'clinical' && (
                    <span className="text-xs text-red-600 flex items-center">
                      <Stethoscope className="h-3 w-3 mr-1" /> Medical Mode
                    </span>
                  )}
                </>
              )}
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <SOSButton />
          
          <Button variant="ghost" size="icon" asChild>
            <Link to="/chat">
              <MessageCircle className="h-5 w-5" />
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-therapy-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <span className="font-medium">Therapy session reminder</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className="font-medium">Journal entry needed</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" asChild>
            <Link to="/settings">
              <Settings className="h-5 w-5" />
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link to="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/therapist-dashboard">
                  Therapist Dashboard
                  <Badge variant="outline" className="ml-2 bg-therapy-light">AI-Enhanced</Badge>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
