'use client'

import { m, LazyMotion, domAnimation } from 'framer-motion'
import { urlFor } from '@/sanity/lib/image'
import { useRef, useEffect, useState } from 'react'

export default function Services({ data }: { data: any }) {
  const [width, setWidth] = useState(0)
  const carousel = useRef<HTMLDivElement>(null)
  const servicesList = data?.services || []

  useEffect(() => {
    if (carousel.current) {
      // Recalculate once on mount; images now have fixed heights to prevent layout shifts
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    }
  }, [servicesList])

  if (!servicesList || servicesList.length === 0) return null

  return (
    <LazyMotion features={domAnimation}>
      <section id="services" className="py-20 bg-slate-50 dark:bg-zinc-950 overflow-hidden">
        <div className="container mx-auto px-4 mb-10">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            {data?.title || "Services"}
          </h2>
          <p className="text-gray-500 mt-2">Drag to explore my offerings</p>
        </div>

        {/* Use m.div instead of motion.div for lazy loading */}
        <m.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }} // Only activates when close to scrolling into view
          ref={carousel} 
          className="cursor-grab active:cursor-grabbing"
        >
          <m.div 
            drag="x" 
            dragConstraints={{ right: 0, left: -width }}
            className="flex gap-8 px-4"
          >
            {servicesList.map((service: any, index: number) => (
              <m.div 
                key={service._id || index} 
                className="min-w-[22rem] md:min-w-[28rem] h-[32rem] bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-xl flex flex-col justify-between border border-gray-100 dark:border-zinc-800"
              >
                <div>
                  <div className="w-full h-48 rounded-2xl overflow-hidden mb-6 bg-gray-200 dark:bg-zinc-800">
                    {service.image && (
                      <img 
                        // Added height(400) and auto('format') to reduce payload
                        src={urlFor(service.image).width(600).height(400).auto('format').url()} 
                        alt={service.serviceName} 
                        className="w-full h-full object-cover"
                        loading="lazy" // Services are below-the-fold, lazy load them!
                      />
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-zinc-100">
                    {service.serviceName}
                  </h3>
                  <p className="text-gray-600 dark:text-zinc-400 mt-4 leading-relaxed line-clamp-4">
                    {service.description}
                  </p>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-zinc-800">
                  <span className="text-sm font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400">
                    Slide {index + 1} / {servicesList.length}
                  </span>
                </div>
              </m.div>
            ))}
          </m.div>
        </m.div>
      </section>
    </LazyMotion>
  )
}