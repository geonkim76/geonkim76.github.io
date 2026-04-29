---
title: Tracking and forecasting LLM-keyword trends across 385K arXiv abstracts
order: 8
context: UPenn · CIS 5450 (Big Data Analytics) · 2026
role: Part 2 lead within team project (geon branch)
stack: Python · pandas · DuckDB · NLTK · ARIMA / Prophet · matplotlib · Jupyter
timeline: ~1 semester
summary: >-
  Built a time-series pipeline tracking the emergence and growth of
  LLM-related keywords (transformer, RLHF, RAG, LoRA, instruction
  tuning) across cs.AI/CL/LG abstracts — and forecast 2024+ paper
  volume with ARIMA and Prophet. Instruction Tuning grew 1,306% YoY,
  and ARIMA (MAPE 10.1%) beat Prophet (15.1%) on the held-out window.
links:
  - label: Source on GitHub (geon branch)
    url: https://github.com/AKing2713/CIS5450/tree/geon
  - label: Full team submission
    url: https://github.com/AKing2713/CIS5450
---

## Problem

LLM-era research is moving fast — techniques like transformers,
RLHF, RAG, LoRA, and instruction tuning emerge and accelerate
quickly. From outside the literature it's hard to read which
techniques are actually getting traction, when they first emerged,
and how fast they're growing.

The team's question: can we use the full arXiv metadata snapshot
to surface the LLM keyword timeline empirically and forecast where
paper volume is heading.

## Approach

Loaded the cleaned arXiv data with DuckDB on top of parquet and
filtered to `cs.AI`, `cs.CL`, and `cs.LG` — about 385K papers from
2007 through 2025. Extracted the original submission date from the
`versions` column (v1 entry), since that's the meaningful timestamp
for trend analysis, not the update date that arXiv displays.

For keyword tracking I defined a curated set (transformer, LLM,
RLHF, RAG, LoRA, instruction tuning, …) and matched each against
raw abstracts with case-insensitive word-boundary regex — so "RLHF"
hits the acronym and "reinforcement learning from human feedback"
hits the long form. For each keyword I computed:

- Monthly count
- Share of monthly corpus (normalises for overall growth)
- First-emergence month
- Year-over-year growth rate

For forecasting I trained on 2015–2023 and tested on 2024+. ADF
stationarity test plus ACF/PACF analysis pointed at
SARIMA(1,1,1)(1,0,1)[12]. I also fit Prophet out-of-the-box with
default changepoint detection, and compared the two head-to-head
on MAE / MAPE.

## Outcome

- **~385K cs.AI/CL/LG papers tracked, 2007–2025** — exponential
  paper-volume growth since 2017, with a steep acceleration from
  late 2022
- Transformer was near-zero pre-2017; LLM mentions now exceed 47K
  and Transformer exceeds 18K in this corpus
- RLHF / LoRA / RAG first appeared 2020–2021; **Instruction Tuning
  grew 1,306% YoY** between 2022 and 2023 — the fastest emerging
  keyword in the set
- **ARIMA: MAE 658, MAPE 10.1%** on the held-out window — beat
  Prophet (MAE 1,081, MAPE 15.1%) on this series
- Prophet projects continued growth for LLM, RAG, and LoRA into
  2025–2026

## Reflection

Two things stood out.

**ARIMA beat Prophet, which surprised me.** Prophet has the
friendlier API and changepoint detection by default — I expected
it to win. But the underlying series (monthly cs.AI/CL/LG paper
volume) had clean seasonality and a stable trend that SARIMA
modeled cleanly, while Prophet's changepoint detection over-fit on
noise. When the series is well-behaved, the simpler model often
wins.

**Keyword choice and matching mattered more than model choice.**
Word-boundary regex with both acronym and long-form patterns
("RLHF" + "reinforcement learning from human feedback") is what
made the counts meaningful. Sloppier matching would have collapsed
the signal — you'd see "RAG" matching "drag" and lose the trend.

What I'd do differently next time: extend the keyword set with
embedding-based discovery rather than curating it by hand. The
current set catches well-known terms, but the next breakthrough
technique entering 2025–2026 could emerge faster than a
hand-curated list updates.

The team project also covered TF-IDF + K-Means clustering on
abstracts and category co-occurrence / LDA topic modeling — see
the [geon branch](https://github.com/AKing2713/CIS5450/tree/geon)
for my Part 2 contribution and the
[main repo](https://github.com/AKing2713/CIS5450) for the full
submission.
