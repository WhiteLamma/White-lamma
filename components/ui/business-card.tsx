"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Clock, Heart, Share2, Phone, Camera, Utensils, Coffee } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface BusinessCardProps {
  business: {
    id: string
    name: string
    category: string
    rating: number
    reviewCount: number
    priceRange: string
    address: string
    distance: string
    isOpen: boolean
    openUntil?: string
    image: string
    tags: string[]
    isFavorited?: boolean
    hasDelivery?: boolean
    isPromoted?: boolean
  }
  variant?: "default" | "compact" | "featured"
}

export function BusinessCard({ business, variant = "default" }: BusinessCardProps) {
  const [isFavorited, setIsFavorited] = useState(business.isFavorited || false)
  const [isHovered, setIsHovered] = useState(false)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorited(!isFavorited)
    // Add confetti effect here
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "restaurant":
      case "dhaba":
        return <Utensils className="w-4 h-4" />
      case "cafe":
        return <Coffee className="w-4 h-4" />
      default:
        return <Star className="w-4 h-4" />
    }
  }

  const cardVariants = {
    default: "w-full",
    compact: "w-full max-w-sm",
    featured: "w-full max-w-md",
  }

  return (
    <motion.div
      className={cardVariants[variant]}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link href={`/business/${business.id}`}>
        <Card className="overflow-hidden cursor-pointer group relative bg-white hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-orange-200">
          {business.isPromoted && (
            <motion.div
              className="absolute top-2 left-2 z-10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className="gradient-saffron text-white font-semibold">Promoted</Badge>
            </motion.div>
          )}

          {/* Image Container */}
          <div className="relative h-48 overflow-hidden">
            <motion.div animate={{ scale: isHovered ? 1.1 : 1 }} transition={{ duration: 0.6, ease: "easeOut" }}>
              <Image src={business.image || "/placeholder.svg"} alt={business.name} fill className="object-cover" />
            </motion.div>

            {/* Overlay with actions */}
            <motion.div
              className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <div className="absolute top-2 right-2 flex space-x-2">
                <motion.div whileHover={{ scale: 1.2, rotate: 10 }} whileTap={{ scale: 0.8 }}>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="rounded-full bg-white/90 hover:bg-white"
                    onClick={handleFavoriteClick}
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.2, rotate: -10 }} whileTap={{ scale: 0.8 }}>
                  <Button size="sm" variant="secondary" className="rounded-full bg-white/90 hover:bg-white">
                    <Share2 className="w-4 h-4 text-gray-600" />
                  </Button>
                </motion.div>
              </div>

              <div className="absolute bottom-2 right-2">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Badge className="bg-white/90 text-gray-800 flex items-center space-x-1">
                    <Camera className="w-3 h-3" />
                    <span>12+</span>
                  </Badge>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <CardContent className="p-4">
            {/* Business Name & Category */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <motion.h3
                  className="font-bold text-lg text-gray-900 group-hover:text-orange-600 transition-colors duration-200 line-clamp-1"
                  whileHover={{ x: 2 }}
                >
                  {business.name}
                </motion.h3>
                <div className="flex items-center space-x-2 mt-1">
                  {getCategoryIcon(business.category)}
                  <span className="text-sm text-gray-600">{business.category}</span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm font-medium text-green-600">{business.priceRange}</span>
                </div>
              </div>
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center space-x-2 mb-3">
              <div className="flex items-center space-x-1">
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </motion.div>
                <span className="font-semibold text-gray-900">{business.rating}</span>
              </div>
              <span className="text-sm text-gray-600">({business.reviewCount} reviews)</span>
              {business.hasDelivery && (
                <Badge variant="secondary" className="text-xs">
                  Delivery
                </Badge>
              )}
            </div>

            {/* Location & Status */}
            <div className="space-y-2 mb-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="line-clamp-1">{business.address}</span>
                <span>•</span>
                <span>{business.distance}</span>
              </div>

              <div className="flex items-center space-x-2 text-sm">
                <Clock className="w-4 h-4" />
                {business.isOpen ? (
                  <span className="text-green-600 font-medium">
                    Open {business.openUntil && `until ${business.openUntil}`}
                  </span>
                ) : (
                  <span className="text-red-600 font-medium">Closed</span>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              {business.tags.slice(0, 3).map((tag, index) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Badge
                    variant="outline"
                    className="text-xs hover:bg-orange-50 hover:border-orange-200 transition-colors duration-200"
                  >
                    {tag}
                  </Badge>
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button size="sm" className="w-full gradient-saffron hover:shadow-lg transition-all duration-200">
                  View Details
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                <Button size="sm" variant="outline" className="hover:bg-green-50 hover:border-green-200">
                  <Phone className="w-4 h-4" />
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
