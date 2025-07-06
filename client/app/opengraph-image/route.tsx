import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

// Remove edge runtime, let Next.js decide the best runtime
// export const runtime = 'edge';

// Enable static generation
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

function generateOgImageSvg({
  title = 'Critique of Pure Reason Interactive Reader',
  description = 'An interactive trilingual reader featuring German, English, and Chinese translations',
}) {
  const getTitleLines = (text: string, maxLength = 40) => {
    if (!text) return [];
    const words = text.split(' ');
    const lines = [];
    let currentLine: string[] = [];
    let currentLength = 0;

    words.forEach((word) => {
      if (currentLength + word.length + 1 <= maxLength || currentLine.length === 0) {
        currentLine.push(word);
        currentLength += word.length + 1;
      } else {
        lines.push(currentLine.join(' '));
        currentLine = [word];
        currentLength = word.length;
      }
    });

    if (currentLine.length > 0) {
      lines.push(currentLine.join(' '));
    }
    return lines;
  };

  const titleLines = getTitleLines(title);
  
  return (
    <div
      style={{
        background: 'linear-gradient(to bottom right, #1a1a1a, #2a2a2a)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: '40px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {titleLines.map((line, i) => (
          <div
            key={i}
            style={{
              color: 'white',
              fontSize: '60px',
              fontWeight: 'bold',
              lineHeight: 1.2,
            }}
          >
            {line}
          </div>
        ))}
      </div>
      
      <div
        style={{
          color: '#a1a1aa',
          fontSize: '32px',
          marginTop: '20px',
          maxWidth: '800px',
        }}
      >
        {description}
      </div>
      
      <div
        style={{
          color: '#71717a',
          fontSize: '24px',
          position: 'absolute',
          bottom: '40px',
          left: '40px',
        }}
      >
        philosophy.it.com
      </div>
    </div>
  );
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') || undefined;
    const description = searchParams.get('description') || undefined;

    return new ImageResponse(
      generateOgImageSvg({ title, description }),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error(e);
    return new Response('Failed to generate image', { status: 500 });
  }
} 