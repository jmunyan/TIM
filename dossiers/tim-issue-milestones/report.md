# TIM issue milestones

**Question:** In what order should TIM's 46 open entries be worked, grouped into
milestones that are each independently shippable and independently verifiable?

**Answer:** Ten milestones, in a chain of five (M0 → M4) that must run in order
because each is unobservable until the one before it lands, plus five (M5 → M9)
that are independent and can be picked up at any time. The first milestone is
not a bug fix — it is making the build able to tell you when something is
broken. · **Confidence:** High on the ordering, which rests on the dependency
and co-location evidence below. Medium on the milestone *sizes*, which rest on
reading the code rather than on having done the work.

## Why this matters

There are 46 open entries and no order to them. Worked by score alone, the top
of the list is four entries that all live in the same 30-line controller and one
that cannot be verified at all, because nothing in this repository currently
runs a check. The risk is not picking the wrong issue; it is spending a weekend
fixing three real bugs and having no way to know whether any of them worked.

Two facts make the ordering non-obvious, and both were established rather than
assumed:

- **Fixing issue #10 does not make the app work.** Its own write-up says fixing
  it unblocks most of the sweep, and that is true — but `GET /api/jobs` still
  returns 500 afterwards, because the controller reads three things that do not
  exist in the schema. Routing and the three column bugs have to ship together
  or the milestone has no green state to end on.
- **The hottest file is not the one with the worst bugs.**
  `WEB/app/(tabs)/schedule.tsx` is touched by 8 of the 46 entries — more than
  any other file — but they belong to five different milestones.

## What we found

### The dependency chain

Four dependencies are stated outright in the entries themselves (Wave 1,
`kind='dependency'`):

| Entry | States |
| --- | --- |
| gh#10 | "Fixing it unblocks most of the sweep entries" |
| Create ticket creates nothing | "Blocked by the missing create route" |
| No route creates or updates a job | "Blocks the two 'not persisted' entries" |
| Tests cover models only | "would have caught all three blocking entries" |

Three more are cross-references between entries (`kind='xref'`):
`broadcast_update is never called` → the live-updates architecture question;
`the new-ticket form collects parts the schema cannot store` → the job wizard
question; `two competing time-tracking mechanisms` → the project-management
scope question. In each case the question has to be answered before the code
entry can be closed, because the code entry's fix depends on the answer.

**There is no cycle.** Every stated dependency points from a later concern to an
earlier one, so a total order exists.

### The co-location clusters

Computed deterministically over all 46 notes — file paths extracted by regex,
grouped and counted in Python rather than by a drone, because counting is where
drones quietly go wrong:

| File | Entries | Scores |
| --- | ---: | --- |
| `schedule.tsx` | 8 | 10, 10, 8, 7, 6, 5, 5, 4 |
| `jobs_controller.rb` | 5 | 10, 10, 10, 8, 7 |
| `auth.tsx` | 4 | 10, 8, 5, 3 |
| `new-ticket.tsx` | 4 | 9, 8, 7, 4 |
| `schema.rb` | 3 | 10, 7, 6 |
| `MoveTicketDialog.tsx` | 3 | 8, 5, 3 |
| `routes.rb`, `connection.rb`, `DropdownMenu.tsx` | 2 each | — |

Nine entries cite no file at all. Those are decisions, not edits, and three of
them gate code entries — which is why they appear at the *head* of a milestone
rather than as work items inside it.

### The verification gap

Every milestone below ends in an observable check. Today, none of those checks
can run:

- `API/.github/workflows/ci.yml` is not at the repository root, so GitHub Actions
  has never executed it — Brakeman, RuboCop and the test job have all never run.
- The 35 existing tests are model tests. `API/test/controllers/` and
  `API/test/integration/` contain only a `.keep`; `API/test/channels/` does not
  exist.
- `WEB/package.json` has no `test` script.

This is why M0 exists and why it comes first.

## The answer

### The chain — these must run in order

**M0 · Make failure visible.** Move `API/.github/workflows/` to the repository
root; add one request test for `GET /api/jobs`; add a `test` script to
`WEB/package.json`.
*Entries: CI has never run (9), Tests cover models only (8), No front-end tests (5).*
**Done when:** a push produces a CI run, and that run is **red** on `/api/jobs`.
A red run is the success condition — it is the first time this repository has
been able to state its own condition.
**Why first:** it depends on nothing, it is the cheapest item in the jar, and
every milestone after it borrows its check.

**M1 · `GET /api/jobs` returns 200.** The routing half of gh#10 plus the three
blockers, which all live in the same file.
*Entries: gh#10 routing half (10), jobs has no organization_id (10), job.color vs has_many :colors (10), notes/description are not columns (10), session route paths disagree (4).*
**Done when:** M0's request test goes green.
**Contains two decisions, not just fixes:** does `organization_id` go onto
`jobs`, or does the tenant scope reach through `customer`? And do `notes` and
`description` become columns, or leave the payload? Both change the migration.

**M2 · A user can log in.** The base-URL half of gh#10, a login screen, and real
tokens.
*Entries: gh#10 base-URL half (10), nothing ever calls login (10), authFetch rebuilt every render (5), default auth context returns empty 200 (3).*
**Done when:** you log in in a browser and the schedule lists real jobs.
**Do not skip the token work here.** `DOCS/ISSUE_web_api_wiring.md` is explicit
that fixing the routing makes a forgeable scheme *reachable* — the token is the
user id, and CORS is `origins '*'`. M1 shipped anywhere public without M2 is the
one genuinely dangerous ordering in this plan.

