---
title: "Memory-as-Code: Why We Open-Sourced Manthan MCP"
date: "2026-11-20"
slug: "memory-as-code-why-we-open-sourced-manthan-mcp"
year: "2026"
month: "11"
day: "20"
categories:
  - "technology"
  - "work"
excerpt: "We spent months proving that autonomous coding agents do not need black-box vector databases—they need deterministic version control. Today, we are open-sourcing @kidakaka/manthan-mcp on npm: a commercial-grade, Git-native memory engine for Claude Code, Cursor, and Antigravity."
image: "/images/manthan_mcp_banner.jpg"
imageAlt: "Memory-as-Code: Why We Open-Sourced Manthan MCP"
---

Across the software engineering landscape in late 2026, autonomous coding agents have graduated from autocomplete curiosities into genuine junior-to-mid-level contributors. Whether you are running Anthropic’s Claude Code, Cursor, Windsurf, or Google Antigravity, the raw reasoning throughput of frontier models is no longer the bottleneck. 

The crisis is **amnesia**.

Every software engineer working with agents eventually hits the same wall: you close a terminal session, re-open your IDE the following morning, and your agent has completely forgotten why you chose that specific escrow settlement formula, why an idempotency header is mandatory on payment endpoints, or how your team structured its multi-tenant database partitions. The agent starts from zero, blithely re-introducing previously rejected anti-patterns.

The tech industry’s knee-jerk reaction to this crisis has been uniform, expensive, and deeply flawed: *“Spin up a vector database, chunk your workspace, and inject context via semantic similarity.”*

