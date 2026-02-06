'use client'

import { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'
import Logo from './SocialLinks' // Import the new Logo component
import NavOverlay from './NavOverlay'

export default function Header({ data }: { data: any }) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
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
  }, [data?.navItems])

  if (!data) return null

  return (
    <>
      <header className="fixed top-0 w-full z-[60] h-20 flex items-center justify-between px-6 md:px-12 pointer-events-none bg-white">
        
        {/* Logo Slot - Using the new component */}
        <div className="pointer-events-auto">
        <Logo data={data} />
        </div>

        {/* Trigger Button Slot */}
        <div className="pointer-events-auto">
          <button 
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-3 bg-white/80 backdrop-blur-md border border-gray-200 py-2.5 px-5 rounded-full shadow-sm hover:shadow-lg transition-all duration-300 active:scale-95"
          >
            <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-800">
              Explore
            </span>
            <div className="bg-black text-white p-1.5 rounded-full group-hover:rotate-180 transition-transform duration-500">
              <Menu size={16} />
            </div>
          </button>
        </div>
      </header>

      {/* Full-Screen Overlay */}
      <NavOverlay 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        navItems={data.navItems}
        activeSection={activeSection}
      />
    </>
  )
}