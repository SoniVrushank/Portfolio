# Portfolio — what changed & how to extend it

An award-style, motion-rich revision with your real Power BI dashboards built in.

## Structure
```
index.html   projects.html   styles.css   main.js   robots.txt   sitemap.xml
assets/og-image.png   assets/thumbs/*.png        (dashboard preview images)
dashboards/*.html                                 (your interactive dashboard mockups)
blog/index.html   blog/seo-keywords-basics.html   blog/meta-ads-vs-google-ads.html
```
Deploy: replace your repo (`SoniVrushank/Portfolio`) contents with this folder, commit, push — Netlify redeploys.

## New in this pass
- **Real dashboards integrated.** Your five `mockup_desktop.html` dashboards ship in `dashboards/`,
  and their preview images in `assets/thumbs/`. Every project card shows the real dashboard and
  **opens the live interactive preview** in a new tab (home slider + projects page).
- **Motion & polish (award-style, but professional):**
  - Smooth scroll (Lenis) with smooth in-page anchor jumps.
  - Animated **aurora** backdrop (subtle, respects reduced-motion).
  - **Scroll progress bar**, staggered scroll-reveals, hero entrance timeline, hero-panel parallax.
  - **Magnetic** primary buttons and a subtle **custom cursor** (desktop pointers only).
- Everything degrades gracefully: if a CDN is blocked or motion is reduced, content stays fully visible
  and readable — no blank sections.

## Wiring in the rest — no layout changes needed
- **GitHub / Case Study buttons** (projects page): set the `href` and remove `aria-disabled="true"`.
- **Resume button** (hero): drop your PDF at `assets/Vrushank-Soni-Resume.pdf`.
- **Certificates** (home): in each `.cert-frame`, replace `<span class="cert-badge">Add certificate</span>`
  with `<img class="cert-img" src="assets/certs/sql.png" alt="SQL certificate">` (create `assets/certs/`).
  Slots included: SQL, Python, Google Analytics, Digital Marketing, Experience — Zero Dimensions, Experience — Provectus.
- **Brand logos**: put an `<img>` inside `.brand-logo` in place of the initials.
- **Swap a dashboard preview image**: replace `assets/thumbs/<id>.png`. Update a live dashboard: replace `dashboards/<id>.html`.

## Notes
- Dashboard files are your own `mockup_desktop.html` exports (fixed 1280×720 — they open as a desktop preview).
- Project KPIs and code figures come straight from your Power BI project files.
- Brand roles/services are inferred; durations default to `2024` (`VPAG` is generic). Edit any that are off.
- Spider fully removed. Fonts: Sora + Plus Jakarta Sans + JetBrains Mono. Phone removed from contact (WhatsApp kept).
