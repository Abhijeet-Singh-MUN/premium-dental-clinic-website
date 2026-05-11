"use client";

import { useEffect, useRef, useState } from "react";
import { Quote, Star, StarHalf } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { Reveal } from "@/components/Reveal";

const testimonials = [
  {
    nameKey: "testimonial3Name",
    treatmentKey: "testimonial3Treatment",
    textKey: "testimonial3Text",
    rating: 5
  },
  {
    nameKey: "testimonial2Name",
    treatmentKey: "testimonial2Treatment",
    textKey: "testimonial2Text",
    rating: 4
  },
  {
    nameKey: "testimonial1Name",
    treatmentKey: "testimonial1Treatment",
    textKey: "testimonial1Text",
    rating: 4.5
  }
];

function RatingStars({ rating }) {
  return (
    <div className="stars" aria-label={`${rating} star Google review`}>
      {[0, 1, 2, 3, 4].map((star) => {
        const filled = star + 1 <= Math.floor(rating);
        const half = !filled && star < rating;
        if (half) {
          return <StarHalf key={star} size={15} fill="currentColor" />;
        }
        return <Star key={star} size={15} fill={filled ? "currentColor" : "none"} />;
      })}
      <span>{rating}</span>
    </div>
  );
}

export function TestimonialsSection() {
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
    rowRef.current?.scrollBy({ left: 285, behavior: "smooth" });
  }

  function scrollPrevious() {
    markUserInteraction();
    rowRef.current?.scrollBy({ left: -285, behavior: "smooth" });
  }

  return (
    <section className="content-section testimonials-section">
      <Reveal className="section-heading">
        <p className="eyebrow">{t.testimonialsEyebrow}</p>
        <h2>{t.testimonialsTitle}</h2>
        <p>{t.testimonialsBody}</p>
        <span className="mobile-swipe-hint">{t.testimonialsSwipeHint}</span>
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
            aria-label="Show previous reviews"
          >
            &lt;
          </button>
        ) : null}
        <div
          className="testimonial-grid"
          ref={rowRef}
          onPointerDown={markUserInteraction}
          onTouchStart={markUserInteraction}
        >
          {testimonials.map((item, index) => (
            <Reveal key={item.treatmentKey} delay={index * 80}>
              <article className="testimonial-card">
                <Quote size={24} />
                <p>{t[item.textKey]}</p>
                <RatingStars rating={item.rating} />
                <strong>{t[item.nameKey]}</strong>
                <span>{t[item.treatmentKey]}</span>
              </article>
            </Reveal>
          ))}
        </div>
        <button
          className="swipe-arrow swipe-arrow-right"
          type="button"
          onClick={scrollNext}
          aria-label="Show more reviews"
        >
          &gt;
        </button>
      </div>
    </section>
  );
}
