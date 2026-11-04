# app-sdk

`@contentstack/app-sdk`: the public npm library every Marketplace app loads inside its UI-location iframe. It does the `init` handshake with the Contentstack host (`app-extension-component`) over post-robot and exposes the per-location API (custom field, sidebars, dashboard, app config, full page, field modifier, RTE plugins, `stack`, `api()`).

## Developer Ecosystem workflow (read first)

This repo belongs to a Developer Ecosystem pod (DevEx: MCP, CLI, SDK, Starters including the SAP connector; Marketplace; Mkt Apps; Developer Hub).
New features and changes go through the deveco workflow before any code is written here:

1. Find the work's DSCDX idea and where it is in the flow. No idea yet: write one with the `brief` skill in `contentstack/product-wiki`.
2. The PRD, TRD, test cases, tickets and code come from your own routines (PM, Architect, QA agent, Dev), gate by gate. Do not plan, draft or build them in this session. No routine for a step yet: set it up with the `deveco-aisdlc-onboarding` skill in `contentstack/agent-skills`.
3. The order, gates and intake: https://github.com/contentstack/agent-skills/blob/main/skills/deveco-aisdlc-onboarding/references/run-protocol.md

Bug fixes and support cases keep this repo's usual path. Not sure which applies? Ask before building.

**Stack:** TypeScript 4 · webpack 5 (UMD bundle `dist/index.js`, typings `dist/src/**/*.d.ts`) · Jest 27 (jsdom) · post-robot 8 · npm · Node from `.nvmrc` when present
**Commands:** `npm ci` (its `prepare` script builds) · `npm run build` · `npm test` · `npm run test:coverage` · `npm run lint` · `npx tsc --noEmit -p .`
**Env:** the library reads no environment variables, so there is no env sample.

## Public API contract (hard rules)
- This package is public and runs in every Marketplace app. No breaking change: exported names, types and method signatures, the `init` handshake, post-robot channel names and payload shapes stay as they are.
- Change runtime behaviour only for a confirmed bug fix, and say in the PR exactly what consumers will see differ. Every other PR says it changes nothing for consumers; prove it by building `main` and the branch and diffing `dist/src/**/*.d.ts`.
- Host-to-app listeners (`postRobot.on`) accept messages from `window.parent` only.
- Never log tokens, request headers or bodies; `console.error` gets the error, nothing else.
- A version bump, release or `npm publish` is the release process's job, never part of a feature or fix PR.

## Layout
| Path | Purpose |
|------|---------|
| `src/index.ts` | `ContentstackAppSDK.init()` entry, post-robot config |
| `src/uiLocation.ts` | per-location object, host event routing (`extensionEvent`), `api()` |
| `src/*.ts`, `src/fieldModifierLocation/` | location classes (field, entry, sidebars, frame, modal, store, metadata) |
| `src/stack/` | `stack` queries (content types, entries, assets) |
| `src/RTE/`, `src/rtePlugin.ts` | JSON RTE plugin API |
| `src/types/` | exported types (public contract) |
| `__test__/` | Jest tests (post-robot mocked) |
| `docs/` | API reference and v2 migration guide |

## Known traps
See the product-wiki pages under `developer-hub/gotchas/`: `app-sdk-event-registration-never-batches`, `set-installation-data-replaces-not-merges`, `app-sdk-dead-import-under-ts-nocheck`, `unit-test-workflow-triggers-on-master`.

## Review rules (from the `main` ruleset)
The ruleset "Default branch protection rules for releases branch" covers `main`:
- Changes land by pull request only; no force push, no branch deletion.
- 1 approving review, including a code owner (`.github/CODEOWNERS`: `@contentstack/developer-ecosystem-pr-reviewers`; workflows, `.snyk`, `CODEOWNERS` and `.gitguardian.yaml` need `@contentstack/security-admin`).
- The last push needs approval from someone other than its pusher; new pushes dismiss stale approvals; all review threads must be resolved.
- Required checks: `GitGuardian Security Checks`, `security-sca`, `security-license`, `security-policy`, `security/snyk`, `code/snyk`, `license/snyk` (contentstack-developer-ecosystem). The unit-test workflow is not a required check: run `npm test` yourself and read its PR run.
- Merge, squash or rebase are all allowed. Release tags are protected by a separate ruleset.

## Definition of Done
- `npm test` is green, with a test for every public method the change adds or changes, written from the docs, not from the code's output.
- `npm run build` and `npx tsc --noEmit -p .` pass; `npm run lint` adds no new warning.
- The PR states the consumer impact (none, or exactly what changes) with the `dist` typings diff.
- Docs updated: `docs/api-reference.md` for public API changes, and the Developer Hub pages in `contentstack/product-wiki`.
- No secrets in code, commits or logs.
