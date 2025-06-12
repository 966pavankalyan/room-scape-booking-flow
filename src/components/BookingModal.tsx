
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const BookingModal = ({ isOpen, onClose, selectedRoom, rooms }) => {
  const [formData, setFormData] = useState({
    roomId: selectedRoom?.id || "",
    date: "",
    startTime: "",
    endTime: "",
    attendees: "",
    organizer: "",
    purpose: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate booking
    toast({
      title: "Booking Confirmed! 🎉",
      description: `Successfully booked ${selectedRoom?.name || "room"} for ${formData.date}`,
    });
    
    // Reset form and close modal
    setFormData({
      roomId: "",
      date: "",
      startTime: "",
      endTime: "",
      attendees: "",
      organizer: "",
      purpose: ""
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotateX: -15 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateX: 15 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <Card className="bg-gradient-to-br from-spotify-black to-spotify-dark-gray border-spotify-green/20 backdrop-blur-lg">
              <CardHeader className="relative">
                <motion.div
                  className="absolute -top-2 -left-2 w-20 h-20 bg-gradient-to-r from-spotify-green to-spotify-green-light rounded-full opacity-20 blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-spotify-white">
                    {selectedRoom ? `Book ${selectedRoom.name}` : "Quick Book"}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="text-spotify-white hover:bg-spotify-white/10"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Room Selection */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Label className="text-spotify-white mb-2 block">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Meeting Room
                    </Label>
                    <Select 
                      value={formData.roomId} 
                      onValueChange={(value) => setFormData({...formData, roomId: value})}
                    >
                      <SelectTrigger className="bg-spotify-white/10 border-spotify-green/20 text-spotify-white">
                        <SelectValue placeholder="Select a room" />
                      </SelectTrigger>
                      <SelectContent>
                        {rooms.filter(room => room.availability === "Available").map(room => (
                          <SelectItem key={room.id} value={room.id.toString()}>
                            {room.name} ({room.capacity} people)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </motion.div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Label className="text-spotify-white mb-2 block">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Date
                      </Label>
                      <Input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        className="bg-spotify-white/10 border-spotify-green/20 text-spotify-white"
                        required
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Label className="text-spotify-white mb-2 block">
                        <Clock className="w-4 h-4 inline mr-2" />
                        Start Time
                      </Label>
                      <Input
                        type="time"
                        value={formData.startTime}
                        onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                        className="bg-spotify-white/10 border-spotify-green/20 text-spotify-white"
                        required
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Label className="text-spotify-white mb-2 block">
                        <Clock className="w-4 h-4 inline mr-2" />
                        End Time
                      </Label>
                      <Input
                        type="time"
                        value={formData.endTime}
                        onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                        className="bg-spotify-white/10 border-spotify-green/20 text-spotify-white"
                        required
                      />
                    </motion.div>
                  </div>

                  {/* Organizer and Attendees */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Label className="text-spotify-white mb-2 block">Organizer Name</Label>
                      <Input
                        value={formData.organizer}
                        onChange={(e) => setFormData({...formData, organizer: e.target.value})}
                        className="bg-spotify-white/10 border-spotify-green/20 text-spotify-white"
                        placeholder="Enter your name"
                        required
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Label className="text-spotify-white mb-2 block">
                        <Users className="w-4 h-4 inline mr-2" />
                        Expected Attendees
                      </Label>
                      <Input
                        type="number"
                        value={formData.attendees}
                        onChange={(e) => setFormData({...formData, attendees: e.target.value})}
                        className="bg-spotify-white/10 border-spotify-green/20 text-spotify-white"
                        placeholder="Number of people"
                        min="1"
                        required
                      />
                    </motion.div>
                  </div>

                  {/* Purpose */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Label className="text-spotify-white mb-2 block">Meeting Purpose</Label>
                    <Input
                      value={formData.purpose}
                      onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                      className="bg-spotify-white/10 border-spotify-green/20 text-spotify-white"
                      placeholder="Brief description of the meeting"
                      required
                    />
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex gap-4 pt-4"
                  >
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onClose}
                      className="flex-1 border-spotify-green/20 text-spotify-white hover:bg-spotify-white/10"
                    >
                      Cancel
                    </Button>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1"
                    >
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-spotify-green to-spotify-green-light hover:from-spotify-green-dark hover:to-spotify-green"
                      >
                        Confirm Booking
                      </Button>
                    </motion.div>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
