import { ImageResponse } from 'next/og';

// ========================================
// Dynamic Open Graph Image
// Auto-served at /opengraph-image by Next.js
// Dimensions: 1200×630 (standard OG)
// ========================================


export const alt = 'Ayan Kumar — Full Stack Developer & AI/ML Enthusiast';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '64px',
          backgroundColor: '#212121',
          position: 'relative',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Dot pattern overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
            backgroundSize: '12px 12px',
          }}
        />

        {/* Yellow accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '6px',
            height: '100%',
            backgroundColor: '#f1e500',
          }}
        />

        {/* Top label */}
        <div
          style={{
            position: 'absolute',
            top: '48px',
            left: '64px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#2FB65D',
            }}
          />
          <span
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '13px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(240,240,240,0.5)',
            }}
          >
            Available for opportunities
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
          <div
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '13px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(240,240,240,0.4)',
            }}
          >
            Portfolio
          </div>

          <div
            style={{
              fontSize: '80px',
              fontWeight: 500,
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              color: '#f0f0f0',
            }}
          >
            Ayan Kumar
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginTop: '8px',
            }}
          >
            <span
              style={{
                fontFamily: 'Arial, sans-serif',
                fontSize: '18px',
                color: 'rgba(240,240,240,0.6)',
                fontWeight: 400,
              }}
            >
              Full Stack Developer
            </span>
            <div
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: '#f1e500',
              }}
            />
            <span
              style={{
                fontFamily: 'Arial, sans-serif',
                fontSize: '18px',
                color: 'rgba(240,240,240,0.6)',
              }}
            >
              AI / ML Enthusiast
            </span>
            <div
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: '#f1e500',
              }}
            />
            <span
              style={{
                fontFamily: 'Arial, sans-serif',
                fontSize: '18px',
                color: 'rgba(240,240,240,0.6)',
              }}
            >
              Open Source Contributor
            </span>
          </div>

          {/* Tech tags */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
            {['TypeScript', 'Next.js', 'Python', 'RAG', 'LLMs'].map((tag) => (
              <div
                key={tag}
                style={{
                  padding: '6px 14px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '12px',
                  letterSpacing: '0.08em',
                  color: 'rgba(240,240,240,0.5)',
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: 'absolute',
            bottom: '48px',
            right: '64px',
            fontFamily: 'Arial, sans-serif',
            fontSize: '13px',
            color: 'rgba(240,240,240,0.3)',
            letterSpacing: '0.08em',
          }}
        >
          portfolio-ayan-kumar.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
