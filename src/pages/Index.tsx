
import MainLayout from "@/layouts/MainLayout";
import AISelfTherapyMode from "@/components/AISelfTherapyMode";
import AIInsightsSection from "@/components/ai/AIInsightsSection";
import PersonalizedInsightsSection from "@/components/ai/PersonalizedInsightsSection";
import AITherapyModeTab from "@/components/ai/AITherapyModeTab";
import { InfoButton } from "@/components/ui/info-button";

const Index = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-muted-foreground">Your personal therapy insights and tools</p>
          </div>
          <InfoButton tooltip="This dashboard provides an overview of your therapy progress, insights, and tools to help you manage your mental health." />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <AIInsightsSection />
            <PersonalizedInsightsSection />
          </div>
          
          <div className="space-y-6">
            <AITherapyModeTab />
            <AISelfTherapyMode className="w-full" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
