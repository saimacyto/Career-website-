/* Healthcare Tracks blog pages: theme toggle, mobile menu, reading progress, topic filter. */
(function () {
  const $ = s => document.querySelector(s);
  const root = document.documentElement;

  $("#theme-toggle").addEventListener("click", () => {
    const cur = root.getAttribute("data-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = cur === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("bcc-theme", next); } catch (e) { }
  });

  const menuBtn = $("#menu-btn"), nav = $("#topnav");
  menuBtn.addEventListener("click", () => {
    const open = !nav.classList.contains("open");
    nav.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
  });

  const bar = $("#progress");
  const onScroll = () => {
    const h = document.documentElement, max = h.scrollHeight - h.clientHeight;
    bar.style.transform = `scaleX(${max > 0 ? h.scrollTop / max : 0})`;
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const filters = document.querySelector(".blog-filters");
  if (filters) filters.addEventListener("click", e => {
    const b = e.target.closest("[data-tag]");
    if (!b) return;
    filters.querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", String(c === b)));
    document.querySelectorAll("#post-grid .post-card").forEach(card => {
      card.hidden = b.dataset.tag !== "all" && card.dataset.tag !== b.dataset.tag;
    });
  });
})();
