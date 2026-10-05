---
title: "How I Built a Shared Brain for My AI Agents"
date: "2026-06-09"
slug: "how-i-built-a-shared-brain-for-my-ai-agents"
year: "2026"
month: "06"
day: "09"
categories:
  - "technology"
  - "work"
excerpt: "The usual workarounds for AI memory are brittle. What I needed was a shared external memory that any agent could read and write. Here's how I built a two-layer memory architecture using GitHub and GitLab."
---

I oversee engineering across [Homeville Group](https://homevillegroup.com)—co-lending engines, housing finance compliance platforms, and NBFC core systems. The operational terrain is unforgiving: Reserve Bank of India (RBI) circulars, co-lending settlement mechanics, escrow appropriation logic, and statutory bureau reporting transitions. In a domain where context is paramount and architectural amnesia carries severe financial penalties, working with stateless artificial intelligence agents quickly became an unsustainable bottleneck.

I deploy autonomous AI agents daily—chiefly Claude, Gemini, and custom harnesses—and for months I hit the identical ceiling confronting engineering leaders everywhere: **every session began from zero.** I would re-explain system boundaries, paste excerpts of regulatory circulars, and rebuild mental models. Hundreds of thousands of tokens were consumed simply recovering the state of where we left off last Friday.

Earlier, I outlined the conceptual case in [The Git-Backed Brain](/2026/05/31/the-git-backed-brain/). Here is the exact production architecture I engineered to solve it permanently.

<div class="toc">
<div class="toc-title">Table of Contents</div>

- [1. The Statelessness Crisis in Enterprise AI](#statelessness-crisis)
- [2. The Dual-Layer Architecture: Dnyankosh &amp; Manthan](#dual-layer-architecture)
- [3. How Agents Execute: The 7-Step Hydration Protocol](#session-protocol)
- [4. The Distributed Observability Layer](#observability-layer)
- [5. The Model Context Protocol (MCP) Interface](#mcp-gateway)
- [6. Five Architectural Principles That Made It Work](#core-principles)
- [7. What Lies Ahead](#production-roadmap)

</div>

## The Statelessness Crisis in Enterprise AI

Large language models in enterprise operations suffer from four structural vulnerabilities:

- **Stateless Ephemerality:** Claude has no native recollection of the trade-offs debated last Tuesday.
- **Context Window Finitude:** You cannot dump your organization’s five-year git history into a prompt without paying a severe retrieval and cost penalty.
- **Architectural Decay:** Six months into a migration, nobody remembers *why* a specific escrow state machine was chosen over an alternative.
- **Multi-Agent Knowledge Siloing:** When Claude, Gemini, and custom agents collaborate across the same codebase, they cannot learn from one another without a common, external memory plane.

The standard industry band-aids—messy prompt headers, bloated markdown instruction files, or fuzzy vector databases—fail at enterprise scale. They break across agent handoffs and lack versioned auditability. What I needed was an **external, multi-agent shared brain**: version-controlled, human-auditable, and persistent across time.

## The Dual-Layer Architecture: Dnyankosh &amp; Manthan

The system bifurcates memory into two distinct repositories, decoupling immutable institutional governance from high-velocity operational state:

<pre><code>┌─────────────────────────────────────────────────────────┐
│                    AI AGENT SESSION                     │
│           (Claude Code / Antigravity / Gemini)          │
└────────────────────────┬────────────────────────────────┘
│ reads context from
┌──────────────┴──────────────┐
│                             │
▼                             ▼
┌─────────────────┐           ┌──────────────────────┐
│   DNYANKOSH     │           │      MANTHAN         │
│  (GitLab, pvt)  │           │   (GitHub, pvt)      │
│                 │           │                      │
│ Institutional   │           │ Active execution     │
│ memory: stable  │           │ context: sprint      │
│ governance,     │           │ state, session logs, │
│ policies, ADRs. │           │ active tasks.        │
└─────────────────┘           └──────────────────────┘</code></pre>

<div class="callout">

**The Dual-Layer Architecture:** **Dnyankosh** on GitLab functions as the immutable institutional library (statutory frameworks, architectural precedents, and domain glossaries). **Manthan** on GitHub operates as the high-velocity working memory (active sprint tasks, machine session logs, and daily telemetry).

</div>

### Layer 1: Dnyankosh (Knowledge Treasury)

Hosted on a self-hosted GitLab instance, Dnyankosh represents our long-term institutional truth. It contains statutory mandates (RBI guidelines, KYC standards, Credit Information Bureau reporting requirements), domain glossaries, and foundational Architecture Decision Records (ADRs). Changes here require formal human pull-request reviews. It is exposed to autonomous agents via a dedicated Model Context Protocol (MCP) server.<sup>[1](#fn1)</sup>

### Layer 2: Manthan (The Operational Churn)

Hosted on GitHub, Manthan represents the living, real-time working memory of our engineering organization. It is updated continuously by both engineers and autonomous agents across every session:

<pre><code>manthan/
├── decisions/       # Architecture Decision Records (ADRs 001 to 120)
├── context/         # Active sprint state, ops context, working memory
├── prompts/         # Reusable, versioned agent prompt templates
├── harnesses/       # Production Python synchronization harnesses
└── observability/   # Timestamped distributed telemetry traces
└── sessions/    # Structured JSON trace per agent session</code></pre>

<div class="pullquote">
“Give agents rich context documents and they figure out what to do. Chat history is ephemeral; Git is permanent.”
</div>

## How Agents Execute: The 7-Step Hydration Protocol

Every autonomous coding session adheres to a strict four-phase hydration cycle:

1. **Tree Inspection:** Fetch the directory tree of `manthan` to establish current repository topology.
2. **Working Memory Bootstrapping:** Ingest `context/working-memory-YYYY-MM.md`—the single highest-signal document, summarizing active blockers, open decisions, and sprint objectives.
3. **Index Verification:** Cross-reference `INDEX.md` for immediate document routing.
4. **Domain Context Hydration:** Load task-specific specifications (e.g., `context/co-lending-operations.md` or `context/cic_reporting_transition_context.md`).<sup>[2](#fn2)</sup>
5. **Statutory Grounding:** Query Dnyankosh via MCP for governing RBI circulars or architectural invariants.
6. **Execution &amp; Verification:** Execute code modifications, test runs, or architectural documentation.
7. **Telemetry Emission:** Write a structured JSON trace to `observability/sessions/` detailing files modified, token consumption, and decisions taken.

## The Distributed Observability Layer

Every single agent run generates an immutable, timestamped JSON record committed directly to Git:

<pre><code>{
"session_id": "session-20260608-143022-claude",
"agent": "claude-sonnet-4-6",
"date": "2026-06-08",
"duration_minutes": 45,
"task": "CIC reporting transition context update",
"outcome": "completed",
"files_modified": [
"context/cic_reporting_transition_context.md"
],
"tokens_estimated": 12000,
"decisions_made": ["Blended interest rate to be reported to CICs for co-lending loans"],
"open_items": ["July 1 UCRF deadline — state codes update"]
}</code></pre>

This creates an extraordinary organizational asset: **a complete, temporal audit log of every decision made by any machine across time.** When an engineer inspects a pull request three months later, they can trace the exact prompt, agent rationale, and context document that inspired the implementation.

## The Model Context Protocol (MCP) Interface

The entire apparatus relies upon standardized Model Context Protocol (MCP) servers. Rather than relying on fragile cut-and-paste prompts, agents connect to these repositories as standard tool servers. Whether invoked inside Claude Desktop, within Claude Code in the terminal, or through Google’s Antigravity IDE, every agent reads and writes to the identical memory plane via uniform JSON-RPC calls.

## Five Architectural Principles That Made It Work

- **1. Context Trumps Instructions:** Exhaustive system prompts with dozens of rules are brittle. Rich, living context documents in version-controlled markdown are extraordinarily resilient.
- **2. Dated Decisions Over Chat Memory:** Every ADR contains a date, context, and rationale. Git history is permanent; conversational chat history evaporates.
- **3. Working Memory Beats Static Archives:** A live, curated monthly working memory document is infinitely more valuable than an unmaintained 500-page wiki.
- **4. Immutable Decisions, Mutable Context:** ADRs are append-only historical facts. Working memory documents are fluid and reflect current operational reality.
- **5. Decouple Memory from Compute:** When your organizational truth lives in Git, foundation models become interchangeable compute engines.

## What Lies Ahead

We are currently deploying the next generation of this architecture: an enterprise Model Context Protocol gateway (*Dnyankosh MCP*) providing direct streaming access to core banking and lending management systems, automated cross-agent validation harnesses, and self-healing telemetry pipelines.

If your team is deploying artificial intelligence beyond isolated playground experiments, you do not need more models. You need a shared, version-controlled brain.

---

<div class="footnotes">
<ol>
<li id="fn1">Anthropic Model Context Protocol (MCP), an open open-standard protocol published in late 2024 defining JSON-RPC tool and resource discovery between client applications and external data repositories.</li>
<li id="fn2">Reserve Bank of India (RBI) Master Directions on Credit Information Companies (CIC) Regulations, mandating strict monthly reporting formats (including the Uniform Credit Reporting Format, UCRF) for all regulated lending entities.</li>
</ol>
</div>
