"use client";

import { ArrowRight, ArrowUpRight, ExternalLink, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { portfolio, type CaseStudy } from "@/data/portfolio";

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="modal-detail-section">
      <h3>{title}</h3>
      {children}
    </section>
  );
}

function ProjectVisual({ project, index }: { project: CaseStudy; index: number }) {
  const screenshot = project.screenshots?.[0];

  return (
    <div className={`project-visual accent-${project.accent}`}>
      {screenshot ? (
        <Image src={screenshot.src} alt={screenshot.alt} fill sizes="(max-width: 767px) 100vw, 52vw" />
      ) : (
        <div className="project-placeholder" role="img" aria-label={`${project.name}, ${project.productType ?? "project"}`}>
          <span className="project-ordinal">0{index + 1}</span>
          <div>
            <small>{project.productType ?? "Product project"}</small>
            <strong>{project.name}</strong>
          </div>
          <span className="project-monogram" aria-hidden="true">{project.name.slice(0, 2)}</span>
        </div>
      )}
      <div className="visual-glass-label">Selected work <span>0{index + 1}</span></div>
    </div>
  );
}

function CaseStudyDialog({ project, onClose }: { project: CaseStudy; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    returnFocusRef.current = document.activeElement as HTMLElement;

    // The rest of the page is hidden from assistive technology and the tab order
    // while the dialog is open. The dialog is portalled to the body so it sits
    // outside the inert subtrees.
    const backdropRoots = Array.from(
      document.querySelectorAll<HTMLElement>("body > header, body > main, body > footer"),
    );
    backdropRoots.forEach((element) => element.setAttribute("inert", ""));

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      backdropRoots.forEach((element) => element.removeAttribute("inert"));
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      document.removeEventListener("keydown", onKeyDown);
      returnFocusRef.current?.focus();
    };
  }, [onClose]);

  return createPortal(
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.currentTarget === event.target && onClose()}>
      <div ref={dialogRef} className="case-dialog" role="dialog" aria-modal="true" aria-labelledby={`case-title-${project.slug}`} aria-describedby={`case-description-${project.slug}`}>
        <div className="modal-topbar">
          <span>Case study</span>
          <button ref={closeButtonRef} className="icon-button modal-close" type="button" onClick={onClose} aria-label={`Close the ${project.name} case study`}>
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <div className="modal-scroll" tabIndex={0} aria-label={`${project.name} case study content`}>
          <div className={`modal-hero accent-${project.accent}`}>
            {project.productType && <p className="eyebrow">{project.productType}</p>}
            <h2 id={`case-title-${project.slug}`}>{project.name}</h2>
            <p id={`case-description-${project.slug}`}>{project.description}</p>
            {project.impact && <strong className="impact-line">{project.impact}</strong>}
            {project.role && <p className="modal-role"><b>Role</b> {project.role}</p>}
          </div>
          <div className="modal-content">
            {project.overview && <DetailSection title="Project overview"><p>{project.overview}</p></DetailSection>}
            {project.problem && <DetailSection title="The problem"><p>{project.problem}</p></DetailSection>}
            {project.responsibilities && <DetailSection title="What I did"><ul className="detail-list">{project.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul></DetailSection>}
            {project.approach && <DetailSection title="Architecture and approach"><ul className="detail-list">{project.approach.map((item) => <li key={item}>{item}</li>)}</ul></DetailSection>}
            {project.technologies && <DetailSection title="Technologies"><div className="tag-list">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></DetailSection>}
            {project.collaboration && <DetailSection title="Team"><p>{project.collaboration}</p></DetailSection>}
            {project.outcome && <DetailSection title="Outcome"><p>{project.outcome}</p></DetailSection>}
            {project.screenshots && <DetailSection title="Screenshots"><div className="screenshot-grid">{project.screenshots.map((screenshot) => <Image key={screenshot.src} src={screenshot.src} alt={screenshot.alt} width={720} height={460} />)}</div></DetailSection>}
            {project.links && <DetailSection title="Links"><div className="modal-links">{project.links.map((link) => <a key={link.href} className="button button-glass" href={link.href} target="_blank" rel="noopener noreferrer">{link.label} <ExternalLink size={16} aria-hidden="true" /></a>)}</div></DetailSection>}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function CaseStudies() {
  const [selected, setSelected] = useState<CaseStudy | null>(null);
  const featured = portfolio.caseStudies.filter((project) => project.featured);
  const alsoShipped = portfolio.alsoShipped;

  return (
    <section id="case-studies" className="section case-studies-section" aria-labelledby="case-studies-title">
      <div className="container">
        <div className="section-heading split-heading" data-reveal>
          <div><p className="eyebrow">Selected case studies</p><h2 id="case-studies-title">Products shaped for real-world use.</h2></div>
          <p className="section-lede">What the product does, what I owned, and how it was built. Detail sits inside each case study.</p>
        </div>

        <div className="featured-projects">
          {featured.map((project, index) => (
            <article key={project.slug} className={`case-card project-feature ${index % 2 ? "is-reversed" : ""}`} data-reveal>
              <ProjectVisual project={project} index={index} />
              <div className="project-info">
                <p className="case-type">{project.productType}</p>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                {project.role && <p className="project-role"><span>Role</span>{project.role}</p>}
                {project.technologies && <div className="tag-list compact">{project.technologies.slice(0, 3).map((technology) => <span key={technology}>{technology}</span>)}</div>}
                {project.impact && <strong className="case-impact">{project.impact}</strong>}
                <button
                  className="text-button"
                  type="button"
                  onClick={() => setSelected(project)}
                  aria-label={`View the ${project.name} case study`}
                >
                  View Case Study <ArrowRight size={17} aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {alsoShipped.length > 0 && (
          <div className="additional-projects" data-reveal>
            <h3>Also shipped</h3>
            <ul>
              {alsoShipped.map((item) => (
                <li key={item.name}>
                  <p className="additional-name">
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer">
                        {item.name} <ArrowUpRight size={15} aria-hidden="true" />
                      </a>
                    ) : (
                      item.name
                    )}
                  </p>
                  <p className="additional-type">{item.productType}</p>
                  <p className="additional-note">{item.note}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {selected && <CaseStudyDialog project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
