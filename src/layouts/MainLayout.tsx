
import { ReactNode, useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import FloatingSOS from "@/components/FloatingSOS";
import OnboardingExperience from "@/components/onboarding/OnboardingExperience";
import { useOnboarding } from "@/hooks/use-onboarding";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const { isOnboardingActive } = useOnboarding();
  const navigate = useNavigate();

  useEffect(() => {
    // Adjust sidebar based on screen size
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSOSClick = () => {
    navigate('/emergency');
  };

  return (
    <div className="min-h-screen flex w-full overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen && !isMobile ? 'ml-64' : 'ml-0'} h-screen overflow-auto`}>
        <NavBar toggleSidebar={toggleSidebar}>
          <Button 
            variant="destructive" 
            size="sm" 
            className="flex items-center gap-1 ml-auto"
            onClick={handleSOSClick}
          >
            <AlertTriangle className="h-4 w-4" />
            <span className="hidden sm:inline">Emergency</span>
          </Button>
        </NavBar>
        <main className="p-4 flex-1 overflow-auto">
          {children}
        </main>
      </div>
      
      {/* Onboarding Experience */}
      {isOnboardingActive && <OnboardingExperience />}
    </div>
  );
};

export default MainLayout;
