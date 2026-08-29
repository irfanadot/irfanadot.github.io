"use client";

import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollCue() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setHidden(window.scrollY > 32);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <a
      className={`scroll-cue ${hidden ? "is-hidden" : ""}`}
      href="#expertise"
      aria-label="Continue to expertise"
      title="Explore more"
    >
      <ArrowDown size={20} aria-hidden="true" />
    </a>
  );
}
