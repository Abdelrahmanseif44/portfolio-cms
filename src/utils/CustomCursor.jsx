import { useEffect } from "react";

export function CustomCursor() {
  useEffect(() => {
    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    const hint = document.getElementById("cursor-hint");

    if (!dot || !ring) return;

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let started = false;
    let animationFrame;

    const handleMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;

      if (!started) {
        started = true;
        rx = mx;
        ry = my;

        dot.classList.add("active");
        ring.classList.add("active");
      }

      dot.style.transform = `translate3d(${mx - 3}px, ${my - 3}px, 0)`;
    };

    const animateRing = () => {
      if (started) {
        rx += (mx - rx) * 0.15;
        ry += (my - ry) * 0.15;

        ring.style.transform =
          `translate3d(${rx - 17}px, ${ry - 17}px, 0)`;
      }

      animationFrame = requestAnimationFrame(animateRing);
    };

    const hoverEls =
      "a, button, label, .work-row, .gallery-tile, .serv-row-head, .btn-red, .btn-outline, .social-icon-btn";

    const handleMouseOver = (e) => {
      if (!(e.target instanceof Element)) return;

      const element = e.target;

      if (element.closest(hoverEls)) {
        ring.classList.add("hover");
      }

      const card = element.closest(".work-row, .gallery-tile");

      if (card && hint) {
        hint.textContent = "VIEW";
        ring.classList.add("show-hint");
      }
    };

    const handleMouseOut = (e) => {
      if (!(e.target instanceof Element)) return;

      const element = e.target;

      if (element.closest(hoverEls)) {
        ring.classList.remove("hover");
      }

      if (element.closest(".work-row, .gallery-tile")) {
        ring.classList.remove("show-hint");
      }
    };

    const handleMouseLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      if (started) {
        dot.style.opacity = "1";
        ring.style.opacity = "0.55";
      }
    };

    document.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    });

    document.addEventListener("mouseover", handleMouseOver, {
      passive: true,
    });

    document.addEventListener("mouseout", handleMouseOut, {
      passive: true,
    });

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    animateRing();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);

      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return null;
}