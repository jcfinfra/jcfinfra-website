# Phase 6 public CV release record

## Scope and authorization

Juan explicitly requested these changes to jcfinfra.com on 24 October 2026. The release includes the already reviewed English CV and wording corrections, public downloads, contact privacy and search-indexing controls. Design, global styles, laboratory content, evidence images, dependencies, DNS and WAF settings are unchanged.

Production baseline: PR #8, b8f0ad6530090b0012daf9896f1de66fa9e15f5d. The publication branch contains one clean change from this baseline: local preparation commits containing private downloads are not pushed. Required CI and Cloudflare preview must pass before the protected merge. The PR records its exact head, check results and merge commit; final production verification is delivered separately to Juan after deployment.

## Public deliverables

- /es/cv/ and /cv/: bilingual general CVs, PDF and editable Word buttons, email/LinkedIn/GitHub contacts, no phone number.
- /downloads/Juan_Carlos_Flores_CV_ES.pdf and .docx.
- /downloads/Juan_Carlos_Flores_CV_EN.pdf and .docx.
- Both HTML CVs have robots: noindex, nofollow; sitemap contains the other eight routes only. robots.txt remains unchanged and allows crawling.
- All four downloads have scoped X-Robots-Tag: noindex, nofollow; Word has explicit MIME and attachment headers.

Only phone-free public copies belong in public/downloads/. Private application versions remain outside the repository and deployment. Do not add identity documents, home address, birth date, marital status or employer access information. Noindex is a crawler instruction, not access control, and existing search listings require recrawling to disappear.

## Validation

- Astro check: 22 files; zero errors, warnings and hints. Static build: ten HTML pages.
- Build verifier: ten routes, 310 internal references, metadata, anchors, CV noindex, sitemap exclusion, robots crawl allowance and download headers.
- Twelve original laboratory evidence images retain their recorded SHA-256 values.
- Four public download hashes recorded in cv-downloads-sha256.json and enforced by the build verifier.
- Both Word documents retain a single-column, no-table layout. Exported with installed Microsoft Word; three A4 PDF pages per language, selectable text. Packaged LibreOffice renderer unavailable, so Word-exported PDFs rendered with Poppler and all six pages visually inspected.
- Full source content checked against DOCX and PDF; nine expected hyperlink destinations per language. Phone absence checked in DOCX XML and extracted PDF text/metadata. Private originals preserved locally.
- npm audit --audit-level=high passed. One existing moderate fast-uri advisory remains; dependency maintenance is outside this content/privacy release.

Production checks must independently confirm successful Cloudflare deployment, both CV routes, four downloads and hashes, PDF noindex headers, unchanged email obfuscation, sitemap/robots behavior and query-string navigation. A local build does not establish edge-header behavior.

## Analytics and LinkedIn

Cloudflare Web Analytics for jcfinfra.com was verified in the authenticated dashboard: Automatic setup, recorded page views and visits. No settings change was needed. The site accepts ordinary query parameters, but Web Analytics does not collect query strings or custom events; a report grouped by ?ref=company is not available. Referer is a different metric.

Dashboard path: account > Observability > Analytics > Web analytics > jcfinfra.com > Page views. Select the date range, then Path or Referer. See the [official FAQ](https://developers.cloudflare.com/web-analytics/faq/) and [dimensions](https://developers.cloudflare.com/web-analytics/data-metrics/dimensions/).

LinkedIn is instructions-only: website in Contact info; Application Gateway, internal Load Balancer and Cloudflare WAF case studies in Featured. Exclude the CV from Featured. No public profile edit or employer contact was performed.
