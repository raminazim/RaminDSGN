(() => {
  "use strict";
  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const forcedColors = window.matchMedia("(forced-colors: active)");
  const pageLoader = document.getElementById("page-loader");
  const loaderStartedAt = performance.now();
  const loaderMinimumDuration = 1800;
  function hidePageLoader() {
    pageLoader.classList.add("is-hidden");
    pageLoader.setAttribute("aria-hidden", "true");
  }
  function finishPageLoad() {
    const remainingTime = Math.max(0, loaderMinimumDuration - (performance.now() - loaderStartedAt));
    window.setTimeout(hidePageLoader, remainingTime);
  }
  if (document.readyState === "complete") finishPageLoad();
  else window.addEventListener("load", finishPageLoad, { once: true });
  // Open linked legal text, including direct links, with native details fallback.
  function openLegalDocument() {
    const id = window.location.hash.slice(1);
    if (id !== "terms-of-service" && id !== "privacy-policy") return;
    const panel = document.getElementById(id);
    panel.open = true;
    panel.querySelector("summary").focus({ preventScroll: true });
    panel.scrollIntoView({ block: "start" });
  }
  const legalLinks = document.querySelector(".legal-links");
  if (legalLinks) {
    legalLinks.addEventListener("click", (event) => {
      const link = event.target.closest("a");
      if (!link) return;
      const panel = document.querySelector(link.getAttribute("href"));
      if (panel) panel.open = true;
      if (link.hash === window.location.hash) openLegalDocument();
    });
  }
  window.addEventListener("hashchange", openLegalDocument);
  openLegalDocument();
  // Current copyright year.
  document.getElementById("year").textContent = new Date().getFullYear();
  // Reveal each element once; leave everything visible without support.
  const revealElements = document.querySelectorAll(".reveal");
  let revealObserver;
  if ("IntersectionObserver" in window && !reducedMotion.matches) {
    revealObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.remove("is-pending");
          revealObserver.unobserve(entry.target);
        }
      }
    }, { threshold: 0.08 });
    revealElements.forEach((element) => {
      element.classList.add("is-pending");
      revealObserver.observe(element);
    });
  }
  // Retire the single scroll indicator as soon as scrolling begins.
  function hideScrollIndicator() {
    if (window.scrollY > 8) {
      root.classList.add("has-scrolled");
      window.removeEventListener("scroll", hideScrollIndicator);
    }
  }
  window.addEventListener("scroll", hideScrollIndicator, { passive: true });
  hideScrollIndicator();
  const form = document.querySelector(".inquiry-form");
  const emailInput = document.getElementById("email");
  const inquiryMessage = document.getElementById("inquiry-message");
  const status = document.getElementById("form-status");
  const submitButton = form.querySelector("button[type='submit']");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    inquiryMessage.value = emailInput.value.trim() + " is interested in services.";
    submitButton.disabled = true;
    status.textContent = "Sending your inquiry…";
    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });
      const result = await response.json();
      const succeeded = result.success === true || result.success === "true";
      if (!response.ok || !succeeded) {
        throw new Error(result.message || "The inquiry could not be sent.");
      }
      status.textContent = "Thanks! Your inquiry has been sent to RaminDSGN. Expect a response wthin 48 hours.";
      form.reset();
    } catch (error) {
      status.textContent = error instanceof Error
        ? error.message + " Please try again or email ramindsgn@gmail.com."
        : "Your inquiry could not be sent. Please try again or email ramindsgn@gmail.com.";
    } finally {
      submitButton.disabled = false;
    }
  });
  // Pointer interpolation and ambient parallax share one on-demand frame.
  const cursor = document.querySelector(".cursor");
  const light = document.querySelector(".ambient-light");
  const interactive = "a, button, input, summary, select, textarea, [role='button']";
  let enabled = false;
  let active = false;
  let frame = 0;
  let width = window.innerWidth;
  let height = window.innerHeight;
  let targetX = width / 2;
  let targetY = height / 2;
  let x = targetX;
  let y = targetY;
  let glowX = 0;
  let glowY = 0;
  function renderPointer() {
    frame = 0;
    if (!enabled || !active) return;
    x += (targetX - x) * 0.22;
    y += (targetY - y) * 0.22;
    const targetGlowX = (targetX / width - 0.5) * 70;
    const targetGlowY = (targetY / height - 0.5) * 50;
    glowX += (targetGlowX - glowX) * 0.07;
    glowY += (targetGlowY - glowY) * 0.07;
    cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    light.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`;
    if (Math.abs(targetX - x) + Math.abs(targetY - y) > 0.1 || Math.abs(targetGlowX - glowX) + Math.abs(targetGlowY - glowY) > 0.1) {
      frame = requestAnimationFrame(renderPointer);
    }
  }
  function stopPointer() {
    active = false;
    root.classList.remove("cursor-active");
    cursor.classList.remove("is-hovering");
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
  }
  function movePointer(event) {
    if (!enabled || event.pointerType !== "mouse") return;
    targetX = event.clientX;
    targetY = event.clientY;
    if (!active) {
      x = targetX;
      y = targetY;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      active = true;
      root.classList.add("cursor-active");
    }
    cursor.classList.toggle("is-hovering", event.target instanceof Element && Boolean(event.target.closest(interactive)));
    if (!frame) frame = requestAnimationFrame(renderPointer);
  }
  function updatePointerPreference() {
    enabled = finePointer.matches && !reducedMotion.matches && !forcedColors.matches;
    if (!enabled) { stopPointer(); light.style.transform = ""; }
    if (reducedMotion.matches && revealObserver) {
      revealObserver.disconnect();
      revealElements.forEach((element) => element.classList.remove("is-pending"));
    }
  }
  document.addEventListener("pointermove", movePointer, { passive: true });
  document.documentElement.addEventListener("pointerleave", stopPointer);
  document.addEventListener("pointerdown", (event) => { if (event.pointerType !== "mouse") stopPointer(); }, { passive: true });
  document.addEventListener("keydown", stopPointer);
  window.addEventListener("blur", stopPointer);
  document.addEventListener("visibilitychange", () => { if (document.hidden) stopPointer(); });
  window.addEventListener("resize", () => { width = window.innerWidth; height = window.innerHeight; }, { passive: true });
  [finePointer, reducedMotion, forcedColors].forEach((query) => { query.addEventListener("change", updatePointerPreference); });
  updatePointerPreference();
})();
