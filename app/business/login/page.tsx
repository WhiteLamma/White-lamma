"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, Mail, Lock, Store, Phone, ArrowLeft } from "lucide-react"
import { useAuth } from "@/components/providers/auth-provider"
import { useToast } from "@/components/ui/toast-provider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function BusinessLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const success = await login(email, password, "business")

    if (success) {
      toast({
        title: "Welcome to Business Dashboard! 🏪",
        description: "Successfully logged in",
      })
      router.push("/dashboard/business")
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid business credentials. Please try again.",
      })
    }

    setIsLoading(false)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Business Account Created! 🎉",
        description: "Welcome to Help Business Platform",
      })
    }, 2000)
  }

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate comprehensive business setup
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Business Setup Complete! 🎉",
        description: "Your business profile has been created successfully. Welcome to Help!",
      })
      router.push("/dashboard/business")
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      {/* Back to Home */}
      <motion.div
        className="absolute top-4 left-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/">
          <Button variant="ghost" className="flex items-center space-x-2 hover:bg-purple-50">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-md">
          <CardHeader className="text-center pb-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Store className="text-white w-8 h-8" />
            </motion.div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Business Portal
            </CardTitle>
            <CardDescription>Manage your business on Help platform</CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                >
                  Register
                </TabsTrigger>
                <TabsTrigger
                  value="setup"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                >
                  Setup Business
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <motion.form
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  onSubmit={handleLogin}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="email">Business Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="business@example.com"
                        className="pl-10 border-2 border-purple-200 focus:border-purple-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-10 pr-10 border-2 border-purple-200 focus:border-purple-400"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-gray-600">Remember me</span>
                    </label>
                    <Link href="/forgot-password" className="text-purple-600 hover:text-purple-700 font-medium">
                      Forgot password?
                    </Link>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-200 py-3"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : (
                        "Login to Dashboard"
                      )}
                    </Button>
                  </motion.div>
                </motion.form>
              </TabsContent>

              <TabsContent value="register">
                <motion.form
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  onSubmit={handleRegister}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      type="text"
                      placeholder="Sharma Ji Ka Dhaba"
                      className="border-2 border-purple-200 focus:border-purple-400"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ownerName">Owner Name</Label>
                    <Input
                      id="ownerName"
                      type="text"
                      placeholder="Sharma Ji"
                      className="border-2 border-purple-200 focus:border-purple-400"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessEmail">Business Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="businessEmail"
                        type="email"
                        placeholder="business@example.com"
                        className="pl-10 border-2 border-purple-200 focus:border-purple-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessPhone">Business Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="businessPhone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="pl-10 border-2 border-purple-200 focus:border-purple-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="newPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        className="pl-10 pr-10 border-2 border-purple-200 focus:border-purple-400"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 text-sm">
                    <input
                      type="checkbox"
                      className="rounded border-purple-300 text-purple-600 focus:ring-purple-500 mt-1"
                      required
                    />
                    <span className="text-gray-600">
                      I agree to the{" "}
                      <Link href="/terms" className="text-purple-600 hover:text-purple-700 font-medium">
                        Business Terms
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-purple-600 hover:text-purple-700 font-medium">
                        Privacy Policy
                      </Link>
                    </span>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-200 py-3"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : (
                        "Register Business"
                      )}
                    </Button>
                  </motion.div>
                </motion.form>
              </TabsContent>

              <TabsContent value="setup">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Complete Business Setup</h3>
                    <p className="text-gray-600">Tell us about your business to get started</p>
                  </div>

                  <form onSubmit={handleSetup} className="space-y-6">
                    {/* Step 1: Basic Information */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-800 border-b pb-2">Basic Information</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="businessName">Business Name *</Label>
                          <Input
                            id="businessName"
                            type="text"
                            placeholder="Sharma Ji Ka Dhaba"
                            className="border-2 border-purple-200 focus:border-purple-400"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="businessType">Business Type *</Label>
                          <Select required>
                            <SelectTrigger className="border-2 border-purple-200 focus:border-purple-400">
                              <SelectValue placeholder="Select business type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="restaurant">Restaurant</SelectItem>
                              <SelectItem value="cafe">Cafe</SelectItem>
                              <SelectItem value="dhaba">Dhaba</SelectItem>
                              <SelectItem value="gym">Gym</SelectItem>
                              <SelectItem value="salon">Beauty Salon</SelectItem>
                              <SelectItem value="auto">Auto Service</SelectItem>
                              <SelectItem value="shopping">Shopping</SelectItem>
                              <SelectItem value="medical">Medical</SelectItem>
                              <SelectItem value="education">Education</SelectItem>
                              <SelectItem value="entertainment">Entertainment</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="ownerName">Owner/Manager Name *</Label>
                          <Input
                            id="ownerName"
                            type="text"
                            placeholder="Sharma Ji"
                            className="border-2 border-purple-200 focus:border-purple-400"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="establishedYear">Established Year</Label>
                          <Input
                            id="establishedYear"
                            type="number"
                            placeholder="2010"
                            min="1900"
                            max="2024"
                            className="border-2 border-purple-200 focus:border-purple-400"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="description">Business Description *</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe your business, specialties, and what makes you unique..."
                          className="border-2 border-purple-200 focus:border-purple-400"
                          rows={4}
                          required
                        />
                      </div>
                    </div>

                    {/* Step 2: Contact Information */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-800 border-b pb-2">Contact Information</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="businessEmail">Business Email *</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                              id="businessEmail"
                              type="email"
                              placeholder="business@example.com"
                              className="pl-10 border-2 border-purple-200 focus:border-purple-400"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="businessPhone">Business Phone *</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                              id="businessPhone"
                              type="tel"
                              placeholder="+91 98765 43210"
                              className="pl-10 border-2 border-purple-200 focus:border-purple-400"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="website">Website (Optional)</Label>
                        <Input
                          id="website"
                          type="url"
                          placeholder="https://www.yourbusiness.com"
                          className="border-2 border-purple-200 focus:border-purple-400"
                        />
                      </div>

                      <div>
                        <Label htmlFor="socialMedia">Social Media Links</Label>
                        <div className="space-y-2">
                          <Input
                            placeholder="Facebook URL"
                            className="border-2 border-purple-200 focus:border-purple-400"
                          />
                          <Input
                            placeholder="Instagram URL"
                            className="border-2 border-purple-200 focus:border-purple-400"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Step 3: Location & Address */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-800 border-b pb-2">Location & Address</h4>
                      
                      <div>
                        <Label htmlFor="fullAddress">Complete Address *</Label>
                        <Textarea
                          id="fullAddress"
                          placeholder="Shop No. 123, Main Market, Connaught Place, New Delhi, 110001"
                          className="border-2 border-purple-200 focus:border-purple-400"
                          rows={3}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            type="text"
                            placeholder="New Delhi"
                            className="border-2 border-purple-200 focus:border-purple-400"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State *</Label>
                          <Input
                            id="state"
                            type="text"
                            placeholder="Delhi"
                            className="border-2 border-purple-200 focus:border-purple-400"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="pincode">PIN Code *</Label>
                          <Input
                            id="pincode"
                            type="text"
                            placeholder="110001"
                            className="border-2 border-purple-200 focus:border-purple-400"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="landmark">Nearby Landmark</Label>
                          <Input
                            id="landmark"
                            type="text"
                            placeholder="Near Metro Station"
                            className="border-2 border-purple-200 focus:border-purple-400"
                          />
                        </div>
                        <div>
                          <Label htmlFor="area">Area/Locality</Label>
                          <Input
                            id="area"
                            type="text"
                            placeholder="Connaught Place"
                            className="border-2 border-purple-200 focus:border-purple-400"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Step 4: Business Hours */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-800 border-b pb-2">Business Hours</h4>
                      
                      <div className="grid grid-cols-1 gap-3">
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                          <div key={day} className="flex items-center space-x-4">
                            <div className="w-20 font-medium text-gray-700">{day}</div>
                            <div className="flex items-center space-x-2">
                              <input type="checkbox" defaultChecked className="rounded" />
                              <span className="text-sm text-gray-600">Open</span>
                            </div>
                            <Input
                              type="time"
                              defaultValue="10:00"
                              className="w-32 border-2 border-purple-200 focus:border-purple-400"
                            />
                            <span className="text-gray-500">to</span>
                            <Input
                              type="time"
                              defaultValue="22:00"
                              className="w-32 border-2 border-purple-200 focus:border-purple-400"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Step 5: Services & Amenities */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-800 border-b pb-2">Services & Amenities</h4>
                      
                      <div>
                        <Label>Services Offered (Select all that apply)</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                          {[
                            'Dine-in', 'Takeaway', 'Home Delivery', 'Online Ordering',
                            'Parking Available', 'AC Available', 'WiFi', 'Card Payment',
                            'UPI Payment', 'Family Friendly', 'Pet Friendly', 'Wheelchair Accessible'
                          ].map((service) => (
                            <label key={service} className="flex items-center space-x-2 cursor-pointer">
                              <input type="checkbox" className="rounded border-purple-300 text-purple-600" />
                              <span className="text-sm text-gray-700">{service}</span>
                            </label>
                          ))}
                        </div>

                        <div>
                          <Label htmlFor="specialties">Specialties/Popular Items</Label>
                          <Textarea
                            id="specialties"
                            placeholder="Butter Chicken, Dal Makhani, Fresh Naan, Lassi..."
                            className="border-2 border-purple-200 focus:border-purple-400"
                            rows={3}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="priceRange">Price Range</Label>
                            <Select>
                              <SelectTrigger className="border-2 border-purple-200 focus:border-purple-400">
                                <SelectValue placeholder="Select price range" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="budget">₹ - Budget Friendly (Under ₹500)</SelectItem>
                                <SelectItem value="moderate">₹₹ - Moderate (₹500-₹1500)</SelectItem>
                                <SelectItem value="expensive">₹₹₹ - Expensive (₹1500-₹3000)</SelectItem>
                                <SelectItem value="luxury">₹₹₹₹ - Luxury (Above ₹3000)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="capacity">Seating Capacity (if applicable)</Label>
                            <Input
                              id="capacity"
                              type="number"
                              placeholder="50"
                              className="border-2 border-purple-200 focus:border-purple-400"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Step 6: Additional Information */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-800 border-b pb-2">Additional Information</h4>
                      
                      <div>
                        <Label htmlFor="awards">Awards & Certifications</Label>
                        <Textarea
                          id="awards"
                          placeholder="Best Restaurant Award 2023, ISO Certified, FSSAI Licensed..."
                          className="border-2 border-purple-200 focus:border-purple-400"
                          rows={2}
                        />
                      </div>

                      <div>
                        <Label htmlFor="languages">Languages Spoken</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                          {['Hindi', 'English', 'Punjabi', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Gujarati'].map((lang) => (
                            <label key={lang} className="flex items-center space-x-2 cursor-pointer">
                              <input type="checkbox" className="rounded border-purple-300 text-purple-600" />
                              <span className="text-sm text-gray-700">{lang}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="additionalInfo">Additional Information</Label>
                        <Textarea
                          id="additionalInfo"
                          placeholder="Any other information you'd like customers to know..."
                          className="border-2 border-purple-200 focus:border-purple-400"
                          rows={3}
                        />
                      </div>
                    </div>

                    {/* Terms and Submit */}
                    <div className="space-y-4">
                      <div className="flex items-start space-x-2 text-sm">
                        <input
                          type="checkbox"
                          className="rounded border-purple-300 text-purple-600 focus:ring-purple-500 mt-1"
                          required
                        />
                        <span className="text-gray-600">
                          I confirm that all information provided is accurate and I agree to the{" "}
                          <Link href="/terms" className="text-purple-600 hover:text-purple-700 font-medium">
                            Business Terms & Conditions
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-purple-600 hover:text-purple-700 font-medium">
                            Privacy Policy
                          </Link>
                        </span>
                      </div>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-200 py-3"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                          ) : (
                            "Complete Business Setup"
                          )}
                        </Button>
                      </motion.div>
                    </div>
                  </form>
                </motion.div>
              </TabsContent>
            </Tabs>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Demo Business Login</h4>
              <div className="space-y-1 text-sm text-purple-800">
                <div>
                  <strong>Email:</strong> business@help.com
                </div>
                <div>
                  <strong>Password:</strong> password123
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-6 text-sm text-gray-600"
        >
          Regular user?{" "}
          <Link href="/login" className="text-purple-600 hover:text-purple-700 font-medium">
            Sign in here
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
