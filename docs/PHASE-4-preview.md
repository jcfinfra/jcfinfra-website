# Phase 4 — preview candidate

Status: local candidate; visual review, PR and remote preview validation pending. This is not a Phase 4 closeout or a production release record.

Juan approved work through PR and validated preview on 22 October 2026 (America/Lima). Merge and production publication are not authorized by this approval.

## Scope

- Approved dark identity: #0B1220, #14243B, #38BDF8, #EAF2FF and #94A3B8.
- Locally hosted Inter and JetBrains Mono variable fonts, with their licenses. Source: Fontsource variable packages 5.3.0, Latin normal subsets.
- Bilingual landing page with separate profile, experience, skills, projects, credentials/training and contact sections.
- Shared navigation, footer, metadata and styles; native mobile details menu, skip link, reduced-motion handling and visible focus.
- Lab evidence retains its original URLs and PNG contents. Image dimensions reserve layout space; explicit original-evidence links and focusable table regions improve access.
- Social metadata, social card, favicon, robots and sitemap.
- Build verification added to the existing required CI job; Astro and Node versions unchanged.

## Validation on 22 October 2026

- Astro check: 20 files; zero errors, warnings or hints.
- Astro build: eight pages plus sitemap endpoint.
- npm audit: zero known vulnerabilities at execution time.
- npm run verify: eight routes, 12 images, 270 internal references; canonical, language alternates, social metadata, local anchors, sitemap and public-to-build image hashes passed.
- Original 12 evidence files match their tracked Git baseline. Azure lab data unchanged.

These checks are not a visual, screen-reader, browser-compatibility or field-performance audit. The current browser tool is disabled in Work settings; responsive, keyboard, zoom and visual preview checks remain pending. Do not merge on this evidence alone.

## Preservation and release boundary

Base commit: 46ddd190e63b44107928a4cf03ba5fbf64682574. Local working branch: feature/phase-4-redesign. A ZIP backup of the uncommitted candidate was created outside this repository before continuing.

No DNS, WAF, mail, secret or production-infrastructure changes. CV and credential links remain absent until validated. Existing historical lab claims and limitations remain in place.

The deployment observed in the preceding session was 7ac2914a-1701-4d9d-9582-c0dbdd758d30 at the base commit; revalidate the active deployment before any future authorized production release.
