import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 100px',
          background: '#0a0a12',
          backgroundImage:
            'radial-gradient(circle at 80% 20%, rgba(34,229,138,0.15) 0%, transparent 50%)',
          fontFamily: 'monospace',
        }}
      >
        <div style={{ display: 'flex', color: '#22e58a', fontSize: 28, letterSpacing: 4 }}>
          ~$ whoami
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            color: '#f5f5f7',
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 1.1,
            marginTop: 24,
          }}
        >
          <span>Francisco</span>
          <span style={{ color: '#22e58a' }}>Bernardo</span>
        </div>
        <div style={{ display: 'flex', color: '#9a9aa5', fontSize: 32, marginTop: 32 }}>
          Estudante de Engenharia Informática — Universidade de Coimbra
        </div>
      </div>
    ),
    size,
  )
}
