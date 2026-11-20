# Antariksh Books Showcase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a dedicated `/books/` showcase page on `kidakaka.com`, integrate it into header navigation and the About page, and embed verified Amazon links and high-res cover art for *The Antariksh Trilogy* (*The Shackleton Ice Rush*, *The Iron Monsoon*, and *The Antariksha Sovereign*) and *The Gravity Between Us*.

**Architecture:** Static Astro route (`src/pages/books.astro`) utilizing the project's existing `BaseLayout.astro`. Editorial book cards styled in `public/style.css` using CSS grid/flexbox. Static cover images stored under `public/images/books/`. Top navigation updated in `src/components/Header.astro` and biography updated in `src/pages/about.astro`.

**Tech Stack:** Astro v5.4.2, TypeScript, CSS, HTML5, Node.js

**Spec:** `docs/superpowers/specs/2026-11-21-antariksh-books-design.md`

## Global Constraints

- Must compile cleanly with `npm run build` without TypeScript or Astro route validation warnings.
- Header navigation must preserve existing links (`Home`, `Articles`, `About`, `Legal`) while seamlessly inserting `Books`.
- Direct Amazon URLs must point to verified ASINs (`B0HJP2TVSH` for Kindle, `B0HJNSGV6L` for Paperback).
- Must adhere to the site's minimalist, high-contrast typography and design aesthetics (`style.css`).
- Fully responsive on mobile (single-column stacked cards) and desktop (grid / side-by-side cover layout).

## Review Focus

- Missing or broken image paths for book covers (must serve directly from `public/images/books/` and resolve with HTTP 200).
- Amazon links missing `target="_blank"` or `rel="noopener noreferrer"`.
- Mobile layout breaking on narrow viewports (<600px) when displaying book covers next to blurbs.
- About page biographical consistency between software architecture and fiction writing.
- Sitemap generation (`/sitemap.xml`) correctly including the new `/books/` URL.

---

### Task 1: Book Cover Assets Preparation

**Files:**
- Create: `public/images/books/the-shackleton-ice-rush.jpg`
- Create: `public/images/books/the-iron-monsoon.jpg`
- Create: `public/images/books/the-antariksha-sovereign.jpg`
- Create: `public/images/books/the-gravity-between-us.jpg`

