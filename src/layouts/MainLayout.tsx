
import { ReactNode, useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import OnboardingExperience from "@/components/onboarding/OnboardingExperience";
import { useOnboarding } from "@/hooks/use-onboarding";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const { isOnboardingActive } = useOnboarding();

  useEffect(() => {
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

  return (
    <div className="min-h-screen flex w-full overflow-hidden bg-gray-50/30">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen && !isMobile ? 'ml-64' : 'ml-0'} h-screen overflow-auto`}>
        <NavBar toggleSidebar={toggleSidebar} />
        <main className="p-4 md:p-6 flex-1 overflow-auto w-full mx-auto">
          {children}
        </main>
      </div>
      
      {isOnboardingActive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-2xl mx-auto p-4">
            <OnboardingExperience />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
