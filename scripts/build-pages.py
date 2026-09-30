#!/usr/bin/env python3
"""Build the site's HTML pages from site-src/.

  site-src/layout.html      shared <head>, header, footer, and scripts
  site-src/pages/*.html     one file per page; starts with a <!-- ... --> block of
                            title / og_title / description / path / page / nav
  site-src/parts/*.html     reusable sections, included with {{> name}}

Writes index.html, careers.html, quiz.html, programs.html, salary.html at the repo
root. Run:  python3 scripts/build-pages.py   (build-blog.py runs it too).
"""
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "site-src")
NAV = ["careers", "quiz", "programs", "salary"]


def read(*p):
    return open(os.path.join(SRC, *p), encoding="utf-8").read()


def build():
    layout = read("layout.html")
    overlays = read("parts", "overlays.html")
    built = []
    for name in sorted(os.listdir(os.path.join(SRC, "pages"))):
        if not name.endswith(".html"):
            continue
        raw = read("pages", name)
        m = re.match(r"\s*<!--(.*?)-->\n?(.*)$", raw, re.S)
        if not m:
            raise SystemExit(f"{name}: missing <!-- meta --> block")
        meta = {}
        for line in m.group(1).strip().splitlines():
            k, v = line.split(":", 1)
            meta[k.strip()] = v.strip()
        body = re.sub(r"\{\{>\s*([\w-]+)\s*\}\}", lambda mm: read("parts", mm.group(1) + ".html").rstrip("\n"), m.group(2))
        page = layout
        values = {
            "title": meta["title"], "og_title": meta.get("og_title", meta["title"]),
            "description": meta["description"], "path": meta["path"], "page": meta["page"],
            "body": body.rstrip("\n"), "overlays": overlays.rstrip("\n"),
        }
        for n in NAV:
            values["nav_" + n] = ' class="active" aria-current="page"' if meta.get("nav") == n else ""
        for k, v in values.items():
            page = page.replace("{{" + k + "}}", v)
        if "{{" in page:
            raise SystemExit(f"{name}: unfilled placeholder {re.search(r'{{[^}]*}}', page).group(0)}")
        open(os.path.join(ROOT, name), "w", encoding="utf-8").write(page)
        built.append(name)
    print("built pages:", ", ".join(built))


if __name__ == "__main__":
    build()
