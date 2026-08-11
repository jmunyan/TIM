# Web app can't reach the API: route/controller namespace mismatch + unconfigured base URL

**Status: not started — decide the approach before writing code.**

---

## Prompt for Claude (paste this to resume)

We are fixing the one defect that keeps the TIM front end from talking to the Rails API.
It has two halves; fixing either alone leaves the app broken, so treat them as one item.

Before proposing code, confirm the current state still matches what's below (the repo
moves between sessions), then walk me through the decision in "Decide this first" and
wait for my answer. Do not start with the security rewrite — that is a separate item.

### Half 1 — every app route 404s

[API/config/routes.rb](../API/config/routes.rb) declares the endpoints inside
`namespace :api`, so Rails resolves them to `Api::JobsController` /
`Api::SessionsController` and expects the files under `app/controllers/api/`.
The controllers are actually top-level classes at the root of
[API/app/controllers/](../API/app/controllers/):

- `class JobsController < ApplicationController` in `jobs_controller.rb`
- `class SessionsController < ApplicationController` in `sessions_controller.rb`

Verified against the running container:

```
GET /api/jobs -> 404
ActionController::RoutingError (uninitialized constant Api::JobsController)
```

Login (`POST /api/sessions`) fails the same way, so nothing can authenticate.

### Half 2 — the front end never points at the API

- [WEB/app/(tabs)/schedule.tsx](<../WEB/app/(tabs)/schedule.tsx>) calls
  `authFetch('/api/jobs')` — a relative URL, so it resolves against the Expo origin
  (`localhost:8081`), not the API on `localhost:3000`.
- The same file hardcodes `ws://localhost:3000/cable?token=${token}` with a
  `// Adjust URL for production` comment.
- [WEB/context/auth.tsx](../WEB/context/auth.tsx) passes `url` straight to `fetch`
  with no base URL, so there is currently no single place to set the host.

## Decide this first

1. **Which side moves?** Namespace the controllers (`app/controllers/api/jobs_controller.rb`
   with `module Api`) to match the routes, or drop `namespace :api` from routes.rb and
   keep flat controllers. Namespacing matches the URL shape the front end already uses
   and leaves room for `/api/v2`; flattening is the smaller diff. **Whichever we pick,
   sessions and jobs must move together** — migrating one leaves login broken.
2. **How is the base URL configured?** Likely `EXPO_PUBLIC_API_URL` read once in
   `auth.tsx` and used for both `fetch` and the WebSocket URL. See the concerns below
   about when that value is baked in.

## Major breaking concerns

These are the ones worth pausing on. Smaller cleanups are deliberately left out.

- **Fixing the routing makes a forgeable auth scheme reachable.** The session token
  *is* the user id: [sessions_controller.rb](../API/app/controllers/sessions_controller.rb)
  returns `user.id.to_s`, [application_controller.rb](../API/app/controllers/application_controller.rb)
  does `User.find_by(id: token.to_i)`, and
  [connection.rb](../API/app/channels/application_cable/connection.rb) does
  `User.find(token.to_i)`. Right now the 404 hides this. After the fix,
  `Authorization: Bearer 1` authenticates as user 1 — and CORS in
  [application.rb](../API/config/application.rb) is `origins '*'` with `headers: :any`,
  so any website can do it. Decide whether real tokens (JWT/`has_secure_token`) land in
  the same change or immediately after, but do not ship the routing fix to anything
  public first.
- **Tenant isolation rides on that same token.** `JobsController#index` scopes by
  `current_user.organization_id` and `ScheduleChannel` streams
  `schedule_#{current_user.organization_id}`. A forged token is cross-organization
  data access, not just impersonation.
- **The WebSocket will still fail after the URL is fixed.** Action Cable's origin check
  is on in development — `config.action_cable.disable_request_forgery_protection` is
  commented out at [development.rb:63](../API/config/environments/development.rb#L63) —
  so a connection from `http://localhost:8081` is rejected for having a different origin
  than the API host. Needs an explicit `allowed_request_origins` (or the dev toggle)
  or the schedule page's live updates stay dead.
- **`EXPO_PUBLIC_*` is inlined at bundle time, not read at runtime.** Changing the API
  URL means restarting/rebundling the web container, and the static `expo export` build
  bakes the value into the artifact — so one build cannot be repointed at another
  environment. If that matters, the value has to come from somewhere else (runtime
  config fetch, or a per-environment build).

## Repro / verification environment

The Docker stack is already set up — `docker compose up --build` from the repo root
brings up the API on `:3000` and the web app on `:8081` (see the README).

```
curl -s -i http://localhost:3000/api/jobs | head -3   # currently 404
docker compose logs api | grep -A3 "api/jobs"         # shows the uninitialized constant
```

Rails picks up API edits live over the bind mount. The web container does **not** —
run `docker compose restart web` after front-end changes.

Done means: log in from the browser at `localhost:8081`, the schedule page lists jobs
from the API, and the decision in "Decide this first" is recorded in this issue.
