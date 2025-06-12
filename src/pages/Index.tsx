
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, MapPin, User, Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import RoomCard from "@/components/RoomCard";
import BookingModal from "@/components/BookingModal";
import BookingsList from "@/components/BookingsList";

const Index = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("rooms");

  const rooms = [
    {
      id: 1,
      name: "Innovation Hub",
      capacity: 12,
      features: ["Projector", "Whiteboard", "Video Conferencing"],
      availability: "Available",
      color: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      name: "Creative Space",
      capacity: 8,
      features: ["Smart TV", "Wireless Presentation", "Coffee Machine"],
      availability: "Occupied",
      color: "from-green-500 to-teal-600"
    },
    {
      id: 3,
      name: "Executive Suite",
      capacity: 6,
      features: ["Premium Audio", "Leather Seating", "Private Entrance"],
      availability: "Available",
      color: "from-orange-500 to-red-600"
    },
    {
      id: 4,
      name: "Focus Pod",
      capacity: 4,
      features: ["Soundproof", "Standing Desk", "Natural Light"],
      availability: "Available",
      color: "from-pink-500 to-purple-600"
    }
  ];

  const handleBookRoom = (room) => {
    setSelectedRoom(room);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-lg border-b border-white/10"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
        <div className="relative container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                RoomSync Pro
              </h1>
              <p className="text-slate-300 mt-2">Smart Meeting Room Booking System</p>
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex gap-4"
            >
              <Button
                onClick={() => setActiveTab("rooms")}
                variant={activeTab === "rooms" ? "default" : "outline"}
                className={`${activeTab === "rooms" ? "bg-gradient-to-r from-blue-500 to-purple-500" : "border-white/20 text-white hover:bg-white/10"}`}
              >
                <MapPin className="w-4 h-4 mr-2" />
                Rooms
              </Button>
              <Button
                onClick={() => setActiveTab("bookings")}
                variant={activeTab === "bookings" ? "default" : "outline"}
                className={`${activeTab === "bookings" ? "bg-gradient-to-r from-blue-500 to-purple-500" : "border-white/20 text-white hover:bg-white/10"}`}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Bookings
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {activeTab === "rooms" && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[
                { label: "Total Rooms", value: "4", icon: MapPin, color: "from-blue-500 to-cyan-500" },
                { label: "Available Now", value: "3", icon: Clock, color: "from-green-500 to-emerald-500" },
                { label: "Total Capacity", value: "30", icon: Users, color: "from-orange-500 to-red-500" },
                { label: "Today's Bookings", value: "8", icon: Calendar, color: "from-purple-500 to-pink-500" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-lg hover:from-white/15 hover:to-white/10 transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-slate-300 text-sm">{stat.label}</p>
                          <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                        </div>
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                          <stat.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Room Cards */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Available Meeting Rooms</h2>
                <Button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Quick Book
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {rooms.map((room, index) => (
                  <motion.div
                    key={room.id}
                    initial={{ opacity: 0, y: 50, rotateX: -15 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <RoomCard room={room} onBook={handleBookRoom} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeTab === "bookings" && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <BookingsList />
          </motion.div>
        )}
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => {
          setIsBookingModalOpen(false);
          setSelectedRoom(null);
        }}
        selectedRoom={selectedRoom}
        rooms={rooms}
      />
    </div>
  );
};

export default Index;
