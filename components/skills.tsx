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
    label: 'Fundamentos',
    skills: ['Análise Matemática', 'Álgebra Linear', 'Estruturas Discretas', 'Teoria da Computação', 'Estatística'],
  },
  {
    label: 'Programação',
    skills: ['Programação Procedimental', 'Programação Orientada a Objetos', 'Algoritmos e Estruturas de Dados', 'Estratégias Algorítmicas'],
  },
  {
    label: 'Sistemas & Redes',
    skills: ['Arquitetura de Computadores', 'Sistemas Operativos', 'Redes de Comunicação', 'Protocolos de Comunicação', 'Sistemas Distribuídos'],
  },
  {
    label: 'Software & Dados',
    skills: ['Bases de Dados', 'Engenharia de Software', 'Sistemas de Informação', 'Compiladores', 'Segurança Informática', 'Fundamentos de IA'],
  },
  {
    label: 'Stack Web',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Git'],
  },
]

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

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-border border border-border rounded-lg overflow-hidden">
            {SKILL_GROUPS.map(({ label, skills }, i) => (
              <div
                key={label}
                className={`bg-background p-6 transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">
                  {label}
                </p>
                <ul className="space-y-2.5">
                  {skills.map((skill) => (
                    <li key={skill} className="text-sm text-foreground">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
