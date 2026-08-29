# Content Review, items that need Irfan's input

Everything on the site right now is supported by a verified source. The items below could not be
verified, or two sources disagreed. Nothing here is blocking publication: each one already has a
safe behaviour on the live site. Fixing them makes the site stronger.

Ordered by impact.

---

## 1. Deployment domain conflicts with a live site

**Section:** Site metadata, canonical URL, Open Graph, sitemap, robots.
**Missing or conflicting:** `portfolio.site.domain` is set to `https://helloirfan.com`. That host is
live right now and serves a different business, titled "I Fix Websites That Don't Bring Customers |
Hello Irfan", with a WordPress repair and local SEO description.
**Why it matters:** Canonical URL, Open Graph, Twitter card, sitemap and `metadataBase` all point at
that host. If the portfolio deploys somewhere else, every share preview and every canonical link
points to the wrong site, and Google will treat the portfolio as a duplicate of a page it is not.
**What to provide:** The final domain for this portfolio. If it is `helloirfan.com`, confirm the
existing site is being replaced or moved to a subdomain. If it is something else, give the exact
host.
**Current behaviour:** The configured domain is unchanged so metadata stays internally consistent.
Change one line, `portfolio.site.domain` in `src/data/portfolio.ts`, and every reference updates.

---

## 2. Resume PDF contradicts the corrected employment timeline

**Section:** Resume.
**Missing or conflicting:** The most recent PDF on this machine, `~/Documents/IRFAN/Irfan-Resume.pdf`
dated 3 August 2026, disagrees with the corrected LinkedIn export of 28 August 2026 on several
points:

| Field | Resume PDF, 3 Aug | Corrected export, 28 Aug | Published on site |
| --- | --- | --- | --- |
| Byteimpulse start | 02/2024 | August 2025 | August 2025 |
| Jovian Digital | absent | Jul 2023 to Jul 2025, Senior Software Engineer | Published |
| Al Marhaba, NIC Lahore | absent | May 2019 to May 2020, Nov 2018 to Apr 2019 | Published |
| BookJane title | Mobile Application Consultant | Senior Mobile Engineer | Senior Mobile Engineer |
| Tech Scale title | Mobile Application Developer | Senior Software Engineer | Senior Software Engineer |
| Techsila title | Mobile Application Developer | Mobile Engineer | Mobile Engineer |
| Geeklone title | Junior Android Developer | Mobile Engineer | Mobile Engineer |
| Headline | Senior Mobile Engineer | Technical Lead | Technical Lead |

A third export, `~/Downloads/Profile.pdf` dated 27 August 2026, gives a third Byteimpulse start date
of July 2024 and different titles again. It was treated as superseded.

**Why it matters:** A recruiter who reads the site and then opens the PDF will see two different
career histories. That costs more credibility than having no PDF at all.
**What to provide:** A resume PDF regenerated from the corrected timeline, plus the date it was last
updated.
**Current behaviour:** `flags.resumeAvailable` is `false`, so no View or Download action is rendered
and no broken link exists. The Resume section instead shows education, location, availability and a
LinkedIn action. To publish the PDF later: put it at `public/Irfan-Akram-Resume.pdf`, set
`flags.resumeAvailable` to `true`, and set `resume.lastUpdated`. The View, Download and Last updated
elements then appear automatically.

---

## 3. Byteimpulse start date, three conflicting sources

**Section:** Experience, About, credibility strip.
**Missing or conflicting:** February 2024, July 2024 and August 2025 across three of Irfan's own
documents.
**Why it matters:** It changes how long he has been a Technical Lead, which is the single most
important number for a lead-level application. It also changes whether the Jovian Digital role and
the Byteimpulse role overlap.
**What to provide:** The correct start month and year for the Technical Lead role at Byteimpulse.
**Current behaviour:** August 2025 is published, taken from the two most recent corrected exports,
which agree with each other.

---

## 4. Jovian Digital and BookJane dates overlap

**Section:** Experience.
**Missing or conflicting:** The corrected export lists Jovian Digital as July 2023 to July 2025 and
BookJane as July 2023 to January 2024. Those seven months overlap.
**Why it matters:** A careful reader will notice. If it was concurrent work it is worth saying so
plainly, because holding two roles at once is not a problem, and an unexplained overlap looks like an
error.
**What to provide:** Confirmation that the roles were concurrent, and whether one was part-time or
contract. One short clause in the BookJane entry would settle it.
**Current behaviour:** Both entries are published exactly as the corrected source states, in date
order, with no explanation added.

---

## 5. No live product link exists for UBQ

**Section:** Case studies, UBQ.
**Missing or conflicting:** The August resume lists
`play.google.com/store/apps/details?id=com.app.businessmpire`, which is a typo. The real package
`com.app.businessempire` returns 404, the App Store listing `id1596933808` returns 404, and
`ultimatebusinessquest.com` now redirects to a GoDaddy for-sale page. The product appears to be
discontinued.
**Why it matters:** UBQ carries the strongest number on the site, more than 100,000 users. A
recruiter who wants to verify it has nothing to click.
**What to provide:** Any surviving evidence, such as a press link, an archived store listing, a case
study PDF, or screenshots from your own device.
**Current behaviour:** The case study is published with full detail and no link. The 100,000 user
figure is stated because it appears in the corrected export and is independently repeated in press
coverage of the product.

---

## 6. No project screenshots anywhere

