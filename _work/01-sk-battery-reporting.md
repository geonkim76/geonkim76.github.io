---
title: Consolidating fragmented SAP data into a unified analytics layer
order: 1
context: SK On · 2024–present
role: Data Analyst (lead)
stack: SAP (FI/CO) · SQL · Python · Power BI
timeline: ~6 months
summary: >-
  Replaced a brittle, manually-stitched reporting process spanning multiple
  SAP modules with a single analytics layer — cutting recurring reconciliation
  work by ~40% and unblocking new monthly analyses that had previously been
  too expensive to run.
---

## Problem

The monthly close and operational reporting cycle relied on manually
reconciling data across multiple SAP modules. Each cycle consumed
significant analyst time, slowed the close itself, and made any ad-hoc
analysis prohibitively expensive. The brittleness also meant errors caught
downstream often required tracing back through several hand-stitched steps.

The underlying issue wasn't analytical — it was structural. The same data
was being pulled, transformed, and reconciled by different people for
different reports, with no shared source of truth. Every report was a
fresh act of stitching.

## Approach

I started by mapping every recurring report consumed by finance and
operations teams back to its underlying data sources. Two patterns
surfaced quickly: a small set of dimensions (cost center, product family,
period) appeared in nearly every report, and most of the reconciliation
work came from inconsistent transformation logic applied to the same raw
fields.

From there I designed a consolidated extraction layer that:

- Pulled the relevant fields from SAP into a controlled staging area
- Applied transformation logic in one place, version-controlled
- Exposed cleaned tables that the existing report templates could point
  at with minimal change

I rolled it out incrementally — one report at a time, validating outputs
side-by-side against the legacy process before cutover — to avoid
introducing new errors during the transition.

## Outcome

- **~40% reduction** in recurring monthly reconciliation effort
  (~12 analyst-hours/week recovered across the team)
- **3 new monthly analyses** that were previously infeasible became
  routine, including period-over-period variance attribution by product
  family
- Average error-to-resolution time on flagged numbers dropped from
  *days* to *hours*, because lineage was now traceable in one place

## Reflection

The technical work was the smaller half. The harder half was getting
report consumers to trust a new pipeline enough to retire their
hand-stitched versions — which required real time spent on validation,
side-by-side comparisons, and showing my work. If I were doing this
again, I'd front-load that trust-building from week one, not week six.

The bigger lesson: the unit of leverage in operational analytics isn't
the query, it's the contract between data producers and consumers. Tools
change; the contract is what sticks.
