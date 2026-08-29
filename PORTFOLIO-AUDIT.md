# Portfolio Audit, Irfan Akram

Audit date: 28 August 2026
Scope: full codebase inspection, content verification against source documents, browser inspection at eight viewports, accessibility, functional, SEO, performance and code-quality review.

## Sources used for verification

| Source | Date | Status |
| --- | --- | --- |
| `~/Downloads/updated_profile2.pdf` (LinkedIn export) | 28 Aug 2026 | **Primary corrected source.** Used for the employment timeline, titles, dates, locations, project scope and education. |
| `~/Downloads/updated_profile.pdf` (LinkedIn export) | 27 Aug 2026 | Corroborates the same timeline and titles. |
| `~/Downloads/Profile.pdf` (LinkedIn export) | 27 Aug 2026 | Superseded. Byteimpulse start date and several titles differ. Not used. |
| `~/Documents/IRFAN/Irfan-Resume.pdf` | 3 Aug 2026 | Superseded for employment data. Used only for project names and product links, which were then re-verified online. |
| `~/Documents/IRFAN/Portfolio.pdf` | 16 Mar 2026 | Superseded. Claims "8+ years" and a "Mobile Engineer, Full Stack Developer" identity. Not used. |
| Source repositories on disk (`babel-lambda-api`, `babel-admin-panel`, `babel-chatbot`, `pos-*`, `ubq_flutter`) | current | Used to verify the technology stack for Babel, SrvQube and UBQ. |
| Live HTTP checks and web search | 28 Aug 2026 | Used to verify every external link before publishing it. |

Decision rule applied throughout: where sources conflict, the latest explicitly corrected source wins. Where nothing reliable exists, the claim is omitted from the site and recorded in `CONTENT-REVIEW.md`.

## Overall assessment before the fixes

The visual system, responsive scaffolding and accessibility baseline were already strong. The failure was content. The site shipped with verification placeholders rendered publicly, an empty experience section, an unusable resume section, a `credibility` array that no component consumed, and case studies that told a recruiter almost nothing. A recruiter could learn Irfan's name and general positioning in 20 seconds but could not learn where he works, what he has actually built, or how long he has been doing it.

## Recruiter 20-second test

| Signal | Before | After |
| --- | --- | --- |
| Name | Pass | Pass |
| Target level | Pass | Pass |
| Technical Lead and Lead Software Engineer positioning | Pass | Pass |
| Seven or more years of experience | Weak, buried in one sentence | Pass, in the summary and the credibility strip |
| Hands-on technical capability | Partial | Pass, stated in the hero and shown in every case study |
| Leadership and delivery capability | Partial | Pass |
| Software architecture experience | Partial | Pass |
| Backend and API experience | Partial | Pass |
| AI automation and LLM integration | Named only, no evidence | Pass, evidenced by the Babel assistant and the automation stack |
| Mobile as a supporting strength | Pass | Pass, deliberately kept below leadership and architecture |
| Location and work availability | **Fail**, not in the first screen | Pass, in the hero meta line |
| Access to case studies, resume, LinkedIn, contact | Partial, resume section was a dead end | Pass |

## Market relevance observations

Reviewed current Technical Lead, Lead Software Engineer and senior AI engineering postings in the UAE, Saudi Arabia and remote-first employers (GulfTalent, Bayt, Indeed AE, Glassdoor, Crossover, FoundIt Gulf, August 2026).

- "Technical Lead" and "Lead Software Engineer" remain the dominant titles. The existing positioning is correct and needed no change.
- Postings ask for 5 to 8 years, with 7+ common for lead roles. Irfan's 7+ years is at the right level and should be visible immediately, so it moved into the credibility strip.
- Gulf employers consistently ask for a lead who still codes. The wording used is close to "combines hands-on expertise with leadership acumen". The hero and About now say this plainly instead of implying it.
- LLM and agent work is now a named requirement rather than a nice to have, and postings ask for concrete artefacts, for example "built at least one useful AI agent or automation artifact". Buzzword lists score badly here. The site therefore describes the Babel assistant, vector search and n8n automation as specific delivered work.
- Remote-first postings emphasise location, overlap and relocation status. This is now in the first screen and again in Contact.
- No skill was added to the site because a posting asked for it. Only verified capability is listed.

## Findings

Severity key: Critical, High, Medium, Low.

### Content and accuracy

