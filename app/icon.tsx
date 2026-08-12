import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a12',
          borderRadius: 7,
          color: '#22e58a',
          fontFamily: 'monospace',
          fontWeight: 700,
          fontSize: 18,
        }}
      >
        &gt;_
      </div>
    ),
    size,
  )
}
