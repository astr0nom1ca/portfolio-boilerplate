'use client'

import { useEffect } from 'react' // Added this
import Link from 'next/link'
import { X } from 'lucide-react'

interface NavOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: any[];
  activeSection: string;
}

export default function NavOverlay({ isOpen, onClose, navItems, activeSection }: NavOverlayProps) {
  
  // This is the missing piece! 
  // It stops the body from scrolling when the menu is open.
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    // Cleanup function: ensures scroll is restored if component unmounts
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <div className={`
      fixed inset-0 z-[100] bg-black transition-all duration-500 ease-in-out
      ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
    `}>
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-3 text-white hover:rotate-90 transition-transform duration-300"
      >
        <X size={32} />
      </button>

      {/* Navigation Links */}
      <nav className="h-full flex flex-col items-center justify-center gap-8">
        {navItems?.map((item) => (
          <Link 
            key={item._key} 
            href={item.anchor} 
            onClick={onClose}
            className={`text-4xl md:text-6xl font-bold transition-all hover:italic ${
              activeSection === item.anchor ? 'text-blue-500' : 'text-white/40 hover:text-white'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}