# app-sdk

`@contentstack/app-sdk`: the public npm library every Marketplace app loads inside its UI-location iframe. It does the `init` handshake with the Contentstack host (`app-extension-component`) over post-robot and exposes the per-location API (custom field, sidebars, dashboard, app config, full page, field modifier, RTE plugins, `stack`, `api()`).

**Stack:** TypeScript 4 · webpack 5 (UMD bundle `dist/index.js`, typings `dist/src/**/*.d.ts`) · Jest 27 (jsdom) · post-robot 8 · npm · Node from `.nvmrc` when present
**Commands:** `npm ci` (its `prepare` script builds) · `npm run build` · `npm test` · `npm run test:coverage` · `npm run lint` · `npx tsc --noEmit -p .`
**Env:** the library reads no environment variables, so there is no env sample.

## Public API contract (hard rules)
- This package is public and runs in every Marketplace app. No breaking change: exported names, types and method signatures, the `init` handshake, post-robot channel names and payload shapes stay as they are.
- Change runtime behaviour only for a confirmed bug fix, and say in the PR exactly what consumers will see differ. Every other PR says it changes nothing for consumers; prove it by building `main` and the branch and diffing `dist/src/**/*.d.ts`.
- Host-to-app listeners (`postRobot.on`) accept messages from `window.parent` only, after https://github.com/contentstack/app-sdk/pull/193 merges; until then `main` still accepts any window, and new listeners must pass `{ window: window.parent }`.
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
- `EventRegistry` debounces, but each `on*` call builds its own registry, so every `eventRegistration` message carries one event.
- `setInstallationData` replaces the stored configuration; it never merges. Omit `serverConfiguration` unless a secret is being set or removed.
- `src/stack/api/base.ts` is under `@ts-nocheck` and imports `dispatchPostRobotRequest`, which does not exist; delete the import before editing that file.

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
- Docs updated: `docs/api-reference.md` for public API changes.
- No secrets in code, commits or logs.
