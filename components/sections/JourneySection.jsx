"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarDays, ClipboardCheck, SmilePlus } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { Reveal } from "@/components/Reveal";

const steps = [
  {
    icon: CalendarDays,
    titleKey: "journeyStep1Title",
    bodyKey: "journeyStep1Body"
  },
  {
    icon: ClipboardCheck,
    titleKey: "journeyStep2Title",
    bodyKey: "journeyStep2Body"
  },
  {
    icon: SmilePlus,
    titleKey: "journeyStep3Title",
    bodyKey: "journeyStep3Body"
  }
];

export function JourneySection() {
  const { t } = useLanguage();
  const rowRef = useRef(null);
  const userInteractedRef = useRef(false);
  const [position, setPosition] = useState({ canScrollLeft: false, canScrollRight: true });
  const [showBackControl, setShowBackControl] = useState(false);

  function updateScrollPosition() {
    const row = rowRef.current;
    if (!row) return;
    const moved = row.scrollLeft > 8;
    if (moved && userInteractedRef.current) setShowBackControl(true);
    if (!moved) setShowBackControl(false);
    setPosition({
      canScrollLeft: moved,
      canScrollRight: row.scrollLeft + row.clientWidth < row.scrollWidth - 8
    });
  }

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    userInteractedRef.current = false;
    setShowBackControl(false);
    row.scrollLeft = 0;
    updateScrollPosition();
    requestAnimationFrame(updateScrollPosition);
    row.addEventListener("scroll", updateScrollPosition, { passive: true });
    window.addEventListener("resize", updateScrollPosition);
    return () => {
      row.removeEventListener("scroll", updateScrollPosition);
      window.removeEventListener("resize", updateScrollPosition);
    };
  }, []);

  function markUserInteraction() {
    userInteractedRef.current = true;
  }

  function scrollNext() {
    markUserInteraction();
    setShowBackControl(true);
    rowRef.current?.scrollBy({ left: 270, behavior: "smooth" });
  }

  function scrollPrevious() {
    markUserInteraction();
    rowRef.current?.scrollBy({ left: -270, behavior: "smooth" });
  }

  return (
    <section className="content-section warm-band">
      <Reveal className="section-heading">
        <p className="eyebrow">{t.journeyEyebrow}</p>
        <h2>{t.journeyTitle}</h2>
        <span className="mobile-swipe-hint">{t.journeySwipeHint}</span>
      </Reveal>
      <div
        className={`swipe-row-wrap ${showBackControl && position.canScrollLeft ? "has-left" : ""} ${
          position.canScrollRight ? "has-right" : ""
        }`}
      >
        {showBackControl && position.canScrollLeft ? (
          <button
            className="swipe-arrow swipe-arrow-left"
            type="button"
            onClick={scrollPrevious}
            aria-label="Show previous steps"
          >
            &lt;
          </button>
        ) : null}
        <div
          className="journey-grid"
          ref={rowRef}
          onPointerDown={markUserInteraction}
          onTouchStart={markUserInteraction}
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.titleKey} delay={index * 80}>
                <article className="journey-step">
                  <span>{index + 1}</span>
                  <Icon size={28} />
                  <h3>{t[step.titleKey]}</h3>
                  <p>{t[step.bodyKey]}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
        <button
          className="swipe-arrow swipe-arrow-right"
          type="button"
          onClick={scrollNext}
          aria-label="Show more steps"
        >
          &gt;
        </button>
      </div>
    </section>
  );
}
