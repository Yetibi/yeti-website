import type { Metadata } from 'next'
import { MotionConfig } from 'motion/react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Yeti BI - Consultoría en Inteligencia de Negocios y Optimización de Procesos',
  description: 'Transformamos datos en decisiones. Procesos → Datos limpios → IA escalada. Medellín.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="bg-[#2E2640] text-white antialiased">
        <MotionConfig reducedMotion="user">
          {children}
        </MotionConfig>
      </body>
    </html>
  )
}
