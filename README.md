# JCF Infra

Professional portfolio built with Astro and TypeScript. English is the primary language, with a complete Spanish route set.

## Project status

The website is deployed through Cloudflare Pages. Three case studies are published in English and Spanish. Phases 1 and 2 established the approved visual identity and architecture; the Phase 3 and Phase 4 releases are recorded below.

Phase 3 repository and delivery hardening is complete as of 21 October 2026. Astro 7.4.1 is published, main is protected and the release was verified in preview and production. See [Phase 3 closeout](docs/PHASE-3-closeout.md) for evidence, remaining improvements and scope limits.

Phase 4 visual implementation was published on 22 October 2026; see [Phase 4 closeout](docs/PHASE-4-closeout.md). Phase 5 is complete as of 23 October 2026: all three historical labs were reviewed, the documentation improvements were published, and eight routes plus twelve preserved evidence images were verified in production. See [Phase 5 closeout](docs/PHASE-5-closeout.md) for the PR, CI, deployment and validation limits.

## Phase 6 CV delivery

The bilingual CV pages remain available as HTML, without public Word/PDF downloads or phone numbers. The consolidated Phase 6 release removes the four previous downloads, unifies contact email and applies the requested content corrections. See [Phase 6 release record](docs/PHASE-6-closeout.md).

The Spanish source is `src/pages/es/cv.md`; the English source is `src/pages/cv.md`. Both are marked noindex, nofollow and excluded from the sitemap; robots.txt allows crawling. A top-level 404 page ensures removed file URLs return an actual 404 on Cloudflare Pages. Application documents remain outside this repository. Removing current files does not erase historical Git objects or old deployments.

## Laboratory documentation

- [Evidence register](docs/LABS-EVIDENCE.md): public captures, historical records and their limits for LAB-001/002/003.
- [Reusable lab template](docs/LAB-TEMPLATE.md): objectives, architecture, procedure, costs, validation, provenance and lessons for future exercises.
- [Publication image baseline](docs/lab-evidence-sha256.json): twelve SHA-256 values preserved from the Phase 5 audit base. Verification compares both source and build images against this baseline; do not regenerate it to conceal an unexpected change.

The case studies are personal learning exercises. New reproduction guides are future procedures, not fresh Azure or WAF tests. Full private histories, original screenshots and deployment parameter files are not publication artifacts. A fourth lab is not required to complete Phase 5.

## Architecture

Astro uses `output: 'static'` and `site: 'https://jcfinfra.com'`.

- `src/pages/`: English routes and Spanish equivalents under `es/`.
- `src/components/Portfolio.astro`: shared bilingual homepage.
- `src/components/AzureLab.astro`: shared Azure case-study renderer.
- `src/data/azureLabs.ts`: English and Spanish Azure content.
- `src/layouts/LabLayout.astro`: case-study layout, language navigation and metadata.
- `public/labs/`: publication evidence images.
- `docs/LAB-001-release.md`: historical LAB-001 release and evidence record.
- `.github/workflows/ci.yml`: repository validation.

LAB-001 currently has separate English and Spanish content files.

## Published routes

| Content | English | Spanish |
|---|---|---|
| Portfolio | `/` | `/es/` |
| CV (HTML only) | `/cv/` | `/es/cv/` |
| Cloudflare security | `/labs/001-cloudflare-waf/` | `/es/labs/001-cloudflare-waf/` |
| Azure Application Gateway | `/labs/002-azure-application-gateway/` | `/es/labs/002-azure-application-gateway/` |
| Azure Internal Load Balancer | `/labs/003-azure-internal-load-balancer/` | `/es/labs/003-azure-internal-load-balancer/` |

## Local development and validation

Use Node.js 24.21.0, matching CI and the NODE_VERSION setting in both Cloudflare Pages environments. Astro is pinned to 7.4.1. The isolated local validation used npm 11.19.0; npm ci installs the committed lockfile.

```bash
npm ci
npm run dev
```

Before proposing a release:

```bash
npm run check
npm run build
npm run verify
npm audit --audit-level=high
```

`npm run preview` serves the generated build locally. Keep development and preview servers local.

Commit `package-lock.json` with intentional dependency changes. Review audit findings even when the build succeeds; a dependency advisory does not by itself prove exploitation of the deployed website.

## Delivery and hosting

GitHub repository: `jcfinfra/jcfinfra-website`.
Cloudflare Pages project: `jcfinfra-website`.
Production branch: `main`. Public website: https://jcfinfra.com.

Pages settings verified on 21 October 2026:

- Build command: `npm run build`
- Output directory: `dist`
- Root directory: repository root
- Build system: Version 3
- NODE_VERSION: `24.21.0` in production and preview
- Automatic production deployments: enabled for main
- Preview branches: all non-production branches; previews are public

GitHub Actions validates the repository; the Cloudflare Git integration deploys separately. A green deployment check does not prove that all CI checks finished before publication. Recheck dashboard settings before changing delivery configuration.

The main branch requires a PR, the GitHub Actions check `Check and build Astro`, an up-to-date branch and resolved conversations. Rules apply to administrators; force pushes and deletion are blocked. External reviewer approval is not required for the single-maintainer workflow. This does not provide independent review.

CI has read-only repository permissions, actions pinned to commit SHAs, a ten-minute timeout, non-persistent checkout credentials, npm ci, a high/critical dependency-audit gate, Astro check and build. Low/moderate findings still require review; a passing audit does not guarantee absence of vulnerabilities.

Work on a branch, open a PR, inspect the diff and public preview, wait for the required check, then merge only with release authorization. Merging into main triggers production deployment, including documentation-only changes under the current watch-path configuration.

## Release and recovery

Before a production change, record the current Pages deployment and source commit. Review the proposed diff, validation results, both languages and evidence images.

After an authorized release, verify the deployment commit, all ten content routes, HTTP 404 for the four removed CV downloads, images and navigation. If a regression occurs, restore the recorded Pages deployment and reconcile the repository through a reviewed revert. A later automatic deployment can replace a dashboard rollback.

## Content and security

Distinguish professional experience from personal labs. Preserve the limits of each observation; screenshots or a blocked request do not establish comprehensive protection or successful intrusion.

Do not commit credentials, private employer configurations or sensitive unredacted evidence. Keep `.git`, environment files and source archives out of published artifacts.

Cloudflare edge controls and features are managed outside the Astro source. Do not infer their current settings from this repository or assume that zone rules also protect the separate `pages.dev` hostname.

Preserve existing DNS and Zoho MX, SPF, DKIM, DMARC and verification records. Changes to hosting, DNS, WAF, secrets or publication require explicit authorization.
