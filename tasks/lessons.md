# Lessons — vietopiabistro.com

Living rules doc. Read before every change. Update whenever a new rule comes up.

## Non-negotiables

### Content rules
- **No "Draper" anywhere.** Old site SEO-stuffed a Draper location that doesn't exist. Grep before every commit.
- **No review-incentive language.** Old site offered "20% off for a 5-star Google review" — this violates Google's review policy. Never reintroduce.
- **No Iowa WhatsApp number** or any non-Utah contact. Credibility leak from the old site.
- **Two locations only:** Taylorsville (5308 South Redwood Road) and West Jordan (1407 West 9000 South). Food truck near J. Willard Marriott Library at the U.

### Voice rules
- No emojis. Anywhere.
- No bold for emphasis in body copy. Bold is reserved for genuine headings (and even there, the type scale should do the work).
- Relaxed, conversational, confident. Not corporate.
- No AI tells. Banned words and phrases:
  - delve, tapestry, navigate the landscape, robust, leverage
  - in today's fast-paced, comprehensive solution, seamless, unlock
  - "elevate your experience", "at the heart of", "a testament to"
- Short paragraphs. Two to three sentences max in most cases.
- Concrete details over vague claims. Write "12-hour broth with charred ginger and star anise" not "authentic broth made with care".
- Headlines can be playful, never corny.

### Source-of-truth NAP

**Taylorsville**
- 5308 South Redwood Road, Taylorsville, UT 84123
- 801-542-0780
- Mon–Sun 10:00 AM – 9:00 PM

**West Jordan**
- 1407 West 9000 South, West Jordan, UT 84088
- 801-255-5364
- Mon–Sun 10:00 AM – 9:00 PM

**Food truck**
- Near J. Willard Marriott Library, University of Utah
- Schedule on Instagram (no phone)

**Social**
- Facebook: https://www.facebook.com/117893928228608
- Instagram: https://www.instagram.com/Vietopiabistro

### Technical rules
- Static HTML/CSS/JS only. No framework. No build step.
- Hand-written CSS at `assets/css/styles.css`. No Tailwind CDN.
- Vanilla JS at `assets/js/main.js`. No dependencies.
- Mobile-first. Test at 375 / 768 / 1024 / 1440.
- Lighthouse targets: 95+ perf, 100 a11y, 100 best practices, 100 SEO on mobile.
- Fonts via Google Fonts with `font-display: swap`: Playfair Display + Cormorant Garamond.
- Every image: `loading="lazy"`, explicit `width`/`height`, descriptive `alt`.
- Every interactive element: keyboard-navigable, visible focus state, WCAG AA contrast.
- One H1 per page. Logical heading hierarchy below it.
- Schema JSON-LD inline in `<head>` on every page.

### Design tokens
- Cream: `#FAF7F2`
- Ink: `#1A1A1A`
- Accent (burnt orange): `#C8542C`
- Accent dark (for hover/active and link contrast): `#A0421F`
- Muted: `#6B6B6B`
- Hairline: `#E8E3D8`

### Tagline
"Vietnamese, the way it's meant to be."

### Online ordering integration
- **Pickup:** Toast Tab, one URL per location.
- **Delivery:** DoorDash and Grubhub, both with one URL per location. Customer picks.
- **UX pattern:** single "Order Online" button on every page opens a modal picker. Three channels (Toast pickup, DoorDash delivery, Grubhub delivery) × two locations = six cards on general pages, three cards on location pages.
- **Per-location pages:** `taylorsville.html` and `west-jordan.html` have `data-location="..."` on `<body>` so the modal only shows that location's three options.
- **Where the URLs live:** `assets/js/main.js`, top of file, in the `ORDER_URLS` object. All six URLs live there — single source of truth.
- HTML `href` fallback on every Order Online anchor points at the Toast Taylorsville URL (used only when JS fails to load — graceful degradation to pickup).
- We do NOT use a branded `order.vietopiabistro.com` subdomain anymore. All ordering jumps to Toast, DoorDash, or Grubhub directly.
- Toast pages are currently still slugged/branded "Miyazaki" (legacy). Andrew is fixing this in Toast admin under Site Settings.

## Corrections log

(Add entries here whenever a correction comes up during the build.)
