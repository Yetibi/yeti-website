import { Variants } from 'motion/react'

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom?: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: custom ? custom * 0.1 : 0,
    },
  }),
}

export const fadeInUpStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
}

export const fadeInScaleStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
}

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

export const scaleInStagger: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

export const slideInFromLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

export const slideInFromRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

export const countUpAnimation = (target: number, duration: number = 2) => ({
  initial: 0,
  animate: target,
  transition: {
    duration,
    ease: 'easeOut',
  },
})

export const hoverElevate: Variants = {
  initial: { y: 0 },
  hover: {
    y: -8,
    boxShadow: '0 20px 40px rgba(224, 123, 48, 0.15)',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
}

export const glowOnHover = {
  boxShadow: [
    '0 0 0 0 rgba(224, 123, 48, 0)',
    '0 0 20px 10px rgba(224, 123, 48, 0.1)',
  ],
}

export const parallaxVariants: Variants = {
  initial: { y: 0 },
  animate: (offset: number) => ({
    y: offset * 0.5,
    transition: {
      ease: 'easeOut',
    },
  }),
}

/* Variants para reveal al scroll */
export const revealOnScroll: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

export const revealOnScrollContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

export const revealOnScrollChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}
