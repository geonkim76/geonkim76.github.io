---
title: Normalizing in-process data by killing the manual-entry bottleneck
order: 4
context: SK Battery America · 2023–present
role: Business Systems Analyst · automation lead
stack: Process Automation · API & Data Audit · Logic Debugging · On-site Validation · HQ Coordination
timeline: ~5 months (incl. 3-month phased rollout)
summary: >-
  Resolved 100+ monthly in-process data mismatches by automating the
  manual-entry step that produced them — and surfaced an upstream HQ
  calculation error along the way. Net effect over three months:
  ~30% better data integrity, ~10% less manual labor.
---

## Problem

In-process data was generating 100+ mismatches every month. The
mismatches came from two sources tangled together: manual data
entry on the floor, and irregularities in equipment-side reporting.
Each mismatch then required a manual correction pass, so the team
was burning sustained operator hours on rework that produced no new
information — it just restored what should have been recorded
correctly the first time.

The structural issue was that a specific, narrow step in the
production sequence required hand-entered data, and that step was
where most mismatches started. Everything downstream inherited the
errors.

## Approach

I started where the data actually lived — site visits to watch the
manual-entry step happen, plus a full audit of the upstream APIs
and data feeds. The combined view made the bottleneck obvious: one
specialized process step couldn't be served by the existing
automation surface, so an operator was filling in the gap by hand.

From there:

- I worked with the engineering team to design and deploy
  automation specifically for that step, removing the manual entry
  entirely
- While instrumenting the automation, I read through the legacy
  logic the equipment was using and handed a clean writeup back to
  the dev team — some of that institutional knowledge had quietly
  been lost
- During rollout I caught a calculation error in the HQ-provided
  formula being applied at a later step, escalated it with a
  corrected version, and got the fix propagated

Rollout was phased: two weeks of on-site training around the cutover,
then three months of measured rampup so I could see the integrity
curve and intervene if it stalled.

## Outcome

- **~30% improvement in data integrity** measured over the three-month
  post-rollout window
- **~10% reduction in manual labor** on the affected line, freed up
  for higher-leverage tasks
- Surfaced and corrected an upstream HQ calculation error that had
  been silently affecting downstream numbers — independent of the
  primary scope, but probably the highest-trust-impact deliverable
  on the project

## Reflection

The most useful piece of judgment on this one was deciding to
spend a full day on the floor before writing a line of code.
Watching the manual-entry step happen in person made the
automation design obvious; reading specs alone, I would've
designed something that solved a slightly different problem.

Where I'd push harder next time: I treated the HQ logic error as a
side discovery, but it was probably the more strategically
valuable finding. I'd build a habit of explicitly auditing
inherited calculation logic at the start of any data-integrity
project, not just when I happen to trip over it during
implementation.
