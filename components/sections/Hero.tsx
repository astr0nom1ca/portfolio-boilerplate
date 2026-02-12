import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';

export default function Hero({ data }: { data: any }) {
  if (!data) return null;

  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-slate-900">
      
      {/* 1. Background Image - Ensuring it is the absolute base layer */}
      {data?.backgroundImage?.asset && (
        <div className="absolute inset-0 z-0"> 
          <Image
            src={urlFor(data.backgroundImage).width(1920).quality(80).auto('format').url()}
            alt={data.backgroundImage?.alt || "Hero Background"}
            fill 
            priority 
            className="object-cover" 
            sizes="100vw"
          />
          {/* 2. Overlay: Sits directly on top of the image, but under the text */}
          <div className="absolute inset-0 bg-slate-900/60 z-10" />
        </div>
      )}
      
      {/* 3. Content: Must have z-20 to sit above the image AND the overlay */}
      <div className="relative z-20 text-center px-6 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">
          {data?.heading || "Your Headline Here"}
        </h1>
        
        {data?.subheading && (
          <p className="mt-6 text-xl md:text-2xl text-gray-200 leading-relaxed">
            {data.subheading}
          </p>
        )}
        
        <div className="flex flex-col sm:flex-row gap-6 mt-8 items-center justify-center w-full"> 
          {data.ctaButtons?.map((btn: any, index: number) => (
            <a 
              key={`${btn.ctaText}-${index}`} // Combined key for safety
              href={btn.ctaLink}
              className={`
                min-h-[56px] min-w-[160px] px-8 py-4 
                flex items-center justify-center 
                rounded-full font-bold text-center
                transition-all duration-300 active:scale-95
                ${index === 0 
                  ? "bg-white text-black hover:bg-sky-600 hover:text-white shadow-lg" 
                  : "bg-transparent border-2 border-white text-white hover:bg-white/10"
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