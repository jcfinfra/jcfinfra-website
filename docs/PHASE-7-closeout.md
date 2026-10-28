# Phase 7 release record — 28 October 2026

The approved R1–R7 repository release is implemented in [PR #13](https://github.com/jcfinfra/jcfinfra-website/pull/13), merged as `d882695e3d00760b9616a9b6f919aaa7ac82864f`. This closes the original website roadmap within the documented scope and limitations; it is not a certification of comprehensive security or accessibility.

## Release evidence

- Clean pre-release reference: `0d351836886e6df7f1fb95f6ab29a476e1f61bec`; a local source-only archive was retained. No production rollback drill was performed.
- Reviewed head: `6ca1204e1d297b9256011e0ff1958e00a0c5e4ec`; preview deployment `fd189524-9087-4d4b-833e-084dceea7d43`.
- [PR CI](https://github.com/jcfinfra/jcfinfra-website/actions/runs/40647051578) and [main CI](https://github.com/jcfinfra/jcfinfra-website/actions/runs/40705366770) succeeded.
- Functional production deployment: `11db43b1-d2f9-4193-8dda-19085af39a92`, [deployment URL](https://11db43b1.jcfinfra-website.pages.dev), from `d882695`.
- This follow-up record changes documentation only. Its merge triggers a separate Pages deployment; consult its PR checks for that later deployment identity. The functional release evidence above remains tied to the tested source commit.

## Changes and validation

`fast-uri` changed only from 3.1.8 to 3.1.9. Clean `npm ci` reported zero known vulnerabilities. Astro check covered 25 files with no diagnostics; build and verification passed: ten content routes, twelve original image hashes, 306 internal references, bilingual metadata, sitemap and CV privacy. Sixteen Function GET/HEAD/query cases plus fallback passed.

Static assets and removed-download responses set nosniff, strict-origin-when-cross-origin, DENY framing, disabled camera/microphone/geolocation permissions and a minimal CSP restricting base URLs, objects and framing. The CSP is deliberately not a complete script policy. Homepage descriptions are shorter; the 404 no longer advertises misleading canonical or language URLs. Both footer languages disclose existing analytics and historical-removal limits. See [maintenance and recovery](MAINTENANCE.md).

Live preview and root Pages checks each passed 33 HTTP checks covering routes, response headers, downloads, sitemap and twelve hashes. Production content pages and Function responses were checked on the custom domain. Some pre-existing image and robots.txt cache entries initially lacked the new headers while Pages served them correctly; fresh URLs were checked separately. This is a cache propagation limitation, not an altered image or a claim that all edge caches were purged.

Browser checks observed a real 390px viewport without horizontal overflow, keyboard menu opening, Escape closing with focus returned to the summary, link-triggered closing, Spanish skip-link focus and the privacy disclosure. Juan reported checking English and Spanish at 200% zoom and menu operation. That zoom validation is owner-reported, not an automated agent result. Production showed the contact mailto link, the injected Cloudflare analytics script and no captured console errors; this does not independently prove ingestion of every beacon.

## Residual risks and excluded work

The approved scope leaves the following separate decisions pending: dependency graph/Dependabot configuration; preview access restrictions and pages.dev behavior; DNSSEC; DMARC monitoring/enforcement and mail delivery tests; identity recovery; Search Console registration; and destructive history/deployment cleanup. No DNS, WAF, email, identity, access, paid service or recurring monitor was changed by this release.

Public previews and the root pages.dev hostname remain accessible. CV noindex/nofollow is not access control. Current-tree removal does not erase historical Git objects, caches, previous deployments or copies held by others. Private application documents and raw audit reports were not included in the release.

The 26 October analytics observation was low-volume (15 visits, 21 views over seven days; LCP p75 1,368ms); it is historical and not representative proof of performance. No Lighthouse score is claimed (the audit API returned 429). No comprehensive WCAG, screen-reader, penetration, load, mail-delivery, identity-recovery or production rollback test was performed. Maintain the site using the manual runbook and validate future changes through reviewed previews and CI.
