/* Healthcare Tracks: "Choosing a program" data and section.
   window.APPLY is also used by the career detail pages in app.js.

   For each career id (from careers.js):
     via:     how people apply (a centralized application service or directly)
     where:   the kinds of schools that offer programs
     license: what to check about state licensing
     tip:     one practical tip for getting in
*/

window.APPLY = {
  mls: { via: [["Apply directly to each program", ""]],
    where: "Universities (bachelor's degrees) and hospital- or university-based 12-month post-bacc certificate programs",
    license: "A few states, including California, New York, and Florida, require a state license in addition to ASCP certification.",
    tip: "Post-bacc classes are small. Apply early, and ask hospital programs whether they offer tuition help in exchange for a work commitment." },
  mlt: { via: [["Apply directly to each program", ""]],
    where: "Community and technical colleges (associate degrees)",
    license: "Same as MLS: a few states require a state license.",
    tip: "In-district community college tuition is usually the lowest. Finish general courses there while you wait for a program seat." },
  cytotech: { via: [["Apply directly to each program", ""]],
    where: "A small number of universities and hospitals (certificate, bachelor's, or master's)",
    license: "Check your state; a few require a laboratory license.",
    tip: "There are relatively few programs, so apply to several and compare start dates." },
  histotech: { via: [["Apply directly to each program", ""]],
    where: "Community colleges, hospitals, and some universities",
    license: "Check your state; a few require a laboratory license.",
    tip: "Some labs train histology staff on the job. Ask local hospital labs about trainee positions." },
  radtech: { via: [["Apply directly to each program", ""]],
    where: "Community colleges, hospital-based programs, and universities",
    license: "Most states license or certify radiographers. Check your state's radiologic technology board.",
    tip: "Hospital-based programs often have lower costs and strong clinical training." },
  sonography: { via: [["Apply directly to each program", ""]],
    where: "Community colleges, hospitals, and universities; certificate tracks for degree holders",
    license: "A few states license sonographers; most employers require ARDMS or similar registry credentials.",
    tip: "Choose a CAAHEP-accredited program so you can sit for registry exams right after graduating." },
  nucmed: { via: [["Apply directly to each program", ""]],
    where: "Hospitals, community colleges, and universities; certificate tracks for degree holders",
    license: "Many states license nuclear medicine technologists. Check your state board.",
    tip: "Certificate programs for people with a science degree can take about a year." },
  pt: { via: [["PTCAS", "https://www.ptcas.org"]],
    where: "Universities (Doctor of Physical Therapy, about 3 years)",
    license: "Every state requires a PT license after passing the NPTE.",
    tip: "Apply early in the PTCAS cycle; many programs review applications as they arrive." },
  pta: { via: [["Apply directly to each program", ""]],
    where: "Community and technical colleges (associate degrees)",
    license: "Every state regulates physical therapist assistants.",
    tip: "Observation hours with a PT or PTA strengthen your application." },
  ot: { via: [["OTCAS (most programs)", "https://otcas.liaisoncas.com"], ["or apply directly", ""]],
    where: "Universities (master's or OTD)",
    license: "Every state requires an OT license after passing the NBCOT exam.",
    tip: "Some programs accept direct applications outside OTCAS. Check each program's website." },
  ota: { via: [["Apply directly to each program", ""]],
    where: "Community and technical colleges (associate degrees)",
    license: "Every state regulates occupational therapy assistants.",
    tip: "Community college programs often have lower tuition for in-district students." },
  slp: { via: [["CSDCAS (most programs)", "https://csdcas.liaisoncas.com"]],
    where: "Universities (master's); post-bacc leveling courses for other majors",
    license: "Every state requires an SLP license; many employers also expect ASHA's CCC-SLP.",
    tip: "Online post-bacc leveling programs let non-CSD majors complete prerequisites while working." },
  rt: { via: [["Apply directly to each program", ""]],
    where: "Community colleges and universities",
    license: "Nearly every state licenses respiratory therapists.",
    tip: "Associate programs lead to the same RRT credential as bachelor's programs." },
  at: { via: [["ATCAS (many programs)", "https://atcas.liaisoncas.com"], ["or apply directly", ""]],
    where: "Universities (master's)",
    license: "Most states regulate athletic trainers after the BOC exam.",
    tip: "Some universities offer a combined 3+2 bachelor's-to-master's route." },
  pa: { via: [["CASPA", "https://caspa.liaisoncas.com"]],
    where: "Universities (master's, about 27 months)",
    license: "Every state requires a PA license after passing the PANCE.",
    tip: "Most programs want direct patient-care hours. Build them early, and submit your CASPA application soon after the cycle opens." },
  rn: { via: [["Apply directly to each program", ""], ["NursingCAS (some programs)", "https://www.nursingcas.org"]],
    where: "Community colleges (ADN), universities (BSN), and accelerated BSN programs for degree holders",
    license: "Every state requires an RN license after passing the NCLEX-RN. Many states share a multistate license through the Nurse Licensure Compact.",
    tip: "Community college ADN programs cost less. You can finish a BSN later through an RN-to-BSN program while working." },
  pharmacist: { via: [["PharmCAS", "https://www.pharmcas.org"]],
    where: "Universities (PharmD, 4 years after prerequisites)",
    license: "Every state requires a pharmacist license after the NAPLEX and a state law exam.",
    tip: "Some programs offer early-assurance or 0–6 routes straight from high school." },
  dentist: { via: [["ADEA AADSAS", "https://www.adea.org/godental"], ["TMDSAS (Texas public dental schools)", "https://www.tmdsas.com"]],
    where: "Universities (DDS or DMD, 4 years)",
    license: "Every state requires a dental license.",
    tip: "Public dental schools often favor in-state applicants and charge residents less." },
  physician: { via: [["AMCAS (MD)", "https://www.aamc.org"], ["AACOMAS (DO)", "https://aacomas.liaisoncas.com"], ["TMDSAS (Texas public medical schools)", "https://www.tmdsas.com"]],
    where: "Medical schools (MD or DO, 4 years), then residency",
    license: "Every state requires a medical license after exams and residency training.",
    tip: "Public medical schools often reserve most seats for state residents. Apply broadly, including to your own state's schools." },
  gc: { via: [["Apply to each program", ""], ["Genetic Counseling Admissions Match (NMS)", "https://natmatch.com/gcadmissions/"]],
    where: "Universities (master's, about 2 years)",
    license: "A growing number of states license genetic counselors.",
    tip: "Programs value counseling or advocacy experience, such as crisis-line volunteering." },
  mph: { via: [["SOPHAS (many programs)", "https://sophas.org"], ["or apply directly", ""]],
    where: "Universities (MPH, 1–2 years); many online and part-time options",
    license: "No license required. The CPH exam is optional.",
    tip: "Many programs no longer require the GRE, and part-time and online formats let you keep working." },
  healthadmin: { via: [["HAMPCAS (some programs)", "https://hampcas.liaisoncas.com"], ["or apply directly", ""]],
    where: "Universities (MHA, MPH, or MBA); many executive and online formats",
    license: "No license required, except nursing home administrators, who need a state license.",
    tip: "Executive MHA programs are designed for working professionals with healthcare experience." },
  dietitian: { via: [["DICAS (supervised practice programs)", "https://portal.dicas.org"], ["or apply directly", ""]],
    where: "Universities (ACEND-accredited coursework plus supervised practice; a graduate degree is now required)",
    license: "Most states license or certify dietitians.",
    tip: "Coordinated programs combine coursework and supervised practice, so you apply once." },
  researchtech: { via: [["Apply to jobs directly", ""]],
    where: "University, hospital, and biotech job boards",
    license: "No license required.",
    tip: "University HR sites post many research tech jobs. Lab experience from college courses counts." },
  crc: { via: [["Apply to jobs directly", ""]],
    where: "Hospital research departments, universities, and clinical research sites",
    license: "No license required; ACRP and SOCRA certifications are optional after experience.",
    tip: "Titles vary: search for clinical research assistant, study coordinator, and research associate." },
  regulatory: { via: [["Apply to jobs directly", ""]],
    where: "Pharmaceutical, biotech, and medical device companies",
    license: "No license required; RAPS certification is optional.",
    tip: "Quality assurance and document control roles are common first steps." },
  bioinformatics: { via: [["Apply to jobs or programs directly", ""]],
    where: "Universities (master's), research institutes, and biotech companies",
    license: "No license required.",
    tip: "A portfolio of code, such as analyses posted on GitHub, helps as much as a degree." },
  medscientist: { via: [["Apply directly to PhD programs", ""]],
    where: "Research universities (PhD, usually fully funded with a stipend)",
    license: "No license required.",
    tip: "Research experience matters most. Most PhD programs in the biomedical sciences cover tuition and pay a stipend." }
};

