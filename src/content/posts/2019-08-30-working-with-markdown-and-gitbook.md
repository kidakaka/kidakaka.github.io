---
title: "Working with Markdown and GitBook"
date: "2019-08-30"
slug: "working-with-markdown-and-gitbook"
year: "2019"
month: "08"
day: "30"
categories:
  - "work"
  - "technology"
excerpt: "When I transitioned to leading the tech team at Homeville, the challenge of managing documentation across multiple microservices became immediately apparent. Different repositories, different languages, different hosting environments..."
image: "/images/22.png"
---

When I transitioned to leading the tech team at Homeville, the challenge of managing documentation across multiple microservices became immediately apparent. Different repositories, different languages, different hosting environments — and no single place where a new developer could get oriented quickly.

## Starting with README Files

I started using README.md files as entry points for each service, written from the perspective of helping a new developer understand what each service does and how to get it running. This required learning Markdown — a super lightweight language that allows one to quickly convert text into rich formatted documents like HTML or PDF. Simpler than a word processor, more useful than plain text.

## From Individual Files to GitBook

As standalone README files accumulated, the need for a consolidated documentation site became clear. Drawing on experience from the WordPress India community, which used GitBook to aggregate multiple Markdown files into cohesive documentation sites, I applied the same approach to our microservices.

GitBook is available as a CLI tool via npm. It transforms a collection of Markdown files into an organised, navigable developer website.

## Getting Started

1. Install gitbook-cli from npm: `npm install -g gitbook-cli`
2. Run `gitbook init` in a new folder
3. Execute `gitbook serve` to preview at localhost:4000

## Key Concepts

- **SUMMARY.md** controls sidebar navigation
- **book.json** enables customisation and plugins
- Organise services in subfolders for clarity
- Maintain a CHANGELOG.md for version history
- Run `gitbook build` to generate static files for hosting

Documentation written close to the code gets updated. Documentation written far from the code gets forgotten.
