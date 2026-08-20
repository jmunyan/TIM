**this is moving to the githuib issues. I need to get some more things done before playing with AI automations**

## GitHub Issues (open)
- #10 — Web app can't reach the API: route/controller namespace mismatch + unconfigured base URL (bug) — https://github.com/jmunyan/TIM/issues/10
- #6 — move to do list to project (documentation) — https://github.com/jmunyan/TIM/issues/6
- #5 — change the theme button to a toggle switch (enhancement) — https://github.com/jmunyan/TIM/issues/5
- #4 — some text not visible in light mode (bug) — https://github.com/jmunyan/TIM/issues/4

## To Do List
- create repo [DONE]
- create initial project plan [DONE]
- find free project management software and set up a project
    - started using Jira, as it's free for single user teams, but it was a little too feature rich, might try something simpler.
    - track hours with clockify (this first hour was not tracked)
    - GitHub has some features that are free?
    - is Bitbucket free to individuals? Jira is, still haven't checked bitbucket
    - should this be part of the app? :lol: :sweat-smile:
- plan features
    - brainstorm useful and necessary features [DONE]
    - create prioritized list of wanted features
- research what API/Database to use (likely Ruby on Rails since a lot of employers seem to be asking for it) [DONE]
    - using ruby on rails
- research best Framework to use (React vs. Next etc.) [DONE]
- research websockets, up to date information is essential to a production scenario. [STARTED]
    - https://guides.rubyonrails.org/action_cable_overview.html

## WEB
- create page layout/styling
    - soften background on dark mode [IN PROGRESS]
    - add 'ThemedButton' colors to the actual Theme [IN PROGRESS]
    - fix dark/light mode theme change button issues [IN PROGRESS]
    - integrate initial state of d/l theme with browser settings [DONE]
    - menu button doesn't shift when the scroll bar opens causing overlap. move the button over so it fits nicely
- create settings pages [IN PROGRESS]
    - main page file and routing added [DONE]
    - add two sections to the main page
        - user settings
            - save button at bottom of page [DONE]
            - display name, email, and location fields added
        - organization settings 
            - company name and default location fields added
- create inventory page
    - uses DataGrid component from PrimeReact
    - grid style editor
        - only 1 row to start, row added each time a row is added
        - only 1 row active at a time
        - button below the active row to 'add' it to the table
        - columns:
            - name (string)
            - adj. amount (number)
            - total (number)
            - amount after adjustment (number)
            - notes (string)
        - the 'total' column should be uneditable
    - save button below grid
    - pulls limited data from api endpoint for searching, then pulls full data for item after it is selected from the limited search dataset
    - only one row can be edited at a time
- create job wizard
    - develop more specific job wizard requirements
    - make page to match those requirements
- create job editor
    - page/route made, but doesn't have editing capabilities
- create a job page for each section
    - upcoming
    - blast
    - garnet
    - cabinet
    - prep? or should we make it prep/wash?
    - masking
    - powder
    - takedown
- create additional test data
- create auditing tools
    - print template (also useable for job quoting?)
    - how should it be formatted?
- finish "schedule" page [IN PROGRESS]
    - move job dialog created but not styled [DONE]
    - need to test dialog size styling on phone
    - schedule view now supports ticket grouping and move dialog flow

