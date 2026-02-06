'use client'

import { motion } from 'framer-motion'
import { urlFor } from '@/sanity/lib/image'
import { useRef, useEffect, useState } from 'react'

// 1. We change the type from any[] to any because data is now the section object
export default function Services({ data }: { data: any }) {
  const [width, setWidth] = useState(0)
  const carousel = useRef<HTMLDivElement>(null)

  // 2. Extract the actual services list from the data object
  const servicesList = data?.services || []

  useEffect(() => {
    if (carousel.current) {
      // 3. We now watch servicesList to recalculate width when items load
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    }
  }, [servicesList])

  // 4. Guard clause: check the list we extracted
  if (!servicesList || servicesList.length === 0) return null

  return (
    <section id="services" className="py-20 bg-slate-50 dark:bg-zinc-950 overflow-hidden">
      <div className="container mx-auto px-4 mb-10">
        {/* 5. Pull the title from Sanity, or default to "Services" */}
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
          {data?.title || "Services"}
        </h2>
        <p className="text-gray-500 mt-2">Drag to explore my offerings</p>
      </div>

      <motion.div ref={carousel} className="cursor-grab active:cursor-grabbing">
        <motion.div 
          drag="x" 
          dragConstraints={{ right: 0, left: -width }}
          className="flex gap-8 px-4"
        >
          {/* 6. Map over servicesList instead of data */}
          {servicesList.map((service: any, index: number) => (
            <motion.div 
              key={service._id || index} 
              className="min-w-[22rem] md:min-w-[28rem] h-[32rem] bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-xl flex flex-col justify-between border border-gray-100 dark:border-zinc-800"
            >
              <div>
                <div className="w-full h-48 rounded-2xl overflow-hidden mb-6">
                  {service.image && (
                    <img 
                      src={urlFor(service.image).width(600).url()} 
                      alt={service.serviceName} 
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-zinc-100">
                  {service.serviceName}
                </h3>
                <p className="text-gray-600 dark:text-zinc-400 mt-4 leading-relaxed">
                  {service.description}
                </p>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-zinc-800">
                <span className="text-sm font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400">
                  Slide {index + 1} / {servicesList.length}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}