# Hosting configuration

Current hosting remains GitHub Pages. The normal build emits a meta Content-Security-Policy and Referrer-Policy metadata. The meta CSP hashes the early theme script; allowlisted integrations continue to work. Meta policies cannot supply HSTS, MIME-sniffing protection, Permissions-Policy or framing restrictions. [MDN documents the HTTP-only frame-ancestors directive](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors).

## Optional Cloudflare Pages artifact

```sh
pnpm build:cloudflare
```

This produces the usual static `dist` plus `_headers`. It changes neither the current workflow nor hosting/DNS. It prepares:

- HTTP CSP including `frame-ancestors 'self'`, HSTS for this host only, `nosniff`, SAMEORIGIN framing, strict-origin referrers and disabled unused device permissions.
- Revalidated HTML at exact entry paths, including index.html aliases and 404.html.
- One-year immutable caching for content-hashed JS/CSS, responsive images and font subsets. Unhashed masters retain provider defaults.

Deploying to Cloudflare requires a separate hosting decision. If chosen, publish `dist` as a static Pages project, verify custom-domain redirects/canonicals, then change DNS. This file applies to static responses, not Pages Functions. Cloudflare combines matching header rules; exact HTML cache rules avoid conflicts with hashed asset rules. [Cloudflare Pages header documentation](https://developers.cloudflare.com/pages/configuration/headers/).

After deployment, inspect a real HTML response and one hashed asset:

```sh
curl -I https://romamakes.com/
curl -I https://romamakes.com/assets/ACTUAL-BUILD-HASH.js
```

Verify CSP/HSTS/nosniff/referrer/permissions headers, HTML revalidation and immutable asset caching. Test compression with `curl --compressed` and check the actual `Content-Encoding`; this preparation does not prove Brotli or HTTP/3 behavior. Keep the current GitHub Pages workflow until a migration is explicitly approved. The ordinary `pnpm build` intentionally does not emit `_headers`.
