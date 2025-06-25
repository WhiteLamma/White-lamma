import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { ToastProvider } from "@/components/ui/toast-provider"
import { AnimationProvider } from "@/components/providers/animation-provider"
import { AuthProvider } from "@/components/providers/auth-provider"

const inter = Inter({ subsets: ["latin"] })
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Help - Your Local Discovery Platform",
  description: "Discover the best local businesses in India - from dhabas to spas, all with authentic reviews!",
    
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${poppins.variable}`}>
        <AuthProvider>
          <AnimationProvider>
            <ToastProvider>{children}</ToastProvider>
          </AnimationProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
