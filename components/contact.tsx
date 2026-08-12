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

const CONTACT_LINKS = [
  {
    label: 'Email',
    value: 'francisco@example.com',
    href: 'mailto:francisco@example.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'github.com/franciscobernardo',
    href: 'https://github.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/franciscobernardo',
    href: 'https://linkedin.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
]

export function Contact() {
  const { ref, inView } = useInView()

  return (
    <>
      <section id="contacto" className="py-28 px-6 md:px-12 bg-card/40" ref={ref}>
        <div className="max-w-5xl mx-auto">
          <div
            className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Section label */}
            <div className="flex items-center gap-3 mb-10">
              <span className="font-mono text-primary text-xs tracking-widest uppercase">
                <span className="text-muted-foreground">04.</span> contacto
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Left: CTA */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                  Vamos falar
                  <span className="text-primary">?</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Estou sempre aberto a novas oportunidades, colaborações ou simplesmente
                  uma boa conversa sobre tecnologia. A minha inbox está aberta.
                </p>

                <div className="space-y-4">
                  {CONTACT_LINKS.map(({ label, value, href, icon }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="group flex items-center gap-4 border border-border rounded-lg px-5 py-4 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
                    >
                      <span className="text-muted-foreground group-hover:text-primary transition-colors duration-200 flex-shrink-0">
                        {icon}
                      </span>
                      <div>
                        <p className="text-xs font-mono text-muted-foreground mb-0.5">{label}</p>
                        <p className="text-sm text-foreground group-hover:text-primary transition-colors duration-200">
                          {value}
                        </p>
                      </div>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="ml-auto text-muted-foreground group-hover:text-primary transition-colors duration-200"
                        aria-hidden="true"
                      >
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* Right: terminal message */}
              <div className="border border-border rounded-lg overflow-hidden">
                <div className="bg-secondary/50 px-4 py-2.5 flex items-center gap-2 border-b border-border">
                  <span className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-primary/60" />
                  <span className="ml-2 font-mono text-xs text-muted-foreground">message.sh</span>
                </div>
                <div className="p-6 font-mono text-sm space-y-3">
                  <p className="text-muted-foreground">
                    <span className="text-primary">$</span> echo &quot;Olá Francisco&quot;
                  </p>
                  <p className="text-foreground pl-4">Olá Francisco</p>
                  <p className="text-muted-foreground mt-2">
                    <span className="text-primary">$</span> send-message \
                  </p>
                  <p className="text-muted-foreground pl-4">
                    --para francisco@example.com \
                  </p>
                  <p className="text-muted-foreground pl-4">
                    --assunto &quot;Quero trabalhar contigo&quot; \
                  </p>
                  <p className="text-muted-foreground pl-4">
                    --corpo &quot;Tenho um projeto incrível...&quot;
                  </p>
                  <p className="text-primary mt-2">
                    ✓ Mensagem enviada com sucesso!
                  </p>
                  <p className="text-muted-foreground">
                    <span className="text-primary">$</span>{' '}
                    <span className="cursor-blink">|</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6 md:px-12">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-muted-foreground">
            <span className="text-primary">fb@portfolio</span>:~$ built with Next.js & Tailwind
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Francisco Bernardo
          </p>
          <div className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>disponível para oportunidades</span>
          </div>
        </div>
      </footer>
    </>
  )
}
