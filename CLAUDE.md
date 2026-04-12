# CLAUDE.md — Freezer Meal Recipe Blog

## Project Overview

A recipe blog focused on **slow cooker freezer meals** — the DIY alternative to services like Beehive Meals. Each recipe page is built for two audiences simultaneously:

1. **The owner (N8)** — recipes structured with JSON-LD schema so Samsung Food can import via URL, auto-generating shopping lists that push to Walmart/Instacart for checkout.
2. **Organic search traffic** — SEO-optimized recipe content targeting long-tail freezer meal keywords, with monetization potential via Instacart affiliate (IDP), display ads (Mediavine at scale), and eventually a shoppable "Shop this recipe" CTA.

**Owner:** Nathaniel Lindquist (N8) — NL Consulting
**Stack:** Static site on Netlify, Cloudflare DNS, Claude Code for content generation and deployment
**Domain:** cafeimmy.com
**Brand Name:** Immy's Cafe

---

## Tech Stack

| Layer | Tool | Notes |
|-------|------|-------|
| Hosting | Netlify (free tier) | Git-based deploys, same stack as n8lindquist.com |
| DNS | Cloudflare | Free tier, handles SSL + caching |
| Framework | Static HTML/CSS/JS | No framework needed — speed is the priority. Consider 11ty (Eleventy) if recipe count exceeds ~30 and templating becomes painful |
| Content | Markdown → HTML | Recipes authored as .md files, compiled to HTML with JSON-LD schema injected |
| Search | Google (organic) | Recipe rich results via structured data |
| Import | Samsung Food URL import | JSON-LD Recipe schema is the same spec Samsung Food's scraper reads |
| Monetization | Instacart IDP affiliate (pending approval), display ads (future) |

---

## Brand Identity

### Name
**Immy's Cafe** — named for Imogen. The brand is personal by design: a home cook sharing the freezer meal system that replaced takeout and meal delivery services. `cafeimmy.com` is the domain.

### Aesthetic Direction
**Warm, organic, kitchen-table feel.** Not clinical meal-prep content. Not overly styled food blog. The vibe is: a friend who figured out a really good system and is sharing it.

### Color Palette — Terracotta & Sage

```css
:root {
  /* Primary */
  --color-terracotta:       #C26B49;
  --color-terracotta-light: #D4896B;
  --color-terracotta-dark:  #A35636;

  /* Secondary */
  --color-sage:             #8FA87E;
  --color-sage-light:       #A8BF99;
  --color-sage-dark:        #6E8760;

  /* Neutrals */
  --color-cream:            #FAF6F1;
  --color-warm-white:       #FEFCF9;
  --color-warm-gray:        #6B6560;
  --color-charcoal:         #2C2825;

  /* Accents */
  --color-butter:           #E8D5A3;
  --color-clay:             #D4A574;

  /* Functional */
  --color-bg:               var(--color-cream);
  --color-text:             var(--color-charcoal);
  --color-text-secondary:   var(--color-warm-gray);
  --color-link:             var(--color-terracotta);
  --color-link-hover:       var(--color-terracotta-dark);
  --color-border:           #E5DDD5;
}
```

### Typography
- **Headings:** A warm serif — try `Lora`, `Libre Baskerville`, or `Playfair Display`. Pick one with character, not generic.
- **Body:** A clean readable sans — `Source Sans 3`, `Nunito`, or `DM Sans`. Warm, not clinical.
- **Recipe metadata (times, servings):** Monospace or small-caps accent treatment.
- Load via Google Fonts. Keep to 2 families max for performance.

### Logo
- PNG logo file should be placed at `/assets/images/logo.png`
- Also provide an SVG version at `/assets/images/logo.svg` if available
- **N8 must upload the logo file to the repo.** Placeholder until then.
- Use logo in the site header and as `og:image` fallback.

### Tone of Voice
- Direct, conversational, no fluff
- Write like you're texting a friend the recipe, not writing a food magazine article
- No 800-word preambles before the recipe (the thing every food blogger does that everyone hates)
- Recipe first, story second (if at all)
- Measurement-precise, technique-casual

---

## Site Structure

