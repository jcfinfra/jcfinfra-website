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

## Residual risks at the original release (historical)

The following paragraphs describe the original release, before the owner-managed changes recorded below. The post-release section supersedes their configuration status.

The approved scope leaves the following separate decisions pending: dependency graph/Dependabot configuration; preview access restrictions and pages.dev behavior; DNSSEC; DMARC monitoring/enforcement and mail delivery tests; identity recovery; Search Console registration; and destructive history/deployment cleanup. No DNS, WAF, email, identity, access, paid service or recurring monitor was changed by this release.

Public previews and the root pages.dev hostname remain accessible. CV noindex/nofollow is not access control. Current-tree removal does not erase historical Git objects, caches, previous deployments or copies held by others. Private application documents and raw audit reports were not included in the release.

The 26 October analytics observation was low-volume (15 visits, 21 views over seven days; LCP p75 1,368ms); it is historical and not representative proof of performance. No Lighthouse score is claimed (the audit API returned 429). No comprehensive WCAG, screen-reader, penetration, load, mail-delivery, identity-recovery or production rollback test was performed. Maintain the site using the manual runbook and validate future changes through reviewed previews and CI.

## Post-release hardening — 28 October 2026 (owner-managed)

Juan performed these changes himself, with an external review by Claude reported by the owner. This follow-up is a read-only verification plus an authorized documentation PR; the agent did not change production settings, DNS, mail, identity, access policies or Git history. The documentation merge triggers the existing Pages deployment workflow.

### Independently verified on 28 October

- GitHub settings show Dependency graph, Dependabot alerts, Dependabot security updates, private vulnerability reporting, Secret Protection and push protection enabled. Grouped security updates, version updates, AI Scan and CodeQL are not configured/enabled, consistent with the owner's deliberate choices. No dependabot.yml is present; it is not required for the enabled basic security alerts/updates. The repository has no SECURITY.md at its recognized repository locations. This is a missing written reporting policy, not evidence that private vulnerability reporting is disabled. No policy file or scanning feature was added in this documentation-only change.
- An existing preview URL redirects to the Cloudflare Access sign-in page. Public production homepages remain reachable. The precise Access policy membership is owner-reported below; the login page alone does not prove its allowlist.
- DNSSEC was initially reported as Pending. During this verification, Cloudflare DNS Settings displayed “Success! jcfinfra.com is protected with DNSSEC.” Public DNS also returned a DS record and authenticated responses (AD=true). The activation follow-up is therefore resolved during this review rather than left artificially pending for two days.
- Public DNS returns one _dmarc TXT record with p=none and rua, one SPF record containing include:zohomail.com ~all, the Zoho zmail._domainkey TXT, and a google-site-verification TXT. These observations establish record presence, not actual outbound mail authentication or Search Console account ownership. Preserve the Google verification TXT.
- Production HEAD responses include X-Frame-Options: DENY; X-Content-Type-Options: nosniff; Referrer-Policy: strict-origin-when-cross-origin; Permissions-Policy: camera=(), microphone=(), geolocation=(); and CSP: base-uri 'self'; object-src 'none'; frame-ancestors 'none'. The custom domain also returns HSTS max-age=2592000. The four retired download paths each return 404 on jcfinfra.com, www.jcfinfra.com and jcfinfra-website.pages.dev (12 combinations), with noindex/nofollow. The root pages.dev response did not include HSTS; zone-level headers must not be assumed to apply to that separate hostname.
- An additional 33-check production series passed, including ten routes, twelve image hashes, sitemap and removed downloads. Historical Git review was completed for the history reachable from fetched public branches, tags and PR heads. It is not an audit of unreachable server objects, third-party clones or caches.

### Owner-reported facts not independently revalidated here

- Cloudflare Access policy “Allow Members - Cloudflare Pages” uses Include > Emails with only the owner's email. No email address or authentication data is reproduced here.
- Cloudflare DMARC Management was enabled by the owner. A reminder already exists for 25 November 2026 to review reports before considering quarantine; the agent did not create or verify that reminder.
- Search Console domain property is DNS-verified; the submitted https://jcfinfra.com/sitemap.xml shows Success and eight pages. The public sitemap and verification TXT were checked, but the Search Console console result was not independently inspected.
- The owner reviewed 2FA and backup codes in GitHub, Cloudflare, Zoho, Google and Microsoft. No codes or credentials were requested or inspected.
- At the owner's handoff, Pages held six deployments: three production and three previews; none were deleted. A documentation PR can add further deployments, so six is a dated inventory, not a permanent final count.

### Historical files and privacy findings

The complete set of paths found with deletion events in the fetched public history is:

| Path | Review finding |
|---|---|
| docs/cv-downloads-sha256.json | Hash manifest; no personal contact values found |
| public/_headers | HTTP configuration; no personal contact values found; the path was subsequently reintroduced |
| public/downloads/Juan_Carlos_Flores_CV_EN.docx | Historical professional CV; personal/professional profile and contact information |
| public/downloads/Juan_Carlos_Flores_CV_EN.pdf | Historical professional CV; personal/professional profile and contact information |
| public/downloads/Juan_Carlos_Flores_CV_ES.docx | Historical professional CV; personal/professional profile and contact information |
| public/downloads/Juan_Carlos_Flores_CV_ES.pdf | Historical professional CV; personal/professional profile and contact information |

Extracted PDF text and DOCX XML review found name, city/country, contact email, profile links, education and employment history in the four documents; no phone number, exact residential address or identity-document number was identified in those documents. This is a bounded content review, not a forensic guarantee. Separately, a historical version of the Spanish Markdown CV contains a phone number. That source path was modified rather than deleted, so a deleted-files-only scan would miss it. The number and retrieval pointer are deliberately omitted from this public record. Current source removal and download 404 responses do not erase historical exposure.

Options requiring a separate owner decision: retain the history while accepting the residual exposure; or plan a backed-up, targeted history rewrite and coordinate affected branches/tags/clones plus GitHub support where retained PR references or caches are involved. Rewriting changes commit identities, can disrupt collaborators and references, and cannot guarantee deletion of third-party copies. Deleting Pages deployments or Git branches alone does not remove the historical Git content. No rewrite, deletion or force push was performed.

### Closure and follow-up

Phase 7 delivery and this verification are complete, with the historical privacy finding explicitly outstanding for an owner remediation decision; do not describe the repository history as sanitized. The review itself is complete, while destructive cleanup remains unapproved.

- DNSSEC Active/protected confirmation: completed during this review. If the panel later shows Pending again, investigate; do not merely wait indefinitely.
- DMARC: review accumulated reports on 25 November 2026, using the owner's existing reminder. Keep p=none until legitimate senders and SPF/DKIM alignment have been validated; no delivery test or quarantine/reject change was performed here.
- DNS migration precaution: do not change nameservers or transfer the domain with DNSSEC active without first disabling it under the agreed migration procedure and verifying removal of the old DS/delegation state. Do not blindly alter nameservers or DS records.
- Account recovery and Search Console console results remain owner attestations as labeled above. A SECURITY.md reporting policy can be considered separately; no additional security feature activation is implied by this closure.
