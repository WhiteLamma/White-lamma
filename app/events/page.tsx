"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Calendar,
  MapPin,
  Clock,
  Users,
  Star,
  Heart,
  Share2,
  Filter,
  Music,
  Utensils,
  Gamepad2,
  Palette,
  Dumbbell,
  BookOpen,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const eventCategories = [
  { name: "All", icon: Calendar, count: "150+" },
  { name: "Food", icon: Utensils, count: "45+" },
  { name: "Music", icon: Music, count: "30+" },
  { name: "Art", icon: Palette, count: "25+" },
  { name: "Sports", icon: Dumbbell, count: "20+" },
  { name: "Gaming", icon: Gamepad2, count: "15+" },
  { name: "Learning", icon: BookOpen, count: "15+" },
]

const events = [
  {
    id: "1",
    title: "Delhi Food Festival 2024",
    description:
      "Experience the best street food and fine dining from across Delhi. Over 100 vendors, live cooking demos, and celebrity chef appearances.",
    category: "Food",
    date: "2024-02-15",
    time: "10:00 AM - 10:00 PM",
    location: "Pragati Maidan, New Delhi",
    price: "₹299",
    attendees: 2500,
    maxAttendees: 5000,
    rating: 4.8,
    image: "/placeholder.svg?height=300&width=400",
    organizer: {
      name: "Delhi Food Council",
      avatar: "/placeholder.svg",
      verified: true,
    },
    tags: ["Street Food", "Fine Dining", "Live Demos", "Celebrity Chefs"],
    isLiked: false,
    isFeatured: true,
  },
  {
    id: "2",
    title: "Indie Music Night",
    description:
      "Discover amazing indie artists from across India. Live performances, open mic sessions, and networking with music lovers.",
    category: "Music",
    date: "2024-02-20",
    time: "7:00 PM - 11:00 PM",
    location: "Hard Rock Cafe, Connaught Place",
    price: "₹599",
    attendees: 150,
    maxAttendees: 200,
    rating: 4.6,
    image: "/placeholder.svg?height=300&width=400",
    organizer: {
      name: "Indie Music Delhi",
      avatar: "/placeholder.svg",
      verified: true,
    },
    tags: ["Live Music", "Indie Artists", "Open Mic", "Networking"],
    isLiked: true,
    isFeatured: false,
  },
  {
    id: "3",
    title: "Digital Art Workshop",
    description:
      "Learn digital art techniques from professional artists. Hands-on workshop with tablets provided. Perfect for beginners and intermediates.",
    category: "Art",
    date: "2024-02-25",
    time: "2:00 PM - 6:00 PM",
    location: "Creative Hub, Hauz Khas",
    price: "₹1,299",
    attendees: 25,
    maxAttendees: 30,
    rating: 4.9,
    image: "/placeholder.svg?height=300&width=400",
    organizer: {
      name: "Art Academy Delhi",
      avatar: "/placeholder.svg",
      verified: true,
    },
    tags: ["Digital Art", "Workshop", "Hands-on", "Beginner Friendly"],
    isLiked: false,
    isFeatured: true,
  },
  {
    id: "4",
    title: "Weekend Cricket Tournament",
    description:
      "Join the most exciting cricket tournament in Delhi. Teams of 11, professional umpires, and amazing prizes for winners.",
    category: "Sports",
    date: "2024-03-02",
    time: "8:00 AM - 6:00 PM",
    location: "Feroz Shah Kotla Ground",
    price: "₹500 per team",
    attendees: 220,
    maxAttendees: 264,
    rating: 4.7,
    image: "/placeholder.svg?height=300&width=400",
    organizer: {
      name: "Delhi Cricket Club",
      avatar: "/placeholder.svg",
      verified: true,
    },
    tags: ["Cricket", "Tournament", "Team Sport", "Prizes"],
    isLiked: false,
    isFeatured: false,
  },
]

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("date")
  const [likedEvents, setLikedEvents] = useState<string[]>(["2"])

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const toggleLike = (eventId: string) => {
    setLikedEvents((prev) => (prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="gradient-aesthetic bg-clip-text text-transparent">Discover</span>
            <br />
            <span className="text-gray-900">Amazing Events</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Find exciting events happening in your city. From food festivals to music concerts, there's something for
            everyone!
          </p>

          {/* Search and Filter */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 text-lg border-2 border-purple-200 focus:border-purple-400 rounded-full"
                />
              </div>
            
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-3">
              {eventCategories.map((category) => (
                <motion.button
                  key={category.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                    selectedCategory === category.name
                      ? "gradient-flamingo text-white shadow-lg"
                      : "bg-white border-2 border-purple-200 hover:border-purple-400 text-gray-700"
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  <span>{category.name}</span>
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {category.count}
                  </Badge>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            
              whileTap={{ scale: 0.98 }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer group border-2 border-transparent hover:border-purple-200 overflow-hidden">
                {event.isFeatured && (
                  <motion.div
                    className="absolute top-4 left-4 z-10"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <Badge className="gradient-flamingo text-white font-semibold">Featured</Badge>
                  </motion.div>
                )}

                {/* Event Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleLike(event.id)
                      }}
                      className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          likedEvents.includes(event.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                        }`}
                      />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
                    >
                      <Share2 className="w-4 h-4 text-gray-600" />
                    </motion.button>
                  </div>

                  {/* Date Badge */}
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-white/95 rounded-lg px-3 py-2 shadow-lg">
                      <div className="text-center">
                        <p className="text-xs font-medium text-gray-600">{formatDate(event.date)}</p>
                        <p className="text-lg font-bold text-gray-900">{new Date(event.date).getDate()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* Event Info */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {event.category}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{event.rating}</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">{event.title}</h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{event.description}</p>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>
                        {event.attendees}/{event.maxAttendees} attending
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {event.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Organizer */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={event.organizer.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-xs">
                          {event.organizer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-600">{event.organizer.name}</span>
                      {event.organizer.verified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    <span className="font-bold text-lg text-gray-900">
                      {event.price}
                    </span>
                  </div>

                  {/* Action Button */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link href={`/events/${event.id}`}>
                      <Button className="w-full gradient-denim hover:shadow-lg transition-all duration-200">
                        View Details
                      </Button>
                    </Link>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
            <Calendar className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Events Found</h3>
            <p className="text-gray-600 mb-8">Try adjusting your search criteria or check back later for new events</p>
            <Button className="gradient-flamingo">Create Event</Button>
          </motion.div>
        )}

        {/* CTA Section */}
       <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="max-w-4xl mx-auto px-6 py-12 mt-20 bg-white/10 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">Host Your Own Event</h2>
          <p className="text-lg sm:text-xl text-black/80 mb-8 max-w-2xl mx-auto">
            Share your passion with the community. Create memorable experiences and connect with like-minded people.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-black text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg">
                Create Event
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="border border-black text-black hover:bg-white hover:text-purple-600 px-8 py-4 rounded-xl text-lg font-semibold"
              >
                Learn More
              </Button>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
