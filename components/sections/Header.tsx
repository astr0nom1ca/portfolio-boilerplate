'use client'

import { useState } from 'react'
import { Icons } from '../Icons';
import Logo from './SocialLinks' 
import NavOverlay from './NavOverlay'

export default function Header({ data }: { data: any }) {
  const [isOpen, setIsOpen] = useState(false)

  if (!data) return null

  return (
    <>
      <header className="fixed top-0 w-full z-[60] h-20 flex items-center justify-between px-6 md:px-12 pointer-events-none bg-white/0">
        <div className="pointer-events-auto">
          <Logo data={data} />
        </div>

        <div className="pointer-events-auto">
          <button 
            onClick={() => setIsOpen(true)}
            aria-label="Open navigation"
            className="group flex items-center gap-3 bg-white/80 backdrop-blur-md border border-gray-200 py-2.5 px-5 rounded-full shadow-sm hover:shadow-lg transition-all duration-300 active:scale-95"
          >
            <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-800">
              Explore
            </span>
            <div className="bg-black text-white p-1.5 rounded-full group-hover:rotate-180 transition-transform duration-500">
              {/* SWAPPED: Use Icons.Menu with a fixed width/height */}
              <Icons.Menu className="w-4 h-4" />
            </div>
          </button>
        </div>
      </header>

      <NavOverlay 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        navItems={data.navItems}
        activeSection="" 
      />
    </>
  )
}