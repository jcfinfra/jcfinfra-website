# Laboratory evidence register

Reviewed 23 October 2026 (America/Lima). Baseline: `dfbbbc72c961dc3d65312b3a50a8d0b4190f54d6`.

These are personal, historical learning exercises, not client projects or current service-health reports. Public images are cropped publication copies of original captures. Original files and private recovery records stay outside this repository. No reconstructed or generated evidence is used.

## Evidence classes

- **Public capture:** a reader can inspect the linked image. Claims must stay within the visible content.
- **Historical record:** a previously recorded action or observation, not independently established by the public crop. It must not be presented as a new test.
- **Future procedure:** proposed reproduction or validation, not a completed result.

The [SHA-256 baseline](lab-evidence-sha256.json) covers all 12 publication files. `npm run verify` compares both `public` and `dist` against it. The baseline must not be regenerated simply to make an unexpected change pass. Original replacement requires separate approval and provenance review. Hashes establish file preservation, not that every historical claim is true.

## LAB-001

Case: 14 October 2026. Separate configuration review: 15 October 2026.

| ID | Public capture | What it establishes | What it does not establish |
|---|---|---|---|
| E01 | [Request](../public/labs/001/e01-request.png) | GET `/.git/config`, sampled request details and Not mitigated label | Response code/body, file disclosure, successful intrusion or personal attribution |
| E02 | [Rule editor](../public/labs/001/e02-rule.png) | Expression, Block action and selected Active state in editor | Deployment by itself |
| E03 | [Saved rule](../public/labs/001/e03-saved.png) | Rule listed with Block action | Attribution of a particular blocked request or success measured by event count |
| E04 | [Block page](../public/labs/001/e04-block.png) | A Cloudflare block page | Exact matching rule, response status, scheme or Ray ID |

The [original release record](LAB-001-release.md) contains source attachment identifiers, crop coordinates and the historical HTTPS HEAD observation (200; HSTS max-age=2592000). HTTP/HTTPS browser attempts are owner-reported historical results; the public crop cannot distinguish a raw HTTP response from an upgraded request.

The 15 October review records saved SSL/TLS, HSTS, sensitive-path, rate-limit and DDoS settings. Those additional settings are **historical observations without accompanying public captures** in this gallery. They have not been re-audited in Phase 5. The original Git rule and the later combined rule represent different points in time. The old production commit is historical, not the current release identifier.

The event IP and ASN remain as bounded event context; neither identifies a person. The separate Pages hostname is not assumed to inherit zone WAF protection. No sensitive-path probing, burst, penetration or resilience test was run for Phase 5.

## LAB-002

Case: 28 September 2026; Application Gateway and two IIS backends.

| ID | Public capture | What it establishes | What it does not establish |
|---|---|---|---|
| E01 | [Backend health](../public/labs/002/e01-backend-health.png) | Two Healthy targets, 10.0.1.4 and 10.0.1.5; HTTP/80; received 200 | Failover, load resilience or current availability |
| E02 | [BackendVM2 response](../public/labs/002/e02-backend-vm2.png) | Response body containing BackendVM2 | Frontend URL, HTTP status or routing path |
| E03 | [BackendVM1 response](../public/labs/002/e03-backend-vm1.png) | Response body containing BackendVM1 | Frontend URL or uniform distribution |

The shared frontend context is retained in private originals, not these response-body crops. The local recovery register maps E01/E02/E03 to original captures m5-7/m5-8/m5-9 and records crop coordinates and hashes. Phase 5 verified all three original/public hash pairs against that register, without publishing the originals.

`main.Juan-existing-network.bicep`, the parameter-file adaptation, compilation, What-If (six creates and three ignored resources), successful incremental deployment and backend registration are **historical records**. The complete files and raw What-If/deployment outputs are not public artifacts here. The published `existing` excerpt is illustrative and assumes the same resource scope; it is not an executable deployment package. Do not infer deployed SKU or current regional quota from a prepared parameter file.

No new Azure queries or deployments were run. The case records that its resources were deleted. The new reproduction guide is a future procedure and does not fill missing evidence with assumed results.

## LAB-003

Case: 19 September 2026; internal Standard Load Balancer recovery.

| ID | Public capture | What it establishes | What it does not establish |
|---|---|---|---|
| E01 | [Initial health](../public/labs/003/e01-unhealthy.png) | Three Down backends; 0% healthy; TCP probe timeouts and VM/IP mapping | Exact network or application root cause |
| E02 | [Extension error](../public/labs/003/e02-extension-error.png) | VMConfig download failure for install-iis.ps1 | VM identity visible in the crop, identical failures on all VMs, exact outbound failure cause |
| E03 | [IIS repair](../public/labs/003/e03-iis-repair.png) | Script, execution complete and successful Web-Server installation output | VM identity visible in the crop or success of every command on every VM |
| E04 | [Later health](../public/labs/003/e04-healthy.png) | Three Up backends; 100% healthy | HTTP correctness by itself, load or failover results |
| E05 | [Client responses](../public/labs/003/e05-client-responses.png) | Fifteen curl invocations to 10.1.2.4 and output containing all three backend names | Client VM identity visible in the crop, guaranteed coverage or uniform distribution in another run |

The historical recovery record attributes E02/E03 to myVM1 and E05 to myTestVM; the cropped images do not independently expose those VM identities. Private originals map to study-20/21/22/26/30 respectively. Phase 5 verified all five original/public hash pairs against the local recovery register. That private register and full screenshots are not published.

Prepared Standard_B1s parameter files are historical preparation evidence, not exported deployment state. No new Azure query, endpoint test, failover or load test was run. The exact cause of the script-download failure remains undetermined. Traffic Manager is not a completed result of this case.

## Publication review

Keep EN/ES equivalent, preserve original screenshot language and explain limits in both captions and results. Before a release, check all eight routes, evidence files, language links and return navigation; review the public preview because pushes can publish it. Do not copy credentials, subscription identifiers, private histories, employer configurations or original screenshots into a preview.

See [the reusable template](LAB-TEMPLATE.md) and [Phase 5 closeout](PHASE-5-closeout.md).