```
/
├── index.html                    # Homepage — latest recipes, category nav
├── /recipes/
│   ├── index.html                # All recipes grid
│   ├── salsa-verde-chicken.html  # Individual recipe page
│   ├── thai-coconut-curry-shrimp.html
│   └── ...
├── /categories/
│   ├── chicken.html              # Category filter pages
│   ├── beef.html
│   ├── pork.html
│   ├── seafood.html
│   ├── vegetarian.html
│   └── soups.html
├── /about.html                   # About page — the Beehive-replacement story
├── /assets/
│   ├── /css/
│   │   └── style.css             # Single stylesheet
│   ├── /js/
│   │   └── main.js               # Minimal JS — print, share, toggle
│   ├── /images/
│   │   ├── logo.png              # Brand logo (N8 to upload)
│   │   ├── logo.svg
│   │   └── /recipes/             # Recipe hero images
│   └── /fonts/                   # Self-hosted fonts if needed
├── robots.txt
├── sitemap.xml                   # Auto-generated or manually maintained
├── manifest.json                 # PWA manifest (optional, nice for mobile)
└── CLAUDE.md                     # This file
```

---

## Recipe Page Spec

Every recipe page must include:

### 1. HTML Structure
- `<h1>` = recipe name (include primary keyword)
- Hero image with descriptive `alt` text
- Quick-glance metadata bar: prep time, cook time, total time, servings, freezer-friendly badge
- **Ingredients list** — structured as `<ul>` with clear sections (Freezer Bag, Add Day-Of, Serving)
- **Instructions** — structured as `<ol>`, numbered steps
- **Notes section** — tips, substitutions, pressure cooker alternative
- **"Shop This Recipe" CTA** — links to Samsung Food import or Instacart (once IDP is live)
- Print-friendly button
- Category/tag links at bottom

### 2. JSON-LD Recipe Schema (Critical)
Every recipe page MUST include a `<script type="application/ld+json">` block with the full Recipe schema. This is what powers both Google rich results AND Samsung Food's URL import.

```json
{
  "@context": "https://schema.org",
  "@type": "Recipe",
  "name": "Salsa Verde Chicken",
  "author": {
    "@type": "Person",
    "name": "N8 Lindquist"
  },
  "description": "Dump-and-go slow cooker freezer meal...",
  "image": "https://cafeimmy.com/assets/images/recipes/salsa-verde-chicken.jpg",
  "prepTime": "PT10M",
  "cookTime": "PT6H",
  "totalTime": "PT6H10M",
  "recipeYield": "4 servings",
  "recipeCategory": "Dinner",
  "recipeCuisine": "Mexican",
  "keywords": "freezer meal, slow cooker, dump and go, meal prep, chicken",
  "recipeIngredient": [
    "2 lbs boneless skinless chicken thighs",
    "1 jar (16 oz) salsa verde",
    "1 can (15 oz) black beans, drained and rinsed",
    "1 cup frozen corn",
    "1/2 yellow onion, diced",
    "2 cloves garlic, minced",
    "1 tsp ground cumin",
    "1/2 tsp kosher salt",
    "1 lime, juiced",
    "1/4 cup fresh cilantro, chopped",
    "2 avocados, sliced",
    "cooked rice or warm tortillas, for serving"
  ],
  "recipeInstructions": [
    {
      "@type": "HowToStep",
      "text": "Add chicken thighs, salsa verde, black beans, corn, diced onion, garlic, cumin, and salt to a gallon freezer bag. Seal and freeze flat for up to 3 months."
    },
    {
      "@type": "HowToStep",
      "text": "To cook from frozen: place contents of bag into slow cooker. Cook on low for 6-7 hours or high for 3-4 hours."
    },
    {
      "@type": "HowToStep",
      "text": "To cook from thawed: thaw in refrigerator overnight. Cook on low for 4-5 hours or high for 2-3 hours."
    },
    {
      "@type": "HowToStep",
      "text": "Once cooked, shred chicken directly in the slow cooker using two forks. Stir to combine with sauce."
    },
    {
      "@type": "HowToStep",
      "text": "Squeeze fresh lime juice over the top and stir in chopped cilantro."
    },
    {
      "@type": "HowToStep",
      "text": "Serve over rice or in warm tortillas. Top with sliced avocado."
    }
  ],
  "nutrition": {
    "@type": "NutritionInformation",
    "calories": "",
    "proteinContent": "",
    "fatContent": "",
    "carbohydrateContent": ""
  }
}
```

