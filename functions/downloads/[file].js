const removedFiles = new Set([
  'Juan_Carlos_Flores_CV_ES.pdf',
  'Juan_Carlos_Flores_CV_ES.docx',
  'Juan_Carlos_Flores_CV_EN.pdf',
  'Juan_Carlos_Flores_CV_EN.docx',
]);

export function onRequest({ request, next }) {
  const name = new URL(request.url).pathname.split('/').pop();
  if (!removedFiles.has(name)) return next();
  return new Response(request.method === 'HEAD' ? null : '404 — File not found', {
    status: 404,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'X-Frame-Options': 'DENY',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      'Content-Security-Policy': "base-uri 'self'; object-src 'none'; frame-ancestors 'none'",
    },
  });
}
