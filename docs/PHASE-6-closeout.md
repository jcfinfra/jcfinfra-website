# Phase 6 consolidated release — 25 October 2026

## Current scope

This record supersedes the download policy of PR #9 (baseline 1a6798cba41c2a7bd4017630af326dfc7efeee4b). Juan authorized the consolidated prompt and its production verification. Public CVs are HTML only at /es/cv/ and /cv/, without phone numbers, with noindex/nofollow and sitemap exclusion. The homepage CV links remain.

The four former Word/PDF downloads and their obsolete header/hash files are removed. A top-level 404 page prevents Cloudflare Pages from serving the homepage as a successful response for missing downloads. Current-tree removal does not erase Git history, cached copies or previous immutable deployments.

Home and both CVs use the same contact email. Requested wording, location, new experience bullets, availability and NOC exposure qualifiers are aligned in both languages. Employment dates and titles are retained; Tgestiona/Experis dates are unchanged. DNS remains on the home skills list and does not appear in either CV.

## Validation and boundaries

Local checks: Astro check, build and build verifier. Ten content routes plus the 404 page; twelve laboratory evidence hashes unchanged. Build verification checks no CV download files/links, CV noindex, sitemap exclusion and the unified email. Preview and production HTTP checks are recorded separately in the local delivery report and PR.

Design, stylesheet content, labs, evidence, DNS, WAF and dependencies are unchanged. Removing the obsolete download-specific _headers file does not change the separately managed zone security headers. No security or mail recommendations have been applied.

Private application documents and backups are outside this repository. All content and metadata were checked against the corrected sources. Both private exports currently have four pages: a fixed certification page break follows a spilled ONPE bullet. They remain drafts until Juan approves a pagination-only adjustment and the three-page limit is verified. No layout reduction was applied.

Remote reachable branches, tags and PR refs were inspected: no master or private CV document matched the inspected files; four prior phone-free public document blobs and an older HTML CV containing a phone remain in history. Do not push local preparation branches containing private artifacts. Historical deletion requires a separately reviewed cleanup.

## Analytics and LinkedIn (unchanged)

Cloudflare Web Analytics was previously verified in the dashboard. Query parameters work for navigation, but Web Analytics does not collect query strings, so it cannot group visits by ?ref=company. Referer is a different dimension. See the [official FAQ](https://developers.cloudflare.com/web-analytics/faq/).

LinkedIn remains instructions-only: website in Contact info; Application Gateway, internal Load Balancer and Cloudflare WAF case studies in Featured; exclude the CV. No profile edit was performed.

## Exact download route response
Production retained old download assets after single-file and full cache purges. A Pages Function now explicitly returns 404/no-store/noindex for only the four removed URLs. _routes.json limits invocation to those paths; the rest of the site remains static. GET, HEAD, query parameters and unrelated-path fallback are tested. No new dependencies or zone rules are introduced. Old immutable deployments and Git history remain outside this change.
