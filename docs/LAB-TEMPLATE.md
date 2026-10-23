# Reusable laboratory case-study template

Use for personal VMware vSphere, Hyper-V, Azure Networking, OCI, Fortinet, Linux or monitoring exercises. Publish an English case and a complete Spanish equivalent; retain source-language screenshots. Omit inapplicable sections rather than inventing content. Mark unknowns explicitly. This document is a template, not a completed lab or a requirement to build LAB-004.

## Identity and status

- LAB-ID / title / author / exercise date / documentation review date.
- Status: planned, in progress, historical completed exercise, or archived.
- Personal learning scope; distinguish original lab source, assistance and your own actions.
- One-paragraph summary: problem → decision → observed result → main limitation.
- Resource status: active, deleted or not rechecked; never imply live health from old screenshots.

## Problem and objective

Describe the concrete symptom or need, intended outcome, success criteria and exclusions. Separate the learning objective from production requirements. Avoid client or employment claims unless independently supported and authorized.

## Environment, prerequisites and costs

Record versions/SKUs, region, resource scope, topology, permissions and prerequisites only when known. Separate prepared configuration from observed deployed state. State cost drivers, date/currency of any estimate, free-tier restrictions, budget and cleanup plan. Recheck pricing and quota before a new run; never present one account's limits as universal.

Keep credentials out of examples. Use placeholders for private identifiers and explain them. Do not publish third-party or employer configurations.

## Architecture and decisions

Provide a readable diagram: client, ingress, network boundaries, services, dependencies, management path and relevant traffic flows. Label historical addresses and hypothetical components. Record why each choice was made, alternatives and tradeoffs. Do not infer high availability, encryption, redundancy or a firewall policy from a generic diagram.

## Procedure

1. Inventory the starting environment and preserve originals.
2. Prepare configurations or scripts; distinguish executable artifacts from incomplete excerpts.
3. Review the intended change (validation/What-If/diff as applicable).
4. Apply only to the stated lab environment; record relevant steps and versions.
5. Validate the service and the user-facing result separately.
6. Preserve sanitized results and document cleanup/recovery.

For a future reproduction guide, explicitly say that it has not been executed. Identify destructive steps, prerequisites, stop conditions and expected results. Never reuse a historical endpoint as an instruction to contact a current third party.

## Validation matrix

| Check | Method and context | Expected result | Actual result/date | Evidence ID | Limit |
|---|---|---|---|---|---|
| Replace with a real check | Command or UI path, host and scope | Prediction | Observed / not run / unknown | E01 or historical record | What this cannot prove |

Separate configuration, connectivity, application health and resilience. If failure/load/security tests were not performed, say so. An expected result is not evidence. Avoid unexplained percentages, guaranteed distribution or unsupported success claims.

## Troubleshooting

Record symptom → hypotheses → evidence → action → observation. Distinguish confirmed cause from unresolved possibilities. A successful workaround does not prove the original cause. Identify the affected component without generalizing one log to all hosts.

## Evidence and provenance

For each item, record ID, capture date, publication file, SHA-256, source record retained privately, edits such as crop/redaction, visible fact and limitation. Preserve originals outside the public repository. Review images and text for account details, tokens and unrelated private information before any push; previews may be public.

Public links should say “Open published screenshot” / “Abrir captura publicada” when they open a cropped copy. Link to the evidence register. Hashes prove preservation, not authenticity of every claim. Never generate or reconstruct a result screenshot.

## Results, limitations and lessons

Compare actual results with the objective. Identify unfinished checks and uncertainty. Add a concise interview explanation: what you did, why, what you observed and what you would test next. Keep recommendations separate from implemented controls.

## Technology-specific prompts (use only when applicable)

| Area | Details worth recording |
|---|---|
| VMware / Hyper-V | Host/hypervisor version, storage and virtual switching; snapshot vs backup; migration prerequisites and whether failure recovery was actually tested |
| Azure / OCI | Region, network/subnet scope, routes, security controls, backend/probe configuration; quota, cost and cleanup |
| Fortinet | FortiOS/version, policy direction, objects, NAT and logging; sanitized traffic/event correlation and untested controls |
| Linux | Distribution, packages, systemd/service state, permissions, logs, ports and recovery steps |
| Monitoring | Metric/log source, collection interval, alert condition, test stimulus, observed notification and retention; no invented SLA |

## References and release checklist

- Official documentation and original exercise source, with review date or source revision where available.
- Technical claims traced to evidence; no private material in source or build.
- EN/ES parity, accessible headings, captions, working links and mobile/desktop review.
- Relevant checks/build pass; preserve evidence hashes; review diff, CI and preview.
- Record approval, PR, source commit, deployment and post-release checks. Close only after blockers are resolved. Do not require an unrelated new lab to close the current case.
