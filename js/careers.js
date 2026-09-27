/*
  Career data for Healthcare Tracks.
  ------------------------------------------------------------------
  To add a career: copy one object, give it a unique `id`, fill the fields.
  To attach a video from the series: paste the YouTube URL into `video`.
  Each career page can be linked directly as  yoursite/#career-<id>
  (example: #career-mls). Use these links in video descriptions.

  cat:   lab | rehab | clinical | research
  years: typical years of school after high school (used for sorting,
         the pathway chart, and the quiz). yearsLabel is what readers see.
  careerVideo: optional YouTube video ID for an official career video (for example
         from CareerOneStop). From an embed code like
         src="https://www.youtube.com/embed/B7Jm90Zen20", the ID is B7Jm90Zen20.
  pay:   optional, e.g. "$61,890". Shown as median pay next to the salary links.
         Copy it from the BLS page (Pay tab) and update it each year.
  tags:  used by the "Which path fits me?" quiz.
         patients | some-patients | behind       (patient contact)
         movement | lab | tech | data | talk     (what they enjoy)
         fast | steady                           (pace)
         hospital | community | industry         (setting)
*/

const BLS = "https://www.bls.gov/ooh/";

window.CAREERS = [
  /* ---------------- LAB & DIAGNOSTIC SCIENCES ---------------- */
  {
    id: "mls",
    name: "Medical Laboratory Scientist",
    cat: "lab",
    credential: "MLS(ASCP)",
    tagline: "Runs the tests behind most medical decisions: blood counts, chemistry, microbiology, blood bank.",
    day: "You process patient specimens on analyzers and by hand, identify bacteria, crossmatch blood for transfusion, troubleshoot quality control, and call critical results to physicians. Little direct patient contact, a lot of responsibility.",
    years: 4,
    yearsLabel: "4 years (bachelor's), or 1 year after a biology degree",
    degree: "Bachelor's",
    route: [
      "Earn a bachelor's in medical laboratory science from a NAACLS-accredited program, or finish a biology/chemistry bachelor's and then a 12-month NAACLS-accredited post-baccalaureate MLS certificate",
      "Pass the ASCP Board of Certification MLS exam",
      "Get a state license if you work in a licensing state (for example CA, NY, FL, and a few others)"
    ],
    exam: "ASCP BOC MLS exam",
    accreditor: { name: "NAACLS", url: "https://www.naacls.org" },
    links: [
      { label: "ASCP Board of Certification", url: "https://www.ascp.org/content/board-of-certification" },
      { label: "ASCLS (professional society)", url: "https://ascls.org" }
    ],
    bls: BLS + "healthcare/clinical-laboratory-technologists-and-technicians.htm",
    bioGrad: true,
    tags: ["behind", "lab", "fast", "hospital"],
    video: ""
  },
  {
    id: "mlt",
    name: "Medical Laboratory Technician",
    cat: "lab",
    credential: "MLT(ASCP)",
    tagline: "The two-year entry into the clinical lab, with a clear ladder up to MLS.",
    day: "Similar bench work to an MLS: running analyzers, preparing slides, performing routine tests. MLTs usually handle less complex testing and can bridge to MLS later through online MLT-to-MLS programs.",
    years: 2,
    yearsLabel: "2 years (associate)",
    degree: "Associate",
    route: [
      "Complete an associate degree in a NAACLS-accredited MLT program",
      "Pass the ASCP BOC MLT exam",
      "Optional later: an MLT-to-MLS bridge program to become a scientist"
    ],
    exam: "ASCP BOC MLT exam",
    accreditor: { name: "NAACLS", url: "https://www.naacls.org" },
    links: [
      { label: "ASCP Board of Certification", url: "https://www.ascp.org/content/board-of-certification" }
    ],
    bls: BLS + "healthcare/clinical-laboratory-technologists-and-technicians.htm",
    tags: ["behind", "lab", "fast", "hospital"],
    video: ""
  },
  {
    id: "cytotech",
    name: "Cytotechnologist",
    cat: "lab",
    credential: "CT(ASCP)",
    tagline: "Screens cells under the microscope to find cancer and pre-cancer early.",
    day: "You examine Pap tests, fine-needle aspirates, and body fluid specimens, mark abnormal cells for the pathologist, and increasingly assist at the bedside with rapid on-site evaluation during biopsies. Focused, detail-heavy microscope work.",
    years: 5,
    yearsLabel: "4–5 years (bachelor's plus certificate, or a master's)",
    degree: "Bachelor's + certificate",
    route: [
      "Earn a bachelor's with biology and chemistry coursework",
      "Complete a CAAHEP-accredited cytotechnology program (certificate, bachelor's, or master's level)",
      "Pass the ASCP BOC CT exam"
    ],
    exam: "ASCP BOC CT exam",
    accreditor: { name: "CAAHEP (via CPC)", url: "https://www.caahep.org" },
    links: [
      { label: "American Society of Cytopathology", url: "https://www.cytopathology.org" },
      { label: "ASCP Board of Certification", url: "https://www.ascp.org/content/board-of-certification" }
    ],
    bls: BLS + "healthcare/clinical-laboratory-technologists-and-technicians.htm",
    bioGrad: true,
    tags: ["behind", "lab", "steady", "hospital"],
    video: ""
  },
  {
    id: "histotech",
    name: "Histotechnician / Histotechnologist",
    cat: "lab",
    credential: "HT(ASCP) · HTL(ASCP)",
    tagline: "Turns tissue from surgery and biopsies into the stained slides pathologists diagnose from.",
    day: "You process and embed tissue, cut micron-thin sections on a microtome, run H&E and special stains, and perform immunohistochemistry. Technologists (HTL) take on complex methods, validation, and lead roles.",
    years: 2,
    yearsLabel: "2 years (HT) or 4 years (HTL)",
    degree: "Associate or Bachelor's",
    route: [
      "HT: associate degree plus a NAACLS-accredited histotechnician program, or a qualifying on-the-job route",
      "HTL: bachelor's plus a NAACLS-accredited histotechnology program, or qualifying experience",
      "Pass the ASCP BOC HT or HTL exam"
    ],
    exam: "ASCP BOC HT or HTL exam",
    accreditor: { name: "NAACLS", url: "https://www.naacls.org" },
    links: [
      { label: "National Society for Histotechnology", url: "https://nsh.org" },
      { label: "ASCP Board of Certification", url: "https://www.ascp.org/content/board-of-certification" }
    ],
    bls: BLS + "healthcare/clinical-laboratory-technologists-and-technicians.htm",
    bioGrad: true,
    tags: ["behind", "lab", "steady", "hospital"],
    video: ""
  },
  {
    id: "radtech",
    name: "Radiologic Technologist",
    cat: "lab",
    credential: "R.T.(R)(ARRT)",
    tagline: "Takes X-rays and can specialize into CT, MRI, mammography, or interventional work.",
    day: "You position patients, set exposure, protect everyone from unnecessary radiation, and produce images radiologists read. Lots of patient contact, often in the ER and operating room.",
    years: 2,
    yearsLabel: "2 years (associate)",
    degree: "Associate",
    route: [
      "Complete a JRCERT-accredited radiography program (usually an associate degree)",
      "Pass the ARRT radiography exam",
      "Meet state licensing rules where required",
      "Optional: add CT, MRI, or mammography credentials"
    ],
    exam: "ARRT Radiography exam",
    accreditor: { name: "JRCERT", url: "https://www.jrcert.org" },
    links: [
      { label: "ARRT", url: "https://www.arrt.org" },
      { label: "ASRT (professional society)", url: "https://www.asrt.org" }
    ],
    bls: BLS + "healthcare/radiologic-technologists.htm",
    tags: ["patients", "tech", "fast", "hospital"],
    video: ""
  },
  {
    id: "sonography",
    name: "Diagnostic Medical Sonographer",
    cat: "lab",
    credential: "RDMS · RDCS · RVT",
    tagline: "Uses ultrasound to image pregnancies, hearts, abdomens, and blood vessels.",
    day: "You scan patients, judge in real time what images the physician needs, and write a preliminary findings sheet. Strong anatomy and hand-eye skill matter; the work is physically demanding on shoulders and wrists.",
    years: 2,
    yearsLabel: "2–4 years (associate or bachelor's; 12–18 month certificates for those with a prior degree)",
    degree: "Associate or Bachelor's",
    route: [
      "Complete a CAAHEP-accredited sonography program",
      "Pass the ARDMS SPI physics exam plus a specialty exam (abdomen, OB/GYN, echo, vascular)",
      "Alternative: ARRT sonography credential"
    ],
    exam: "ARDMS SPI + specialty exam",
    accreditor: { name: "CAAHEP (via JRC-DMS)", url: "https://www.caahep.org" },
    links: [
      { label: "ARDMS", url: "https://www.ardms.org" },
      { label: "SDMS (professional society)", url: "https://www.sdms.org" }
    ],
    bls: BLS + "healthcare/diagnostic-medical-sonographers.htm",
    bioGrad: true,
    tags: ["patients", "tech", "steady", "hospital"],
    video: ""
  },
  {
    id: "nucmed",
    name: "Nuclear Medicine Technologist",
    cat: "lab",
    credential: "CNMT · R.T.(N)",
    tagline: "Gives patients radioactive tracers and images how organs function, including PET scans.",
    day: "You prepare and administer radiopharmaceuticals, run gamma cameras and PET/CT scanners, and follow strict radiation safety rules. Blends chemistry, physics, and patient care.",
    years: 4,
    yearsLabel: "2–4 years (1-year certificate if you already hold a related degree)",
    degree: "Associate, Bachelor's, or Certificate",
    route: [
      "Complete a JRCNMT-accredited program (certificate, associate, or bachelor's)",
      "Pass the NMTCB or ARRT nuclear medicine exam",
      "Meet state licensing rules where required"
    ],
    exam: "NMTCB or ARRT(N) exam",
    accreditor: { name: "JRCNMT", url: "https://www.jrcnmt.org" },
    links: [
      { label: "NMTCB", url: "https://www.nmtcb.org" },
      { label: "SNMMI (professional society)", url: "https://www.snmmi.org" }
    ],
    bls: BLS + "healthcare/nuclear-medicine-technologists.htm",
    bioGrad: true,
    tags: ["some-patients", "tech", "steady", "hospital"],
    video: ""
  },

  /* ---------------- REHAB & THERAPY ---------------- */
  {
    id: "pt",
    name: "Physical Therapist (Physiotherapist)",
    cat: "rehab",
    credential: "DPT, PT",
    tagline: "Helps people recover movement after injury, surgery, stroke, or chronic pain.",
    day: "You evaluate strength, balance, and function, design exercise and manual therapy plans, and coach patients through recovery. Settings range from outpatient sports clinics to ICUs, schools, and home health.",
    years: 7,
    yearsLabel: "About 7 years (bachelor's + 3-year doctorate)",
    degree: "Doctorate (DPT)",
    route: [
      "Any bachelor's (biology, kinesiology, and exercise science are common) with PT prerequisites",
      "Log observation hours and take the GRE if your programs require it",
      "Apply through PTCAS to a CAPTE-accredited DPT program (about 3 years)",
      "Pass the NPTE and get your state license",
      "Optional: residency and board specialization (orthopedics, sports, neuro, pediatrics)"
    ],
    exam: "NPTE (FSBPT)",
    accreditor: { name: "CAPTE", url: "https://www.capteonline.org" },
    links: [
      { label: "PTCAS (application)", url: "https://www.ptcas.org" },
      { label: "APTA (professional society)", url: "https://www.apta.org" },
      { label: "FSBPT (NPTE exam)", url: "https://www.fsbpt.org" }
    ],
    bls: BLS + "healthcare/physical-therapists.htm",
    bioGrad: true,
    tags: ["patients", "movement", "steady", "community"],
    video: ""
  },
  {
    id: "pta",
    name: "Physical Therapist Assistant",
    cat: "rehab",
    credential: "PTA",
    tagline: "Carries out the PT's treatment plan hands-on with patients, after two years of school.",
    day: "You guide exercises, apply treatments, track progress, and report to the supervising physical therapist. Very active, very people-facing work.",
    years: 2,
    yearsLabel: "2 years (associate)",
    degree: "Associate",
    route: [
      "Complete a CAPTE-accredited PTA associate program",
      "Pass the NPTE-PTA exam",
      "Get your state license or certification"
    ],
    exam: "NPTE for PTAs (FSBPT)",
    accreditor: { name: "CAPTE", url: "https://www.capteonline.org" },
    links: [
      { label: "APTA (professional society)", url: "https://www.apta.org" }
    ],
    bls: BLS + "healthcare/physical-therapist-assistants-and-aides.htm",
    tags: ["patients", "movement", "steady", "community"],
    video: ""
  },
  {
    id: "ot",
    name: "Occupational Therapist",
    cat: "rehab",
    credential: "OTR/L",
    tagline: "Helps people get back to daily life: dressing, working, cooking, learning, driving.",
    day: "You assess what a person needs to do and what is stopping them, then adapt the task, the environment, or the person's skills. Common settings are hospitals, rehab centers, schools, mental health, and hand therapy.",
    years: 6,
    yearsLabel: "6–7 years (bachelor's + master's or OTD)",
    degree: "Master's or Doctorate (OTD)",
    route: [
      "Any bachelor's with OT prerequisites (anatomy, physiology, psychology, statistics)",
      "Log observation hours",
      "Apply through OTCAS to an ACOTE-accredited master's or entry-level OTD program",
      "Complete Level II fieldwork",
      "Pass the NBCOT exam and get your state license"
    ],
    exam: "NBCOT OTR exam",
    accreditor: { name: "ACOTE", url: "https://acoteonline.org" },
    links: [
      { label: "OTCAS (application)", url: "https://otcas.liaisoncas.com" },
      { label: "AOTA (professional society)", url: "https://www.aota.org" },
      { label: "NBCOT (exam)", url: "https://www.nbcot.org" }
    ],
    bls: BLS + "healthcare/occupational-therapists.htm",
    bioGrad: true,
    tags: ["patients", "talk", "steady", "community"],
    video: ""
  },
  {
    id: "ota",
    name: "Occupational Therapy Assistant",
    cat: "rehab",
    credential: "COTA/L",
    tagline: "Works under an OT to help patients practice everyday skills, after two years of school.",
    day: "You lead therapy sessions from the OT's plan, teach adaptive techniques, and document progress. Common in skilled nursing, schools, and outpatient clinics.",
    years: 2,
    yearsLabel: "2 years (associate)",
    degree: "Associate",
    route: [
      "Complete an ACOTE-accredited OTA program",
      "Pass the NBCOT COTA exam",
      "Get your state license"
    ],
    exam: "NBCOT COTA exam",
    accreditor: { name: "ACOTE", url: "https://acoteonline.org" },
    links: [
      { label: "AOTA (professional society)", url: "https://www.aota.org" }
    ],
    bls: BLS + "healthcare/occupational-therapy-assistants-and-aides.htm",
    tags: ["patients", "talk", "steady", "community"],
    video: ""
  },
  {
    id: "audiologist",
    name: "Audiologist",
    cat: "rehab",
    credential: "AuD, CCC-A",
    tagline: "Diagnoses and treats hearing loss and balance problems, from newborns to older adults.",
    day: "You test hearing and balance with specialized equipment, fit and program hearing aids, support cochlear implant patients, and counsel families about hearing loss. Settings include clinics, hospitals, schools, and private practices.",
    years: 8,
    yearsLabel: "About 8 years (bachelor's plus a 4-year Doctor of Audiology)",
    degree: "Doctorate (AuD)",
    route: [
      "Earn a bachelor's in any field; communication sciences and disorders is common, and science courses help",
      "Complete a 4-year Doctor of Audiology (AuD) program accredited by the CAA (ASHA) or ACAEA, including a clinical externship",
      "Pass the Praxis Examination in Audiology",
      "Get a state license (required in every state); ASHA's CCC-A is optional but widely recognized"
    ],
    exam: "Praxis Examination in Audiology",
    accreditor: { name: "CAA (ASHA)", url: "https://caa.asha.org" },
    links: [
      { label: "American Academy of Audiology", url: "https://www.audiology.org" },
      { label: "CSDCAS (application)", url: "https://csdcas.liaisoncas.com" }
    ],
    bls: BLS + "healthcare/audiologists.htm",
    tags: ["patients", "tech", "steady", "community"],
    careerVideo: "B7Jm90Zen20",
    video: ""
  },
  {
    id: "slp",
    name: "Speech-Language Pathologist",
    cat: "rehab",
    credential: "CCC-SLP",
    tagline: "Treats speech, language, voice, and swallowing problems in children and adults.",
    day: "In schools you work on language and articulation; in hospitals you evaluate swallowing after stroke and help patients communicate again. Heavy on assessment, planning, and conversation.",
    years: 6,
    yearsLabel: "6 years (bachelor's + 2-year master's) plus a clinical fellowship",
    degree: "Master's",
    route: [
      "Bachelor's in communication sciences and disorders, or another major plus leveling courses",
      "Apply through CSDCAS to a CAA-accredited master's program",
      "Pass the Praxis SLP exam",
      "Complete a paid clinical fellowship (about 9 months full-time)",
      "Earn ASHA's CCC-SLP and your state license"
    ],
    exam: "Praxis SLP exam",
    accreditor: { name: "CAA (ASHA)", url: "https://caa.asha.org" },
    links: [
      { label: "CSDCAS (application)", url: "https://csdcas.liaisoncas.com" },
      { label: "ASHA (professional society)", url: "https://www.asha.org" }
    ],
    bls: BLS + "healthcare/speech-language-pathologists.htm",
    bioGrad: true,
    tags: ["patients", "talk", "steady", "community"],
    video: ""
  },
  {
    id: "rt",
    name: "Respiratory Therapist",
    cat: "rehab",
    credential: "RRT",
    tagline: "Manages breathing: ventilators, airways, and lung treatments, often in critical care.",
    day: "You run mechanical ventilators, respond to code blues, give breathing treatments, and test lung function. Fast-paced ICU and ER work with a two-year entry point.",
    years: 2,
    yearsLabel: "2–4 years (associate minimum; bachelor's increasingly preferred)",
    degree: "Associate or Bachelor's",
    route: [
      "Complete a CoARC-accredited respiratory care program",
      "Pass the NBRC TMC exam (CRT) and the clinical simulation exam (RRT)",
      "Get your state license"
    ],
    exam: "NBRC TMC + Clinical Simulation",
    accreditor: { name: "CoARC", url: "https://coarc.com" },
    links: [
      { label: "NBRC (exams)", url: "https://www.nbrc.org" },
      { label: "AARC (professional society)", url: "https://www.aarc.org" }
    ],
    bls: BLS + "healthcare/respiratory-therapists.htm",
    tags: ["patients", "tech", "fast", "hospital"],
    video: ""
  },
  {
    id: "at",
    name: "Athletic Trainer",
    cat: "rehab",
    credential: "ATC",
    tagline: "Prevents, evaluates, and treats injuries for athletes, performers, and workers.",
    day: "You're on the sideline or in the training room: taping, emergency care, concussion checks, and rehab. Also growing in military, industrial, and performing-arts settings.",
    years: 6,
    yearsLabel: "6 years (bachelor's + professional master's)",
    degree: "Master's",
    route: [
      "Any bachelor's with prerequisites (biology, anatomy, exercise physiology)",
      "Apply through ATCAS to a CAATE-accredited master's program",
      "Pass the BOC exam",
      "Meet state licensure or registration rules"
    ],
    exam: "BOC exam",
    accreditor: { name: "CAATE", url: "https://caate.net" },
    links: [
      { label: "BOC (exam)", url: "https://bocatc.org" },
      { label: "NATA (professional society)", url: "https://www.nata.org" }
    ],
    bls: BLS + "healthcare/athletic-trainers.htm",
    bioGrad: true,
    tags: ["patients", "movement", "fast", "community"],
    video: ""
  },

  /* ---------------- CLINICAL & PRE-PROFESSIONAL ---------------- */
  {
    id: "pa",
    name: "Physician Assistant / Associate",
    cat: "clinical",
    credential: "PA-C",
    tagline: "Diagnoses, treats, and prescribes as part of a physician-led team, in any specialty.",
    day: "You take histories, examine patients, order and interpret tests, and write treatment plans. PAs can move between specialties (ER, surgery, dermatology, primary care) without formal retraining.",
    years: 6,
    yearsLabel: "About 6–7 years (bachelor's + 27-month master's)",
    degree: "Master's",
    route: [
      "Bachelor's with prerequisites (biology, chemistry, anatomy, microbiology)",
      "Build direct patient-care hours (often 1,000+ as a CNA, EMT, scribe, or MA)",
      "Apply through CASPA to an ARC-PA-accredited program",
      "Pass the PANCE",
      "Get your state license"
    ],
    exam: "PANCE (NCCPA)",
    accreditor: { name: "ARC-PA", url: "https://www.arc-pa.org" },
    links: [
      { label: "CASPA (application)", url: "https://caspa.liaisoncas.com" },
      { label: "AAPA (professional society)", url: "https://www.aapa.org" },
      { label: "NCCPA (exam)", url: "https://www.nccpa.net" }
    ],
    bls: BLS + "healthcare/physician-assistants.htm",
    bioGrad: true,
    tags: ["patients", "talk", "fast", "hospital"],
    video: ""
  },
  {
    id: "rn",
    name: "Registered Nurse",
    cat: "clinical",
    credential: "RN, BSN",
    tagline: "The largest healthcare profession, with dozens of specialties and advanced practice options.",
    day: "You assess patients, give medications, coordinate care, educate families, and catch problems early. Paths lead to ICU, OR, pediatrics, informatics, education, and nurse practitioner roles.",
    years: 4,
    yearsLabel: "2–4 years (ADN or BSN); 12–18 months accelerated after a biology degree",
    degree: "Associate or Bachelor's",
    route: [
      "Complete an ADN or BSN program approved by your state board of nursing",
      "Already have a bachelor's? Look at accelerated BSN (ABSN) programs",
      "Pass the NCLEX-RN",
      "Optional later: MSN or DNP for nurse practitioner, CRNA, or leadership roles"
    ],
    exam: "NCLEX-RN (NCSBN)",
    accreditor: { name: "CCNE / ACEN", url: "https://www.aacnnursing.org" },
    links: [
      { label: "NursingCAS (application)", url: "https://www.nursingcas.org" },
      { label: "NCSBN (NCLEX)", url: "https://www.ncsbn.org" },
      { label: "ACEN", url: "https://www.acenursing.org" }
    ],
    bls: BLS + "healthcare/registered-nurses.htm",
    bioGrad: true,
    tags: ["patients", "talk", "fast", "hospital"],
    video: ""
  },
  {
    id: "pharmacist",
    name: "Pharmacist",
    cat: "clinical",
    credential: "PharmD, RPh",
    tagline: "The medication expert: dosing, interactions, and safe use of drugs.",
    day: "Retail pharmacists counsel patients and fill prescriptions; hospital and clinical pharmacists round with care teams, adjust doses, and manage antibiotic and oncology therapy. Industry roles exist too.",
    years: 8,
    yearsLabel: "6–8 years (2–4 years prerequisites + 4-year PharmD)",
    degree: "Doctorate (PharmD)",
    route: [
      "Complete pre-pharmacy prerequisites (chemistry, organic chemistry, biology, calculus)",
      "Apply through PharmCAS to an ACPE-accredited PharmD program",
      "Pass the NAPLEX and your state's law exam (MPJE in most states)",
      "Optional: PGY1/PGY2 residency for clinical roles"
    ],
    exam: "NAPLEX + MPJE",
    accreditor: { name: "ACPE", url: "https://www.acpe-accredit.org" },
    links: [
      { label: "PharmCAS (application)", url: "https://www.pharmcas.org" },
      { label: "AACP", url: "https://www.aacp.org" }
    ],
    bls: BLS + "healthcare/pharmacists.htm",
    bioGrad: true,
    tags: ["some-patients", "data", "steady", "community"],
    video: ""
  },
  {
    id: "dentist",
    name: "Dentist",
    cat: "clinical",
    credential: "DDS / DMD",
    tagline: "Diagnoses and treats the teeth, gums, and mouth; many own their own practice.",
    day: "You examine patients, fill cavities, perform root canals and extractions, and plan restorations. Fine motor skill matters as much as science. Specialties include orthodontics and oral surgery.",
    years: 8,
    yearsLabel: "8 years (bachelor's + 4-year dental school)",
    degree: "Doctorate (DDS/DMD)",
    route: [
      "Bachelor's with pre-dental prerequisites",
      "Take the DAT",
      "Apply through ADEA AADSAS to a CODA-accredited dental school",
      "Pass the INBDE and a clinical licensure exam",
      "Optional: residency for a specialty"
    ],
    exam: "DAT (admission), INBDE (licensure)",
    accreditor: { name: "CODA", url: "https://coda.ada.org" },
    links: [
      { label: "ADEA GoDental (application info)", url: "https://www.adea.org/godental" },
      { label: "ADA (professional society)", url: "https://www.ada.org" }
    ],
    bls: BLS + "healthcare/dentists.htm",
    bioGrad: true,
    tags: ["patients", "movement", "steady", "community"],
    video: ""
  },
  {
    id: "physician",
    name: "Physician (MD or DO)",
    cat: "clinical",
    credential: "MD, DO",
    tagline: "The longest route, and the widest scope of diagnosis and treatment.",
    day: "Depends entirely on specialty: a family doctor, surgeon, pathologist, and psychiatrist have very different days. All share responsibility for final medical decisions.",
    years: 11,
    yearsLabel: "11–15 years (bachelor's + 4 years medical school + 3–7 years residency)",
    degree: "Doctorate (MD/DO) + residency",
    route: [
      "Bachelor's with pre-med prerequisites; any major works",
      "Take the MCAT; build clinical, research, and service experience",
      "Apply through AMCAS (MD) or AACOMAS (DO)",
      "Pass USMLE (MD) or COMLEX (DO) exams",
      "Match into a residency, then get your state license and board certification"
    ],
    exam: "MCAT, then USMLE or COMLEX",
    accreditor: { name: "LCME (MD) / COCA (DO)", url: "https://lcme.org" },
    links: [
      { label: "AAMC (MD applicants)", url: "https://www.aamc.org" },
      { label: "AACOM (DO applicants)", url: "https://www.aacom.org" }
    ],
    bls: BLS + "healthcare/physicians-and-surgeons.htm",
    bioGrad: true,
    tags: ["patients", "talk", "fast", "hospital"],
    video: ""
  },
  {
    id: "gc",
    name: "Genetic Counselor",
    cat: "clinical",
    credential: "CGC",
    tagline: "Explains genetic test results and inherited risk to patients and families.",
    day: "You take family histories, choose and interpret genetic tests, and help people make decisions about cancer risk, pregnancy, and rare disease. Part scientist, part counselor; telehealth and lab-based roles are common.",
    years: 6,
    yearsLabel: "6 years (bachelor's + 2-year master's)",
    degree: "Master's",
    route: [
      "Bachelor's in biology, genetics, or psychology with genetics coursework",
      "Get advocacy or counseling experience (crisis lines, disability support)",
      "Apply to an ACGC-accredited program through the Genetic Counseling Admissions Match",
      "Pass the ABGC certification exam"
    ],
    exam: "ABGC certification exam",
    accreditor: { name: "ACGC", url: "https://www.gceducation.org" },
    links: [
      { label: "NSGC (professional society)", url: "https://www.nsgc.org" },
      { label: "ABGC (exam)", url: "https://www.abgc.net" }
    ],
    bls: BLS + "healthcare/genetic-counselors.htm",
    bioGrad: true,
    tags: ["some-patients", "talk", "steady", "hospital"],
    video: ""
  },
  {
    id: "mph",
    name: "Public Health Professional",
    cat: "clinical",
    credential: "MPH, CPH",
    tagline: "Protects whole populations: disease tracking, prevention programs, and health policy.",
    day: "Roles include epidemiologist, infection preventionist, health educator, program manager, and policy analyst, at health departments, hospitals, nonprofits, and the CDC.",
    years: 6,
    yearsLabel: "4–6 years (bachelor's; MPH adds 1–2 years)",
    degree: "Bachelor's or Master's (MPH)",
    route: [
      "Bachelor's in public health, biology, or a related field",
      "Apply through SOPHAS to a CEPH-accredited MPH program",
      "Optional: CPH exam; CIC for infection prevention after hospital experience"
    ],
    exam: "CPH (optional)",
    accreditor: { name: "CEPH", url: "https://ceph.org" },
    links: [
      { label: "SOPHAS (application)", url: "https://sophas.org" },
      { label: "APHA (professional society)", url: "https://www.apha.org" }
    ],
    bls: BLS + "life-physical-and-social-science/epidemiologists.htm",
    bioGrad: true,
    tags: ["behind", "data", "steady", "industry"],
    video: ""
  },
  {
    id: "healthadmin",
    name: "Healthcare Administrator",
    cat: "clinical",
    credential: "MHA, FACHE",
    tagline: "Runs the business side of care: departments, clinics, budgets, staffing, and quality.",
    day: "You plan budgets, hire and lead staff, track quality and patient-safety measures, keep the organization compliant with regulations, and work with physicians and nurses to improve how care is delivered. Titles include practice manager, department director, and hospital administrator.",
    years: 6,
    yearsLabel: "4–6 years (bachelor's; an MHA or similar master's adds about 2 years)",
    degree: "Bachelor's or Master's (MHA)",
    route: [
      "Earn a bachelor's in any field; health administration, public health, business, and clinical degrees are common starting points",
      "Gain experience in a healthcare setting, such as a coordinator, supervisor, or clinical role",
      "Complete a master's in health administration (MHA), public health, or business; CAHME accredits MHA programs",
      "Optional: board certification in healthcare management (FACHE) through ACHE. Nursing home administrators need a state license."
    ],
    exam: "None required (FACHE optional; state license for nursing home administrators)",
    accreditor: { name: "CAHME", url: "https://cahme.org" },
    links: [
      { label: "ACHE (professional society)", url: "https://www.ache.org" },
      { label: "AUPHA (health administration programs)", url: "https://www.aupha.org" }
    ],
    bls: BLS + "management/medical-and-health-services-managers.htm",
    tags: ["behind", "data", "fast", "hospital"],
    video: ""
  },
  {
    id: "dietitian",
    name: "Registered Dietitian Nutritionist",
    cat: "clinical",
    credential: "RDN",
    tagline: "Uses nutrition to treat disease, from ICU tube feeding to diabetes and sports.",
    day: "You assess nutrition status, calculate needs, plan medical nutrition therapy, and counsel patients. Settings include hospitals, dialysis centers, schools, public health, and private practice.",
    years: 6,
    yearsLabel: "6 years (master's has been required to sit for the exam since 2024)",
    degree: "Master's",
    route: [
      "Complete ACEND-accredited coursework and a graduate degree",
      "Complete supervised practice (at least 1,000 hours), often built into the program",
      "Pass the CDR registration exam",
      "Meet state licensure rules"
    ],
    exam: "CDR Registration Exam",
    accreditor: { name: "ACEND", url: "https://www.eatrightpro.org/acend" },
    links: [
      { label: "Academy of Nutrition and Dietetics", url: "https://www.eatrightpro.org" },
      { label: "CDR (exam)", url: "https://www.cdrnet.org" }
    ],
    bls: BLS + "healthcare/dietitians-and-nutritionists.htm",
    bioGrad: true,
    tags: ["patients", "talk", "steady", "community"],
    video: ""
  },

  /* ---------------- RESEARCH & INDUSTRY ---------------- */
  {
    id: "researchtech",
    name: "Research Technician / Associate",
    cat: "research",
    credential: "No license required",
    tagline: "The fastest job for a new biology graduate: running experiments in academic or biotech labs.",
    day: "You run PCR, cell culture, Western blots, and animal or sequencing work, keep lab notebooks, and maintain equipment. Many people use this job to test research before grad or professional school.",
    years: 4,
    yearsLabel: "4 years (bachelor's)",
    degree: "Bachelor's",
    route: [
      "Bachelor's in biology, biochemistry, or a related science",
      "Get undergraduate research experience if you can",
      "Apply to university labs, hospitals, and biotech companies",
      "Optional: AALAS certification for animal research roles"
    ],
    exam: "None required",
    accreditor: null,
    links: [
      { label: "AALAS (lab animal certifications)", url: "https://www.aalas.org" }
    ],
    bls: BLS + "life-physical-and-social-science/biological-technicians.htm",
    bioGrad: true,
    tags: ["behind", "lab", "steady", "industry"],
    video: ""
  },
  {
    id: "crc",
    name: "Clinical Research Coordinator",
    cat: "research",
    credential: "CCRC · CCRP",
    tagline: "Runs the day-to-day of clinical trials that test new drugs and devices.",
    day: "You screen and consent participants, schedule study visits, collect data, and keep the trial compliant with the protocol and FDA rules. A common next step toward CRA, project manager, or regulatory roles.",
    years: 4,
    yearsLabel: "4 years (bachelor's)",
    degree: "Bachelor's",
    route: [
      "Bachelor's in biology, health science, or a related field",
      "Start as a research assistant or coordinator at a hospital or trial site",
      "After qualifying experience, earn ACRP (CCRC) or SOCRA (CCRP) certification"
    ],
    exam: "ACRP CCRC or SOCRA CCRP (optional)",
    accreditor: null,
    links: [
      { label: "ACRP", url: "https://acrpnet.org" },
      { label: "SOCRA", url: "https://www.socra.org" }
    ],
    bls: BLS + "life-physical-and-social-science/medical-scientists.htm",
    bioGrad: true,
    tags: ["some-patients", "data", "steady", "hospital"],
    video: ""
  },
  {
    id: "regulatory",
    name: "Regulatory Affairs Specialist",
    cat: "research",
    credential: "RAC",
    tagline: "Gets drugs, devices, and diagnostics approved and keeps them compliant.",
    day: "You prepare FDA submissions, interpret regulations, review labeling, and advise product teams. Detail-oriented writing work, mostly in industry.",
    years: 4,
    yearsLabel: "4–6 years (bachelor's; a regulatory master's or certificate helps)",
    degree: "Bachelor's or Master's",
    route: [
      "Bachelor's in a life science",
      "Entry through quality, clinical research, or lab roles",
      "Optional: regulatory affairs master's or graduate certificate",
      "Optional: RAPS RAC credential"
    ],
    exam: "RAC (optional)",
    accreditor: null,
    links: [
      { label: "RAPS", url: "https://www.raps.org" }
    ],
    bls: BLS + "business-and-financial/compliance-officers.htm",
    bioGrad: true,
    tags: ["behind", "data", "steady", "industry"],
    video: ""
  },
  {
    id: "bioinformatics",
    name: "Bioinformatics Scientist",
    cat: "research",
    credential: "No license required",
    tagline: "Writes code to make sense of DNA sequencing and other large biological datasets.",
    day: "You build pipelines in Python or R, analyze genomic and clinical data, and work with lab scientists to answer questions. A strong fit if you like biology and computers equally.",
    years: 6,
    yearsLabel: "4–6+ years (bachelor's; master's or PhD common)",
    degree: "Bachelor's, Master's, or PhD",
    route: [
      "Bachelor's in biology, computer science, or bioinformatics",
      "Learn Python or R, statistics, and Linux command line",
      "Master's or PhD for scientist-level roles"
    ],
    exam: "None required",
    accreditor: null,
    links: [
      { label: "ISCB (professional society)", url: "https://www.iscb.org" }
    ],
    bls: BLS + "life-physical-and-social-science/biochemists-and-biophysicists.htm",
    bioGrad: true,
    tags: ["behind", "data", "steady", "industry"],
    video: ""
  },
  {
    id: "medscientist",
    name: "Biomedical Research Scientist",
    cat: "research",
    credential: "PhD, MD-PhD",
    tagline: "Leads research into disease mechanisms and new treatments.",
    day: "You design studies, write grants or run industry programs, supervise lab staff, and publish results. Graduate school is usually funded with a stipend in the US.",
    years: 10,
    yearsLabel: "About 9–10 years (bachelor's + 5–6 year PhD), often plus a postdoc",
    degree: "Doctorate (PhD)",
    route: [
      "Bachelor's with significant research experience",
      "Apply to a PhD program (usually tuition-covered with a stipend)",
      "Optional: postdoctoral training",
      "MD-PhD programs combine both degrees"
    ],
    exam: "None required",
    accreditor: null,
    links: [
      { label: "AAMC MD-PhD information", url: "https://www.aamc.org" }
    ],
    bls: BLS + "life-physical-and-social-science/medical-scientists.htm",
    bioGrad: true,
    tags: ["behind", "lab", "steady", "industry"],
    video: ""
  }
];

window.CATEGORIES = {
  lab: { label: "Lab & Diagnostics", blurb: "Testing, imaging, and the science behind diagnosis." },
  rehab: { label: "Rehab & Therapy", blurb: "Restoring movement, breathing, speech, and daily function." },
  clinical: { label: "Clinical & Pre-professional", blurb: "Direct care, prescribing, population health, and health system leadership." },
  research: { label: "Research & Industry", blurb: "Labs, trials, data, and the path to new treatments." }
};
