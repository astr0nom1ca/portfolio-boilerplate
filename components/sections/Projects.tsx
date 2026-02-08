import { urlFor } from '@/sanity/lib/image';

// Keep the interface if you like it, but we'll use 'any' for the component prop 
// to match the Dispatcher's flexible nature.
export default function Projects({ data }: { data: any }) {
  
  // 1. Extract the projects list from the data object
  // This matches the "projects": *[_type == "project"] key in your GROQ query
  const projectList = data?.projects || [];

  // 2. Guard clause: If no projects are found, don't render the section
  if (projectList.length === 0) return null;

  return (
    <section id="projects" className="p-10 max-w-7xl mx-auto scroll-mt-20">
      {/* 3. Use the title from the Sanity Section document, with a fallback */}
      <h1 className="text-3xl font-bold mb-8 text-center">
        {data?.title || "My Portfolio"}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 4. Map over the extracted projectList */}
        {projectList.map((project: any, index: number) => (
          <div key={project._id || index} className="group border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition dark:border-zinc-800">
            {project.image && (
              <div className="overflow-hidden">
                <img 
                  src={urlFor(project.image).width(800).url()} 
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading='eager'
                  fetchPriority='high'
                />
              </div>
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <p className="text-gray-600 dark:text-zinc-400 my-3 line-clamp-2">
                {project.description}
              </p>
              {project.link && (
                <a 
                  href={project.link} 
                  className="inline-block font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}