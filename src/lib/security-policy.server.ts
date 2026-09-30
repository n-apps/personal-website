import { createHash } from 'node:crypto';

/** Build-only policy: allow the actual integrations and hash the early theme script. */
export function contentSecurityPolicy(html: string) {
  const hashes = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)]
    .filter(([, attributes, code]) => !/\bsrc\s*=/.test(attributes) && code.trim())
    .map(([, , code]) => `'sha256-${createHash('sha256').update(code).digest('base64')}'`);
  return [
    "default-src 'self'",
    `script-src 'self' https://gc.zgo.at ${hashes.join(' ')}`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https://coverartarchive.org https://archive.org https://*.archive.org",
    "connect-src 'self' https://api.openweathermap.org https://romamakes.goatcounter.com https://musicbrainz.org https://coverartarchive.org https://archive.org https://*.archive.org",
    "media-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-src 'none'",
    'upgrade-insecure-requests',
  ].join('; ');
}

export function withContentSecurityPolicy(html: string) {
  const policy = contentSecurityPolicy(html);
  return html.replace(/(<meta charset="UTF-8"\s*\/?>)/, `$1\n<meta http-equiv="Content-Security-Policy" content="${policy}" />`);
}
