
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import NavBar from "@/components/NavBar";
import { useIsMobile } from "@/hooks/use-mobile";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex w-full">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div 
        className={`flex-1 transition-all duration-300 ${
          !isMobile && sidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <NavBar toggleSidebar={toggleSidebar} />
        <div className="p-4 md:p-6">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
