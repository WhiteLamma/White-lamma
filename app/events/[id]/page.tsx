"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/toast-provider"
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Star,
  Heart,
  Share2,
  Ticket,
  Phone,
  Mail,
  Globe,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Camera,
  MessageCircle,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock event data
const eventData = {
  id: "1",
  title: "Delhi Food Festival 2024",
  description:
    "Experience the best street food and fine dining from across Delhi. Over 100 vendors, live cooking demos, and celebrity chef appearances. This is the ultimate food lover's paradise with authentic flavors from every corner of the city.",
  longDescription: `Join us for the most anticipated food festival of the year! The Delhi Food Festival 2024 brings together the finest culinary experiences from across the capital. 

From the famous paranthas of Chandni Chowk to the innovative fusion cuisine of modern Delhi, this festival celebrates the rich food culture of our city.

What to expect:
• 100+ food vendors and restaurants
• Live cooking demonstrations by celebrity chefs
• Traditional and modern food stalls
• Cultural performances throughout the day
• Food photography workshops
• Kids' cooking activities
• Wine and beverage tastings

Don't miss this incredible opportunity to taste the best of Delhi's culinary scene all in one place!`,
  category: "Food",
  date: "2024-02-15",
  endDate: "2024-02-17",
  time: "10:00 AM - 10:00 PM",
  location: "Pragati Maidan, New Delhi",
  fullAddress: "Pragati Maidan, Mathura Road, New Delhi, Delhi 110001",
  price: "₹299",
  originalPrice: "₹399",
  attendees: 2847,
  maxAttendees: 5000,
  rating: 4.8,
  reviewCount: 156,
  image: "/placeholder.svg?height=400&width=800",
  gallery: [
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
  ],
  organizer: {
    name: "Delhi Food Council",
    avatar: "/placeholder.svg",
    verified: true,
    description: "Premier food event organizers in Delhi",
    phone: "+91 98765 43210",
    email: "info@delhifoodcouncil.com",
    website: "www.delhifoodcouncil.com",
  },
  tags: ["Street Food", "Fine Dining", "Live Demos", "Celebrity Chefs", "Cultural Shows"],
  highlights: [
    "Celebrity chef cooking demonstrations",
    "Traditional Delhi street food",
    "Live cultural performances",
    "Food photography workshops",
    "Kids' activities zone",
    "Wine and beverage tastings",
  ],
  schedule: [
    { time: "10:00 AM", activity: "Festival Opens & Welcome Ceremony" },
    { time: "11:00 AM", activity: "Celebrity Chef Demo - Sanjeev Kapoor" },
    { time: "1:00 PM", activity: "Traditional Dance Performance" },
    { time: "3:00 PM", activity: "Food Photography Workshop" },
    { time: "5:00 PM", activity: "Kids Cooking Competition" },
    { time: "7:00 PM", activity: "Live Music & Cultural Show" },
    { time: "9:00 PM", activity: "Grand Finale & Prize Distribution" },
  ],
  isLiked: false,
  isFeatured: true,
  status: "upcoming",
  ticketsAvailable: 2153,
}

