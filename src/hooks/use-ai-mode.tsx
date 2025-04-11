
import { useState, useEffect } from 'react';

export const useAIMode = () => {
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

  return { isAIMode, toggleAIMode };
};
