/* Biology Career Compass — app logic. No libraries, no build step. */

/* ---- Site settings: edit these two lines ---- */
const SITE = {
  channelUrl: "",   // e.g. "https://www.youtube.com/@yourchannel" — shows the "Watch on YouTube" button
  baseUrl: ""   // leave empty to use whatever address the site is opened on (Cloudflare, GitHub Pages, or a custom domain)
};

(function () {
  const careers = window.CAREERS;
  const CATS = window.CATEGORIES;
  const CAT_ORDER = ["lab", "rehab", "clinical", "research"];
  const byId = Object.fromEntries(careers.map(c => [c.id, c]));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const SHORT = {
    mls: "MLS", mlt: "MLT", cytotech: "Cytotech", histotech: "Histotech", radtech: "Rad tech",
    sonography: "Sonographer", nucmed: "Nuc med", pt: "Physical therapist", pta: "PT assistant",
    ot: "Occupational therapist", ota: "OT assistant", slp: "Speech pathologist", rt: "Respiratory therapist",
    at: "Athletic trainer", pa: "PA", rn: "Nurse (RN)", pharmacist: "Pharmacist", dentist: "Dentist",
    physician: "Physician", gc: "Genetic counselor", mph: "Public health", dietitian: "Dietitian",
    researchtech: "Research tech", crc: "Research coordinator", regulatory: "Regulatory", bioinformatics: "Bioinformatics",
    medscientist: "PhD scientist"
  };

  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));
  const esc = s => String(s).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
  const yrsShort = c => (c.years >= 11 ? "11+ yrs" : c.years + " yrs");

  /* Small, safe wrappers: storage can be blocked (private mode, embeds). */
  const store = {
    get(k, fallback) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } }
  };

  /* ---------------- theme toggle ---------------- */
  const root = document.documentElement;
  function currentTheme() {
    return root.getAttribute("data-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }
  $("#theme-toggle").addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("bcc-theme", next); } catch (e) { }
  });

  /* ---------------- mobile menu ---------------- */
  const menuBtn = $("#menu-btn"), nav = $("#topnav");
  function setMenu(open) {
    nav.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
  nav.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });

  /* ---------------- scroll: progress bar, back-to-top, active nav ---------------- */
  const progress = $("#progress"), toTop = $("#to-top");
  function onScroll() {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    progress.style.transform = `scaleX(${max > 0 ? h.scrollTop / max : 0})`;
    toTop.classList.toggle("show", h.scrollTop > 700);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));

  const navLinks = $$("#topnav a");
  if ("IntersectionObserver" in window) {
    const navObs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    navLinks.forEach(a => { const s = document.querySelector(a.getAttribute("href")); if (s) navObs.observe(s); });

    /* reveal-on-scroll */
    const revObs = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); revObs.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -10% 0px" });
    $$(".reveal").forEach(el => revObs.observe(el));
  } else {
    $$(".reveal").forEach(el => el.classList.add("in"));
  }

  /* ---------------- hero: counters and compass ---------------- */
  function countUp() {
    $$("[data-count]").forEach(el => {
      const target = Number(el.dataset.count);
      if (reduceMotion) { el.textContent = target; return; }
      const start = performance.now(), dur = 1100;
      const tick = now => {
        const p = Math.min(1, (now - start) / dur);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      el.textContent = "0";
      requestAnimationFrame(tick);
    });
  }
  countUp();

  const compass = $("#compass");
  const ANGLE = { lab: 0, rehab: 90, clinical: 180, research: 270 };
  const pointCompass = cat => compass.style.setProperty("--angle", (cat ? ANGLE[cat] : 35) + "deg");

  /* ---------------- hero category tiles ---------------- */
  $("#hero-cats").innerHTML = CAT_ORDER.map(k => {
    const n = careers.filter(c => c.cat === k).length;
    return `<li><a href="#explore" data-cat="${k}" data-jump="${k}">
      <em>${n} careers</em><strong>${esc(CATS[k].label)}</strong><span>${esc(CATS[k].blurb)}</span></a></li>`;
  }).join("");
  $$("[data-jump]").forEach(a => {
    a.addEventListener("click", () => setCat(a.dataset.jump));
    a.addEventListener("mouseenter", () => pointCompass(a.dataset.jump));
    a.addEventListener("focus", () => pointCompass(a.dataset.jump));
    a.addEventListener("mouseleave", () => pointCompass(null));
  });

  /* ---------------- ruler / map ---------------- */
  const MAX_Y = 12;
  function renderRuler() {
    const ruler = $("#ruler");
    ruler.innerHTML = CAT_ORDER.map(k => `
      <div class="r-row" data-cat="${k}" role="listitem">
        <div class="r-label">${esc(CATS[k].label)}</div>
        <div class="r-track" data-track="${k}"></div>
      </div>`).join("") + `
      <div class="r-axis"><div class="r-axis-label">years after<br>high school</div>
        <div class="r-ticks">${[0, 2, 4, 6, 8, 10, 12].map(t =>
          `<span class="r-tick" style="left:${(t / MAX_Y) * 100}%">${t}${t === 12 ? "+" : ""}</span>`).join("")}</div>
      </div>`;
    layoutRuler();
  }
  function layoutRuler() {
    let n = 0;
    CAT_ORDER.forEach(k => {
      const track = document.querySelector(`[data-track="${k}"]`);
      const W = track.clientWidth;
      const items = careers.filter(c => c.cat === k).sort((a, b) => a.years - b.years);
      const lanes = []; // right edge (px) of last item in each lane
      let html = "";
      items.forEach(c => {
        const label = SHORT[c.id] || c.name;
        const w = label.length * 7 + 34;
        const x = (Math.min(c.years, MAX_Y) / MAX_Y) * W;
        const left = x - w / 2;
        let lane = lanes.findIndex(r => r + 6 < left);
        if (lane === -1) { lane = lanes.length; lanes.push(0); }
        lanes[lane] = x + w / 2;
        html += `<button type="button" class="r-dot" style="left:${x}px;top:${10 + lane * 32}px;--i:${n++}"
          data-open="${c.id}" title="${esc(c.name)} · ${esc(c.yearsLabel)}">${esc(label)}</button>`;
      });
      track.innerHTML = html;
      track.style.minHeight = (20 + lanes.length * 32) + "px";
    });
  }
  renderRuler();
  let rt;
  window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(layoutRuler, 120); });

  /* ---------------- shortlist ---------------- */
  let shortlist = store.get("bcc-shortlist", []).filter(id => byId[id]);
  let compareSel = store.get("bcc-compare", []).filter(id => shortlist.includes(id));
  const isSaved = id => shortlist.includes(id);

  function toggleSave(id) {
    if (isSaved(id)) {
      shortlist = shortlist.filter(x => x !== id);
      compareSel = compareSel.filter(x => x !== id);
    } else {
      shortlist.push(id);
      if (compareSel.length < 3) compareSel.push(id);
    }
    store.set("bcc-shortlist", shortlist);
    store.set("bcc-compare", compareSel);
    $$(`[data-save="${id}"]`).forEach(b => {
      b.setAttribute("aria-pressed", String(isSaved(id)));
      if (!reduceMotion) { b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop"); }
    });
    renderTray(true);
  }

  const tray = $("#tray");
  function renderTray(bump) {
    tray.hidden = shortlist.length === 0;
    $("#tray-count").textContent = shortlist.length;
    $("#tray-list").innerHTML = shortlist.map(id => {
      const c = byId[id];
      const on = compareSel.includes(id);
      const disabled = !on && compareSel.length >= 3;
      return `<li data-cat="${c.cat}">
        <label class="tray-pick"><input type="checkbox" data-pick="${id}" ${on ? "checked" : ""} ${disabled ? "disabled" : ""}>
          <span class="dot"></span><span>${esc(c.name)}</span></label>
        <button type="button" class="tray-x" data-save="${id}" aria-pressed="true" aria-label="Remove ${esc(c.name)}">×</button>
      </li>`;
    }).join("");
    $("#compare-btn").disabled = compareSel.length < 2;
    $("#compare-btn").textContent = compareSel.length >= 2 ? `Compare ${compareSel.length}` : "Compare";
    $("#tray-hint").textContent = shortlist.length < 2 ? "Save one more to compare" : "Tick 2–3 to compare";
    if (bump && !reduceMotion) { tray.classList.remove("bump"); void tray.offsetWidth; tray.classList.add("bump"); }
  }
  $("#tray-list").addEventListener("change", e => {
    const id = e.target.dataset.pick;
    if (!id) return;
    compareSel = e.target.checked ? [...compareSel, id].slice(0, 3) : compareSel.filter(x => x !== id);
    store.set("bcc-compare", compareSel);
    renderTray(false);
  });
  $("#tray-toggle").addEventListener("click", () => {
    const open = tray.classList.toggle("collapsed") === false;
    $("#tray-toggle").setAttribute("aria-expanded", String(open));
  });
  $("#clear-btn").addEventListener("click", () => {
    const ids = shortlist.slice();
    shortlist = []; compareSel = [];
    store.set("bcc-shortlist", shortlist); store.set("bcc-compare", compareSel);
    ids.forEach(id => $$(`[data-save="${id}"]`).forEach(b => b.setAttribute("aria-pressed", "false")));
    renderTray(false);
  });
  renderTray(false);

  /* ---------------- explorer ---------------- */
  const state = { q: "", cat: "all", sort: "cat", maxYears: 12 };
  let visibleOrder = careers.map(c => c.id);

  $("#filters").innerHTML =
    `<button type="button" class="chip" data-filter="all" aria-pressed="true">All</button>` +
    CAT_ORDER.map(k => `<button type="button" class="chip" data-filter="${k}" data-cat="${k}" aria-pressed="false">${esc(CATS[k].label)}</button>`).join("");
  $("#filters").addEventListener("click", e => {
    const b = e.target.closest("[data-filter]");
    if (b) setCat(b.dataset.filter);
  });
  $("#search").addEventListener("input", e => { state.q = e.target.value.trim().toLowerCase(); renderGrid(); });
  $("#sort").addEventListener("change", e => { state.sort = e.target.value; renderGrid(); });

  const range = $("#max-years");
  function syncRange() {
    state.maxYears = Number(range.value);
    $("#max-years-out").textContent = state.maxYears >= 12 ? "Any" : `up to ${state.maxYears} years`;
    range.style.setProperty("--fill", ((range.value - range.min) / (range.max - range.min)) * 100 + "%");
  }
  range.addEventListener("input", () => { syncRange(); renderGrid(); });
  syncRange();

  function setCat(cat) {
    state.cat = cat;
    $$("#filters .chip").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.filter === cat)));
    renderGrid();
  }

  function matches(c) {
    if (state.cat !== "all" && c.cat !== state.cat) return false;
    if (state.maxYears < 12 && c.years > state.maxYears) return false;
    if (!state.q) return true;
    const hay = [c.name, c.credential, c.tagline, c.day, c.degree, c.exam, SHORT[c.id], CATS[c.cat].label, ...c.tags].join(" ").toLowerCase();
    return state.q.split(/\s+/).every(w => hay.includes(w));
  }

  function card(c, i) {
    return `<article class="card" data-cat="${c.cat}" style="--i:${i}">
      <button type="button" class="card-open" data-open="${c.id}">
        <span class="card-top"><span class="cred">${esc(c.credential)}</span><span class="yrs">${yrsShort(c)}</span></span>
        <span class="card-title">${esc(c.name)}</span>
        <span class="card-text">${esc(c.tagline)}</span>
        <span class="card-meter" aria-hidden="true"><span style="width:${(Math.min(c.years, MAX_Y) / MAX_Y) * 100}%"></span></span>
        <span class="card-foot"><span class="deg">${esc(c.degree)}</span><span class="more">Details →</span></span>
      </button>
      <button type="button" class="save" data-save="${c.id}" aria-pressed="${isSaved(c.id)}" aria-label="Save ${esc(c.name)} to shortlist" title="Save to shortlist">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2z"/></svg>
      </button>
    </article>`;
  }

  function renderGrid() {
    let list = careers.filter(matches);
    if (state.sort === "years") list.sort((a, b) => a.years - b.years || a.name.localeCompare(b.name));
    else if (state.sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    else list.sort((a, b) => CAT_ORDER.indexOf(a.cat) - CAT_ORDER.indexOf(b.cat) || a.years - b.years);
    visibleOrder = list.map(c => c.id);

    $("#count").textContent = `Showing ${list.length} of ${careers.length} careers`;
    if (!list.length) {
      const why = state.q ? `match “${esc(state.q)}”` : "fit those filters";
      $("#grid").innerHTML = `<div class="empty">No careers ${why}. Try a broader word like “lab”, “patients”, or “master's”, or allow more years of school.</div>`;
      return;
    }
    let i = 0;
    if (state.sort === "cat") {
      $("#grid").innerHTML = CAT_ORDER.map(k => {
        const g = list.filter(c => c.cat === k);
        if (!g.length) return "";
        return `<div class="group-title" data-cat="${k}"><h3>${esc(CATS[k].label)}</h3><span>${esc(CATS[k].blurb)}</span></div>` + g.map(c => card(c, i++)).join("");
      }).join("");
    } else {
      $("#grid").innerHTML = list.map(c => card(c, i++)).join("");
    }
  }
  renderGrid();

  /* ---------------- detail dialog ---------------- */
  const dlg = $("#detail");

  function shareUrl(id) {
    const base = SITE.baseUrl || (location.origin + location.pathname);
    return base + "#career-" + id;
  }

  const TRAIT = {
    patients: "Lots of patient time", "some-patients": "Some patient contact", behind: "Behind the scenes",
    fast: "Fast-paced", steady: "Steady pace", hospital: "Hospital", community: "Clinic / community", industry: "Lab / industry",
    lab: "Lab & microscope", movement: "Hands-on rehab", tech: "Technology", data: "Data & detail", talk: "Talking & teaching"
  };
  const traitFor = (c, keys) => c.tags.filter(t => keys.includes(t)).map(t => TRAIT[t]).join(", ") || "Varies";

  function openCareer(id, push = true) {
    const c = byId[id];
    if (!c) return;
    const order = visibleOrder.includes(id) ? visibleOrder : careers.map(x => x.id);
    const i = order.indexOf(id);
    const prev = byId[order[(i - 1 + order.length) % order.length]];
    const next = byId[order[(i + 1) % order.length]];

    const video = c.video
      ? `<div class="video-box"><p><strong>Watch the episode</strong> on this career.</p><a class="btn btn-primary" href="${esc(c.video)}" target="_blank" rel="noopener">Play video</a></div>`
      : `<div class="video-box"><p><strong>Video episode coming soon.</strong> This career is on the series list.</p></div>`;

    const links = [
      c.accreditor ? { label: `Find accredited programs (${c.accreditor.name})`, url: c.accreditor.url } : null,
      ...c.links,
      { label: "Pay & job outlook (BLS)", url: c.bls }
    ].filter(Boolean);

    const traits = c.tags.map(t => `<span class="trait">${esc(TRAIT[t] || t)}</span>`).join("");

    $("#detail-body").innerHTML = `
      <div class="d-head" data-cat="${c.cat}">
        <div class="d-top"><span class="d-cat">${esc(CATS[c.cat].label)}</span>
          <span class="d-top-actions">
            <button type="button" class="save save-lg" data-save="${c.id}" aria-pressed="${isSaved(c.id)}" aria-label="Save ${esc(c.name)} to shortlist" title="Save to shortlist">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2z"/></svg>
            </button>
            <button type="button" class="close" data-close aria-label="Close">×</button>
          </span></div>
        <h2 id="d-name">${esc(c.name)}</h2>
        <p class="d-tag">${esc(c.tagline)}</p>
        <div class="traits">${traits}</div>
      </div>
      <dl class="facts" data-cat="${c.cat}">
        <div class="fact"><dt>Credential</dt><dd>${esc(c.credential)}</dd></div>
        <div class="fact"><dt>Degree</dt><dd>${esc(c.degree)}</dd></div>
        <div class="fact"><dt>Time after high school</dt><dd>${esc(c.yearsLabel)}</dd></div>
        <div class="fact"><dt>Exam</dt><dd>${esc(c.exam)}</dd></div>
      </dl>
      <div class="d-sec"><h3>What the work looks like</h3><p>${esc(c.day)}</p></div>
      <div class="d-sec" data-cat="${c.cat}"><h3>Your route in</h3>
        <ol class="steps">${c.route.map(s => `<li><span>${esc(s)}</span></li>`).join("")}</ol></div>
      <div class="d-sec" data-cat="${c.cat}"><h3>Links</h3>
        <div class="links">${links.map(l => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join("")}</div></div>
      ${video}
      <div class="share"><span>Link to this career:</span><code id="share-url">${esc(shareUrl(c.id))}</code>
        <button type="button" id="copy-link">Copy</button></div>
      <div class="d-nav">
        <button type="button" data-open="${prev.id}">← ${esc(prev.name)}</button>
        <button type="button" data-open="${next.id}">${esc(next.name)} →</button>
      </div>`;

    if ($("#compare").open) $("#compare").close();
    if (!dlg.open) dlg.showModal();
    dlg.scrollTop = 0;
    if (push && location.hash !== "#career-" + id) {
      try { history.replaceState(null, "", "#career-" + id); } catch (e) { /* frame may block this */ }
    }
  }

  dlg.addEventListener("close", () => {
    if (location.hash.startsWith("#career-")) {
      try { history.replaceState(null, "", location.pathname + location.search); } catch (e) { }
    }
  });

  function wireDialog(d) {
    d.addEventListener("click", e => {
      if (e.target === d) d.close(); // backdrop
      if (e.target.closest("[data-close]")) d.close();
    });
  }
  wireDialog(dlg);
  wireDialog($("#compare"));

  dlg.addEventListener("click", e => {
    if (e.target.id === "copy-link") {
      const text = $("#share-url").textContent;
      const btn = e.target;
      const selectIt = () => { const r = document.createRange(); r.selectNodeContents($("#share-url")); const s = getSelection(); s.removeAllRanges(); s.addRange(r); btn.textContent = "Selected, press Ctrl+C"; };
      try {
        navigator.clipboard.writeText(text).then(() => { btn.textContent = "Copied ✓"; }, selectIt);
      } catch (err) { selectIt(); }
    }
  });

  document.addEventListener("click", e => {
    const s = e.target.closest("[data-save]");
    if (s) { e.preventDefault(); toggleSave(s.dataset.save); return; }
    const t = e.target.closest("[data-open]");
    if (t) { e.preventDefault(); openCareer(t.dataset.open); }
  });

  function fromHash() {
    const m = location.hash.match(/^#career-([a-z0-9]+)$/);
    if (m && byId[m[1]]) openCareer(m[1], false);
  }
  window.addEventListener("hashchange", fromHash);
  fromHash();

  /* ---------------- compare ---------------- */
  function openCompare() {
    const list = compareSel.map(id => byId[id]).filter(Boolean);
    if (list.length < 2) return;
    const rows = [
      ["Area", c => `<span class="d-cat">${esc(CATS[c.cat].label)}</span>`],
      ["Time after high school", c => `<div class="cmp-years"><span style="width:${(Math.min(c.years, MAX_Y) / MAX_Y) * 100}%"></span></div>${esc(c.yearsLabel)}`],
      ["Degree", c => esc(c.degree)],
      ["Credential", c => `<code>${esc(c.credential)}</code>`],
      ["Exam", c => esc(c.exam)],
      ["Patient contact", c => esc(traitFor(c, ["patients", "some-patients", "behind"]))],
      ["Pace", c => esc(traitFor(c, ["fast", "steady"]))],
      ["Setting", c => esc(traitFor(c, ["hospital", "community", "industry"]))],
      ["Accreditor", c => c.accreditor ? `<a href="${esc(c.accreditor.url)}" target="_blank" rel="noopener">${esc(c.accreditor.name)} ↗</a>` : "Varies by program"],
      ["Pay & outlook", c => `<a href="${esc(c.bls)}" target="_blank" rel="noopener">BLS ↗</a>`]
    ];
    $("#compare-body").innerHTML = `
      <div class="d-top"><div><p class="eyebrow">Side by side</p><h2 id="cmp-title">Compare careers</h2></div>
        <button type="button" class="close" data-close aria-label="Close">×</button></div>
      <div class="cmp-scroll"><table class="cmp" style="--n:${list.length}">
        <thead><tr><th scope="col"><span class="sr-only">Detail</span></th>${list.map(c =>
          `<th scope="col" data-cat="${c.cat}"><button type="button" data-open="${c.id}">${esc(c.name)}</button></th>`).join("")}</tr></thead>
        <tbody>${rows.map(([label, fn]) => `<tr><th scope="row">${label}</th>${list.map(c => `<td data-cat="${c.cat}">${fn(c)}</td>`).join("")}</tr>`).join("")}</tbody>
      </table></div>
      <p class="fine">Tap a career name to open its full page.</p>`;
    const cd = $("#compare");
    if (!cd.open) cd.showModal();
  }
  $("#compare-btn").addEventListener("click", openCompare);

  /* ---------------- biology-grad fast routes ---------------- */
  const ROUTES = [
    { time: "About 12 months", title: "Post-bacc MLS certificate", text: "Hospital- and university-based programs take biology graduates straight into the clinical lab, then the ASCP MLS exam.", ids: ["mls"] },
    { time: "12–24 months", title: "Cytotechnology program", text: "Certificate or master's programs for science graduates who like microscope diagnosis.", ids: ["cytotech"] },
    { time: "12–18 months", title: "Accelerated BSN", text: "Second-degree nursing programs build on your first bachelor's, then the NCLEX-RN.", ids: ["rn"] },
    { time: "12–18 months", title: "Imaging certificates", text: "Sonography and nuclear medicine offer certificate tracks for people who already hold a degree.", ids: ["sonography", "nucmed"] },
    { time: "Start now", title: "Research and trials jobs", text: "Research tech and clinical research coordinator roles hire biology graduates directly and pay while you decide.", ids: ["researchtech", "crc"] },
    { time: "2–3 years", title: "Graduate health programs", text: "Your prerequisites are mostly done. Add observation or patient-care hours and apply to PA, OT, PT, or genetic counseling.", ids: ["pa", "ot", "pt", "gc"] }
  ];
  $("#routes").innerHTML = ROUTES.map((r, i) => `
    <div class="route" style="--i:${i}"><span class="time">${esc(r.time)}</span><h3>${esc(r.title)}</h3><p>${esc(r.text)}</p>
      <div class="links">${r.ids.map(id => `<button type="button" data-open="${id}">${esc(SHORT[id])} →</button>`).join("")}</div>
    </div>`).join("");

  /* ---------------- quiz (one question at a time) ---------------- */
  const QUESTIONS = [
    { id: "q1", text: "How much time with patients do you want?", weight: 1.5, opts: [
      ["patients", "Most of my day"], ["some-patients", "Some, not all day"], ["behind", "Behind the scenes"]] },
    { id: "q2", text: "Which sounds most like fun?", weight: 2, opts: [
      ["lab", "Microscopes and specimens"], ["movement", "Helping bodies move and heal"], ["tech", "Running imaging or life-support machines"],
      ["data", "Data, documents, and details"], ["talk", "Talking, teaching, counseling"]] },
    { id: "q3", text: "How many years of school after high school are you ready for?", years: true, opts: [
      ["2", "About 2"], ["4", "About 4"], ["7", "6 to 7"], ["99", "As long as it takes"]] },
    { id: "q4", text: "What pace do you like?", weight: 1, opts: [
      ["fast", "Fast, high stakes"], ["steady", "Steady and predictable"]] },
    { id: "q5", text: "Where would you rather work?", weight: 1, opts: [
      ["hospital", "Hospital"], ["community", "Clinic, school, or sports"], ["industry", "Lab, office, or company"]] }
  ];
  const TAG_WORDS = {
    patients: "lots of patient time", "some-patients": "some patient contact", behind: "behind-the-scenes work",
    lab: "lab and microscope work", movement: "hands-on rehab", tech: "technology and equipment", data: "data and detail",
    talk: "talking and teaching", fast: "a fast pace", steady: "a steady pace", hospital: "hospital setting",
    community: "clinic or community setting", industry: "lab or industry setting"
  };
  const MAX_SCORE = QUESTIONS.reduce((s, q) => s + (q.weight || 1.5), 0);
  const TOTAL = QUESTIONS.length;

  const form = $("#quiz-form");
  form.innerHTML = QUESTIONS.map((q, qi) => `
    <fieldset class="q" data-step="${qi}" ${qi ? "hidden" : ""}><legend><span class="q-num">${qi + 1}/${TOTAL}</span>${esc(q.text)}</legend>
      <div class="opts">${q.opts.map(([v, label], oi) => `
        <label class="opt"><input type="radio" id="${q.id}-${oi}" name="${q.id}" value="${v}"><span>${esc(label)}</span></label>`).join("")}
      </div></fieldset>`).join("") + `
    <div class="quiz-actions">
      <button class="btn btn-ghost" type="button" id="quiz-back" disabled>← Back</button>
      <button class="btn btn-primary" type="button" id="quiz-next" disabled>Next →</button>
      <button class="btn btn-primary" type="submit" id="quiz-submit" hidden>Show my matches</button>
      <button class="btn btn-link" type="reset">Start over</button>
    </div>`;

  let step = 0;
  const steps = $$("#quiz-form .q");
  function answered(i) { return !!form.querySelector(`input[name="${QUESTIONS[i].id}"]:checked`); }
  function showStep(i) {
    step = i;
    steps.forEach((s, j) => { s.hidden = j !== i; s.classList.toggle("enter", j === i); });
    const done = QUESTIONS.filter((_, j) => answered(j)).length;
    $("#quiz-bar-fill").style.width = (done / TOTAL) * 100 + "%";
    $("#quiz-back").disabled = i === 0;
    const last = i === TOTAL - 1;
    $("#quiz-next").hidden = last;
    $("#quiz-submit").hidden = !last;
    $("#quiz-next").disabled = !answered(i);
    $("#quiz-submit").disabled = !answered(i);
  }
  form.addEventListener("change", e => {
    if (e.target.type !== "radio") return;
    showStep(step);
    if (step < TOTAL - 1) setTimeout(() => { if (answered(step)) showStep(step + 1); }, reduceMotion ? 0 : 280);
  });
  $("#quiz-next").addEventListener("click", () => { if (answered(step)) showStep(step + 1); });
  $("#quiz-back").addEventListener("click", () => showStep(Math.max(0, step - 1)));
  form.addEventListener("reset", () => { $("#quiz-results").innerHTML = ""; setTimeout(() => showStep(0), 0); });
  showStep(0);

  form.addEventListener("submit", e => {
    e.preventDefault();
    const firstMissing = QUESTIONS.findIndex((_, i) => !answered(i));
    if (firstMissing !== -1) { showStep(firstMissing); return; }
    const fd = new FormData(form);
    const maxYears = Number(fd.get("q3"));
    const scored = careers.map(c => {
      let s = 0; const why = [];
      QUESTIONS.forEach(q => {
        if (q.years) return;
        const v = fd.get(q.id);
        if (c.tags.includes(v)) { s += q.weight; why.push(TAG_WORDS[v]); }
        else if (q.id === "q1" && v === "some-patients" && c.tags.includes("patients")) s += 0.5;
      });
      if (c.years <= maxYears) { s += 1.5; why.push(`about ${yrsShort(c)} of school`); }
      else s -= (c.years - maxYears) * 0.6;
      return { c, s, why };
    }).sort((a, b) => b.s - a.s || a.c.years - b.c.years).slice(0, 3);

    $("#quiz-results").innerHTML = `<h3>Your top three to research</h3>` + scored.map((r, i) => {
      const pct = Math.max(8, Math.round((Math.max(0, r.s) / MAX_SCORE) * 100));
      return `
      <div class="result" data-cat="${r.c.cat}" style="--i:${i}">
        <span class="rank">${i + 1}</span>
        <div><h4>${esc(r.c.name)}</h4><p>Matches: ${esc(r.why.join(", ") || "a partial fit")}.</p>
          <div class="fit"><span class="fit-bar"><span style="--w:${pct}%"></span></span><span class="fit-num">${pct}% fit</span></div></div>
        <div class="result-actions">
          <button type="button" class="btn btn-ghost" data-open="${r.c.id}">See the route</button>
          <button type="button" class="save" data-save="${r.c.id}" aria-pressed="${isSaved(r.c.id)}" aria-label="Save ${esc(r.c.name)} to shortlist" title="Save to shortlist">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2z"/></svg>
          </button>
        </div>
      </div>`;
    }).join("");
    $("#quiz-bar-fill").style.width = "100%";
    $("#quiz-results").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
  });

  /* ---------------- resources ---------------- */
  const APPS = [
    ["PTCAS", "Physical therapy", "https://www.ptcas.org"],
    ["OTCAS", "Occupational therapy", "https://otcas.liaisoncas.com"],
    ["CASPA", "Physician assistant", "https://caspa.liaisoncas.com"],
    ["CSDCAS", "Speech-language pathology", "https://csdcas.liaisoncas.com"],
    ["ATCAS", "Athletic training", "https://atcas.liaisoncas.com"],
    ["NursingCAS", "Nursing", "https://www.nursingcas.org"],
    ["PharmCAS", "Pharmacy", "https://www.pharmcas.org"],
    ["AMCAS", "MD medical school", "https://www.aamc.org"],
    ["AACOMAS", "DO medical school", "https://aacomas.liaisoncas.com"],
    ["ADEA AADSAS", "Dental school", "https://www.adea.org/godental"],
    ["SOPHAS", "Public health", "https://sophas.org"]
  ];
  $("#apps").innerHTML = APPS.map(([n, f, u]) => `<li><a href="${u}" target="_blank" rel="noopener">${n}</a><small>${f}</small></li>`).join("");

  const seen = new Map();
  careers.forEach(c => {
    if (!c.accreditor) return;
    const key = c.accreditor.name;
    if (!seen.has(key)) seen.set(key, { url: c.accreditor.url, fields: [] });
    const f = SHORT[c.id];
    if (!seen.get(key).fields.includes(f)) seen.get(key).fields.push(f);
  });
  $("#accred").innerHTML = [...seen].map(([n, v]) =>
    `<li><a href="${v.url}" target="_blank" rel="noopener">${esc(n)}</a><small>${esc(v.fields.join(", "))}</small></li>`).join("");

  /* ---------------- channel link ---------------- */
  if (SITE.channelUrl) { const a = $("#channel-link"); a.href = SITE.channelUrl; a.hidden = false; }
})();
