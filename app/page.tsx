import { client } from '@/sanity/lib/client';
import Header from '@/components/sections/Header';
import SectionDispatcher from '@/components/SectionDispatcher';
import { draftMode } from 'next/headers'; // <--- 1. ADD THIS IMPORT

const token = process.env.SANITY_API_READ_TOKEN;

// 2. FIXED: Added 'isDraftMode' to the parentheses here so the function can use it
async function getData(slug: string = "index", isDraftMode: boolean = false) {
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
  
  return await client.fetch(
    query, 
    { slug }, 
    { 
      token, 
      perspective: isDraftMode ? 'previewDrafts' : 'published',
      // useCdn must be false for drafts to show up
      useCdn: isDraftMode ? false : true, 
      next: { 
        revalidate: isDraftMode ? 0 : 60 
      } 
    }
  );
}

export default async function Page({ searchParams }: { searchParams: Promise<{ slug?: string }> }) {
  // 3. FIXED: We check if draft mode is active here...
  const { isEnabled: isDraftMode } = await draftMode();
  
  const resolvedParams = await searchParams;
  const slug = resolvedParams?.slug || "index";
  
  // 4. FIXED: ...and then we "pass" it into getData
  const { page, header } = await getData(slug, isDraftMode);

  return (
    <main>
      <Header data={header} />
      <SectionDispatcher sections={page?.sections || []} />
    </main>
  );
}