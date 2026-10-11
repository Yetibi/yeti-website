'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { baseTransition, revealViewport, animatedGlow } from '@/lib/motion'

const AnimatedDataViz = () => (
  <svg
    className="absolute top-1/2 right-10 w-96 h-96 opacity-15 pointer-events-none"
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="dataFlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E07B30" stopOpacity="0" />
        <stop offset="50%" stopColor="#E07B30" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#E07B30" stopOpacity="0" />
      </linearGradient>
    </defs>
    <motion.circle
      cx="50"
      cy="50"
      r="4"
      fill="#E07B30"
      animate={{ cy: [50, 60, 50] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.circle
      cx="100"
      cy="100"
      r="4"
      fill="#E07B30"
      animate={{ cy: [100, 90, 100] }}
      transition={{ duration: 2.2, repeat: Infinity }}
    />
    <motion.circle
      cx="150"
      cy="150"
      r="4"
      fill="#E07B30"
      animate={{ cy: [150, 140, 150] }}
      transition={{ duration: 2.5, repeat: Infinity }}
    />
    <line x1="50" y1="50" x2="100" y2="100" stroke="url(#dataFlow)" strokeWidth="1.5" />
    <line x1="100" y1="100" x2="150" y2="150" stroke="url(#dataFlow)" strokeWidth="1.5" />
  </svg>
)

export default function Page() {
  const navRef = useRef<HTMLElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const burgerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const burger = burgerRef.current
    const menu = mobileMenuRef.current

    const toggleMenu = (open?: boolean) => {
      if (!menu) return
      const isOpen = open !== undefined ? open : menu.classList.contains('open')
      menu.classList.toggle('open', !isOpen)
      document.body.style.overflow = !isOpen ? 'hidden' : ''
    }

    if (burger) {
      burger.addEventListener('click', () => toggleMenu())
    }

    if (menu) {
      menu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => toggleMenu(false))
      })
    }

    return () => {
      if (burger) burger.removeEventListener('click', () => {})
    }
  }, [])

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const handleScroll = () => {
      if (window.scrollY > 24) {
        nav.classList.add('scrolled')
      } else {
        nav.classList.remove('scrolled')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const countElements = document.querySelectorAll('[data-count]')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const span = entry.target as HTMLSpanElement
            if (!span.dataset.done) {
              span.dataset.done = '1'
              const target = parseFloat(span.dataset.count || '0')
              const prefix = span.dataset.prefix || ''
              const duration = 1300
              const startTime = performance.now()

              const ease = (t: number) => 1 - Math.pow(1 - t, 3)

              const animate = (currentTime: number) => {
                const elapsed = currentTime - startTime
                const progress = Math.min(elapsed / duration, 1)
                const easedProgress = ease(progress)
                const value = target * easedProgress

                span.textContent = prefix + value.toFixed(0)

                if (progress < 1) {
                  requestAnimationFrame(animate)
                } else {
                  span.textContent = prefix + target.toFixed(0)
                }
              }

              requestAnimationFrame(animate)
            }
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.4, rootMargin: '0px 0px -8% 0px' }
    )

    countElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.25, rootMargin: '0px 0px -8% 0px' }
    )

    revealElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style jsx global>{`
        :root {
          --bg: #2E2640;
          --bg-deep: #221B31;
          --panel: #372E4D;
          --panel-2: #3F3557;
          --accent: #E07B30;
          --accent-soft: rgba(224, 123, 48, 0.18);
          --ink: #FFFFFF;
          --muted: #C3B9D6;
          --muted-2: #8E83A6;
          --line: rgba(255, 255, 255, 0.1);
          --line-strong: rgba(255, 255, 255, 0.18);
          --glow: 1;
          --serif: "Playfair Display", Georgia, serif;
          --sans: "Archivo", system-ui, sans-serif;
          --mono: "JetBrains Mono", monospace;
          --maxw: 1240px;
          --gutter: clamp(20px, 5vw, 64px);
          --radius: 16px;
        }

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
          -webkit-text-size-adjust: 100%;
        }

        body {
          margin: 0;
          background: var(--bg);
          color: var(--ink);
          font-family: var(--sans);
          font-size: 18px;
          line-height: 1.6;
          font-weight: 400;
          letter-spacing: -0.003em;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }

        img {
          max-width: 100%;
          display: block;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        button {
          font-family: inherit;
        }

        .wrap {
          max-width: var(--maxw);
          margin-inline: auto;
          padding-inline: var(--gutter);
        }

        .section {
          position: relative;
          padding-block: clamp(80px, 11vw, 150px);
        }

        .section--deep {
          background: var(--bg-deep);
        }

        .kicker {
          font-family: var(--mono);
          font-size: 0.74rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--accent);
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 0.8em;
        }

        .kicker::before {
          content: '';
          width: 34px;
          height: 2px;
          background: var(--accent);
          display: inline-block;
        }

        .kicker--plain::before {
          display: none;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6em;
          font-family: var(--sans);
          font-weight: 600;
          font-size: 1rem;
          letter-spacing: 0.005em;
          padding: 0.95em 1.5em;
          border-radius: 999px;
          border: 1px solid transparent;
          cursor: pointer;
          transition: transform 0.18s cubic-bezier(0.3, 0.7, 0.4, 1), background 0.2s, color 0.2s,
            border-color 0.2s, box-shadow 0.2s;
          will-change: transform;
        }

        .btn .arr {
          transition: transform 0.2s;
        }

        .btn:hover .arr {
          transform: translateX(3px);
        }

        .btn--primary {
          background: var(--accent);
          color: #1c1426;
          box-shadow: 0 8px 30px -8px rgba(224, 123, 48, 0.7);
        }

        .btn--primary:hover {
          transform: translateY(-2px);
          background: #f0945c;
          box-shadow: 0 14px 40px -10px rgba(224, 123, 48, 0.75);
        }

        .btn--ghost {
          background: transparent;
          color: var(--ink);
          border-color: var(--line-strong);
        }

        .btn--ghost:hover {
          border-color: var(--ink);
          background: rgba(255, 255, 255, 0.05);
          transform: translateY(-2px);
        }

        .btn--lg {
          font-size: 1.08rem;
          padding: 1.1em 1.8em;
        }

        /* NAV */
        .nav {
          position: fixed;
          inset: 0 0 auto 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: 18px var(--gutter);
          transition: background 0.3s, backdrop-filter 0.3s, border-color 0.3s, padding 0.3s;
          border-bottom: 1px solid transparent;
        }

        .nav.scrolled {
          background: rgba(46, 38, 64, 0.82);
          backdrop-filter: blur(18px) saturate(140%);
          -webkit-backdrop-filter: blur(18px) saturate(140%);
          border-bottom-color: var(--line);
          padding-block: 12px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .emblem {
          width: 38px;
          height: 38px;
          flex: none;
          color: var(--ink);
        }

        .brand-name {
          font-family: var(--sans);
          font-weight: 700;
          letter-spacing: 0.02em;
          font-size: 1.18rem;
          line-height: 1;
        }

        .brand-name .dot {
          color: var(--accent);
        }

        .brand-tag {
          display: block;
          font-family: var(--mono);
          font-size: 0.58rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--muted-2);
          margin-top: 4px;
          font-weight: 400;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 34px;
        }

        .nav-links a {
          font-size: 0.94rem;
          color: var(--muted);
          font-weight: 500;
          letter-spacing: 0.005em;
          position: relative;
          transition: color 0.2s;
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -6px;
          height: 2px;
          width: 0;
          background: var(--accent);
          transition: width 0.25s;
        }

        .nav-links a:hover {
          color: var(--ink);
        }

        .nav-links a:hover::after {
          width: 100%;
        }

        .nav-cta {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .nav-burger {
          display: none;
          background: none;
          border: 0;
          cursor: pointer;
          padding: 8px;
        }

        .nav-burger span {
          display: block;
          width: 24px;
          height: 2px;
          background: var(--ink);
          margin: 5px 0;
          transition: 0.25s;
        }

        .mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 99;
          background: var(--bg-deep);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 8px;
          padding: 0 var(--gutter);
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .mobile-menu.open {
          transform: translateX(0);
        }

        .mobile-menu a {
          font-family: var(--serif);
          font-style: italic;
          font-size: 2rem;
          padding: 14px 0;
          color: var(--muted);
          border-bottom: 1px solid var(--line);
        }

        .mobile-menu a:last-of-type {
          border: 0;
        }

        /* HERO */
        .hero {
          position: relative;
          min-height: 100svh;
          display: flex;
          align-items: center;
          padding-top: 120px;
          padding-bottom: 64px;
          overflow: hidden;
        }

        .bg-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(var(--line) 1px, transparent 1px),
            linear-gradient(90deg, var(--line) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 90% 70% at 50% 30%, #000 30%, transparent 78%);
          -webkit-mask-image: radial-gradient(ellipse 90% 70% at 50% 30%, #000 30%, transparent 78%);
          opacity: 0.6;
        }

        .glow {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(70px);
        }

        .glow-1 {
          width: 620px;
          height: 620px;
          top: -220px;
          left: -120px;
          background: radial-gradient(circle, rgba(224, 123, 48, 0.6), transparent 65%);
        }

        .glow-2 {
          width: 760px;
          height: 760px;
          bottom: -380px;
          right: -200px;
          background: radial-gradient(circle, #6e4aa8, transparent 62%);
        }

        .watermark {
          position: absolute;
          right: -2vw;
          top: 50%;
          transform: translateY(-50%);
          font-family: var(--serif);
          font-weight: 700;
          font-style: italic;
          font-size: clamp(18rem, 34vw, 40rem);
          line-height: 0.7;
          color: #fff;
          opacity: 0.035;
          pointer-events: none;
          user-select: none;
          letter-spacing: -0.04em;
        }

        .accent-bar {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 4px;
          background: var(--accent);
          opacity: 0.9;
        }

        .hero .wrap {
          position: relative;
          z-index: 2;
          width: 100%;
        }

        .hero-eyebrow {
          font-family: var(--mono);
          font-size: 0.78rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--accent);
          display: flex;
          align-items: center;
          gap: 1.1em;
          margin-bottom: 36px;
          flex-wrap: wrap;
        }

        .hero-eyebrow .ln {
          width: 48px;
          height: 2px;
          background: var(--accent);
        }

        .hero-eyebrow .sep {
          color: var(--muted-2);
        }

        .hero-eyebrow .end {
          color: var(--muted-2);
          letter-spacing: 0.1em;
        }

        .hero-h1 {
          font-family: var(--serif);
          font-weight: 600;
          font-style: italic;
          font-size: clamp(2.7rem, 8.2vw, 7rem);
          line-height: 0.98;
          letter-spacing: -0.025em;
          margin: 0;
          text-wrap: balance;
        }

        .hero-h1 .tok {
          color: var(--accent);
        }

        .hero-h1 .arrow {
          color: var(--ink);
          font-style: normal;
          opacity: 0.9;
        }

        .hero-sub {
          margin: 34px 0 0;
          max-width: 46ch;
          color: var(--muted);
          font-size: clamp(1.1rem, 1.7vw, 1.4rem);
          line-height: 1.55;
          text-wrap: pretty;
        }

        .hero-sub b {
          color: var(--ink);
          font-weight: 600;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 42px;
        }

        .flow {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 52px;
          flex-wrap: wrap;
        }

        .flow .pill {
          font-family: var(--mono);
          font-size: 0.82rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.7em 1.2em;
          border-radius: 999px;
          border: 1px solid var(--line-strong);
          color: var(--muted);
          background: rgba(255, 255, 255, 0.02);
          transition: 0.25s;
        }

        .flow .pill.active {
          background: var(--accent);
          color: #1c1426;
          border-color: var(--accent);
          font-weight: 600;
        }

        .flow .lnk {
          color: var(--muted-2);
        }

        /* STATS */
        .stats {
          border-block: 1px solid var(--line);
          background: var(--bg-deep);
        }

        .stats .wrap {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }

        .stat {
          padding: clamp(34px, 5vw, 56px) clamp(18px, 2.4vw, 34px);
          border-left: 1px solid var(--line);
        }

        .stat:first-child {
          border-left: 0;
        }

        .stat .num {
          font-family: var(--serif);
          font-weight: 700;
          font-size: clamp(2.8rem, 5.5vw, 4.6rem);
          line-height: 1;
          letter-spacing: -0.02em;
          color: var(--ink);
          display: flex;
          align-items: baseline;
          gap: 0.06em;
        }

        .stat .num .u {
          color: var(--accent);
        }

        .stat .lbl {
          margin-top: 14px;
          font-family: var(--mono);
          font-size: 0.78rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted-2);
          line-height: 1.5;
        }

        /* PROBLEMA */
        .problem-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(40px, 7vw, 96px);
          align-items: start;
        }

        .problem-statement {
          font-family: var(--serif);
          font-weight: 500;
          font-size: clamp(2rem, 4.2vw, 3.4rem);
          line-height: 1.08;
          letter-spacing: -0.02em;
          margin: 0;
          text-wrap: balance;
        }

        .problem-statement em {
          font-style: italic;
          color: var(--accent);
        }

        .problem-body p {
          color: var(--muted);
          font-size: 1.12rem;
          margin: 0 0 20px;
          text-wrap: pretty;
        }

        .problem-body p:first-child {
          color: var(--ink);
        }

        .leaks {
          list-style: none;
          margin: 34px 0 0;
          padding: 0;
          display: grid;
          gap: 2px;
        }

        .leaks li {
          display: flex;
          gap: 16px;
          align-items: baseline;
          padding: 18px 0;
          border-top: 1px solid var(--line);
        }

        .leaks li .ix {
          font-family: var(--mono);
          color: var(--accent);
          font-size: 0.85rem;
          flex: none;
          width: 2.4em;
        }

        .leaks li .tx {
          color: var(--muted);
        }

        .leaks li .tx b {
          color: var(--ink);
          font-weight: 600;
        }

        /* SERVICIOS */
        .svc-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .card {
          position: relative;
          background: var(--panel);
          border: 1px solid var(--line);
          border-radius: var(--radius);
          padding: clamp(28px, 3vw, 40px);
          display: flex;
          flex-direction: column;
          gap: 18px;
          overflow: hidden;
          transition: transform 0.25s cubic-bezier(0.3, 0.7, 0.4, 1), border-color 0.25s,
            background 0.25s, box-shadow 0.25s;
        }

        .card:hover {
          transform: translateY(-6px);
          border-color: var(--line-strong);
          background: var(--panel-2);
          box-shadow: 0 24px 48px rgba(224, 123, 48, 0.15);
        }

        .card .ico {
          width: 46px;
          height: 46px;
          color: var(--accent);
        }

        .card h3 {
          font-family: var(--serif);
          font-weight: 600;
          font-size: 1.55rem;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .card p {
          margin: 0;
          color: var(--muted);
          font-size: 1.02rem;
          line-height: 1.55;
        }

        .card .meta {
          margin-top: auto;
          font-family: var(--mono);
          font-size: 0.74rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted-2);
          padding-top: 8px;
        }

        .card .idx {
          position: absolute;
          top: 24px;
          right: 28px;
          font-family: var(--mono);
          font-size: 0.8rem;
          color: var(--muted-2);
        }

        .card--star {
          background: var(--accent);
          border-color: var(--accent);
          color: #241829;
        }

        .card--star:hover {
          background: #f0945c;
          transform: translateY(-8px);
          box-shadow: 0 32px 64px rgba(224, 123, 48, 0.25);
        }

        .card--star .ico {
          color: #241829;
        }

        .card--star h3 {
          color: #1c1426;
        }

        .card--star p {
          color: #3a2a1a;
        }

        .card--star .meta {
          color: #5a3f24;
        }

        .card--star .idx {
          color: #5a3f24;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5em;
          align-self: flex-start;
          font-family: var(--mono);
          font-size: 0.68rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          background: #241829;
          color: #fff;
          padding: 0.5em 0.9em;
          border-radius: 999px;
          font-weight: 500;
        }

        /* METODOLOGÍA */
        .section-head {
          max-width: 780px;
          margin-bottom: clamp(40px, 6vw, 72px);
        }

        .section-head .kicker {
          margin-bottom: 22px;
        }

        .section-title {
          font-family: var(--serif);
          font-weight: 600;
          font-size: clamp(2.1rem, 4.6vw, 3.6rem);
          line-height: 1.04;
          letter-spacing: -0.02em;
          margin: 0 0 18px;
          text-wrap: balance;
        }

        .section-title em {
          font-style: italic;
          color: var(--accent);
        }

        .section-sub {
          color: var(--muted);
          font-size: clamp(1.05rem, 1.5vw, 1.25rem);
          max-width: 60ch;
          margin: 0;
          text-wrap: pretty;
        }

        .method-flow {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          margin-top: 20px;
        }

        .step {
          position: relative;
          padding: 34px 28px 34px 0;
        }

        .step:not(:last-child) {
          border-right: 1px solid var(--line);
          padding-right: 34px;
        }

        .step:not(:first-child) {
          padding-left: 34px;
        }

        .step:first-child {
          padding-left: 0;
        }

        .step .n {
          font-family: var(--mono);
          font-size: 0.85rem;
          color: var(--accent);
          letter-spacing: 0.1em;
        }

        .step .bignum {
          font-family: var(--serif);
          font-weight: 700;
          font-size: clamp(3.2rem, 6vw, 5rem);
          line-height: 0.9;
          color: var(--ink);
          margin: 8px 0 18px;
          opacity: 0.16;
        }

        .step h4 {
          font-family: var(--serif);
          font-weight: 600;
          font-size: 1.5rem;
          margin: 0 0 12px;
          letter-spacing: -0.01em;
        }

        .step p {
          margin: 0;
          color: var(--muted);
          font-size: 0.98rem;
          line-height: 1.55;
        }

        .step .arrowdot {
          position: absolute;
          top: 46px;
          right: -7px;
          width: 13px;
          height: 13px;
          color: var(--accent);
        }

        .frameworks {
          margin-top: clamp(48px, 6vw, 72px);
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          align-items: center;
        }

        .frameworks .ll {
          font-family: var(--mono);
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted-2);
          margin-right: 8px;
        }

        .frameworks span:not(.ll) {
          font-family: var(--mono);
          font-size: 0.78rem;
          letter-spacing: 0.04em;
          padding: 0.55em 1em;
          border: 1px solid var(--line-strong);
          border-radius: 8px;
          color: var(--muted);
        }

        /* RESULTADOS */
        .bigquote {
          max-width: 1000px;
          margin: 0 auto clamp(56px, 7vw, 88px);
          text-align: center;
        }

        .bigquote blockquote {
          font-family: var(--serif);
          font-weight: 500;
          font-style: italic;
          font-size: clamp(1.8rem, 4vw, 3.1rem);
          line-height: 1.18;
          letter-spacing: -0.015em;
          margin: 0;
          text-wrap: balance;
        }

        .bigquote blockquote em {
          color: var(--accent);
          font-style: italic;
        }

        .bigquote .cite {
          margin-top: 28px;
          font-family: var(--mono);
          font-size: 0.8rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted-2);
        }

        .cases {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .case {
          background: var(--panel);
          border: 1px solid var(--line);
          border-radius: var(--radius);
          padding: clamp(30px, 3.4vw, 44px);
          transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
        }

        .case:hover {
          transform: translateY(-6px);
          border-color: var(--line-strong);
          box-shadow: 0 24px 48px rgba(224, 123, 48, 0.15);
        }

        .case .tag {
          font-family: var(--mono);
          font-size: 0.74rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted-2);
        }

        .case .result {
          font-family: var(--serif);
          font-weight: 700;
          font-size: clamp(3rem, 6vw, 4.6rem);
          line-height: 1;
          color: var(--accent);
          margin: 18px 0 6px;
          letter-spacing: -0.02em;
        }

        .case .rlbl {
          color: var(--ink);
          font-weight: 600;
          font-size: 1.12rem;
        }

        .case p {
          margin: 18px 0 0;
          color: var(--muted);
          font-size: 1rem;
          line-height: 1.55;
        }

        /* TECNOLOGÍAS */
        .tech-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: var(--line);
          border: 1px solid var(--line);
          border-radius: var(--radius);
          overflow: hidden;
        }

        .tech {
          background: var(--bg);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 34px 16px;
          font-family: var(--sans);
          font-weight: 600;
          font-size: 1.05rem;
          letter-spacing: 0.01em;
          color: var(--muted-2);
          transition: color 0.25s, background 0.25s;
          text-align: center;
        }

        .tech:hover {
          color: var(--ink);
          background: var(--panel);
        }

        .tech .d {
          color: var(--accent);
        }

        /* FINAL */
        .final {
          position: relative;
          overflow: hidden;
          background: var(--bg-deep);
        }

        .final .glow-1 {
          width: 680px;
          height: 680px;
          top: auto;
          bottom: -340px;
          left: 50%;
          transform: translateX(-50%);
        }

        .final .wrap {
          position: relative;
          z-index: 2;
          text-align: center;
        }

        .final h2 {
          font-family: var(--serif);
          font-weight: 600;
          font-size: clamp(2.6rem, 6vw, 5rem);
          line-height: 1.02;
          letter-spacing: -0.025em;
          margin: 0 auto 24px;
          max-width: 16ch;
          text-wrap: balance;
        }

        .final h2 em {
          font-style: italic;
          color: var(--accent);
        }

        .final p {
          color: var(--muted);
          font-size: 1.2rem;
          max-width: 52ch;
          margin: 0 auto 40px;
        }

        .final .actions {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .contact-row {
          display: flex;
          gap: 40px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 54px;
        }

        .contact-row a,
        .contact-row span {
          display: flex;
          flex-direction: column;
          gap: 6px;
          align-items: center;
        }

        .contact-row .k {
          font-family: var(--mono);
          font-size: 0.7rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--muted-2);
        }

        .contact-row .v {
          font-size: 1.05rem;
          color: var(--ink);
          font-weight: 500;
          transition: color 0.2s;
        }

        .contact-row a:hover .v {
          color: var(--accent);
        }

        /* FOOTER */
        .footer {
          background: var(--bg-deep);
          border-top: 1px solid var(--line);
          padding: 56px 0 40px;
        }

        .footer .wrap {
          display: flex;
          justify-content: space-between;
          gap: 40px;
          flex-wrap: wrap;
          align-items: flex-start;
        }

        .footer .brand {
          align-items: flex-start;
        }

        .footer .fcol h5 {
          font-family: var(--mono);
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--muted-2);
          margin: 0 0 16px;
          font-weight: 500;
        }

        .footer .fcol a {
          display: block;
          color: var(--muted);
          margin-bottom: 10px;
          font-size: 0.96rem;
          transition: color 0.2s;
        }

        .footer .fcol a:hover {
          color: var(--ink);
        }

        .foot-bottom {
          border-top: 1px solid var(--line);
          margin-top: 44px;
          padding-top: 24px;
          display: flex;
          justify-content: space-between;
          gap: 18px;
          flex-wrap: wrap;
          font-family: var(--mono);
          font-size: 0.74rem;
          letter-spacing: 0.06em;
          color: var(--muted-2);
        }

        /* REVEAL ANIMATION */
        @media (prefers-reduced-motion: no-preference) {
          .reveal {
            opacity: 0;
            transform: translateY(26px);
            transition: opacity 0.7s cubic-bezier(0.2, 0.6, 0.2, 1),
              transform 0.7s cubic-bezier(0.2, 0.6, 0.2, 1);
          }

          .reveal.in {
            opacity: 1;
            transform: none;
          }

          .reveal.d1 {
            transition-delay: 0.08s;
          }

          .reveal.d2 {
            transition-delay: 0.16s;
          }

          .reveal.d3 {
            transition-delay: 0.24s;
          }

          .reveal.d4 {
            transition-delay: 0.32s;
          }
        }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .nav-links {
            display: none;
          }

          .nav .nav-only {
            display: none;
          }

          .nav-burger {
            display: block;
          }

          .stats .wrap {
            grid-template-columns: repeat(2, 1fr);
          }

          .stat:nth-child(odd) {
            border-left: 0;
          }

          .stat:nth-child(n + 3) {
            border-top: 1px solid var(--line);
          }

          .problem-grid {
            grid-template-columns: 1fr;
          }

          .svc-grid {
            grid-template-columns: 1fr;
          }

          .method-flow {
            grid-template-columns: repeat(2, 1fr);
          }

          .step {
            border-right: 0 !important;
            padding: 30px 0 !important;
            border-top: 1px solid var(--line);
          }

          .step .arrowdot {
            display: none;
          }

          .cases {
            grid-template-columns: 1fr;
          }

          .tech-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 760px) {
          body {
            font-size: 17px;
          }

          .hero {
            min-height: auto;
            padding-top: 140px;
          }

          .hero-eyebrow .end {
            display: none;
          }

          .stats .wrap {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 440px) {
          .stats .wrap {
            grid-template-columns: 1fr;
          }

          .stat {
            border-left: 0;
            border-top: 1px solid var(--line);
          }

          .stat:first-child {
            border-top: 0;
          }

          .tech-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>

      <body data-hero="A" data-bg="purple" data-mascot="1" data-headline="serif">
        {/* NAV */}
        <nav className="nav" ref={navRef}>
          <a className="brand" href="#top" aria-label="Yeti BI inicio">
            <svg className="emblem" viewBox="0 0 48 48" aria-hidden="true">
              <circle cx="24" cy="24" r="21" fill="none" stroke="currentColor" strokeWidth="2.4" />
              <g fill="var(--accent)">
                <rect x="13" y="29" width="4.4" height="7" rx="1" />
                <rect x="19.8" y="25" width="4.4" height="11" rx="1" />
                <rect x="26.6" y="20" width="4.4" height="16" rx="1" />
                <rect x="33.4" y="15" width="4.4" height="21" rx="1" />
              </g>
            </svg>
            <span>
              <span className="brand-name" style={{ fontFamily: 'Poppins' }}>
                YETI<span className="dot">·</span>BI
              </span>
              <span className="brand-tag">Data &amp; Analytics</span>
            </span>
          </a>

          <div className="nav-links">
            <a href="#problema">El problema</a>
            <a href="#servicios">Servicios</a>
            <a href="#metodologia">Metodología</a>
            <a href="#resultados">Resultados</a>
          </div>

          <div className="nav-cta">
            <a href="#agenda" className="btn btn--primary nav-only">
              Agenda tu diagnóstico
            </a>
            <button className="nav-burger" ref={burgerRef} aria-label="Abrir menú">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </nav>

        <div className="mobile-menu" ref={mobileMenuRef}>
          <a href="#problema">El problema</a>
          <a href="#servicios">Servicios</a>
          <a href="#metodologia">Metodología</a>
          <a href="#resultados">Resultados</a>
          <a href="#tecnologias">Tecnologías</a>
          <a href="#agenda" className="btn btn--primary">
            Agenda tu diagnóstico
          </a>
        </div>

        {/* HERO */}
        <header className="hero" id="top">
          <div className="bg-grid"></div>
          <motion.div
            className="glow glow-1"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="glow glow-2"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <AnimatedDataViz />

          <div className="watermark" aria-hidden="true">
            YETI
          </div>
          <div className="accent-bar"></div>

          <div className="wrap">
            <div className="hero-eyebrow reveal">
              <span className="ln"></span>
              Process &amp; Operation <span className="sep">·</span> Project Management{' '}
              <span className="sep">·</span> Financial Data Analysis
              <span className="end">···· Yeti BI</span>
            </div>

            <div className="hero-variant va">
              <h1 className="hero-h1 reveal d1">
                Procesos<span className="tok">.optimize()</span>
                <br />
                <span className="arrow">→</span> Datos<span className="tok">.clean()</span>{' '}
                <span className="arrow">→</span> IA<span className="tok">.scale()</span>
              </h1>
              <p className="hero-sub reveal d2">
                Traducimos eficiencia operativa en <b>resultados financieros</b>. Ingeniería de
                producción + tecnología aplicada a la decisión gerencial — no a otro dashboard.
              </p>
              <div className="hero-actions reveal d3">
                <a href="#agenda" className="btn btn--primary btn--lg">
                  Agenda tu diagnóstico <span className="arr">→</span>
                </a>
                <a href="#metodologia" className="btn btn--ghost btn--lg">
                  Ver metodología
                </a>
              </div>
              <div className="flow reveal d4">
                <span className="pill active">Diagnóstica</span>
                <span className="lnk">→</span>
                <span className="pill">Optimiza</span>
                <span className="lnk">→</span>
                <span className="pill">Escala con IA</span>
              </div>
            </div>
          </div>
        </header>

        {/* STATS */}
        <section className="stats" aria-label="Cifras de impacto">
          <div className="wrap">
            <div className="stat reveal">
              <div className="num">
                <span data-count="37">0</span>
                <span className="u">%</span>
              </div>
              <div className="lbl">Reducción de tiempos operativos</div>
            </div>
            <div className="stat reveal d1">
              <div className="num">
                <span className="u">$</span>
                <span data-count="1.2">0</span>
                <span className="u">B</span>
              </div>
              <div className="lbl">COP recuperados en fugas de valor</div>
            </div>
            <div className="stat reveal d2">
              <div className="num">
                <span data-count="40">0</span>
                <span className="u">+</span>
              </div>
              <div className="lbl">Proyectos de mejora entregados</div>
            </div>
            <div className="stat reveal d3">
              <div className="num">
                <span data-count="8">0</span>
              </div>
              <div className="lbl">Años de experiencia en operación</div>
            </div>
          </div>
        </section>

        {/* PROBLEMA */}
        <section className="section section--deep" id="problema">
          <div className="wrap">
            <div className="problem-grid">
              <div>
                <div className="kicker reveal">El problema</div>
                <h2 className="problem-statement reveal d1" style={{ marginTop: '22px' }}>
                  Tu negocio crece. Y aun así, <em>pierde dinero</em>.
                </h2>
              </div>
              <div className="problem-body reveal d2">
                <p>Hay procesos que nadie mide. Ahí se escapa el margen.</p>
                <p>
                  La <b>fuga de valor</b> no aparece en el estado de resultados. Aparece en horas
                  perdidas, reprocesos, capacidad ociosa y decisiones tomadas a ciegas.
                </p>
                <p>
                  No la cerramos con otro tablero. La cerramos midiendo dónde se pierde —y cuánto
                  cuesta en plata.
                </p>
                <ul className="leaks">
                  <li>
                    <span className="ix">01</span>
                    <span className="tx">
                      Tareas manuales repetidas que ya podrían estar <b>automatizadas</b>.
                    </span>
                  </li>
                  <li>
                    <span className="ix">02</span>
                    <span className="tx">
                      Reportes armados a mano que <b>llegan tarde</b> a la decisión.
                    </span>
                  </li>
                  <li>
                    <span className="ix">03</span>
                    <span className="tx">
                      Capacidad instalada <b>ociosa</b> por cuellos de botella no medidos.
                    </span>
                  </li>
                  <li>
                    <span className="ix">04</span>
                    <span className="tx">
                      Decisiones gerenciales con <b>datos desactualizados</b>.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICIOS */}
        <section className="section" id="servicios">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="kicker">Servicios</div>
              <h2 className="section-title">
                Cuatro formas de <em>cerrar la fuga</em>.
              </h2>
              <p className="section-sub">
                Desde un diagnóstico puntual hasta tu área de datos como servicio. Elige según el
                tamaño del problema.
              </p>
            </div>
            <div className="svc-grid">
              <article className="card reveal">
                <span className="idx">01</span>
                <svg
                  className="ico"
                  viewBox="0 0 48 48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  aria-hidden="true"
                >
                  <circle cx="24" cy="24" r="6" />
                  <circle cx="24" cy="8" r="3" />
                  <circle cx="24" cy="40" r="3" />
                  <circle cx="9" cy="24" r="3" />
                  <circle cx="39" cy="24" r="3" />
                  <path d="M24 14v4M24 30v4M15 24h3M30 24h3" />
                </svg>
                <h3>Data Hub Medellín</h3>
                <p>Tu área de datos como servicio, sin montar el equipo interno. Acompañamiento continuo, mes a mes.</p>
                <div className="meta">Acompañamiento continuo</div>
              </article>

              <article className="card reveal d1">
                <span className="idx">02</span>
                <svg
                  className="ico"
                  viewBox="0 0 48 48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  aria-hidden="true"
                >
                  <path d="M7 41h34" />
                  <rect x="10" y="26" width="6" height="12" rx="1" />
                  <rect x="21" y="18" width="6" height="20" rx="1" />
                  <rect x="32" y="9" width="6" height="29" rx="1" />
                </svg>
                <h3>BI Factory</h3>
                <p>Dashboards y reportería que la gerencia sí usa. Una sola fuente de verdad, sin Excel armado a mano.</p>
                <div className="meta">Power BI · Reportería</div>
              </article>

              <article className="card card--star reveal d2">
                <span className="idx">03</span>
                <span className="badge">★ Oferta estrella</span>
                <svg
                  className="ico"
                  viewBox="0 0 48 48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  aria-hidden="true"
                >
                  <path d="M24 5 43 24 24 43 5 24 24 5Z" />
                  <path d="M17 24h14M24 17l7 7-7 7" />
                </svg>
                <h3>Transformación 60 días</h3>
                <p>Un proyecto de mejora con resultado medible en 60 días. Diagnóstico, ejecución y retorno demostrado.</p>
                <div className="meta">Resultado medible garantizado</div>
              </article>

              <article className="card reveal d3">
                <span className="idx">04</span>
                <svg
                  className="ico"
                  viewBox="0 0 48 48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  aria-hidden="true"
                >
                  <circle cx="24" cy="24" r="15" />
                  <circle cx="24" cy="24" r="4" />
                  <path d="M24 9v6M24 33v6M9 24h6M33 24h6" />
                </svg>
                <h3>Tech Ops</h3>
                <p>Operación y mantenimiento de tu stack tecnológico. Que los datos fluyan y nada se caiga.</p>
                <div className="meta">Operación &amp; soporte</div>
              </article>
            </div>
          </div>
        </section>

        {/* METODOLOGÍA */}
        <section className="section section--deep" id="metodologia">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="kicker">Metodología</div>
              <h2 className="section-title">
                De la observación al <em>resultado operando</em>.
              </h2>
              <p className="section-sub">
                Un método de ingeniería de producción, no de consultoría de PowerPoint. Cuatro pasos, cada
                uno con su entregable.
              </p>
            </div>
            <div className="method-flow">
              <div className="step reveal">
                <div className="n">01</div>
                <div className="bignum">01</div>
                <svg
                  className="arrowdot"
                  viewBox="0 0 13 13"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M5 1l6 5.5-6 5.5V8H0V5h5z" />
                </svg>
                <h4>Investigación</h4>
                <p>Vamos a tu operación. Observamos el proceso real, no el del manual.</p>
              </div>
              <div className="step reveal d1">
                <div className="n">02</div>
                <div className="bignum">02</div>
                <svg
                  className="arrowdot"
                  viewBox="0 0 13 13"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M5 1l6 5.5-6 5.5V8H0V5h5z" />
                </svg>
                <h4>Diagnóstico</h4>
                <p>Medimos dónde se fuga el valor y cuánto cuesta, en plata.</p>
              </div>
              <div className="step reveal d2">
                <div className="n">03</div>
                <div className="bignum">03</div>
                <svg
                  className="arrowdot"
                  viewBox="0 0 13 13"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M5 1l6 5.5-6 5.5V8H0V5h5z" />
                </svg>
                <h4>Propuesta</h4>
                <p>Diseñamos la solución y proyectamos el retorno antes de ejecutar.</p>
              </div>
              <div className="step reveal d3">
                <div className="n">04</div>
                <div className="bignum">04</div>
                <h4>Implementación</h4>
                <p>Ejecutamos, medimos el resultado y lo dejamos operando.</p>
              </div>
            </div>
            <div className="frameworks reveal">
              <span className="ll">Marco metodológico</span>
              <span>Toyota Production System</span>
              <span>Teoría de Restricciones</span>
              <span>Lean Six Sigma</span>
              <span>CMMI</span>
            </div>
          </div>
        </section>

        {/* RESULTADOS */}
        <section className="section" id="resultados">
          <div className="wrap">
            <div className="bigquote reveal">
              <div className="kicker kicker--plain" style={{ justifyContent: 'center', marginBottom: '24px' }}>
                Resultados
              </div>
              <blockquote>
                "Dejamos de discutir opiniones. Ahora discutimos <em>números</em> — y las reuniones duran la mitad."
              </blockquote>
              <div className="cite">Gerente de Operaciones · Cliente Yeti BI</div>
            </div>
            <div className="cases">
              <article className="case reveal d1">
                <div className="tag">Spa &amp; Belleza</div>
                <div className="result">
                  <span data-count="34" data-prefix="−">
                    −0
                  </span>
                  %
                </div>
                <div className="rlbl">tiempo de agendamiento</div>
                <p>
                  Automatizamos la reserva y la reportería diaria. El equipo dejó de armar Excel a mano cada
                  noche y la ocupación subió sin contratar.
                </p>
              </article>
              <article className="case reveal d2">
                <div className="tag">Sector Educativo</div>
                <div className="result">
                  <span data-count="28" data-prefix="+">
                    +0
                  </span>
                  %
                </div>
                <div className="rlbl">capacidad utilizada</div>
                <p>
                  Medimos la ocupación real de aulas y docentes. Se reasignó la capacidad ociosa detectada, sin
                  ampliar la planta.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* TECNOLOGÍAS */}
        <section className="section section--deep" id="tecnologias">
          <div className="wrap">
            <div className="section-head reveal" style={{ maxWidth: '640px' }}>
              <div className="kicker">Stack tecnológico</div>
              <h2 className="section-title">
                Las herramientas que <em>dominamos</em>.
              </h2>
            </div>
            <div className="tech-grid reveal d1">
              <div className="tech">
                Power<span className="d"> </span>BI
              </div>
              <div className="tech">Power Apps</div>
              <div className="tech">Power Automate</div>
              <div className="tech">Power Query</div>
              <div className="tech">SQL Server</div>
              <div className="tech">Microsoft Azure</div>
              <div className="tech">Python</div>
              <div className="tech">Microsoft Fabric</div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="section final" id="agenda">
          <motion.div
            className="glow glow-1"
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="wrap">
            <div className="kicker kicker--plain reveal" style={{ justifyContent: 'center', marginBottom: '26px' }}>
              Diagnóstico inicial
            </div>
            <h2 className="reveal d1">
              Encontremos tu <em>fuga de valor</em>.
            </h2>
            <p className="reveal d2">
              Un diagnóstico inicial, sin compromiso. Te mostramos dónde se pierde dinero hoy y cuánto se puede
              recuperar.
            </p>
            <div className="actions reveal d3">
              <a href="mailto:hola@yetibi.co" className="btn btn--primary btn--lg">
                Agenda tu diagnóstico <span className="arr">→</span>
              </a>
              <a href="#" className="btn btn--ghost btn--lg">
                Escríbenos por WhatsApp
              </a>
            </div>
            <div className="contact-row reveal d3">
              <a href="mailto:hola@yetibi.co">
                <span className="k">Email</span>
                <span className="v">hola@yetibi.co</span>
              </a>
              <a href="#">
                <span className="k">WhatsApp</span>
                <span className="v">+57 300 000 0000</span>
              </a>
              <span>
                <span className="k">Ciudad</span>
                <span className="v">Medellín, Colombia</span>
              </span>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="wrap">
            <div className="brand">
              <svg className="emblem" viewBox="0 0 48 48" aria-hidden="true">
                <circle cx="24" cy="24" r="21" fill="none" stroke="currentColor" strokeWidth="2.4" />
                <g fill="var(--accent)">
                  <rect x="13" y="29" width="4.4" height="7" rx="1" />
                  <rect x="19.8" y="25" width="4.4" height="11" rx="1" />
                  <rect x="26.6" y="20" width="4.4" height="16" rx="1" />
                  <rect x="33.4" y="15" width="4.4" height="21" rx="1" />
                </g>
              </svg>
              <span>
                <span className="brand-name">
                  YETI<span className="dot">·</span>BI
                </span>
                <span className="brand-tag">Data &amp; Analytics · Medellín</span>
              </span>
            </div>
            <div className="fcol">
              <h5>Servicios</h5>
              <a href="#servicios">Data Hub Medellín</a>
              <a href="#servicios">BI Factory</a>
              <a href="#servicios">Transformación 60 días</a>
              <a href="#servicios">Tech Ops</a>
            </div>
            <div className="fcol">
              <h5>Compañía</h5>
              <a href="#problema">El problema</a>
              <a href="#metodologia">Metodología</a>
              <a href="#resultados">Resultados</a>
              <a href="#tecnologias">Tecnologías</a>
            </div>
            <div className="fcol">
              <h5>Contacto</h5>
              <a href="mailto:hola@yetibi.co">hola@yetibi.co</a>
              <a href="#">+57 300 000 0000</a>
              <a href="#agenda">Agenda tu diagnóstico</a>
            </div>
          </div>
          <div className="wrap">
            <div className="foot-bottom">
              <span>© 2026 Yeti BI · Business Intelligence &amp; Optimización de Procesos</span>
              <span>TPS · TOC · Lean Six Sigma · CMMI</span>
            </div>
          </div>
        </footer>
      </body>
    </>
  )
}
