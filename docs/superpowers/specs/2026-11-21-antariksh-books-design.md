# Design Document: Antariksh Fiction Showcase & Amazon Links

**Date:** 2026-11-21  
**Status:** Pending Approval  
**Author:** Prasad Ajinkya / Antigravity  

---

## 1. Intent & Purpose

Integrate Prasad Ajinkya's hard science fiction universe (*The Antariksh Trilogy* / *The Antariksha Protocol*) into his personal site and blog (`kidakaka.com`). This connects his professional identity as a fintech/AI software architect with his authorial work in "ISRO-Punk" space exploration fiction, providing readers with seamless discovery and direct purchase links on Amazon.

---

## 2. Discovered Amazon URLs & Product Metadata

From Amazon's catalog for *The Shackleton Ice Rush: A Hard Science Fiction Novel of Cis-Lunar Geopolitics* (Book 1):

* **Kindle eBook:**  
  * ASIN: `B0HJP2TVSH`  
  * US Store: [amazon.com/dp/B0HJP2TVSH](https://www.amazon.com/dp/B0HJP2TVSH)  
  * India Store: [amazon.in/dp/B0HJP2TVSH](https://www.amazon.in/dp/B0HJP2TVSH)
* **Paperback:**  
  * ASIN: `B0HJNSGV6L` (ISBN-13: `979-8173969026`)  
  * US Store: [amazon.com/dp/B0HJNSGV6L](https://www.amazon.com/dp/B0HJNSGV6L)  
  * India Store: [amazon.in/dp/B0HJNSGV6L](https://www.amazon.in/dp/B0HJNSGV6L)

*(Books 2 & 3, "The Iron Monsoon" and "The Antariksha Sovereign", plus companion novella "The Gravity Between Us", are in production and will be displayed with covers, blurbs, and "Coming Soon" badges).*

---

## 3. Goals & Non-Goals

### Goals
- **Dedicated Books Page (`/books/`):** Clean, editorial showcase page presenting the *Antariksh* series, book covers, copywritten blurbs, and store links.
- **Header Navigation:** Add `Books` to the top navigation header (`src/components/Header.astro`) alongside `Home`, `Articles`, `About`, `Legal`.
- **About Page Integration:** Add a dedicated "Fiction & Writing" section in `src/pages/about.astro` detailing his hard-sci-fi writing philosophy (frugal engineering, lunar ice geopolitics, ISRO-punk).
- **Static Assets:** Copy optimized cover images from `D:\code\projects\antariksha\MARKETING_KDP\` into `public/images/books/`.
- **Visual Consistency:** Use the site's existing serif/sans typography, warm background palette, and responsive CSS grid.

### Non-Goals
- Altering the existing blog posts or technical articles taxonomy.
- Modifying site-wide layout structure beyond the header navigation.
- Publishing full uncurated manuscripts on the web.

---

## 4. Approaches Considered

1. **Approach 1: Dedicated `/books/` Page + Header Nav + About Section (Chosen)**
   * *Tradeoffs:* Adds a new route to the site and updates navigation, giving fiction first-class visibility without cluttering the engineering essay feed.
   * *Selection Reason:* Chosen by user ("1 ... find the amazon urls").
2. **Approach 2: About Page Feature Only**
   * *Tradeoffs:* Minimal touchpoint, but hides multi-book catalog behind personal bio text.

---

## 5. Architectural & Implementation Details

1. **Assets (`public/images/books/`):**
   * `the-shackleton-ice-rush-cover.jpg`
   * `the-iron-monsoon-cover.jpg`
   * `the-antariksha-sovereign-cover.jpg`
   * `the-gravity-between-us-cover.jpg`
2. **Components & Pages:**
   * `src/components/Header.astro`: Add `<a href="/books/">Books</a>` between `Articles` and `About`.
   * `src/pages/books.astro`: Layout using `BaseLayout.astro`, featuring series overview, Book 1 card with Amazon buy buttons (US/India), and Book 2/3/spinoff teasers.
   * `src/pages/about.astro`: Paragraph introducing *The Antariksh Trilogy* and linking to `/books/`.
   * `public/style.css`: Add styles for `.book-card`, `.book-grid`, `.book-badge`, and `.btn-buy`.
3. **Verification:**
   * Build test with `npm run build` to ensure zero compilation or routing errors.
   * Check HTML preview and responsiveness.
