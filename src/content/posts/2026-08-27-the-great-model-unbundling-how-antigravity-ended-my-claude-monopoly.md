---
title: "The Great Model Unbundling: How Antigravity and Multi-Agent Orchestration Ended My Claude Monopoly"
date: "2026-08-27"
slug: "the-great-model-unbundling-how-antigravity-ended-my-claude-monopoly"
year: "2026"
month: "08"
day: "27"
categories:
  - "technology"
  - "work"
excerpt: "Six months ago, Claude handled 98% of our AI engineering sessions. Today, it is under 15%. Here is the telemetry from 308 production sessions on how Antigravity, LivAgent, and a Git-backed shared brain ended our Claude monopoly."
image: "/images/model_unbundling_banner.jpg"
imageAlt: "The Great Model Unbundling: How Antigravity and Multi-Agent Orchestration Ended My Claude Monopoly"
---

If you inspected our engineering telemetry at the beginning of June 2026, the empirical data told a singular, indisputable story: **Anthropic’s Claude was our entire world.**

In our internal engineering repository—*Manthan*, which serves as the shared brain and distributed observability hub for our AI workloads across [Homeville Group](https://homevillegroup.com) and Bharat Housing Network (BHN)—Claude logged **99 out of every 101 production sessions**. Over 98% of our compute, token consumption, and daily agent runs flowed through a single model family. Claude Sonnet was our default hammer for everything: drafting Architecture Decision Records (ADRs), refactoring co-lending microservices, parsing central bank circulars, and troubleshooting CI/CD harnesses.

Fast-forward to late August 2026, and the operational picture has inverted entirely.

In our latest daily telemetry runs, Claude accounts for **less than 15% of active sessions**. The vast bulk of our high-velocity software engineering, context synthesis, and background automation has migrated to **Google’s Antigravity** (powered by Gemini 3.1 Pro/Flash) and autonomous headless agents like **LivAgent**.

This was not an ideological shift. It was the natural, inevitable outcome of two converging architectural breakthroughs: the launch of **Antigravity’s agentic orchestration engine** and the establishment of **a model-agnostic, Git-backed shared memory layer**.

Here is the hard data from **308 production sessions and over 14 million tokens**: why the shift occurred, and what it reveals about the future of enterprise multi-agent architecture.

<div class="toc">
<div class="toc-title">Table of Contents</div>

- [1. The Telemetry: 308 Sessions Under the Microscope](#telemetry-breakdown)
- [2. Catalyst 1: The Shared Brain Commoditized the Model](#catalyst-1)
- [3. Catalyst 2: The Rise of Specialized Agent Topologies](#catalyst-2)
- [4. Catalyst 3: Sovereign Data Residency &amp; Infrastructure Realities](#catalyst-3)
- [5. Key Lessons for Engineering Leadership](#executive-lessons)
- [6. Conclusion: The Future Is a Multi-Agent Mesh](#future-mesh)

</div>

## The Telemetry: 308 Sessions Under the Microscope

In our [Manthan Observability infrastructure](/2026/08/21/ai-in-qa-maturity-curves-shared-brain-and-opentelemetry/), every single agent session—whether an interactive pair-programming loop or an autonomous cron daemon—is comprehensively instrumented.<sup>[1](#fn1)</sup> We record wall-clock duration, input/output tokens, tool call latencies, error distributions, and deterministic task outcomes.

Here is our cumulative telemetry breakdown across 308 production sessions:

<div class="table-wrapper">

<table>
<thead>
<tr>
<th>Agent / Engine</th>
<th>Total Sessions</th>
<th>Total Tokens</th>
<th>Avg Duration</th>
<th>Primary Operational Role</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Claude (Sonnet / Opus)</strong></td>
<td>178 (57.8%)</td>
<td>7,322,730 (51.8%)</td>
<td>2,275s (~38 min)</td>
<td>Principal Architecture, Complex ADRs, CCB Governance</td>
</tr>
<tr>
<td><strong>Antigravity (Gemini 3.1 Pro/Flash)</strong></td>
<td>71 (23.1%)</td>
<td>2,967,400 (21.0%)</td>
<td>1,342s (~22 min)</td>
<td>Interactive Coding, Fast Refactoring, Harness Automation</td>
</tr>
<tr>
<td><strong>LivAgent (Headless Cron)</strong></td>
<td>55 (17.9%)</td>
<td>3,848,500 (27.2%)</td>
<td>7,116s (~118 min)</td>
<td>ERP Triage, Telemetry Aggregation, Background Syncs</td>
</tr>
<tr>
<td><strong>Other / Specialized</strong></td>
<td>4 (1.3%)</td>
<td>—</td>
<td>—</td>
<td>Experimental harnesses &amp; benchmark evaluations</td>
</tr>
</tbody>
</table>

</div>

While the all-time cumulative volume still reflects Claude’s dominance during Q1 and Q2, the **trajectory over time** tells the decisive story:

- **June 4, 2026:** Claude: 99 sessions | Antigravity: 2 sessions | LivAgent: 0 sessions (Claude = **98.0%**)
- **July 21, 2026:** Claude: 11 sessions | Antigravity: 4 sessions | LivAgent: 0 sessions (Claude = **73.3%**)
- **August 14, 2026:** Claude: 2 sessions | Antigravity: 0 sessions | LivAgent: 2 sessions (Claude = **50.0%**)
- **August 25, 2026:** LivAgent: 5 sessions | Antigravity: 2 sessions | Claude: 1 session (Claude = **12.5%**)

Across the entire ecosystem, our overall task success rate climbed to **98.95%** (284 verified successes, 0 hard system failures, 3 blocked on external bank dependencies). How did unbundling Claude across a heterogeneous mesh improve operational velocity while driving down turnaround latency?

## Catalyst 1: The Shared Brain Commoditized the Model

In [The Git-Backed Brain](/2026/05/31/the-git-backed-brain/) and [Deterministic AI](/2026/08/10/deterministic-ai-why-i-replaced-vector-dbs-with-git-and-markdown/), I detailed why we rejected opaque vector databases in favor of a centralized Git repository with Open Knowledge Format frontmatter and Anthropic’s Model Context Protocol ([Dnyankosh MCP](/2026/08/26/dnyankosh-mcp-the-blueprint-for-enterprise-ai-infusion/)).

What I did not fully anticipate at the time was the secondary systemic consequence: **once institutional memory lives in Git, the foundation model becomes interchangeable compute.**

When you depend upon an LLM’s conversational chat history or proprietary vendor memory silos, switching models incurs a prohibitive context tax. You remain anchored to Claude not because it is the optimal engine for every sub-task, but because “Claude remembers the project history.”

By enforcing our *Interim Coding Agent Workspace &amp; Memory Protocol* (ADR-015), any machine agent entering our repository executes a strict four-phase hydration sequence:<sup>[2](#fn2)</sup>

<pre><code>┌─────────────────────────────────────────────────────────────────────────┐
│                      THE MODEL-AGNOSTIC MESH                            │
└────────────────────────────────────┬────────────────────────────────────┘
│
┌─────────────────────────┼─────────────────────────┐
▼                         ▼                         ▼
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│     CLAUDE      │       │   ANTIGRAVITY   │       │    LIVAGENT     │
│ (Arch &amp; Strategy│       │ (Interactive IDE│       │ (Headless Cron  │
│    Reasoning)   │       │  &amp; Fast Code)   │       │   &amp; Telemetry)  │
└────────┬────────┘       └────────┬────────┘       └────────┬────────┘
│                         │                         │
└─────────────────────────┼─────────────────────────┘
│ Standardized MCP &amp; OKF
▼
┌─────────────────────────────────────────────────────────────────────┐
│                    MANTHAN / DNYANKOSH REPOSITORY                   │
│                                                                     │
│   /decisions/        (ADRs: Immutable Architecture Constraints)     │
│   /context/coding/   (Active tasks, coding standards, branch state) │
│   /observability/    (Session JSON telemetry, daily digests)        │
└─────────────────────────────────────────────────────────────────────┘</code></pre>

Because the agent hydrates its state directly from `/context/status-dashboard.md`, `/context/coding/active-coding-tasks.md`, and `/decisions/`, we can swap between Claude, Antigravity, or LivAgent mid-sprint without losing a single line of architectural context.

<div class="pullquote">
“Once institutional memory lives in Git, the foundation model is commoditized into interchangeable compute. We built a resilient, multi-model AI mesh that moves as fast as we can think.”
</div>

## Catalyst 2: The Rise of Specialized Agent Topologies

Once foundation models became interchangeable compute units, we recognized that forcing one model to execute every tier of work is the engineering equivalent of asking your Chief Technology Architect to manually run nightly database backups and resolve Jira tickets. It represents a severe misallocation of capability and latency.

<div class="callout">

**The Multi-Model Topology:** Matching model capabilities to execution constraints transformed our engineering velocity: **Claude** as Principal Deliberative Reasoner (ADRs &amp; governance), **Antigravity** as High-Velocity Synthesizer (fast coding loops &amp; 41% latency reduction), and **LivAgent** as Autonomous Daemon (marathon background cron pipelines).

</div>

Our workload naturally bifurcated into three distinct operational topologies:

### 1. Antigravity: The High-Velocity Pair Programmer

Google’s **Antigravity** (powered by Gemini 3.1 Pro/Flash) integrated into our stack and immediately assumed the interactive development loop:

- **Execution Latency:** Antigravity sessions averaged **1,342 seconds (~22 minutes)** compared to Claude’s **2,275 seconds (~38 minutes)**—a **41% reduction in turnaround time**.
- **Tool-Calling Velocity:** Antigravity handles rapid-fire multi-file operations (`view_file`, `replace_file_content`, `run_command`) with near-instantaneous execution.
- **Massive Token Ingestion:** Ingesting vast repository ASTs, schema files, and test logs without running into strict rate throttling enabled us to complete entire refactorings in a single pass.

### 2. LivAgent: The Autonomous Background Daemon

For operations that require zero human attention, we deployed **LivAgent**. LivAgent operates as an autonomous background daemon executing long-running asynchronous maintenance:

- Conducting nightly ERP ticket triage across 80+ open support issues (fetching tickets, classifying defect categories, updating 200+ database fields, and publishing digests to team channels).
- Executing scheduled git synchronization harnesses (`sync_manthan.py`) and computing rolling daily/weekly metrics.
- LivAgent accounts for over **3.84 million tokens** across 55 sessions, running marathon background jobs (averaging 7,116 seconds) without tying up human developers or burning high-cost interactive quotas.

### 3. Claude: The Chief Architect &amp; Deliberative Reasoner

Does this render Claude obsolete? Absolutely not. Claude has been promoted to our **Principal Architect**.

When we must draft foundational architectural specifications—such as ADR-016 defining our Three-Layer Appropriation Logic for co-lending collections, or evaluating the regulatory boundaries of Direct Assignment Phase 2 under Reserve Bank of India mandates—Claude remains unmatched in structural nuance, cautious reasoning, and adversarial risk analysis. We invoke Claude when the cost of ambiguity is existential.

## Catalyst 3: Sovereign Data Residency &amp; Infrastructure Realities

A pragmatic regulatory mandate also propelled our multi-model migration. As a regulated financial technology platform processing over 600 home loans per month (scaling toward 1,500/month), data sovereignty is non-negotiable under India’s **Digital Personal Data Protection Act (DPDPA 2023)** and client bank SLAs.<sup>[3](#fn3)</sup>

Routing customer financial inference across international cloud regions introduced compliance friction with our institutional banking partners. With **Gemini 3.1** becoming natively accessible within Indian GCP regions (and AWS India partner tiers), we unlocked the ability to run high-throughput document verification, income extraction, and codebase synthesis with **guaranteed domestic data residency**.

## Key Lessons for Engineering Leadership

If your technology team is currently locked into a single AI model or wrestling with ballooning API costs and developer latency, here are three principles from our transition:

### 1. Decouple Memory from Compute

Never permit an AI provider or proprietary platform to become the sole custodian of your organizational memory. Store your architecture decisions, system boundaries, active tasks, and glossaries in plain, version-controlled Markdown. Leverage open protocols like MCP so any agent can attach on demand.

### 2. Match the Model to the Execution Topology

Stop seeking the “one model to rule them all.” A mature enterprise engineering stack demands a portfolio:

- **Deliberative Reasoners (Claude Opus/Sonnet):** For high-governance ADRs, statutory compliance, and system boundary design.
- **Agile Synthesizers (Antigravity / Gemini Pro):** For high-cadence IDE interaction, refactoring, test execution, and harness development.
- **Autonomous Daemons (LivAgent / Flash models):** For scheduled maintenance, ticket enrichment, and telemetry pipelines.

### 3. Measure Everything with Deterministic Observability

You cannot optimize an agentic workflow through intuition. Instrument your tool calls, record token efficiency metrics, track session duration, and inspect error distributions. The moment telemetry demonstrated Antigravity completing coding sessions in half the time of our legacy setup with identical 100% test pass rates, the migration became an obvious engineering decision.

## Conclusion: The Future Is a Multi-Agent Mesh

The public narrative around generative artificial intelligence has long been dominated by the “Model Horse Race”—which AI lab captures the leaderboard crown this week. But in production engineering, **the frontier model is merely an interchangeable component in a larger orchestration harness.**

By pairing Antigravity’s agile execution with Claude’s architectural precision, LivAgent’s tireless background automation, and Manthan’s deterministic Git-backed brain, we achieved something far more valuable than crowning a single winner:

**We built a resilient, multi-model AI mesh that moves as fast as we can think.**

---

<div class="footnotes">
<ol>
<li id="fn1">Manthan Observability captures distributed traces per agent session using JSON logging schemas conforming to OpenTelemetry semantic standards.</li>
<li id="fn2">Architecture Decision Record 015 (ADR-015), “Interim Coding Agent Workspace &amp; Memory Protocol,” Homeville Engineering Standards, June 2026.</li>
<li id="fn3">Digital Personal Data Protection Act, 2023 (DPDPA), Section 16, establishing data localization mandates and restrictions on cross-border processing of sensitive financial datasets.</li>
</ol>
</div>