- create launch scripts/instructions for possible other contributors
    - docker? (that's what I have seen used in the past)
    - research other container options

## API
- fix docker container, doesn't start properly.
    - warning about deprecated packages, need to figure out the rest.
- make a lucidchart of the tables
- create migrations in ruby
    - having issues with these
- update controllers
- create testing

## Code Issues Found (codebase sweep, 2026-08-20)

Found by reading the whole codebase and verified against source. Anything already
covered by GitHub issues #4, #5, #6, #10 or by the lists above is **not** repeated
here; where a new item sits close to an existing one, the difference is stated.

### Blocking — /api/jobs cannot succeed, even after the routing fix in issue #10

- **`jobs` has no `organization_id` column, but the controller scopes on it.**
  `API/app/controllers/jobs_controller.rb:5` does `where(organization_id: current_user.organization_id)`;
  the jobs table (`API/db/schema.rb:59-71`) has only customer_id, area_id, ticket_no,
  completed_on, powder_used, deleted_at, timestamps. The query raises
  `no such column: jobs.organization_id`. `Job` also has no `belongs_to :organization`,
  and `broadcast_update` reads `job.organization_id` at line 30.
  *Differs from issue #10:* that item is about the tenant scope being **forgeable**;
  this is that the scope **does not run at all** because the column is missing.
- **`job.color` is not a thing.** `Job` declares `has_many :colors`
  (`API/app/models/job.rb:6`), but the controller calls singular `job.color&.name`
  (`jobs_controller.rb:18`) — NoMethodError.
- **`job.notes` and `job.description` are not columns.** Rendered at
  `jobs_controller.rb:17` and `:19`, absent from the jobs table. The front end maps
  both into every ticket (`WEB/app/(tabs)/schedule.tsx:45,47`).

### API

- **No route creates or updates a job.** `API/config/routes.rb:11-15` declares only
  `POST /api/sessions`, `DELETE /api/session`, `GET /api/jobs`. The new-ticket form and
  the move-ticket dialog have no endpoint to call.
- **Session route paths disagree:** `post 'sessions'` (plural) vs `delete 'session'`
  (singular), `routes.rb:12-13`.
- **`broadcast_update` is never called.** `jobs_controller.rb:29-34` is a public method
  on the controller that nothing invokes, so no job change is ever broadcast — live
  updates cannot fire even once the socket connects.
- **A missing Action Cable token is not rejected.**
  `API/app/channels/application_cable/connection.rb:13` returns nil when no token is
  present (only the `rescue` calls `reject_unauthorized_connection`), so
  `ScheduleChannel#subscribed` then calls `.organization_id` on nil
  (`API/app/channels/schedule_channel.rb:3`).
- **Bare `rescue` swallows everything.** `connection.rb:14` catches any StandardError,
  so an unrelated bug in the connection path is reported as a failed login.
- **Soft deletes are never applied.** Ten of the eleven tables carry a `deleted_at` column
  (`API/db/schema.rb` -- all but `areas_links`), and no model has a default scope or filter for it — every
  query returns deleted rows.
- **A `Color` belongs to both a customer and a job, both optional**
  (`API/app/models/color.rb:2-3`). Nothing enforces exactly one, and it isn't defined
  whether a color row is a customer's palette entry or a job's chosen coating.
- **Two competing time-tracking mechanisms.** `tasks.started_at`/`stopped_at`
  (`schema.rb:111-121`) and the whole `punches` table (`schema.rb:90-99`). Decide which
  is authoritative before either is used.
- **Dead duplicate CORS config.** `API/config/initializers/cors.rb` is commented out end
  to end while the live rule sits in `API/config/application.rb:33-38`.
  *Differs from issue #10:* that item is about the `origins '*'` **value**; this is
  about there being two places to look, one of them inert.
- **`Task` is the only model with no validations** (`API/app/models/task.rb`).
- **Kamal deploy target is still a placeholder:** `image: your-user/api`,
  `API/config/deploy.yml:5`.

### CI and tests

- **CI has never run.** The workflow is at `API/.github/workflows/ci.yml`, but GitHub
  Actions only reads `.github/workflows/` at the **repository root**, and there is no
  root `.github/` directory. Brakeman, RuboCop and the test job are all inert.
- **Tests cover models only** — 35 tests across 10 files in `API/test/models/`, and no
  controller, request or channel test anywhere -- `API/test/controllers/` and
  `API/test/integration/` hold only a `.keep`, and `API/test/channels/` does not exist. One request test against `/api/jobs`
  would have caught all three blocking items above.
- **No front-end tests at all.** `WEB/package.json` has no `test` script, and `expo lint`
  is never run by anything.

### WEB

- **Nothing ever calls `login()`.** It is defined at `WEB/context/auth.tsx:26`, imported
  by no component, and there is no login route in `WEB/app/_layout.tsx`. `token` is only
  ever read back from localStorage, which nothing writes — so `if (!token) return;` at
  `schedule.tsx:36` means the schedule is permanently empty.
  *Differs from issue #10:* that is the API returning 404 to a login attempt; this is
  that the client has no screen from which to attempt one.
- **Web-only APIs in an app that ships iOS and Android targets.** Each crashes or no-ops
  on native:
    - `localStorage` unguarded in `WEB/context/auth.tsx:18,19,29,30,36,37`
      (`WEB/context/theme.tsx:25,34` guards the same call with `typeof window`)
    - `alert()` in `WEB/app/new-ticket.tsx:51,62`
    - a raw `<div>` and CSS `float` in `WEB/components/Dialogs/DialogFooter.tsx:8-10`
    - a `'50vw'` unit in `WEB/components/Dialogs/MoveTicketDialog.tsx:73`
- **"Create ticket" creates nothing and says it did.** `new-ticket.tsx:49-64` console.logs
  the payload, shows `alert('Ticket created successfully.')`, and navigates away.
- **Moving a ticket is not persisted.** `schedule.tsx:167-180` updates local state only;
  a refresh reverts it.
  *Differs from "move job dialog created but not styled" above:* that item is appearance,
  this is that the result is never saved.
- **"Save settings" discards every field.** `WEB/app/settings/[userId].tsx:59-64` — the
  button's `onPress` is `router.push('/schedule')`, and none of display name, email,
  company or location goes anywhere.
  *Differs from "save button at bottom of page [DONE]" above:* the button exists, which
  is what was done; it was never wired to anything.
- **The ticket detail page shows fabricated data.** `WEB/app/ticket/[ticketId].tsx:16-19`
  hardcodes "Sample Customer", "Status: New", "Location: Upcoming" and never fetches.
  *Differs from "create job editor" above:* that is the editor page; this is the
  read-only view reached by the "Go To Ticket" button.
- **The section list is duplicated verbatim in two files** — `schedule.tsx:13-23` and
  `MoveTicketDialog.tsx:20-30`.
- **A third section list contradicts both.** The `Ticket.location` union at
  `WEB/constants/Ticket.ts:11` allows `Receiving` and `Shipping`, which exist nowhere
  else, and omits `Garnet`, `Cabinet` and `Invoice`, which both other lists have.
  *Differs from the item above:* that is the same list copied twice; this is a third
  list that disagrees with the copies.
- **Sections are matched against database values with no guarantee they agree.**
  `ticketsBySection` filters on `ticket.location === section` (`schedule.tsx:150`), and
  `location` is `area.name` straight from the DB (`jobs_controller.rb:16`). Any area
  whose name isn't exactly one of the nine strings drops its tickets silently.
  *Differs from the two items above:* those are code disagreeing with code; this is code
  disagreeing with the database.
- **`authFetch` is rebuilt on every AuthProvider render** (`auth.tsx:40`, not memoised)
  and sits in the effect's dependency array (`schedule.tsx:54`), so jobs are refetched
  whenever the provider re-renders, not only when the token changes.
- **Subscription failures are invisible.** The socket's `onmessage`
  (`schedule.tsx:71-83`) handles only `ping` and `job_updated`, ignoring Action Cable's
  `confirm_subscription` and `reject_subscription`. Given the nil-user rejection above,
  a rejected subscription looks exactly like an idle connection. `onclose` only logs —
  there is no reconnect.
- **Part ids collide.** `addPart` uses `id: prev.length + 1`
  (`new-ticket.tsx:36`), so removing part 2 of 3 and adding one yields two parts with
  id 3 — and `id` is the React key.
- **The new-ticket form collects data the schema cannot store.** Parts, quantities and
  masking flags (`new-ticket.tsx:7-13`) have no table; the schema goes jobs -> tasks with
  no parts concept.
- **The menu always opens user 1's settings.** `WEB/components/DropdownMenu.tsx:38`
  pushes `/settings/1` regardless of who is signed in.
- **PrimeReact is pinned to a light theme.** `schedule.tsx:6` imports
  `primereact/resources/themes/lara-light-cyan/theme.css`, so the move-ticket dialog
  stays light while the app is in dark mode.
  *Differs from issue #4:* that is the app's own palette in light mode; this is a
  third-party stylesheet locked to light.
- **The default auth context fails silently.** `auth.tsx:8` defaults `authFetch` to
  `Promise.resolve(new Response())`, so a component rendered outside the provider gets
  an empty 200 and `res.json()` throws, instead of a clear "no provider" error.
- **`MoveTicketDialog` never clears `note`** (`MoveTicketDialog.tsx:33-39` resets only
  `selectedSection`), so the previous ticket's note is prefilled into the next one.
- **TicketCard prints the PO twice** — `WEB/components/TicketCard.tsx:38` and `:41`.
