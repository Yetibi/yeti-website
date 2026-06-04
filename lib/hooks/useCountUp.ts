import { useEffect, useRef, useState } from 'react'

export function useCountUp(target: number, duration: number = 1300) {
  const [count, setCount] = useState(0)
  const hasRunRef = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRunRef.current) {
            hasRunRef.current = true

            // Easing function (ease-out-cubic)
            const ease = (t: number) => 1 - Math.pow(1 - t, 3)

            const startTime = performance.now()
            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime
              const progress = Math.min(elapsed / duration, 1)
              const easedProgress = ease(progress)
              const value = target * easedProgress

              setCount(parseFloat(value.toFixed(2)))

              if (progress < 1) {
                requestAnimationFrame(animate)
              } else {
                setCount(target)
              }
            }

            requestAnimationFrame(animate)
          }
        })
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    )

    const element = document.currentScript?.previousElementSibling
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [target, duration])

  return count
}
