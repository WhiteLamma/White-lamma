"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/components/providers/auth-provider"
import { useToast } from "@/components/ui/toast-provider"
import {
  Shield,
  Users,
  Store,
  MessageCircle,
  Flag,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Ban,
  Trash2,
  Search,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock admin data
const mockAdminStats = {
  totalUsers: 50234,
  totalBusinesses: 25678,
  totalReviews: 125890,
  pendingReports: 47,
  activeUsers: 12456,
  newSignups: 234,
  revenueThisMonth: 125000,
  growthRate: 15.2,
}

const mockRecentUsers = [
  {
    id: "1",
    name: "Rahul Sharma",
    email: "rahul@example.com",
    joinDate: "2024-01-15",
    status: "active",
    reviewCount: 23,
    isElite: true,
  },
  {
    id: "2",
    name: "Priya Singh",
    email: "priya@example.com",
    joinDate: "2024-01-14",
    status: "active",
    reviewCount: 45,
    isElite: false,
  },
]

const mockRecentBusinesses = [
  {
    id: "1",
    name: "Sharma Ji Ka Dhaba",
    owner: "Sharma Ji",
    category: "Restaurant",
    status: "verified",
    rating: 4.8,
    reviewCount: 1247,
    joinDate: "2024-01-10",
  },
  {
    id: "2",
    name: "Modern Gym",
    owner: "Fitness Corp",
    category: "Gym",
    status: "pending",
    rating: 4.2,
    reviewCount: 89,
    joinDate: "2024-01-12",
  },
]

const mockReports = [
  {
    id: "1",
    type: "review",
    reporter: "User123",
    reported: "Fake Review on Sharma Dhaba",
    reason: "Spam/Fake content",
    date: "2024-01-15",
    status: "pending",
    severity: "medium",
  },
  {
    id: "2",
    type: "business",
    reporter: "User456",
    reported: "Fake Business Listing",
    reason: "Fraudulent business",
    date: "2024-01-14",
    status: "pending",
    severity: "high",
  },
]

export default function AdminDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "users", label: "Users", icon: Users },
    { id: "businesses", label: "Businesses", icon: Store },
    { id: "reviews", label: "Reviews", icon: MessageCircle },
    { id: "reports", label: "Reports", icon: Flag },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
  ]

  const handleUserAction = (userId: string, action: string) => {
    toast({
      title: `User ${action}`,
      description: `User has been ${action.toLowerCase()} successfully.`,
    })
  }

  const handleBusinessAction = (businessId: string, action: string) => {
    toast({
      title: `Business ${action}`,
      description: `Business has been ${action.toLowerCase()} successfully.`,
    })
  }

  const handleReportAction = (reportId: string, action: string) => {
    toast({
      title: `Report ${action}`,
      description: `Report has been ${action.toLowerCase()} successfully.`,
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard 🛡️</h1>
              <p className="text-gray-600">Manage users, businesses, and platform health</p>
            </div>
            <Badge className="gradient-saffron text-white">
              <Shield className="w-4 h-4 mr-1" />
              Super Admin
            </Badge>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div whileHover={{ y: -2 }}>
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{mockAdminStats.totalUsers.toLocaleString()}</p>
                  <p className="text-gray-600">Total Users</p>
                  <p className="text-sm text-green-600 mt-1">+{mockAdminStats.newSignups} today</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ y: -2 }}>
              <Card>
                <CardContent className="p-6 text-center">
                  <Store className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{mockAdminStats.totalBusinesses.toLocaleString()}</p>
                  <p className="text-gray-600">Total Businesses</p>
                  <p className="text-sm text-blue-600 mt-1">12 pending approval</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ y: -2 }}>
              <Card>
                <CardContent className="p-6 text-center">
                  <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{mockAdminStats.totalReviews.toLocaleString()}</p>
                  <p className="text-gray-600">Total Reviews</p>
                  <p className="text-sm text-orange-600 mt-1">89 flagged</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ y: -2 }}>
              <Card>
                <CardContent className="p-6 text-center">
                  <Flag className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{mockAdminStats.pendingReports}</p>
                  <p className="text-gray-600">Pending Reports</p>
                  <p className="text-sm text-red-600 mt-1">Needs attention</p>
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
              {/* Platform Health */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Platform Health
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>System Status</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Users className="w-5 h-5 text-blue-600" />
                        <span>Active Users</span>
                      </div>
                      <span className="font-semibold">{mockAdminStats.activeUsers.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-5 h-5 text-orange-600" />
                        <span>Issues Pending</span>
                      </div>
                      <span className="font-semibold">{mockAdminStats.pendingReports}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="gradient-saffron h-16 flex-col">
                      <Flag className="w-6 h-6 mb-1" />
                      Review Reports
                    </Button>
                    <Button variant="outline" className="h-16 flex-col">
                      <Store className="w-6 h-6 mb-1" />
                      Approve Businesses
                    </Button>
                    <Button variant="outline" className="h-16 flex-col">
                      <Users className="w-6 h-6 mb-1" />
                      Manage Users
                    </Button>
                    <Button variant="outline" className="h-16 flex-col">
                      <BarChart3 className="w-6 h-6 mb-1" />
                      View Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-6">
              {/* Search and Filters */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="Search users by name, email..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="banned">Banned</SelectItem>
                        <SelectItem value="elite">Elite Users</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Users List */}
              <Card>
                <CardHeader>
                  <CardTitle>Users ({mockAdminStats.totalUsers.toLocaleString()})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockRecentUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">{user.name}</h4>
                            <p className="text-sm text-gray-600">{user.email}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant={user.status === "active" ? "default" : "destructive"}>
                                {user.status}
                              </Badge>
                              {user.isElite && <Badge className="gradient-saffron text-white">Elite</Badge>}
                              <span className="text-xs text-gray-500">{user.reviewCount} reviews</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleUserAction(user.id, "Suspended")}>
                            <Ban className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleUserAction(user.id, "Deleted")}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "businesses" && (
            <div className="space-y-6">
              {/* Search and Filters */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input placeholder="Search businesses..." className="pl-10" />
                      </div>
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Businesses</SelectItem>
                        <SelectItem value="verified">Verified</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Businesses List */}
              <Card>
                <CardHeader>
                  <CardTitle>Businesses ({mockAdminStats.totalBusinesses.toLocaleString()})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockRecentBusinesses.map((business) => (
                      <div
                        key={business.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                            <Store className="w-6 h-6 text-gray-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{business.name}</h4>
                            <p className="text-sm text-gray-600">Owner: {business.owner}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant={business.status === "verified" ? "default" : "secondary"}>
                                {business.status}
                              </Badge>
                              <span className="text-xs text-gray-500">{business.category}</span>
                              <span className="text-xs text-gray-500">★ {business.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {business.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleBusinessAction(business.id, "Approved")}
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleBusinessAction(business.id, "Rejected")}
                              >
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "reports" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Abuse Reports ({mockAdminStats.pendingReports})</span>
                    <Badge variant="destructive">Urgent</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockReports.map((report) => (
                      <div key={report.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">{report.reported}</h4>
                            <p className="text-sm text-gray-600">Reported by: {report.reporter}</p>
                            <p className="text-sm text-gray-600">Reason: {report.reason}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={report.severity === "high" ? "destructive" : "secondary"}>
                              {report.severity}
                            </Badge>
                            <Badge variant="outline">{report.type}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{report.date}</span>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleReportAction(report.id, "Investigated")}
                            >
                              Investigate
                            </Button>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleReportAction(report.id, "Resolved")}
                            >
                              Resolve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleReportAction(report.id, "Dismissed")}
                            >
                              Dismiss
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Revenue Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <p className="text-gray-600">Revenue Chart Coming Soon</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">
                        ₹{mockAdminStats.revenueThisMonth.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">This Month</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">+{mockAdminStats.growthRate}%</p>
                      <p className="text-sm text-gray-600">Growth Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* User Growth */}
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <p className="text-gray-600">User Growth Chart Coming Soon</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">{mockAdminStats.newSignups}</p>
                      <p className="text-sm text-gray-600">New Today</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-600">
                        {mockAdminStats.activeUsers.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">Active Users</p>
                    </div>
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
