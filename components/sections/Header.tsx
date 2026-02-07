'use client'
import dynamic from 'next/dynamic';

import { useState, useEffect } from 'react'
// CHANGE: Path import for Menu to save scripting time
import Logo from './SocialLinks' 
import NavOverlay from './NavOverlay'
const MenuIcon = dynamic(() => import('lucide-react').then((mod) => mod.Menu), {
  ssr: false,
});

export default function Header({ data }: { data: any }) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    // 1. Wait until the browser is "Idle" before setting up the heavy observer
    // This allows the Hero to paint and the TBT to stay low.
    const idleCallback = window.requestIdleCallback || ((cb) => setTimeout(cb, 1000));

    const cleanup = idleCallback(() => {
      const sectionIds = data?.navItems?.map((item: any) => 
        item.anchor.replace('#', '')
      ).filter(Boolean) || []

      const handleIntersect = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`)
        })
      }

      const observer = new IntersectionObserver(handleIntersect, { 
        rootMargin: '-20% 0px -70% 0px' 
      })

      sectionIds.forEach((id: string) => {
        const el = document.getElementById(id)
        if (el) observer.observe(el)
      })

      return () => observer.disconnect()
    });

    return () => {
      if (typeof cleanup === 'number') window.cancelIdleCallback ? window.cancelIdleCallback(cleanup) : clearTimeout(cleanup);
    }
  }, [data?.navItems])

  if (!data) return null

  return (
    <>
      {/* Header code stays the same */}
      <header className="fixed top-0 w-full z-[60] h-20 flex items-center justify-between px-6 md:px-12 pointer-events-none bg-white/0">
        <div className="pointer-events-auto">
          <Logo data={data} />
        </div>

        <div className="pointer-events-auto">
          <button 
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-3 bg-white/80 backdrop-blur-md border border-gray-200 py-2.5 px-5 rounded-full shadow-sm hover:shadow-lg transition-all duration-300 active:scale-95"
          >
            <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-800">
              Explore
            </span>
            <div className="bg-black text-white p-1.5 rounded-full group-hover:rotate-180 transition-transform duration-500">
              <MenuIcon size={16} />
            </div>
          </button>
        </div>
      </header>

      <NavOverlay 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        navItems={data.navItems}
        activeSection={activeSection}
      />
    </>
  )
}