import { client } from '@/sanity/lib/client';
import Header from '@/components/sections/Header';
import SectionDispatcher from '@/components/SectionDispatcher';

// Updated to accept a slug parameter
async function getData(slug: string = "index") {
  const query = `{
    "page": *[_type == "page" && (slug.current == $slug || title == "Home")][0] {
      sections[]-> {
        _id,
        _type,
        _type == "hero" => {
          heading,
          subheading,
          backgroundImage { asset, alt },
          ctaButtons[] { ctaText, ctaLink }
        },
        _type == "project" => {
          "projects": *[_type == "project"] | order(_createdAt desc) {
            title,
            description,
            "image": image { asset, alt }, 
            link,
            performanceScore
          }
        },
        _type == "about" => {
          title,
          "image": profileImage { asset, alt },
          bio,
          stats[] { label, value }
        },
        _type == "service" => {
          "services": *[_type == "service"] | order(_createdAt asc) {
            serviceName,
            description,
            "image": image { asset, alt }
          }
        },
        _type == "skills" => {
          title,
          skillList[] { name, icon }
        }
      }
    },
    "header": *[_type == "header"][0] {
      navItems,
      brandItems[] { 
        "image": image { asset } 
      }
    }
  }`;
  
  // Pass the slug variable to the fetch call
  return await client.fetch(query, { slug }, { next: { revalidate: 60 } });
}

export default async function Page({ searchParams }: { searchParams: Promise<{ slug?: string }> }) {
  // Capture the slug from search parameters (e.g., ?slug=home)
  const resolvedParams = await searchParams;
  const slug = resolvedParams?.slug || "index";
  
  const { page, header } = await getData(slug);

  return (
    <main>
      <Header data={header} />
      <SectionDispatcher sections={page?.sections || []} />
    </main>
  );
}