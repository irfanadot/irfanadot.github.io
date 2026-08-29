import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const artifactDirectory = path.join(process.cwd(), "artifacts");
fs.mkdirSync(artifactDirectory, { recursive: true });

const FEATURED_COUNT = 5;
const NAV_COUNT = 4;

async function expectNoHorizontalOverflow(page: Page) {
  const result = await page.evaluate(() => {
    const viewportWidth = document.documentElement.clientWidth;
    const offenders = Array.from(document.querySelectorAll<HTMLElement>("body *"))
      .filter((element) => {
        const style = getComputedStyle(element);
        if (style.position === "fixed" || style.position === "absolute") return false;
        const rect = element.getBoundingClientRect();
        return rect.width > viewportWidth + 1 || rect.right > viewportWidth + 1 || rect.left < -1;
      })
      .slice(0, 8)
      .map((element) => ({
        tag: element.tagName,
        className: element.className,
        rect: element.getBoundingClientRect().toJSON(),
      }));

    return {
      viewportWidth,
      scrollWidth: document.documentElement.scrollWidth,
      offenders,
    };
  });

  expect(result.scrollWidth).toBeLessThanOrEqual(result.viewportWidth + 1);
  expect(result.offenders).toEqual([]);
}

test("renders responsive layouts without overflow and captures review images", async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));

  const viewports = [
    { width: 320, height: 568 },
    { width: 375, height: 812 },
    { width: 390, height: 844 },
    { width: 430, height: 932 },
    { width: 768, height: 1024 },
    { width: 1024, height: 768 },
    { width: 1280, height: 800 },
    { width: 1440, height: 900 },
  ];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const heroHeading = page.getByRole("heading", { level: 1 });
    await expect(heroHeading).toHaveText("Architect. Lead. Ship.");
    const headingMetrics = await heroHeading.evaluate((element) => {
      const style = getComputedStyle(element);
      return { height: element.getBoundingClientRect().height, lineHeight: Number.parseFloat(style.lineHeight) };
    });
    expect(headingMetrics.height).toBeLessThanOrEqual(headingMetrics.lineHeight + 1);
    await expectNoHorizontalOverflow(page);

    if (
      (viewport.width === 375 && viewport.height === 812) ||
      (viewport.width === 768 && viewport.height === 1024) ||
      (viewport.width === 1440 && viewport.height === 900)
    ) {
      await page.screenshot({
        path: path.join(artifactDirectory, `portfolio-${viewport.width}x${viewport.height}.png`),
        fullPage: true,
      });
      await page.locator(".case-card .text-button").first().click();
      await expect(page.getByRole("dialog")).toBeVisible();
      await page.waitForTimeout(250);
      await page.screenshot({
        path: path.join(artifactDirectory, `case-study-${viewport.width}x${viewport.height}.png`),
        fullPage: false,
      });
      await page.keyboard.press("Escape");
    }
  }

  expect(consoleErrors).toEqual([]);
});

test("no placeholder or verification text is published", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const forbidden = [
    /todo/i,
    /lorem ipsum/i,
    /placeholder/i,
    /require[sd]? verification/i,
    /pending verification/i,
    /will be added after/i,
    /before publication/i,
    /coming soon/i,
  ];

  const collect = async () =>
    page.evaluate(() => document.body.innerText.replace(/\s+/g, " "));

  let text = await collect();
  for (const project of Array.from({ length: FEATURED_COUNT }, (_, index) => index)) {
    await page.locator(".case-card .text-button").nth(project).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    text += " " + (await page.getByRole("dialog").innerText()).replace(/\s+/g, " ");
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();
  }

  for (const pattern of forbidden) {
    expect(text, `page text should not match ${pattern}`).not.toMatch(pattern);
  }

  // Empty headings would render as an empty h3 in the dialog. None should exist.
  const emptyHeadings = await page.evaluate(() =>
    Array.from(document.querySelectorAll("h1, h2, h3")).filter(
      (heading) => !heading.textContent?.trim(),
    ).length,
  );
  expect(emptyHeadings).toBe(0);
});

