---
title: Building a dashboard layer for four cross-functional teams
order: 5
context: SK Battery America · 2025–present
role: Business Systems Analyst · dashboard owner
stack: Power BI / Tableau / Spotfire · SQL · Multi-team Requirements
timeline: ongoing — 20 dashboards delivered
summary: >-
  Designed and shipped ~20 dashboards across Production Control,
  Production, Tech, and QC — replacing a sprawl of hand-rolled,
  per-meeting spreadsheets with a shared, real-time view that each
  team can actually trust as a source of truth.
---

## Problem

Four functions — Production Control, Production, Tech, and QC —
were each running their own data aggregation by hand. Spreadsheets
got rebuilt every reporting cycle, each team's view of "the same"
metric drifted from the others, and operational decisions were
being made on numbers that were stale by the time they showed up
in a meeting. There was no shared real-time picture that anyone
could point to and say *this is what's true right now.*

The cost wasn't just analyst hours; it was that meetings spent
the first ten minutes reconciling whose number was right.

## Approach

I treated each dashboard as a small product, not a one-off report.
The pattern that worked:

- Sit with the team that would consume it, before designing
  anything, and figure out what decision the dashboard was
  supposed to support — not what data they thought they wanted on
  the page
- Pin down the canonical source for each metric, in writing, so
  that "their number" and "my number" stopped diverging
- Ship a v1 quickly, watch how the team actually used it for a
  week, then revise — most of the useful design feedback came
  from observed use, not from review meetings

Across the four teams I built and shipped roughly 20 dashboards on
this pattern. Each one was scoped to a specific decision cycle
(daily standup, weekly review, monthly close, etc.) so the
refresh cadence and level of detail matched how the team actually
worked.

## Outcome

- ~20 dashboards across four functions in production use, covering
  daily, weekly, and monthly decision cycles
- Real-time visibility replaced manual data aggregation as the
  default for these teams
- Cross-team meetings stopped opening with "whose number is right"
  — alignment on the canonical metric source was a quieter but
  meaningful unlock
- Specific time-savings numbers for each consuming team are still
  being collected; happy to share the latest figures on request

## Reflection

The thing I underestimated going in was how much of the value came
from agreeing on metric definitions, not from the dashboard itself.
The Tableau view was the artifact, but the shared definition was
the actual deliverable — once two teams committed to the same
denominator, half their reconciliation arguments disappeared.

If I were doing this again I'd carve out time for a small
"definitions doc" per metric — short, in the team's own language —
to live alongside the dashboard. A few teams started doing this
informally and it became one of the most-referenced artifacts of
the rollout.
