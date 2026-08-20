# Research Log -- TIM issue milestones

**Subject:** TIM issue milestones
**Started:** 2026-08-20
**Status:** complete
**Verdict:** Ten milestones — a chain of five (M0-M4) fixed by dependency, plus five independents. M0 is the CI/test harness, not a bug fix.

## Sources

| # | Source | URL | Retrieved | Digested by |
| --- | --- | --- | --- | --- |
| 1 | The pithos register, TIM jar — all 46 entries with notes, scores and cross-references | `~/pithos/TIM/ideas.md` | 2026-08-20 | Cottus, Briareus, Gyges, Brontes |
| 2 | The same jar as structured data, for deterministic path extraction | `~/pithos/TIM/ideas.json` | 2026-08-20 | Python (not a drone — see below) |
| 3 | The code sweep the entries were derived from | `DOCS/TO_DO.md`, "Code Issues Found" | 2026-08-20 | verified against source in the prior session |
| 4 | The existing write-up of issue #10, including its "Decide this first" section | `DOCS/ISSUE_web_api_wiring.md` | 2026-08-20 | read directly |
| 5 | Repository source — controllers, models, schema, screens, config, CI workflow | the working tree | 2026-08-20 | read directly, and by drones in the prior session's waves |

**A note on what the drones were and were not asked.** They extracted the
*stated* relationships — file paths, dependency phrases, `[[xref]]` links, issue
references, distinction sentences. They were not asked which entries should be
grouped, what order the milestones go in, or whether a milestone is well-formed.
Those are judgements and they are Claude's, made against the decision rule
recorded below.

The file co-location counts in the report were **not** produced by a drone. They
come from a regex over source 2, grouped and counted in Python, because a
miscount there would silently reshape the milestones and a drone cannot be
checked cheaply on arithmetic.

## Research waves

## The frame (written before any research)

**The question.** In what order should TIM's 46 open entries be worked, grouped
into milestones that are each independently shippable and independently
verifiable?

**What decides it.** Four things, and nothing else:

1. **Dependency.** Which entries cannot even be *observed* until another is
   fixed. An entry whose symptom is masked by an earlier bug cannot be verified
   as done, so it cannot close in an earlier milestone.
2. **Co-location.** Which entries touch the same file, method or table. Splitting
   those across milestones means editing the same lines twice and re-testing the
   same path twice.
3. **Verifiability.** Whether the milestone ends in a check a person can actually
   run and watch pass or fail. This is a hard requirement, not a nicety --
   several entries in the jar exist precisely because nothing ever checked them.
4. **Shared root cause.** Which entries are one decision expressed several times.
   Fixing those individually produces three inconsistent half-answers.

**The decision rule.** A proposed milestone is *actionable* if and only if all
four hold:

- **(a) Closed under dependency** -- no entry in it depends on an entry in a
  later milestone.
- **(b) Ends in an observable check** -- a named command, request or screen
  interaction whose result is unambiguous.
- **(c) Closed under co-location and root cause** -- entries touching the same
  file or resolving the same decision are inside it, not split.
- **(d) Sized for a side project** -- completable in roughly one sitting to one
  week of part-time work, not an open-ended programme.

A sequence is *actionable* if every milestone in it is actionable and the
milestones are totally ordered by (a).

**What would mean the answer is "no useful sequence exists":** if the dependency
graph contains a cycle among high-score entries, or if condition (b) cannot be
met for the earliest milestone -- i.e. there is no way to observe success at the
start -- then the honest answer is that a prerequisite piece of work has to come
before any milestone plan, and I will say that instead of inventing an order.


### Wave 1 — what it yielded

Confirmed four dependencies stated outright in the entries (gh#10 unblocking the
sweep; the create route blocking both "not persisted" entries; the missing
request test having been able to catch all three blockers) and three `[[xref]]`
links from code entries to the decision questions that gate them. Critically, it
established that **the stated dependency graph contains no cycle** — every arrow
points from a later concern to an earlier one — which is what made a total
ordering possible rather than a judgement call.

**What it failed to establish.** The drones surface only *stated* relationships.
Two dependencies in the final plan are not written in any entry and were derived
by reading code: that M1's four entries must ship together (routing alone leaves
`/api/jobs` returning 500, because the three column bugs are independent of it),
and that M4 cannot precede M3 (there is nothing to broadcast until writes
exist). Both are recorded in the report as inference, not as extracted fact.

