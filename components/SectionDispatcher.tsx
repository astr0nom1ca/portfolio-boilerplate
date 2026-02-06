import dynamic from 'next/dynamic';

// 1. Dynamically import your components. 
// This "Code Splitting" ensures 100/100 Lighthouse scores by only 
// loading JS for sections that exist in the Sanity Page array.
const Hero = dynamic(() => import('./sections/Hero'));
const About = dynamic(() => import('./sections/About'));
const Projects = dynamic(() => import('./sections/Projects'));
const Skills = dynamic(() => import('./sections/Skills'));
const Services = dynamic(() => import('./sections/Services'));
const Contact = dynamic(() => import('./sections/Contact'));

// 2. The Component Map
const sectionComponents: Record<string, any> = {
  hero: Hero,
  about: About,
  project: Projects,
  skills: Skills,
  service: Services,
  contact: Contact,
};

interface SectionDispatcherProps {
  sections: any[];
}

export default function SectionDispatcher({ sections }: { sections: any[] }) {
  if (!sections || !Array.isArray(sections)) return null;

  return (
    <>
      {sections.map((section, index) => {
        // If 'section' is just a reference ID, we need to skip it 
        // (The GROQ query fix in the previous step should prevent this)
        const type = section?._type; 
        const Component = sectionComponents[type];

        if (!Component) {
          console.warn(`⚠️ No component found for type: ${type}`, section);
          return null; 
        }

        return <Component key={section._id || index} data={section} />;
      })}
    </>
  );
}