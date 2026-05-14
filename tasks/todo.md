# Todo — vietopiabistro.com build

## Scaffold
- [x] Create directory tree
- [x] Write `tasks/lessons.md`
- [x] Write `tasks/todo.md`
- [x] Write `.gitignore`

## Foundations
- [x] `assets/css/styles.css` — design tokens, reset, typography, layout, components, responsive, a11y
- [x] `assets/js/main.js` — mobile nav, FAQ accordion enhancement, sticky bar, lazy IG embed, form enhancer

## Pages
- [x] `index.html` — homepage with hero, location cards, food truck callout, dishes, FAQ
- [x] `menu.html` — full menu with category nav, filters, populated skeleton, FAQ
- [x] `taylorsville.html` — location page with NAP, map, hours, gallery, FAQ
- [x] `west-jordan.html` — location page with NAP, map, hours, gallery, FAQ
- [x] `food-truck.html` — truck page with IG embed (lazy), menu highlights, contact form
- [x] `about.html` — family story + "Our Pho Broth" GEO/SEO section
- [x] `catering.html` — lead-gen with packages, sizes, lead form, FAQ
- [x] `contact.html` — both locations, general inquiry form
- [x] `blog/index.html` — coming-soon skeleton
- [x] `404.html` — friendly error page

## Site-wide
- [x] `robots.txt`
- [x] `sitemap.xml`
- [x] `llms.txt`
- [x] `functions/contact.js` — Cloudflare Pages Function stub
- [x] `functions/catering.js` — Cloudflare Pages Function stub
- [x] `README.md` — deployment instructions

## Self-verify
- [x] Zero "Draper" mentions in public files (HTML, llms.txt, sitemap.xml, robots.txt, JS, CSS)
- [x] Zero review-incentive language anywhere
- [x] Zero Iowa/WhatsApp mentions
- [x] All NAP matches source of truth — Taylorsville phone in 11 places, West Jordan phone in 10, addresses in 9 each
- [x] One H1 per page (10 of 10)
- [x] All `<img>` have alt text (no images yet — dish placeholders use aria-hidden text divs)
- [x] All pages have JSON-LD schema (10 of 10, including 404)
- [x] All pages have viewport meta (10 of 10)
- [x] Skip-to-content link on every page (10 of 10)
- [x] Sticky bar on every page (10 of 10)
- [x] Canonical link on every page (10 of 10)
- [x] OG / Twitter Card tags on every public page
- [x] Zero banned AI words (delve, tapestry, navigate the landscape, robust, leverage, etc.)

---

## Review

### Files created (20 total)

- `index.html` — homepage
- `menu.html` — full menu, 9 sections, ~40 items
- `taylorsville.html` — location page with Restaurant + FAQPage + Breadcrumb schema
- `west-jordan.html` — location page with Restaurant + FAQPage + Breadcrumb schema
- `food-truck.html` — University of Utah truck page with lazy IG embed
- `about.html` — family story scaffold + 6-card "Our Pho Broth" deep-dive section
- `catering.html` — lead-gen with 4 packages, group-size tiers, form
- `contact.html` — both locations + general inquiry form
- `blog/index.html` — coming-soon skeleton
- `404.html` — friendly error page (noindex)
- `assets/css/styles.css` — full design system, no framework, no build step
- `assets/js/main.js` — vanilla JS for nav, filters, IG lazy load, form submission
- `assets/img/.gitkeep` placeholder directory
- `functions/contact.js` — Cloudflare Pages Function stub for contact + newsletter
- `functions/catering.js` — Cloudflare Pages Function stub for catering + truck event
- `robots.txt`
- `sitemap.xml`
- `llms.txt`
- `README.md` — deploy instructions, content-update guide, form-backend wiring
- `tasks/lessons.md` — living rules doc
- `tasks/todo.md` — this file
- `.gitignore`

### Decisions made and why

