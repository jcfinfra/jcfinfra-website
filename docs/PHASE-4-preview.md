# Phase 4 — preview candidate

Status: PR #4 is open as a draft. Its Cloudflare preview has passed automated checks and manual visual, responsive and keyboard review. This is not a Phase 4 closeout or a production release record.

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
- Preview reviewed in a browser at 1440×900 and 390×844. All eight routes reported the expected language, exactly one H1, no horizontal overflow, no missing image alt text and no broken same-page anchors.
- Manually reviewed both landing pages and all three lab pages. The mobile menu opens; its links receive visible keyboard focus; the skip link receives visible focus and navigates to `#main`.
- WCAG contrast ratios from the approved palette: primary text/background 16.62:1; muted text/background 7.30:1; accent/background 8.74:1; primary text/surface 13.86:1; muted text/surface 6.09:1; accent/surface 7.29:1.

These checks do not constitute a screen-reader, broad browser-compatibility, real-device or field-performance audit. Zoom behavior and screen-reader output were not tested. The PR remains a draft; production integration and deployment are outside the approved scope.

## Preservation and release boundary

Base commit: 46ddd190e63b44107928a4cf03ba5fbf64682574. Working branch: feature/phase-4-redesign. A ZIP backup of the candidate was created outside this repository before the first commit.

No DNS, WAF, mail, secret or production-infrastructure changes. CV and credential links remain absent until validated. Existing historical lab claims and limitations remain in place.

The deployment observed in the preceding session was 7ac2914a-1701-4d9d-9582-c0dbdd758d30 at the base commit; revalidate the active deployment before any future authorized production release.
