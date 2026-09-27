#!/usr/bin/env python3
"""Build the Healthcare Tracks blog.

Reads every Markdown file in blog-src/, and writes:
  blog/<slug>.html     one page per article
  blog/index.html      the blog home page
  sitemap.xml          every page on the site, for search engines
and refreshes the "From the blog" cards on the homepage (index.html).

Usage:  python3 scripts/build-blog.py
No installs needed. Needs Node.js only to read career names from js/careers.js
(if Node is missing, related-career cards fall back to plain links).

Front matter at the top of each .md file:
  ---
  title: Article title
  description: One or two sentences for Google and link previews
  date: 2026-09-26
  tag: Degree guides
  careers: mls, pa, gc        (ids from js/careers.js, shown as related careers)
  order: 1                    (optional: among posts with the same date, lower shows first)
  ---
The file name (without .md) becomes the web address: /blog/<file-name>
"""
import html
import json
import os
import re
import subprocess
from datetime import date

SITE = "https://healthcaretracks.com"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "blog-src")
OUT = os.path.join(ROOT, "blog")
AUTHOR = "Saima Ahmad"
AUTHOR_BIO = ("Saima Ahmad, MPH, is a healthcare leader with more than 25 years of experience in clinical "
              "laboratory operations, anatomic pathology, quality improvement, and team development. "
              "She created Healthcare Tracks to help people from every background find their place in healthcare.")

esc = html.escape


# ---------------------------------------------------------------- markdown
def inline(text):
    text = esc(text, quote=False)
    text = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])", r"<em>\1</em>", text)

    def link(m):
        label, url = m.group(1), m.group(2)
        ext = url.startswith("http") and not url.startswith(SITE)
        extra = ' target="_blank" rel="noopener"' if ext else ""
        return f'<a href="{url}"{extra}>{label}</a>'
    return re.sub(r"\[([^\]]+)\]\(([^)\s]+)\)", link, text)


def slugify(text):
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


def markdown(md):
    """Small Markdown subset: ## / ### headings, paragraphs, - and 1. lists
    (one nested level), | tables |, > quotes, **bold**, *italic*, [links](url)."""
    lines = md.strip("\n").split("\n")
    out, toc, i = [], [], 0

    def is_block_start(l):
        return (l.startswith("#") or re.match(r"^\s*([-*]|\d+\.)\s", l) or l.startswith("|") or l.startswith(">"))

    while i < len(lines):
        line = lines[i]
        if not line.strip():
            i += 1
            continue
        m = re.match(r"^(#{2,3})\s+(.*)", line)
        if m:
            level, text = len(m.group(1)), m.group(2).strip()
            hid = slugify(text)
            if level == 2:
                toc.append((hid, text))
            out.append(f'<h{level} id="{hid}">{inline(text)}</h{level}>')
            i += 1
            continue
        if line.startswith("|"):
            rows = []
            while i < len(lines) and lines[i].startswith("|"):
                cells = [c.strip() for c in lines[i].strip().strip("|").split("|")]
                if not all(re.match(r"^:?-{2,}:?$", c) for c in cells if c):
                    rows.append(cells)
                i += 1
            head, body = rows[0], rows[1:]
            t = ['<div class="table-scroll"><table><thead><tr>']
            t += [f'<th scope="col">{inline(c)}</th>' for c in head]
            t.append("</tr></thead><tbody>")
            for r in body:
                t.append("<tr>" + "".join(
                    (f'<th scope="row">{inline(c)}</th>' if j == 0 else f"<td>{inline(c)}</td>") for j, c in enumerate(r)) + "</tr>")
            t.append("</tbody></table></div>")
            out.append("".join(t))
            continue
        if line.startswith(">"):
            q = []
            while i < len(lines) and lines[i].startswith(">"):
                q.append(lines[i].lstrip("> ").strip())
                i += 1
            out.append(f"<blockquote><p>{inline(' '.join(q))}</p></blockquote>")
            continue
        m = re.match(r"^([-*]|\d+\.)\s", line)
        if m:
            tag = "ol" if m.group(1)[0].isdigit() else "ul"
            items = []
            while i < len(lines):
                l = lines[i]
                top = re.match(r"^([-*]|\d+\.)\s+(.*)", l)
                sub = re.match(r"^\s{2,}([-*]|\d+\.)\s+(.*)", l)
                if top:
                    items.append([top.group(2), []])
                elif sub and items:
                    items[-1][1].append(sub.group(2))
                elif l.strip() and not is_block_start(l) and items and l.startswith(" "):
                    items[-1][0] += " " + l.strip()
                else:
                    break
                i += 1
            html_items = []
            for text, subs in items:
                inner = inline(text)
                if subs:
                    inner += "<ul>" + "".join(f"<li>{inline(s)}</li>" for s in subs) + "</ul>"
                html_items.append(f"<li>{inner}</li>")
            out.append(f"<{tag}>{''.join(html_items)}</{tag}>")
            continue
        para = []
        while i < len(lines) and lines[i].strip() and not is_block_start(lines[i]):
            para.append(lines[i].strip())
            i += 1
        out.append(f"<p>{inline(' '.join(para))}</p>")
    return "\n".join(out), toc


