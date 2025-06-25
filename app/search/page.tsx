"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { BusinessCard } from "@/components/ui/business-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Star, Grid, List, SlidersHorizontal } from "lucide-react"

// Mock data with more businesses
const allBusinesses = [
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
  {
    id: "4",
    name: "Punjabi Dhaba Express",
    category: "Restaurants",
    rating: 4.2,
    reviewCount: 324,
    priceRange: "₹₹",
    address: "Lajpat Nagar, New Delhi",
    distance: "1.8 km",
    isOpen: false,
    openUntil: "Opens at 11:00 AM",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Punjabi", "Vegetarian", "Home Delivery"],
    isFavorited: false,
    hasDelivery: true,
    isPromoted: false,
  },
  {
    id: "5",
    name: "Coffee Bean Cafe",
    category: "Cafes",
    rating: 4.7,
    reviewCount: 445,
    priceRange: "₹₹",
    address: "Khan Market, New Delhi",
    distance: "0.5 km",
    isOpen: true,
    openUntil: "9:00 PM",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["WiFi", "Study Friendly", "Artisan Coffee"],
    isFavorited: false,
    hasDelivery: false,
    isPromoted: true,
  },
  {
    id: "6",
    name: "Fitness First",
    category: "Gyms",
    rating: 4.1,
    reviewCount: 234,
    priceRange: "₹₹",
    address: "Saket, New Delhi",
    distance: "3.2 km",
    isOpen: true,
    openUntil: "11:00 PM",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Group Classes", "Swimming Pool", "Spa"],
    isFavorited: true,
    hasDelivery: false,
    isPromoted: false,
  },
  {
    id: "7",
    name: "Looks Salon",
    category: "Salons",
    rating: 4.5,
    reviewCount: 678,
    priceRange: "₹₹₹",
    address: "Greater Kailash, New Delhi",
    distance: "2.5 km",
    isOpen: true,
    openUntil: "8:00 PM",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Unisex", "Bridal Services", "Premium"],
    isFavorited: false,
    hasDelivery: false,
    isPromoted: false,
  },
  {
    id: "8",
    name: "Auto Care Center",
    category: "Auto Service",
    rating: 4.3,
    reviewCount: 156,
    priceRange: "₹₹",
    address: "Mayur Vihar, New Delhi",
    distance: "4.1 km",
    isOpen: true,
    openUntil: "7:00 PM",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Multi-brand", "Quick Service", "Warranty"],
    isFavorited: false,
    hasDelivery: false,
    isPromoted: false,
  },
]

