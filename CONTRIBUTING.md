# Contributing to the Contentstack App SDK

Thanks for helping. This package is public and runs inside every Contentstack Marketplace app, so changes are held to a strict compatibility bar.

## Reporting
- Bugs and feature requests: open a GitHub issue with the SDK version, the UI location, and steps to reproduce.
- Security issues: do not open an issue; follow [SECURITY.md](SECURITY.md).

## Pull requests
1. Fork, branch from `main`, and run `npm ci`.
2. Keep the public API stable: no change to exported names, types or method signatures, and no runtime change unless it fixes a bug. Say in the PR what consumers will see differ, or that nothing changes.
3. Add or update tests in `__test__/`, then run `npm test`, `npm run build` and `npm run lint`.
4. Update `docs/api-reference.md` when the public API changes.
5. Open the pull request against `main`. A code owner reviews it, and the security checks must pass.

By contributing you agree that your contribution is licensed under the [MIT License](LICENSE).
