"use client";

import { ArrowUpRight, Check, Copy, Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { portfolio } from "@/data/portfolio";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { contact } = portfolio;

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact-panel" data-reveal>
          <div className="contact-copy">
            <p className="eyebrow">Contact</p>
            <h2 id="contact-title">Build the next reliable product.</h2>
            <p className="section-lede">{contact.availability}</p>
            <p className="contact-location">
              <MapPin size={17} aria-hidden="true" /> {contact.location}
            </p>
            <p className="contact-location">
              <Phone size={17} aria-hidden="true" /> {contact.phone}
            </p>
          </div>

          <div className="contact-actions">
            <a className="button button-light" href={`mailto:${contact.email}`}>
              <Mail size={18} aria-hidden="true" /> Email Me
            </a>
            <button className="button button-dark-glass" type="button" onClick={copyEmail}>
              {copied ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
              {copied ? "Copied" : "Copy Email"}
            </button>
            <a className="button button-dark-glass" href={`tel:${contact.phone.replace(/\s+/g, "")}`}>
              <Phone size={18} aria-hidden="true" /> Call Me
            </a>
            <a className="button button-dark-glass" href={contact.linkedIn} target="_blank" rel="noopener noreferrer">
              LinkedIn <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a className="button button-dark-glass" href={contact.github} target="_blank" rel="noopener noreferrer">
              GitHub <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a className="button button-dark-glass" href={contact.stackOverflow} target="_blank" rel="noopener noreferrer">
              Stack Overflow <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
          <p className="sr-only" role="status" aria-live="polite">
            {copied ? "Email address copied to clipboard." : ""}
          </p>
        </div>
      </div>
    </section>
  );
}
