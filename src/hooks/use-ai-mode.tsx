
import { useState, useEffect, createContext, useContext } from 'react';

type TherapyMode = 'standard' | 'ai' | 'corporate' | 'clinical' | 'relaxation';
type AIApproach = 'balanced' | 'socratic' | 'cognitive' | 'behavioral' | 'mindfulness' | 'solution-focused';
type AIDepth = 'basic' | 'advanced' | 'research';

interface AIContextType {
  isAIMode: boolean;
  therapyMode: TherapyMode;
  setTherapyMode: (mode: TherapyMode) => void;
  aiApproach: AIApproach;
  setAIApproach: (approach: AIApproach) => void;
  aiDepth: AIDepth;
  setAIDepth: (depth: AIDepth) => void;
  showResearchProcess: boolean;
  patternAnalysisEnabled: boolean;
  themeAnalysisEnabled: boolean;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const AIProvider = ({ children }: { children: React.ReactNode }) => {
  // Core AI mode state - now derived from therapyMode
  const [therapyMode, setTherapyMode] = useState<TherapyMode>(() => {
    const savedMode = localStorage.getItem('therapyMode');
    return (savedMode as TherapyMode) || 'standard';
  });

  // AI mode is now calculated from therapyMode instead of stored separately
  const isAIMode = therapyMode === 'ai';
  
  const [aiApproach, setAIApproach] = useState<AIApproach>(() => {
    const savedApproach = localStorage.getItem('aiApproach');
    return (savedApproach as AIApproach) || 'balanced';
  });

  // AI analysis depth and visibility options
  const [aiDepth, setAIDepth] = useState<AIDepth>(() => {
    const savedDepth = localStorage.getItem('aiDepth');
    return (savedDepth as AIDepth) || 'basic';
  });

  const [showResearchProcess, setShowResearchProcess] = useState<boolean>(() => {
    const savedValue = localStorage.getItem('showResearchProcess');
    return savedValue === 'true';
  });

  // Feature toggles for analysis capabilities
  const [patternAnalysisEnabled, setPatternAnalysisEnabled] = useState<boolean>(() => {
    const savedValue = localStorage.getItem('patternAnalysisEnabled');
    return savedValue === 'false' ? false : true; // Default to true
  });

  const [themeAnalysisEnabled, setThemeAnalysisEnabled] = useState<boolean>(() => {
    const savedValue = localStorage.getItem('themeAnalysisEnabled');
    return savedValue === 'false' ? false : true; // Default to true
  });

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('therapyMode', therapyMode);
  }, [therapyMode]);

  useEffect(() => {
    localStorage.setItem('aiApproach', aiApproach);
  }, [aiApproach]);

  useEffect(() => {
    localStorage.setItem('aiDepth', aiDepth);
  }, [aiDepth]);

  useEffect(() => {
    localStorage.setItem('showResearchProcess', showResearchProcess.toString());
  }, [showResearchProcess]);

  useEffect(() => {
    localStorage.setItem('patternAnalysisEnabled', patternAnalysisEnabled.toString());
  }, [patternAnalysisEnabled]);

  useEffect(() => {
    localStorage.setItem('themeAnalysisEnabled', themeAnalysisEnabled.toString());
  }, [themeAnalysisEnabled]);

  return (
    <AIContext.Provider value={{ 
      isAIMode, 
      therapyMode, 
      setTherapyMode,
      aiApproach,
      setAIApproach,
      aiDepth,
      setAIDepth,
      showResearchProcess,
      patternAnalysisEnabled,
      themeAnalysisEnabled
    }}>
      {children}
    </AIContext.Provider>
  );
};

export const useAIMode = () => {
  const context = useContext(AIContext);
  
  if (context === undefined) {
    // For backward compatibility, return a simplified version if not within provider
    const [therapyMode, setTherapyMode] = useState<TherapyMode>(() => {
      const savedMode = localStorage.getItem('therapyMode');
      return (savedMode as TherapyMode) || 'standard';
    });

    const isAIMode = therapyMode === 'ai';

    useEffect(() => {
      localStorage.setItem('therapyMode', therapyMode);
    }, [therapyMode]);

    return { 
      isAIMode, 
      therapyMode,
      setTherapyMode,
      aiApproach: 'balanced' as AIApproach,
      setAIApproach: () => {},
      aiDepth: 'basic' as AIDepth,
      setAIDepth: () => {},
      showResearchProcess: false,
      patternAnalysisEnabled: true,
      themeAnalysisEnabled: true
    };
  }
  
  return context;
};
