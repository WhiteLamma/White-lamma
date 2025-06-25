"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { BusinessCard } from "@/components/ui/business-card"
import { ReviewTile } from "@/components/ui/review-tile"
import { AnimatedCategoryIcon } from "@/components/ui/animated-category-icon"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, MapPin, Star, Users, Award, ArrowRight, Sparkles, FlameIcon as Fire, Quote } from "lucide-react"
import Link from "next/link"

// Mock data
const featuredBusinesses = [
  {
    id: "1",
    name: "Sharma Ji Ka Dhaba",
    category: "Restaurants",
    rating: 4.8,
    reviewCount: 1247,
    priceRange: "₹₹",
    address: "Connaught Place, New Delhi",
    distance: "0.8 km",
    isOpen: true,
    openUntil: "11:00 PM",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Authentic", "Family-friendly", "Parking"],
    isFavorited: false,
    hasDelivery: true,
    isPromoted: true,
  },
  {
    id: "2",
    name: "Chai Tapri",
    category: "Cafes",
    rating: 4.6,
    reviewCount: 892,
    priceRange: "₹",
    address: "Karol Bagh, New Delhi",
    distance: "1.2 km",
    isOpen: true,
    openUntil: "12:00 AM",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Late Night", "Budget-friendly", "Outdoor Seating"],
    isFavorited: true,
    hasDelivery: false,
    isPromoted: false,
  },
  {
    id: "3",
    name: "Gold's Gym",
    category: "Gyms",
    rating: 4.4,
    reviewCount: 567,
    priceRange: "₹₹₹",
    address: "Rajouri Garden, New Delhi",
    distance: "2.1 km",
    isOpen: true,
    openUntil: "10:00 PM",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Modern Equipment", "Personal Training", "AC"],
    isFavorited: false,
    hasDelivery: false,
    isPromoted: false,
  },
]

const categories = [
  { name: "Restaurants", count: "12K+", color: "gradient-coral", description: "Delicious food awaits" },
  { name: "Cafes", count: "8K+", color: "gradient-warm", description: "Perfect coffee spots" },
  { name: "Gyms", count: "3K+", color: "gradient-ocean", description: "Stay fit and healthy" },
  { name: "Salons", count: "5K+", color: "gradient-flamingo", description: "Look your best" },
  { name: "Auto Service", count: "2K+", color: "gradient-tertiary", description: "Vehicle care experts" },
  { name: "Shopping", count: "15K+", color: "gradient-sunset", description: "Shop till you drop" },
]

const recentReviews = [
  {
    id: "1",
    user: {
      name: "Priya Sharma",
      avatar: "/placeholder.svg",
      reviewCount: 47,
      isElite: true,
    },
    rating: 5,
    date: "2 days ago",
    text: "Absolutely amazing experience! The butter chicken here is to die for. The ambiance is perfect for family dinners and the staff is super friendly. Highly recommend the kulcha and lassi combo. Will definitely come back!",
    images: ["/placeholder.svg?height=80&width=80", "/placeholder.svg?height=80&width=80"],
    likes: 23,
    dislikes: 1,
    replies: 5,
    isHelpful: true,
    tags: ["Great Food", "Family Friendly", "Value for Money"],
  },
]

const testimonials = [
  {
    name: "Rahul Kumar",
    role: "Food Blogger",
    content:
      "Help has revolutionized how I discover local gems. The reviews are authentic and the community is amazing!",
    avatar: "/placeholder.svg",
    rating: 5,
  },
  {
    name: "Sneha Patel",
    role: "Local Explorer",
    content: "Found the best dhaba in my area through Help. The recommendations are spot on!",
    avatar: "/placeholder.svg",
    rating: 5,
  },
  {
    name: "Amit Singh",
    role: "Business Owner",
    content: "Help helped my restaurant reach more customers. The platform is incredible for businesses!",
    avatar: "/placeholder.svg",
    rating: 5,
  },
]

const searchSuggestions = [
  "Butter Chicken near me",
  "Best Gyms in Delhi",
  "Hair Salons with AC",
  "24/7 Cafes",
  "Authentic Dhabas",
  "Car Service Centers",
]

