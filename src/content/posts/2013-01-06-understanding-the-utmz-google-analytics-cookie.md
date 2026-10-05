---
title: "Understanding the __utmz Google Analytics Cookie"
date: "2013-01-06"
slug: "understanding-the-utmz-google-analytics-cookie"
year: "2013"
month: "01"
day: "06"
categories:
  - "technology"
  - "analytics"
excerpt: "The __utmz cookie is the Google Analytics traffic source cookie. It stores information about where a visitor came from \u2014 the source, medium, campaign, and keyword that brought them to your site. Understanding what it contains and how..."
---

The `__utmz` cookie is the Google Analytics traffic source cookie. It stores information about where a visitor came from — the source, medium, campaign, and keyword that brought them to your site. Understanding what it contains and how to read it is essential for anyone doing serious web analytics work.

## What the Cookie Stores

The `__utmz` cookie value looks intimidating but follows a consistent structure. A typical value looks something like this:

`123456789.1234567890.1.1.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=keyword`

Breaking this down:

- **Domain hash** — a numeric hash of the domain
- **Timestamp** — when the cookie was set (Unix timestamp)
- **Session count** — how many sessions this visitor has had
- **Campaign count** — how many campaigns have driven this visitor
- **utmcsr** — campaign source (e.g., google, newsletter)
- **utmccn** — campaign name
- **utmcmd** — campaign medium (e.g., organic, cpc, email)
- **utmctr** — campaign term (keyword, for search traffic)
- **utmcct** — campaign content (for A/B testing differentiation)

## Why It Matters

The `__utmz` cookie persists for six months and is updated each time a visitor arrives from a new source. This means Google Analytics uses last-touch attribution by default — the most recent traffic source gets credit for a conversion.

Understanding this helps explain discrepancies between what Analytics reports and what you might expect. If a visitor arrives via organic search, returns directly two weeks later, and converts — the organic visit gets credit, not the direct visit, because the cookie retains the original source.

## Reading the Cookie Programmatically

You can read the `__utmz` cookie value using JavaScript and parse the pipe-delimited key-value pairs to pass attribution data to your own systems. This is useful when you want to record traffic source alongside form submissions or other conversion events in a database that is separate from Analytics.

Note that this cookie is part of the older Universal Analytics (ga.js / analytics.js) implementation. Google Analytics 4 uses a different cookie structure, though the underlying attribution concepts remain similar.