# ---------------------------------------------------------------- data
def read_posts():
    posts = []
    for name in sorted(os.listdir(SRC)):
        if not name.endswith(".md"):
            continue
        raw = open(os.path.join(SRC, name), encoding="utf-8").read()
        m = re.match(r"^---\n(.*?)\n---\n(.*)$", raw, re.S)
        if not m:
            raise SystemExit(f"{name}: missing --- front matter ---")
        meta = {}
        for l in m.group(1).split("\n"):
            if ":" in l:
                k, v = l.split(":", 1)
                meta[k.strip()] = v.strip().strip('"')
        body_html, toc = markdown(m.group(2))
        words = len(re.sub(r"<[^>]+>", " ", body_html).split())
        posts.append({
            "slug": name[:-3],
            "title": meta["title"],
            "description": meta["description"],
            "date": meta.get("date", date.today().isoformat()),
            "tag": meta.get("tag", "Guides"),
            "careers": [c.strip() for c in meta.get("careers", "").split(",") if c.strip()],
            "html": body_html,
            "toc": toc,
            "minutes": max(1, round(words / 220)),
            "order": int(meta.get("order", 99)),
        })
    posts.sort(key=lambda p: p["title"])
    posts.sort(key=lambda p: p["order"])
    posts.sort(key=lambda p: p["date"], reverse=True)
    return posts


def read_careers():
    script = ("global.window={};require('./js/careers.js');"
              "process.stdout.write(JSON.stringify(window.CAREERS.map(c=>({id:c.id,name:c.name,cat:c.cat,degree:c.degree,years:c.years,tagline:c.tagline}))))")
    try:
        res = subprocess.run(["node", "-e", script], cwd=ROOT, capture_output=True, text=True, check=True)
        return {c["id"]: c for c in json.loads(res.stdout)}
    except (OSError, subprocess.CalledProcessError):
        print("note: Node.js not found, related careers will be plain links")
        return {}


def nice_date(iso):
    y, m, d = (int(x) for x in iso.split("-"))
    return date(y, m, d).strftime("%B %-d, %Y")


# ---------------------------------------------------------------- templates
HEAD = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title>
<meta name="description" content="{description}">
<meta name="author" content="Saima Ahmad">
<meta name="theme-color" content="#3a3d8f">
<link rel="canonical" href="{url}">
<meta property="og:site_name" content="Healthcare Tracks">
<meta property="og:title" content="{og_title}">
<meta property="og:description" content="{description}">
<meta property="og:type" content="{og_type}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{site}/img/saima-ahmad.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=JetBrains+Mono:wght@500&family=Source+Sans+3:ital,wght@0,400;0,600;0,700;1,400&display=swap">
<link rel="stylesheet" href="/css/styles.css">
<link rel="stylesheet" href="/css/blog.css">
<script>
  document.documentElement.classList.add("js");
  try {{ var t = localStorage.getItem("bcc-theme"); if (t) document.documentElement.setAttribute("data-theme", t); }} catch (e) {{}}
</script>
<script type="application/ld+json">{jsonld}</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<div class="progress" id="progress" aria-hidden="true"></div>
<header class="topbar">
  <div class="wrap topbar-inner">
    <a class="brand" href="/" aria-label="Healthcare Tracks home">
      <span class="brand-mark" aria-hidden="true"></span>
      <span class="brand-text">Healthcare Tracks<small>by Smart Simplicity System</small></span>
    </a>
    <nav class="topnav" id="topnav" aria-label="Main">
      <a href="/#explore">Careers</a>
      <a href="/#degree">Your degree</a>
      <a href="/#quiz">Quiz</a>
      <a href="/blog/"{blog_active}>Blog</a>
      <a href="/#about">About</a>
    </nav>
    <div class="top-actions">
      <button type="button" class="icon-btn" id="theme-toggle" aria-label="Switch color theme" title="Switch light / dark">
        <svg class="i-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/></svg>
        <svg class="i-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>
      </button>
      <button type="button" class="icon-btn menu-btn" id="menu-btn" aria-label="Open menu" aria-expanded="false" aria-controls="topnav">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>
    </div>
  </div>
