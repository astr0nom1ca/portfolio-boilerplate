import { PortableText } from '@portabletext/react'
import { urlFor } from '@/sanity/lib/image'

export default function About({ data }: { data: any }) {
  // 1. Safety Guard: If the reference is broken or data hasn't loaded
  if (!data) return null;

  return (
    <section id="about" className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left: Image & Stats */}
        <div className="relative">
          {data.profileImage && (
            <img 
              // Using .width(600) is great for Lighthouse (Image Optimization)
              src={urlFor(data.profileImage).width(600).auto('format').url()} 
              alt={data.profileImage?.alt || "Profile Image"} 
              className="rounded-2xl shadow-xl w-full object-cover aspect-[4/5]"
            />
          )}
           
          {/* Stats Box - Only render if stats array exists and has items */}
          {data.stats && data.stats.length > 0 && (
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg hidden lg:block">
              <div className="grid grid-cols-2 gap-8">
                {data.stats.map((stat: any, i: number) => (
                  <div key={stat._key || i}> {/* Use Sanity's _key if available */}
                    <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Content */}
        <div>
          <h2 className="text-4xl font-bold mb-6">{data.title || "About Me"}</h2>
          <div className="prose prose-blue text-gray-600 max-w-none">
            {/* 2. PortableText Guard: Value must be an array or it will throw an error */}
            {data.bio ? (
              <PortableText value={data.bio} />
            ) : (
              <p>No biography content added yet.</p>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}