test("the published content matches the corrected employment record", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const timeline = page.locator(".timeline > li");
  await expect(timeline).toHaveCount(8);
  await expect(timeline.first()).toContainText("Technical Lead");
  await expect(timeline.first()).toContainText("Byteimpulse");
  await expect(timeline.first()).toContainText("Aug 2025 to Present");
  await expect(timeline.nth(1)).toContainText("Jovian Digital");
  await expect(timeline.last()).toContainText("NIC Lahore");

  // Superseded resume data must not reappear on the site.
  const body = await page.evaluate(() => document.body.innerText);
  expect(body).not.toContain("02/2024");
  expect(body).not.toContain("8+ years");
  expect(body).not.toContain("Mobile Application Consultant");

  await expect(page.locator(".resume-facts")).toContainText("Government College University");
});

test("every external link is safe and no dead product link is published", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const openExternal = async () => {
    const links = await page.locator('a[target="_blank"]').all();
    for (const link of links) {
      const rel = (await link.getAttribute("rel")) ?? "";
      expect(rel).toContain("noopener");
      expect(rel).toContain("noreferrer");
    }
  };

  await openExternal();

  const hrefs = new Set<string>();
  for (let index = 0; index < FEATURED_COUNT; index += 1) {
    await page.locator(".case-card .text-button").nth(index).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    for (const link of await dialog.locator("a[href^=http]").all()) {
      hrefs.add((await link.getAttribute("href")) ?? "");
      expect((await link.getAttribute("rel")) ?? "").toContain("noopener");
    }
    await page.keyboard.press("Escape");
  }

  // Known dead listings must never be published.
  for (const href of hrefs) {
    expect(href).not.toContain("businessmpire");
    expect(href).not.toContain("businessempire");
    expect(href).not.toContain("myplan.norway");
    expect(href).not.toMatch(/^https:\/\/eezly\.com/);
  }
});

test("desktop navigation, case studies, focus trap, and Escape work", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const navLinks = page.locator(".desktop-nav a");
  await expect(navLinks).toHaveCount(NAV_COUNT);
  for (let index = 0; index < NAV_COUNT; index += 1) {
    const link = navLinks.nth(index);
    const href = await link.getAttribute("href");
    await link.click();
    await expect(page).toHaveURL(new RegExp(`${href}$`));
    // Every nav target must exist on the page.
    await expect(page.locator(href!)).toHaveCount(1);
  }

  const projectButtons = page.locator(".case-card .text-button");
  await expect(projectButtons).toHaveCount(FEATURED_COUNT);
  for (let index = 0; index < FEATURED_COUNT; index += 1) {
    await projectButtons.nth(index).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(page.locator("body")).toHaveCSS("overflow", "hidden");

    // Background content leaves the accessibility tree and the tab order.
    await expect(page.locator("main")).toHaveAttribute("inert", "");
    await expect(page.locator("header")).toHaveAttribute("inert", "");

    const closeButton = dialog.getByRole("button", { name: /close the .* case study/i });
    await expect(closeButton).toBeFocused();

    // Tab forward through every focusable node and confirm focus never escapes.
    const focusableCount = await dialog.evaluate(
      (element) =>
        element.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ).length,
    );
    for (let step = 0; step < focusableCount; step += 1) {
      await page.keyboard.press("Tab");
      expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
    }
    await expect(closeButton).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(page.locator("main")).not.toHaveAttribute("inert", "");
    await expect(projectButtons.nth(index)).toBeFocused();
  }
});

test("header contact action clears the regular nav dot", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  await page.locator('.desktop-nav a[href="#expertise"]').click();
  await settleScroll(page);
  await expect(page.locator('.desktop-nav a[aria-current="location"]')).toHaveAttribute(
    "href",
    "#expertise",
  );

  await page.locator(".header-cta").click();
  await settleScroll(page);
  await expect(page.locator("#contact")).toBeInViewport();
  await expect(page.locator('.desktop-nav a[aria-current="location"]')).toHaveCount(0);
});

async function settleScroll(page: Page) {
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        let last = -1;
        let steady = 0;
        const tick = () => {
          if (window.scrollY === last) {
            if (++steady > 8) return resolve();
          } else {
            steady = 0;
            last = window.scrollY;
          }
          requestAnimationFrame(tick);
        };
        tick();
      }),
  );
}

