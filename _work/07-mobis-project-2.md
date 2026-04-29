---
title: Speeding up the dashboards Production Control runs the day on
order: 7
context: Hyundai Mobis (via Brainer Consultancy) · 2023–2024
role: Software Engineer I
stack: React · Next.js · SQL Server · Query Optimization · Materialization
timeline: ~3 months
summary: >-
  Cut average load time on Production Control's daily dashboards by
  ~17% by adding a materialization layer and rewriting queries against
  it — the views PC reads to call yield each morning are now ready
  when they open them, and one of them surfaced a recurring
  workstation-level material bottleneck.
---

## Problem

Production Control runs the day on a small set of self-built
dashboards. They open them every morning to read off the previous
day's yield, identify which workstations underperformed, and decide
where to focus floor effort. The dashboards were React/Next.js apps
wired to SQL Server, and over time they'd gotten slow: pages took
long enough to load that PC was feeling the friction in their daily
standups.

Slow dashboards aren't just an annoyance — when the tool you use to
call yield decisions is sluggish, you start *not* using it. PC was
already doing some of their analysis offline because they couldn't
wait on the dashboard, which defeated the point of building it.

## Approach

Started where the team felt the pain: a few specific views PC opened
most. Profiling those views surfaced two structural issues, neither
of which was a bug — they were design choices that had aged poorly.

The big tables behind the dashboards were being full-scanned on
every load. There was no materialization or aggregation layer, so
each page render hit the raw transactional data. And the queries
weren't taking advantage of how the data was actually used in
practice — mostly day-grain, mostly recent.

- Added a thin materialization layer at the right grain (day ×
  workstation × material), updated nightly so the morning view was
  ready before PC opened it
- Rewrote the dashboard queries to hit the materialized layer
  instead of raw tables, eliminating the worst full-scans
- Cleaned up a few render paths in the React app that were fetching
  more data than the visible view actually needed

## Outcome

- **~17% reduction** in average dashboard load time
- Daily yield call moved earlier in the standup because the
  dashboard was ready when the meeting started
- One specific find: a recurring drop on a particular workstation
  traced back to an upstream material-supply pattern — exactly the
  kind of insight the dashboard existed to surface, but had been
  hidden behind the load delay

## Reflection

The lesson here was about query *patterns*, not query optimization.
The dashboards were fine when first built — small data, exploratory
use. As the data grew and the team's behavior shifted toward "open
the dashboard every morning at the same time," the access pattern
changed in a way the original design never accommodated. The
materialization layer wasn't clever; what was clever was noticing
that "every PC user opens this view at 8am" meant precomputation
was almost free.

What I'd do differently: I'd build a small "what's slow" telemetry
view from the start that surfaced load-time per dashboard. We had
the data; we just weren't watching it. The project itself would
have been triggered earlier, with less of the team having quietly
worked around the dashboards in the meantime.
