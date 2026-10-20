(() => {
  "use strict";

  const navToggle = document.querySelector(".nav-toggle");
  const navPanel = document.querySelector("#primary-navigation");
  const navLinks = document.querySelectorAll("#primary-navigation .nav-link, #primary-navigation .nav-cta");
  const yearElement = document.querySelector("#current-year");

  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }

  if (navToggle && navPanel) {
    const closeMenu = () => {
      navPanel.classList.remove("show");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    };

    navToggle.addEventListener("click", () => {
      const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isExpanded));
      navPanel.classList.toggle("show", !isExpanded);
      document.body.classList.toggle("nav-open", !isExpanded);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 992) closeMenu();
    });
  }

  const sections = document.querySelectorAll("main section[id]");
  const primaryLinks = document.querySelectorAll('.nav-link[href^="#"]');

  if ("IntersectionObserver" in window && sections.length && primaryLinks.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        primaryLinks.forEach((link) => {
          const active = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-30% 0px -60% 0px", threshold: 0 });

    sections.forEach((section) => sectionObserver.observe(section));
  }
})();
// Scroll reveal (respects reduced motion)
(() => {
  const items = document.querySelectorAll("[data-reveal]");
  if (!items.length || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.documentElement.classList.add("js-reveal");
  document.querySelectorAll(".skills-grid .skill-card").forEach((el, i) => el.style.setProperty("--i", i % 3));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  items.forEach((el) => io.observe(el));
})();
