"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/layout/navbar"
import { BusinessCard } from "@/components/ui/business-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/providers/auth-provider"
import { useToast } from "@/components/ui/toast-provider"
import { Heart, Star, MapPin, Grid, List, Share2, Download, Trash2, Search, Calendar, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const mockWishlistItems = [
  {
    id: "1",
    name: "Sharma Ji Ka Dhaba",
    category: "Dhaba",
    rating: 4.8,
    reviewCount: 1247,
    priceRange: "₹₹",
    address: "Connaught Place, New Delhi",
    distance: "0.8 km",
    isOpen: true,
    openUntil: "11:00 PM",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Authentic", "Family-friendly", "Parking"],
    isFavorited: true,
    hasDelivery: true,
    isPromoted: true,
    addedDate: "2024-01-15",
    notes: "Must try their butter chicken!",
  },
  {
    id: "2",
    name: "Chai Tapri",
    category: "Cafe",
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
    addedDate: "2024-01-20",
    notes: "Perfect for late night study sessions",
  },
  {
    id: "3",
    name: "Gold's Gym",
    category: "Gym",
    rating: 4.4,
    reviewCount: 567,
    priceRange: "₹₹₹",
    address: "Rajouri Garden, New Delhi",
    distance: "2.1 km",
    isOpen: true,
    openUntil: "10:00 PM",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Modern Equipment", "Personal Training", "AC"],
    isFavorited: true,
    hasDelivery: false,
    isPromoted: false,
    addedDate: "2024-01-25",
    notes: "Great equipment and trainers",
  },
]

export default function WishlistPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("recent")
  const [filterCategory, setFilterCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const filteredItems = wishlistItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = filterCategory === "all" || item.category.toLowerCase() === filterCategory.toLowerCase()

    return matchesSearch && matchesCategory
  })

  const removeFromWishlist = (itemId: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== itemId))
    toast({
      title: "Removed from Wishlist",
      description: "Business removed from your wishlist",
      type: "success",
    })
  }

  const removeSelectedItems = () => {
    setWishlistItems((prev) => prev.filter((item) => !selectedItems.includes(item.id)))
    setSelectedItems([])
    toast({
      title: "Items Removed",
      description: `${selectedItems.length} items removed from wishlist`,
      type: "success",
    })
  }

  const shareWishlist = () => {
    toast({
      title: "Wishlist Shared! 🎉",
      description: "Your wishlist link has been copied to clipboard",
      type: "success",
    })
  }

  const exportWishlist = () => {
    toast({
      title: "Wishlist Exported! 📄",
      description: "Your wishlist has been downloaded as PDF",
      type: "success",
    })
  }

  const categories = ["all", "dhaba", "cafe", "gym", "salon", "shopping"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Heart className="w-10 h-10 text-red-500 mr-4 fill-current" />
                </motion.div>
                My Wishlist
              </h1>
              <p className="text-lg text-gray-600">{filteredItems.length} businesses you want to visit</p>
            </div>

            <div className="flex items-center space-x-4">
              {selectedItems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center space-x-2"
                >
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={removeSelectedItems}
                    className="flex items-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Remove ({selectedItems.length})</span>
                  </Button>
                </motion.div>
              )}

              <Button
                variant="outline"
                onClick={shareWishlist}
                className="flex items-center space-x-2 border-pink-200 hover:border-pink-400"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </Button>

              <Button
                variant="outline"
                onClick={exportWishlist}
                className="flex items-center space-x-2 border-pink-200 hover:border-pink-400"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div whileHover={{ y: -2 }}>
              <Card className="glass-flamingo">
                <CardContent className="p-6 text-center">
                  <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{wishlistItems.length}</p>
                  <p className="text-gray-600">Total Saved</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ y: -2 }}>
              <Card className="glass-denim">
                <CardContent className="p-6 text-center">
                  <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">
                    {(wishlistItems.reduce((acc, item) => acc + item.rating, 0) / wishlistItems.length).toFixed(1)}
                  </p>
                  <p className="text-gray-600">Avg Rating</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ y: -2 }}>
              <Card className="glass">
                <CardContent className="p-6 text-center">
                  <MapPin className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">
                    {new Set(wishlistItems.map((item) => item.category)).size}
                  </p>
                  <p className="text-gray-600">Categories</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ y: -2 }}>
              <Card className="glass">
                <CardContent className="p-6 text-center">
                  <Calendar className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">
                    {wishlistItems.filter((item) => item.isOpen).length}
                  </p>
                  <p className="text-gray-600">Open Now</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search your wishlist..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-pink-200 focus:border-pink-400 rounded-full focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Category Filter */}
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border-2 border-pink-200 rounded-lg focus:border-pink-400 focus:outline-none"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border-2 border-pink-200 rounded-lg focus:border-pink-400 focus:outline-none"
              >
                <option value="recent">Recently Added</option>
                <option value="rating">Highest Rated</option>
                <option value="distance">Nearest First</option>
                <option value="name">Name A-Z</option>
              </select>

              {/* View Toggle */}
              <div className="flex items-center bg-white rounded-lg border-2 border-pink-200 p-1">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid" ? "gradient-flamingo text-white" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list" ? "gradient-flamingo text-white" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <List className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Wishlist Items */}
        <AnimatePresence mode="wait">
          {filteredItems.length > 0 ? (
            <motion.div
              key={`${viewMode}-${filterCategory}-${searchQuery}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="relative group"
                >
                  {/* Selection Checkbox */}
                  <div className="absolute top-4 left-4 z-20">
                    <motion.input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedItems((prev) => [...prev, item.id])
                        } else {
                          setSelectedItems((prev) => prev.filter((id) => id !== item.id))
                        }
                      }}
                      className="w-5 h-5 text-pink-600 bg-white border-2 border-pink-300 rounded focus:ring-pink-500 focus:ring-2"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  </div>

                  {/* Remove Button */}
                  <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFromWishlist(item.id)}
                      className="p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>

                  {/* Added Date Badge */}
                  <div className="absolute bottom-4 right-4 z-20">
                    <Badge className="bg-white/90 text-gray-700 flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(item.addedDate).toLocaleDateString()}</span>
                    </Badge>
                  </div>

                  <BusinessCard business={item} variant={viewMode === "list" ? "compact" : "default"} />

                  {/* Notes */}
                  {item.notes && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-2 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg"
                    >
                      <p className="text-sm text-yellow-800 italic">
                        <strong>Note:</strong> {item.notes}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {searchQuery || filterCategory !== "all" ? "No matches found" : "Your wishlist is empty"}
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {searchQuery || filterCategory !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Start exploring and save businesses you'd like to visit later"}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {searchQuery || filterCategory !== "all" ? (
                  <Button
                    onClick={() => {
                      setSearchQuery("")
                      setFilterCategory("all")
                    }}
                    className="gradient-flamingo"
                  >
                    Clear Filters
                  </Button>
                ) : (
                  <>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link href="/search">
                        <Button className="gradient-flamingo">Discover Businesses</Button>
                      </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link href="/categories">
                        <Button variant="outline" className="border-pink-200 hover:border-pink-400">
                          Browse Categories
                        </Button>
                      </Link>
                    </motion.div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Actions */}
        {filteredItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <Card className="gradient-aesthetic p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Visit?</h3>
              <p className="text-white/90 mb-6">Plan your perfect day out with businesses from your wishlist</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                    Plan Route
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-purple-600"
                  >
                    Share with Friends
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
