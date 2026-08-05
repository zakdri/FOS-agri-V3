import { animate, inView, stagger } from "https://cdn.jsdelivr.net/npm/motion@13.0.0/+esm";

(function () {
  const root = document.documentElement;
  const body = document.body;
  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  root.classList.add("motion-dev-enabled");

  if (prefersReducedMotion) {
    root.classList.add("motion-dev-reduced");
    return;
  }

  const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const unique = (items) => Array.from(new Set(items)).filter(Boolean);
  const finishWillChange = (controls, target) => {
    const clear = () => {
      target.style.willChange = "";
    };

    if (controls?.finished?.finally) {
      controls.finished.finally(clear);
      return;
    }

    window.setTimeout(clear, 900);
  };

  const isRenderable = (element) => {
    if (!element || element.closest("[hidden], .is-hidden")) return false;
    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  };

  function animatePageEntrance() {
    const header = document.querySelector(".site-header");
    if (header) {
      animate(header, { opacity: [0, 1], y: [-12, 0] }, { duration: 0.55, ease: [0.22, 1, 0.36, 1] });
    }

    const heroChildren = unique([
      ...qsa(".hero-content > *"),
      ...qsa(".page-hero-secondary .container > *"),
      ...qsa(".prestation-detail-hero .container > *")
    ]).filter(isRenderable);

    if (heroChildren.length) {
      animate(
        heroChildren,
        { opacity: [0, 1], y: [24, 0], filter: ["blur(6px)", "blur(0px)"] },
        { delay: stagger(0.08, { startDelay: 0.12 }), duration: 0.7, ease: [0.22, 1, 0.36, 1] }
      );
    }

    const heroMedia = document.querySelector(".hero-media, .prestation-detail-hero, .page-hero-secondary");
    if (heroMedia) {
      animate(heroMedia, { scale: [1.025, 1] }, { duration: 1.2, ease: [0.16, 1, 0.3, 1] });
    }
  }

  function initScrollReveals() {
    const revealSelector = [
      ".section-head",
      ".gov-section-head",
      ".org-section-head",
      ".prestation-section-head",
      ".intro-panel",
      ".intro-list-item",
      ".service-card",
      ".service-box",
      ".news-card",
      ".news-slide-mini",
      ".news-item-mini",
      ".agenda-event-card",
      ".stat-card",
      ".testimonial-card",
      ".region-card",
      ".member-card",
      ".partner-card",
      ".contact-item",
      ".page-card",
      ".page-list-item",
      ".prestation-card",
      ".prestation-panel",
      ".prestation-nav-chip",
      ".prestation-feature-card",
      ".prestation-extra-card",
      ".prestation-accordion-item",
      ".prestation-keypoints-panel",
      ".medical-partner-panel",
      ".bank-card",
      ".gov-card",
      ".org-node",
      ".footer-grid > div"
    ].join(",");

    const revealed = new WeakSet();
    const registered = new WeakSet();

    const prepare = (scope = document) => {
      const candidates = scope.matches?.(revealSelector) ? [scope, ...qsa(revealSelector, scope)] : qsa(revealSelector, scope);
      const targets = candidates.filter((target) => isRenderable(target) && !registered.has(target));
      if (!targets.length) return;

      targets.forEach((target) => {
        registered.add(target);
        target.dataset.motionReveal = "true";
        target.style.willChange = "transform, opacity";
      });

      inView(
        targets,
        (target) => {
          if (revealed.has(target) || !isRenderable(target)) return;
          revealed.add(target);

          const siblings = target.parentElement
            ? Array.from(target.parentElement.children).filter((child) => child.dataset.motionReveal === "true")
            : [];
          const index = Math.max(0, siblings.indexOf(target));
          const delay = Math.min(index, 6) * 0.045;

          const controls = animate(
            target,
            { opacity: [0, 1], y: [22, 0], scale: [0.985, 1] },
            { delay, duration: 0.62, ease: [0.22, 1, 0.36, 1] }
          );

          finishWillChange(controls, target);
        },
        { amount: 0.18, margin: "0px 0px -8% 0px" }
      );
    };

    prepare();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) return;
          prepare(node);
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  function initLanguageTransition() {
    const languageControls = qsa("[data-lang], .secondary-lang-select");
    languageControls.forEach((control) => {
      control.addEventListener("click", () => {
        animate(body, { opacity: [0.96, 1] }, { duration: 0.28, ease: "easeOut" });
      });
      control.addEventListener("change", () => {
        animate(body, { opacity: [0.96, 1] }, { duration: 0.28, ease: "easeOut" });
      });
    });
  }

  function initMotion() {
    animatePageEntrance();
    initScrollReveals();
    initLanguageTransition();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMotion, { once: true });
  } else {
    initMotion();
  }
})();
