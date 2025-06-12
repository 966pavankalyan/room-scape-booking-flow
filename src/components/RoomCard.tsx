
import { motion } from "framer-motion";
import { Users, Wifi, Monitor, Coffee, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const RoomCard = ({ room, onBook }) => {
  const getFeatureIcon = (feature) => {
    const icons = {
      "Projector": Monitor,
      "Whiteboard": Monitor,
      "Video Conferencing": Monitor,
      "Smart TV": Monitor,
      "Wireless Presentation": Wifi,
      "Coffee Machine": Coffee,
      "Premium Audio": Zap,
      "Leather Seating": Shield,
      "Private Entrance": Shield,
      "Soundproof": Shield,
      "Standing Desk": Monitor,
      "Natural Light": Zap
    };
    return icons[feature] || Wifi;
  };

  return (
    <motion.div
      whileHover={{ 
        y: -10, 
        rotateX: 5, 
        rotateY: 5,
        scale: 1.02 
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="perspective-1000"
    >
      <Card className="bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 backdrop-blur-lg overflow-hidden group hover:shadow-xl transition-all duration-500">
        {/* Room Header */}
        <div className="h-32 bg-gradient-to-r from-slate-600 to-slate-700 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-white/5"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.05) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.05) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.05) 0%, transparent 50%)",
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-white text-6xl font-bold opacity-20"
            >
              {room.name.charAt(0)}
            </motion.div>
          </div>
          <div className="absolute top-4 right-4">
            <Badge 
              className={`${
                room.availability === "Available" 
                  ? "bg-green-600 text-white hover:bg-green-700" 
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              {room.availability}
            </Badge>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{room.name}</h3>
            <div className="flex items-center text-slate-600 dark:text-slate-300 mb-4">
              <Users className="w-4 h-4 mr-2" />
              <span>{room.capacity} people</span>
            </div>
          </div>

          {/* Features */}
          <div className="mb-6">
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-3">Features</p>
            <div className="flex flex-wrap gap-2">
              {room.features.map((feature, index) => {
                const IconComponent = getFeatureIcon(feature);
                return (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 rounded-full px-3 py-1 text-xs text-slate-700 dark:text-slate-200"
                  >
                    <IconComponent className="w-3 h-3" />
                    {feature}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Action Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => onBook(room)}
              disabled={room.availability !== "Available"}
              className={`w-full ${
                room.availability === "Available"
                  ? "bg-slate-800 hover:bg-slate-700 text-white"
                  : "bg-slate-400 cursor-not-allowed text-slate-200"
              } transition-all duration-300`}
            >
              {room.availability === "Available" ? "Book This Room" : "Currently Occupied"}
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RoomCard;
