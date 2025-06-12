
import { motion } from "framer-motion";
import { Calendar, Clock, Users, MapPin, User, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const BookingsList = () => {
  const bookings = [
    {
      id: 1,
      roomName: "Innovation Hub",
      organizer: "Sarah Johnson",
      date: "2024-06-13",
      startTime: "09:00",
      endTime: "11:00",
      duration: "2 hours",
      attendees: 8,
      purpose: "Product Strategy Meeting",
      status: "confirmed"
    },
    {
      id: 2,
      roomName: "Creative Space",
      organizer: "Mike Chen",
      date: "2024-06-13",
      startTime: "14:00",
      endTime: "15:30",
      duration: "1.5 hours",
      attendees: 6,
      purpose: "Design Review Session",
      status: "confirmed"
    },
    {
      id: 3,
      roomName: "Executive Suite",
      organizer: "Amanda Rodriguez",
      date: "2024-06-13",
      startTime: "16:00",
      endTime: "17:00",
      duration: "1 hour",
      attendees: 4,
      purpose: "Client Presentation",
      status: "pending"
    },
    {
      id: 4,
      roomName: "Focus Pod",
      organizer: "David Kim",
      date: "2024-06-14",
      startTime: "10:00",
      endTime: "12:00",
      duration: "2 hours",
      attendees: 3,
      purpose: "Team Planning Session",
      status: "confirmed"
    },
    {
      id: 5,
      roomName: "Innovation Hub",
      organizer: "Lisa Wang",
      date: "2024-06-14",
      startTime: "13:00",
      endTime: "14:30",
      duration: "1.5 hours",
      attendees: 10,
      purpose: "All-Hands Meeting",
      status: "confirmed"
    }
  ];

  const getStatusColor = (status) => {
    return status === "confirmed" ? "bg-success text-primary-foreground border-success/30" : "bg-warning text-primary-foreground border-warning/30";
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">All Bookings</h2>
          <p className="text-muted-foreground">Complete overview of meeting room reservations</p>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-success text-primary-foreground border-success/30">
            {bookings.filter(b => b.status === "confirmed").length} Confirmed
          </Badge>
          <Badge className="bg-warning text-primary-foreground border-warning/30">
            {bookings.filter(b => b.status === "pending").length} Pending
          </Badge>
        </div>
      </motion.div>

      <div className="grid gap-6">
        {bookings.map((booking, index) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ 
              scale: 1.02, 
              y: -4,
              transition: { duration: 0.2 }
            }}
          >
            <Card className="bg-card/90 border-border backdrop-blur-lg hover:bg-card/95 transition-all duration-300 group overflow-hidden hover:shadow-xl hover:border-primary/20">
              {/* Status indicator */}
              <div className={`h-1 w-full ${booking.status === "confirmed" ? "bg-success" : "bg-warning"}`}>
                <motion.div
                  className="h-full bg-primary/30"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                />
              </div>

              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {booking.roomName.charAt(0)}
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{booking.roomName}</h3>
                      <p className="text-muted-foreground text-sm">{booking.purpose}</p>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(booking.status)} shadow-sm`}>
                    {booking.status}
                  </Badge>
                </div>

                {/* Booking Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  <motion.div
                    className="flex items-center gap-2 text-muted-foreground group/item"
                    whileHover={{ scale: 1.05 }}
                  >
                    <User className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Organizer</p>
                      <p className="text-sm font-medium text-foreground group-hover/item:text-primary transition-colors">{booking.organizer}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-2 text-muted-foreground group/item"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Calendar className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Date</p>
                      <p className="text-sm font-medium text-foreground group-hover/item:text-primary transition-colors">{booking.date}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-2 text-muted-foreground group/item"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Clock className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Time</p>
                      <p className="text-sm font-medium text-foreground group-hover/item:text-primary transition-colors">{booking.startTime} - {booking.endTime}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-2 text-muted-foreground group/item"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Users className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Attendees</p>
                      <p className="text-sm font-medium text-foreground group-hover/item:text-primary transition-colors">{booking.attendees} people</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-2 text-muted-foreground group/item"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Clock className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="text-sm font-medium text-foreground group-hover/item:text-primary transition-colors">{booking.duration}</p>
                    </div>
                  </motion.div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t border-border">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/40 transition-all duration-200"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-destructive/20 text-destructive hover:bg-destructive/10 hover:border-destructive/40 transition-all duration-200"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BookingsList;
