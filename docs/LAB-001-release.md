# LAB-001 — Review and release record

Prepared 14 October 2026 (America/Lima). Juan authorized continuation of the prepared publication on 15 October 2026.

## Source and scope

- Repository: https://github.com/jcfinfra/jcfinfra-website
- Original commit / restore point: `397f09e53059d9c0c16e5d2a8222a9e71fd58362`.
- Local branch: `lab/001-cloudflare-waf`.
- New English case study: `/labs/001-cloudflare-waf/`.
- Entry links added to Projects on `/` and `/es/`; existing biography and planned labs preserved.
- Four publication screenshots in `public/labs/001/`. Originals remain untouched outside the repository.
- No DNS, WAF, HSTS, mail records, billing or production deployment changes performed.

## Hosting evidence

Juan copied the Cloudflare project Domains list: `jcfinfra.com`, `www.jcfinfra.com`, `jcfinfra-website.pages.dev`. This confirms Pages through owner-provided dashboard evidence. A subsequent dashboard screenshot confirms the connected repository jcfinfra/jcfinfra-website, production branch main, automatic deployments enabled and deployed commit 397f09e. Previous deployment: https://d470fe41.jcfinfra-website.pages.dev. Build settings were not displayed; the existing successful deployment configuration is retained. The repository README's former "planned" hosting status is historical.

An independent HTTPS HEAD request to https://jcfinfra.com at 23:30 GMT-5 on 14 October 2026 returned 200 and `Strict-Transport-Security: max-age=2592000`. No includeSubDomains/preload directives were present. This checks the response, not all dashboard settings or hostnames.

## Screenshot provenance

Coordinates are x, y, width, height in original pixels. Cropping removes surrounding information and does not reconstruct pixels.

| Publication file | Original attachment | Crop |
|---|---|---|
| e01-request.png | image(20261015-040457).png | 0,407,824,418 |
| e02-rule.png | image(20261015-042001).png | 288,155,680,641 |
| e03-saved.png | image(20261015-042445).png | 208,280,827,124 |
| e04-block.png | image(20261015-042503).png | 150,157,740,600 |

E01 retains the event IP as case evidence and removes unrelated requests. E02/E03 remove account identity and browser surroundings. E04 excludes browser chrome and the Ray ID footer. The supplied screenshot's browser overlay obscures part of the heading; the publication crop starts below it. Source filenames are attachment identifiers, not asserted event times.

## Evidence limits

The original sampled event proves an observed GET path and a Not mitigated label; it does not prove file disclosure. Rule editor, saved rule listing and later block page are distinct evidence. The block page alone cannot identify the exact matching rule. HTTP and HTTPS blocking were reported by Juan; the browser screenshot does not distinguish raw HTTP from HSTS/redirect-upgraded HTTPS. No new probing of Git paths was necessary for preparing this historical case study.

## Release steps — after approval

1. In Cloudflare Workers & Pages, select the existing project. Verify connected repository `jcfinfra/jcfinfra-website`, production branch and build settings. Expected from source: Astro, `npm run build`, output `dist`. Do not change settings simply to match these expectations; investigate differences.
2. Save the current production deployment ID and commit for rollback. Review branch preview controls before any push, as a push may automatically publish a preview.
3. Review the local diff, screenshot crops and built pages. Run `npm ci`, `npm run check`, `npm run build` with `ASTRO_TELEMETRY_DISABLED=1` if desired.
4. After Juan approves publication, push through the confirmed repository workflow. Merge only the reviewed change into the verified production branch. Do not upload the repository root; only the generated `dist` is the static artifact.
5. Verify `/`, `/es/`, `/labs/001-cloudflare-waf/`, all four images and navigation on the custom domain. Confirm HSTS remains present. Check no metadata or secrets are in `dist`.
6. For regressions, roll back to the recorded previous Pages deployment or revert the reviewed commit through the same workflow. Leave existing DNS, Zoho mail, WAF and HSTS settings intact.

No additional paid service is needed for this static page or the documented custom rule. Cloudflare documents five custom rules on Free: https://developers.cloudflare.com/waf/custom-rules/ . Hosting navigation reference: https://developers.cloudflare.com/pages/configuration/custom-domains/ .

## Local validation completed

- Astro check: 0 errors, 0 warnings, 0 hints.
- Astro build: 3 static pages generated successfully.
- Local HTTP checks: 200 for all 3 pages and all 4 publication images.
- Browser review: narrow viewport layout and English/Spanish project navigation verified. A full wide-screen visual review was not performed.
- Build inventory: 7 files; no .git or .env artifacts.
- Publication screenshot crops visually inspected; originals untouched.
- LAB-001-review.html is a standalone review copy with embedded images. The ZIP contains the generated website, not the source repository.
- Production publication authorized; post-deployment verification follows the push.


