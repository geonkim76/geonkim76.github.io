---
title: Closing material-tracking gaps during high-frequency line changeovers
order: 2
context: SK Battery America · 2025–present
role: Business Systems Analyst
stack: SAP · SQL · Process Redesign · Cross-functional Collaboration
timeline: ~3 months
summary: >-
  Cut material loss during line changeovers by ~89% by identifying that
  the problem wasn't analytical — it was a gap split across application
  logic and shop-floor process — then fixing both ends in coordination
  with the dev team and production.
---

## Problem

Line job-changes (J/C) happen roughly every ten days — a high-frequency
event in this production environment. But the tracking data we had on
those events was unreliable: material consumption during the changeover
was systematically under- or over-reported, and "loss" entries were
appearing in the data that didn't reflect real loss. The result was that
inventory state right after each J/C couldn't be trusted, which
cascaded into reconciliation work downstream and hid whatever the real
material consumption pattern actually was.

What made it tricky: nobody could point to a single broken thing. The
symptoms looked like a data quality issue, but the data was just
faithfully recording whatever the upstream systems and shop-floor
process actually did.

## Approach

I treated it as a two-track investigation rather than picking one
hypothesis. I traced the data path from the floor through the
application layer, and separately walked the J/C process with
production to see what the people on the floor were actually doing
during a changeover.

That split revealed two distinct root causes, each living in a
different team's territory:

- **Application-side**: a logic error in how material movements were
  recorded around J/C events. I scoped the fix, prototyped the
  corrected logic, and handed the spec to the dev team.
- **Process-side**: a gap in the shop-floor procedure where some
  movements weren't being logged at all during changeover. I worked
  with production to redesign that step so the logging happened
  inside the natural workflow rather than as an extra task.

Deploying both fixes in coordination mattered — fixing only the
application would have left the process gap, and changing only the
process wouldn't have corrected the historical pattern.

## Outcome

- **~89% reduction** in recorded material loss during J/C events,
  comparing the post-deployment baseline to the prior trend
- Tracking accuracy on changeovers restored — inventory state
  immediately after a J/C is now usable for downstream reporting
  without manual correction
- Cleaner upstream data unblocked a couple of recurring analyses that
  had previously been written off as too noisy to run

## Reflection

The lesson I keep taking from this one: when symptoms look like a data
quality problem, the fix is rarely "clean the data." The data is
usually telling the truth about a process that itself is broken. The
useful move is to figure out which team owns each piece of the truth
and get all of them to commit to a coordinated change — which is more
of a stakeholder problem than a SQL problem.

If I were running this again, I'd build the production-team side of
the conversation in earlier. I held off on it until I had the
application-side hypothesis sharper, and that delayed the eventual
process redesign by a few weeks.