| # | Section | Problem found | Severity | Planned improvement | Final status |
| --- | --- | --- | --- | --- | --- |
| C1 | Case study modals | `collaboration` fields rendered sentences such as "Irfan's exact role and team structure still require verification" to the public. | Critical | Replace with verified collaboration statements. | Fixed |
| C2 | Case study modals | `pending-note` rendered "Additional contribution and outcome details will be published after verification." | Critical | Remove the component and the styles. Every featured case study now has real content. | Fixed |
| C3 | Resume section | Rendered "The verified resume will be available here before publication." to the public. | Critical | Rebuilt the section around the verified record, education and a LinkedIn action. No placeholder text remains. | Fixed |
| C4 | Case studies, Babel and SrvQube | `overview` text said details "are intentionally withheld until they can be verified". | Critical | Replaced with verified product descriptions from the corrected source and the repositories. | Fixed |
| C5 | Experience | Section was empty and hidden. A recruiter had no timeline, no company names and no proof of seniority. | Critical | Populated from the corrected LinkedIn export and enabled. | Fixed |
| C6 | Data file | `verificationTodo` export carried 30+ TODO strings in shipped source. | High | Deleted. Outstanding gaps now live in `CONTENT-REVIEW.md` only. | Fixed |
| C7 | Data file | Byteimpulse start date conflicted across three sources: 02/2024, July 2024 and August 2025. | High | Used August 2025 from the two most recent corrected exports. Conflict recorded. | Fixed, recorded |
| C8 | Data file | Job titles conflicted between the August resume and the corrected exports for BookJane, Tech Scale, Techsila and Geeklone. | High | Used the corrected export titles. | Fixed, recorded |
| C9 | Experience | Jovian Digital, Al Marhaba and NIC Lahore were absent from the resume but present in the corrected export. | High | All eight roles published. | Fixed |
| C10 | Credibility | `portfolio.credibility` existed in data but no component rendered it. Dead data. | High | Built as a four-item metric strip below the hero, then removed at Irfan's request. The `credibility` array is deleted rather than left dead, and the portrait keeps its "7+ Years" badge. | Removed by request |
| C11 | Case study links | Resume listed a UBQ Play Store link with a typo (`businessmpire`). The corrected package `com.app.businessempire` and the App Store listing both return 404, and `ultimatebusinessquest.com` is a parked domain. | High | No UBQ link published. | Retained as omission, recorded |
| C12 | Case study links | eezly had no links. `eezly.com` does not resolve over HTTPS. | Medium | Published the verified Google Play and App Store listings found by search and confirmed with live requests. | Fixed |
| C13 | Case study links | Minplan package `com.myplan.norway` returns 404 and two different Minplan apps exist. | Medium | No Minplan link published. | Recorded |
| C14 | About | Two generic paragraphs with no company, product or evidence. Read as AI-written. | High | Rewritten around what he actually leads today and what he built before. | Fixed |
| C15 | Expertise | Skills were plausible but generic, and verified stack items such as NestJS, PostgreSQL, Redis, GitHub Actions and vector search were missing. | Medium | Curated against the repositories and the corrected export. | Fixed |
| C16 | Expertise | Cards 4, 5 and 6 hid all skills after the second one on desktop, so the AI card showed only two labels. | Medium | Raised to three and matched the data to the visible count. | Fixed |
| C17 | How I Work | Descriptions ran to two clauses each and repeated About. | Medium | Cut to one short sentence each. | Fixed |
| C18 | Education | Not present anywhere on the site. | Medium | Added to the Resume section. | Fixed |
| C19 | Contact | Availability sentence mentioned relocation but the hero did not, and the phrasing leaned slightly toward services. | Medium | Split into a location line in the hero and a short full-time statement in Contact. | Fixed |
| C20 | Site metadata | `helloirfan.com` is configured as the canonical domain but currently serves an unrelated WordPress and local SEO business site. | High | Domain left configured so canonical, sitemap and Open Graph stay valid. Conflict recorded for Irfan to resolve. | Recorded |
| C21 | Case studies | Six of seven entries had no technologies, no role and no outcome, so cards carried almost no information. | High | Every featured case study now has role, technologies, contribution, approach and outcome. | Fixed |
| C22 | Case studies | YellowBeard and Minplan sat in the data as unpublished stubs with placeholder descriptions. | Medium | Converted into a compact "Also shipped" list with a verified link where one exists. | Fixed |

### Header and navigation

