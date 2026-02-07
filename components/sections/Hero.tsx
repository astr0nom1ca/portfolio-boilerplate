import { urlFor } from '@/sanity/lib/image';

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
      <img 
        src={urlFor(data.backgroundImage).width(800).auto('format').url()} 
        alt={data.backgroundImage?.alt || "Professional background image for [Your Name]"} // Add this!
        className="absolute inset-0 w-full h-full object-cover"
        {...({ fetchpriority: "high" } as any)}
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
      <div className="flex flex-col sm:flex-row gap-6 mt-8"> 
        {data.ctaButtons?.map((btn: any) => (
          <a 
            key={btn.ctaText}
            href={btn.ctaLink}
            className="min-h-[48px] min-w-[140px] px-8 py-4 flex items-center justify-center ..." 
          >
            {btn.ctaText}
          </a>
        ))}
      </div>
      </div>
    </section>
  );
}