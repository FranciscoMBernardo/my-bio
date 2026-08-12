'use client'

import { useEffect, useState } from 'react'

const TYPING_STRINGS = [
  'Estudante de Eng. Informática',
  'Full-Stack Developer',
  'Open Source Enthusiast',
  'Builder of Cool Things',
]

function useTypewriter(strings: string[], speed = 70, pause = 1800) {
  const [display, setDisplay] = useState('')
  const [strIndex, setStrIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = strings[strIndex]
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setDisplay(current.slice(0, charIndex + 1))
          if (charIndex + 1 === current.length) {
            setTimeout(() => setDeleting(true), pause)
          } else {
            setCharIndex((c) => c + 1)
          }
        } else {
          setDisplay(current.slice(0, charIndex - 1))
          if (charIndex - 1 === 0) {
            setDeleting(false)
            setStrIndex((s) => (s + 1) % strings.length)
            setCharIndex(0)
          } else {
            setCharIndex((c) => c - 1)
          }
        }
      },
      deleting ? speed / 2 : speed,
    )
    return () => clearTimeout(timeout)
  }, [charIndex, deleting, strIndex, strings, speed, pause])

  return display
}

export function Hero() {
  const typed = useTypewriter(TYPING_STRINGS)

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden dot-grid"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, oklch(0.76 0.22 155 / 0.08) 0%, transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, oklch(0.76 0.22 155 / 0.05) 0%, transparent 70%)',
        }}
      />

      {/* Nav */}
      <header className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 md:px-12 py-5 z-10">
        <span className="font-mono text-primary text-sm tracking-widest uppercase">fb.dev</span>
        <nav className="hidden md:flex items-center gap-8">
          {['Sobre', 'Skills', 'Projetos', 'Contacto'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200 tracking-wide"
            >
              {item}
            </a>
          ))}
        </nav>
        <a
          href="#contacto"
          className="hidden md:inline-flex items-center gap-2 border border-primary/40 text-primary px-4 py-1.5 rounded text-sm font-mono hover:bg-primary/10 transition-colors duration-200"
        >
          <span className="text-primary/60">~/</span> Contacto
        </a>
      </header>

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 max-w-5xl mx-auto w-full">
        <div className="animate-fade-up">
          <span className="font-mono text-primary text-sm tracking-widest">
            <span className="text-muted-foreground">~$</span> whoami
          </span>
        </div>

        <h1 className="mt-4 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-balance animate-fade-up-delay-1">
          Francisco
          <br />
          <span className="text-primary glow-primary">Bernardo</span>
        </h1>

        <div className="mt-4 flex items-center gap-2 animate-fade-up-delay-2">
          <span className="font-mono text-muted-foreground text-lg md:text-xl">&gt;_</span>
          <span className="font-mono text-foreground text-lg md:text-xl">{typed}</span>
          <span className="font-mono text-primary text-lg md:text-xl cursor-blink">|</span>
        </div>

        <p className="mt-6 text-muted-foreground text-base md:text-lg max-w-xl leading-relaxed animate-fade-up-delay-3">
          Apaixonado por construir software elegante e sistemas robustos.
          Sempre a aprender, sempre a codar.
        </p>

        <div className="mt-10 flex flex-wrap gap-4 animate-fade-up-delay-4">
          <a
            href="#projetos"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded font-semibold hover:opacity-90 transition-opacity duration-200"
          >
            Ver Projetos
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 rounded font-semibold hover:border-primary/60 hover:text-primary transition-colors duration-200"
          >
            Fala Comigo
          </a>
        </div>

        {/* Social links */}
        <div className="mt-14 flex items-center gap-6 animate-fade-up-delay-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="mailto:francisco@example.com"
            aria-label="Email"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
        <span className="text-xs font-mono tracking-widest">scroll</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  )
}