| # | Problem found | Severity | Planned improvement | Final status |
| --- | --- | --- | --- | --- |
| H1 | Closed mobile menu used `max-height: 0` with `overflow: hidden`, so its links stayed in the keyboard tab order and in the accessibility tree while invisible. | Critical (a11y) | Added `visibility: hidden` plus `inert` on the closed wrapper. | Fixed |
| H2 | Mobile menu did not close on outside click and did not restore focus to the toggle after Escape. | Medium | Added outside click handling and focus restoration. | Fixed |
| H3 | `max-height: 520px` open state was close to the content height once Experience was enabled, risking a clipped last item. | Medium | Raised to 640px. | Fixed |
| H4 | Navigation `requires` filter used an `as "showExperience"` cast that would silently pass any string. | Low | Typed the flag lookup properly. | Fixed |
| H5 | Header CTA and brand were fine; active-section indication, sticky behaviour, scroll opacity and anchor offsets all verified. | n/a | No change. | Retained |

### Hero

| # | Problem found | Severity | Planned improvement | Final status |
| --- | --- | --- | --- | --- |
| HE1 | No location, availability or relocation signal in the first screen. | High | Added a meta line with location and availability. | Fixed |
| HE2 | No credibility signals in or near the first screen. | High | A verified metric strip was added, then removed at Irfan's request. The "7+ Years" portrait badge and the "7+ years" clause in the summary carry the signal instead. | Removed by request |
| HE3 | Summary named capabilities but not current scope. | Medium | Added the current lead scope in one clause. | Fixed |
| HE4 | Portrait framing verified. Source is 1080 by 1080 with headroom, the frame is taller than wide, `object-fit: cover` crops horizontally only, so the top of the head is never cut. | n/a | Kept `50% 20%`. | Retained |
| HE5 | Hero minimum height of 850px produced dead space on short laptop viewports at 1024 by 768. | Medium | Changed to a viewport-aware minimum. | Fixed |
| HE6 | The hero needed 934px of vertical space at any width, so on a normal laptop the buttons, profile links and most of the portrait sat below the fold. It only fitted above roughly 960px of viewport height. | High | Headline and summary now scale with viewport height above the mobile breakpoint, with two height tiers tightening the rhythm and the portrait. Verified fitting at 1280x720, 1440x790, 1512x760 and 1440x900, and locked in by a regression test. | Fixed |

### Case study dialog

| # | Problem found | Severity | Planned improvement | Final status |
| --- | --- | --- | --- | --- |
| D1 | Dialog rendered inside `<main>`, so background content stayed in the accessibility tree and reachable by assistive technology while the dialog was open. | High (a11y) | Portalled to `document.body` and marked the header and main `inert` while open. | Fixed |
| D2 | Mobile bottom sheet had no safe-area padding, so the last content sat under the home indicator. | Medium | Added `env(safe-area-inset-bottom)` padding. | Fixed |
| D3 | Locking scroll with `body { overflow: hidden }` caused a layout shift on desktop when the scrollbar disappeared. | Low | Measured the scrollbar width and compensated with matching body padding while the dialog is open. | Fixed |
| D4 | Escape handling, focus trap, focus restoration, independent scrolling, heading order and empty-field handling were already correct. | n/a | No change. | Retained |

### Visual and responsive

| # | Problem found | Severity | Planned improvement | Final status |
| --- | --- | --- | --- | --- |
| V1 | Contact location was absolutely positioned at `bottom: 30px` and overlapped the action buttons between roughly 1024px and 1100px. | High | Moved into normal flow with the actions. | Fixed |
| V2 | `.additional-projects` was referenced by the no-backdrop-filter fallback but no such element existed. Dead selector. | Low | Now a real element with matching styles. | Fixed |
| V3 | Expertise section used a card grid immediately after the About card panel, and Case Studies then used more cards. Section rhythm was card-heavy. | Medium | Credibility strip and the "Also shipped" row use non-card compositions, and Experience uses a timeline rather than cards. | Fixed |
| V4 | Focus ring used the warm accent at 3px, which is visible but competes with the slate system on dark sections. | Low | Kept warm on light surfaces, added a light ring on dark sections. | Fixed |
| V5 | Verified no green or teal values anywhere in the stylesheet or markup. Accent palette is slate `#2f3647` with a restrained warm `#8b4f32`. | n/a | No change. | Retained |
| V6 | Verified no horizontal overflow at 320, 375, 390, 430, 768, 1024, 1280 and 1440 wide. | n/a | Automated in the test suite. | Retained |

### Functional

