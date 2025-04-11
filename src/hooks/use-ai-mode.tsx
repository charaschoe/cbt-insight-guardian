
import { useState, useEffect, createContext, useContext } from 'react';

type TherapyMode = 'standard' | 'ai' | 'corporate' | 'clinical';

interface AIContextType {
  isAIMode: boolean;
  toggleAIMode: () => void;
  therapyMode: TherapyMode;
  setTherapyMode: (mode: TherapyMode) => void;
  aiApproach: string;
  setAIApproach: (approach: string) => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const AIProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAIMode, setIsAIMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem('aiMode');
    return savedMode === 'true';
  });

  const [therapyMode, setTherapyMode] = useState<TherapyMode>(() => {
    const savedMode = localStorage.getItem('therapyMode');
    return (savedMode as TherapyMode) || 'standard';
  });

  const [aiApproach, setAIApproach] = useState<string>(() => {
    const savedApproach = localStorage.getItem('aiApproach');
    return savedApproach || 'balanced';
  });

  useEffect(() => {
    localStorage.setItem('aiMode', isAIMode.toString());
  }, [isAIMode]);

  useEffect(() => {
    localStorage.setItem('therapyMode', therapyMode);
  }, [therapyMode]);

  useEffect(() => {
    localStorage.setItem('aiApproach', aiApproach);
  }, [aiApproach]);

  const toggleAIMode = () => {
    setIsAIMode(prev => !prev);
  };

  return (
    <AIContext.Provider value={{ 
      isAIMode, 
      toggleAIMode, 
      therapyMode, 
      setTherapyMode,
      aiApproach,
      setAIApproach
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
      aiApproach: 'balanced',
      setAIApproach: () => {}
    };
  }
  
  return context;
};
