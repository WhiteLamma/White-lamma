"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/components/providers/auth-provider"
import { useToast } from "@/components/ui/toast-provider"
import {
  Store,
  Star,
  Users,
  TrendingUp,
  MessageCircle,
  Eye,
  Edit,
  Plus,
  BarChart3,
  Settings,
  Camera,
  MapPin,
  Phone,
  Globe,
  Reply,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock business data
const mockBusinessData = {
  id: "1",
  name: "Sharma Ji Ka Dhaba",
  category: "Restaurant",
  rating: 4.8,
  reviewCount: 1247,
  totalViews: 15670,
  totalClicks: 892,
  description:
    "Authentic North Indian cuisine served with love and tradition. Famous for our butter chicken, dal makhani, and fresh naan bread.",
  address: "123 Connaught Place, New Delhi, 110001",
  phone: "+91 98765 43210",
  website: "www.sharmajikdhaba.com",
  hours: {
    monday: "10:00 AM - 11:00 PM",
    tuesday: "10:00 AM - 11:00 PM",
    wednesday: "10:00 AM - 11:00 PM",
    thursday: "10:00 AM - 11:00 PM",
    friday: "10:00 AM - 12:00 AM",
    saturday: "10:00 AM - 12:00 AM",
    sunday: "10:00 AM - 11:00 PM",
  },
  images: ["/placeholder.svg?height=200&width=300"],
  isVerified: true,
  isPremium: false,
}

const mockRecentReviews = [
  {
    id: "1",
    user: "Priya Sharma",
    rating: 5,
    date: "2 days ago",
    text: "Absolutely amazing experience! The butter chicken here is to die for.",
    hasResponse: false,
  },
  {
    id: "2",
    user: "Amit Kumar",
    rating: 4,
    date: "1 week ago",
    text: "Good food and reasonable prices. Service could be faster.",
    hasResponse: true,
    response: "Thank you for your feedback! We're working on improving our service speed.",
  },
]

export default function BusinessDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")
  const [businessData, setBusinessData] = useState(mockBusinessData)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (!user || user.role !== "business") {
      router.push("/business/login")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "business", label: "Business Info", icon: Store },
    { id: "reviews", label: "Reviews", icon: MessageCircle },
    { id: "promote", label: "Promote", icon: TrendingUp },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const handleSaveBusinessInfo = () => {
    setIsEditing(false)
    toast({
      title: "Business Updated! 🎉",
      description: "Your business information has been updated successfully.",
    })
  }

  const handleReviewResponse = (reviewId: string, response: string) => {
    toast({
      title: "Response Posted! 💬",
      description: "Your response has been posted to the review.",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Dashboard 🏪</h1>
              <div className="flex items-center space-x-4">
                <Badge className="gradient-saffron text-white">
                  <Store className="w-4 h-4 mr-1" />
                  {businessData.isVerified ? "Verified Business" : "Unverified"}
                </Badge>
                {businessData.isPremium && <Badge className="bg-purple-500 text-white">Premium</Badge>}
              </div>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-semibold">{businessData.name}</h2>
              <p className="text-gray-600">{businessData.category}</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div whileHover={{ y: -2 }}>
              <Card>
                <CardContent className="p-6 text-center">
                  <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{businessData.rating}</p>
                  <p className="text-gray-600">Average Rating</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ y: -2 }}>
              <Card>
                <CardContent className="p-6 text-center">
                  <MessageCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{businessData.reviewCount}</p>
                  <p className="text-gray-600">Total Reviews</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ y: -2 }}>
              <Card>
                <CardContent className="p-6 text-center">
                  <Eye className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{businessData.totalViews}</p>
                  <p className="text-gray-600">Profile Views</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ y: -2 }}>
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{businessData.totalClicks}</p>
                  <p className="text-gray-600">Contact Clicks</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm overflow-x-auto">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all whitespace-nowrap ${
                  activeTab === tab.id ? "gradient-saffron text-white shadow-md" : "text-gray-600 hover:bg-gray-100"
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
              {/* Performance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Performance Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <p className="text-gray-600">Analytics Chart Coming Soon</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">+15%</p>
                      <p className="text-sm text-gray-600">Views This Month</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">+8%</p>
                      <p className="text-sm text-gray-600">Reviews This Month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <div>
                        <p className="font-medium">New 5-star review received</p>
                        <p className="text-sm text-gray-600">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <Eye className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Profile viewed 45 times</p>
                        <p className="text-sm text-gray-600">Today</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                      <Users className="w-5 h-5 text-orange-500" />
                      <div>
                        <p className="font-medium">12 people called your business</p>
                        <p className="text-sm text-gray-600">This week</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "business" && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Business Information</CardTitle>
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant={isEditing ? "outline" : "default"}
                    className={!isEditing ? "gradient-saffron" : ""}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? "Cancel" : "Edit Info"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Business Name</label>
                      <Input
                        value={businessData.name}
                        onChange={(e) => setBusinessData({ ...businessData, name: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <Select value={businessData.category} disabled={!isEditing}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Restaurant">Restaurant</SelectItem>
                          <SelectItem value="Cafe">Cafe</SelectItem>
                          <SelectItem value="Dhaba">Dhaba</SelectItem>
                          <SelectItem value="Gym">Gym</SelectItem>
                          <SelectItem value="Salon">Salon</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <Textarea
                      value={businessData.description}
                      onChange={(e) => setBusinessData({ ...businessData, description: e.target.value })}
                      disabled={!isEditing}
                      rows={4}
                    />
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          value={businessData.phone}
                          onChange={(e) => setBusinessData({ ...businessData, phone: e.target.value })}
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Website</label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          value={businessData.website}
                          onChange={(e) => setBusinessData({ ...businessData, website: e.target.value })}
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                      <Textarea
                        value={businessData.address}
                        onChange={(e) => setBusinessData({ ...businessData, address: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10"
                        rows={2}
                      />
                    </div>
                  </div>

                  {/* Hours */}
                  <div>
                    <label className="block text-sm font-medium mb-4">Business Hours</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(businessData.hours).map(([day, hours]) => (
                        <div key={day} className="flex items-center space-x-3">
                          <span className="capitalize font-medium w-20">{day}:</span>
                          <Input
                            value={hours}
                            disabled={!isEditing}
                            className="flex-1"
                            placeholder="10:00 AM - 10:00 PM"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Images */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Business Photos</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {businessData.images.map((image, index) => (
                        <div key={index} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Business ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          {isEditing && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                              <Button size="sm" variant="secondary">
                                <Camera className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                      {isEditing && (
                        <div className="aspect-square bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                          <Button variant="ghost" className="flex-col">
                            <Plus className="w-6 h-6 mb-2" />
                            <span className="text-sm">Add Photo</span>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end space-x-4">
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveBusinessInfo} className="gradient-saffron">
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Customer Reviews ({businessData.reviewCount})</h2>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-yellow-100 text-yellow-800">
                    <Star className="w-4 h-4 mr-1" />
                    {businessData.rating} Average
                  </Badge>
                </div>
              </div>

              {mockRecentReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold">{review.user}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex">
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">{review.date}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{review.text}</p>

                    {review.hasResponse ? (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Reply className="w-4 h-4 text-blue-600" />
                          <span className="font-medium text-blue-900">Your Response</span>
                        </div>
                        <p className="text-blue-800">{review.response}</p>
                      </div>
                    ) : (
                      <div className="border-t pt-4">
                        <div className="flex items-start space-x-3">
                          <Textarea placeholder="Respond to this review..." rows={3} className="flex-1" />
                          <Button
                            onClick={() => handleReviewResponse(review.id, "Thank you for your feedback!")}
                            className="gradient-saffron"
                          >
                            <Reply className="w-4 h-4 mr-2" />
                            Reply
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeTab === "promote" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Promotion Options */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Boost Your Business
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-4 border border-orange-200 rounded-lg">
                      <h3 className="font-semibold text-lg mb-2">Premium Listing</h3>
                      <p className="text-gray-600 mb-4">
                        Get featured at the top of search results and category pages.
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-orange-600">₹999/month</span>
                        <Button className="gradient-saffron">Upgrade Now</Button>
                      </div>
                    </div>

                    <div className="p-4 border border-purple-200 rounded-lg">
                      <h3 className="font-semibold text-lg mb-2">Sponsored Ads</h3>
                      <p className="text-gray-600 mb-4">Appear in sponsored sections across the platform.</p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-purple-600">₹1999/month</span>
                        <Button variant="outline" className="border-purple-200">
                          Learn More
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 border border-green-200 rounded-lg">
                      <h3 className="font-semibold text-lg mb-2">Social Media Boost</h3>
                      <p className="text-gray-600 mb-4">Get featured on our social media channels.</p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-green-600">₹499/post</span>
                        <Button variant="outline" className="border-green-200">
                          Get Started
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Current Promotions */}
              <Card>
                <CardHeader>
                  <CardTitle>Active Promotions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Promotions</h3>
                    <p className="text-gray-600 mb-4">Start promoting your business to reach more customers!</p>
                    <Button className="gradient-saffron">Start Promoting</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Account Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Business Owner Name</label>
                      <Input defaultValue={user.name} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input defaultValue={user.email} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Password</label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                    <Button className="w-full gradient-saffron">Update Account</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Notification Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>New Reviews</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Customer Messages</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Promotion Updates</span>
                      <input type="checkbox" className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Weekly Reports</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <Button className="w-full gradient-saffron">Save Preferences</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