**Interfaces:**
- Consumes: JPG cover masters from `D:\code\projects\antariksha\MARKETING_KDP\`:
  - `cover_art.jpg` -> `the-shackleton-ice-rush.jpg`
  - `The_Iron_Monsoon_Front_Cover.jpg` -> `the-iron-monsoon.jpg`
  - `The_Antariksha_Sovereign_Front_Cover.jpg` -> `the-antariksha-sovereign.jpg`
  - `The_Gravity_Between_Us_Front_Cover.jpg` -> `the-gravity-between-us.jpg`
- Produces: Web-accessible cover assets served by Astro at `/images/books/<name>.jpg`.

- [ ] **Step 1: Check target directory and source assets**

Run: `Test-Path D:\code\projects\antariksha\MARKETING_KDP\cover_art.jpg`  
Expected: `True`

- [ ] **Step 2: Copy and rename the cover assets into `public/images/books/`**

Run:
```powershell
New-Item -ItemType Directory -Force -Path public/images/books
Copy-Item "D:\code\projects\antariksha\MARKETING_KDP\cover_art.jpg" "public\images\books\the-shackleton-ice-rush.jpg"
Copy-Item "D:\code\projects\antariksha\MARKETING_KDP\The_Iron_Monsoon_Front_Cover.jpg" "public\images\books\the-iron-monsoon.jpg"
Copy-Item "D:\code\projects\antariksha\MARKETING_KDP\The_Antariksha_Sovereign_Front_Cover.jpg" "public\images\books\the-antariksha-sovereign.jpg"
Copy-Item "D:\code\projects\antariksha\MARKETING_KDP\The_Gravity_Between_Us_Front_Cover.jpg" "public\images\books\the-gravity-between-us.jpg"
```

- [ ] **Step 3: Verify all 4 images exist with non-zero size**

Run: `Get-ChildItem public\images\books\*.jpg | Select-Object Name, Length`  
Expected: 4 files listed, each > 500 KB.

- [ ] **Step 4: Commit assets**

```bash
git add public/images/books/
git commit -m "assets: add cover art for Antariksh series books"
```

---

### Task 2: Books Showcase Page Component & CSS Styling

**Files:**
- Create: `src/pages/books.astro`
- Modify: `public/style.css`

**Interfaces:**
- Consumes: `src/layouts/BaseLayout.astro`, `public/images/books/*.jpg`
- Produces: Route `/books/` returning semantic HTML with series overview and cards for Books 1-3 + Novella.

- [ ] **Step 1: Add book showcase CSS classes to `public/style.css`**

Add styles for:
- `.books-hero`: Series title, tagline ("ISRO-Punk Hard Science Fiction"), and thematic overview.
- `.book-card`: Bordered editorial container (`border: 1px solid var(--border-color)`), flex/grid layout.
- `.book-card.featured`: Highlighted styling for Book 1 (*The Shackleton Ice Rush*).
- `.book-cover-img`: Fixed aspect ratio (approx 2:3), rounded corners, subtle drop shadow.
- `.book-badge`: Inline status pill (`Available Now` vs `Coming Soon` / `In Production`).
- `.book-buy-group`: Flexbox container with styled buttons for Kindle and Paperback links (Amazon US & Amazon IN).
- Responsive media query `@media (max-width: 640px)` collapsing side-by-side cover and content to single column.

- [ ] **Step 2: Create `src/pages/books.astro`**

Create the page with `BaseLayout`:
- Title: "Books — The Antariksha Protocol"
- Description: "Hard science fiction novels by Prasad Ajinkya exploring cis-lunar geopolitics, vacuum engineering, and human survival in deep space."
- **Featured Section (Book 1: The Shackleton Ice Rush):**
  - Cover: `/images/books/the-shackleton-ice-rush.jpg`
  - Subtitle: "A Hard Science Fiction Novel of Cis-Lunar Geopolitics"
  - Badge: "Available Now"
  - Amazon Links:
    - Kindle (US): `https://www.amazon.com/dp/B0HJP2TVSH`
    - Kindle (India): `https://www.amazon.in/dp/B0HJP2TVSH`
    - Paperback (US): `https://www.amazon.com/dp/B0HJNSGV6L`
    - Paperback (India): `https://www.amazon.in/dp/B0HJNSGV6L`
  - Blurb, themes, and key quote from Foreword (*"Water is the currency of the future"*).
- **Upcoming Novels Section:**
  - Book 2: *The Iron Monsoon* (`the-iron-monsoon.jpg`, badge "In Production")
  - Book 3: *The Antariksha Sovereign* (`the-antariksha-sovereign.jpg`, badge "In Production")
  - Companion: *The Gravity Between Us* (`the-gravity-between-us.jpg`, badge "Bengaluru 2068 Sci-Tech Romance")

- [ ] **Step 3: Run static site build to verify `/books/` route compiles**

Run: `npm run build`  
Expected: Build succeeds and outputs `dist/books/index.html`.

- [ ] **Step 4: Commit books page and styles**

```bash
git add src/pages/books.astro public/style.css
git commit -m "feat: add /books/ showcase page and responsive book card styles"
```

---

### Task 3: Header Navigation & About Page Integration

**Files:**
- Modify: `src/components/Header.astro`
- Modify: `src/pages/about.astro`

**Interfaces:**
- Consumes: `/books/` route
- Produces: Updated navigation links and About page biography connecting tech & fiction.

- [ ] **Step 1: Update `src/components/Header.astro`**

Insert `<a href="/books/">Books</a>` between `Articles` and `About`:
```html
<nav>
  <a href="/">Home</a>
  <a href="/articles/">Articles</a>
  <a href="/books/">Books</a>
  <a href="/about/">About</a>
  <a href="/legal/">Legal</a>
</nav>
```

- [ ] **Step 2: Update `src/pages/about.astro`**

Add the "Fiction & Science Fiction Writing" section under the existing AI/fintech text and before "Contact":
```html
<h2>Fiction & Science Fiction</h2>
<p>Beyond distributed systems and credit architectures, Prasad writes hard science fiction. He is the creator of <em>The Antariksha Protocol</em>—a near-future "ISRO-punk" saga exploring cis-lunar resource geopolitics, vacuum engineering, and human survival under the unforgiving laws of celestial mechanics.</p>
<p>His debut novel, <a href="/books/"><em>The Shackleton Ice Rush</em></a>, is available on Amazon in Kindle and Paperback editions.</p>
```

- [ ] **Step 3: Run build to verify changes compile cleanly**

Run: `npm run build`  
Expected: PASS, 0 errors.

- [ ] **Step 4: Commit navigation and about updates**

```bash
git add src/components/Header.astro src/pages/about.astro
git commit -m "feat: link Books in header navigation and expand About page with fiction bio"
```

---

### Task 4: End-to-End Build & Automated Verification

**Files:**
- Create: `tests/verify-books-page.mjs`

**Interfaces:**
- Consumes: Built HTML files in `dist/`
- Produces: Exit code 0 if all links, images, and nav items are properly generated, exit code 1 otherwise.

- [ ] **Step 1: Write verification script `tests/verify-books-page.mjs`**

Verify that:
1. `dist/books/index.html` exists.
2. `dist/books/index.html` contains:
   - Amazon ASIN `B0HJP2TVSH` (Kindle)
   - Amazon ASIN `B0HJNSGV6L` (Paperback)
   - Amazon.in and Amazon.com URLs with `rel="noopener noreferrer"` and `target="_blank"`
   - References to all 4 book cover images.
3. `dist/about/index.html` contains link to `/books/`.
4. `dist/index.html` header nav contains `<a href="/books/">Books</a>`.
5. All 4 image files exist in `dist/images/books/`.

- [ ] **Step 2: Run verification script**

Run: `node tests/verify-books-page.mjs`  
Expected: All assertion checks pass with "✅ All Antariksh Books verification checks passed".

- [ ] **Step 3: Remove test script or commit if keeping**

```bash
git add tests/verify-books-page.mjs
git commit -m "test: add verification script for books page, links, and navigation"
```
