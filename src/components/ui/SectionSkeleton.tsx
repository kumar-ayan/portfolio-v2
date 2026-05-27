'use client';

// ========================================
// SectionSkeleton — shimmer placeholder shown while
// a dynamically-imported section is loading.
// Matches the section height and editorial style so
// the page doesn't jump when the real component mounts.
// ========================================

interface SectionSkeletonProps {
  height?: string;
}

export function SectionSkeleton({ height = 'clamp(24rem, 50vh, 40rem)' }: SectionSkeletonProps) {
  return (
    <div
      aria-busy="true"
      aria-label="Loading section…"
      style={{
        minHeight: height,
        backgroundColor: '#f0f0f0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Shimmer sweep */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
          animation: 'skeleton-shimmer 1.6s ease-in-out infinite',
        }}
      />

      {/* Faint editorial lines mimicking content layout */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(4rem, 10vh, 8rem)',
          left: 'clamp(1.25rem, 5vw, 5rem)',
          right: 'clamp(1.25rem, 5vw, 5rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}
      >
        {/* Eyebrow stub */}
        <div style={{ width: '80px', height: '10px', backgroundColor: 'rgba(0,0,0,0.07)', borderRadius: '2px' }} />
        {/* Heading stub */}
        <div style={{ width: '45%', height: '48px', backgroundColor: 'rgba(0,0,0,0.07)', borderRadius: '2px' }} />
        {/* Body lines */}
        {[100, 90, 75].map((w, i) => (
          <div
            key={i}
            style={{
              width: `${w}%`,
              maxWidth: '480px',
              height: '14px',
              backgroundColor: 'rgba(0,0,0,0.05)',
              borderRadius: '2px',
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes skeleton-shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
      `}</style>
    </div>
  );
}
