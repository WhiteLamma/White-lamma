"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/layout/navbar"
import { ReviewTile } from "@/components/ui/review-tile"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/components/providers/auth-provider"
import { useToast } from "@/components/ui/toast-provider"
import {
  Star,
  MapPin,
  Clock,
  Phone,
  Globe,
  Heart,
  Share2,
  Utensils,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Mock business data
const mockBusiness = {
  id: "1",
  name: "Sharma Ji Ka Dhaba",
  category: "Dhaba",
  rating: 4.8,
  reviewCount: 1247,
  priceRange: "₹₹",
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
  isOpen: true,
  openUntil: "11:00 PM",
  images: [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ],
  description:
    "Authentic North Indian cuisine served with love and tradition. Famous for our butter chicken, dal makhani, and fresh naan bread. Family-owned since 1985.",
  amenities: ["WiFi", "Parking", "AC", "Card Payment", "Family Seating", "Takeaway"],
  tags: ["Authentic", "Family-friendly", "Parking", "Popular"],
  isFavorited: false,
  hasDelivery: true,
  isPromoted: true,
}

const mockReviews = [
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
  {
    id: "2",
    user: {
      name: "Amit Kumar",
      avatar: "/placeholder.svg",
      reviewCount: 23,
      isElite: false,
    },
    rating: 4,
    date: "1 week ago",
    text: "Good food and reasonable prices. The dal makhani was excellent. Service could be a bit faster during peak hours but overall a great experience.",
    images: [],
    likes: 12,
    dislikes: 0,
    replies: 2,
    isHelpful: false,
    tags: ["Good Value", "Tasty Food"],
  },
]

export default function BusinessDetailPage({ params }: { params: { id: string } }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorited, setIsFavorited] = useState(mockBusiness.isFavorited)
  const [showReviewDialog, setShowReviewDialog] = useState(false)
  const [reviewText, setReviewText] = useState("")
  const [reviewRating, setReviewRating] = useState(5)
  const { user } = useAuth()
  const { toast } = useToast()

  const handleFavorite = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to add businesses to favorites",
      })
      return
    }

    setIsFavorited(!isFavorited)
    toast({
      title: isFavorited ? "Removed from favorites" : "Added to favorites! ❤️",
      description: isFavorited ? "Business removed from your favorites" : "Business added to your favorites",
    })
  }

  const handleReviewSubmit = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to write a review",
      })
      return
    }

    if (!reviewText.trim()) {
      toast({
        title: "Review Required",
        description: "Please write a review before submitting",
      });
      return;
    }

    // Simulate review submission
    toast({
      title: "Review Submitted! 🎉",
      description: "Thank you for sharing your experience",
    });
    setShowReviewDialog(false);
    setReviewText("");
    setReviewRating(5);
  }

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return Array.from({ length: 5 }, (_, i) => (
      <motion.button
        key={i}
        whileHover={interactive ? { scale: 1.2 } : {}}
        whileTap={interactive ? { scale: 0.9 } : {}}
        onClick={() => interactive && onRatingChange && onRatingChange(i + 1)}
        disabled={!interactive}
        className={interactive ? "cursor-pointer" : "cursor-default"}
      >
        <Star
          className={`w-5 h-5 ${
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          } ${interactive ? "hover:text-yellow-400" : ""}`}
        />
      </motion.button>
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
          <Link href="/search">
            <Button variant="ghost" className="flex items-center space-x-2 hover:bg-orange-50">
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Search</span>
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative">
              <Card className="overflow-hidden">
                <div className="relative h-96">
                  <Image
                    src={mockBusiness.images[currentImageIndex] || "/placeholder.svg"}
                    alt={mockBusiness.name}
                    fill
                    className="object-cover"
                  />

                  {/* Image Navigation */}
                  {mockBusiness.images.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setCurrentImageIndex(
                            (prev) => (prev - 1 + mockBusiness.images.length) % mockBusiness.images.length,
                          )
                        }
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev + 1) % mockBusiness.images.length)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {mockBusiness.images.length}
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="rounded-full bg-white/90 hover:bg-white"
                        onClick={handleFavorite}
                      >
                        <Heart className={`w-4 h-4 ${isFavorited ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button size="sm" variant="secondary" className="rounded-full bg-white/90 hover:bg-white">
                        <Share2 className="w-4 h-4 text-gray-600" />
                      </Button>
                    </motion.div>
                  </div>
                </div>

                {/* Thumbnail Strip */}
                <div className="p-4 bg-white">
                  <div className="flex space-x-2 overflow-x-auto">
                    {mockBusiness.images.map((image, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                          index === currentImageIndex ? "border-orange-500" : "border-gray-200"
                        }`}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${mockBusiness.name} ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Business Info */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{mockBusiness.name}</h1>
                      <div className="flex items-center space-x-2 mb-2">
                        <Utensils className="w-5 h-5 text-gray-600" />
                        <span className="text-lg text-gray-600">{mockBusiness.category}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-lg font-medium text-green-600">{mockBusiness.priceRange}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {renderStars(mockBusiness.rating)}
                          <span className="font-semibold text-lg ml-2">{mockBusiness.rating}</span>
                        </div>
                        <span className="text-gray-600">({mockBusiness.reviewCount} reviews)</span>
                      </div>
                    </div>
                    {mockBusiness.isPromoted && <Badge className="gradient-saffron text-white">Promoted</Badge>}
                  </div>

                  <p className="text-gray-700 mb-6">{mockBusiness.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {mockBusiness.tags.map((tag, idx) => (
                      <Badge key={tag + idx} variant="outline" className="hover:bg-orange-50">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Amenities */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-3">Amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {mockBusiness.amenities.map((amenity, idx) => (
                        <div key={amenity + idx} className="flex items-center space-x-2 text-gray-700">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
                      <DialogTrigger asChild>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button className="gradient-saffron flex items-center space-x-2">
                            <Plus className="w-4 h-4" />
                            <span>Write Review</span>
                          </Button>
                        </motion.div>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Write a Review</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Rating</label>
                            <div className="flex space-x-1">{renderStars(reviewRating, true, setReviewRating)}</div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Your Review</label>
                            <Textarea
                              placeholder="Share your experience..."
                              value={reviewText}
                              onChange={(e) => setReviewText(e.target.value)}
                              rows={4}
                            />
                          </div>
                          <Button onClick={handleReviewSubmit} className="w-full gradient-saffron">
                            Submit Review
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button variant="outline" className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>Call Now</span>
                      </Button>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button variant="outline" className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>Get Directions</span>
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Reviews Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Reviews ({mockBusiness.reviewCount})</h2>
                    <Button variant="outline" size="sm">
                      Sort by: Most Recent
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {mockReviews.map((review) => (
                      <ReviewTile key={review.id} review={review} />
                    ))}
                  </div>

                  <div className="text-center mt-8">
                    <Button variant="outline">Load More Reviews</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Contact Information</h3>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium">Address</p>
                        <p className="text-gray-600">{mockBusiness.address}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-gray-600">{mockBusiness.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Globe className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium">Website</p>
                        <p className="text-orange-600">{mockBusiness.website}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Hours */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Hours
                  </h3>

                  <div className="space-y-2">
                    {Object.entries(mockBusiness.hours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between">
                        <span className="capitalize font-medium">{day}</span>
                        <span className="text-gray-600">{hours}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-green-800 font-medium">
                      {mockBusiness.isOpen ? `Open until ${mockBusiness.openUntil}` : "Closed"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Map Placeholder */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Location</h3>
                  <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                    <p className="text-gray-600">Map Integration Coming Soon</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
