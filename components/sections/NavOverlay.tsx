'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Icons } from '../Icons';         

interface NavOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: any[];
  activeSection: string;
}

export default function NavOverlay({ isOpen, onClose, navItems, activeSection }: NavOverlayProps) {
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
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
        aria-label="Close menu"
        className="absolute top-6 right-6 p-3 text-white hover:rotate-90 transition-transform duration-300"
      >
        {/* SWAPPED: Lucide X for Icons.X */}
        <Icons.X className="w-8 h-8" />
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