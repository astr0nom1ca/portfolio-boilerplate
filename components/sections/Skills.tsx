'use client'

import { urlFor } from '@/sanity/lib/image'

export default function Skills({ data }: { data: any }) {
  if (!data?.skillList) return null;

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{data.title}</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {data.skillList.map((skill: any, index: number) => (
            <div 
              key={index} 
              className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
            >
              {skill.icon && (
                <img 
                  src={urlFor(skill.icon).width(60).height(60).url()} 
                  alt={skill.name}
                  className="w-12 h-12 mb-4 object-contain grayscale hover:grayscale-0 transition-all"
                />
              )}
              <span className="font-medium text-sm text-gray-600 dark:text-gray-300">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}