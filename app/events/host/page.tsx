"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/toast-provider"
import { Users, Camera, Star, Sparkles, ArrowRight, CheckCircle, Upload, Plus, X } from "lucide-react"
import { useAuth } from "@/components/providers/auth-provider"
import { useRouter } from "next/navigation"

const eventCategories = [
  { name: "Food & Drink", icon: "🍽️", color: "gradient-coral" },
  { name: "Music & Entertainment", icon: "🎵", color: "gradient-flamingo" },
  { name: "Sports & Fitness", icon: "🏃", color: "gradient-ocean" },
  { name: "Arts & Culture", icon: "🎨", color: "gradient-sunset" },
  { name: "Business & Networking", icon: "💼", color: "gradient-tertiary" },
  { name: "Education & Learning", icon: "📚", color: "gradient-warm" },
  { name: "Technology", icon: "💻", color: "gradient-primary" },
  { name: "Health & Wellness", icon: "🧘", color: "gradient-soft-sky" },
]

const pricingPlans = [
  {
    name: "Free Event",
    price: "₹0",
    description: "Perfect for community events and meetups",
    features: ["Basic event listing", "Up to 100 attendees", "Email support", "Basic analytics"],
    color: "gradient-soft-sky",
    popular: false,
  },
  {
    name: "Standard",
    price: "₹999",
    description: "Great for small to medium events",
    features: [
      "Featured event listing",
      "Up to 500 attendees",
      "Priority support",
      "Advanced analytics",
      "Custom branding",
      "Social media promotion",
    ],
    color: "gradient-primary",
    popular: true,
  },
  {
    name: "Premium",
    price: "₹2,999",
    description: "For large-scale professional events",
    features: [
      "Premium featured listing",
      "Unlimited attendees",
      "24/7 dedicated support",
      "Full analytics suite",
      "Complete branding control",
      "Marketing campaign support",
      "Live streaming integration",
    ],
    color: "gradient-flamingo",
    popular: false,
  },
]