(function () {
  const careers = window.CAREERS;
  const APPLY = window.APPLY;
  const $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
  const store = {
    get(k, f) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : f; } catch (e) { return f; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } }
  };
  if (!$("#programs")) return;

  /* ---------- tabs ---------- */
  const tabs = document.querySelectorAll("#programs [role=tab]");
  function showTab(id) {
    tabs.forEach(t => {
      const on = t.getAttribute("aria-controls") === id;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
  }
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => showTab(t.getAttribute("aria-controls")));
    t.addEventListener("keydown", e => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const n = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
      n.focus(); n.click();
    });
  });

  document.addEventListener("click", e => {
    const t = e.target.closest("[data-tab]");
    if (t) showTab(t.dataset.tab);
  });

  /* ---------- program finder ---------- */
  const sel = $("#finder-career");
  const byName = careers.slice().sort((a, b) => a.name.localeCompare(b.name));
  sel.innerHTML = byName.map(c => `<option value="${c.id}">${esc(c.name)}</option>`).join("");
  sel.value = "mls";
  function renderFinder() {
    const c = careers.find(x => x.id === sel.value);
    const a = APPLY[c.id];
    const via = a.via.map(([label, url]) => url
      ? `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(label)} ↗</a>`
      : `<span>${esc(label)}</span>`).join("");
    const dir = c.accreditor
      ? `<a class="btn btn-primary btn-sm" href="${esc(c.accreditor.url)}" target="_blank" rel="noopener">Find accredited programs (${esc(c.accreditor.name)}) ↗</a>`
      : `<span class="fine">No program accreditation applies. Look for jobs and degree programs directly.</span>`;
    $("#finder-result").innerHTML = `
      <div class="finder-card" data-cat="${c.cat}">
        <div class="finder-head"><h3>${esc(c.name)}</h3><button type="button" class="btn btn-ghost btn-sm" data-open="${c.id}">Full career page →</button></div>
        <dl class="finder-facts">
          <div><dt>Where programs are</dt><dd>${esc(a.where)}</dd></div>
          <div><dt>How you apply</dt><dd class="via">${via}</dd></div>
          <div><dt>Licensing</dt><dd>${esc(a.license)}</dd></div>
          <div><dt>Tip for getting in</dt><dd>${esc(a.tip)}</dd></div>
        </dl>
        <div class="finder-actions">${dir}</div>
      </div>`;
  }
  sel.addEventListener("change", renderFinder);
  renderFinder();

  /* ---------- evaluation checklist ---------- */
  const CHECK = [
    ["Quality", [
      ["accredited", "The program is accredited, or has candidate or provisional status that still lets graduates sit for the exam"],
      ["passrate", "Certification exam pass rate for recent graduates (first-attempt rates are the most telling)"],
      ["gradrate", "Graduation rate: how many students who start actually finish"],
      ["jobs", "Job placement rate within 6–12 months of graduation"]]],
    ["Clinical training", [
      ["placements", "The program arranges your clinical placements (you don't have to find your own)"],
      ["sites", "Where clinical sites are, and how far you may have to travel"]]],
    ["Cost", [
      ["total", "Total cost: tuition, fees, books, equipment, exam fees, and living costs"],
      ["instate", "In-state or in-district tuition, and whether a regional exchange lowers out-of-state tuition"],
      ["aid", "Scholarships, assistantships, hospital tuition help, or loan repayment options"]]],
    ["Fit", [
      ["length", "Length, start dates, and whether full-time, part-time, evening, or hybrid formats exist"],
      ["size", "Class size, faculty access, and tutoring or advising support"],
      ["license", "The program qualifies you for licensure in the state where you want to work"]]],
    ["Admission", [
      ["prereqs", "Prerequisites, and how recent they must be"],
      ["reqs", "Minimum GPA, GRE or test policy, and required patient-care or observation hours"],
      ["deadline", "Deadlines, and whether admission is rolling (earlier applicants get reviewed first)"]]]
  ];
  let checked = store.get("ht-checklist", []);
  const total = CHECK.reduce((n, [, items]) => n + items.length, 0);
  $("#checklist").innerHTML = CHECK.map(([group, items]) => `
    <fieldset class="check-group"><legend>${esc(group)}</legend>
      ${items.map(([id, text]) => `<label class="check-item"><input type="checkbox" data-check="${id}" ${checked.includes(id) ? "checked" : ""}><span>${esc(text)}</span></label>`).join("")}
    </fieldset>`).join("");
  function syncChecks() {
    const n = checked.length;
    $("#check-count").textContent = `${n} of ${total} checked`;
    $("#check-bar").style.width = (n / total) * 100 + "%";
  }
  $("#checklist").addEventListener("change", e => {
    const id = e.target.dataset.check;
    if (!id) return;
    checked = e.target.checked ? [...new Set([...checked, id])] : checked.filter(x => x !== id);
    store.set("ht-checklist", checked);
    syncChecks();
  });
  $("#check-reset").addEventListener("click", () => {
    checked = [];
    store.set("ht-checklist", checked);
    document.querySelectorAll("[data-check]").forEach(b => { b.checked = false; });
    syncChecks();
  });
  $("#check-print").addEventListener("click", () => window.print());
  syncChecks();
})();
