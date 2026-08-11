## TIM
## How to run this web app

### With Docker (recommended)
**You only need Docker Desktop — no local Ruby, Rails, or Node required.**
From the repository root:

```
docker compose up --build
```

This builds both images, starts the Rails API, waits for its `/up` health check to
pass, and only then starts the Expo web server.

- API: http://localhost:3000
- WEB: http://localhost:8081

Both source trees are bind mounted, so you edit files on the host as usual:
- **API** — edits are live. Rails re-checks file timestamps on each request, so
  the next request picks up your change; no restart needed.
- **WEB** — edits need `docker compose restart web` (~15s, no image rebuild).
  Metro watches with inotify, which never fires for changes made on the Windows
  host, so the dev server does not notice them on its own.

A `package.json` change does need a rebuild: `docker compose up --build web`.

Add `-d` to run detached, `docker compose logs -f web` to follow the front end,
and `docker compose down` to stop. Use `docker compose down -v` to also drop the
Expo/node_modules caches if a dependency change stops resolving.

### Without Docker
**For Windows Users Only** (for now)
**You must have Rails, wsl, and Node/npm installed**
navigate to the repository and run the automations/start.ps1 powershell script
^ this is broken right now, needs to run bundle commands in wsl
your browser should open the page. If it does not, the project is on http://localhost:8081

## Goals: 
**Primary:** 
- Create an inventory management system capable of tracking items, their position in storage, and their associated jobs.
this has shifted to be more about the jobs than the inventory due to current/future needs.

**Secondary:**
- Stay up to date on software development skills and put something on my personal GitHub for potential employers to see. 
- Current tools I have been playing with:
    - Ollama + Claude code - using claude for planning larger context planning, with local agents for smaller tasks made by Claude. (to reduce token usage without losing the convenience) 
    - Reading documentation for Github actions with plans to host the site locally for testing. started building some better startup scripts the last time I worked on this.