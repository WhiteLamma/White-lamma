"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/layout/navbar"
import { BusinessCard } from "@/components/ui/business-card"
import { AnimatedCategoryIcon } from "@/components/ui/animated-category-icon"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Star, TrendingUp } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    name: "Restaurants",
    count: "12,547",
    description: "From street food to fine dining",
    color: "bg-red-500",
    businesses: 12547,
    avgRating: 4.2,
    trending: true,
  },
  {
    name: "Cafes",
    count: "8,234",
    description: "Coffee, tea, and cozy vibes",
    color: "bg-amber-500",
    businesses: 8234,
    avgRating: 4.4,
    trending: true,
  },
  {
    name: "Gyms",
    count: "3,456",
    description: "Fitness centers and yoga studios",
    color: "bg-blue-500",
    businesses: 3456,
    avgRating: 4.1,
    trending: true,
  },
  {
    name: "Salons",
    count: "5,678",
    description: "Beauty and grooming services",
    color: "bg-pink-500",
    businesses: 5678,
    avgRating: 4.3,
    trending: true,
  },
  {
    name: "Auto Service",
    count: "2,345",
    description: "Car repair and maintenance",
    color: "bg-gray-500",
    businesses: 2345,
    avgRating: 4.0,
    trending: false,
  },
  {
    name: "Shopping",
    count: "15,789",
    description: "Retail stores and markets",
    color: "bg-purple-500",
    businesses: 15789,
    avgRating: 4.2,
    trending: true,
  },
  {
    name: "Healthcare",
    count: "4,567",
    description: "Hospitals, clinics, and pharmacies",
    color: "bg-green-500",
    businesses: 4567,
    avgRating: 4.5,
    trending: false,
  },
  {
    name: "Education",
    count: "3,234",
    description: "Schools, colleges, and training centers",
    color: "bg-indigo-500",
    businesses: 3234,
    avgRating: 4.3,
    trending: false,
  },
  {
    name: "Entertainment",
    count: "2,890",
    description: "Movies, games, and fun activities",
    color: "bg-yellow-500",
    businesses: 2890,
    avgRating: 4.4,
    trending: true,
  },
]

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
]

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("popularity")

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-sky-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="gradient-aesthetic bg-clip-text text-transparent">Explore</span>
            <br />
            <span className="text-gray-900">Categories</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover amazing businesses across different categories in your area
          </p>

          {/* Search Bar */}
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
          </div>

          {/* Quick Stats */}
          <div className="flex justify-center space-x-8 text-center">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-denim rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">{categories.length}</span>
              </div>
              <span className="text-gray-600">Categories</span>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-flamingo rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-600">50K+ Businesses</span>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-soft-sky rounded-full flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-600">All Cities</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
             
              whileTap={{ scale: 0.98 }}
            >
              <Link href={`/search?category=${category.name.toLowerCase()}`}>
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer group border-2 border-transparent hover:border-blue-200 overflow-hidden relative">
                  {category.trending && (
                    <motion.div
                      className="absolute top-3 right-3 z-10"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <Badge className="gradient-flamingo text-white font-semibold flex items-center space-x-1">
                        <TrendingUp className="w-3 h-3" />
                        <span>Trending</span>
                      </Badge>
                    </motion.div>
                  )}

                  <CardContent className="p-8 text-center relative">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-pink-500" />
                    </div>

                    <motion.div
                      className={`w-20 h-20 ${category.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10`}
                     
                      transition={{ duration: 0.8 }}
                    >
                      <AnimatedCategoryIcon category={category.name} className="w-10 h-10" />
                    </motion.div>

                    <h3 className="font-bold text-xl text-gray-900 mb-2 relative z-10">{category.name}</h3>
                    <p className="text-gray-600 mb-4 relative z-10">{category.description}</p>

                    <div className="flex justify-between items-center mb-4 relative z-10">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">
                          {category.count}
                        </p>
                        <p className="text-xs text-gray-500">Businesses</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold text-gray-900">{category.avgRating}</span>
                        </div>
                        <p className="text-xs text-gray-500">Avg Rating</p>
                      </div>
                    </div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative z-10">
                      <Button className="w-full gradient-denim hover:shadow-lg transition-all duration-200">
                        Explore {category.name}
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Featured Businesses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured This Week</h2>
            <p className="text-lg text-gray-600">Top-rated businesses across categories</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBusinesses.map((business, index) => (
              <motion.div
                key={business.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <BusinessCard business={business} variant="featured" />
              </motion.div>
            ))}
          </div>
        </motion.div>

     
       {/* CTA Card Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="max-w-4xl mx-auto px-6 py-14 bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30"
        >
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Can't Find Your Category?</h2>
            <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Help us grow! Suggest a new category or add your business to Help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-gradient-to-r from-orange-400 to-yellow-300 text-white px-8 py-4 rounded-xl shadow-md hover:shadow-lg text-lg font-semibold">
                  Suggest Category
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border border-orange-300 text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-xl text-lg font-semibold"
                >
                  Add Your Business
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