**Section:** All five case studies.
**Missing or conflicting:** `public/images/projects/` is empty.
**Why it matters:** Every case study currently falls back to a typographic panel. Real product
screenshots are the single biggest visual upgrade available, and hiring managers look for them.
**What to provide:** For each of Babel, SrvQube, eezly, UBQ and BookJane, two or three screenshots
that you are contractually allowed to publish, with any client data redacted.
**Current behaviour:** Typographic fallback panels are used. No fake interface was generated. To add
them: put files in `public/images/projects/<slug>/` and add `screenshots: [{ src, alt }]` to that
case study. The first screenshot replaces the card panel automatically, and the rest appear in the
modal.

---

## 7. Babel has no public link and no published metric

**Section:** Case studies, Babel.
**Missing or conflicting:** No public URL was found for the product. No user, building or revenue
figure is available.
**Why it matters:** Babel is the lead case study and the strongest evidence of current architecture
ownership, but it is the only featured project with neither a number nor a link.
**What to provide:** The product URL if there is a public one, and one measurable outcome you are
allowed to share, for example buildings managed, dues processed, or hours saved per board per month.
**Current behaviour:** Published with role, contribution, architecture and a qualitative outcome. No
number and no link are claimed.

---

## 8. SrvQube 30 second checkout figure needs a source

**Section:** Case studies, SrvQube, and Experience.
**Missing or conflicting:** "Counter checkout time down to 30 seconds" comes from the corrected
LinkedIn export. There is no measurement note behind it.
**Why it matters:** It is the most specific performance claim on the site and an interviewer is
likely to ask what it was before and how it was measured.
**What to provide:** The before figure and how it was measured, even roughly.
**Current behaviour:** Published as stated in your own corrected source, without an invented baseline.

---

## 9. eezly technologies are only partly verified

**Section:** Case studies, eezly.
**Missing or conflicting:** The corrected export does not name the eezly stack. `Portfolio.pdf` from
March 2026 lists "Flutter, Node.js, AWS".
**Why it matters:** The technologies list is the part recruiters scan for keyword matches.
**What to provide:** The actual stack, including whether AWS is used and what for.
**Current behaviour:** Only Flutter and Node.js are listed, because those two are corroborated by
more than one source. AWS was omitted.

---

## 10. Minplan cannot be identified with confidence

**Section:** Also shipped.
**Missing or conflicting:** The August resume lists
`play.google.com/store/apps/details?id=com.myplan.norway`, which returns 404. Searching finds at
least two distinct products, "Minplan safety plan" (`com.minplan.minplan_app`) and "MYPLAN, Your
safety plan" (`english.minplan.controllers`). It is not clear which one you worked on.
**Why it matters:** Linking to the wrong app is worse than linking to nothing.
**What to provide:** The correct store link, or confirmation of which product it was.
**Current behaviour:** Listed by name and product type with no link.

---

## 11. YellowBeard detail is thin

**Section:** Also shipped.
**Missing or conflicting:** The Google Play listing `com.yellowbeard.yb` is live and is linked. The
resume claims 10,000 or more users, but nothing corroborates that, and your exact role is not
described anywhere.
**Why it matters:** With a role and an outcome it could become a sixth case study rather than a
one-line mention.
**What to provide:** Your role, which employer it was under, the period, and whether the 10,000 user
figure can be supported.
**Current behaviour:** Listed with product type, a one-line contribution note and the verified live
link. The user figure is not published.

---

## 12. Favicon and social image are placeholders

**Section:** Brand assets.
**Missing or conflicting:** `public/favicon.svg` and `public/images/og-image.png` are generated "IA"
monogram placeholders, not approved brand assets.
**Why it matters:** The social image is what appears when the link is pasted into LinkedIn, WhatsApp
or Slack. It is often the first thing a recruiter sees.
**What to provide:** Approval of the current monogram treatment, or replacement files. The social
image needs to be 1200 by 630.
**Current behaviour:** The placeholders are wired up correctly and render. The editable source is at
`assets/source/og-image.svg`.

---

## 13. Stack Overflow profile is linked but thin

**Section:** Hero, Contact, Footer, structured data.
**Missing or conflicting:** `stackoverflow.com/users/10032857/irfan-akram` resolves, but it is linked
in three places alongside LinkedIn and GitHub without any indication of what is there.
**Why it matters:** If the profile has little activity, giving it equal billing with LinkedIn spends
attention for nothing. If it has good answers, it is strong evidence and should be called out.
**What to provide:** Confirm whether to keep it. Removing it means deleting one line from
`contact` and one entry from `social` in `src/data/portfolio.ts`.
**Current behaviour:** Kept and linked, as before.

---

## 14. GitHub profile content is not curated

**Section:** Hero, Contact, Footer.
**Missing or conflicting:** `github.com/irfanakram825` resolves, but the work described on this site
lives in private employer repositories, so a recruiter who clicks through may find little that
matches.
**Why it matters:** The gap between the case studies and a sparse public profile can read badly.
**What to provide:** Either a pinned set of repositories, or a decision to keep GitHub as a
secondary link only.
**Current behaviour:** Linked as before, with LinkedIn given primary position in the Resume section.

---

## Publishing checklist

Once the above are settled:

1. Set the final domain in `portfolio.site.domain`.
2. Add `public/Irfan-Akram-Resume.pdf`, set `flags.resumeAvailable` to `true`, set
   `resume.lastUpdated`.
3. Add screenshots under `public/images/projects/<slug>/` and reference them per case study.
4. Replace or approve the favicon and the social image.
5. Run `npm run lint`, `npm run typecheck`, `npm run build`, `npm run test:e2e`.
