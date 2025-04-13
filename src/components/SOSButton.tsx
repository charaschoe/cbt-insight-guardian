
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const SOSButton = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const handleEmergencyConnect = () => {
    setIsConnecting(true);
    
    // Simulate connection to emergency services
    setTimeout(() => {
      setIsConnecting(false);
      toast({
        title: "Emergency Support Connected",
        description: "A crisis counselor has been notified and will join your session immediately.",
        variant: "default",
      });
      
      // Redirect to chat page with emergency flag
      window.location.href = "/chat?emergency=true";
    }, 2000);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          variant="destructive" 
          className="animate-pulse gap-2 font-bold"
          size="sm"
        >
          <AlertTriangle className="h-4 w-4" />
          SOS Emergency Help
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
  );
};

export default SOSButton;
