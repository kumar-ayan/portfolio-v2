import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import path from 'path';

// ========================================
// Simple in-process rate limiter
// Resets on cold start. For production, replace with
// Redis/Upstash or Vercel Edge rate limiting.
// ========================================

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

const IMAGE_MAP: Record<string, string> = {
  'hero-bg': 'hero_bg_1779780754721.png',
  'proj-1': 'project_rl_nav_1779780770349.png',
  'proj-2': 'project_nas_1779780803333.png',
  'proj-3': 'project_sim_real_1779780820890.png',
};

// Fallback: serve generated images from artifact brain directory
const BRAIN_DIR = 'C:\\Users\\Ayan\\.gemini\\antigravity-ide\\brain\\206d2f4f-5426-41f1-94fb-10dcb85aaeef';

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

  const filename = IMAGE_MAP[id];
  if (!filename) {
    return new NextResponse('Not found', { status: 404 });
  }

  // --- Resolve file path (no path traversal possible — ID is allowlisted) ---
  const publicPath = path.join(process.cwd(), 'public', `${id}.png`);
  const brainPath = path.join(BRAIN_DIR, filename);

  let filePath = '';
  if (existsSync(publicPath)) {
    filePath = publicPath;
  } else if (existsSync(brainPath)) {
    filePath = brainPath;
  } else {
    return new NextResponse('Image not found', { status: 404 });
  }

  const bytes = readFileSync(filePath);
  return new NextResponse(bytes, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
