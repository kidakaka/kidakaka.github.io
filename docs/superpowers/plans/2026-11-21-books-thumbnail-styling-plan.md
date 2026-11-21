# Books Page Thumbnail Sizing & Editorial Horizontal Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine the `/books/` page visual presentation by reducing the featured book cover to a proportional `180px` width and converting upcoming books into an editorial horizontal row layout with compact `100px` thumbnails.

**Architecture:** Update `src/pages/books.astro` to wrap secondary book metadata into a `.book-mini-content` container, update `src/styles/style.css` to implement the `180px 1fr` featured grid, a flex-column secondary list with a `100px 1fr` card grid, subtle book spine elevation shadows, and responsive rules down to mobile, and update `tests/verify-books-page.mjs` to ensure the layout passes automated checks.

**Tech Stack:** Astro, CSS3 (CSS Grid & Flexbox), Node.js test script (`assert`).

**Spec:** [`docs/superpowers/specs/2026-11-21-books-thumbnail-styling-design.md`](file:///d:/code/kidakaka.github.io/docs/superpowers/specs/2026-11-21-books-thumbnail-styling-design.md)

## Global Constraints

- Featured cover width constrained to `180px` on desktop with aspect ratio `2 / 3`.
- Secondary book covers constrained to `100px` width on desktop and max `85px` on mobile.
- Preserve `width="600"` and `height="900"` attributes on all `<img>` tags.
- Preserve existing book copy, ASINs, Amazon URLs, badge classes, and semantic headings (`h2`, `h3`, `blockquote`).
- Keep site dark-mode and print styling fully functional without breaking existing styles.

## Review Focus

- Mobile viewports (<540px): verify thumbnails remain alongside text without clipping, overflowing, or forcing full-width stacking.
- Aspect ratio: verify no distorted cover images (`object-fit: cover; aspect-ratio: 2 / 3`).
- Blurb typography: ensure blurbs in horizontal cards retain readable line-height and margin spacing without misaligning with the cover image.
- Dark mode: verify book cover spine shadow and card border colors adapt cleanly to dark theme.
- Regression check: ensure `tests/verify-books-page.mjs` checks still pass after markup and CSS changes.

---

### Task 1: Update Test Suite to Assert Layout Requirements

**Files:**
- Modify: `tests/verify-books-page.mjs:25-35`

**Interfaces:**
- Consumes: Node.js `node:assert`, `node:fs`
- Produces: Updated verification suite asserting `.book-mini-content` structure and CSS rules in built artifacts.

- [ ] **Step 1: Add failing assertions to `tests/verify-books-page.mjs`**

Add checks in `tests/verify-books-page.mjs` to verify:
1. `.book-mini-content` exists in `booksHtml`.
2. Built `dist/styles/style.css` (or linked CSS) contains `.book-mini-content` and horizontal card layout rules for `.book-card-mini`.

- [ ] **Step 2: Run test to verify it fails**

Run: `node tests/verify-books-page.mjs`  
Expected: FAIL with assertion error that `.book-mini-content` is not found.

- [ ] **Step 3: Commit test update**

```bash
git add tests/verify-books-page.mjs
git commit -m "test: add assertions for books page horizontal layout"
```

---

### Task 2: Update Markup in `src/pages/books.astro`

**Files:**
- Modify: `src/pages/books.astro:100-179`

**Interfaces:**
- Consumes: `src/pages/books.astro`
- Produces: Structured `.book-card-mini` elements pairing `.book-cover-wrap` with `.book-mini-content`.

- [ ] **Step 1: Wrap secondary card text elements in `.book-mini-content`**

In `src/pages/books.astro`, wrap `.book-header` and `.book-blurb` in `<div class="book-mini-content">` for Book 2, Book 3, and the Companion Novella.

- [ ] **Step 2: Run Astro build to verify markup syntax**

Run: `npx astro build`  
Expected: PASS build with 0 errors.

- [ ] **Step 3: Run test suite to verify Step 1 progression**

Run: `node tests/verify-books-page.mjs`  
Expected: Passes `.book-mini-content` assertion in HTML.

- [ ] **Step 4: Commit markup updates**

```bash
git add src/pages/books.astro
git commit -m "feat(books): wrap mini book cards in book-mini-content container"
```

---

### Task 3: Refine CSS Styles in `src/styles/style.css`

**Files:**
- Modify: `src/styles/style.css:1140-1390`

**Interfaces:**
- Consumes: `.book-card`, `.book-cover-wrap`, `.book-card-mini`, `.book-mini-content`
- Produces: Refined cover dimensions, spine box-shadows, and responsive horizontal list layout.

- [ ] **Step 1: Update Featured Book Card CSS**

In `src/styles/style.css`:
- Change `.book-card` grid to `grid-template-columns: 180px 1fr; gap: 32px;`.
- Enhance `.book-cover-wrap` with realistic depth: `box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15), inset 2px 0 3px rgba(255, 255, 255, 0.2); border: 1px solid rgba(0,0,0,0.08);`.
- In dark mode, ensure border and shadow adapt cleanly (`rgba(0,0,0,0.5)`).

- [ ] **Step 2: Update Upcoming Books Grid to Horizontal Row List**

In `src/styles/style.css`:
- Update `.books-grid-secondary`:
  ```css
  .books-grid-secondary {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 48px;
  }
  ```
- Update `.book-card-mini`:
  ```css
  .book-card-mini {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 20px 24px;
    display: grid;
    grid-template-columns: 100px 1fr;
    gap: 24px;
    align-items: start;
  }
  ```
- Update `.book-card-mini .book-cover-wrap`:
  ```css
  .book-card-mini .book-cover-wrap {
    width: 100px;
    max-width: 100px;
    margin-bottom: 0;
    flex-shrink: 0;
  }
  ```
- Style `.book-mini-content`:
  ```css
  .book-mini-content {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  ```

- [ ] **Step 3: Update Media Queries for Mobile Responsiveness**

In `@media (max-width: 680px)`:
- `.book-card`: `grid-template-columns: 1fr; gap: 20px; padding: 20px;`
- `.book-card .book-cover-wrap`: `max-width: 160px; margin: 0 auto;`
- `.book-card-mini`: `grid-template-columns: 85px 1fr; gap: 16px; padding: 16px;`
- `.book-card-mini .book-cover-wrap`: `width: 85px; max-width: 85px;`
- `.book-card-mini .book-title`: `font-size: 18px;`
- `.book-card-mini .book-blurb`: `font-size: 13.5px; line-height: 1.55;`

- [ ] **Step 4: Build and test**

Run:
```bash
npm run build
npm test
```
Expected: PASS with all tests passing and updated CSS generated in `dist/`.

- [ ] **Step 5: Commit CSS styling updates**

```bash
git add src/styles/style.css
git commit -m "style(books): scale down thumbnails and convert upcoming books to horizontal rows"
```
