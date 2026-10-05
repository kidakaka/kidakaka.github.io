# kidakaka.com — The Big Fat Geek

Personal blog and technical journal of Prasad Ajinkya.

Built with [Astro](https://astro.build/) and deployed automatically to GitHub Pages.

---

## Quick Start

```bash
# Install dependencies
npm install

# Start local dev server (with hot reload at http://localhost:4321)
npm run dev

# Build production static site (outputs to dist/)
npm run build

# Preview production build locally
npm run preview
```

---

## Publishing a New Post

To publish a new essay, simply create a Markdown file in `src/content/posts/`:

```markdown
---
title: "Your Post Title"
date: "2026-10-05"
slug: "your-post-slug"
year: "2026"
month: "10"
day: "05"
categories:
  - "technology"
  - "work"
excerpt: "A brief 1-2 sentence excerpt summarizing the post for listings, social cards, and RSS."
image: "/images/your_banner_image.jpg" # Optional
imageAlt: "Description of image"      # Optional
---

Your content in Markdown here...

## Section Title

Everything supports Markdown, standard HTML, tables, code blocks, and footnotes.
```

When you commit and push to `master`:
1. The post is published at `/YYYY/MM/DD/slug/`.
2. The homepage, `/articles/` archive, and relevant `/category/` pages update automatically.
3. The RSS feed (`/rss.xml`), sitemaps, and OpenGraph social preview tags generate automatically.

---

## Project Structure

```
├── .github/workflows/deploy.yml   # Automated GitHub Pages CI/CD workflow
├── public/                        # Static files served directly (CNAME, robots.txt, llms.txt, images)
│   ├── CNAME                      # Custom domain (kidakaka.com)
│   ├── images/                    # Post banners and assets
│   ├── llms.txt                   # LLM discovery standard
│   ├── llms-full.txt              # Full archive LLM digest
│   ├── robots.txt                 # Search & AI crawler directives
│   └── style.css                  # Editorial typography & theme stylesheet
├── src/
│   ├── content/posts/             # 94+ Markdown blog posts with YAML frontmatter
│   ├── components/                # Header, Footer, SEO, PostCard, Pagination
│   ├── layouts/                   # BaseLayout and PostLayout
│   ├── pages/                     # Dynamic routes: [year]/[month]/[day]/[slug], /page/[page], /category/[category], /articles, /about, /legal, /rss.xml
│   ├── utils/                     # Date, category, and URL helpers
│   └── content.config.ts          # Zod schema validation for blog posts
├── astro.config.mjs               # Astro site config & sitemap integration
└── package.json                   # Scripts and dependencies
```

---

## Deployment Configuration

This site builds and deploys to **GitHub Pages** via GitHub Actions (`.github/workflows/deploy.yml`).

In your GitHub repository settings:
1. Navigate to **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, ensure **GitHub Actions** is selected.
3. The site will automatically build and deploy on every push to `master`.