test("anchor navigation lands each section just below the fixed header", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const headerBottom = await page
    .locator(".header-inner")
    .evaluate((element) => element.getBoundingClientRect().bottom);

  // scroll-padding-top on the scroller and scroll-margin-top on the target add
  // together, which once pushed every anchor twice the header height down the page.
  const targets = await page.locator(".desktop-nav a").evaluateAll((links) =>
    links.map((link) => link.getAttribute("href")!.slice(1)),
  );
  for (const id of [...targets, "how-i-work"]) {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(100);
    const navLink = page.locator(`.desktop-nav a[href="#${id}"]`);
    if (await navLink.count()) await navLink.click();
    else await page.evaluate((target) => { window.location.hash = target; }, `#${id}`);
    await settleScroll(page);

    const top = await page
      .locator(`#${id}`)
      .evaluate((element) => element.getBoundingClientRect().top);
    expect(top, `#${id} should not hide under the header`).toBeGreaterThanOrEqual(headerBottom - 4);
    expect(top, `#${id} should not leave a band of the previous section below the header`)
      .toBeLessThanOrEqual(headerBottom + 20);

    // The strip directly below the header must belong to the target section. It
    // used to show the tail of the previous one, which read as two mixed sections.
    const owners = await page.evaluate(
      ({ from, to }) =>
        [from, (from + to) / 2, to].map((y) => {
          const element = document.elementFromPoint(window.innerWidth / 2, y);
          return element?.closest("section")?.id ?? "none";
        }),
      { from: headerBottom + 12, to: headerBottom + 60 },
    );
    expect(owners, `content below the header while at #${id}`).toEqual([id, id, id]);
  }
});

test("the hero fits above the fold on laptop viewports", async ({ page }) => {
  for (const viewport of [
    { width: 1280, height: 720 },
    { width: 1440, height: 790 },
    { width: 1512, height: 760 },
    { width: 1440, height: 900 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const lowest = await page.evaluate(() => {
      const box = (selector: string) =>
        document.querySelector(selector)!.getBoundingClientRect().bottom;
      return Math.max(box(".hero-meta"), box(".portrait-shell"));
    });
    expect(
      lowest,
      `hero content overflows the fold at ${viewport.width}x${viewport.height}`,
    ).toBeLessThanOrEqual(viewport.height);
  }
});

test("the hero scroll cue hides after scrolling and returns at the top", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const cue = page.getByRole("link", { name: "Continue to expertise" });
  await expect(cue).toBeVisible();
  await page.evaluate(() => window.scrollTo(0, 240));
  await expect(cue).toHaveClass(/is-hidden/);
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(cue).not.toHaveClass(/is-hidden/);
});

test("mobile navigation and bottom sheet remain usable", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");

  // A collapsed menu must not be reachable by keyboard or assistive technology.
  await expect(page.locator("#mobile-navigation")).toHaveAttribute("inert", "");
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeHidden();

  const menuButton = page.getByRole("button", { name: "Open navigation menu" });
  await menuButton.click();
  await expect(page.getByRole("button", { name: "Close navigation menu" })).toHaveAttribute("aria-expanded", "true");
  const mobileNav = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(mobileNav).toBeVisible();
  await expect(mobileNav.locator("a")).toHaveCount(NAV_COUNT + 1);

  // Escape closes it and returns focus to the toggle.
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open navigation menu" })).toBeFocused();

  await menuButton.click();
  await mobileNav.getByRole("link", { name: "Expertise" }).click();
  await expect(page).toHaveURL(/#expertise$/);
  await expect(page.getByRole("button", { name: "Open navigation menu" })).toHaveAttribute("aria-expanded", "false");

  await page.locator(".case-card .text-button").first().click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await page.waitForTimeout(250);
  const metrics = await dialog.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    const scroller = element.querySelector<HTMLElement>(".modal-scroll");
    return {
      top: rect.top,
      bottom: rect.bottom,
      viewport: window.innerHeight,
      independentlyScrollable: Boolean(scroller && scroller.scrollHeight >= scroller.clientHeight),
    };
  });
  expect(metrics.top).toBeGreaterThanOrEqual(0);
  expect(metrics.bottom).toBeLessThanOrEqual(metrics.viewport + 1);
  expect(metrics.independentlyScrollable).toBe(true);
  await expectNoHorizontalOverflow(page);
});

test("interactive targets meet the minimum touch size", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");

  const undersized = await page.evaluate(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
    );
    return targets
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.width === 0 && rect.height === 0) return false;
        if (element.closest(".mobile-nav-wrap:not(.is-open)")) return false;
        if (element.classList.contains("skip-link")) return false;
        // Inline text links inside prose are exempt under WCAG 2.2 target size.
        if (element.closest("p, li") && getComputedStyle(element).display === "inline") return false;
        return rect.height < 24 || rect.width < 24;
      })
      .map((element) => element.className + " :: " + (element.textContent ?? "").trim().slice(0, 40));
  });
  expect(undersized).toEqual([]);
});

