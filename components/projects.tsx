'use client'

import { useEffect, useRef, useState } from 'react'

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

const PROJECTS: {
  id: string
  title: string
  desc: string
  tags: string[]
  featured: boolean
  github: string
  live: string | null
  status: string
}[] = []

function ExternalLinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M6 3H3a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1v-3M10 2h4m0 0v4m0-4L7 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

export function Projects() {
  const { ref, inView } = useInView()
  const featured = PROJECTS.filter((p) => p.featured)
  const others = PROJECTS.filter((p) => !p.featured)

  return (
    <section id="projetos" className="py-28 px-6 md:px-12" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div
          className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Section label */}
          <div className="flex items-center gap-3 mb-10">
            <span className="font-mono text-primary text-xs tracking-widest uppercase">
              <span className="text-muted-foreground">03.</span> projetos
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-12">
            O que tenho
            <span className="text-primary"> construído</span>
            <span className="text-primary">.</span>
          </h2>

          {PROJECTS.length === 0 && (
            <div className="border border-dashed border-border rounded-lg p-10 text-center">
              <p className="font-mono text-sm text-muted-foreground">
                <span className="text-primary">$</span> projetos --status
              </p>
              <p className="text-muted-foreground mt-2">
                A preparar os projetos para mostrar aqui. Volta em breve.
              </p>
            </div>
          )}

          {/* Featured projects */}
          <div className="space-y-6 mb-12">
            {featured.map((project, i) => (
              <article
                key={project.id}
                className={`group relative border border-border rounded-lg p-6 md:p-8 hover:border-primary/50 transition-all duration-300 overflow-hidden ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* Subtle hover bg */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <span className="font-mono text-xs text-muted-foreground">{project.id}</span>
                      <h3 className="text-xl font-bold text-foreground mt-1 group-hover:text-primary transition-colors duration-200">
                        {project.title}
                      </h3>
                    </div>
                    <span className="flex-shrink-0 text-xs font-mono border border-primary/30 text-primary px-2 py-1 rounded">
                      {project.status}
                    </span>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                    {project.desc}
                  </p>

                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-xs text-muted-foreground bg-secondary px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4">
                      <a
                        href={project.github}
                        aria-label={`GitHub — ${project.title}`}
                        className="text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        <GitHubIcon />
                      </a>
                      {project.live && (
                        <a
                          href={project.live}
                          aria-label={`Ver ${project.title} ao vivo`}
                          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
                        >
                          <ExternalLinkIcon />
                          <span>Live</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Other projects grid */}
          {others.length > 0 && (
            <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-6">
              Outros projetos
            </p>
          )}
          <div className="grid sm:grid-cols-2 gap-4">
            {others.map((project, i) => (
              <article
                key={project.id}
                className={`group border border-border rounded-lg p-5 hover:border-primary/40 transition-all duration-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${(i + featured.length) * 100 + 200}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <a
                      href={project.github}
                      aria-label={`GitHub — ${project.title}`}
                      className="hover:text-primary transition-colors duration-200"
                    >
                      <GitHubIcon />
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        aria-label={`Ver ${project.title} ao vivo`}
                        className="hover:text-primary transition-colors duration-200"
                      >
                        <ExternalLinkIcon />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
