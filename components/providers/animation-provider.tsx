"use client"

import type { ReactNode } from "react"
import { LazyMotion, domAnimation } from "framer-motion"

interface AnimationProviderProps {
  children: ReactNode
}

export function AnimationProvider({ children }: AnimationProviderProps) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>
}
