import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image'

export default function Hero({ data }: { data: any }) {
  // 1. Guard clause: prevents crashing if data is missing
  if (!data) return null;

  // Debug log to confirm data structure in the browser console
  //console.log("Hero Image Data:", data.backgroundImage);

  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-slate-900">
      
      {/* 2. Background Image Logic */}
      {data?.backgroundImage?.asset && (
        <>
    <Image
                // Use urlFor to target the asset
                src={urlFor(data.backgroundImage).width(1920).quality(80).url()}
                alt={data.backgroundImage?.alt || "Hero Background"}
                
                // 'fill' makes it act like a background-image
                fill 
                
                // 'priority' is the secret sauce for Hero sections
                priority 
                
                // Ensures it stays behind your text
                className="object-cover z-0" 
                
                // Tells the browser exactly how much space this takes at different screen sizes
                sizes="100vw"
            />
          {/* 3. Overlay: Ensures the text is always readable over the image */}
          <div className="absolute inset-0 bg-slate-900/60" />
        </>
      )}
      
      {/* 4. Content: Using z-10 to stay on top of the image and overlay */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">
          {data?.heading || "Your Headline Here"}
        </h1>
        
        {data?.subheading && (
          <p className="mt-6 text-xl md:text-2xl text-gray-200 leading-relaxed">
            {data.subheading}
          </p>
        )}
        
      {/* 4. Dynamic CTA Buttons Array */}
      {/* Wrap your buttons in a div with a larger gap */}
      <div className="flex flex-col sm:flex-row gap-6 mt-8 items-center justify-center w-full"> 
        {data.ctaButtons?.map((btn: any, index: number) => (
          <a 
            key={btn.ctaText}
            href={btn.ctaLink}
            // Index 0 gets a solid black/white background, others get an outline style
            className={`
              min-h-[56px] min-w-[160px] px-8 py-4 
              flex items-center justify-center 
              rounded-full font-bold text-center
              transition-all duration-300 active:scale-95
              ${index === 0 
                ? "bg-black text-white dark:bg-white dark:text-black hover:bg-sky-600 hover:text-white shadow-lg" 
                : "bg-transparent border-2 border-black text-black dark:border-white dark:text-white hover:bg-black/5 dark:hover:bg-white/10"
              }
            `}
          >
            {btn.ctaText}
          </a>
        ))}
      </div>
      </div>
    </section>
  );
}