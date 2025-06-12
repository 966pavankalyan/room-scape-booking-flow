
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

  const colorGradients = [
    "gradient-1",
    "gradient-2", 
    "gradient-3",
    "gradient-4",
    "gradient-5",
    "gradient-6"
  ];

  const roomGradient = colorGradients[room.id % colorGradients.length];

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
      <Card className="bg-card/90 border-border backdrop-blur-lg overflow-hidden group hover:shadow-2xl transition-all duration-500 border-2">
        {/* Room Header with Colorful Gradient */}
        <div className={`h-32 ${roomGradient} relative overflow-hidden`}>
          <motion.div
            className="absolute inset-0 bg-black/20 dark:bg-black/40"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-white text-6xl font-bold opacity-80 drop-shadow-lg"
            >
              {room.name.charAt(0)}
            </motion.div>
          </div>
          <div className="absolute top-4 right-4">
            <Badge 
              className={`${
                room.availability === "Available" 
                  ? "bg-emerald-500/90 text-white hover:bg-emerald-600 border-emerald-400" 
                  : "bg-red-500/90 text-white hover:bg-red-600 border-red-400"
              } backdrop-blur-sm border font-medium`}
            >
              {room.availability}
            </Badge>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-foreground mb-2">{room.name}</h3>
            <div className="flex items-center text-muted-foreground mb-4">
              <Users className="w-4 h-4 mr-2 text-primary" />
              <span className="font-medium">{room.capacity} people</span>
            </div>
          </div>

          {/* Features */}
          <div className="mb-6">
            <p className="text-muted-foreground text-sm mb-3 font-medium">Features</p>
            <div className="flex flex-wrap gap-2">
              {room.features.map((feature, index) => {
                const IconComponent = getFeatureIcon(feature);
                const colorClass = `text-color-${(index % 6) + 1}`;
                const borderColorClass = `border-color-${(index % 6) + 1}`;
                return (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-1 bg-card rounded-full px-3 py-1 text-xs font-medium border-2 ${colorClass} ${borderColorClass} hover:bg-muted/50 transition-colors`}
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
              className={`w-full font-semibold ${
                room.availability === "Available"
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
                  : "bg-muted cursor-not-allowed text-muted-foreground"
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