</header>
"""

FOOT = """
<footer class="footer">
  <div class="wrap">
    <p><strong>Healthcare Tracks</strong> · Created by Saima Ahmad · <a href="/">Home</a> · <a href="/blog/">Blog</a> · <a href="/#explore">All careers</a></p>
    <p class="fine">Requirements change. Always confirm current details with the accrediting body, certification board, and the programs you apply to. This site is educational and is not affiliated with any organization linked here.</p>
  </div>
</footer>
<script src="/js/blog.js"></script>
</body>
</html>
"""

AUTHOR_BOX = """<aside class="author-box">
  <img src="/img/saima-avatar.webp" alt="Saima Ahmad" width="80" height="80" loading="lazy">
  <div>
    <p class="eyebrow">About the author</p>
    <p class="author-name">Saima Ahmad, MPH</p>
    <p>{bio}</p>
    <a href="/#about">More about Saima →</a>
  </div>
</aside>"""


def post_card(p, heading="h2"):
    return f"""<article class="post-card">
  <a href="/blog/{p['slug']}">
    <span class="post-tag">{esc(p['tag'])}</span>
    <{heading} class="post-card-title">{esc(p['title'])}</{heading}>
    <span class="post-card-desc">{esc(p['description'])}</span>
    <span class="post-meta">{nice_date(p['date'])} · {p['minutes']} min read</span>
  </a>
</article>"""


def career_cards(ids, careers):
    cards = []
    for cid in ids:
        c = careers.get(cid)
        if c:
            yrs = "11+ yrs" if c["years"] >= 11 else f"{c['years']} yrs"
            cards.append(f"""<a class="degree-card" data-cat="{c['cat']}" href="/#career-{cid}">
  <strong>{esc(c['name'])}</strong>
  <span class="fine">{esc(c['degree'])} · {yrs}</span>
</a>""")
        else:
            cards.append(f'<a class="degree-card" href="/#career-{cid}"><strong>{esc(cid)}</strong></a>')
    return "\n".join(cards)


def build_post(p, posts, careers):
    url = f"{SITE}/blog/{p['slug']}"
    jsonld = json.dumps({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": p["title"],
        "description": p["description"],
        "datePublished": p["date"],
        "dateModified": p["date"],
        "mainEntityOfPage": url,
        "image": f"{SITE}/img/saima-ahmad.jpg",
        "author": {"@type": "Person", "name": AUTHOR, "url": f"{SITE}/#about"},
        "publisher": {"@type": "Organization", "name": "Healthcare Tracks", "url": SITE,
                      "logo": {"@type": "ImageObject", "url": f"{SITE}/favicon.svg"}},
    }, ensure_ascii=False)
    others = [o for o in posts if o["slug"] != p["slug"]][:3]
    toc = ""
    if len(p["toc"]) >= 3:
        toc = ('<nav class="toc" aria-label="In this article"><p class="eyebrow">In this article</p><ol>'
               + "".join(f'<li><a href="#{hid}">{inline(t)}</a></li>' for hid, t in p["toc"]) + "</ol></nav>")
    page = HEAD.format(
        title=esc(f"{p['title']} | Healthcare Tracks"), description=esc(p["description"]), url=url,
        og_title=esc(p["title"]), og_type="article", site=SITE, jsonld=jsonld, blog_active=' class="active"')
    page += f"""
<main id="main" class="wrap blog-main">
  <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> <span aria-hidden="true">/</span> <a href="/blog/">Blog</a></nav>
  <article class="post">
    <header class="post-head">
      <span class="post-tag">{esc(p['tag'])}</span>
      <h1>{esc(p['title'])}</h1>
      <p class="post-lede">{esc(p['description'])}</p>
      <div class="post-byline">
        <img src="/img/saima-avatar.webp" alt="" width="44" height="44">
        <span>By <a href="/#about">Saima Ahmad, MPH</a><br><time datetime="{p['date']}">{nice_date(p['date'])}</time> · {p['minutes']} min read</span>
      </div>
    </header>
    {toc}
    <div class="post-body">
{p['html']}
    </div>
    <section class="related">
      <h2>Careers mentioned in this article</h2>
      <p class="fine">Open any career for its full route, accredited programs, and exam.</p>
      <div class="degree-list">
{career_cards(p['careers'], careers)}
      </div>
    </section>
    <div class="cta-box">
      <div>
        <h2>Not sure which track fits you?</h2>
        <p>Answer five quick questions and get three careers worth researching.</p>
      </div>
      <a class="btn btn-primary" href="/#quiz">Take the quiz</a>
    </div>
    {AUTHOR_BOX.format(bio=esc(AUTHOR_BIO))}
  </article>
  <section class="more-posts">
    <h2>Keep reading</h2>
    <div class="post-grid">
{''.join(post_card(o, 'h3') for o in others)}
    </div>
  </section>
