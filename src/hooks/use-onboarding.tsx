import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAIMode } from './use-ai-mode';

// Define the structure for a questionnaire question
export type QuestionType = 'singleChoice' | 'multiChoice' | 'scale' | 'text';

export interface OnboardingQuestion {
  id: string;
  text: string;
  type: QuestionType;
  options?: { id: string; text: string; value: any }[];
  conditionalNext?: Record<string, string>; // Value to next question ID mapping
  nextQuestionId?: string;
  category: 'clinical' | 'severity' | 'preference' | 'background' | 'goals';
  reasoning?: string; // Reasoning displayed to the user about why this question matters
}

export interface OnboardingAnswer {
  questionId: string;
  value: any;
  timestamp: number;
}

export interface ProfileData {
  name?: string;
  primaryConcerns?: string[];
  severityLevel?: 'mild' | 'moderate' | 'severe';
  hasPreviousTherapy?: boolean;
  hasActiveSuicidalIdeation?: boolean;
  preferredApproach?: string;
  goals?: string[];
}

interface OnboardingContextType {
  isOnboardingComplete: boolean;
  isFirstVisit: boolean;
  currentQuestionIndex: number;
  currentStep: number;
  totalSteps: number;
  answers: OnboardingAnswer[];
  profileData: ProfileData;
  startOnboarding: () => void;
  skipOnboarding: () => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  setAnswer: (questionId: string, value: any) => void;
  updateProfileData: (data: Partial<ProfileData>) => void;
  determineRecommendedMode: () => 'clinical' | 'ai' | 'corporate';
  isOnboardingActive: boolean;
  activateOnboarding: () => void;
  deactivateOnboarding: () => void;
  reasoning: string;
  setReasoning: (reasoning: string) => void;
  questions: OnboardingQuestion[];
  calculateProgress: () => number;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

// Questionnaire data
const onboardingQuestions: OnboardingQuestion[] = [
  {
    id: 'welcome',
    text: 'Welcome to CBT Insight Guardian. This questionnaire will help us personalize your experience. Are you ready to begin?',
    type: 'singleChoice',
    options: [
      { id: 'yes', text: 'Yes, I\'m ready', value: 'yes' },
      { id: 'skip', text: 'Skip questionnaire', value: 'skip' }
    ],
    nextQuestionId: 'name',
    category: 'preference',
    reasoning: 'Starting with a welcoming message helps users feel comfortable and sets expectations for the onboarding process.'
  },
  {
    id: 'name',
    text: 'What is your first name?',
    type: 'text',
    nextQuestionId: 'primary_concern',
    category: 'background',
    reasoning: 'Personalizing the experience with the user\'s name creates a more engaging and tailored experience.'
  },
  {
    id: 'primary_concern',
    text: 'What brings you here today? Select all that apply:',
    type: 'multiChoice',
    options: [
      { id: 'anxiety', text: 'Anxiety', value: 'anxiety' },
      { id: 'depression', text: 'Depression', value: 'depression' },
      { id: 'stress', text: 'Stress', value: 'stress' },
      { id: 'relationship', text: 'Relationship issues', value: 'relationship' },
      { id: 'work', text: 'Work challenges', value: 'work' },
      { id: 'trauma', text: 'Trauma', value: 'trauma' },
      { id: 'other', text: 'Something else', value: 'other' }
    ],
    nextQuestionId: 'severity',
    category: 'clinical',
    reasoning: 'Understanding the primary concerns helps determine whether the user needs clinical support or could benefit from self-guided AI therapy.'
  },
  {
    id: 'severity',
    text: 'How would you rate the impact of these concerns on your daily life?',
    type: 'scale',
    nextQuestionId: 'previous_therapy',
    category: 'severity',
    reasoning: 'Assessing severity helps determine the appropriate level of support, with higher severity often indicating a need for clinical oversight.'
  },
  {
    id: 'previous_therapy',
    text: 'Have you ever worked with a therapist or mental health professional before?',
    type: 'singleChoice',
    options: [
      { id: 'yes_current', text: 'Yes, currently', value: 'yes_current' },
      { id: 'yes_past', text: 'Yes, in the past', value: 'yes_past' },
      { id: 'no', text: 'No, never', value: 'no' }
    ],
    nextQuestionId: 'crisis_assessment',
    category: 'background',
    reasoning: 'Previous therapy experience helps gauge familiarity with therapeutic concepts and potentially indicates clinical complexity.'
  },
  {
    id: 'crisis_assessment',
    text: 'In the past two weeks, have you had thoughts of harming yourself or that you would be better off dead?',
    type: 'singleChoice',
    options: [
      { id: 'yes_frequent', text: 'Yes, frequently', value: 'yes_frequent' },
      { id: 'yes_sometimes', text: 'Yes, sometimes', value: 'yes_sometimes' },
      { id: 'no', text: 'No', value: 'no' }
    ],
    conditionalNext: {
      'yes_frequent': 'crisis_support',
      'yes_sometimes': 'crisis_support',
      'no': 'context'
    },
    category: 'clinical',
    reasoning: 'This critical safety question helps identify users who need immediate professional support rather than self-guided AI therapy.'
  },
  {
    id: 'crisis_support',
    text: 'Based on your response, we recommend speaking with a mental health professional. Would you like to be connected to emergency support resources now?',
    type: 'singleChoice',
    options: [
      { id: 'yes', text: 'Yes, connect me now', value: 'yes' },
      { id: 'no', text: 'No, I\'ll continue with the questionnaire', value: 'no' }
    ],
    nextQuestionId: 'context',
    category: 'clinical',
    reasoning: 'Providing immediate crisis support options is essential for user safety when crisis indicators are present.'
  },
  {
    id: 'context',
    text: 'Are you exploring this for:',
    type: 'singleChoice',
    options: [
      { id: 'personal', text: 'Personal growth', value: 'personal' },
      { id: 'professional', text: 'Professional development', value: 'professional' },
      { id: 'clinical', text: 'Clinical support', value: 'clinical' },
      { id: 'research', text: 'Research purposes', value: 'research' }
    ],
    nextQuestionId: 'approach_preference',
    category: 'preference',
    reasoning: 'Understanding the context helps determine whether a corporate, clinical, or AI-focused approach would be most appropriate.'
  },
  {
    id: 'approach_preference',
    text: 'Which therapeutic approach interests you most?',
    type: 'singleChoice',
    options: [
      { id: 'cbt', text: 'Cognitive Behavioral Therapy (CBT)', value: 'cbt' },
      { id: 'mindfulness', text: 'Mindfulness & Meditation', value: 'mindfulness' },
      { id: 'solution', text: 'Solution-Focused Therapy', value: 'solution' },
      { id: 'not_sure', text: 'I\'m not sure / Let AI recommend', value: 'not_sure' }
    ],
    nextQuestionId: 'ai_comfort',
    category: 'preference',
    reasoning: 'Preferred therapeutic approach indicates both user knowledge level and helps customize the treatment methodology.'
  },
  {
    id: 'ai_comfort',
    text: 'How comfortable are you with AI analyzing your mental health data?',
    type: 'scale',
    nextQuestionId: 'goals',
    category: 'preference',
    reasoning: 'AI comfort level directly influences whether the AI mode would be appropriate, with lower comfort suggesting clinical or corporate modes.'
  },
  {
    id: 'goals',
    text: 'What are your primary goals for using this platform? Select all that apply:',
    type: 'multiChoice',
    options: [
      { id: 'understand', text: 'Better understand my thought patterns', value: 'understand' },
      { id: 'manage', text: 'Learn to manage difficult emotions', value: 'manage' },
      { id: 'skills', text: 'Develop coping skills', value: 'skills' },
      { id: 'track', text: 'Track my mental health progress', value: 'track' },
      { id: 'support', text: 'Find support between therapy sessions', value: 'support' },
      { id: 'explore', text: 'Explore therapeutic options', value: 'explore' }
    ],
    nextQuestionId: 'mode_explanation',
    category: 'goals',
    reasoning: 'Goals help tailor content recommendations and determine whether research-oriented AI features, structured corporate tools, or clinical guidance would best serve the user.'
  },
  {
    id: 'mode_explanation',
    text: 'Based on your responses, we\'ll recommend a personalized mode for your journey.',
    type: 'singleChoice',
    options: [
      { id: 'continue', text: 'Show my recommendations', value: 'continue' }
    ],
    nextQuestionId: 'complete',
    category: 'preference',
    reasoning: 'This transition question prepares the user for the mode recommendation that follows.'
  },
  {
    id: 'complete',
    text: 'Questionnaire Complete!',
    type: 'singleChoice',
    options: [
      { id: 'start', text: 'Start my journey', value: 'start' }
    ],
    category: 'preference',
    reasoning: 'Confirming completion gives users a sense of achievement and clear next steps.'
  }
];

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const { setTherapyMode } = useAIMode();
  const navigate = useNavigate();
  
