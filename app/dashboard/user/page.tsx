"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/layout/navbar"
import { BusinessCard } from "@/components/ui/business-card"
import { ReviewTile } from "@/components/ui/review-tile"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/components/providers/auth-provider"
import { useToast } from "@/components/ui/toast-provider"
import {
  User,
  Heart,
  Star,
  MessageCircle,
  Award,
  MapPin,
  Edit,
  Settings,
  TrendingUp,
  Eye,
  ThumbsUp,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

// Mock data
const mockUserStats = {
  totalReviews: 47,
  totalLikes: 234,
  totalViews: 1567,
  eliteStatus: true,
  joinDate: "January 2023",
  level: "Elite Reviewer",
}

const mockFavorites = [
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
  },
]

const mockUserReviews = [
  {
    id: "1",
    user: {
      name: "Rahul Sharma",
      avatar: "/placeholder.svg",
      reviewCount: 47,
      isElite: true,
    },
    businessName: "Sharma Ji Ka Dhaba",
    rating: 5,
    date: "2 days ago",
    text: "Absolutely amazing experience! The butter chicken here is to die for. The ambiance is perfect for family dinners and the staff is super friendly.",
    images: ["/placeholder.svg?height=80&width=80"],
    likes: 23,
    dislikes: 1,
    replies: 5,
    isHelpful: true,
    tags: ["Great Food", "Family Friendly"],
  },
]

export default function UserDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    if (!user || user.role !== "user") {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "reviews", label: "My Reviews", icon: MessageCircle },
    { id: "favorites", label: "Favorites", icon: Heart },
    { id: "profile", label: "Profile", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center space-x-6 mb-6">
            <Avatar className="w-24 h-24 ring-4 ring-orange-200">
              <AvatarImage src={user.avatar || "/placeholder.svg"} />
              <AvatarFallback className="gradient-saffron text-white text-2xl">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name.split(" ")[0]}! 👋</h1>
              <div className="flex items-center space-x-4">
                <Badge className="gradient-saffron text-white">
                  <Award className="w-4 h-4 mr-1" />
                  {mockUserStats.level}
                </Badge>
                <span className="text-gray-600">Member since {mockUserStats.joinDate}</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div whileHover={{ y: -2 }}>
              <Card>
                <CardContent className="p-6 text-center">
                  <MessageCircle className="w-8 h-8 gradient-saffron rounded-full p-2 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{mockUserStats.totalReviews}</p>
                  <p className="text-gray-600">Reviews Written</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ y: -2 }}>
              <Card>
                <CardContent className="p-6 text-center">
                  <ThumbsUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{mockUserStats.totalLikes}</p>
                  <p className="text-gray-600">Likes Received</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ y: -2 }}>
              <Card>
                <CardContent className="p-6 text-center">
                  <Eye className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{mockUserStats.totalViews}</p>
                  <p className="text-gray-600">Profile Views</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ y: -2 }}>
              <Card>
                <CardContent className="p-6 text-center">
                  <Heart className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{mockFavorites.length}</p>
                  <p className="text-gray-600">Favorites</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                  activeTab === tab.id ? "gradient-saffron text-black shadow-md" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <div>
                        <p className="font-medium">You reviewed Sharma Ji Ka Dhaba</p>
                        <p className="text-sm text-gray-600">2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <Heart className="w-5 h-5 text-red-500" />
                      <div>
                        <p className="font-medium">Added Chai Tapri to favorites</p>
                        <p className="text-sm text-gray-600">1 week ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                      <Award className="w-5 h-5 text-orange-500" />
                      <div>
                        <p className="font-medium">Achieved Elite status!</p>
                        <p className="text-sm text-gray-600">2 weeks ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
             
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">My Reviews ({mockUserStats.totalReviews})</h2>
              
              </div>

              {mockUserReviews.map((review) => (
                <div key={review.id} className="relative">
                  
                  <ReviewTile review={review} />
                </div>
              ))}
            </div>
          )}

          {activeTab === "favorites" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">My Favorites ({mockFavorites.length})</h2>
                <Button variant="outline">
                  <Heart className="w-4 h-4 mr-2" />
                  Manage Favorites
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockFavorites.map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        defaultValue={user.name}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue={user.email}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Location</label>
                      <input
                        type="text"
                        placeholder="New Delhi, India"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Bio</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about yourself..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button variant="outline">Cancel</Button>
                    <Button className="gradient-saffron">Save Changes</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  )
}
