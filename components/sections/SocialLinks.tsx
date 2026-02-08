'use client'
import { urlFor } from '@/sanity/lib/image'

export default function BrandBar({ data }: { data: any }) {
  const brands = data?.brandItems;
  if (!brands || brands.length === 0) return null;

  return (
    <div className="flex items-center gap-4">
      {brands.map((item: any, index: number) => (
        <a 
          key={index}
          href={item.url || '#'} 
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform hover:scale-110"
        >
          <img 
            src={urlFor(item.image).width(80).url()} 
            alt={item.alt || "icon"} 
            className="h-8 w-8 object-contain"
          />
        </a>
      ))}
    </div>
  )
}