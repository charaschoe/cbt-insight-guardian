
import { useState, useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const FloatingSOS = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check localStorage to see if the SOS popup has been shown before
    const sosShown = localStorage.getItem('sosPopupShown');
    if (sosShown) {
      // If it's been shown before, start minimized
      setIsMinimized(true);
      setHasBeenShown(true);
    } else {
      // If it's the first time, mark it as shown in localStorage
      localStorage.setItem('sosPopupShown', 'true');
      setHasBeenShown(false);
    }
  }, []);

  const handleEmergencyConnect = () => {
    setIsConnecting(true);
    
    // Redirect to emergency page after brief delay
    setTimeout(() => {
      navigate('/emergency');
    }, 1500);
  };

  // If it should never be shown (already seen and dismissed), return null
  if (hasBeenShown && isMinimized) {
    return null;
  }

  if (isMinimized) {
    return (
      <Button
        className="fixed bottom-4 right-4 z-50 rounded-full h-14 w-14 bg-red-600 hover:bg-red-700 shadow-lg flex items-center justify-center p-0"
        onClick={() => setIsMinimized(false)}
      >
        <AlertTriangle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-red-50 border border-red-200 rounded-lg shadow-lg p-4 w-64 animate-fade-in">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-red-600 flex items-center">
          <AlertTriangle className="h-4 w-4 mr-1" />
          Emergency Support
        </h3>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={() => setIsMinimized(true)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <p className="text-xs mb-3">
        If you're experiencing a crisis or having thoughts of suicide, immediate help is available.
      </p>
      
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button 
            variant="destructive" 
            className="w-full mb-2"
            size="sm"
          >
            Talk to Someone Now
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Emergency Support</AlertDialogTitle>
            <AlertDialogDescription>
              This will connect you immediately with a crisis counselor who can help.
              If you're having thoughts of suicide or experiencing a mental health crisis, 
              you'll be connected to immediate support.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleEmergencyConnect}
              className="bg-red-600 hover:bg-red-700"
              disabled={isConnecting}
            >
              {isConnecting ? "Connecting..." : "Connect Now"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <div className="text-xs text-muted-foreground">
        <p>National Suicide Prevention Lifeline:</p>
        <p className="font-semibold">988 or 1-800-273-8255</p>
      </div>
    </div>
  );
};

export default FloatingSOS;
