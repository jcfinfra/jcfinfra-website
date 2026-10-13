# JCF Infra Website

Professional bilingual portfolio for Juan Carlos Flores, Electronic Engineer based in Lima, Peru.

## Stack
- Astro + TypeScript
- Static HTML/CSS (no backend, cookies or tracking)
- Cloudflare Pages (planned)

## Local development
Requires Node.js 22 LTS or newer.

```bash
npm install
npm run dev
npm run build
```

## Cloudflare Pages (after build verification)
- Framework preset: Astro
- Build command: `npm run build`
- Build output directory: `dist`
- Production branch: `main`

The custom domain `jcfinfra.com` must only be connected after reviewing Cloudflare's proposed DNS changes. **Do not modify existing Zoho MX, SPF, DKIM, DMARC or verification records.**

## Content integrity
Work experience reflects operational roles; personal labs are explicitly labeled as planned. Credential verification links and downloadable resumes will be added only after validation.

## Security
Do not commit credentials, private IP addresses, employer configurations or unredacted screenshots.

## Status
Initial MVP source code. Deployment and build validation are pending.
