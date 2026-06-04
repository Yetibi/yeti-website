import { useMotionValue, useTransform, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'

// Motion tokens - fuente única de verdad para todas las animaciones
export const motionTokens = {
  duration: {
    fast: 0.4,
    base: 0.6,
    slow: 0.8,
    hero: 0.9,
  },
  ease: {
    out: [0.2, 0.6, 0.2, 1],
    inOut: [0.4, 0, 0.2, 1],
  },
  distance: {
    sm: 16,
    md: 24,
    lg: 40,
  },
  stagger: {
    tight: 0.08,
    base: 0.12,
    loose: 0.18,
  },
}

// Transiciones base
export const baseTransition = {
  duration: motionTokens.duration.base,
  ease: motionTokens.ease.out,
}

export const heroTransition = {
  duration: motionTokens.duration.hero,
  ease: motionTokens.ease.out,
}

export const softSpring = {
  type: 'spring',
  damping: 25,
  stiffness: 120,
  mass: 1,
}

// Variantes pre-construidas
export const fadeUp = {
  initial: { opacity: 0, y: motionTokens.distance.md },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -motionTokens.distance.md },
}

export const fadeUpSm = {
  initial: { opacity: 0, y: motionTokens.distance.sm },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -motionTokens.distance.sm },
}

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.96 },
}

// Contenedores stagger
export const staggerContainer = (staggerChildren = motionTokens.stagger.base, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
})

export const heroContainer = staggerContainer(motionTokens.stagger.loose, 0.1)
export const servicesContainer = staggerContainer(motionTokens.stagger.base, 0)
export const methodologyContainer = staggerContainer(motionTokens.stagger.loose, 0)
export const statsContainer = staggerContainer(motionTokens.stagger.tight, 0)

// Hover effect para tarjetas
export const cardHover = {
  whileHover: {
    y: -6,
    boxShadow: '0 24px 48px rgba(224, 123, 48, 0.3)',
  },
  whileTap: { scale: 0.98 },
  transition: baseTransition,
}

// Scroll reveal
export const revealViewport = {
  once: true,
  amount: 0.25,
  margin: '0px 0px -80px 0px',
}

// Hook: useCountUp
export function useCountUp(
  target: number,
  options: {
    duration?: number
    decimals?: number
    prefix?: string
    suffix?: string
    locale?: string
  } = {}
) {
  const { duration = 1.3, decimals = 0, prefix = '', suffix = '', locale = 'es-CO' } = options
  const [displayValue, setDisplayValue] = useState(prefix + '0' + suffix)
  const motionValue = useMotionValue(0)

  useEffect(() => {
    const startTime = Date.now()
    const ease = (t: number) => 1 - Math.pow(1 - t, 3)

    const animate = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)
      const easedProgress = ease(progress)
      const current = target * easedProgress

      if (decimals > 0) {
        setDisplayValue(prefix + current.toFixed(decimals) + suffix)
      } else {
        setDisplayValue(prefix + Math.floor(current) + suffix)
      }

      motionValue.set(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [target, duration, decimals, prefix, suffix])

  return displayValue
}

// Hook: useParallax
export function useParallax(distance = 24) {
  const { scrollY } = useScroll()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const y = useTransform(scrollY, [0, 500], [0, distance], { clamp: true })

  return mounted ? y : 0
}

// Presets de animación para diferentes contextos
export const animationPresets = {
  // Hero entrada
  heroEyebrow: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { ...baseTransition, delay: 0 },
  },
  heroTitle: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { ...heroTransition, delay: 0.2 },
  },
  heroSubtitle: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { ...baseTransition, delay: 0.4 },
  },
  heroCTA: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { ...baseTransition, delay: 0.6 },
  },

  // Tarjetas servicio
  serviceCard: {
    initial: { opacity: 0, y: 24, scale: 0.95 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: revealViewport,
    transition: baseTransition,
  },

  // Stats con count-up
  statCard: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: revealViewport,
    transition: baseTransition,
  },

  // Elementos en scroll
  scrollReveal: {
    initial: { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: revealViewport,
    transition: baseTransition,
  },
}

// Glow animado (para efectos de fondo)
export const animatedGlow = {
  animate: {
    opacity: [0.4, 0.6, 0.4],
  },
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut',
  },
}
