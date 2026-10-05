---
title: "Customizing WordPress to Work Like Confluence"
date: "2024-02-25"
slug: "customizing-wordpress-to-work-like-confluence"
year: "2024"
month: "02"
day: "25"
categories:
  - "web"
  - "work"
excerpt: "At Homeville, when the technology team expanded from 4 to 65+ members, licensing costs for JIRA and Confluence became unsustainable. JIRA charged approximately $400 USD monthly beyond the first 10 users, while Confluence\u2019s expenses..."
image: "/images/14.webp"
---

At Homeville, when the technology team expanded from 4 to 65+ members, licensing costs for JIRA and Confluence became unsustainable. JIRA charged approximately $400 USD monthly beyond the first 10 users, while Confluence’s expenses were rivalling our AWS bills.

## Shifting from Atlassian

We transitioned to OpenProject, an open-source self-hosted alternative. This move provided security benefits by keeping proprietary data within our own AWS infrastructure, and improved regulatory compliance through local hosting. A Python scripting effort migrated projects, tickets, and sprint information from JIRA to OpenProject.

## WordPress as Internal Wiki

Rather than continuing with Confluence, we opted for self-hosted WordPress with extensive customisations. Here’s what we built.

**Custom Taxonomies.** We implemented PODs to quickly add custom post types and taxonomies, enabling separate organisation of credit platforms, systems, and documentation areas.

**Authorisation and Access.** Integration with Microsoft 365 allowed Active Directory authentication, eliminating manual user provisioning. A membership plugin restricted content access by team. We disabled the REST API to prevent unauthorised data exposure and used AWS NACL rules to prevent off-premises access entirely.

**Integration with OpenProject.** Custom plugin development created shortcodes that pulled OpenProject sprint data, enabling teams to generate release notes with sprint backlog links directly within WordPress posts.

**Document Templates.** We replicated Confluence templates using WordPress’s block editor, making it straightforward for teams to create consistent documentation and preserving temporal records of product decisions.

## The Result

The total licensing cost reduction was significant. More importantly, everything — documentation, sprint planning, release notes — lived inside our own infrastructure. For a fintech company handling sensitive data, that matters as much as the cost saving.