**Important:** The `recipeIngredient` array is what Samsung Food parses to build the shopping list. Keep ingredient strings clean — quantity + unit + ingredient name. No instructions inside ingredient lines.

### 3. Open Graph / Social Meta
```html
<meta property="og:title" content="Salsa Verde Chicken — Slow Cooker Freezer Meal">
<meta property="og:description" content="Dump-and-go freezer meal. 10 min prep, 6 hours in the slow cooker. Feeds 4.">
<meta property="og:image" content="https://cafeimmy.com/assets/images/recipes/salsa-verde-chicken.jpg">
<meta property="og:url" content="https://cafeimmy.com/recipes/salsa-verde-chicken">
<meta property="og:type" content="article">
<meta name="twitter:card" content="summary_large_image">
```

---

## SEO Strategy

### Target Niche
"Slow cooker freezer meals" / "dump and go freezer meals" / "freezer meal prep"

This is a real niche with proven demand (Beehive Meals built a business on it) but lower competition than general recipe SEO. The target user is someone who wants the Beehive convenience but wants to DIY.

### Keyword Targets (per recipe)
Each recipe page targets a primary long-tail keyword. Examples:
- `salsa verde chicken freezer meal`
- `thai coconut curry shrimp slow cooker`
- `freezer meal prep for the week`
- `dump and go crockpot meals`
- `healthy freezer meals for two`

### On-Page SEO Checklist (every recipe page)
- [ ] Primary keyword in `<title>`, `<h1>`, meta description, and first 100 words
- [ ] JSON-LD Recipe schema (validated via Google Rich Results Test)
- [ ] Descriptive `alt` text on all images (include keyword naturally)
- [ ] Internal links to related recipes and category pages
- [ ] Clean URL slug: `/recipes/salsa-verde-chicken` (no dates, no IDs)
- [ ] Meta description under 155 characters, includes keyword + value prop
- [ ] Open Graph tags for social sharing
- [ ] Page loads in under 2 seconds (Lighthouse target: 90+ performance)

### Content Strategy
- Start with 10 recipes (the initial meal prep batch from our planning conversation)
- Publish 2-3 new recipes per week
- Each recipe should link to 2-3 related recipes (internal linking)
- Create category pages once 5+ recipes exist per category
- Future: "Weekly Meal Prep Plan" roundup posts that bundle 5 recipes + combined shopping list
- Future: "How to Start Freezer Meal Prepping" evergreen guide (link magnet)

### Technical SEO
- `robots.txt` allows all crawlers
- `sitemap.xml` kept current with all recipe URLs
- Canonical URLs on every page
- No duplicate content — each recipe is unique
- Fast: target sub-2s load, no heavy frameworks, optimized images (WebP with JPG fallback)
- Mobile-first responsive design

---

## Samsung Food Integration

### How URL Import Works
1. Samsung Food's scraper fetches the recipe URL
2. It parses the JSON-LD `Recipe` schema from the page
3. Ingredients populate as a structured shopping list
4. User taps "Add to Shopping List" → selects retailer (Walmart, Instacart, etc.) → checks out

