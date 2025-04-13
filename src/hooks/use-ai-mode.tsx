
import { useState, useEffect, createContext, useContext } from 'react';

type TherapyMode = 'standard' | 'ai' | 'corporate' | 'clinical' | 'relaxation';
type AIApproach = 'balanced' | 'socratic' | 'cognitive' | 'behavioral' | 'mindfulness' | 'solution-focused';
type AIDepth = 'basic' | 'advanced' | 'research';

interface AIContextType {
  isAIMode: boolean;
  toggleAIMode: () => void;
  therapyMode: TherapyMode;
  setTherapyMode: (mode: TherapyMode) => void;
  aiApproach: AIApproach;
  setAIApproach: (approach: AIApproach) => void;
  aiDepth: AIDepth;
  setAIDepth: (depth: AIDepth) => void;
  showResearchProcess: boolean;
  toggleResearchProcess: () => void;
  patternAnalysisEnabled: boolean;
  togglePatternAnalysis: () => void;
  themeAnalysisEnabled: boolean;
  toggleThemeAnalysis: () => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const AIProvider = ({ children }: { children: React.ReactNode }) => {
  // Core AI mode toggle
  const [isAIMode, setIsAIMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem('aiMode');
    return savedMode === 'true';
  });

  // Therapy approach/mode selections
  const [therapyMode, setTherapyMode] = useState<TherapyMode>(() => {
    const savedMode = localStorage.getItem('therapyMode');
    return (savedMode as TherapyMode) || 'standard';
  });

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
    localStorage.setItem('aiMode', isAIMode.toString());
  }, [isAIMode]);

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

  // Toggle functions
  const toggleAIMode = () => {
    setIsAIMode(prev => !prev);
  };

  const toggleResearchProcess = () => {
    setShowResearchProcess(prev => !prev);
  };

  const togglePatternAnalysis = () => {
    setPatternAnalysisEnabled(prev => !prev);
  };

  const toggleThemeAnalysis = () => {
    setThemeAnalysisEnabled(prev => !prev);
  };

  return (
    <AIContext.Provider value={{ 
      isAIMode, 
      toggleAIMode, 
      therapyMode, 
      setTherapyMode,
      aiApproach,
      setAIApproach,
      aiDepth,
      setAIDepth,
      showResearchProcess,
      toggleResearchProcess,
      patternAnalysisEnabled,
      togglePatternAnalysis,
      themeAnalysisEnabled,
      toggleThemeAnalysis
    }}>
      {children}
    </AIContext.Provider>
  );
};

export const useAIMode = () => {
  const context = useContext(AIContext);
  
  if (context === undefined) {
    // For backward compatibility, return a simplified version if not within provider
    const [isAIMode, setIsAIMode] = useState<boolean>(() => {
      const savedMode = localStorage.getItem('aiMode');
      return savedMode === 'true';
    });

    useEffect(() => {
      localStorage.setItem('aiMode', isAIMode.toString());
    }, [isAIMode]);

    const toggleAIMode = () => {
      setIsAIMode(prev => !prev);
    };

    return { 
      isAIMode, 
      toggleAIMode,
      therapyMode: 'standard' as TherapyMode,
      setTherapyMode: () => {},
      aiApproach: 'balanced' as AIApproach,
      setAIApproach: () => {},
      aiDepth: 'basic' as AIDepth,
      setAIDepth: () => {},
      showResearchProcess: false,
      toggleResearchProcess: () => {},
      patternAnalysisEnabled: true,
      togglePatternAnalysis: () => {},
      themeAnalysisEnabled: true,
      toggleThemeAnalysis: () => {}
    };
  }
  
  return context;
};
