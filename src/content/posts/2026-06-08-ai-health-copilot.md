---
title: "I Built an AI \u201cSecond Opinion\u201d System for My Own Health\u2014Here\u2019s How It Works"
date: "2026-06-08"
slug: "ai-health-copilot"
year: "2026"
month: "06"
day: "08"
categories:
  - "technology"
  - "health"
excerpt: "I got tired of walking out of a doctor's appointment wondering if it was the right call. So I built an AI-powered personal health memory system to cross-reference prescriptions against global evidence-based medicine."
---

I am a 45-year-old technology executive living in Mumbai. I manage hypothyroidism, monitor borderline glycated hemoglobin (HbA1c), walk every morning along the Worli Seaface, track my cardiac training zones obsessively on a wearable, and log every clinical marker into a personal repository. And along the way, I grew weary of walking out of rushed clinical appointments with a nagging, unresolved question: *Was that the optimal intervention? Did we miss a drug-nutrient interaction? Did anyone evaluate the longitudinal trend?* So I engineered an artificial intelligence system to verify.

<div class="toc">
<div class="toc-title">Table of Contents</div>

- [1. The Structural Reality of Indian Clinical Practice](#the-structural-problem)
- [2. The Three-Tier Intelligence Stack](#three-tier-stack)
- [3. The Diagnostic Protocols in Practice](#what-the-system-does)
- [4. The Memory Infrastructure: Manthan](#memory-infrastructure)
- [5. The Physiological Fitness Layer](#the-fitness-layer)
- [6. Philosophy: You Are Your Own Principal Investigator](#principal-investigator)

</div>

## The Structural Reality of Indian Clinical Practice

Urban healthcare in India possesses remarkable virtues: top-tier specialists are accessible, diagnostic labs return comprehensive panels in hours, and out-of-pocket costs remain manageable compared to Western systems. But the infrastructure is chronically overextended. A leading endocrinologist in Mumbai frequently consults sixty patients in a single outpatient shift.

A fifteen-minute consultation simply cannot accommodate cross-referencing your four-year thyroid stimulating hormone (TSH) trajectory against current American Diabetes Association protocols, verifying supplement timing against gut absorption kinetics, and reviewing heart rate variability changes during summer heat waves. The resulting clinical oversights are rarely negligent; they are strictly structural. My system was designed to bridge that structural chasm.

## The Three-Tier Intelligence Stack

The architecture operates as three concentric tiers of clinical evidence:

### Tier 1: Personal Ground Truth

Everything anchors to objective, verifiable empirical markers:

- **Longitudinal Lab Panels (2022–Present):** Serial measurements of TSH, HbA1c, Vitamin D3, lipid subfractions, and complete blood counts stored as structured PDFs.
- **Medication &amp; Supplement Matrix:** Granular tracking of compound names, active ingredients, dosage timing, and meal proximities.
- **Cardiovascular Telemetry:** Heart rate zone distribution (Zone 1 through Zone 5) extracted from wearable fitness monitors.
- **Clinical Chronology:** An immutable timeline detailing prior physician diagnoses, therapeutic alterations, and symptomatic episodes.

<div class="callout">

**The Clinical Hierarchy:** Longitudinal personal biomarkers (Tier 1) establish the empirical ground truth. Global evidence-based medicine (Tier 2) supplies the evaluative standard. Local clinical realities (Tier 3) contextualize brand names and polypharmacy risks without compromising international thresholds.

</div>

### Tier 2: Global Evidence-Based Medicine (EBM)

The analytical agent is configured to emulate a **Senior Clinical Research Associate**. It evaluates every proposed regimen against established international standards: Mayo Clinic clinical reviews, National Institute for Health and Care Excellence (NICE) guidelines, American College of Cardiology standards, and American Diabetes Association (ADA) criteria. Its directive is explicit: *assume local clinical practitioners may be constrained by time, and aggressively identify therapeutic gaps.*

### Tier 3: Indian Clinical Contextualization

The system is calibrated for the specific realities of Indian pharmacology: mapping commercial brand names (such as Supradyn, Folwhite, and Neurobion Forte) to active chemical entities, accounting for regional dietary patterns, and adjusting cardiovascular baselines for Mumbai’s tropical summer humidity.

<div class="pullquote">
“The doctor is responsible for their fifteen-minute window. The pharmacist is responsible for the prescription. But nobody is responsible for the longitudinal synthesis of your health—unless you become your own Principal Investigator.”
</div>

## The Diagnostic Protocols in Practice

Whenever a new prescription is issued, a diagnostic panel returns, or an unfamiliar symptom emerges, the system executes four analytical passes:

### 1. Kinetic Gap Analysis &amp; Nutrient Interactions

The immediate query is always: *What has been overlooked?* In my own case, I had been instructed to take a high-potency multivitamin alongside my morning levothyroxine. No practitioner flagged an issue. The system immediately flagged a severe pharmacokinetic conflict: divalent minerals (calcium, magnesium, zinc) chelate levothyroxine within the gastrointestinal tract, diminishing absorption by up to 40%.<sup>[1](#fn1)</sup> Shifting the multivitamin to post-dinner resolved the issue, and my serum TSH stabilized at the subsequent quarterly draw.

### 2. The Physician’s Brief

The system generates a concise, jargon-free briefing document titled **“For My Review.”** Instead of arriving at an appointment with unfocused anxiety, I enter the consultation room with three to four targeted clinical questions:

- *“My HbA1c is 6.5%—precisely on the ADA diagnostic boundary.<sup>[2](#fn2)</sup> What is your specific glycemic target for my risk profile, and what is your threshold for pharmacological initiation?”*
- *“Given my cardiovascular aerobic baseline, should we establish an updated echocardiogram before expanding resistance load?”*

### 3. Countering Anchoring Bias via Differential Checklists

Clinicians naturally fall prey to **anchoring bias**—attributing any new symptom to an existing diagnosis. Because my hypothyroidism is well documented, chronic fatigue is reflexively dismissed as a thyroid symptom. The system counteracts this by synthesizing an objective differential diagnosis checklist, ensuring that alternative or co-morbid factors (such as latent iron-deficiency anemia indicated by a 12.9 g/dL hemoglobin baseline) are rigorously investigated.

### 4. Polypharmacy &amp; Toxicity Monitoring

When multiple clinicians prescribe supportive supplements, cumulative dosages frequently exceed safe thresholds. Cross-referencing three co-prescribed formulations revealed that my combined daily Pyridoxine (Vitamin B6) intake was approaching chronic neurotoxicity limits.<sup>[3](#fn3)</sup> The system identified the cumulative risk where individual prescribers saw only benign vitamins.

## The Memory Infrastructure: Manthan

This clinical intelligence pipeline rests upon the exact same engineering architecture I use for software systems. In my private GitHub repository (`manthan`), health telemetry is version-controlled and auditable:

<pre><code>context/health/          &larr; Longitudinal lab registers, active supplement protocols
observability/sessions/  &larr; Timestamped JSON traces of every clinical analysis
prompts/clinical/        &larr; Validated clinical review and interaction prompt templates
harnesses/health/        &larr; Data-parsing scripts extracting metrics from lab PDFs</code></pre>

## The Physiological Fitness Layer

Biochemical markers represent only half the physiological reality; dynamic cardiovascular conditioning represents the other. Telemetry from morning training sessions feeds a structured walk tracker capturing heart rate zone distributions (Zone 1 through Zone 5). By logging session temperature, we normalize for the 8–10 bpm cardiac drift caused by Mumbai’s May heat, ensuring physiological exertion is never mistaken for cardiac pathology.

## Philosophy: You Are Your Own Principal Investigator

This system does not replace my physician; it dramatically elevates the quality of our collaboration.

In medical research, the **Principal Investigator** is the individual charged with total accountability for protocol integrity, data anomalies, and longitudinal outcomes. In modern commercial medicine, that role is systematically vacant. The specialist handles fifteen minutes. The lab technician handles the blood vial. The pharmacist dispenses the box.

I have stepped into that vacancy for my own life, using artificial intelligence as an untiring research associate.

The immediate horizon for this architecture is continuous multi-stream synthesis. I am expanding the data ingestion harness to integrate nocturnal sleep architecture telemetry, continuous glucose dynamics, and travel-induced circadian stressors. Technology cannot grant physical immortality, but it can eliminate unforced clinical oversights. In an overextended medical landscape, the most consequential system you will ever architect is the one that protects your own health.

---

<div class="footnotes">
<ol>
<li id="fn1">Divalent cations (including calcium carbonate, ferrous sulfate, and zinc) form insoluble chelates with levothyroxine within the gastrointestinal tract, significantly impairing bioavailability when co-administered.</li>
<li id="fn2">American Diabetes Association (ADA) Standards of Care define an HbA1c threshold &ge; 6.5% as diagnostic for diabetes mellitus, with the 5.7%–6.4% range denoting impaired fasting glucose / pre-diabetes.</li>
<li id="fn3">Chronic daily intake of Pyridoxine (Vitamin B6) exceeding 100 mg/day carries well-documented risks of progressive sensory peripheral neuropathy, frequently masked by supplement stacking in multivitamin combinations.</li>
</ol>
</div>
