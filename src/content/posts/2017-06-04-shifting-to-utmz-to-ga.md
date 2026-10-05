---
title: "Shifting from _utmz to _ga"
date: "2017-06-04"
slug: "shifting-to-utmz-to-ga"
year: "2017"
month: "06"
day: "04"
categories:
  - "ads"
  - "analytics"
excerpt: "I previously wrote about the __utmz cookie \u2014 the Google Analytics cookie that stored visitor source attribution data. As Google Analytics evolved from the Urchin tracking system, significant changes occurred in how these cookies..."
---

I previously wrote about the `__utmz` cookie — the Google Analytics cookie that stored visitor source attribution data. As Google Analytics evolved from the Urchin tracking system, significant changes occurred in how these cookies function. The utmz cookie no longer exists.

## Where Does That Leave Us?

Despite the cookie’s disappearance, a unique identifier remains available. The `_ga` cookie contains a client ID — a distinctive identifier for each user-domain combination that is accessible to both server-side and client-side scripts.

## What is a Client ID?

The client ID looks something like `129754452.1496423206`. It is visible in Google Analytics’ User Explorer report. This identifier enables tracking specific users across multiple visits and channels, revealing how visitor sources change over time.

For businesses that need to understand the full multi-touch journey of a customer — not just the last click — the client ID is the key that connects visits across sessions. You can integrate it into CRM systems to build a more complete picture of the customer lifecycle.

## The World of And

Attribution modelling concepts apply here: rather than crediting conversion to a single source, this approach allows distributing credit across multiple marketing channels. Last-click attribution has always been a simplification. The client ID gives you the raw material to do better.
