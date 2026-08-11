# TIM — contributor conventions

## Conventional Commits

Use Conventional Commits structure for **commits, branch names, issue titles, and pull request titles**.

Format: `<type>(<optional scope>): <description>`

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

Rules:
- Description in imperative mood, lowercase, no trailing period (`add user auth`, not `Added user auth.`)
- Breaking changes: append `!` after the type/scope (`feat(api)!: drop v1 endpoints`) and add a `BREAKING CHANGE:` footer
- Body (optional) explains *why*, separated from the subject by a blank line

Applies to:
- **Commits** — `feat(auth): add token refresh`
- **Branches** — `<type>/<short-kebab-description>`, e.g. `feat/token-refresh`, `fix/docker-port-clash`
- **Issues** — title follows the same `<type>(<scope>): <description>` form
- **Pull requests** — title follows the same form; it should read as the squash-merge commit subject
