'use client'

import { useEffect, useRef, useState } from 'react'

function useInView(threshold = 0.15) {
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

const SKILL_GROUPS = [
  {
    label: 'Frontend',
    color: 'oklch(0.76 0.22 155)',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML/CSS'],
  },
  {
    label: 'Backend',
    color: 'oklch(0.65 0.18 220)',
    skills: ['Node.js', 'Python', 'REST APIs', 'GraphQL', 'PostgreSQL'],
  },
  {
    label: 'DevOps & Tools',
    color: 'oklch(0.72 0.16 50)',
    skills: ['Git', 'Docker', 'Linux', 'CI/CD', 'Vercel'],
  },
  {
    label: 'Conceitos',
    color: 'oklch(0.68 0.20 300)',
    skills: ['Algoritmos', 'Estruturas de Dados', 'OOP', 'Sistemas Operativos', 'Redes'],
  },
]

const LEVELS = [
  { label: 'JavaScript / TypeScript', pct: 88 },
  { label: 'Python', pct: 80 },
  { label: 'React / Next.js', pct: 85 },
  { label: 'SQL / Databases', pct: 72 },
  { label: 'Docker / Linux', pct: 65 },
]

function SkillBar({ label, pct, inView }: { label: string; pct: number; inView: boolean }) {
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <span className="text-sm text-foreground">{label}</span>
        <span className="font-mono text-xs text-primary">{pct}%</span>
      </div>
      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: inView ? `${pct}%` : '0%',
            background: 'oklch(0.76 0.22 155)',
            transitionDelay: '200ms',
          }}
        />
      </div>
    </div>
  )
}

export function Skills() {
  const { ref, inView } = useInView()

  return (
    <section id="skills" className="py-28 px-6 md:px-12 bg-card/40" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div
          className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Section label */}
          <div className="flex items-center gap-3 mb-10">
            <span className="font-mono text-primary text-xs tracking-widest uppercase">
              <span className="text-muted-foreground">02.</span> skills
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-12">
            O que sei fazer
            <span className="text-primary">.</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Skill chips grid */}
            <div className="space-y-6">
              {SKILL_GROUPS.map(({ label, color, skills }) => (
                <div key={label}>
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: color }}
                    />
                    <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
                      {label}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="border border-border text-foreground text-xs px-3 py-1.5 rounded font-mono hover:border-primary/60 hover:text-primary transition-colors duration-200 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Proficiency bars */}
            <div>
              <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-6">
                Proficiência
              </p>
              <div className="space-y-5">
                {LEVELS.map(({ label, pct }) => (
                  <SkillBar key={label} label={label} pct={pct} inView={inView} />
                ))}
              </div>

              {/* Terminal block */}
              <div className="mt-8 border border-border rounded bg-background p-4 font-mono text-xs">
                <div className="flex items-center gap-1.5 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-primary/70" />
                  <span className="ml-2 text-muted-foreground">terminal</span>
                </div>
                <p className="text-muted-foreground">
                  <span className="text-primary">fb@portfolio</span>
                  <span className="text-muted-foreground">:</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-muted-foreground">$ </span>
                  <span className="text-foreground">cat skills.json | jq .motto</span>
                </p>
                <p className="mt-1 text-primary">
                  {'"Sempre a aprender, sempre a melhorar."'}
                </p>
                <p className="mt-2 text-muted-foreground">
                  <span className="text-primary">fb@portfolio</span>
                  <span className="text-muted-foreground">:</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-muted-foreground">$ </span>
                  <span className="cursor-blink text-foreground">|</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
