import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import path from 'path';

// Fallback: serve generated images from artifact brain directory
// This eliminates the need to copy files during development
const BRAIN_DIR = 'C:\\Users\\Ayan\\.gemini\\antigravity-ide\\brain\\206d2f4f-5426-41f1-94fb-10dcb85aaeef';

const IMAGE_MAP: Record<string, string> = {
  'hero-bg': 'hero_bg_1779780754721.png',
  'proj-1': 'project_rl_nav_1779780770349.png',
  'proj-2': 'project_nas_1779780803333.png',
  'proj-3': 'project_sim_real_1779780820890.png',
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const filename = IMAGE_MAP[id];

  if (!filename) {
    return new NextResponse('Not found', { status: 404 });
  }

  // First check public folder (production path)
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
    },
  });
}
