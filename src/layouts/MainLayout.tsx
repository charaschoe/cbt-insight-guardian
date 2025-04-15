
import { ReactNode, useState } from "react";
import NavBar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import FloatingSOS from "@/components/FloatingSOS";
import OnboardingExperience from "@/components/onboarding/OnboardingExperience";
import { useOnboarding } from "@/hooks/use-onboarding";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const { isOnboardingActive } = useOnboarding();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex w-full">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen && !isMobile ? 'ml-64' : 'ml-0'}`}>
        <NavBar toggleSidebar={toggleSidebar} />
        <main className="p-4 flex-1 overflow-auto">
          {children}
        </main>
        <FloatingSOS />
      </div>
      
      {/* Onboarding Experience */}
      {isOnboardingActive && <OnboardingExperience />}
    </div>
  );
};

export default MainLayout;
