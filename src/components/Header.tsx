"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { portfolio } from "@/data/portfolio";

type FlagName = keyof typeof portfolio.flags;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const navigation = useMemo(
    () =>
      portfolio.navigation.filter(
        (item) => !("requires" in item) || portfolio.flags[item.requires as FlagName],
      ),
    [],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["home", ...navigation.map((item) => item.href.slice(1)), "contact"];
    let frame = 0;

    const updateActiveSection = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const marker = Math.max(120, window.innerHeight * 0.25);
        let current = "home";
        ids.forEach((id) => {
          const element = document.getElementById(id);
          if (element && element.getBoundingClientRect().top <= marker) current = id;
        });
        setActiveSection(current);
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [navigation]);

  // Escape closes the menu and returns focus to the toggle. A pointer press
  // outside the header closes it without stealing focus.
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (headerRef.current?.contains(event.target as Node)) return;
      setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header ref={headerRef} className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="header-inner">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="Irfan Akram, back to top">
          <span className="brand-mark brand-avatar" aria-hidden="true">
            <Image
              src={portfolio.hero.portrait.src}
              alt=""
              width={40}
              height={40}
              sizes="40px"
              priority
            />
          </span>
          <span className="brand-name">Irfan Akram</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => {
            const id = item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={activeSection === id ? "location" : undefined}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <a className="button button-primary header-cta" href="#contact">
          Contact Me
        </a>

        <button
          ref={menuButtonRef}
          className="icon-button menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      {/* inert keeps the collapsed menu out of the tab order and the accessibility tree. */}
      <div
        id="mobile-navigation"
        className={`mobile-nav-wrap ${menuOpen ? "is-open" : ""}`}
        inert={!menuOpen}
      >
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
          <a className="button button-primary" href="#contact" onClick={closeMenu}>
            Contact Me
          </a>
        </nav>
      </div>
    </header>
  );
}
