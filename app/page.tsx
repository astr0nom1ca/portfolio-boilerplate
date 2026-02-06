import { client } from '@/sanity/lib/client';
import Header from '@/components/sections/Header';
import SectionDispatcher from '@/components/SectionDispatcher';

async function getData() {
  /**
   * We fetch the 'page' document and 'header' singleton.
   * Inside 'sections', we use '->' to dereference the linked documents.
   * This retrieves all fields (...) and the _type for each section.
   */
const query = `{
  "page": *[_type == "page" && title == "Home"][0] {
    sections[]-> {
      ...,
      _id,
      _type,
      // 1. HERO: Ensure the background image asset is fully expanded
  _type == "hero" => {
  heading,
  subheading,
  ctaText,
  ctaLink,
  backgroundImage {
    asset,
    alt
  },
  ctaButtons[] {
    ctaText,
    ctaLink
  }
      },
      // 2. PROJECTS: Pull all project documents into the 'projects' array
      _type == "project" => {
        "projects": *[_type == "project"] | order(_createdAt desc) {
          title,
          description,
          "image": image { asset->, alt },
          link,
          performanceScore
        }
      },
      // 3. SERVICES: Pull all service documents into the 'services' array
      _type == "service" => {
        "services": *[_type == "service"] | order(_createdAt asc) {
          serviceName,
          description,
          "image": image { asset->, alt }
        }
      },
      // 4. SKILLS: Ensure the skill list is pulled if it's a singleton reference
      _type == "skills" => {
        title,
        skillList[] {
          name,
          icon
        }
      }
    }
  },
  "header": *[_type == "header"][0] {
    navItems,
    brandItems[] { 
      ...,
      "image": image { asset-> } 
    }
  }
}`;
  return await client.fetch(query, {}, { next: { revalidate: 30 } });
}

export default async function Page() {
  const { page, header } = await getData();

  return (
    <main>
      {/* Header usually stays global/fixed */}
      <Header data={header} />
      
      {/* The Dispatcher now handles Hero, About, Skills, Services, 
        Projects, and Contact based on Sanity order
      */}
     <SectionDispatcher sections={page?.sections || []} />
      
      {/* You can add a global Footer here if you have one */}
    </main>
  );
}