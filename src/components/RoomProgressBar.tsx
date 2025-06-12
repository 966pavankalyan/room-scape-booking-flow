
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface RoomProgressBarProps {
  roomId: number;
  roomName: string;
  currentBooking?: {
    startTime: string;
    endTime: string;
    organizer: string;
  };
  isAvailable: boolean;
}

const RoomProgressBar = ({ roomId, roomName, currentBooking, isAvailable }: RoomProgressBarProps) => {
  const getCurrentProgress = () => {
    if (!currentBooking || isAvailable) return 0;
    
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const [startHour, startMin] = currentBooking.startTime.split(':').map(Number);
    const [endHour, endMin] = currentBooking.endTime.split(':').map(Number);
    
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;
    
    if (currentTime < startMinutes) return 0;
    if (currentTime > endMinutes) return 100;
    
    const elapsed = currentTime - startMinutes;
    const total = endMinutes - startMinutes;
    
    return Math.round((elapsed / total) * 100);
  };

  const getTimeRemaining = () => {
    if (!currentBooking || isAvailable) return "Available";
    
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const [endHour, endMin] = currentBooking.endTime.split(':').map(Number);
    const endMinutes = endHour * 60 + endMin;
    
    if (currentTime > endMinutes) return "Available";
    
    const remaining = endMinutes - currentTime;
    const hours = Math.floor(remaining / 60);
    const minutes = remaining % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m remaining`;
    }
    return `${minutes}m remaining`;
  };

  const progress = getCurrentProgress();
  const timeRemaining = getTimeRemaining();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: roomId * 0.1 }}
      className="p-4 bg-card/50 backdrop-blur-sm border border-border rounded-lg"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">{roomName}</span>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${
          isAvailable 
            ? "bg-success/10 text-success border border-success/20" 
            : "bg-warning/10 text-warning border border-warning/20"
        }`}>
          {isAvailable ? "Available" : "In Use"}
        </span>
      </div>
      
      {!isAvailable && currentBooking && (
        <div className="mb-2">
          <p className="text-xs text-muted-foreground mb-1">
            Current: {currentBooking.organizer}
          </p>
          <p className="text-xs text-muted-foreground">
            {currentBooking.startTime} - {currentBooking.endTime}
          </p>
        </div>
      )}
      
      <div className="space-y-2">
        <Progress 
          value={isAvailable ? 0 : progress} 
          className="h-2"
        />
        <motion.p 
          key={timeRemaining}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-muted-foreground"
        >
          {timeRemaining}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default RoomProgressBar;