test("portrait, resume state, and copy email behavior work", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 800 });
  await page.goto("/");

  const portrait = page.getByRole("img", { name: "Portrait of Irfan Akram" });
  await expect(portrait).toBeVisible();
  await expect(portrait).toHaveAttribute("src", "/images/irfan-profile.webp");
  expect(await portrait.evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBe(1080);

  // The frame is taller than it is wide, so cover crops horizontally only and the
  // top of the head is never cut off.
  const framing = await page.locator(".portrait-frame").evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return { ratio: rect.width / rect.height };
  });
  expect(framing.ratio).toBeLessThan(1);

  // The resume PDF is intentionally unavailable, so no broken action is rendered.
  await expect(page.locator('a[href="/Irfan-Akram-Resume.pdf"]')).toHaveCount(0);
  await expect(page.locator("#resume").getByRole("link", { name: /LinkedIn/i })).toBeVisible();

  await page.getByRole("button", { name: "Copy Email" }).click();
  await expect(page.getByRole("button", { name: "Copied" })).toBeVisible();
  await expect(page.getByRole("status")).toHaveText("Email address copied to clipboard.");
  const clipboard = await page.evaluate(() => navigator.clipboard.readText());
  expect(clipboard).toBe("irfanakram825@gmail.com");
});

test("structured data describes the person accurately and privately", async ({ page }) => {
  await page.goto("/");
  const raw = await page.locator('script[type="application/ld+json"]').innerText();
  const data = JSON.parse(raw);

  expect(data["@type"]).toBe("Person");
  expect(data.name).toBe("Irfan Akram");
  expect(data.jobTitle).toEqual(["Technical Lead", "Lead Software Engineer"]);
  expect(data.worksFor.name).toBe("Byteimpulse");
  expect(data.alumniOf.name).toContain("Government College University");
  expect(data.sameAs.length).toBeGreaterThanOrEqual(3);
  // No private contact detail beyond the publicly displayed email.
  expect(raw).not.toContain("+92");
  expect(raw).not.toContain("telephone");
});

test("accessibility, reduced motion, and opaque material fallback", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const transitionDuration = await page.locator(".case-card").first().evaluate(
    (element) => getComputedStyle(element).transitionDuration,
  );
  expect(Number.parseFloat(transitionDuration)).toBeLessThanOrEqual(0.00001);

  await page.locator(".expertise-card").first().evaluate((element) => {
    const panel = element as HTMLElement;
    panel.style.setProperty("backdrop-filter", "none", "important");
    panel.style.setProperty("-webkit-backdrop-filter", "none", "important");
    panel.style.setProperty("background", "rgba(255, 255, 255, 0.97)", "important");
  });
  await page.waitForTimeout(20);
  const fallbackBackground = await page.locator(".expertise-card").first().evaluate(
    (element) => getComputedStyle(element).backgroundColor,
  );
  expect(fallbackBackground).toBe("rgba(255, 255, 255, 0.97)");
  const cssDirectory = path.join(process.cwd(), "out", "_next", "static", "chunks");
  const compiledCss = fs.readdirSync(cssDirectory)
    .filter((file) => file.endsWith(".css"))
    .map((file) => fs.readFileSync(path.join(cssDirectory, file), "utf8"))
    .join("\n");
  expect(compiledCss).toContain("--glass-fallback");
  expect(compiledCss).toContain("@supports");
  expect(compiledCss).toContain("backdrop-filter:blur(1px)");
  // The approved palette is slate and warm only. No green or teal may return.
  expect(compiledCss).not.toMatch(/#(0[0-9a-f]f[0-9a-f]{3}|[0-9a-f]{2}(c|d|e|f)[0-9a-f]a[0-9a-f]{2})\b/i);
  expect(compiledCss).toContain("#2f3647");
  await expectNoHorizontalOverflow(page);

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(results.violations).toEqual([]);

  for (let index = 0; index < FEATURED_COUNT; index += 1) {
    await page.locator(".case-card .text-button").nth(index).click();
    const dialogResults = await new AxeBuilder({ page })
      .include("[role=dialog]")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(dialogResults.violations).toEqual([]);
    await page.keyboard.press("Escape");
  }
});
