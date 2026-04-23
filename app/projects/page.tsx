import { projects } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 relative z-10 pointer-events-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-[0_0_10px_#00f0ff]">
          DỰ ÁN NỔI BẬT
        </h1>
        <p className="text-[#ff00ff] font-medium max-w-2xl mx-auto">
          Khám phá những sản phẩm và giải pháp công nghệ tôi đã xây dựng trong hành trình chinh phục không gian lập trình.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => {
          const projectLink = project.link || project.github || "#";
          
          return (
            <div 
              key={project.id}
              className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-[#00f0ff]/50 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.3)] flex flex-col"
            >
              {/* Project Image Link */}
              <Link href={projectLink} className="relative h-48 w-full overflow-hidden block">
                <Image
                  src={project.image || "/images/sun.jpg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-[#00f0ff] text-black font-bold px-4 py-2 rounded-full text-xs shadow-[0_0_15px_#00f0ff]">
                    XEM DỰ ÁN
                  </span>
                </div>
              </Link>

              {/* Project Content */}
              <div className="p-6 flex-1 flex flex-col">
                <Link href={projectLink}>
                  <h3 className="text-xl font-bold text-[#00f0ff] mb-2 hover:text-[#ff00ff] transition-colors">
                    {project.title}
                  </h3>
                </Link>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="text-[10px] px-2 py-1 bg-[#00f0ff]/10 border border-[#00f0ff]/20 text-[#00f0ff] rounded-md font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom Links & Button */}
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {project.github && (
                      <Link 
                        href={project.github}
                        title="GitHub Repository"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </Link>
                    )}
                    {project.link && (
                      <Link 
                        href={project.link}
                        title="Live Demo"
                        className="text-gray-400 hover:text-[#ff00ff] transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </Link>
                    )}
                  </div>
                  
                  <Link 
                    href={projectLink}
                    className="text-[10px] font-bold text-[#00f0ff] uppercase tracking-widest hover:underline"
                  >
                    Chi tiết &rarr;
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
