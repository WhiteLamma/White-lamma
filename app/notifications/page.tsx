"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/providers/auth-provider"
import { useToast } from "@/components/ui/toast-provider"
import { Bell, Star, Heart, MessageCircle, Gift, Calendar, Trash2, Check, Settings, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const notificationTypes = [
  { id: "all", label: "All", icon: Bell, count: 15 },
  { id: "reviews", label: "Reviews", icon: Star, count: 5 },
  { id: "likes", label: "Likes", icon: Heart, count: 3 },
  { id: "comments", label: "Comments", icon: MessageCircle, count: 2 },
  { id: "offers", label: "Offers", icon: Gift, count: 4 },
  { id: "updates", label: "Updates", icon: TrendingUp, count: 1 },
]

const mockNotifications = [
  {
    id: "1",
    type: "reviews",
    title: "New review on your favorite business",
    message: "Priya Sharma left a 5-star review for Sharma Ji Ka Dhaba",
    timestamp: "2 minutes ago",
    isRead: false,
    avatar: "/placeholder.svg",
    actionUrl: "/business/1",
    priority: "high",
    category: "review",
  },
  {
    id: "2",
    type: "likes",
    title: "Your review got liked!",
    message: "5 people liked your review of Chai Tapri",
    timestamp: "1 hour ago",
    isRead: false,
    avatar: "/placeholder.svg",
    actionUrl: "/reviews/my-reviews",
    priority: "medium",
    category: "engagement",
  },
  {
    id: "3",
    type: "offers",
    title: "Special offer near you!",
    message: "Gold's Gym is offering 50% off on annual membership",
    timestamp: "3 hours ago",
    isRead: true,
    avatar: "/placeholder.svg",
    actionUrl: "/business/3",
    priority: "high",
    category: "promotion",
    expiresAt: "2024-02-20",
  },
  {
    id: "4",
    type: "comments",
    title: "Someone replied to your review",
    message: "Business owner responded to your review at Lakme Salon",
    timestamp: "1 day ago",
    isRead: true,
    avatar: "/placeholder.svg",
    actionUrl: "/business/4",
    priority: "medium",
    category: "interaction",
  },
  {
    id: "5",
    type: "updates",
    title: "Business hours updated",
    message: "Sharma Ji Ka Dhaba updated their opening hours",
    timestamp: "2 days ago",
    isRead: true,
    avatar: "/placeholder.svg",
    actionUrl: "/business/1",
    priority: "low",
    category: "update",
  },
  {
    id: "6",
    type: "reviews",
    title: "Weekly review summary",
    message: "You've written 3 reviews this week. Keep sharing your experiences!",
    timestamp: "3 days ago",
    isRead: true,
    avatar: "/placeholder.svg",
    actionUrl: "/dashboard/user",
    priority: "low",
    category: "summary",
  },
  {
    id: "7",
    type: "offers",
    title: "Flash sale alert!",
    message: "Your wishlist item Chai Tapri is having a flash sale - 30% off",
    timestamp: "1 week ago",
    isRead: true,
    avatar: "/placeholder.svg",
    actionUrl: "/business/2",
    priority: "high",
    category: "promotion",
    expiresAt: "2024-02-15",
  },
]

export default function NotificationsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [notifications, setNotifications] = useState(mockNotifications)
  const [selectedType, setSelectedType] = useState("all")
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([])
  const [showOnlyUnread, setShowOnlyUnread] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const filteredNotifications = notifications.filter((notification) => {
    const matchesType = selectedType === "all" || notification.type === selectedType
    const matchesReadStatus = !showOnlyUnread || !notification.isRead
    return matchesType && matchesReadStatus
  })

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId ? { ...notification, isRead: true } : notification,
      ),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })))
    toast({
      title: "All notifications marked as read",
      type: "success",
    })
  }

  const deleteNotification = (notificationId: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId))
    toast({
      title: "Notification deleted",
      type: "success",
    })
  }

  const deleteSelected = () => {
    setNotifications((prev) => prev.filter((n) => !selectedNotifications.includes(n.id)))
    setSelectedNotifications([])
    toast({
      title: `${selectedNotifications.length} notifications deleted`,
      type: "success",
    })
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "reviews":
        return <Star className="w-5 h-5 text-yellow-500" />
      case "likes":
        return <Heart className="w-5 h-5 text-red-500" />
      case "comments":
        return <MessageCircle className="w-5 h-5 text-blue-500" />
      case "offers":
        return <Gift className="w-5 h-5 text-green-500" />
      case "updates":
        return <TrendingUp className="w-5 h-5 text-purple-500" />
      default:
        return <Bell className="w-5 h-5 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-50"
      case "medium":
        return "border-l-yellow-500 bg-yellow-50"
      case "low":
        return "border-l-gray-500 bg-gray-50"
      default:
        return "border-l-gray-300 bg-white"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center">
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Bell className="w-10 h-10 text-indigo-600 mr-4" />
                </motion.div>
                Notifications
              </h1>
              <p className="text-lg text-gray-600">
                {unreadCount > 0 ? `${unreadCount} unread notifications` : "You're all caught up!"}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {selectedNotifications.length > 0 && (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={deleteSelected}
                    className="flex items-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete ({selectedNotifications.length})</span>
                  </Button>
                </motion.div>
              )}

              {unreadCount > 0 && (
                <Button
                  variant="outline"
                  onClick={markAllAsRead}
                  className="flex items-center space-x-2 border-indigo-200 hover:border-indigo-400"
                >
                  <Check className="w-4 h-4" />
                  <span>Mark all read</span>
                </Button>
              )}

              <Button
                variant="outline"
                className="flex items-center space-x-2 border-indigo-200 hover:border-indigo-400"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="glass">
              <CardContent className="p-4 text-center">
                <Bell className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                <p className="text-xl font-bold text-gray-900">{notifications.length}</p>
                <p className="text-sm text-gray-600">Total</p>
              </CardContent>
            </Card>
            <Card className="glass">
              <CardContent className="p-4 text-center">
                <div className="w-6 h-6 bg-red-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{unreadCount}</span>
                </div>
                <p className="text-xl font-bold text-gray-900">{unreadCount}</p>
                <p className="text-sm text-gray-600">Unread</p>
              </CardContent>
            </Card>
            <Card className="glass">
              <CardContent className="p-4 text-center">
                <Gift className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <p className="text-xl font-bold text-gray-900">
                  {notifications.filter((n) => n.type === "offers").length}
                </p>
                <p className="text-sm text-gray-600">Offers</p>
              </CardContent>
            </Card>
            <Card className="glass">
              <CardContent className="p-4 text-center">
                <Star className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                <p className="text-xl font-bold text-gray-900">
                  {notifications.filter((n) => n.type === "reviews").length}
                </p>
                <p className="text-sm text-gray-600">Reviews</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            {notificationTypes.map((type) => (
              <motion.button
                key={type.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedType(type.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                  selectedType === type.id
                    ? "gradient-denim text-white shadow-lg"
                    : "bg-white border-2 border-indigo-200 hover:border-indigo-400 text-gray-700"
                }`}
              >
                <type.icon className="w-4 h-4" />
                <span>{type.label}</span>
                {type.count > 0 && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {type.count}
                  </Badge>
                )}
              </motion.button>
            ))}
          </div>

          {/* Toggle for unread only */}
          <div className="flex items-center space-x-2 mb-6">
            <input
              type="checkbox"
              id="unread-only"
              checked={showOnlyUnread}
              onChange={(e) => setShowOnlyUnread(e.target.checked)}
              className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="unread-only" className="text-sm text-gray-700">
              Show only unread notifications
            </label>
          </div>
        </motion.div>

        {/* Notifications List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <Card
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-l-4 ${
                      notification.isRead ? getPriorityColor(notification.priority) : "border-l-indigo-500 bg-indigo-50"
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        {/* Selection Checkbox */}
                        <input
                          type="checkbox"
                          checked={selectedNotifications.includes(notification.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedNotifications((prev) => [...prev, notification.id])
                            } else {
                              setSelectedNotifications((prev) => prev.filter((id) => id !== notification.id))
                            }
                          }}
                          className="mt-1 w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                        />

                        {/* Notification Icon */}
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                            {getNotificationIcon(notification.type)}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3
                                className={`text-lg font-semibold ${
                                  notification.isRead ? "text-gray-700" : "text-gray-900"
                                }`}
                              >
                                {notification.title}
                              </h3>
                              <p className={`mt-1 ${notification.isRead ? "text-gray-500" : "text-gray-700"}`}>
                                {notification.message}
                              </p>

                              {/* Expiry for offers */}
                              {notification.expiresAt && (
                                <div className="mt-2">
                                  <Badge variant="outline" className="text-xs text-orange-600 border-orange-300">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    Expires {new Date(notification.expiresAt).toLocaleDateString()}
                                  </Badge>
                                </div>
                              )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center space-x-2 ml-4">
                              {!notification.isRead && (
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    markAsRead(notification.id)
                                  }}
                                  className="p-1 text-indigo-600 hover:bg-indigo-100 rounded-full transition-colors"
                                  title="Mark as read"
                                >
                                  <Check className="w-4 h-4" />
                                </motion.button>
                              )}

                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  deleteNotification(notification.id)
                                }}
                                className="p-1 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </div>

                          {/* Timestamp and Action */}
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-sm text-gray-500">{notification.timestamp}</span>

                            {notification.actionUrl && (
                              <Link href={notification.actionUrl}>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-xs border-indigo-200 hover:border-indigo-400"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  View Details
                                </Button>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Bell className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {showOnlyUnread ? "No unread notifications" : "No notifications found"}
                </h3>
                <p className="text-gray-600 mb-8">
                  {showOnlyUnread
                    ? "You're all caught up! Check back later for new updates."
                    : "Try adjusting your filters or check back later for new notifications."}
                </p>
                {showOnlyUnread && (
                  <Button onClick={() => setShowOnlyUnread(false)} className="gradient-denim">
                    Show All Notifications
                  </Button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Load More */}
        {filteredNotifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8"
          >
            <Button variant="outline" size="lg" className="border-2 border-indigo-200 hover:border-indigo-400">
              Load More Notifications
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
