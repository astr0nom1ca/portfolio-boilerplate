import dynamic from 'next/dynamic';
// 1. IMPORT HERO NORMALLY 
// (This ensures it's part of the main bundle for instant LCP)
import Hero from './sections/Hero';

// 2. Keep these dynamic, but add "loading" fallbacks to prevent layout shifts
const About = dynamic(() => import('./sections/About'));
const Projects = dynamic(() => import('./sections/Projects'));
const Skills = dynamic(() => import('./sections/Skills'));
const Services = dynamic(() => import('./sections/Services'));
const Contact = dynamic(() => import('./sections/Contact'), { ssr: false }); // Heavy form? Load on client only.

const sectionComponents: Record<string, any> = {
  hero: Hero, // Now a standard component
  about: About,
  project: Projects,
  skills: Skills,
  service: Services,
  contact: Contact,
};

export default function SectionDispatcher({ sections }: { sections: any[] }) {
  if (!sections || !Array.isArray(sections)) return null;

  return (
    <>
      {sections.map((section, index) => {
        const type = section?._type; 
        const Component = sectionComponents[type];

        if (!Component) {
          console.warn(`⚠️ No component found for type: ${type}`, section);
          return null; 
        }

        // 3. PERFORMANCE HACK: 
        // We only want the Hero to be "Eager". 
        // For heavy sections like Projects or Contact, we can add a simple 
        // loading state so the main thread doesn't choke.
        return <Component key={section._id || index} data={section} />;
      })}
    </>
  );
}