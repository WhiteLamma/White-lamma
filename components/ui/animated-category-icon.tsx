"use client"

import { motion } from "framer-motion"
import { Utensils, Coffee, Dumbbell, Scissors, Car, ShoppingBag, Sparkles, Heart, Star } from "lucide-react"

interface AnimatedCategoryIconProps {
  category: string
  className?: string
  showEffects?: boolean
}

export function AnimatedCategoryIcon({
  category,
  className = "w-8 h-8",
  showEffects = true,
}: AnimatedCategoryIconProps) {
  const getIconWithAnimation = () => {
    switch (category.toLowerCase()) {
      case "restaurants":
      case "dhaba":
        return (
          <motion.div
            className="relative"
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <Utensils className={`${className} text-white drop-shadow-lg`} />
            {showEffects && (
              <>
                <motion.div
                  className="absolute -top-2 -right-1"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 1, 0.6],
                    rotate: [0, 180, 360],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                </motion.div>
                <motion.div
                  className="absolute -bottom-1 -left-1"
                  animate={{
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                >
                  <Heart className="w-3 h-3 text-red-300 fill-current" />
                </motion.div>
              </>
            )}
          </motion.div>
        )

      case "cafes":
      case "cafe":
        return (
          <motion.div className="relative">
            <Coffee className={`${className} text-white drop-shadow-lg`} />
            {showEffects && (
              <>
                <motion.div
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2"
                  animate={{
                    y: [0, -4, 0],
                    opacity: [0.4, 0.9, 0.4],
                    scale: [0.9, 1.2, 0.9],
                  }}
                  transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  <div className="w-6 h-2 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full opacity-70" />
                </motion.div>
                <motion.div
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                  animate={{
                    y: [0, -3, 0],
                    opacity: [0.3, 0.7, 0.3],
                    scale: [0.7, 1, 0.7],
                  }}
                  transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.4 }}
                >
                  <div className="w-4 h-1 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full opacity-60" />
                </motion.div>
                <motion.div
                  className="absolute -top-5 left-1/2 transform -translate-x-1/2"
                  animate={{
                    y: [0, -2, 0],
                    opacity: [0.2, 0.5, 0.2],
                    scale: [0.5, 0.8, 0.5],
                  }}
                  transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.8 }}
                >
                  <div className="w-2 h-1 bg-gray-500 rounded-full opacity-50" />
                </motion.div>
              </>
            )}
          </motion.div>
        )

      case "gyms":
      case "gym":
        return (
          <motion.div
            className="relative"
            animate={{
              rotate: [0, 15, -15, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <Dumbbell className={`${className} text-white drop-shadow-lg`} />
            {showEffects && (
              <>
                <motion.div
                  className="absolute -top-1 -right-2"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                </motion.div>
                <motion.div
                  className="absolute -bottom-1 -left-2"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
                >
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                </motion.div>
              </>
            )}
          </motion.div>
        )

      case "salons":
      case "salon":
        return (
          <motion.div
            className="relative"
            animate={{
              rotate: [0, 20, -20, 0],
            }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <Scissors className={`${className} text-white drop-shadow-lg`} />
            {showEffects && (
              <>
                <motion.div
                  className="absolute -top-1 -right-1"
                  animate={{
                    scale: [0.8, 1.3, 0.8],
                    opacity: [0.5, 1, 0.5],
                    rotate: [0, 360],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Star className="w-3 h-3 text-pink-300 fill-current" />
                </motion.div>
                <motion.div
                  className="absolute -bottom-1 -left-1"
                  animate={{
                    scale: [0.6, 1.1, 0.6],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{ duration: 1.7, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                >
                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                </motion.div>
              </>
            )}
          </motion.div>
        )

      case "auto service":
      case "auto":
        return (
          <motion.div
            className="relative"
            animate={{
              x: [0, 4, 0, -4, 0],
              rotate: [0, 2, 0, -2, 0],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <Car className={`${className} text-white drop-shadow-lg`} />
            {showEffects && (
              <>
                <motion.div
                  className="absolute -bottom-2 -left-3"
                  animate={{
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                  <div className="w-4 h-1 bg-gray-400 rounded-full" />
                </motion.div>
                <motion.div
                  className="absolute -bottom-2 -right-3"
                  animate={{
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                >
                  <div className="w-4 h-1 bg-gray-400 rounded-full" />
                </motion.div>
              </>
            )}
          </motion.div>
        )

      case "shopping":
        return (
          <motion.div
            className="relative"
            animate={{
              y: [0, -4, 0],
              rotate: [0, 8, 0],
            }}
            transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <ShoppingBag className={`${className} text-white drop-shadow-lg`} />
            {showEffects && (
              <>
                <motion.div
                  className="absolute -top-2 -right-1"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.6, 1, 0.6],
                    rotate: [0, 180, 360],
                  }}
                  transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Sparkles className="w-3 h-3 text-yellow-300" />
                </motion.div>
                <motion.div
                  className="absolute top-1 left-1"
                  animate={{
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.7 }}
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                </motion.div>
              </>
            )}
          </motion.div>
        )

      default:
        return <Utensils className={`${className} text-white drop-shadow-lg`} />
    }
  }

  return getIconWithAnimation()
}
