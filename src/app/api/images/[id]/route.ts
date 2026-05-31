import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import path from 'path';

// ========================================
// Simple in-process rate limiter
// Resets on cold start. For production, replace with
// Redis/Upstash or Vercel Edge rate limiting.
// ========================================

export const runtime = 'nodejs';

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 30;        // requests
const RATE_WINDOW = 60_000;   // per 60 seconds

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }

  entry.count += 1;
  if (entry.count > RATE_LIMIT) return true;

  return false;
}

// ========================================
// Allowed image IDs — strict allowlist
// ========================================

const ALLOWED_IDS = new Set(['hero-bg', 'proj-1', 'proj-2', 'proj-3']);

// ========================================
// Input validation
// ========================================

/** Accepts only alphanumeric chars, hyphens, underscores. Max 64 chars. */
function isValidImageId(id: unknown): id is string {
  if (typeof id !== 'string') return false;
  if (id.length === 0 || id.length > 64) return false;
  return /^[a-zA-Z0-9_-]+$/.test(id);
}

// ========================================
// GET /api/images/[id]
// ========================================

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // --- Rate limiting ---
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  if (isRateLimited(ip)) {
    return new NextResponse('Too many requests', {
      status: 429,
      headers: {
        'Retry-After': '60',
        'Content-Type': 'text/plain',
      },
    });
  }

  // --- Input validation ---
  const { id } = await params;

  if (!isValidImageId(id)) {
    return new NextResponse('Invalid image ID', { status: 400 });
  }

  if (!ALLOWED_IDS.has(id)) {
    return new NextResponse('Not found', { status: 404 });
  }

  // --- Resolve file path (no path traversal possible — ID is allowlisted) ---
  const publicPath = path.join(process.cwd(), 'public', `${id}.png`);

  if (!existsSync(publicPath)) {
    return new NextResponse('Image not found', { status: 404 });
  }

  const bytes = readFileSync(publicPath);
  return new NextResponse(bytes, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