Earlier this year, in [The Git-Backed Brain](/2026/05/31/the-git-backed-brain/), [How I Built a Shared Brain for My AI Agents](/2026/06/09/how-i-built-a-shared-brain-for-my-ai-agents/), and [Deterministic AI: Why I Replaced Vector DBs with Git & Markdown](/2026/08/10/deterministic-ai-why-i-replaced-vector-dbs-with-git-and-markdown/), I laid out our thesis at [Bharat Housing Network](https://bharathousingnetwork.com) and Homeville: **autonomous engineering agents do not need probabilistic similarity; they need deterministic precision.**

Over the past three months, after processing millions of production tokens across hundreds of multi-agent sessions, we formalized, tested, and hardened that architecture into a standalone, commercial-grade open-source engine.

Today, I am proud to announce the public launch of **[`@kidakaka/manthan-mcp`](https://www.npmjs.com/package/@kidakaka/manthan-mcp)** on npm—an open-source, Git-native, deterministic memory engine for AI agents exposed via the Model Context Protocol (MCP).<sup>[1](#fn1)</sup>

<div class="toc">
<div class="toc-title">Table of Contents</div>

- [1. The Etymology: Why "Manthan" (मंथन)?](#the-etymology)
- [2. Why Vector Databases Fail Agentic Memory](#why-vector-fails)
- [3. The Core Architecture of Manthan](#core-architecture)
- [4. The Dual-Tier Memory Model: Working vs. Constitution](#dual-tier-memory)
- [5. Under the Hood: Zero-Bloat Engineering with `node:sqlite`](#under-the-hood)
- [6. The 6-Tool MCP Surface & Live Resources](#mcp-surface)
- [7. Up and Running in 60 Seconds](#quickstart)
- [8. Calling Early Adopters & Agent Builders](#calling-early-adopters)

</div>

## 1. The Etymology: Why "Manthan" (मंथन)?

> *"Out of the turbulent ocean of chaotic noise, deep contemplation churns the immortal nectar of truth."*

**Manthan** (मन्थन) is an ancient Sanskrit word originating from the verbal root ***manth*** (मन्थ्), which translates to **"to churn, vigorously agitate, deeply contemplate, and extract the concentrated essence from vast substance."**

In classical Vedic literature, the term finds its definitive mythic expression in **Samudra Manthan** (समुद्र मन्थन — *The Churning of the Cosmic Ocean*). When the forces of light (*Devas*) and darkness (*Asuras*) churned the primordial ocean of chaos, they churned through the deadly, volatile poisons (*Halahala*) to extract the supreme divine treasures (*Ratnas*) and the ultimate prize: **Amrita** (अमृत) — the immortal nectar of eternal life, truth, and absolute clarity.

When constructing persistent memory for autonomous LLM agents, the metaphor is strikingly exact:

<div class="callout">

**The Cognitive Churning Rod:** In real-world software engineering, autonomous agents generate an ocean of volatile, noisy, transient tokens—intermediate trial-and-error, failed bash executions, and fleeting hypotheses. If left uncurated, this context degrades into token exhaustion and silent hallucinations. **Manthan** acts as the cognitive churning rod—filtering through the raw stream, discarding volatile noise, and distilling the essential architectural truths of your codebase into version-controlled state (**Memory-as-Code**).

</div>

In Indian thought, *Amrita* is that which cannot die (*a-mrita* = deathless). When an agent commits an architectural decision or constitutional invariant in Manthan, it is not lost when a context window closes or a session restarts. It is forged into an **immutable, cryptographically signed Git commit** backed by sub-5ms BM25 retrieval—conferring permanence, reproducibility, and time-travel lineage upon the agent's memory.

---

## 2. Why Vector Databases Fail Agentic Memory

The enterprise software world was sold a myth: that semantic vector embeddings represent the silver bullet for LLM memory. But in mission-critical software engineering, vector search introduces fatal structural defects:

1. **Chunking Destroys Architectural Lineage:**  
   To embed documents into a vector space, you must slice them into arbitrary 512-token chunks. When an agent requests context on our co-lending escrow payout rules, a vector search might retrieve Chunk 3 of an Architecture Decision Record (ADR). But Chunk 3 is completely invalid without the statutory invariants defined in Chunk 1.
2. **Cosine Similarity Is Probabilistic & Drifts:**  
   Vector retrieval is non-deterministic. A subtle phrasing shift in an engineer's prompt—or an embedding model update—causes cosine distance scores to fluctuate. An ADR retrieved with an 0.88 score yesterday might get buried under an obsolete meeting summary today. In architecture, probabilistic retrieval breeds hallucinated implementations.
3. **You Cannot `git bisect` an Embedding Index:**  
   When an autonomous agent generates broken code because it ingested obsolete schema guidance, how do you debug the vector database? You cannot run `git log` on high-dimensional vectors. You cannot review vector changes in a GitHub pull request.

Autonomous software engineering requires **version-controlled state**, not opaque floating-point vectors.

---

## 3. The Core Architecture of Manthan

Manthan replaces black-box vector stores with a two-part hybrid storage engine: **Git as the Single Source of Truth**, accompanied by an **ephemeral embedded SQLite FTS5 lexical sidecar index**.

<pre><code>┌─────────────────────────────────────────────────────────────────────────┐
│                       AI AGENT HOST CLIENT                              │
│            (Claude Code / Cursor / Windsurf / Antigravity)              │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
             Model Context Protocol  │ (Stdio: JSON-RPC Frames)
             (Tools + Resources)     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                       @kidakaka/manthan-mcp                             │
│                                                                         │
│  MCP Tools:                        MCP Resources:                       │
│   ├── recall_memory                 ├── manthan://constitution          │
│   ├── commit_memory                 ├── manthan://active-context        │
│   ├── propose_constitution_rule     └── manthan://status                │
│   ├── audit_memory_lineage                                              │
│   ├── sync_memory_index                                                 │
│   └── fetch_by_tags_and_keywords                                        │
└──────────────────┬───────────────────────────────────┬──────────────────┘
                   │                                   │
      Atomic Writes│ &amp; Provenance                      │ Sub-5ms BM25
      Via Git Lineage                                  │ Lexical Recall
                   ▼                                   ▼
┌──────────────────────────────────────┐  ┌───────────────────────────────┐
│        GIT REPOSITORY ROOT           │  │     EPHEMERAL FTS5 SIDECAR    │
│                                      │  │                               │
│  .manthan/memory/                    │  │  .manthan/index.db            │
│   ├── working/       (Read/Write)    │  │  (Node.js native node:sqlite) │
│   │   └── backend/mem_01j9x8.md      │  │  • BM25 Column Ranking        │
│   └── constitution/  (Read-Only)     │  │  • Auto-rebuilt on Git SHA    │
│       └── core/ADR-001.md            │  │    desynchronization          │
└──────────────────────────────────────┘  └───────────────────────────────┘</code></pre>

Every persistent memory artifact in Manthan is stored as a human-readable Markdown file with a strict, Zod-validated YAML frontmatter:

```markdown
---
id: "mem_01j9x8k2m"
title: "API Idempotency Key Header Standard"
layer: "working" # "working" | "constitution"
namespace: "backend/payments"
status: "active" # "active" | "superseded" | "draft" | "archived"
author_agent: "claude-code"
trace_id: "tr_98234792"
supersedes: null
tags: ["idempotency", "api", "payments"]
updated_at: "2026-11-20T10:00:00.000Z"
---

## Context & Decision
All payment mutation endpoints must accept and validate a unique `Idempotency-Key` header.
```

---

## 4. The Dual-Tier Memory Model: Working vs. Constitution

One of the greatest dangers in multi-agent environments is **guardrail degradation**—an agent making a mistake in session $N$, writing that mistake into memory, and having agents in sessions $N+1$ and $N+2$ treat that hallucination as scripture.

Manthan solves this through an explicit, bi-cameral separation of concerns:

### Tier 1: The Active Memory Store (`working` Layer)
The `working` layer is the active memory scratchpad. When an agent finishes refactoring a service, tests an edge case, or establishes a session handoff, it invokes `commit_memory`. Manthan validates the frontmatter schema, saves the file into `.manthan/memory/working/`, and executes an **atomic Git commit** stamped with the agent’s name and session trace ID.

### Tier 2: Constitutional Memory (`constitution` Layer)
The `constitution` layer houses your non-negotiable architectural guardrails, regulatory compliance mandates, and ADRs. 

Agents have **read-only** access to the constitution during routine execution. An agent cannot unilaterally rewrite an architectural law. If an agent discovers a pattern that warrants becoming a project-wide rule, it must call `propose_constitution_rule`. Manthan commits the proposal with `status: draft` under `.manthan/memory/constitution/` on an isolated branch (`manthan/rule-<id>`). 

<div class="pullquote">
“Autonomous agents should be empowered to record active working context, but fundamental architectural constitutions must require human pull-request approval.”
</div>

---

## 5. Under the Hood: Zero-Bloat Engineering with `node:sqlite`

When architecting developer tooling distributed via npm, developer ergonomics dictate adoption. If installing a tool requires Python build tools, Visual Studio C++ runtimes, or triggers cryptic `node-gyp` compilation errors on Windows or Alpine Linux, 80% of developers will abandon it before the first command finishes.

We made an intentional architectural decision for Manthan:

* **Zero Native C++ Compilation:** Manthan leverages Node.js's built-in `node:sqlite` module (`DatabaseSync`), which landed in Node 22.5+ and LTS 24.
* **Embedded SQLite FTS5 with BM25:** The search sidecar index (`.manthan/index.db`) uses SQLite’s native Full-Text Search 5 (FTS5) engine with custom column-weighted BM25 scoring:
  $$\text{Score} = 5.0 \cdot \text{Title} + 3.0 \cdot \text{Tags} + 2.0 \cdot \text{Namespace} + 1.0 \cdot \text{Content}$$
* **Sub-5ms Recall Latency:** Local lexical search resolves in 2 to 4 milliseconds—an order of magnitude faster than cloud vector API round-trips.
* **Cryptographic Git Provenance & Time-Travel:** Every recalled memory returns its exact Git commit SHA. If an agent questions why a rule exists, it calls `audit_memory_lineage` to inspect the chronological commit history, authoring agent, and diff history.
* **Self-Healing Index Resynchronization:** The SQLite sidecar database is strictly ephemeral and gitignored. During startup, Manthan inspects the active `git rev-parse HEAD`. If a teammate pulled new commits or switched branches, Manthan automatically detects the SHA mismatch and rebuilds the SQLite FTS5 index from disk in milliseconds.

---

## 6. The 6-Tool MCP Surface & Live Resources

Manthan implements the official Model Context Protocol specification, exposing six deterministic tools:

<div class="table-wrapper">

| Tool | Purpose | Key Inputs | Key Deliverable |
| :--- | :--- | :--- | :--- |
| `recall_memory` | BM25 search across state & guardrails | `query`, `namespace`, `tags`, `limit` | Bundled working memories & constitutional rules with commit SHAs |
| `commit_memory` | Atomic state write with Git commit & indexing | `namespace`, `title`, `content`, `tags` | Commit SHA, file path, and FTS5 update |
| `propose_constitution_rule` | Propose architectural law / ADR for review | `title`, `content`, `rationale`, `namespace` | Draft artifact path on dedicated branch for human PR review |
| `audit_memory_lineage` | Provenance audit & time-travel history | `memory_id` or `file_path`, `max_commits` | Chronological commit log, agent author, and unified diff |
| `sync_memory_index` | Sidecar index maintenance & cache refresh | `force_rebuild` | Verified synchronized Git HEAD SHA & indexed counts |
| `fetch_by_tags_and_keywords` | Tag-filtered retrieval with snippet extraction | `tags`, `keywords`, `doc_type`, `limit` | Compact excerpts matching exact tag combinations |

</div>

### Zero-Turn Hydration via MCP Resources

Beyond tool calling, Manthan exposes live MCP Resources:
* `manthan://constitution` — Injects active architectural guardrails directly into the agent’s system prompt at session start.
* `manthan://active-context` — Provides immediate awareness of ongoing tasks and recent memory handoffs without burning an exploratory tool turn.
* `manthan://status` — Health metrics, indexed count, and Git HEAD status.

---

## 7. Up and Running in 60 Seconds

You can initialize Manthan in any Git workspace with zero global configuration:

```bash
# 1. Initialize Manthan in your repository
npx @kidakaka/manthan-mcp init

# 2. Automatically link configuration to your AI client
# Supports: claude-desktop, cursor, vscode
npx @kidakaka/manthan-mcp link --client claude-desktop
```

This creates a declarative `.manthan.yaml` in your project root:

```yaml
version: "1"
engine:
  memory_dir: ".manthan/memory"
  sqlite_index: ".manthan/index.db"
defaults:
  author_agent: "developer"
retrieval:
  bm25:
    title_weight: 5.0
    tags_weight: 3.0
    namespace_weight: 2.0
    content_weight: 1.0
```

When you launch Claude Code, Cursor, or Antigravity, the agent automatically detects Manthan's tools and resources. When you ask your agent to remember a critical decision, it commits directly to your repository's history.

---

## 8. Calling Early Adopters & Agent Builders

Software engineering is undergoing its most profound platform shift in forty years. But if our autonomous agents are forced to rely on amnesiac scratchpads or opaque, drifting vector databases, we are building castles on shifting sand.

**[`@kidakaka/manthan-mcp`](https://www.npmjs.com/package/@kidakaka/manthan-mcp)** is open source under the Apache 2.0 license. 

Right now, **we need real-world user feedback more than code contributions.** 

If you are an engineer building with **Claude Code**, **Cursor**, **Windsurf**, or **Google Antigravity**, install the package, give your agents persistent Git memory, and tell us:
* Does deterministic Git-backed memory eliminate the state drift and context hallucinations you experience with vector stores?
* How does the constitutional review process feel in your team's pull-request workflow?

👉 **[View the package on npm](https://www.npmjs.com/package/@kidakaka/manthan-mcp)**  
⭐ **[Star and contribute on GitHub](https://github.com/kidakaka/manthan-mcp)**  
💬 **[Join GitHub Discussions](https://github.com/kidakaka/manthan-mcp/discussions)**  

Let’s churn through the chaotic noise of ephemeral tokens, and build agentic software upon the durable rock of version-controlled state.

---

<div class="footnotes">
<ol>
<li id="fn1">Model Context Protocol (MCP) is an open specification published by Anthropic in November 2024 providing standardized client-server communication over JSON-RPC for agentic context retrieval.</li>
</ol>
</div>
