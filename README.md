# Healthcare Tracks

A free, interactive website that helps students, graduates, and career changers in the US, from any major (biology, chemistry, public health, health science, psychology, social work, pre-med, physics, and more), compare 49 healthcare careers: medical laboratory science, cytotechnology, histotechnology, imaging, physical and occupational therapy, speech pathology, audiology, respiratory therapy, PA, nursing, pharmacy, dentistry, medicine, genetic counseling, public health, healthcare administration, dietetics, nurse practitioners, dental hygiene, radiation therapy and dosimetry, optometry, podiatry, quick-start roles such as phlebotomy, EMT, and LPN, and research/industry roles.

Companion site for the **Smart Simplicity System** video series.

**Live site:** https://healthcaretracks.com/ (also at https://career-website.saimacyto.workers.dev/)

## What's on the site

- **Map**: every career plotted by years of school after high school
- **Explore**: searchable, filterable cards with a "years of school I'm ready for" slider. Each card opens a full detail page (credential, degree, exam, route in, accreditor, professional society, BLS pay link, video slot)
- **Shortlist and compare**: tap ♡ on any career to save it, then compare two or three side by side (time, degree, exam, patient contact, pace, setting, accreditor). The shortlist is saved in the visitor's browser.
- **Start from your degree**: pick your major (science, health science, public health, psychology/social work, pre-med, physics/engineering, or any other bachelor's) to see careers that fit that background, plus faster routes such as post-bacc MLS, accelerated BSN, and imaging certificates. Edit the `DEGREES` list in `js/app.js` to change these.
- **Quiz**: five questions, one at a time, that suggest three careers to research, with a fit score
- **What you'll get**: six benefit cards and a three-step "how it works" strip near the top
- **About Saima**: founder photo, bio, credentials, and the story behind Healthcare Tracks
- **Quick search** (top bar, or press `/`): type a career, an alternate name (phlebotomy, med tech, cytology), or a topic. Topic words return a hand-picked list: "lab" shows only clinical lab careers (MLS, MLT, cytotech, histotech, phlebotomist, lab manager). Topics, their words, and alternate names live in `TOPICS` and `ALIASES` in `js/app.js`; the same search powers the Explore and Salary search boxes.
- **Salary ranges**: every career links to the BLS Pay tab (national salary range) and a state-by-state salary lookup, in a searchable Salary section, on each career page, and in the compare table. Add an optional `pay` figure to a career in `js/careers.js` to show its median next to the links.
- **Choosing a program**: four tabs: a program finder (where programs are, how to apply, licensing, a tip, and the accreditor's directory for each career), a 15-point checklist for evaluating programs (saved in the browser and printable), features of programs that are easier to get into, and state and cost help (in-state tuition, regional tuition exchanges, licensing boards, loan repayment). Each career page also has a "How to apply" box. Edit `js/programs.js` to change this content.
- **Blog**: SEO-friendly articles at `/blog/`, each on its own page with search-engine metadata, related career links, and an author box. The newest three also appear on the homepage.
- **How to choose**: four questions to ask before applying to any program
- **Resources**: centralized application services, accreditors, and outlook data
- Light and dark mode toggle, mobile menu, and shareable links for every career

No frameworks, no build step. Plain HTML, CSS, and JavaScript.

```
index.html        page structure
favicon.svg       browser tab icon
blog-src/         blog articles, written in Markdown (edit these)
blog/             generated article pages (don't edit by hand)
scripts/          build-blog.py turns blog-src into blog pages
docs/             YouTube walkthrough plan (not published)
sitemap.xml       list of pages for Google (generated)
robots.txt        tells search engines where the sitemap is
404.html          page shown for broken links
img/              Saima's photo (saima-ahmad.webp/.jpg) and hero avatar
css/styles.css    all styling (light and dark mode, animations)
js/careers.js     career content: edit this to add or change careers
js/programs.js    how-to-apply data and the Choosing a program section
js/app.js         site behavior, plus SITE settings at the top
wrangler.jsonc    Cloudflare deploy settings
.assetsignore     files Cloudflare should not publish
.nojekyll         tells GitHub Pages to serve files as-is
```

## Publish on GitHub Pages

The site files sit at the root of this repository, which is what GitHub Pages needs. (Pages can't serve a website from a `.zip` file.)

1. In this repository, go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose branch `main` and folder `/ (root)`, then click **Save**.
3. After a minute or two the site is live at https://saimacyto.github.io/Career-website-/. Every change pushed to `main` republishes automatically.

## Deploy on Cloudflare

This repo is ready for Cloudflare Workers (static assets). `wrangler.jsonc` tells Cloudflare to serve the files in the repo root, and `.assetsignore` keeps the README, config, and `.git` folder from being published.

1. In the Cloudflare dashboard, go to **Workers & Pages → Create → Import a repository** and pick `saimacyto/Career-website-`.
2. Leave **Build command** empty. **Deploy command**: `npx wrangler deploy`. **Root directory**: `/`.
3. Make sure the Worker name in Cloudflare matches `"name"` in `wrangler.jsonc` (currently `career-website`). If Cloudflare shows a different name, change one so they match.
4. Deploy. The site appears at https://healthcaretracks.com (and https://career-website.saimacyto.workers.dev), and every push to `main` redeploys it.

### Custom domain

`wrangler.jsonc` connects `healthcaretracks.com` and `www.healthcaretracks.com` to the Worker through `routes` with `custom_domain: true`. Cloudflare creates the DNS records and SSL certificate automatically on deploy. This only works because the domain is in the same Cloudflare account. If a deploy fails saying a DNS record already exists for the hostname, delete that A/AAAA/CNAME record under **DNS → Records** for `healthcaretracks.com` and redeploy.

If you use the older **Pages** flow instead: framework preset **None**, build command empty, **Build output directory** `/`.

## Preview on your computer

Open `index.html` in a browser, or run this in the repository folder and visit http://localhost:8000:

```bash
python3 -m http.server 8000
```

## Settings to fill in

At the top of `js/app.js`:

```js
const SITE = {
  channelUrl: "",   // e.g. "https://www.youtube.com/@yourchannel"
  baseUrl: ""
};
```

- `channelUrl` shows the **Watch on YouTube** button. It's hidden until you fill it in.
- `baseUrl` can stay empty: "Link to this career" then uses whatever address the visitor opened (your Cloudflare URL, GitHub Pages, or a custom domain). Set it only if you want every shared link to point at one specific address.

## Link an episode to a career

In `js/careers.js`, find the career and paste the video URL:

```js
id: "mls",
...
video: "https://www.youtube.com/watch?v=XXXXXXXX"
```

The career page then shows a **Play video** button instead of "coming soon".

Every career has its own shareable link for video descriptions:

| Career | Link |
|---|---|
| Medical Laboratory Scientist | https://healthcaretracks.com/#career-mls |
| Physical Therapist | https://healthcaretracks.com/#career-pt |
| Occupational Therapist | https://healthcaretracks.com/#career-ot |
| Physician Assistant | https://healthcaretracks.com/#career-pa |
| Cytotechnologist | https://healthcaretracks.com/#career-cytotech |

The pattern is always `#career-<id>`, using the `id` in `careers.js`.

## Write a new blog article

1. Copy any file in `blog-src/`, for example `blog-src/pa-vs-pt-vs-ot.md`, and rename it. The file name becomes the web address, so use lowercase words with dashes: `blog-src/how-to-get-into-pa-school.md` becomes `healthcaretracks.com/blog/how-to-get-into-pa-school`.
2. Edit the top section (title, description, date, tag, careers) and write the article below it. Use `## ` for section headings, `- ` for bullet points, `**bold**`, and `[link text](/#career-pa)` for links.
3. Run `python3 scripts/build-blog.py`. It creates the article page, updates the blog home page, the homepage cards, and `sitemap.xml`.
4. Commit and push. Cloudflare publishes it within a minute.

Tips for search: put the question people type into Google in the title ("How to become a…", "What can you do with a…"), keep the description under about 160 characters, and link to related career pages.

After the first publish, add the site in [Google Search Console](https://search.google.com/search-console) and submit `https://healthcaretracks.com/sitemap.xml` so Google finds new articles quickly.

## Add an official career video

CareerOneStop (U.S. Department of Labor) publishes short career videos on YouTube. To show one on a career page:

1. Copy the video's embed code, for example `<iframe ... src="https://www.youtube.com/embed/B7Jm90Zen20" ...>`.
2. The video ID is the part after `/embed/`: `B7Jm90Zen20`.
3. In `js/careers.js`, add `careerVideo: "B7Jm90Zen20",` to that career.

The career page shows a thumbnail, and the video loads only when someone presses play (privacy-enhanced YouTube).

## Add a career

Copy any object in `js/careers.js`, give it a new unique `id`, and fill in the fields. Add a short label for the map in the `SHORT` list near the top of `js/app.js`. The comment block at the top of `careers.js` explains every field, including the quiz `tags`.

## Keeping content accurate

Requirements, exams, and program formats change. Before each video, check the accreditor and certification board linked on that career's page. Salary figures are deliberately not copied into the site; each career links to its Bureau of Labor Statistics page, which updates yearly. Content last reviewed September 2026.