export default function HostEventPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedPlan, setSelectedPlan] = useState("Standard")
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    time: "",
    location: "",
    price: "",
    maxAttendees: "",
    tags: [] as string[],
    images: [] as string[],
  })
  const [newTag, setNewTag] = useState("")

  const handleInputChange = (field: string, value: string) => {
    setEventData((prev) => ({ ...prev, [field]: value }))
  }

  const addTag = () => {
    if (newTag.trim() && !eventData.tags.includes(newTag.trim())) {
      setEventData((prev) => ({ ...prev, tags: [...prev.tags, newTag.trim()] }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setEventData((prev) => ({ ...prev, tags: prev.tags.filter((tag) => tag !== tagToRemove) }))
  }

  const handleSubmit = () => {
    if (!user) {
      router.push("/login")
      return
    }

    toast({
      title: "Event Created Successfully! 🎉",
      description: "Your event has been submitted for review and will be live soon.",
      type: "success",
    })

    // Redirect to events page or dashboard
    router.push("/events")
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const steps = [
    { number: 1, title: "Event Details", description: "Basic information about your event" },
    { number: 2, title: "Category & Pricing", description: "Choose category and pricing plan" },
    { number: 3, title: "Media & Tags", description: "Add images and tags" },
    { number: 4, title: "Review & Publish", description: "Final review and publish" },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            <span className="text-gradient-primary">Host Your</span>
            <br />
            <span className="text-white">Amazing Event</span>
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Create memorable experiences and connect with your community. Our platform makes event hosting simple and
            effective.
          </p>

          {/* Progress Steps */}
          <div className="flex justify-center items-center space-x-4 mb-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <motion.div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                    currentStep >= step.number ? "gradient-primary text-white shadow-lg" : "bg-white/20 text-white/60"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {currentStep > step.number ? <CheckCircle className="w-6 h-6" /> : step.number}
                </motion.div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-1 mx-2 transition-all ${
                      currentStep > step.number ? "gradient-primary" : "bg-white/20"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="text-center">
            <h3 className="text-xl font-bold text-white">{steps[currentStep - 1].title}</h3>
            <p className="text-white/70">{steps[currentStep - 1].description}</p>
          </div>
        </motion.div>

        {/* Form Steps */}
        <div className="max-w-4xl mx-auto">
          {/* Step 1: Event Details */}
          {currentStep === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Card className="card-glass border-2 border-white/20">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-white font-medium mb-2">Event Title *</label>
                      <Input
                        type="text"
                        placeholder="Enter your event title"
                        value={eventData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        className="bg-white/10 border-white/30 text-white placeholder-white/50 focus:border-blue-400"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Event Description *</label>
                      <textarea
                        placeholder="Describe your event in detail..."
                        value={eventData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        rows={4}
                        className="w-full bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:border-blue-400 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white font-medium mb-2">Event Date *</label>
                        <Input
                          type="date"
                          value={eventData.date}
                          onChange={(e) => handleInputChange("date", e.target.value)}
                          className="bg-white/10 border-white/30 text-white focus:border-blue-400"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">Event Time *</label>
                        <Input
                          type="time"
                          value={eventData.time}
                          onChange={(e) => handleInputChange("time", e.target.value)}
                          className="bg-white/10 border-white/30 text-white focus:border-blue-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Location *</label>
                      <Input
                        type="text"
                        placeholder="Enter event location"
                        value={eventData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        className="bg-white/10 border-white/30 text-white placeholder-white/50 focus:border-blue-400"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white font-medium mb-2">Ticket Price (₹)</label>
                        <Input
                          type="number"
                          placeholder="0 for free events"
                          value={eventData.price}
                          onChange={(e) => handleInputChange("price", e.target.value)}
                          className="bg-white/10 border-white/30 text-white placeholder-white/50 focus:border-blue-400"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">Max Attendees</label>
                        <Input
                          type="number"
                          placeholder="Leave empty for unlimited"
                          value={eventData.maxAttendees}
                          onChange={(e) => handleInputChange("maxAttendees", e.target.value)}
                          className="bg-white/10 border-white/30 text-white placeholder-white/50 focus:border-blue-400"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Category & Pricing */}
          {currentStep === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="space-y-8">
                {/* Category Selection */}
                <Card className="card-glass border-2 border-white/20">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-6">Choose Event Category</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {eventCategories.map((category) => (
                        <motion.button
                          key={category.name}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSelectedCategory(category.name)
                            handleInputChange("category", category.name)
                          }}
                          className={`p-4 rounded-xl text-center transition-all border-2 ${
                            selectedCategory === category.name
                              ? `${category.color} border-white/50 shadow-lg`
                              : "glass border-white/20 hover:border-white/40"
                          }`}
                        >
                          <div className="text-3xl mb-2">{category.icon}</div>
                          <div className="text-white font-medium text-sm">{category.name}</div>
                        </motion.button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Pricing Plans */}
                <Card className="card-glass border-2 border-white/20">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-6">Select Hosting Plan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {pricingPlans.map((plan) => (
                        <motion.div
                          key={plan.name}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedPlan(plan.name)}
                          className={`relative p-6 rounded-xl cursor-pointer transition-all border-2 ${
                            selectedPlan === plan.name
                              ? `${plan.color} border-white/50 shadow-xl`
                              : "glass border-white/20 hover:border-white/40"
                          }`}
                        >
                          {plan.popular && (
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                              <Badge className="gradient-flamingo text-white font-semibold">Most Popular</Badge>
                            </div>
                          )}

                          <div className="text-center">
                            <h4 className="text-xl font-bold text-white mb-2">{plan.name}</h4>
                            <div className="text-3xl font-bold text-white mb-2">{plan.price}</div>
                            <p className="text-white/70 text-sm mb-4">{plan.description}</p>

                            <div className="space-y-2">
                              {plan.features.map((feature, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <CheckCircle className="w-4 h-4 text-green-400" />
                                  <span className="text-white/80 text-sm">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Step 3: Media & Tags */}
          {currentStep === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="space-y-8">
                {/* Image Upload */}
                <Card className="card-glass border-2 border-white/20">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-6">Event Images</h3>
                    <div className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center">
                      <Upload className="w-12 h-12 text-white/60 mx-auto mb-4" />
                      <p className="text-white/80 mb-2">Drag and drop images here, or click to browse</p>
                      <p className="text-white/60 text-sm">Recommended: 1920x1080px, JPG or PNG</p>
                      <Button className="btn-outline mt-4">
                        <Camera className="w-4 h-4 mr-2" />
                        Choose Images
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Tags */}
                <Card className="card-glass border-2 border-white/20">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-6">Event Tags</h3>
                    <p className="text-white/70 mb-4">Add tags to help people discover your event</p>

                    <div className="flex space-x-2 mb-4">
                      <Input
                        type="text"
                        placeholder="Add a tag..."
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addTag()}
                        className="bg-white/10 border-white/30 text-white placeholder-white/50 focus:border-blue-400"
                      />
                      <Button onClick={addTag} className="btn-primary">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {eventData.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="border-white/30 text-white flex items-center space-x-1"
                        >
                          <span>{tag}</span>
                          <button onClick={() => removeTag(tag)} className="ml-1 hover:text-red-400">
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Step 4: Review & Publish */}
          {currentStep === 4 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Card className="card-glass border-2 border-white/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Review Your Event</h3>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-bold text-white mb-2">Event Details</h4>
                        <div className="space-y-2 text-white/80">
                          <p>
                            <strong>Title:</strong> {eventData.title || "Not specified"}
                          </p>
                          <p>
                            <strong>Category:</strong> {eventData.category || "Not selected"}
                          </p>
                          <p>
                            <strong>Date:</strong> {eventData.date || "Not specified"}
                          </p>
                          <p>
                            <strong>Time:</strong> {eventData.time || "Not specified"}
                          </p>
                          <p>
                            <strong>Location:</strong> {eventData.location || "Not specified"}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-white mb-2">Pricing & Capacity</h4>
                        <div className="space-y-2 text-white/80">
                          <p>
                            <strong>Ticket Price:</strong> ₹{eventData.price || "0"}
                          </p>
                          <p>
                            <strong>Max Attendees:</strong> {eventData.maxAttendees || "Unlimited"}
                          </p>
                          <p>
                            <strong>Hosting Plan:</strong> {selectedPlan}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">Description</h4>
                      <p className="text-white/80">{eventData.description || "No description provided"}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {eventData.tags.length > 0 ? (
                          eventData.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="border-white/30 text-white">
                              {tag}
                            </Badge>
                          ))
                        ) : (
                          <p className="text-white/60">No tags added</p>
                        )}
                      </div>
                    </div>

                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-white font-medium">Ready to Publish</span>
                      </div>
                      <p className="text-white/70 text-sm">
                        Your event will be reviewed by our team and published within 24 hours.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            <Button onClick={prevStep} disabled={currentStep === 1} variant="outline" className="btn-outline">
              Previous
            </Button>

            <div className="flex space-x-4">
              {currentStep < 4 ? (
                <Button onClick={nextStep} className="btn-primary">
                  Next Step
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="btn-primary">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Publish Event
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <Card className="card-glass border-2 border-white/20">
            <CardContent className="p-12">
              <h2 className="text-4xl font-bold text-white mb-8">Why Host with Help?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Reach More People</h3>
                  <p className="text-white/70">Connect with thousands of potential attendees in your area</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 gradient-flamingo rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Easy Management</h3>
                  <p className="text-white/70">Simple tools to manage registrations, payments, and communications</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 gradient-soft-sky rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Grow Your Brand</h3>
                  <p className="text-white/70">Build your reputation and grow your community with every event</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
