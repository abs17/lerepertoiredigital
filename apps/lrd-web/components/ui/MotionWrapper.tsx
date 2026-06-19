'use client'

import { motion, useInView, Variants } from 'framer-motion'
import { useRef, ReactNode } from 'react'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
}

interface Props {
  children: ReactNode
  variant?: 'fadeUp' | 'fadeIn' | 'stagger' | 'scaleIn'
  className?: string
  delay?: number
  once?: boolean
}

export function FadeUp({ children, className, delay = 0, once = true }: Omit<Props, 'variant'>) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function FadeIn({ children, className, delay = 0, once = true }: Omit<Props, 'variant'>) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      variants={fadeIn}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerGroup({ children, className, once = true }: Omit<Props, 'variant' | 'delay'>) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  )
}

export function ScaleIn({ children, className, delay = 0, once = true }: Omit<Props, 'variant'>) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      variants={scaleIn}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
