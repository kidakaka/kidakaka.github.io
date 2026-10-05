---
title: "Building Your Custom Connector on Google Data Studio"
date: "2020-08-29"
slug: "building-your-custom-connector-on-google-data-studio"
year: "2020"
month: "08"
day: "29"
categories:
  - "analytics"
  - "web"
excerpt: "This is a technical post. Comfort with code \u2014 specifically JavaScript and Google App Scripts \u2014 is assumed."
image: "/images/21.png"
---

*This is a technical post. Comfort with code — specifically JavaScript and Google App Scripts — is assumed.*

Google Data Studio’s most powerful feature is the ability to create custom data connectors to access proprietary datasets. Consider a marketing research associate who wants to present findings: Google Sheets works with built-in connectors for small datasets, but custom connectors become necessary when data is too large, stored in databases, or available only via APIs.

## Community Connector Sections

Each connector comprises four sections:

- **Configuration** — collects metadata and user inputs like API credentials
- **Authentication** — authorises the script, supporting OAuth2
- **Schema** — defines the data structure, fields, data types, and aggregation options
- **Data** — fetches and validates data, enabling last-minute transformations before display

## Required Functions

Developers must implement four essential functions:

- **getConfig()** — returns configurable user options presented during connector setup
- **getAuthType()** — checks and declares authentication requirements
- **getSchema()** — returns the data structure definition
- **getData()** — accesses and formats the actual data for display

## Best Practices

Write separate functions for data fetching and post-processing — it makes debugging much easier. Google’s official documentation and the GitHub sample code are the best starting references. After deployment, the connector can be added to any Data Studio account and shared with teams.

The first connector always takes longer than expected. The second one takes a fraction of the time.
