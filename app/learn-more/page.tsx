"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Search,
  Star,
  Users,
  Shield,
  Smartphone,
  Globe,
  Heart,
  TrendingUp,
  Award,
  CheckCircle,
  ArrowRight,
  Play,
  Download,
  MessageCircle,
  BookOpen,
  Lightbulb,
  Target,
  Zap,
  Gift,
} from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Search,
    title: "Smart Discovery",
    description: "AI-powered search helps you find exactly what you're looking for",
    color: "gradient-primary",
  },
  {
    icon: Star,
    title: "Authentic Reviews",
    description: "Real reviews from verified users you can trust",
    color: "gradient-flamingo",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Built by the community, for the community",
    color: "gradient-soft-sky",
  },
  {
    icon: Shield,
    title: "Verified Businesses",
    description: "All businesses are verified for authenticity and quality",
    color: "gradient-coral",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Optimized for mobile with offline capabilities",
    color: "gradient-warm",
  },
  {
    icon: Globe,
    title: "Local Focus",
    description: "Discover hidden gems in your neighborhood",
    color: "gradient-ocean",
  },
]

const stats = [
  { number: "50K+", label: "Active Users", icon: Users },
  { number: "25K+", label: "Verified Businesses", icon: Award },
  { number: "1M+", label: "Reviews Written", icon: Star },
  { number: "500+", label: "Cities Covered", icon: Globe },
]

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Food Blogger",
    content: "Help has completely changed how I discover new restaurants. The community is amazing!",
    avatar: "/placeholder.svg",
    rating: 5,
  },
  {
    name: "Rajesh Kumar",
    role: "Business Owner",
    content: "Since joining Help, my restaurant has seen a 40% increase in customers. Highly recommended!",
    avatar: "/placeholder.svg",
    rating: 5,
  },
  {
    name: "Sneha Patel",
    role: "Local Explorer",
    content: "I've found so many hidden gems through Help. The reviews are always spot on!",
    avatar: "/placeholder.svg",
    rating: 5,
  },
]

const faqs = [
  {
    question: "How does Help work?",
    answer:
      "Help connects you with local businesses through authentic reviews and recommendations from your community. Simply search for what you need, read reviews, and discover amazing places near you.",
  },
  {
    question: "Is Help free to use?",
    answer:
      "Yes! Help is completely free for users. You can search, read reviews, write reviews, and discover businesses without any cost.",
  },
  {
    question: "How do you verify businesses?",
    answer:
      "We have a comprehensive verification process that includes document verification, location verification, and quality checks to ensure all businesses on our platform are legitimate.",
  },
  {
    question: "Can I trust the reviews?",
    answer:
      "We use advanced algorithms and manual moderation to ensure all reviews are authentic. We also verify reviewers to maintain the quality of our community.",
  },
  {
    question: "How can I add my business?",
    answer:
      "Business owners can easily add their business through our business portal. The process is simple and includes verification steps to maintain platform quality.",
  },
]