const categories = ["All", "Restaurants", "Cafes", "Gyms", "Salons", "Auto Service", "Shopping"]
const priceRanges = ["All", "₹", "₹₹", "₹₹₹"]
const ratings = ["All", "4.5+", "4.0+", "3.5+"]
const sortOptions = [
  { value: "relevance", label: "Most Relevant" },
  { value: "rating", label: "Highest Rated" },
  { value: "distance", label: "Nearest First" },
  { value: "reviews", label: "Most Reviewed" },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [locationQuery, setLocationQuery] = useState(searchParams.get("location") || "")
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All")
  const [selectedPriceRange, setSelectedPriceRange] = useState("All")
  const [selectedRating, setSelectedRating] = useState("All")
  const [sortBy, setSortBy] = useState("relevance")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  // Update category when URL changes
  useEffect(() => {
    const category = searchParams.get("category")
    if (category) {
      setSelectedCategory(category.charAt(0).toUpperCase() + category.slice(1))
    }
  }, [searchParams])

  // Filter and sort businesses
  const filteredBusinesses = useMemo(() => {
    const filtered = allBusinesses.filter((business) => {
      // Search query filter
      if (
        searchQuery &&
        !business.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !business.category.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !business.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      ) {
        return false
      }

      // Category filter
      if (selectedCategory !== "All" && business.category !== selectedCategory) {
        return false
      }

      // Price range filter
      if (selectedPriceRange !== "All" && business.priceRange !== selectedPriceRange) {
        return false
      }

      // Rating filter
      if (selectedRating !== "All") {
        const minRating = Number.parseFloat(selectedRating.replace("+", ""))
        if (business.rating < minRating) {
          return false
        }
      }

      return true
    })

    // Sort businesses
    switch (sortBy) {
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "distance":
        filtered.sort((a, b) => Number.parseFloat(a.distance) - Number.parseFloat(b.distance))
        break
      case "reviews":
        filtered.sort((a, b) => b.reviewCount - a.reviewCount)
        break
      default:
        // Keep original order for relevance
        break
    }

    return filtered
  }, [searchQuery, selectedCategory, selectedPriceRange, selectedRating, sortBy])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is handled by the useMemo above
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex rounded-2xl glass border-2 border-white/30 shadow-xl">
              <div className="flex-1 flex items-center">
                <Search className="ml-6 w-6 h-6 text-white/70" />
                <Input
                  type="text"
                  placeholder="Search for businesses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-0 focus:ring-0 text-lg px-4 py-4 rounded-l-2xl bg-transparent text-white placeholder-white/70"
                />
              </div>
              <div className="flex items-center border-l border-white/30">
                <MapPin className="ml-4 w-6 h-6 text-white/70" />
                <Input
                  type="text"
                  placeholder="Location"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  className="border-0 focus:ring-0 text-lg px-4 py-4 w-48 bg-transparent text-white placeholder-white/70"
                />
              </div>
              <Button type="submit" className="rounded-2xl gradient-primary px-8 py-4 text-lg font-semibold">
                Search
              </Button>
            </div>
          </form>

          {/* Results Summary */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {searchQuery
                  ? `Results for "${searchQuery}"`
                  : selectedCategory !== "All"
                    ? `${selectedCategory} in Delhi`
                    : "All Businesses"}
              </h1>
              <p className="text-white/70">
                {filteredBusinesses.length} businesses found
                {selectedCategory !== "All" && ` in ${selectedCategory}`}
              </p>
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 glass rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "gradient-primary" : "text-white/70 hover:text-white"}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "gradient-primary" : "text-white/70 hover:text-white"}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`w-80 space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <Card className="card-glass border-2 border-white/20 sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-black">Filters</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedCategory("All")
                      setSelectedPriceRange("All")
                      setSelectedRating("All")
                    }}
                    className="text-black/70 hover:text-white"
                  >
                    Clear All
                  </Button>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="font-semibold text-black mb-3">Category</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <motion.button
                        key={category}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                          selectedCategory === category
                            ? "gradient-primary text-white shadow-lg"
                            : "text-black/70 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        {category}
                        {category !== "All" && (
                          <span className="float-right text-sm">
                            {allBusinesses.filter((b) => category === "All" || b.category === category).length}
                          </span>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="mb-6">
                  <h4 className="font-semibold text-black mb-3">Price Range</h4>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <motion.button
                        key={range}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedPriceRange(range)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                          selectedPriceRange === range
                            ? "gradient-primary text-white shadow-lg"
                            : "text-black/70 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        {range}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="mb-6">
                  <h4 className="font-semibold text-black mb-3">Rating</h4>
                  <div className="space-y-2">
                    {ratings.map((rating) => (
                      <motion.button
                        key={rating}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedRating(rating)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center ${
                          selectedRating === rating
                            ? "gradient-primary text-white shadow-lg"
                            : "text-black/70 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        {rating !== "All" && <Star className="w-4 h-4 mr-2 fill-yellow-400 text-yellow-400" />}
                        {rating}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Sort Options */}
                <div>
                  <h4 className="font-semibold text-black mb-3">Sort By</h4>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-black focus:border-blue-400 focus:outline-none"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value} className="bg-gray-800">
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6">
              <Button onClick={() => setShowFilters(!showFilters)} className="btn-outline flex items-center space-x-2">
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
              </Button>
            </div>

            {/* Active Filters */}
            {(selectedCategory !== "All" || selectedPriceRange !== "All" || selectedRating !== "All") && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {selectedCategory !== "All" && (
                    <Badge variant="outline" className="border-white/30 text-white flex items-center space-x-1">
                      <span>{selectedCategory}</span>
                      <button onClick={() => setSelectedCategory("All")} className="ml-1 hover:text-red-400">
                        ×
                      </button>
                    </Badge>
                  )}
                  {selectedPriceRange !== "All" && (
                    <Badge variant="outline" className="border-white/30 text-white flex items-center space-x-1">
                      <span>{selectedPriceRange}</span>
                      <button onClick={() => setSelectedPriceRange("All")} className="ml-1 hover:text-red-400">
                        ×
                      </button>
                    </Badge>
                  )}
                  {selectedRating !== "All" && (
                    <Badge variant="outline" className="border-white/30 text-white flex items-center space-x-1">
                      <span>{selectedRating} Stars</span>
                      <button onClick={() => setSelectedRating("All")} className="ml-1 hover:text-red-400">
                        ×
                      </button>
                    </Badge>
                  )}
                </div>
              </motion.div>
            )}

            {/* Results */}
            {filteredBusinesses.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}
              >
                {filteredBusinesses.map((business, index) => (
                  <motion.div
                    key={business.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <BusinessCard business={business} variant={viewMode === "list" ? "compact" : "default"} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
                <Card className="card-glass border-2 border-white/20 max-w-md mx-auto">
                  <CardContent className="p-12">
                    <Search className="w-16 h-16 text-white/40 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-white mb-4">No Results Found</h3>
                    <p className="text-white/70 mb-6">
                      We couldn't find any businesses matching your criteria. Try adjusting your filters or search
                      terms.
                    </p>
                    <Button
                      onClick={() => {
                        setSearchQuery("")
                        setSelectedCategory("All")
                        setSelectedPriceRange("All")
                        setSelectedRating("All")
                      }}
                      className="btn-primary"
                    >
                      Clear All Filters
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