### Requirements for Successful Import
- Valid JSON-LD Recipe schema (test with Google Rich Results Test)
- `recipeIngredient` array with clean, parseable ingredient strings
- Recipe page must be publicly accessible (no auth, no paywall)
- Page must load reasonably fast (Samsung Food's scraper has a timeout)
- HTTPS required

### Workflow
```
Claude (conversation) → generates recipe
Claude Code → creates .md recipe file → compiles to .html with JSON-LD
Git push → Netlify auto-deploys
N8 opens Samsung Food → "Save from URL" → pastes recipe URL
Samsung Food parses ingredients → Shopping List → Walmart/Instacart checkout
```

---

## Instacart IDP Integration (Future)

Application submitted, awaiting approval. Once approved:
- Each recipe page gets a "Shop with Instacart" button
- Button hits the IDP `/idp/v1/products/recipe` endpoint with the recipe's ingredients
- Returns a hosted Instacart page where user selects store, reviews items, checks out
- Affiliate tracking via Impact.com for commission on completed orders
- MCP server available for Claude Code integration: `https://mcp.instacart.com/mcp`

**Do not build this integration until the API key is in hand.** Placeholder the CTA button in the template.

---

## Development Workflow

### Adding a New Recipe
1. Create a new `.md` file in `/recipes/` with frontmatter (title, slug, category, times, servings, description, keywords)
2. Write ingredients and instructions in structured markdown
3. Build script compiles to HTML, injects JSON-LD schema, applies template
4. Git push → Netlify deploys
5. Validate schema at https://search.google.com/test/rich-results
6. Import URL into Samsung Food to verify parsing

### Build Commands
```bash
# TBD — depends on whether we use raw HTML or Eleventy
# If Eleventy:
npx @11ty/eleventy --serve    # local dev
npx @11ty/eleventy            # production build, output to _site/
```

### Deployment
- Push to `main` branch → Netlify auto-builds and deploys
- Custom domain configured in Netlify + Cloudflare DNS
- SSL via Cloudflare (Full Strict mode)

---

## File Naming Conventions

- Recipe files: `kebab-case.md` → compiles to `kebab-case.html`
- Recipe images: `/assets/images/recipes/[slug].jpg` (match the recipe slug exactly)
- All lowercase, hyphens only, no spaces or underscores

---

## Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 90+ |
| Lighthouse SEO | 95+ |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Total page weight | < 500KB |
| Image format | WebP primary, JPG fallback |
| CSS | Single file, < 20KB minified |
| JS | Minimal, < 10KB. No frameworks. |

---

## Content Guidelines

### Recipe Writing Format
```markdown
---
title: "Salsa Verde Chicken"
slug: "salsa-verde-chicken"
category: "chicken"
tags: ["gluten-free", "dairy-free", "dump-and-go"]
prepTime: "PT10M"
cookTime: "PT6H"
totalTime: "PT6H10M"
servings: 4
description: "Tangy salsa verde, tender shredded chicken, black beans, and corn. Dump it, forget it, eat it."
keywords: "salsa verde chicken freezer meal, slow cooker chicken"
image: "salsa-verde-chicken.jpg"
---

## In the Freezer Bag
- 2 lbs boneless skinless chicken thighs
- 1 jar (16 oz) salsa verde
- ...

## Add Day-Of
- Juice of 1 lime
- Fresh cilantro
- ...

## Instructions
1. Add chicken thighs, salsa verde...
2. To cook from frozen...
3. ...

## Serving Suggestions
Rice, tortillas, burrito bowls...

## Notes
- Pressure cooker alternative: 15 min high pressure from frozen...
- Freezer life: up to 3 months...
```

### Things to Avoid
- Long personal stories before the recipe (get to the point)
- Vague measurements ("a pinch of", "some", "to taste" — give actual amounts)
- AI-sounding language ("elevate", "mouthwatering", "delectable")
- Stock photography — real photos only, or no photo until we have one

---

## Monetization Roadmap

| Phase | Milestone | Revenue Source |
|-------|-----------|---------------|
| 1 | 10 recipes live, Samsung Food workflow validated | None (personal use) |
| 2 | 30+ recipes, organic traffic growing | Instacart affiliate (pending IDP approval) |
| 3 | 50k sessions/month | Apply for Mediavine/AdThrive display ads |
| 4 | Established authority | Sponsored recipe posts, brand partnerships |

---

## TODO

- [ ] Finalize domain name and register
- [ ] Upload logo PNG to `/assets/images/logo.png`
- [ ] Build base HTML template with terracotta/sage design system
- [ ] Create first recipe page (Salsa Verde Chicken) with full schema
- [ ] Validate JSON-LD via Google Rich Results Test
- [ ] Test Samsung Food URL import with live page
- [ ] Create second recipe page (Thai Coconut Curry Shrimp)
- [ ] Build homepage with recipe grid
- [ ] Set up Netlify deployment from Git repo
- [ ] Configure Cloudflare DNS for custom domain
- [ ] Submit sitemap to Google Search Console
- [ ] Follow up on Instacart IDP application status
