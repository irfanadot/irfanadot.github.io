import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Download,
  ExternalLink,
  FileText,
  GraduationCap,
  MapPin,
} from "lucide-react";
import { CaseStudies } from "@/components/CaseStudies";
import { Contact } from "@/components/Contact";
import { Header } from "@/components/Header";
import { Portrait } from "@/components/Portrait";
import { RevealController } from "@/components/RevealController";
import { ScrollCue } from "@/components/ScrollCue";
import { portfolio } from "@/data/portfolio";

const currentRole = portfolio.experience.find((entry) => entry.current);

export default function Home() {
  const { hero, contact, flags, resume, education } = portfolio;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: portfolio.site.name,
    url: portfolio.site.domain,
    image: `${portfolio.site.domain}${hero.portrait.src}`,
    jobTitle: ["Technical Lead", "Lead Software Engineer"],
    description: portfolio.site.description,
    email: `mailto:${contact.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
    ...(currentRole
      ? { worksFor: { "@type": "Organization", name: currentRole.company } }
      : {}),
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: education.institution,
    },
    knowsLanguage: ["English", "Urdu"],
    sameAs: [contact.linkedIn, contact.github, contact.stackOverflow],
    knowsAbout: [
      "Software architecture",
      "Technical leadership",
      "Backend systems",
      "REST APIs",
      "Node.js",
      "NestJS",
      "TypeScript",
      "LLM integration",
      "AI automation",
      "Mobile application development",
      "Flutter",
    ],
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content">
        <section id="home" className="hero-section" aria-labelledby="hero-title">
          <div className="ambient-field ambient-one" aria-hidden="true" />
          <div className="ambient-field ambient-two" aria-hidden="true" />
          <div className="container hero-grid">
            <div className="hero-content">
              <p className="role-line">{hero.role}</p>
              <h1 id="hero-title">{hero.statement}</h1>
              <p className="hero-summary">{hero.summary}</p>
              <p className="hero-location">
                <MapPin size={16} aria-hidden="true" />
                <span>{contact.location}</span>
                <span className="hero-location-divider" aria-hidden="true" />
                <span>{hero.availability}</span>
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#case-studies">View Case Studies <ArrowDown size={18} aria-hidden="true" /></a>
                {flags.resumeAvailable ? (
                  <a className="button button-glass" href={resume.path} download><Download size={18} aria-hidden="true" /> Download Resume</a>
                ) : (
                  <a className="button button-glass" href="#resume"><FileText size={18} aria-hidden="true" /> Resume</a>
                )}
              </div>
              <div className="hero-meta">
                <div className="social-links" aria-label="Social profiles">
                  <a href={contact.linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={16} aria-hidden="true" /></a>
                  <a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={16} aria-hidden="true" /></a>
                  <a href={contact.stackOverflow} target="_blank" rel="noopener noreferrer">Stack Overflow <ArrowUpRight size={16} aria-hidden="true" /></a>
                </div>
              </div>
            </div>
            <Portrait />
          </div>
          <ScrollCue />
        </section>

        <section id="expertise" className="section expertise-section" aria-labelledby="expertise-title">
          <div className="container">
            <div className="section-heading split-heading" data-reveal>
              <div><p className="eyebrow">Expertise</p><h2 id="expertise-title">Technical depth where products need it.</h2></div>
              <p className="section-lede">Architecture, implementation, and engineering leadership connected by practical delivery.</p>
            </div>
            <div className="expertise-grid">
              {portfolio.expertise.map((area, index) => (
                <article key={area.title} className={`expertise-card expertise-${index + 1}`} data-reveal>
                  <div className="card-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</div>
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                  <ul className="skill-list">{area.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <CaseStudies />

        <section id="how-i-work" className="section work-section" aria-labelledby="work-title">
          <div className="container">
            <div className="section-heading" data-reveal><p className="eyebrow">How I Work</p><h2 id="work-title">From ambiguity to production.</h2></div>
            <ol className="work-flow" data-reveal>
              {portfolio.workMethod.map((step, index) => (
                <li key={step.title} className={index % 2 ? "is-glass" : ""}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.text}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {flags.showExperience && portfolio.experience.length > 0 && (
          <section id="experience" className="section experience-section" aria-labelledby="experience-title">
            <div className="container">
              <div className="section-heading split-heading" data-reveal>
                <div><p className="eyebrow">Experience</p><h2 id="experience-title">From Android developer to Technical Lead.</h2></div>
                <p className="section-lede">Seven years of production delivery, with the hands-on engineering never leaving the job description.</p>
              </div>
              <ol className="timeline">
                {portfolio.experience.map((entry) => (
                  <li key={`${entry.company}-${entry.period}`} data-reveal>
                    <article className={entry.current ? "timeline-entry is-current" : "timeline-entry"}>
                      <div className="timeline-meta">
                        <p className="timeline-period">
                          {entry.period}
                          {entry.current && <span className="timeline-badge">Current</span>}
                        </p>
                        <p className="timeline-location">{entry.location}</p>
                      </div>
                      <div className="timeline-body">
                        <h3>{entry.title}</h3>
                        <p className="timeline-company">{entry.company}</p>
                        <p className="timeline-summary">{entry.summary}</p>
                        <ul>{entry.achievements.map((item) => <li key={item}>{item}</li>)}</ul>
                      </div>
                    </article>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        <section id="resume" className="section resume-section" aria-labelledby="resume-title">
          <div className="container resume-layout" data-reveal>
            <div className="resume-visual" aria-hidden="true">
              <div className="document-sheet document-sheet-back" />
              <div className="document-sheet document-sheet-mid" />
              <div className="document-sheet document-sheet-front"><span>IA</span><b>Resume</b><i /><i /><i /><small>Technical Lead</small></div>
            </div>
            <div className="resume-copy">
              <p className="eyebrow">Resume</p>
              <h2 id="resume-title">The full record, in one place.</h2>
              <p>
                The timeline above is the verified employment history. LinkedIn carries the complete
                profile, including recommendations and role detail.
              </p>
              <dl className="resume-facts">
                <div>
                  <dt><GraduationCap size={17} aria-hidden="true" /> Education</dt>
                  <dd>{education.degree}, {education.institution}, {education.period}</dd>
                </div>
                <div>
                  <dt><MapPin size={17} aria-hidden="true" /> Based in</dt>
                  <dd>{contact.location}. {hero.availability}.</dd>
                </div>
              </dl>
              <div className="resume-actions">
                {flags.resumeAvailable && (
                  <>
                    <a className="button button-primary" href={resume.path} target="_blank" rel="noopener noreferrer">View Resume <ExternalLink size={17} aria-hidden="true" /></a>
                    <a className="button button-glass" href={resume.path} download><Download size={17} aria-hidden="true" /> Download Resume</a>
                  </>
                )}
                <a
                  className={flags.resumeAvailable ? "button button-glass" : "button button-primary"}
                  href={contact.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View LinkedIn Profile <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </div>
              {flags.resumeAvailable && resume.lastUpdated && (
                <p className="resume-updated">Last updated {resume.lastUpdated}.</p>
              )}
            </div>
          </div>
        </section>

        <Contact />
      </main>

      <footer className="site-footer"><div className="container footer-inner">
        <p><strong>Irfan Akram</strong><span>Technical Lead</span><span>© {new Date().getFullYear()}</span></p>
        <nav aria-label="Footer navigation"><a href={contact.linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn</a><a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub</a><a href={contact.stackOverflow} target="_blank" rel="noopener noreferrer">Stack Overflow</a><a href={`mailto:${contact.email}`}>Email</a><a href="#home">Back to top <ArrowUp size={15} aria-hidden="true" /></a></nav>
      </div></footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <RevealController />
    </>
  );
}
