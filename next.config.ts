import type { NextConfig } from "next";

// Bundle analyzer — run with: ANALYZE=true npm run build
const withBundleAnalyzer =
  process.env.ANALYZE === 'true'
    ? // eslint-disable-next-line @typescript-eslint/no-require-imports
      require('@next/bundle-analyzer')({ enabled: true })
    : (config: NextConfig) => config;

// ========================================
// Security Headers
// Applied to every route via headers()
// ========================================

const securityHeaders = [
  // Prevent clickjacking
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // Prevent MIME-type sniffing
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Control referrer information
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Restrict browser features
  {
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=()",
    ].join(", "),
  },
  // Force HTTPS (only meaningful in production)
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Content Security Policy
  // 'unsafe-inline' needed for Next.js inline styles; nonce-based CSP would be stricter
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Scripts: Next.js chunks + inline hydration + Vercel analytics
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live",
      // Styles: self + Google Fonts + inline (Next.js injects critical CSS)
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Fonts: self + Google Fonts CDN
      "font-src 'self' https://fonts.gstatic.com data:",
      // Images: self + data URIs (SVG patterns, base64) + blob (canvas)
      "img-src 'self' data: blob: https:",
      // Connections: self only (no external API calls from browser)
      "connect-src 'self' https://vercel.live wss://ws-us3.pusher.com",
      // Media: self only
      "media-src 'self'",
      // Frames: allow Vercel toolbar
      "frame-src https://vercel.live",
      // No plugins ever
      "object-src 'none'",
      // No embedding in frames
      "frame-ancestors 'none'",
      // Only load resources over HTTPS in production
      "upgrade-insecure-requests",
      // Restrict base URI to prevent base-tag injection
      "base-uri 'self'",
      // Restrict form actions
      "form-action 'self'",
    ].join("; "),
  },
  // Legacy XSS protection (IE) — kept for belt-and-suspenders
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
];

const nextConfig: NextConfig = {
  // Remove "X-Powered-By: Next.js" header
  poweredByHeader: false,

  async headers() {
    return [
      {
        // Security headers — all routes
        source: "/(.*)",
        headers: securityHeaders,
      },

      {
        // Long cache for fonts (30 days, revalidatable)
        source: "/fonts/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
      {
        // Medium cache for public images (7 days)
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