| # | Problem found | Severity | Planned improvement | Final status |
| --- | --- | --- | --- | --- |
| F1 | Hero secondary button pointed at a resume section that contained no working action. | High | Section rebuilt with a working LinkedIn action, and resume actions appear automatically once the file is added. | Fixed |
| F6 | After navigating, the band across the top of the viewport still belonged to the previous section, in three separate ways: a 26px readable strip of it sat directly below the header pill, the pill itself was translucent enough to read page text through (Resume's "View LinkedIn Profile" collided with the nav labels), and the floating pill leaves content visible beside and above it. The three together read as two sections mixed on screen. | High | `--header-offset` reduced to 82px desktop and 68px mobile so a section's top edge lands at the header's bottom edge; header opacity raised to 0.985 when scrolled; a masked blur scrim added across the top band while scrolled so content passing beside the pill becomes an indistinct wash rather than readable text and card edges. | Fixed |
| F7 | `#contact` could never reach the header because it is the last section and the document ran out of scroll, leaving the whole Resume section on screen above it. | High | Contact plus the footer now size to the viewport, so the anchor has room to land and the closing screen is a single clean section. | Fixed |
| F5 | Anchor navigation overshot every section by exactly one header height. `html` carried `scroll-padding-top: var(--header-offset)` while each section also carried `scroll-margin-top: var(--header-offset)`. The two add together, so clicking a nav item landed the section 212px down instead of 106px, leaving an empty band under the header. | High | Removed the `scroll-padding-top` and kept `scroll-margin-top` on the targets. Every section now lands at 106px against an 80px header. Locked in by a regression test that asserts each target lands against the header bottom and that the strip below the header belongs to the target section. | Fixed |
| F2 | External links used `rel="noreferrer"` without `noopener`. `noreferrer` implies `noopener` in current browsers, but the pair is the safer explicit contract. | Low | Standardised on `rel="noopener noreferrer"`. | Fixed |
| F3 | Every external URL on the site was checked with a live request. Dead links were not published. | n/a | See C11, C12, C13. | Fixed |
| F4 | Copy-email control, clipboard fallback to `mailto:`, live region announcement, back to top, nav anchors and modal controls all verified working. | n/a | No change. | Retained |

### Accessibility

| # | Problem found | Severity | Planned improvement | Final status |
| --- | --- | --- | --- | --- |
| A1 | Closed mobile menu focusable. See H1. | Critical | Fixed. | Fixed |
| A2 | Background not inert behind the dialog. See D1. | High | Fixed. | Fixed |
| A3 | Case study cards exposed the project name as an `h3` but the trigger button read only "View Case Study", so a screen reader link list gave five identical controls. | High | Buttons now carry an accessible name that includes the project. | Fixed |
| A4 | Credibility strip values such as "7+" and "100K+" needed to read as a labelled pair, not two loose fragments. | Medium | Marked up as a description list. | Fixed |
| A5 | Skip link, landmarks, heading order, `prefers-reduced-motion`, 44px targets, live region and colour contrast were already correct and were re-verified with axe-core across WCAG 2.0 A, 2.0 AA, 2.1 AA and 2.2 AA, page and dialog, with zero violations. | n/a | No change. | Retained |

### SEO and social

| # | Problem found | Severity | Planned improvement | Final status |
| --- | --- | --- | --- | --- |
| S1 | Person JSON-LD had no employer, no education, a single-string `jobTitle` and a thin `knowsAbout` list. | Medium | Added `worksFor`, `alumniOf`, `knowsLanguage`, `image`, a two-value `jobTitle` and an expanded but still accurate `knowsAbout`. Asserted in the test suite. | Fixed |
| S2 | JSON-LD contained no private data. Phone number deliberately excluded. | n/a | Verified, still excluded. | Retained |
| S3 | Meta description did not mention the current role or location, both of which recruiters search on. | Medium | Rewritten. | Fixed |
| S4 | Sitemap `lastModified` used `new Date()`, which changes on every build and gives crawlers a false freshness signal. | Low | Pinned to a build constant. | Fixed |
| S5 | Canonical, Open Graph, Twitter card, favicon, robots and `metadataBase` were correctly wired. Domain conflict is C20. | n/a | No change. | Retained, recorded |
| S6 | Open Graph image is a generated placeholder rather than an approved brand asset. | Low | Kept, recorded for Irfan. | Recorded |

### Performance and code quality

| # | Problem found | Severity | Planned improvement | Final status |
| --- | --- | --- | --- | --- |
| P1 | `Analytics` component always returned null and shipped as a no-op. | Low | Removed. The integration point is documented in the README instead. | Fixed |
| P2 | `verificationTodo` shipped as dead source. | Medium | Removed. | Fixed |
| P3 | Portrait was the only image and was already `priority` with correct `sizes`. Static export uses unoptimized images by design. | n/a | No change. | Retained |
| P4 | Backdrop blur count was high but each surface is small and static. No blur was added by this pass, and the `@supports` opaque fallback still covers unsupported browsers. | n/a | No change. | Retained |
| P5 | Font loads through `next/font` with `display: swap`, self-hosted, no layout shift. | n/a | No change. | Retained |
| P6 | Lighthouse cannot be run in this environment. Equivalent checks used instead: production build output review, axe-core across four WCAG rule sets, console error assertions at every viewport, layout overflow assertions, and static export payload inspection. | n/a | Stated plainly rather than claimed. | Retained |

### Found during implementation and browser inspection

These were not visible in the source read. They surfaced only after the new content was rendered in Chrome at each viewport.

| # | Section | Problem found | Severity | Improvement | Final status |
| --- | --- | --- | --- | --- | --- |
| B1 | Expertise | The bento used fixed 196px and 204px row heights with `overflow: hidden`. The corrected skill lists overflowed and clipped mid-tag on four of six cards. | High | Rows changed to `minmax(196px, auto)` and `minmax(204px, auto)`, and the two largest lists trimmed to five items. | Fixed |
| B2 | Hero | The portrait carried a "7+ Years" badge sitting roughly 200px above a "7+ Years in software engineering" figure in the new credibility strip. Same fact, twice, in one screen. | Medium | Removed the badge. The strip owns the number and the hero summary states it in prose. | Fixed |
| B3 | Case study dialog | At `rgba(255,255,255,.91)` over a `blur(8px)` backdrop, page text behind the sheet stayed legible through the panel and competed with the dialog copy. | Medium | Dialog raised to `.96`, top bar to `.94`, backdrop darkened to `.6`. The glass character is kept by the blur, not by transparency. | Fixed |
| B4 | Mobile menu | Same problem at `rgba(255,255,255,.94)`. Hero copy read through the open menu. | Medium | Raised to `.97`. | Fixed |
| B5 | Case study dialog | On the lighter steel and warm accents, the hero eyebrow, description and role chip fell to between 3.4:1 and 3.9:1. The previous suite only checked the first dialog, which used the darkest accent, so this never surfaced. | High (a11y) | Text opacities raised and the steel accent darkened to `#414c60`. All five dialogs now pass axe. | Fixed |
| B6 | Process and Contact | The same muted white was used for body copy on the dark sections at `.68`, which is close to the 4.5:1 line. | Medium | Raised to `.76` and `.78`. | Fixed |
| B7 | Hero, Footer | Profile and footer links were roughly 21px tall, under the WCAG 2.2 24px minimum target size. | Medium (a11y) | Given a 44px minimum height, with the hero meta spacing rebalanced so the row does not grow. | Fixed |
| B8 | Hero | At 375 wide, "View Case Studies" wrapped to two lines inside a two-column button grid. | Low | Buttons stack full width below 600px. | Fixed |
| B9 | Hero | The location and availability line left a dangling separator dot at the end of the first line when it wrapped on narrow screens. | Low | Divider hidden below 600px and availability forced onto its own line. | Fixed |
| B10 | Experience | The Jovian Digital summary and its first bullet said the same thing in almost the same words. | Medium | Merged into the summary. The four oldest roles were also trimmed to one bullet each so the timeline stays readable. | Fixed |
| B11 | Stylesheet | Six design tokens were declared and never referenced, and one selector still guarded a removed class. | Low | Removed. | Fixed |

## Final state

- Lint: clean.
- TypeScript: clean under `strict`.
- Production build: succeeds, static export.
- Browser tests: full Playwright suite green, 12 tests, including axe-core with zero violations on the page and inside all five dialogs, anchor scroll alignment, and above-the-fold hero fit.
- Viewports inspected: 320x568, 375x812, 390x844, 430x932, 768x1024, 1024x768, 1280x800, 1440x900.
- No placeholder, TODO or "pending verification" text is rendered anywhere on the public site.
- No green or teal value exists in the stylesheet or markup.
- Every published external link returns a live response.
- Outstanding factual gaps are listed in `CONTENT-REVIEW.md`.