**M3 · Writes persist.** The create/update routes and the three screens that
pretend to save.
*Entries: no route creates or updates a job (9), create ticket creates nothing (9), moving a ticket is not persisted (8), save settings discards every field (7).*
**Gated by a decision:** *what should the job wizard collect* (3) and *the
new-ticket form collects parts the schema cannot store* (7) must be answered
first — the create endpoint's shape depends on whether "parts" become a table.
**Done when:** create a ticket, refresh, it is still there; move it, refresh, it
stayed moved.

**M4 · Live updates actually update.**
*Entries: how should TIM deliver live updates (8) — the architecture decision, first; broadcast_update is never called (8); Action Cable does not reject a tokenless connection (8); subscription failures are invisible (6); bare rescue masks errors (5); plus the Action Cable origin check from gh#10's write-up.*
**Done when:** two browsers open, move a ticket in one, it moves in the other.
**Why last in the chain:** there is nothing to broadcast until M3 exists.

### The independents — any time, in any order

**M5 · One section list instead of three.** Decide *prep vs prep/wash* (2)
first, then: sections matched against `area.name` with nothing keeping them in
sync (7), the list duplicated verbatim in two files (5), and `Ticket.location`
contradicting both (5). **Done when:** renaming an area in the database cannot
silently empty a column.

**M6 · Decide web-only or native.** *Web-only APIs in an app that ships native
targets* (8) is one entry but two different jobs depending on the answer: if TIM
is web-only, most of it closes by removing the native targets; if not, four
separate call sites need replacing. **Done when:** either `expo start --android`
boots, or the native targets are gone from `app.json`.

**M7 · Data-model decisions.** Soft deletes never applied (7), two competing
time-tracking mechanisms (6), colour belongs to both customer and job (5),
should project management live inside TIM (6). None blocks the chain; all get
more expensive with every query written against the current shape.

**M8 · Cleanups.** Eleven entries, scores 2–6, no dependencies, no decisions:
ticket detail shows fabricated data (6), gh#4 light-mode text (5), part id
collisions (4), menu always opens user 1 (4), PrimeReact pinned light (4), gh#5
theme toggle (3), dialog note not cleared (3), dead CORS config (3), Task has no
validations (3), TicketCard prints PO twice (2), Kamal placeholder (2).

**M9 · Project hygiene.** Pick a tracker (3), migrate the to-do list (gh#6, 3),
contributor launch instructions (4), audit print template format (5).

### Where the rule does not cleanly hold

The decision rule required each milestone to be closed under co-location. Two
milestones break that, and both are deliberate:

- **`jobs_controller.rb` is visited twice** — four entries in M1, and
  `broadcast_update` in M4. Moving it into M1 would satisfy the rule but produce
  an unverifiable change, since nothing can broadcast until M3. The second visit
  is cheap because the method is a standalone block at lines 29–34, disjoint
  from the `index` action at 4–26.
- **`schedule.tsx` is visited five times** — M2, M3, M4, M5, M8. This is the real
  cost of the plan. It is tolerable only because the entries occupy disjoint
  regions of the file: lines 35–54 (fetch and auth), 56–88 (the socket), 13–23
  with 147–153 (sections), 167–180 (the move handler), and line 6 (the
  PrimeReact import). No two milestones edit the same lines.

## What would change this

- **If issue #10 is resolved by flattening the routes rather than namespacing the
  controllers**, M1 shrinks but leaves no room for `/api/v2`. The choice is
  recorded as undecided in `DOCS/ISSUE_web_api_wiring.md` and is the user's, not
  a fact to be researched.
- **If TIM is web-only**, M6 nearly vanishes and the score-8 native entry drops
  to a deletion.
- **If "parts" become a real table**, M3 grows a migration and should probably
  split into M3a (routes and persistence for what already exists) and M3b (parts).
- **If the deployment target is ever public before M2**, the ordering changes
  from a convenience to a security requirement.

## Options and trade-offs

The one real choice in the sequencing is **where M0 goes**.

- **M0 first (recommended).** Costs a few hours before a single bug is fixed.
  Buys a red/green signal that every later milestone reuses. Forecloses nothing.
- **M0 skipped, start at M1.** Buys the satisfaction of fixing the worst bug
  first. Costs the ability to know it worked — and the three M1 blockers are
  exactly the class of bug (a missing column, a wrong association, two absent
  attributes) that a single request test catches instantly and manual clicking
  does not. Given that this repository already shipped all three undetected,
  this option has been tried.

## What we do not know yet

- **Which side of gh#10 moves** — namespacing the controllers or flattening the
  routes. Not researched, because it is not researchable: the write-up presents
  it as an open decision for the operator, and both options are viable. It
  changes M1's size, not its position.
- **Whether TIM ships native.** Same character — a product decision, not a fact.
  It is the only thing standing between M6 being an afternoon and a week.
- **Actual effort per milestone.** Sizes here come from reading the code, not
  from having done the work. The ordering does not depend on them; the
  scheduling does.
- Not a gap, but worth stating: **no milestone here has been executed**, so the
  claim that each ends in an observable check is a claim about the checks, not a
  report of having watched them pass.

## Sources

See `research.md` for the full source list, the drone roster and the Tartarus
ledger.