export default function LearnMorePage() {
  const [activeTab, setActiveTab] = useState("features")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const tabs = [
    { id: "features", label: "Features", icon: Zap },
    { id: "how-it-works", label: "How It Works", icon: BookOpen },
    { id: "community", label: "Community", icon: Users },
    { id: "business", label: "For Business", icon: TrendingUp },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              <span className="text-gradient-primary">Discover</span>
              <br />
              <span className="text-white">The Help Way</span>
            </h1>
            <p className="text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Learn how Help is revolutionizing local business discovery with authentic reviews, smart recommendations,
              and a thriving community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary px-8 py-4 text-lg">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
              <Button className="btn-outline px-8 py-4 text-lg">
                <Download className="w-5 h-5 mr-2" />
                Download App
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <Card className="card-glass border-2 border-white/20 hover-lift">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-white/70">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-12">
            <div className="flex space-x-2 glass rounded-2xl p-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all ${
                    activeTab === tab.id
                      ? "gradient-primary text-white shadow-lg"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
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
            transition={{ duration: 0.5 }}
          >
            {/* Features Tab */}
            {activeTab === "features" && (
              <div className="space-y-16">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-white mb-4">Powerful Features</h2>
                  <p className="text-xl text-white/80 max-w-2xl mx-auto">
                    Discover what makes Help the best platform for finding local businesses
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <Card className="card-glass border-2 border-white/20 h-full hover-lift">
                        <CardContent className="p-8 text-center">
                          <div
                            className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}
                          >
                            <feature.icon className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                          <p className="text-white/70">{feature.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* How It Works Tab */}
            {activeTab === "how-it-works" && (
              <div className="space-y-16">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-white mb-4">How Help Works</h2>
                  <p className="text-xl text-white/80 max-w-2xl mx-auto">
                    Simple steps to discover amazing local businesses
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      step: "01",
                      title: "Search & Discover",
                      description: "Use our smart search to find businesses by category, location, or specific needs",
                      icon: Search,
                    },
                    {
                      step: "02",
                      title: "Read Reviews",
                      description: "Check authentic reviews from verified community members to make informed decisions",
                      icon: Star,
                    },
                    {
                      step: "03",
                      title: "Visit & Review",
                      description: "Visit the business and share your experience to help others in the community",
                      icon: Heart,
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.step}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                    >
                      <Card className="card-glass border-2 border-white/20 relative overflow-hidden">
                        <CardContent className="p-8 text-center">
                          <div className="absolute top-4 right-4 text-6xl font-bold text-white/10">{item.step}</div>
                          <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                            <item.icon className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                          <p className="text-white/70">{item.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Community Tab */}
            {activeTab === "community" && (
              <div className="space-y-16">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-white mb-4">Join Our Community</h2>
                  <p className="text-xl text-white/80 max-w-2xl mx-auto">
                    Be part of a thriving community that's shaping local business discovery
                  </p>
                </div>

                {/* Testimonials */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={testimonial.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card className="card-glass border-2 border-white/20 h-full">
                        <CardContent className="p-8">
                          <div className="flex items-center space-x-1 mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <p className="text-white/80 mb-6 italic">"{testimonial.content}"</p>
                          <div className="flex items-center space-x-3">
                            <img
                              src={testimonial.avatar || "/placeholder.svg"}
                              alt={testimonial.name}
                              className="w-12 h-12 rounded-full border-2 border-white/30"
                            />
                            <div>
                              <h4 className="font-bold text-white">{testimonial.name}</h4>
                              <p className="text-white/60 text-sm">{testimonial.role}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Community Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                  <Card className="card-glass border-2 border-white/20">
                    <CardContent className="p-8">
                      <div className="w-12 h-12 gradient-flamingo rounded-full flex items-center justify-center mb-6">
                        <Gift className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-4">Rewards Program</h3>
                      <p className="text-white/70 mb-4">
                        Earn points for writing reviews, checking in, and helping the community. Redeem for exclusive
                        offers and discounts.
                      </p>
                      <ul className="space-y-2 text-white/60">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span>10 points per review</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span>5 points per check-in</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span>Exclusive member discounts</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="card-glass border-2 border-white/20">
                    <CardContent className="p-8">
                      <div className="w-12 h-12 gradient-soft-sky rounded-full flex items-center justify-center mb-6">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-4">Elite Status</h3>
                      <p className="text-white/70 mb-4">
                        Become an Elite reviewer and get special recognition, early access to features, and exclusive
                        events.
                      </p>
                      <ul className="space-y-2 text-white/60">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span>Elite badge on profile</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span>Priority customer support</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span>Exclusive community events</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Business Tab */}
            {activeTab === "business" && (
              <div className="space-y-16">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-white mb-4">Grow Your Business</h2>
                  <p className="text-xl text-white/80 max-w-2xl mx-auto">
                    Join thousands of businesses that trust Help to connect with customers
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-6">Why Choose Help for Your Business?</h3>
                    <div className="space-y-4">
                      {[
                        "Reach thousands of potential customers",
                        "Build trust with authentic reviews",
                        "Manage your online presence easily",
                        "Get insights with detailed analytics",
                        "Respond to customer feedback directly",
                        "Promote special offers and events",
                      ].map((benefit, index) => (
                        <motion.div
                          key={benefit}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex items-center space-x-3"
                        >
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-white/80">{benefit}</span>
                        </motion.div>
                      ))}
                    </div>
                    <div className="mt-8">
                      <Link href="/business/register">
                        <Button className="btn-primary">
                          Add Your Business
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <Card className="card-glass border-2 border-white/20">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-white">Increase Visibility</h4>
                            <p className="text-white/70">
                              Get discovered by customers actively looking for your services
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="card-glass border-2 border-white/20">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 gradient-flamingo rounded-full flex items-center justify-center">
                            <MessageCircle className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-white">Direct Communication</h4>
                            <p className="text-white/70">
                              Connect directly with customers and build lasting relationships
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="card-glass border-2 border-white/20">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 gradient-soft-sky rounded-full flex items-center justify-center">
                            <Lightbulb className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-white">Business Insights</h4>
                            <p className="text-white/70">
                              Get valuable insights about your customers and market trends
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-white/80">Everything you need to know about Help</p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="card-glass border-2 border-white/20">
                  <CardContent className="p-0">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                    >
                      <h3 className="text-lg font-bold text-white">{faq.question}</h3>
                      <motion.div animate={{ rotate: expandedFaq === index ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ArrowRight className="w-5 h-5 text-white/70" />
                      </motion.div>
                    </button>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-6 pb-6"
                      >
                        <p className="text-white/70">{faq.answer}</p>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}>
            <h2 className="text-5xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-white/80 mb-8">
              Join thousands of users who trust Help to discover amazing local businesses
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button className="btn-primary px-8 py-4 text-lg">
                  Join the Community
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/business/register">
                <Button className="btn-outline px-8 py-4 text-lg">Add Your Business</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
