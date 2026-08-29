import Image from "next/image";
import { portfolio } from "@/data/portfolio";

export function Portrait() {
  const { hero, flags } = portfolio;

  return (
    <div className="portrait-shell" aria-label={flags.portraitAvailable ? undefined : "Portrait placeholder for Irfan Akram"}>
      <div className="portrait-sheet portrait-sheet-back" aria-hidden="true" />
      <div className="portrait-sheet portrait-sheet-glass" aria-hidden="true" />
      <div className="portrait-frame">
        {flags.portraitAvailable ? (
          <Image
            src={hero.portrait.src}
            alt={hero.portrait.alt}
            fill
            priority
            sizes="(max-width: 767px) 72vw, (max-width: 1023px) 36vw, 380px"
            className="portrait-image"
            style={{ objectPosition: hero.portrait.objectPosition }}
          />
        ) : (
          <div className="portrait-placeholder" role="img" aria-label="Irfan Akram portrait placeholder">
            <span>IA</span>
          </div>
        )}
      </div>
      <div className="portrait-badge portrait-badge-years"><strong>7+</strong><span>Years</span></div>
      <div className="portrait-badge portrait-badge-lead">Technical Leadership</div>
      <div className="portrait-badge portrait-badge-ai">LLM Integration</div>
    </div>
  );
}
