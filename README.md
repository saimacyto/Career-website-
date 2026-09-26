# Biology Career Compass

A free, interactive website that helps biology students and graduates in the US compare 27 health and science careers: medical laboratory science, cytotechnology, histotechnology, imaging, physical and occupational therapy, speech pathology, respiratory therapy, PA, nursing, pharmacy, dentistry, medicine, genetic counseling, public health, dietetics, and research/industry roles.

Companion site for the **Smart Simplicity System** video series.

**Live site:** https://saimacyto.github.io/Career-website-/

## What's on the site

- **Map**: every career plotted by years of school after high school
- **Explore**: searchable, filterable cards with a "years of school I'm ready for" slider. Each card opens a full detail page (credential, degree, exam, route in, accreditor, professional society, BLS pay link, video slot)
- **Shortlist and compare**: tap ♡ on any career to save it, then compare two or three side by side (time, degree, exam, patient contact, pace, setting, accreditor). The shortlist is saved in the visitor's browser.
- **Already have a biology degree?**: faster routes such as post-bacc MLS, accelerated BSN, and imaging certificates
- **Quiz**: five questions, one at a time, that suggest three careers to research, with a fit score
- **How to choose**: four questions to ask before applying to any program
- **Resources**: centralized application services, accreditors, and outlook data
- Light and dark mode toggle, mobile menu, and shareable links for every career

No frameworks, no build step. Plain HTML, CSS, and JavaScript.

```
index.html        page structure
favicon.svg       browser tab icon
css/styles.css    all styling (light and dark mode, animations)
js/careers.js     career content: edit this to add or change careers
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
4. Deploy. The site appears at `https://career-website.<your-subdomain>.workers.dev`, and every push to `main` redeploys it.

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
  baseUrl: "https://saimacyto.github.io/Career-website-/"
};
```

- `channelUrl` shows the **Watch on YouTube** button. It's hidden until you fill it in.
- `baseUrl` makes the "Link to this career" text show your real site address.

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
| Medical Laboratory Scientist | https://saimacyto.github.io/Career-website-/#career-mls |
| Physical Therapist | https://saimacyto.github.io/Career-website-/#career-pt |
| Occupational Therapist | https://saimacyto.github.io/Career-website-/#career-ot |
| Physician Assistant | https://saimacyto.github.io/Career-website-/#career-pa |
| Cytotechnologist | https://saimacyto.github.io/Career-website-/#career-cytotech |

The pattern is always `#career-<id>`, using the `id` in `careers.js`.

## Add a career

Copy any object in `js/careers.js`, give it a new unique `id`, and fill in the fields. Add a short label for the map in the `SHORT` list near the top of `js/app.js`. The comment block at the top of `careers.js` explains every field, including the quiz `tags`.

## Keeping content accurate

Requirements, exams, and program formats change. Before each video, check the accreditor and certification board linked on that career's page. Salary figures are deliberately not copied into the site; each career links to its Bureau of Labor Statistics page, which updates yearly. Content last reviewed September 2026.
