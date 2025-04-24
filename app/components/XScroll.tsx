'use client'
import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function XScroll() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['10% start', 'end end'],
  })

  const [isAtTop, setIsAtTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      setIsAtTop(rect.top <= 0)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-200%'])


  return (
    <section className="overflow-hidden flex flex-col">
      {/* Before section */}
      <div className="h-screen w-screen bg-amber-200">scroll down</div>

      {/* Horizontal scroll section */}
      <div ref={containerRef} className="relative h-[300vh] bg-orange-300">
        <motion.div
          style={{ x }}
          className={`h-screen max-w-[200vw] bg-red-300 flex ${
            isAtTop ? 'fixed top-0 left-0' : 'absolute top-0 left-0'
          }`}
        >
          <div className="h-screen w-screen bg-yellow-300 flex items-center justify-center text-4xl">
            One
          </div>
          <div className="h-screen w-screen bg-blue-300 flex items-center justify-center text-4xl">
            Two
          </div>
          <div className="h-screen w-screen bg-pink-300 flex items-center justify-center text-4xl">
            Three
          </div>
        </motion.div>
      </div>

      {/* After section */}
      <div className="h-screen w-screen bg-green-300">scroll up</div>
    </section>
  )
}
