'use client'

import { useState } from 'react'
//import { Menu} from 'lucide-react'; // Clean syntax, now optimized by config               <!--<Menu size={16} />-->
import Logo from './SocialLinks' 
import NavOverlay from './NavOverlay'

export default function Header({ data }: { data: any }) {
  const [isOpen, setIsOpen] = useState(false)

  // REMOVED: The entire useEffect and IntersectionObserver. 
  // This is a diagnostic test to see if the observer is the 2.3s culprit.

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
            className="group flex items-center gap-3 bg-white/80 backdrop-blur-md border border-gray-200 py-2.5 px-5 rounded-full shadow-sm hover:shadow-lg transition-all duration-300 active:scale-95"
          >
            <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-800">
              Explore
            </span>
            <div className="bg-black text-white p-1.5 rounded-full group-hover:rotate-180 transition-transform duration-500">

            </div>
          </button>
        </div>
      </header>

      <NavOverlay 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        navItems={data.navItems}
        activeSection="" // Keep it empty for the test
      />
    </>
  )
}