export default function HomePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [locationQuery, setLocationQuery] = useState("")
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [liveStats, setLiveStats] = useState({
    users: 50000,
    reviews: 1000000,
    businesses: 25000,
  })

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Animate live stats
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats((prev) => ({
        users: prev.users + Math.floor(Math.random() * 3),
        reviews: prev.reviews + Math.floor(Math.random() * 5),
        businesses: prev.businesses + Math.floor(Math.random() * 2),
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(locationQuery)}`)
    }
  }

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/search?category=${categoryName.toLowerCase()}`)
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <motion.h1
                className="text-6xl md:text-8xl font-bold mb-6"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
              >
                <span className="text-gradient-primary bg-[length:200%_200%]">Discover</span>
                <br />
                <span className="text-white drop-shadow-2xl">Local Gems</span>
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                From authentic dhabas to modern cafes, find the best local businesses with real reviews from your
                community
              </motion.p>
            </motion.div>

            {/* Enhanced Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-3xl mx-auto mb-8"
            >
          <form onSubmit={handleSearch}>
            <div className="relative">
              <div className="flex rounded-2xl glass border-2 border-white/30 shadow-2xl hover:shadow-3xl transition-shadow duration-300 overflow-hidden">
                <div className="flex-1 flex items-center">
                  <Search className="ml-4 w-5 h-5 text-white/70" />
                  <Input
                    type="text"
                    placeholder="Search for dhabas, gyms, salons..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-0 focus:ring-0 focus:outline-none text-base px-3 py-3 bg-transparent text-white placeholder-white/70 w-full"
                  />
                </div>
                <div className="flex items-center border-l border-white/30">
                  <MapPin className="ml-3 w-5 h-5 text-white/70" />
                  <Input
                    type="text"
                    placeholder="Location"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    className="border-0 focus:ring-0 focus:outline-none text-base px-3 py-3 bg-transparent text-white placeholder-white/70 w-full"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-r-2xl gradient-primary px-6 py-3 text-base font-semibold text-white shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-0"
                >
                  Search
                </motion.button>
              </div>
            </div>
          </form>


              {/* Search Suggestions */}
              <motion.div
                className="mt-6 flex flex-wrap justify-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {searchSuggestions.slice(0, 4).map((suggestion, index) => (
                  <motion.button
                    key={suggestion}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSearchQuery(suggestion)}
                    className="px-4 py-2 glass rounded-full text-sm text-grey/90 hover:bg-white/20 transition-colors border border-white/20"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>

            {/* Live Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center space-x-8 text-center"
            >
              <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.1 }}>
                <div className="w-12 h-12 gradient-secondary rounded-full flex items-center justify-center shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <span className="text-white/90">
                  <motion.span
                    key={liveStats.users}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-bold text-xl"
                  >
                    {liveStats.users.toLocaleString()}
                  </motion.span>
                  <br />
                  <span className="text-sm">Users</span>
                </span>
              </motion.div>
              <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.1 }}>
                <div className="w-12 h-12 gradient-warm rounded-full flex items-center justify-center shadow-lg">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <span className="text-white/90">
                  <motion.span
                    key={liveStats.reviews}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-bold text-xl"
                  >
                    {liveStats.reviews.toLocaleString()}
                  </motion.span>
                  <br />
                  <span className="text-sm">Reviews</span>
                </span>
              </motion.div>
              <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.1 }}>
                <div className="w-12 h-12 gradient-ocean rounded-full flex items-center justify-center shadow-lg">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <span className="text-white/90">
                  <motion.span
                    key={liveStats.businesses}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-bold text-xl"
                  >
                    {liveStats.businesses.toLocaleString()}
                  </motion.span>
                  <br />
                  <span className="text-sm">Businesses</span>
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 drop-shadow-sm">Explore Categories</h2>
            <p className="text-xl text-gray-700">Find exactly what you're looking for</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryClick(category.name)}
                className="cursor-pointer"
              >
                <Card className="bg-white/95 backdrop-blur-sm text-center hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden group">
                  <CardContent className="p-6 relative">
                    <motion.div
                      className={`w-16 h-16 ${category.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <AnimatedCategoryIcon category={category.name} className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-600 mb-1 font-semibold">{category.count}</p>
                    <p className="text-xs text-gray-500">{category.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-between items-center mb-16"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center drop-shadow-lg">
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Fire className="w-10 h-10 text-orange-400 mr-4" />
                </motion.div>
                Trending Now
              </h2>
              <p className="text-xl text-white/80">Most popular businesses this week</p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/search">
                <Button className="btn-outline flex items-center space-x-2">
                  <span>View All</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBusinesses.map((business, index) => (
              <motion.div
                key={business.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <BusinessCard business={business} variant="featured" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">What People Say</h2>
            <p className="text-xl text-white/80">Real stories from our community</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Card className="card-glass p-12 shadow-2xl border-2 border-white/20">
                <CardContent>
                  <Quote className="w-16 h-16 text-white/60 mx-auto mb-8" />
                  <p className="text-2xl text-white/90 mb-8 italic leading-relaxed">
                    "{testimonials[currentTestimonial].content}"
                  </p>
                  <div className="flex items-center justify-center space-x-4">
                    <img
                      src={testimonials[currentTestimonial].avatar || "/placeholder.svg"}
                      alt={testimonials[currentTestimonial].name}
                      className="w-16 h-16 rounded-full border-4 border-white/30"
                    />
                    <div>
                      <h4 className="font-bold text-xl text-white">{testimonials[currentTestimonial].name}</h4>
                      <p className="text-white/70">{testimonials[currentTestimonial].role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Testimonial Indicators */}
            <div className="flex justify-center space-x-3 mt-8">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                 
                  whileTap={{ scale: 0.8 }}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? "gradient-primary shadow-lg" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Reviews */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center drop-shadow-lg">
              <motion.div
               
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Sparkles className="w-10 h-10 text-yellow-400 mr-4" />
              </motion.div>
              Recent Reviews
            </h2>
            <p className="text-xl text-white/80">See what the community is saying</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {recentReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ReviewTile review={review} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link href="/reviews">
              <Button className="btn-outline">View All Reviews</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 drop-shadow-lg">Join the Help Community</h2>
            <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
              Share your experiences, discover hidden gems, and help others make better choices
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="btn-primary px-12 py-6 text-xl">
                  Write a Review
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="btn-outline px-12 py-6 text-xl">
                  Add Your Business
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-denim py-16 border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">H</span>
                </div>
                <span className="text-3xl font-bold text-white">Help</span>
              </div>
              <p className="text-white/70 leading-relaxed">
                Your local desi discovery app. Find the best businesses in your neighborhood with authentic reviews.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-xl text-white mb-6">For Users</h3>
              <ul className="space-y-3 text-white/70">
                <li>
                  <Link href="/search" className="hover:text-white transition-colors">
                    Browse Businesses
                  </Link>
                </li>
                <li>
                  <Link href="/reviews" className="hover:text-white transition-colors">
                    Write Reviews
                  </Link>
                </li>
                <li>
                  <Link href="/wishlist" className="hover:text-white transition-colors">
                    My Wishlist
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className="hover:text-white transition-colors">
                    My Profile
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-xl text-white mb-6">For Business</h3>
              <ul className="space-y-3 text-white/70">
                <li>
                  <Link href="/business/register" className="hover:text-white transition-colors">
                    Add Business
                  </Link>
                </li>
                <li>
                  <Link href="/business/login" className="hover:text-white transition-colors">
                    Business Login
                  </Link>
                </li>
                <li>
                  <Link href="/events/host" className="hover:text-white transition-colors">
                    Host Events
                  </Link>
                </li>
                <li>
                  <Link href="/learn-more" className="hover:text-white transition-colors">
                    Learn More
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-xl text-white mb-6">Support</h3>
              <ul className="space-y-3 text-white/70">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/60">
            <p>&copy; 2025 Help. Made with ❤️ in India.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
