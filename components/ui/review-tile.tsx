"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, ThumbsUp, ThumbsDown, MessageCircle, Flag, MoreHorizontal } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

interface ReviewTileProps {
  review: {
    id: string
    user: {
      name: string
      avatar: string
      reviewCount: number
      isElite?: boolean
    }
    rating: number
    date: string
    text: string
    images?: string[]
    likes: number
    dislikes: number
    replies: number
    isHelpful?: boolean
    tags?: string[]
  }
}

export function ReviewTile({ review }: ReviewTileProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  const [showFullText, setShowFullText] = useState(false)
  const [likesCount, setLikesCount] = useState(review.likes)

  const handleLike = () => {
    if (isLiked) {
      setLikesCount((prev) => prev - 1)
      setIsLiked(false)
    } else {
      setLikesCount((prev) => prev + 1)
      setIsLiked(true)
      if (isDisliked) {
        setIsDisliked(false)
      }
    }
  }

  const handleDislike = () => {
    setIsDisliked(!isDisliked)
    if (isLiked) {
      setLikesCount((prev) => prev - 1)
      setIsLiked(false)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <motion.div key={i} whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.3 }}>
        <Star className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
      </motion.div>
    ))
  }

  const truncatedText = review.text.length > 200 ? review.text.substring(0, 200) + "..." : review.text

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-orange-200">
        <CardContent className="p-6">
          {/* User Info & Rating */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Avatar className="ring-2 ring-orange-100">
                  <AvatarImage src={review.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="gradient-saffron text-white">{review.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </motion.div>

              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold text-gray-900">{review.user.name}</h4>
                  {review.user.isElite && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}>
                      <Badge className="gradient-saffron text-white text-xs">Elite</Badge>
                    </motion.div>
                  )}
                </div>
                <p className="text-sm text-gray-600">{review.user.reviewCount} reviews</p>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center space-x-1 mb-1">{renderStars(review.rating)}</div>
              <p className="text-sm text-gray-500">{review.date}</p>
            </div>
          </div>

          {/* Review Text */}
          <div className="mb-4">
            <motion.p className="text-gray-700 leading-relaxed" animate={{ height: showFullText ? "auto" : "auto" }}>
              {showFullText ? review.text : truncatedText}
            </motion.p>

            {review.text.length > 200 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFullText(!showFullText)}
                className="text-orange-600 hover:text-orange-700 font-medium text-sm mt-2 transition-colors duration-200"
              >
                {showFullText ? "Show less" : "Read more"}
              </motion.button>
            )}
          </div>

          {/* Review Images */}
          {review.images && review.images.length > 0 && (
            <div className="mb-4">
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {review.images.map((image, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative flex-shrink-0"
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Review image ${index + 1}`}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover cursor-pointer hover:shadow-md transition-shadow duration-200"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {review.tags && review.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {review.tags.map((tag, index) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Badge variant="secondary" className="text-xs hover:bg-orange-50 transition-colors duration-200">
                    {tag}
                  </Badge>
                </motion.div>
              ))}
            </div>
          )}

          {/* Helpful Badge */}
          {review.isHelpful && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-4">
              <Badge className="bg-green-100 text-green-800 border-green-200">✨ Helpful Review</Badge>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-4">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  className={`flex items-center space-x-2 ${
                    isLiked ? "text-green-600 bg-green-50" : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                  } transition-all duration-200`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{likesCount}</span>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDislike}
                  className={`flex items-center space-x-2 ${
                    isDisliked ? "text-red-600 bg-red-50" : "text-gray-600 hover:text-red-600 hover:bg-red-50"
                  } transition-all duration-200`}
                >
                  <ThumbsDown className="w-4 h-4" />
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{review.replies}</span>
                </Button>
              </motion.div>
            </div>

            <div className="flex items-center space-x-2">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                >
                  <Flag className="w-4 h-4" />
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-gray-600 transition-all duration-200"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
