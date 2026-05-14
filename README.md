# vietopiabistro.com

Static site for Vietopia Bistro — two locations in Salt Lake County and a food truck at the U.

No build step. Pure HTML, CSS, and vanilla JavaScript. Deployed to Cloudflare Pages from GitHub.

---

## Project layout

```
.
├── index.html               # Homepage
├── menu.html                # Full menu
├── taylorsville.html        # Taylorsville location
├── west-jordan.html         # West Jordan location
├── food-truck.html          # University of Utah food truck
├── about.html               # Family story + pho broth detail
├── catering.html            # Catering lead-gen
├── contact.html             # Contact + general inquiries
├── blog/
│   └── index.html           # Blog landing (skeleton)
├── 404.html                 # Custom 404
├── robots.txt
├── sitemap.xml
├── llms.txt                 # AI-engine facts file
├── assets/
│   ├── css/styles.css       # All styling, no build step
│   ├── js/main.js           # Vanilla JS — nav, filters, IG embed, forms
│   └── img/                 # Photos go here
├── functions/
│   ├── contact.js           # POST /functions/contact (Cloudflare Pages Function)
│   └── catering.js          # POST /functions/catering
└── tasks/
    ├── lessons.md           # Living rules doc — read before editing
    └── todo.md              # Build checklist + review section
```

---

## Deploy to Cloudflare Pages

### One-time setup

1. **Create a GitHub repo and push this project.**
   ```bash
   cd ~/Desktop/vietopiabistro
   git init
   git add .
   git commit -m "Initial site scaffold"
   git branch -M main
   git remote add origin https://github.com/misterho1/vietopiabistro.git
   git push -u origin main
   ```
   (Create the empty `misterho1/vietopiabistro` repo on github.com first.)

2. **Connect to Cloudflare Pages.**
   1. Go to https://dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git.
   2. Choose the `misterho1/vietopiabistro` repo.
   3. Build settings:
      - **Framework preset:** None
      - **Build command:** (leave blank)
      - **Build output directory:** `/`
      - **Root directory:** `/`
   4. Click "Save and Deploy." First build takes about 60 seconds.

3. **Wire the custom domain.**
   1. In the Pages project, go to **Custom domains** → **Set up a custom domain** → enter `vietopiabistro.com` and add it.
   2. Repeat for `www.vietopiabistro.com`.
   3. Cloudflare will provide CNAME instructions. If the domain's DNS is already on Cloudflare, the records are added automatically.

4. **DNS records (if the domain is registered elsewhere).**
   Add these at your registrar:
   - `vietopiabistro.com` → CNAME → `<your-pages-project>.pages.dev` (most registrars allow CNAME on apex; if not, use Cloudflare nameservers)
   - `www.vietopiabistro.com` → CNAME → `<your-pages-project>.pages.dev`
   - Once propagated, Cloudflare will issue and renew the SSL certificate automatically.

### Ongoing deploys

Push to `main`. Cloudflare Pages picks up the commit, deploys in ~30 seconds. No build step.

---

## How to update content (common changes)

| You want to change… | Edit this file |
| --- | --- |
| Menu items, descriptions, or prices | `menu.html` |
| Taylorsville address, phone, hours | `taylorsville.html`, `index.html`, `contact.html`, sticky bar in every HTML file |
| West Jordan address, phone, hours | `west-jordan.html`, `index.html`, `contact.html`, sticky bar in every HTML file |
| Tagline or hero copy | `index.html` (search "Vietnamese, the way it's meant to be") |
| Catering packages or service area | `catering.html` |
| Family story / pho broth section | `about.html` |
| Food truck schedule blurb | `food-truck.html` |
| Site colors, typography, spacing | `assets/css/styles.css` — see `:root` section at the top |
| Sticky mobile bar links | every HTML file has its own `<nav class="sticky-bar">` block near the bottom |
| Toast / DoorDash ordering URLs | top of `assets/js/main.js` — `ORDER_URLS` object holds all four placeholders |
| Social links | search for `facebook.com/117893928228608` and `instagram.com/Vietopiabistro` |

### Photos

Drop images into `assets/img/`. Reference them as `/assets/img/your-file.jpg`. Every `<img>` needs a descriptive `alt` attribute (e.g. `alt="Pho Tai Chin with rare steak and brisket served at Vietopia Bistro Taylorsville"`) and explicit `width` and `height`. Format: WebP preferred, JPG fine; keep originals under 200KB after compression.

### Replacing placeholders

Search the codebase for these strings and replace before any major SEO push:

- `[TBD]` — menu prices
- `[TBD_UTAH_TEXT_NUMBER]` — optional Google Voice text number on contact page
- `Real customer quote goes here` — three placeholder reviews on homepage
- `Photo coming soon` — dish card placeholders
- `Client logo` — catering page logo grid
- `[$5 reward placeholder]` — newsletter incentive copy on homepage
- `[Owner name]` / `[Chef name]` — team bios on about.html
- `[Placeholder for family story` — main about.html copy

---

## Wiring the contact and catering forms

The two Pages Functions in `/functions/` accept the form submissions but currently return success without actually sending email. To enable email delivery:

### Easiest — MailChannels (free, no API key needed from Cloudflare-hosted workers)

1. Open `functions/contact.js` and `functions/catering.js`.
2. Uncomment the MailChannels block (search for `Option A`).
3. Add a TXT record to your DNS:
   ```
   _mailchannels.vietopiabistro.com  TXT  "v=mc1 cfid=<your-cloudflare-account-id>"
   ```
4. Push. Forms now send email to `andrew@exclusiveut.com` by default. Override with `INBOX_EMAIL` env var in Pages settings.

### Alternative — Resend

1. Sign up at https://resend.com, create an API key, verify `vietopiabistro.com` as a sending domain.
2. In Cloudflare Pages → Settings → Environment variables, add `RESEND_API_KEY`.
3. In the function files, uncomment the Resend block.
4. Push.

---

## Local preview

Any static server works. Two quick options:

```bash
# Python
cd ~/Desktop/vietopiabistro && python3 -m http.server 8000
# then open http://localhost:8000

# Node (npx, no install)
cd ~/Desktop/vietopiabistro && npx --yes serve .
```

Pages Functions only run on Cloudflare. To test them locally, use `wrangler pages dev .` after `npm install -g wrangler`.

---

## Notes

- `tasks/lessons.md` is the source of truth for content rules — read before changing copy.
- One H1 per page. Use the existing heading hierarchy.
- Every page already has JSON-LD schema in `<head>`. If you add a new page, copy the pattern from the closest existing page.
- Lighthouse target: 95+ Performance, 100 Accessibility, 100 Best Practices, 100 SEO on mobile. Heavy images are the most common regression — keep them small.
