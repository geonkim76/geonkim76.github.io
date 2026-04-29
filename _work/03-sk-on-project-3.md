---
title: Reducing recurring asset loss across a multi-stage production handoff
order: 3
context: SK Battery America · 2023–present
role: Business Systems Analyst · cross-functional driver
stack: Label Standardization · Validation Logic · Process Automation · Cross-functional Collaboration
timeline: ~4 months
summary: >-
  Cut monthly asset loss by ~20% on a production handoff that had been
  hemorrhaging six-figure value every month — by classifying the loss
  into distinct root causes and getting four functions (Tech, IT,
  Production, Production Control) to each own one part of the fix.
---

## Problem

The handoff between three production stages — process completion,
reel movement, and the start of the next process — was generating
sustained, six-figure monthly asset loss. Data mismatches and
tracking irregularities at those handoff points meant that material
which had been consumed, moved, or staged was getting recorded
incorrectly, and the cumulative effect was material that the system
believed it had but couldn't actually account for on the floor.

This was the kind of problem that's expensive precisely because no
single team owns it. The symptom shows up at a handoff, which means
no one upstream feels fully responsible and no one downstream can
unilaterally fix it.

## Approach

I worked through a stack of past loss cases and clustered them by
where the failure actually originated. Four distinct patterns
surfaced — and they didn't reduce to one underlying cause:

- **Label format inconsistency**, which made on-floor verification
  unreliable
- **Label-mismatch attachment**, where the wrong label could be
  applied without the system catching it
- **Manual material entry errors** at handoff
- **Process gaps** in the production sequence that left material
  unattributed during transition

For each pattern I scoped a targeted fix and matched it to the
right owner: Tech for label standardization, IT for input
automation and validation logic, Production for the process
sequence, Production Control for cross-functional execution. Most
of the work was the part you don't see in the deck — getting four
different functions aligned on a single rollout schedule and
making sure each fix landed in a way the others could rely on.

## Outcome

- **~20% reduction** in monthly asset loss at this handoff,
  sustained across the post-rollout period
- Standardized labels and added validation eliminated the entire
  class of mismatch-attachment errors at one of the highest-volume
  steps
- The cross-functional pattern — single analyst owning the
  classification, four teams owning execution — got reused for a
  follow-on initiative on a different handoff

## Reflection

This one taught me that "data analyst" is an unfortunate title for
the most valuable part of the job, which is recognizing that a loss
metric isn't *one* problem and refusing to look for *one* fix. The
classification step — splitting four root causes apart cleanly — is
what unlocked execution; without it, every team would have argued
about whose problem it was.

Next time I'd push harder on telemetry from day one. We measured
total monthly loss well, but I had to reconstruct cause-level
attribution from case files; if that classification had been
recorded by default, the diagnosis would've been a week of work
instead of several.
