# BX Technologies website

The public company website for **BX Technologies Pvt Ltd**, rebuilt on the v2 "bX Light" design for
clearer presentation of our services, better user experience and current web standards.

- Live site today: <https://bxtechnologies.net/>
- Status: planning complete, development starting (frontend first)

## Tech stack

Next.js (App Router) · React · TypeScript · Tailwind CSS · MDX · Resend (form email) · Vitest ·
Playwright. Development and testing previews on Vercel; production in Docker on a VPS.
Full details in [docs/02-tech-stack.md](docs/02-tech-stack.md).

## Documentation

| Doc | What it covers |
|---|---|
| [01 · Design analysis](docs/01-design-analysis.md) | Pages, routes, design system, components, business rules, decisions |
| [02 · Tech stack](docs/02-tech-stack.md) | Tools and libraries, repo layout, what we don't use |
| [03 · Implementation plan](docs/03-implementation-plan.md) | Phases, tasks, timeline, definition of done |
| [04 · Deployment plan](docs/04-deployment-plan.md) | Environments, CI/CD, VPS setup, launch checklist |
| [05 · Prompts and tasks](docs/05-prompts-and-tasks.md) | Ordered task list (T00 to T52) with progress tracker |

Design source of truth: `.claude/design-handoff/design_handoff_bx_v2/`.

## Getting started

Setup instructions are added once the project is scaffolded (task T01). Requirements: Node.js LTS and npm.

## Branches

`main` is production. `dev` is integration and staging. Feature work happens on
`feature/<task-id>-<name>` branches merged into `dev` by pull request.