export default function EventDetailPage() {
  const params = useParams()
  const { toast } = useToast()
  const [isLiked, setIsLiked] = useState(eventData.isLiked)
  const [attendeeCount, setAttendeeCount] = useState(eventData.attendees)
  const [selectedImage, setSelectedImage] = useState(0)
  const [ticketQuantity, setTicketQuantity] = useState(1)

  const handleLike = () => {
    setIsLiked(!isLiked)
    toast({
      title: isLiked ? "Removed from favorites" : "Added to favorites! ❤️",
      description: isLiked ? "Event removed from your favorites" : "You'll get notified about updates",
      type: "success",
    })
  }

  const handleShare = () => {
    toast({
      title: "Event shared! 🎉",
      description: "Event link copied to clipboard",
      type: "success",
    })
  }

  const handleBookTicket = () => {
    setAttendeeCount((prev) => prev + ticketQuantity)
    toast({
      title: "Tickets booked successfully! 🎫",
      description: `${ticketQuantity} ticket(s) booked for Delhi Food Festival 2024`,
      type: "success",
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getDaysUntilEvent = () => {
    const eventDate = new Date(eventData.date)
    const today = new Date()
    const diffTime = eventDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const daysUntil = getDaysUntilEvent()

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
          <Link href="/events">
            <Button variant="outline" className="btn-outline flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Events</span>
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative">
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <Image
                  src={eventData.gallery[selectedImage] || "/placeholder.svg"}
                  alt={eventData.title}
                  fill
                  className="object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Featured Badge */}
                {eventData.isFeatured && (
                  <div className="absolute top-4 left-4">
                    <Badge className="gradient-flamingo text-white font-semibold">Featured Event</Badge>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleLike}
                    className="p-3 glass rounded-full shadow-lg hover:bg-white/20 transition-colors"
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : "text-white"}`} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleShare}
                    className="p-3 glass rounded-full shadow-lg hover:bg-white/20 transition-colors"
                  >
                    <Share2 className="w-5 h-5 text-white" />
                  </motion.button>
                </div>

                {/* Event Status */}
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center space-x-2">
                    {daysUntil > 0 ? (
                      <Badge className="gradient-soft-sky text-white flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{daysUntil} days to go</span>
                      </Badge>
                    ) : daysUntil === 0 ? (
                      <Badge className="gradient-warm text-white flex items-center space-x-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>Today!</span>
                      </Badge>
                    ) : (
                      <Badge className="bg-gray-500 text-white flex items-center space-x-1">
                        <CheckCircle className="w-3 h-3" />
                        <span>Event Ended</span>
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Image Gallery Thumbnails */}
              <div className="flex space-x-2 mt-4 overflow-x-auto">
                {eventData.gallery.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? "border-blue-500 shadow-lg" : "border-white/30"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Gallery ${index + 1}`}
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Event Details */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="card-glass border-2 border-white/20">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h1 className="text-4xl font-bold text-white mb-4">{eventData.title}</h1>
                      <div className="flex items-center space-x-4 mb-4">
                        <Badge variant="outline" className="border-white/30 text-white">
                          {eventData.category}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-white font-medium">{eventData.rating}</span>
                          <span className="text-white/60">({eventData.reviewCount} reviews)</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
                        {eventData.price}
                      </div>
                      {eventData.originalPrice && (
                        <div className="text-lg text-white/60 line-through">{eventData.originalPrice}</div>
                      )}
                    </div>
                  </div>

                  {/* Key Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-6 h-6 text-blue-400" />
                      <div>
                        <p className="text-white font-medium">{formatDate(eventData.date)}</p>
                        {eventData.endDate && (
                          <p className="text-white/60 text-sm">to {formatDate(eventData.endDate)}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-6 h-6 text-green-400" />
                      <div>
                        <p className="text-white font-medium">{eventData.time}</p>
                        <p className="text-white/60 text-sm">Duration: 12 hours</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-6 h-6 text-purple-400" />
                      <div>
                        <p className="text-white font-medium">{attendeeCount} attending</p>
                        <p className="text-white/60 text-sm">of {eventData.maxAttendees} capacity</p>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start space-x-3 mb-8">
                    <MapPin className="w-6 h-6 text-red-400 mt-1" />
                    <div>
                      <p className="text-white font-medium">{eventData.location}</p>
                      <p className="text-white/60 text-sm">{eventData.fullAddress}</p>
                      <Button variant="outline" size="sm" className="mt-2 btn-outline">
                        View on Map
                      </Button>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-4">About This Event</h3>
                    <p className="text-white/80 leading-relaxed mb-4">{eventData.description}</p>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-white/70 whitespace-pre-line">{eventData.longDescription}</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-4">Event Highlights</h3>
                    <div className="flex flex-wrap gap-2">
                      {eventData.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="border-white/30 text-white">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-4">What to Expect</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {eventData.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-white/80">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Schedule */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Event Schedule</h3>
                    <div className="space-y-3">
                      {eventData.schedule.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4 p-3 glass rounded-lg">
                          <div className="text-blue-400 font-medium min-w-[80px]">{item.time}</div>
                          <div className="text-white/80">{item.activity}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Organizer Info */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="card-glass border-2 border-white/20">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-white mb-6">Event Organizer</h3>
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-16 h-16 border-4 border-white/30">
                      <AvatarImage src={eventData.organizer.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="gradient-primary text-white text-xl">
                        {eventData.organizer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="text-lg font-bold text-white">{eventData.organizer.name}</h4>
                        {eventData.organizer.verified && (
                          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      <p className="text-white/70 mb-4">{eventData.organizer.description}</p>
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-green-400" />
                          <span className="text-white/80">{eventData.organizer.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-blue-400" />
                          <span className="text-white/80">{eventData.organizer.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Globe className="w-4 h-4 text-purple-400" />
                          <span className="text-white/80">{eventData.organizer.website}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <Card className="card-glass border-2 border-white/20 sticky top-24">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold gradient-primary bg-clip-text text-transparent mb-2">
                      {eventData.price}
                    </div>
                    {eventData.originalPrice && (
                      <div className="text-lg text-white/60 line-through">{eventData.originalPrice}</div>
                    )}
                    <p className="text-white/70 text-sm">per person</p>
                  </div>

                  {/* Ticket Quantity */}
                  <div className="mb-6">
                    <label className="block text-white font-medium mb-2">Number of Tickets</label>
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))}
                        className="btn-outline"
                      >
                        -
                      </Button>
                      <span className="text-white font-bold text-xl w-12 text-center">{ticketQuantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setTicketQuantity(Math.min(10, ticketQuantity + 1))}
                        className="btn-outline"
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="mb-6 p-4 glass rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Total ({ticketQuantity} tickets)</span>
                      <span className="text-xl font-bold text-white">
                        ₹{(Number.parseInt(eventData.price.replace("₹", "")) * ticketQuantity).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Book Button */}
                  <Button onClick={handleBookTicket} className="w-full btn-primary mb-4" disabled={daysUntil < 0}>
                    <Ticket className="w-5 h-5 mr-2" />
                    {daysUntil < 0 ? "Event Ended" : "Book Tickets"}
                  </Button>

                  {/* Availability */}
                  <div className="text-center">
                    <p className="text-white/70 text-sm">{eventData.ticketsAvailable} tickets remaining</p>
                    <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                      <div
                        className="gradient-primary h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${((eventData.maxAttendees - eventData.ticketsAvailable) / eventData.maxAttendees) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Card className="card-glass border-2 border-white/20">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full btn-outline justify-start">
                      <Camera className="w-4 h-4 mr-2" />
                      View Photos
                    </Button>
                    <Button variant="outline" className="w-full btn-outline justify-start">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Ask Questions
                    </Button>
                    <Button variant="outline" className="w-full btn-outline justify-start">
                      <Users className="w-4 h-4 mr-2" />
                      See Attendees
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Similar Events */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Card className="card-glass border-2 border-white/20">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Similar Events</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <div className="w-12 h-12 gradient-secondary rounded-lg flex-shrink-0" />
                        <div className="flex-1">
                          <h4 className="text-white font-medium text-sm">Music Festival {i}</h4>
                          <p className="text-white/60 text-xs">Feb {20 + i}, 2024</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4 btn-outline">
                    View All Events
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