</main>
"""
    page += FOOT
    open(os.path.join(OUT, f"{p['slug']}.html"), "w", encoding="utf-8").write(page)


def build_index(posts):
    url = f"{SITE}/blog/"
    desc = ("Practical guides to healthcare careers for every major: degree options, career spotlights, "
            "comparisons, and the fastest routes into healthcare, by Saima Ahmad.")
    jsonld = json.dumps({
        "@context": "https://schema.org", "@type": "Blog", "name": "Healthcare Tracks Blog", "url": url,
        "description": desc, "author": {"@type": "Person", "name": AUTHOR},
        "blogPost": [{"@type": "BlogPosting", "headline": p["title"], "url": f"{SITE}/blog/{p['slug']}",
                      "datePublished": p["date"]} for p in posts],
    }, ensure_ascii=False)
    tags = sorted({p["tag"] for p in posts})
    page = HEAD.format(title="Healthcare Career Blog | Healthcare Tracks", description=esc(desc), url=url,
                       og_title="Healthcare Tracks Blog", og_type="website", site=SITE, jsonld=jsonld,
                       blog_active=' class="active"')
    page += f"""
<main id="main" class="wrap blog-main">
  <header class="blog-hero">
    <p class="eyebrow">The Healthcare Tracks blog</p>
    <h1>Guides for finding your place in healthcare</h1>
    <p class="lede">Plain-language articles on healthcare careers for every major: what the work is really like, how long the training takes, and how to get in.</p>
    <div class="post-byline">
      <img src="/img/saima-avatar.webp" alt="" width="44" height="44">
      <span>Written by <a href="/#about">Saima Ahmad, MPH</a><br>25+ years in healthcare and clinical laboratory leadership</span>
    </div>
  </header>
  <div class="chips blog-filters" role="group" aria-label="Filter articles by topic">
    <button type="button" class="chip" data-tag="all" aria-pressed="true">All articles</button>
    {''.join(f'<button type="button" class="chip" data-tag="{esc(t)}" aria-pressed="false">{esc(t)}</button>' for t in tags)}
  </div>
  <div class="post-grid" id="post-grid">
{''.join(post_card(p).replace('<article class="post-card">', f'<article class="post-card" data-tag="{esc(p["tag"])}">') for p in posts)}
  </div>
</main>
"""
    page += FOOT
    open(os.path.join(OUT, "index.html"), "w", encoding="utf-8").write(page)


def update_homepage(posts):
    path = os.path.join(ROOT, "index.html")
    s = open(path, encoding="utf-8").read()
    start, end = "<!--BLOG-LATEST-START-->", "<!--BLOG-LATEST-END-->"
    if start not in s:
        print("note: homepage has no BLOG-LATEST markers, skipped")
        return
    cards = "\n".join(post_card(p, "h3") for p in posts[:3])
    a, b = s.index(start) + len(start), s.index(end)
    s = s[:a] + "\n" + cards + "\n" + s[b:]
    open(path, "w", encoding="utf-8").write(s)


def build_sitemap(posts):
    today = date.today().isoformat()
    urls = [(f"{SITE}/", today, "1.0"), (f"{SITE}/blog/", posts[0]["date"] if posts else today, "0.8")]
    urls += [(f"{SITE}/blog/{p['slug']}", p["date"], "0.7") for p in posts]
    body = "".join(f"  <url><loc>{u}</loc><lastmod>{d}</lastmod><priority>{pr}</priority></url>\n" for u, d, pr in urls)
    open(os.path.join(ROOT, "sitemap.xml"), "w", encoding="utf-8").write(
        '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + body + "</urlset>\n")


def main():
    os.makedirs(OUT, exist_ok=True)
    posts = read_posts()
    careers = read_careers()
    for cid in {c for p in posts for c in p["careers"]}:
        if careers and cid not in careers:
            raise SystemExit(f"unknown career id '{cid}' in front matter (see js/careers.js)")
    # remove pages for deleted articles
    keep = {f"{p['slug']}.html" for p in posts} | {"index.html"}
    for f in os.listdir(OUT):
        if f.endswith(".html") and f not in keep:
            os.remove(os.path.join(OUT, f))
    for p in posts:
        build_post(p, posts, careers)
    build_index(posts)
    update_homepage(posts)
    build_sitemap(posts)
    print(f"built {len(posts)} articles, blog index, homepage cards, and sitemap.xml")


if __name__ == "__main__":
    main()
