
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
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group"
    >
      <Card className="bg-card/90 border-border backdrop-blur-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary/20">
        {/* Clean Header */}
        <motion.div 
          className="h-24 gradient-primary relative overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-primary-foreground text-4xl font-bold opacity-90"
            >
              {room.name.charAt(0)}
            </motion.div>
          </div>
          
          <div className="absolute top-3 right-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Badge 
                className={`${
                  room.availability === "Available" 
                    ? "bg-success text-primary-foreground border-success/30" 
                    : "bg-warning text-primary-foreground border-warning/30"
                } backdrop-blur-sm border font-medium shadow-lg`}
              >
                {room.availability}
              </Badge>
            </motion.div>
          </div>
        </motion.div>

        <CardContent className="p-6 space-y-6">
          {/* Room Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-bold text-foreground mb-2">{room.name}</h3>
            <div className="flex items-center text-muted-foreground">
              <Users className="w-4 h-4 mr-2 text-primary" />
              <span className="font-medium">{room.capacity} people capacity</span>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-muted-foreground text-sm mb-3 font-medium">Available Features</p>
            <div className="flex flex-wrap gap-2">
              {room.features.map((feature, index) => {
                const IconComponent = getFeatureIcon(feature);
                return (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2 bg-secondary/50 rounded-full px-3 py-2 text-xs font-medium border border-border hover:bg-secondary/70 transition-all duration-200"
                  >
                    <IconComponent className="w-3 h-3 text-primary" />
                    <span className="text-foreground">{feature}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={() => onBook(room)}
              disabled={room.availability !== "Available"}
              className={`w-full font-semibold transition-all duration-300 ${
                room.availability === "Available"
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl"
                  : "bg-muted cursor-not-allowed text-muted-foreground"
              }`}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {room.availability === "Available" ? "Book This Room" : "Currently Occupied"}
              </motion.span>
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RoomCard;
