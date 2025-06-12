
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
      color: "from-spotify-green to-spotify-green-dark"
    },
    {
      id: 2,
      name: "Creative Space",
      capacity: 8,
      features: ["Smart TV", "Wireless Presentation", "Coffee Machine"],
      availability: "Occupied",
      color: "from-spotify-green to-spotify-green-dark"
    },
    {
      id: 3,
      name: "Executive Suite",
      capacity: 6,
      features: ["Premium Audio", "Leather Seating", "Private Entrance"],
      availability: "Available",
      color: "from-spotify-green to-spotify-green-dark"
    },
    {
      id: 4,
      name: "Focus Pod",
      capacity: 4,
      features: ["Soundproof", "Standing Desk", "Natural Light"],
      availability: "Available",
      color: "from-spotify-green to-spotify-green-dark"
    }
  ];

  const handleBookRoom = (room) => {
    setSelectedRoom(room);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-muted/50">
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden bg-card/80 backdrop-blur-lg border-b border-border"
      >
        <div className="relative container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold text-foreground">
                RoomSync Pro
              </h1>
              <p className="text-muted-foreground mt-2">Smart Meeting Room Booking System</p>
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
                className={activeTab === "rooms" ? "bg-spotify-green text-white hover:bg-spotify-green-dark" : ""}
              >
                <MapPin className="w-4 h-4 mr-2" />
                Rooms
              </Button>
              <Button
                onClick={() => setActiveTab("bookings")}
                variant={activeTab === "bookings" ? "default" : "outline"}
                className={activeTab === "bookings" ? "bg-spotify-green text-white hover:bg-spotify-green-dark" : ""}
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
                { label: "Total Rooms", value: "4", icon: MapPin, color: "text-spotify-green" },
                { label: "Available Now", value: "3", icon: Clock, color: "text-spotify-green" },
                { label: "Total Capacity", value: "30", icon: Users, color: "text-spotify-green" },
                { label: "Today's Bookings", value: "8", icon: Calendar, color: "text-spotify-green" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="bg-card/80 backdrop-blur-lg border-border hover:shadow-lg transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-muted-foreground text-sm">{stat.label}</p>
                          <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                        </div>
                        <div className={`p-3 rounded-xl bg-spotify-green/10 group-hover:scale-110 transition-transform duration-300`}>
                          <stat.icon className={`w-6 h-6 ${stat.color}`} />
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
                <h2 className="text-2xl font-bold text-foreground">Available Meeting Rooms</h2>
                <Button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="bg-spotify-green hover:bg-spotify-green-dark text-white"
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
