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

const TIMELINE = [
  {
    year: '2022',
    title: 'Início da Jornada',
    desc: 'Entrei no curso de Engenharia Informática, escrevi o meu primeiro Hello World e nunca mais parei.',
  },
  {
    year: '2023',
    title: 'Primeiros Projetos',
    desc: 'Desenvolvi aplicações web completas, explorei bases de dados e apaixonei-me por arquitetura de software.',
  },
  {
    year: '2024',
    title: 'Crescimento Técnico',
    desc: 'Mergulhei em cloud computing, sistemas distribuídos e contribuí para projetos open source.',
  },
  {
    year: '2025 →',
    title: 'Agora',
    desc: 'A construir projetos ambiciosos, a aprender constantemente e à procura de oportunidades para causar impacto.',
  },
]

export function About() {
  const { ref, inView } = useInView()

  return (
    <section id="sobre" className="py-28 px-6 md:px-12 max-w-5xl mx-auto" ref={ref}>
      <div
        className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {/* Section label */}
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-primary text-xs tracking-widest uppercase">
            <span className="text-muted-foreground">01.</span> sobre mim
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Text block */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-balance mb-6">
              Código, curiosidade
              <br />
              <span className="text-primary">e muita ambição.</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Olá! Sou o Francisco, estudante de Engenharia Informática com uma obsessão
                saudável por resolver problemas complexos através de código limpo e bem pensado.
              </p>
              <p>
                Gosto de trabalhar em toda a stack — do design de APIs ao que o utilizador vê no
                ecrã. Acredito que bom software é aquele que parece simples por fora, mas é
                sólido por dentro.
              </p>
              <p>
                Quando não estou a codar, estou a explorar novos conceitos, a contribuir para
                comunidades de tecnologia ou simplesmente a refinar a arte do debugging às 2 da manhã.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { label: 'Localização', value: 'Portugal' },
                { label: 'Foco', value: 'Full-Stack Dev' },
                { label: 'Disponível', value: 'Estágio / Part-time' },
                { label: 'Línguas', value: 'PT / EN' },
              ].map(({ label, value }) => (
                <div key={label} className="border border-border rounded p-3">
                  <p className="text-xs font-mono text-muted-foreground mb-1">{label}</p>
                  <p className="text-sm font-semibold text-foreground">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="relative pl-6">
            <div className="absolute left-0 top-2 bottom-2 w-px bg-border" />
            <div className="space-y-8">
              {TIMELINE.map(({ year, title, desc }, i) => (
                <div
                  key={year}
                  className={`relative transition-all duration-500`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="absolute -left-[25px] top-1.5 w-3 h-3 rounded-full border-2 border-primary bg-background" />
                  <span className="font-mono text-xs text-primary tracking-widest">{year}</span>
                  <h3 className="font-semibold text-foreground mt-1 mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