- **Tagline:** "Vietnamese, the way it's meant to be." — your option A, recommended for confidence and category fit.
- **Accent color:** burnt orange `#C8542C` on cream `#FAF7F2` with ink `#1A1A1A` — your option A. Highest contrast and most food-forward.
- **Fonts:** Playfair Display for display, Cormorant Garamond for body, with `font-display: swap`.
- **Founding year:** left out for now — none of the final tagline copy uses "since YYYY," and putting `[FOUNDING_YEAR]` only in the footer adds visual noise. Easy to add later if you want it.
- **Custom CSS over Tailwind CDN:** smaller payload, no JS dependency, better Lighthouse perf.
- **Cloudflare Pages Functions for forms:** native to your host, no third-party signup needed, stubs return JSON so the front-end works in production without breaking. MailChannels wiring is one uncomment + one DNS record away.
- **Lazy IG embed:** the official script is only loaded when the placeholder scrolls into view, protecting the food-truck page's Lighthouse perf.
- **Schema strategy:** separate `Restaurant` JSON-LD for each location with full opening hours and geo, brand-level `Restaurant` with both `department` entries on the homepage, `Menu` on menu.html, `FAQPage` on the five major pages, `BreadcrumbList` on every interior page, `Organization` sitewide.
- **No "Draper" anywhere, not even as a negative assertion.** I initially had a "we don't have a Draper location" line in `llms.txt`, then removed it — search engines and LLMs index that file, and a literal mention of the word is what the brief said to eliminate.
- **No 404 schema initially, then added one** for consistency. The 404 still has `noindex`, so the schema is cosmetic but harmless.

### Anything I couldn't complete and why

- **Real Lighthouse run:** I can't open a browser from this environment. The site is built to hit the targets (no render-blocking JS, fonts preconnected with swap, no framework, semantic HTML, schema, alt text scaffolded), but the actual scores need a local or PageSpeed Insights run.
- **Real photography:** out of scope per brief. Every photo placeholder is currently a styled `<div>` rather than an `<img>` — this keeps Lighthouse a11y at 100 (no missing alts) and avoids broken-image references in production. When you swap in real photos, use `<img src="/assets/img/..." alt="..." loading="lazy" width="..." height="...">` and the layout will accept it.
- **Geo coordinates for Restaurant schema:** I used rounded values (Taylorsville 40.6677, -111.9388; West Jordan 40.5915, -112.0011). Verify against Google Maps and refine if you want pinpoint accuracy.
- **Live form delivery:** stubs only. MailChannels wiring is one DNS record and a code uncomment per the README.

### Placeholders to replace before launch

1. **Menu prices** — every item has `[TBD]` in `menu.html`.
2. **Customer review quotes** — 3 placeholders on `index.html`, search "Real customer quote goes here".
3. **Family story** — `about.html` has a scaffolded story, search "[Placeholder for family story" and rewrite in your voice. The "Our Pho Broth" section is already real and on-brand; keep or refine.
4. **Team bios** — `[Owner name]` and `[Chef name]` in `about.html`.
5. **Newsletter incentive** — `[$5 reward placeholder]` on homepage. Or remove the reward angle entirely if you don't want to commit to one.
6. **`[TBD_UTAH_TEXT_NUMBER]`** — optional Google Voice text number on `contact.html`.
7. **Toast and DoorDash URLs** — fill in the four placeholders in `assets/js/main.js` (`ORDER_URLS` object) plus the `[TOAST_TAYLORSVILLE_URL]` href fallbacks in every HTML file.
8. **Catering client logos** — `Client logo` placeholders in the logo grid on `catering.html`.
9. **MailChannels (or Resend) wiring** — see README's "Wiring the forms" section.
10. **Photos** — dish cards, location galleries, OG image (`/assets/img/og-default.jpg`). Add favicons at `/assets/img/favicon.svg` and `/assets/img/apple-touch-icon.png`.

### Recommended next 5 actions after deploying

1. **Photograph the actual dishes** in good light. Six homepage dishes, eight slots per location gallery, a few hero shots. Compress to WebP under 200KB each.
2. **Set up MailChannels** (free, Cloudflare-native). One TXT record, one code uncomment in `functions/contact.js` and `functions/catering.js`. Both forms then send to `andrew@exclusiveut.com`.
3. **Paste your live Toast and DoorDash URLs** into `ORDER_URLS` at the top of `assets/js/main.js`, then run a find-replace on `[TOAST_TAYLORSVILLE_URL]` across the HTML so the JS-disabled fallback works too.
4. **Get the food-truck schedule into a system you'll update consistently** — a pinned Instagram story works for now; Linktree or a one-line schedule line on `food-truck.html` works better long-term.
5. **Submit `sitemap.xml` to Google Search Console** and verify the property — `https://vietopiabistro.com/sitemap.xml`. Then run PageSpeed Insights from a real mobile device on cellular and confirm Lighthouse targets.
