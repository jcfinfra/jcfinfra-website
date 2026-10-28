# Maintenance and recovery

Owner: Juan. This is a manual runbook, not a scheduled monitoring service.

## Routine review

| When | Review | Evidence |
|---|---|---|
| Weekly | Latest CI/deployment, home and CV in both languages, contact link and four removed download URLs | Source/deployment match, usable pages, downloads remain 404 |
| Monthly | Lockfile audit, compatible dependency updates, managed TLS and aggregate analytics | Small reviewed PR; dated results and sample limits |
| Quarterly | Permissions, recovery methods, domain/mail records, public previews, headers, mobile/keyboard/zoom and an isolated recovery build | Private recovery record; never publish codes or personal account data |
| Before expiry | Domain renewal and payment/contact details, certifications and CV | Verify renewal arrangements in the appropriate account |
| Every release | Record previous clean commit/deployment, validate preview, obtain release authorization and verify production | PR, CI, commit, deployment and dated checks |

Changes to DNS, WAF, email, identity, access or destructive history cleanup require their own explicit authorization. Do not treat a website release as authorization for those changes.

## Release checks

Use Node 24.21.0 and the committed lockfile. Run `npm ci`, `npm run check`, `npm run build`, `npm run verify`, and `npm audit --audit-level=high`. Review all audit findings even below the gate. The security verification checks static header configuration, Function GET/HEAD/query/fallback behavior and publication artifacts. It is a regression check, not a complete secret scanner or penetration test.

Keep all twelve evidence hashes unchanged. Check both languages, navigation, CV noindex/nofollow, sitemap exclusion, email decoding, mobile menu, keyboard focus and zoom on a real browser viewport. Check actual response headers on preview and production: local static preview does not reproduce Cloudflare Functions or edge transformations. `_headers` applies to static assets; Function responses set their own headers.

The CSP only limits base URLs, embedded objects and framing. It is not a complete script policy or XSS guarantee. Do not add restrictive script directives without testing the menu, Cloudflare email protection and analytics.

## Recovery

The clean pre-Phase-7 source reference is `0d351836886e6df7f1fb95f6ab29a476e1f61bec`. It contains the HTML-only CV and removed-download Function. An earlier commit may restore private documents or phone details; do not select an older release indiscriminately.

1. Record symptoms, time, affected URLs and last release. Preserve sanitized evidence privately.
2. Identify a still-available clean Pages deployment and its commit. Record these before every release; an old deployment may have been removed.
3. With recovery authorization, restore that deployment when available. Prepare a reviewed revert PR to reconcile `main`, since a later automatic deployment can replace a dashboard rollback.
4. If no clean deployment remains, check out the clean source reference in an isolated folder, run the release checks and review the new preview before publishing.
5. Verify ten content routes, four removed downloads, headers, images, contact links and bilingual navigation. Record actual results and remaining limits.

A local source archive is not a tested external backup. No production rollback is claimed by this procedure. DNS or email incidents need their own diagnosis; reverting Astro does not restore those services.

## Privacy and measurement limits

The public CV is crawlable and marked noindex/nofollow; this is not access control. Current removal does not erase Git history, old deployments, caches or third-party copies. Keep private application documents and audit exports outside the public repository.

The bilingual footer describes existing Cloudflare Web Analytics. Consult [Cloudflare's documentation](https://developers.cloudflare.com/web-analytics/about/) and [FAQ](https://developers.cloudflare.com/web-analytics/faq/). Views are not unique people, recruiter identity or conversions. Record time range, filters and sample size; low-volume Core Web Vitals do not prove representative performance. No new tracker or custom event is introduced.
