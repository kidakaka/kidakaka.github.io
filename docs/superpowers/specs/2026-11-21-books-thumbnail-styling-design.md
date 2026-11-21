# Design Document: Books Page Thumbnail Sizing & Editorial Horizontal Layout

**Date:** 2026-11-21  
**Status:** Pending Approval  
**Author:** Prasad Ajinkya / Antigravity  

---

## 1. Intent & Purpose
Refine the `/books/` page visual presentation by reducing oversized thumbnails and adopting an editorial horizontal card layout for upcoming titles. This creates a cohesive, book-store/literary feel with balanced typographic hierarchy.

---

## 2. Goals & Non-Goals

### Goals
- **Featured Book Sizing:** Constrain the featured book cover to `180px` width on desktop with an enhanced book-like depth (subtle spine highlight and elevation shadow).
- **Upcoming Releases Layout (Option 2):** Restyle `.books-grid-secondary` from a vertical card grid into a vertical list of horizontal cards.
- **Compact Thumbnails:** Set secondary book covers to a compact `100px` width (`150px` height, 2:3 aspect ratio) positioned on the left, with title, series tag, badges, and blurb on the right.
- **Responsive Behavior:** Ensure clean alignment on mobile screens (e.g. `85px` thumbnail beside text) so covers never expand to full screen width.
- **Contract & Test Compatibility:** Preserve existing attributes (`width="600"`, `height="900"`, `h2` headings, blockquotes, Amazon links) to pass `tests/verify-books-page.mjs`.

### Non-Goals
- Changing text copy, Amazon URLs, or metadata.
- Modifying other pages on the site.

---

## 3. Approaches Considered

1. **Option 1: 3-Column Shelf Grid**
   * *Description:* 3-column grid with ~125px covers centered over titles.
   * *Tradeoff:* Looks like a bookstore shelf, but blurb lengths can create uneven card heights.
2. **Option 2: Editorial Horizontal Row Cards (Chosen)**
   * *Description:* Stacked horizontal cards with 100px thumbnails on the left and full metadata/blurbs on the right.
   * *Selection Reason:* Chosen by user. Provides consistent vertical reading rhythm, scannable blurbs, and balanced proportions across all screen sizes.

---

## 4. Implementation Details

1. **`src/styles/style.css`:**
   - Update `.book-card` to use `grid-template-columns: 180px 1fr` and add book spine styling to `.book-cover-wrap`.
   - Update `.books-grid-secondary` from `display: grid; repeat(auto-fill, ...)` to `display: flex; flex-direction: column; gap: 20px;`.
   - Update `.book-card-mini` to `display: grid; grid-template-columns: 100px 1fr; gap: 20px; align-items: start;`.
   - Ensure `.book-card-mini .book-cover-wrap` has fixed/max width `100px`.
   - Add responsive styles for mobile (<540px) scaling thumbnail to `80px–85px` while preserving the side-by-side layout.
2. **`src/pages/books.astro`:**
   - Group the right-side content of `.book-card-mini` in a `.book-mini-body` container if needed for clean grid column placement.

---

## 5. Verification
- Run `npm test` (`node tests/verify-books-page.mjs`) to verify zero regressions.
- Run `npm run build` to ensure clean Astro compilation.