  // Check if this is the first visit
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(() => {
    return localStorage.getItem('hasVisitedBefore') !== 'true';
  });
  
  // Onboarding completion state
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<boolean>(() => {
    return localStorage.getItem('onboardingComplete') === 'true';
  });
  
  // Active state (whether onboarding is currently showing)
  const [isOnboardingActive, setIsOnboardingActive] = useState<boolean>(() => {
    return isFirstVisit && !isOnboardingComplete;
  });
  
  // Current question tracking
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = onboardingQuestions.length;
  
  // User answers
  const [answers, setAnswers] = useState<OnboardingAnswer[]>([]);
  
  // Profile data compiled from answers
  const [profileData, setProfileData] = useState<ProfileData>({});
  
  // Reasoning display for current question
  const [reasoning, setReasoning] = useState<string>(onboardingQuestions[0]?.reasoning || '');
  
  // Handle first visit
  useEffect(() => {
    if (isFirstVisit) {
      setIsOnboardingActive(true);
      localStorage.setItem('hasVisitedBefore', 'true');
    }
  }, [isFirstVisit]);
  
  // Calculate progress percentage
  const calculateProgress = (): number => {
    return Math.round((currentStep / totalSteps) * 100);
  };
  
  // Start the onboarding process
  const startOnboarding = () => {
    setIsOnboardingActive(true);
    setCurrentQuestionIndex(0);
    setCurrentStep(1);
    setAnswers([]);
  };
  
