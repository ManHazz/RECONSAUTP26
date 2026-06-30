import { useState, useEffect, useRef, useCallback, useMemo } from "react";

import EVENTS_RAW from "@/data/events.json";

// Per-slide brand palette — cycles so the timeline shifts hue as you scroll.
// Kept brand-anchored (purple) but spans into blue, teal and magenta so each
// transition is visibly distinct rather than a wash of one hue.
const PALETTE = [
  { base: "#461B61", glow: "#9f44db" }, // brand purple
  { base: "#1E3A6B", glow: "#5587E8" }, // ocean blue
  { base: "#7B1F66", glow: "#E879C5" }, // magenta-pink
  { base: "#1A5C77", glow: "#5BC4E5" }, // teal / light blue
  { base: "#3D1454", glow: "#8a3dc9" }, // deep violet
  { base: "#2C2A8A", glow: "#6B7AE8" }, // indigo
];

export default function KeyEventsTimeline() {
  const slides = useMemo(
    () =>
      EVENTS_RAW.map((e, i) => ({
        id: e.id,
        marker: String(i + 1).padStart(2, "0"),
        title: e.name,
        description: e.description,
        image: e.image,
      })),
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const scrollCooldown = useRef(false);
  const wheelAccum = useRef(0);
  const wheelReset = useRef(null);
  const touchStartY = useRef(0);
  const containerRef = useRef(null);

  // Preload images
  useEffect(() => {
    slides.forEach((s) => {
      const img = new Image();
      img.src = s.image;
    });
  }, [slides]);

  const goTo = useCallback(
    (direction) => {
      if (scrollCooldown.current) return;
      const next = activeIndex + direction;
      if (next < 0 || next >= slides.length) return;

      scrollCooldown.current = true;
      setTransitioning(true);
      setActiveIndex(next);

      setTimeout(() => setTransitioning(false), 500);
      setTimeout(() => (scrollCooldown.current = false), 350);
    },
    [activeIndex, slides.length]
  );

  const jumpTo = useCallback(
    (i) => {
      if (transitioning || i === activeIndex) return;
      setTransitioning(true);
      setActiveIndex(i);
      setTimeout(() => setTransitioning(false), 500);
    },
    [transitioning, activeIndex]
  );

  // Wheel — accumulate delta for continuous scroll feel, and release to the
  // page when at the first/last slide so the user can reach the footer.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const THRESHOLD = 70;

    const handler = (e) => {
      const atFirst = activeIndex === 0;
      const atLast = activeIndex === slides.length - 1;
      const goingDown = e.deltaY > 0;

      // Let the page scroll naturally past the boundary
      if ((atLast && goingDown) || (atFirst && !goingDown)) {
        wheelAccum.current = 0;
        return;
      }

      e.preventDefault();
      wheelAccum.current += e.deltaY;

      if (Math.abs(wheelAccum.current) >= THRESHOLD) {
        const dir = wheelAccum.current > 0 ? 1 : -1;
        wheelAccum.current = 0;
        goTo(dir);
      }

      clearTimeout(wheelReset.current);
      wheelReset.current = setTimeout(() => (wheelAccum.current = 0), 180);
    };

    el.addEventListener("wheel", handler, { passive: false });
    return () => {
      el.removeEventListener("wheel", handler);
      clearTimeout(wheelReset.current);
    };
  }, [goTo, activeIndex, slides.length]);

  // Touch — accumulate movement during the swipe so continuous dragging keeps
  // advancing slides, and release to the page at the first/last boundary so
  // users can swipe through to the footer.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const SWIPE_THRESHOLD = 55;
    let lastY = 0;
    let swipeAccum = 0;
    let touchHandedToPage = false;

    const onStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
      lastY = e.touches[0].clientY;
      swipeAccum = 0;
      touchHandedToPage = false;
    };

    const onMove = (e) => {
      const y = e.touches[0].clientY;
      const dy = lastY - y; // positive = swipe up = next
      lastY = y;

      const atFirst = activeIndex === 0;
      const atLast = activeIndex === slides.length - 1;
      const goingDown = dy > 0;

      // At the boundary in the boundary direction → let the page scroll
      if ((atLast && goingDown) || (atFirst && !goingDown)) {
        touchHandedToPage = true;
        return; // passive:false, but no preventDefault → page scrolls
      }

      e.preventDefault(); // keep the page locked while inside the timeline
      swipeAccum += dy;

      if (Math.abs(swipeAccum) >= SWIPE_THRESHOLD) {
        const dir = swipeAccum > 0 ? 1 : -1;
        swipeAccum = 0;
        goTo(dir);
      }
    };

    const onEnd = (e) => {
      if (touchHandedToPage) return;
      // Single short flick that never crossed the move-threshold
      const diff = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 40 && Math.abs(swipeAccum) < SWIPE_THRESHOLD) {
        goTo(diff > 0 ? 1 : -1);
      }
      swipeAccum = 0;
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: false });
    el.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
    };
  }, [goTo, activeIndex, slides.length]);

  // Keyboard
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        goTo(1);
      }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(-1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goTo]);

  const active = slides[activeIndex];
  const dotSpacing = 100 / (slides.length - 1);
  const theme = PALETTE[activeIndex % PALETTE.length];

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        fontFamily: "var(--font-Poppins), 'Poppins', system-ui, sans-serif",
        cursor: "default",
        userSelect: "none",
        backgroundColor: theme.base,
        transition: "background-color 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* ── Background image layers ── */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${s.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: i === activeIndex ? 1 : 0,
            transition: "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            zIndex: 0,
          }}
        />
      ))}

      {/* ── Branded overlay (animates with theme) ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, ${hexA(theme.base, 0.25)} 0%, rgba(0,0,0,0.18) 45%, ${hexA(theme.base, 0.5)} 100%)`,
          transition: "background 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 80% 20%, ${hexA(theme.glow, 0.15)}, transparent 55%)`,
          transition: "background 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* ── Content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding:
            "clamp(5rem, 12vh, 7rem) clamp(1rem, 5vw, 4rem) clamp(3.5rem, 8vh, 5.5rem)",
        }}
      >
        {/* ── Top label ── */}
        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              color: "#fff",
              fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
              fontWeight: 800,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              margin: 0,
              opacity: 0.92,
            }}
          >
            Key Events
          </h1>
        </div>

        {/* ── Center: event info ── */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            maxWidth: "min(760px, 88vw)",
            margin: "0 auto",
          }}
        >
          <span
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "clamp(0.7rem, 1.4vw, 0.9rem)",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            Event
          </span>
          <span
            key={`marker-${activeIndex}`}
            style={{
              color: "#ffffff",
              fontSize: "clamp(3rem, 10vw, 8rem)",
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              animation:
                "kevFadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
              textShadow: `0 6px 28px ${hexA(theme.glow, 0.55)}, 0 2px 6px rgba(0,0,0,0.35)`,
            }}
          >
            {active.marker}
          </span>

          <h2
            key={`title-${activeIndex}`}
            style={{
              color: "#fff",
              fontSize: "clamp(1.6rem, 4.5vw, 3.2rem)",
              fontWeight: 700,
              margin: "clamp(0.5rem, 2vh, 1.5rem) 0",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              textShadow: "0 2px 16px rgba(0,0,0,0.55), 0 1px 3px rgba(0,0,0,0.4)",
              animation:
                "kevFadeUp 0.7s 0.1s cubic-bezier(0.16, 1, 0.3, 1) both",
            }}
          >
            {active.title}
          </h2>

          <p
            key={`desc-${activeIndex}`}
            style={{
              color: "rgba(255,255,255,0.92)",
              fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)",
              lineHeight: 1.7,
              maxWidth: "560px",
              margin: 0,
              fontWeight: 400,
              textShadow: "0 1px 10px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.45)",
              animation:
                "kevFadeUp 0.7s 0.2s cubic-bezier(0.16, 1, 0.3, 1) both",
            }}
          >
            {active.description}
          </p>
        </div>

        {/* ── Timeline bar ── */}
        <div
          style={{
            position: "relative",
            width: "min(82%, 760px)",
            margin: "0 auto",
          }}
        >
          {/* Line */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              height: "1px",
              background: "rgba(255,255,255,0.25)",
              transform: "translateY(-50%)",
            }}
          />

          {/* Active segment */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              width: `${activeIndex * dotSpacing}%`,
              height: "2px",
              background: `linear-gradient(90deg, ${hexA(theme.glow, 0.15)}, ${theme.glow})`,
              transform: "translateY(-50%)",
              transition:
                "width 0.6s cubic-bezier(0.16, 1, 0.3, 1), background 0.8s cubic-bezier(0.4,0,0.2,1)",
              boxShadow: `0 0 12px ${theme.glow}`,
            }}
          />

          {/* Dots */}
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {slides.map((s, i) => {
              const isActive = i === activeIndex;
              const isPast = i < activeIndex;
              return (
                <button
                  key={s.id}
                  onClick={() => jumpTo(i)}
                  aria-label={`Go to event ${s.marker}: ${s.title}`}
                  style={{
                    position: "relative",
                    background: "none",
                    border: "none",
                    padding: "8px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    outline: "none",
                  }}
                >
                  <div
                    style={{
                      width: isActive
                        ? "clamp(18px, 2.5vw, 28px)"
                        : "clamp(10px, 1.4vw, 14px)",
                      height: isActive
                        ? "clamp(18px, 2.5vw, 28px)"
                        : "clamp(10px, 1.4vw, 14px)",
                      borderRadius: "50%",
                      border: `2px solid ${
                        isActive
                          ? "#fff"
                          : isPast
                          ? hexA(theme.glow, 0.6)
                          : "rgba(255,255,255,0.35)"
                      }`,
                      background: isActive
                        ? hexA(theme.glow, 0.35)
                        : "transparent",
                      transition:
                        "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backdropFilter: isActive ? "blur(4px)" : "none",
                      boxShadow: isActive ? `0 0 22px ${theme.glow}` : "none",
                    }}
                  >
                    <div
                      style={{
                        width: isActive ? "6px" : "4px",
                        height: isActive ? "6px" : "4px",
                        borderRadius: "50%",
                        background: "#fff",
                        opacity: isActive ? 1 : 0.55,
                        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <div
        style={{
          position: "absolute",
          bottom: "clamp(0.4rem, 1vh, 0.8rem)",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
          opacity: activeIndex === slides.length - 1 ? 0.5 : 0.6,
          transition: "opacity 0.5s ease",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            color: "#fff",
            fontSize: "0.6rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          {activeIndex === slides.length - 1 ? "Continue" : "Scroll"}
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          style={{ animation: "kevBounce 2s infinite" }}
        >
          <path
            d="M3 5L7 9L11 5"
            stroke="rgba(255,255,255,0.75)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <style>{`
        @keyframes kevFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes kevBounce {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(3px); }
        }
      `}</style>
    </div>
  );
}

// Hex (#RRGGBB) → rgba() helper so the brand palette can carry alpha cleanly.
function hexA(hex, alpha) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
