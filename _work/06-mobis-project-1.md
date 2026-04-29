---
title: Eliminating floor-scan latency at the material input station
order: 6
context: Hyundai Mobis (via Brainer Consultancy) · 2023–2024
role: Software Engineer I
stack: C# · SQL Server · Performance Profiling · Stakeholder Partnership
timeline: ~6 weeks
summary: >-
  Cut interlock response time at the material input station by ~27% by
  tuning the C# + SQL Server backend behind the scan — keeping the
  re-scanning safety pattern intact while removing the wait operators
  were seeing on the floor.
---

## Problem

Operators at the material input station scan every component as it
goes onto the line. Each scan triggers a backend check — an interlock
against the WMS state plus a tracking lookup — and the result has to
come back to the floor display before the operator can move on. The
re-scanning itself is a deliberate safety mechanism: even if the data
already exists upstream, scanning again at input catches mismatches,
mis-routed components, and stale state on the floor. We weren't going
to remove it.

The problem was the *check behind* each scan was sluggish. Operators
were visibly waiting for the interlock result to come back. At a
station that sees thousands of scans a day, that wait compounds into
real cycle-time drag — and creates pressure to skip steps, which is
exactly what the safety pattern is supposed to prevent.

## Approach

I treated this as a backend performance problem rather than a
workflow redesign. Walking the floor with operators first made it
clear they weren't asking for fewer scans — they were asking for
faster ones.

Profiled the interlock procedure end-to-end: the C# service handling
interlock logic, and the SQL Server queries doing the WMS comparison
plus duplicate-detection. Two big hits surfaced.

- The comparison logic was doing more work per call than necessary,
  evaluating cases that could have been short-circuited earlier
- The underlying tables were being scanned full-width when narrower
  indexed lookups would do the same job with a fraction of the I/O

I refactored the C# interlock procedure to short-circuit common
cases, rewrote the SQL comparison queries against narrower indexes,
and tightened the contract between the service and the floor display
so results came back without an extra round-trip. The scanning
workflow on the floor stayed identical — operators didn't need to
re-train or change behavior.

## Outcome

- **~27% reduction** in interlock processing time per scan
- Floor-side display latency dropped to near-instant — no visible
  wait between scan and confirmation
- Re-scanning safety pattern preserved fully; performance gains came
  entirely from the backend, with zero shop-floor process change

## Reflection

The most useful judgment call was deciding *not* to redesign the
scanning workflow. The temptation when you see redundancy ("two
scans for the same material") is to remove it — and that would have
been the worst possible move here, because the redundancy *is* the
safety net. Re-framing the work as "make the existing safe pattern
fast enough that operators don't fight it" turned a potential
month-long process redesign into a focused six-week backend
optimization.

What I'd do differently: I'd put telemetry on the interlock service
on day one. I had to reconstruct the latency profile from logs and a
few probe runs; consistent timing instrumentation would have shrunk
the diagnosis phase by half.
