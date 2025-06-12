
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
      status: "confirmed",
      color: "from-blue-500 to-purple-600"
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
      status: "confirmed",
      color: "from-green-500 to-teal-600"
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
      status: "pending",
      color: "from-orange-500 to-red-600"
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
      status: "confirmed",
      color: "from-pink-500 to-purple-600"
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
      status: "confirmed",
      color: "from-blue-500 to-purple-600"
    }
  ];

  const getStatusColor = (status) => {
    return status === "confirmed" ? "bg-green-500/80" : "bg-yellow-500/80";
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">All Bookings</h2>
          <p className="text-slate-300">Complete overview of meeting room reservations</p>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-green-500/80 text-white">
            {bookings.filter(b => b.status === "confirmed").length} Confirmed
          </Badge>
          <Badge className="bg-yellow-500/80 text-white">
            {bookings.filter(b => b.status === "pending").length} Pending
          </Badge>
        </div>
      </motion.div>

      <div className="grid gap-6">
        {bookings.map((booking, index) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, x: -50, rotateY: -10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ 
              scale: 1.02, 
              rotateX: 2,
              transition: { duration: 0.2 }
            }}
          >
            <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-lg hover:from-white/15 hover:to-white/10 transition-all duration-300 group overflow-hidden">
              {/* Animated Background */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${booking.color}`}>
                <motion.div
                  className="h-full bg-white/30"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                />
              </div>

              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${booking.color} flex items-center justify-center text-white font-bold text-lg`}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {booking.roomName.charAt(0)}
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{booking.roomName}</h3>
                      <p className="text-slate-300 text-sm">{booking.purpose}</p>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(booking.status)} text-white`}>
                    {booking.status}
                  </Badge>
                </div>

                {/* Booking Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  <motion.div
                    className="flex items-center gap-2 text-slate-300"
                    whileHover={{ scale: 1.05, color: "#ffffff" }}
                  >
                    <User className="w-4 h-4 text-blue-400" />
                    <div>
                      <p className="text-xs text-slate-400">Organizer</p>
                      <p className="text-sm font-medium">{booking.organizer}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-2 text-slate-300"
                    whileHover={{ scale: 1.05, color: "#ffffff" }}
                  >
                    <Calendar className="w-4 h-4 text-green-400" />
                    <div>
                      <p className="text-xs text-slate-400">Date</p>
                      <p className="text-sm font-medium">{booking.date}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-2 text-slate-300"
                    whileHover={{ scale: 1.05, color: "#ffffff" }}
                  >
                    <Clock className="w-4 h-4 text-orange-400" />
                    <div>
                      <p className="text-xs text-slate-400">Time</p>
                      <p className="text-sm font-medium">{booking.startTime} - {booking.endTime}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-2 text-slate-300"
                    whileHover={{ scale: 1.05, color: "#ffffff" }}
                  >
                    <Users className="w-4 h-4 text-purple-400" />
                    <div>
                      <p className="text-xs text-slate-400">Attendees</p>
                      <p className="text-sm font-medium">{booking.attendees} people</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-2 text-slate-300"
                    whileHover={{ scale: 1.05, color: "#ffffff" }}
                  >
                    <Clock className="w-4 h-4 text-pink-400" />
                    <div>
                      <p className="text-xs text-slate-400">Duration</p>
                      <p className="text-sm font-medium">{booking.duration}</p>
                    </div>
                  </motion.div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t border-white/10">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-blue-500/20"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-red-500/20"
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
