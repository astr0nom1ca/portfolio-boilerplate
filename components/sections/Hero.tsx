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
          src={urlFor(data.backgroundImage)
            .width(1600)           // 1. Slightly smaller width (huge savings)
            .quality(75)           // 2. Compress the file (invisible to the eye)
            .auto('format') 
            .url()} 
          className="absolute inset-0 w-full h-full object-cover"
          alt={data.backgroundImage?.alt || "Hero background"}
          loading="eager"     
          // 3. Tells the browser: "Download this FIRST"
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
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        {data?.ctaButtons?.map((button: any, index: number) => (
          <a key={index} href={button.ctaLink || "#"}>
            <button 
              className={`px-8 py-4 transition-colors text-lg font-semibold rounded-full shadow-lg cursor-pointer ${
                index === 0 
                  ? "bg-blue-600 hover:bg-blue-700 text-white" // Primary style for first button
                  : "bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm" // Secondary style for others
              }`}
            >
              {button.ctaText}
            </button>
          </a>
        ))}
      </div>
      </div>
    </section>
  );
}