  // Skip the onboarding process
  const skipOnboarding = () => {
    setIsOnboardingComplete(true);
    setIsOnboardingActive(false);
    localStorage.setItem('onboardingComplete', 'true');
    
    // Default to standard mode
    setTherapyMode('standard');
  };
  
  // Complete the onboarding process
  const completeOnboarding = () => {
    setIsOnboardingComplete(true);
    setIsOnboardingActive(false);
    localStorage.setItem('onboardingComplete', 'true');
    
    // Set the recommended mode
    const recommendedMode = determineRecommendedMode();
    
    // Map our internal modes to the TherapyMode type
    const modeMap: Record<string, any> = {
      'clinical': 'clinical',
      'ai': 'ai',
      'corporate': 'corporate'
    };
    
    setTherapyMode(modeMap[recommendedMode]);
  };
  
  // Reset the onboarding process
  const resetOnboarding = () => {
    setIsOnboardingComplete(false);
    setIsOnboardingActive(true);
    setCurrentQuestionIndex(0);
    setCurrentStep(1);
    setAnswers([]);
    localStorage.removeItem('onboardingComplete');
  };
  
  // Navigation between questions
  const goToNextQuestion = () => {
    const currentQuestion = onboardingQuestions[currentQuestionIndex];
    
    // Handle conditional navigation
    if (currentQuestion.conditionalNext) {
      const currentAnswer = answers.find(a => a.questionId === currentQuestion.id);
      if (currentAnswer) {
        const nextQuestionId = currentQuestion.conditionalNext[currentAnswer.value];
        if (nextQuestionId) {
          const nextIndex = onboardingQuestions.findIndex(q => q.id === nextQuestionId);
          if (nextIndex !== -1) {
            setCurrentQuestionIndex(nextIndex);
            setCurrentStep(prevStep => prevStep + 1);
            setReasoning(onboardingQuestions[nextIndex]?.reasoning || '');
            return;
          }
        }
      }
    }
    
    // Handle normal navigation
    if (currentQuestion.nextQuestionId) {
      const nextIndex = onboardingQuestions.findIndex(q => q.id === currentQuestion.nextQuestionId);
      if (nextIndex !== -1) {
        setCurrentQuestionIndex(nextIndex);
        setCurrentStep(prevStep => prevStep + 1);
        setReasoning(onboardingQuestions[nextIndex]?.reasoning || '');
        return;
      }
    }
    
    // Default navigation to next index
    if (currentQuestionIndex < onboardingQuestions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setCurrentStep(prevStep => prevStep + 1);
      setReasoning(onboardingQuestions[currentQuestionIndex + 1]?.reasoning || '');
    } else {
      // Handle completion
      completeOnboarding();
    }
  };
  
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
      setCurrentStep(prevStep => prevStep - 1);
      setReasoning(onboardingQuestions[currentQuestionIndex - 1]?.reasoning || '');
    }
  };
  
  // Record an answer
  const setAnswer = (questionId: string, value: any) => {
    setAnswers(prevAnswers => {
      // Check if this question has been answered before
      const existingAnswerIndex = prevAnswers.findIndex(a => a.questionId === questionId);
      
      if (existingAnswerIndex !== -1) {
        // Update existing answer
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = {
          questionId,
          value,
          timestamp: Date.now()
        };
        return updatedAnswers;
      } else {
        // Add new answer
        return [...prevAnswers, {
          questionId,
          value,
          timestamp: Date.now()
        }];
      }
    });
    
    // Update profile data based on the answer
    updateProfileDataFromAnswer(questionId, value);
    
    // Special case for crisis assessment
    if (questionId === 'crisis_assessment' && (value === 'yes_frequent' || value === 'yes_sometimes')) {
      // Mark user as potentially needing clinical support
      setProfileData(prev => ({
        ...prev,
        hasActiveSuicidalIdeation: true
      }));
    }
    
    // Handle special actions
    if (questionId === 'welcome' && value === 'skip') {
      skipOnboarding();
    } else if (questionId === 'crisis_support' && value === 'yes') {
      // Redirect to emergency support
      navigate('/emergency');
    } else if (questionId === 'complete' && value === 'start') {
      completeOnboarding();
    } else {
      // Normal case: go to next question
      goToNextQuestion();
    }
  };
  
  // Update profile data based on question answers
  const updateProfileDataFromAnswer = (questionId: string, value: any) => {
    switch (questionId) {
      case 'name':
        setProfileData(prev => ({ ...prev, name: value }));
        break;
      case 'primary_concern':
        setProfileData(prev => ({ ...prev, primaryConcerns: value }));
        break;
      case 'severity':
        // Map numeric scale (1-10) to severity levels
        let severityLevel: 'mild' | 'moderate' | 'severe' = 'mild';
        if (value > 7) severityLevel = 'severe';
        else if (value > 3) severityLevel = 'moderate';
        setProfileData(prev => ({ ...prev, severityLevel }));
        break;
      case 'previous_therapy':
        setProfileData(prev => ({ 
          ...prev, 
          hasPreviousTherapy: value === 'yes_current' || value === 'yes_past'
        }));
        break;
      case 'approach_preference':
        setProfileData(prev => ({ ...prev, preferredApproach: value }));
        break;
      case 'goals':
        setProfileData(prev => ({ ...prev, goals: value }));
        break;
    }
  };
  
  // Update profile data directly
  const updateProfileData = (data: Partial<ProfileData>) => {
    setProfileData(prev => ({ ...prev, ...data }));
  };
  
  // Determine the recommended mode based on answers
  const determineRecommendedMode = (): 'clinical' | 'ai' | 'corporate' => {
    // Default to AI mode
    let recommendedMode: 'clinical' | 'ai' | 'corporate' = 'ai';
    
    // Clinical indicators
    const clinicalIndicators = [
      profileData.hasActiveSuicidalIdeation,
      profileData.severityLevel === 'severe',
      answers.some(a => a.questionId === 'context' && a.value === 'clinical')
    ];
    
    // Corporate indicators
    const corporateIndicators = [
      answers.some(a => a.questionId === 'context' && a.value === 'professional'),
      profileData.primaryConcerns?.includes('work'),
      answers.some(a => a.questionId === 'goals' && (
        a.value.includes('track') || a.value.includes('skills')
      ))
    ];
    
    // AI indicators
    const aiIndicators = [
      !profileData.hasActiveSuicidalIdeation,
      profileData.severityLevel !== 'severe',
      answers.find(a => a.questionId === 'ai_comfort')?.value > 5,
      answers.some(a => a.questionId === 'approach_preference' && a.value === 'not_sure')
    ];
    
    // Count indicators for each mode
    const clinicalCount = clinicalIndicators.filter(Boolean).length;
    const corporateCount = corporateIndicators.filter(Boolean).length;
    const aiCount = aiIndicators.filter(Boolean).length;
    
    // Safety check: if any critical clinical indicators are present, override other preferences
    if (profileData.hasActiveSuicidalIdeation || profileData.severityLevel === 'severe') {
      return 'clinical';
    }
    
    // Otherwise, find the mode with the most indicators
    if (corporateCount > clinicalCount && corporateCount > aiCount) {
      recommendedMode = 'corporate';
    } else if (clinicalCount > corporateCount && clinicalCount > aiCount) {
      recommendedMode = 'clinical';
    } else {
      recommendedMode = 'ai';
    }
    
    return recommendedMode;
  };
  
  // Activate and deactivate onboarding
  const activateOnboarding = () => {
    setIsOnboardingActive(true);
  };
  
  const deactivateOnboarding = () => {
    setIsOnboardingActive(false);
  };
  
  return (
    <OnboardingContext.Provider value={{
      isOnboardingComplete,
      isFirstVisit,
      currentQuestionIndex,
      currentStep,
      totalSteps,
      answers,
      profileData,
      startOnboarding,
      skipOnboarding,
      completeOnboarding,
      resetOnboarding,
      goToNextQuestion,
      goToPreviousQuestion,
      setAnswer,
      updateProfileData,
      determineRecommendedMode,
      isOnboardingActive,
      activateOnboarding,
      deactivateOnboarding,
      reasoning,
      setReasoning,
      questions: onboardingQuestions,
      calculateProgress
    }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  
  return context;
};
