# Portfolio — what changed & how to extend it

Premium minimal revision: blue/green palette (no red), galaxy backdrop, VS logo, real certificates.

## Structure
```
index.html  projects.html  styles.css  main.js  robots.txt  sitemap.xml
assets/  logo.svg  favicon.svg  og-image.png  Vrushank-Soni-Resume.pdf
         thumbs/*.png (dashboard previews)   certs/*.jpg (certificates)
dashboards/*.html   (interactive dashboard previews)
blog/  index.html  seo-keywords-basics.html  meta-ads-vs-google-ads.html
```
Deploy: replace your repo contents with this folder, commit, push — Netlify redeploys.

## This pass
- **No red.** New palette is blue + green (accents include cyan & violet in skills). Deep-navy dark mode,
  and a proper **cool light mode** colour scheme.
- **Galaxy backdrop** — a minimal starfield + soft nebula, subtle, reduced-motion safe (hidden in light mode).
- **VS logo** — a curvy blue→green monogram, used as the site favicon (browser/preview icon) and nav brand.
- **Skills highlights** — each sector highlights its core skill in a unique colour
  (Power BI · green, Google Ads · blue, React · cyan, Data Visualization · violet), plus a Development sector.
- **Real certificates** built in — MySQL, Python, Google Analytics, Digital Marketing (StuIntern),
  and experience letters (Zero Dimensions, Provectus). Each card opens the full certificate.
  The two competition wins (Srijan 2025, SKIPS Chaupal 2026) link to their certificates too.
- **Resume** wired in — the hero Resume button opens `assets/Vrushank-Soni-Resume.pdf`.
- **Faster / no loading gaps** — removed the GSAP + Lenis CDNs; animation is now lightweight, dependency-free
  vanilla JS (IntersectionObserver reveals + counters). Nothing external to stall on.
- **Contact** — email updated to vrushank.soni@outlook.com; phone stays removed; WhatsApp kept.

## Swap things later (no layout change)
- **Certificate image**: replace `assets/certs/<name>.jpg`.
- **Dashboard preview / live**: replace `assets/thumbs/<id>.png` or `dashboards/<id>.html`.
- **GitHub / Case Study** (projects page): set the button `href`, remove `aria-disabled="true"`.
- **Brand logos**: put an `<img>` inside `.brand-logo` in place of the initials.


## Latest tweaks
- **Softer, lighter palette** — accents toned down (less "pop"), calmer nebula, plus a subtle **background grid** element for depth. More minimal.
- **Skills** — the "Development" sector is now an **AI** sector (ChatGPT, Claude, AI-Assisted Analysis, Prompt Engineering, Workflow Automation).
- **Blog** — tiles are now **terminal-style**, and three real first-person stories were added:
  *How I Learned SQL, From Zero*, *How I Learned Python, From Zero*, and *From BBA to Power BI*.
  Edit them at `blog/how-i-learned-sql.html`, `blog/how-i-learned-python.html`, `blog/marketer-to-data.html`.
