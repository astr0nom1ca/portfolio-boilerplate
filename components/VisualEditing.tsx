'use client'
import { VisualEditing } from 'next-sanity/visual-editing'
import { useEffect } from 'react'

export default function VisualEditingComponent() {
  useEffect(() => {
    // This enables the "handshake" between the Studio and your App
    if (window.self !== window.top) {
      console.log('Visual Editing enabled')
    }
  }, [])

  return <VisualEditing />
}