**Why no second wave.** The two remaining unknowns — which side of gh#10 moves,
and whether TIM ships native — are operator decisions, not facts in any source.
A wave aimed at them would return nothing, and saying so is more useful than
running it. Neither changes the *order* of the milestones; both change the size
of one.

## Tartarus -- drone ledger

<!-- TARTARUS:BEGIN -->
### Wave 1 - dependency and co-location graph across the 46 entries
`gemma4:latest` · 2026-08-20 07:57 · wave wall-clock **55.65s**

**Question:** Which entries block which, and which touch the same files?

| Drone | Focus | Status | In (tok) | Out (tok) | Wall (s) | Retries |
| --- | --- | --- | ---: | ---: | ---: | ---: |
| Cottus | every file path, stated dependency, cross-reference and code identifier in these register rows | delivered | 1466 | 2029 | 48.33 | 0 |
| Briareus | every file path, stated dependency, cross-reference and code identifier in these register rows | delivered | 1423 | 1494 | 38.92 | 0 |
| Gyges | every file path, stated dependency, cross-reference and code identifier in these register rows | delivered | 1266 | 767 | 23.73 | 0 |
| Brontes | every file path, stated dependency, cross-reference and code identifier in these register rows | delivered | 1262 | 2518 | 55.65 | 0 |

**Zeus (Claude) since the last wave:** `claude-opus-5`, `claude-sonnet-5` · 44 turn(s) + 32 subagent turn(s) · 644,312 in (new) · 53,477 out · 22,781 of it thinking · 8,049,223 cache-read

### Synthesis and drafting
_Claude only, no drones_ · 2026-08-20 07:59

**Zeus (Claude) since the last wave:** `claude-opus-5` · 21 turn(s) · 30,300 in (new) · 25,338 out · 11,272 of it thinking · 3,880,000 cache-read

### Totals by drone

| Drone | Waves | In (tok) | Out (tok) | Drone-seconds | Failed |
| --- | ---: | ---: | ---: | ---: | ---: |
| Briareus | 1 | 1423 | 1494 | 38.92 | 0 |
| Brontes | 1 | 1262 | 2518 | 55.65 | 0 |
| Cottus | 1 | 1466 | 2029 | 48.33 | 0 |
| Gyges | 1 | 1266 | 767 | 23.73 | 0 |
| **All drones** | 1 waves | **5417** | **6808** | **166.63** | 0 |

**Fleet total:** 1 wave(s) · 5,417 in / 6,808 out tokens · 55.6s elapsed, of which 147.1s was generation.

### Zeus (Claude) totals

| | Turns | In, new (tok) | Out (tok) | of it thinking | Cache-read (tok) |
| --- | ---: | ---: | ---: | ---: | ---: |
| **Claude** | 97 | 674,612 | 78,815 | 34,053 | 11,929,223 |

Models: `claude-opus-5` (65), `claude-sonnet-5` (32). 32 of those turns were subagents.

**What the offload bought:** the drones read 5,417 tokens of source material that never entered Claude's context, and returned 6,808 tokens of structured extract in its place.

<!-- TARTARUS:END -->

_Claude's own usage is metered into the ledger above, per wave, from the session
transcript. It is measured, not estimated, which is why it sits in the same
table as the drone figures rather than in a footnote beneath them._

## What we could not establish

1. **Which side of issue #10 moves** — namespace the controllers under
   `Api::`, or drop `namespace :api` and keep flat controllers.
   `DOCS/ISSUE_web_api_wiring.md` presents this as an open decision with a real
   trade-off (room for `/api/v2` versus a smaller diff), and both are viable.
   **Not researchable** — there is no source that settles a preference. It
   changes M1's size, not its position in the chain.
2. **Whether TIM ships native or is web-only.** This single answer is the
   difference between M6 being an afternoon (delete the native targets) and a
   week (replace four web-only call sites). Also a product decision rather than
   a fact.
3. **Effort per milestone.** Sizes in the report come from reading the code, not
   from having done the work. The *ordering* does not rest on them — it rests on
   the dependency graph — but any schedule built from it would.
4. **Whether the checks pass.** Every milestone is defined by an observable
   check, and not one of them has been run, because M0 does not exist yet. The
   report claims the checks are well-formed, not that they were watched.

Items 1 and 2 are the only two that could reasonably be called decisive, and
both are decisive for *sizing*, not for order. Neither was researched, and the
reason in both cases is that the answer lives with the operator rather than in
any material a wave could reach.
