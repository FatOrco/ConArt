# Changelog

All notable changes to this project are documented here.

---

## [Unreleased]

### Added

- Unit test CI workflow that runs `pnpm test` on every push when a `package.json` exists
- Changelog check CI that fails pull requests into `main` that do not update `CHANGELOG.md`
- Repository Copilot instructions in `.github/copilot-instructions.md`
- Project structure skill (`.github/skills/project-structure/SKILL.md`) defining the allowed layout, placement rules, and audit procedure
- `structure-keeper` agent (`.github/agents/structure-keeper.agent.md`) that audits and tidies the file tree
- Project structure section in `.github/copilot-instructions.md` and layout summary in `docs/architecture-overview.md`
- Custom agents in `.github/agents/`: `nextjs-architect` (Next.js App Router and clean architecture) and `tailwind-ux-designer` (Tailwind, shadcn/ui, and stand-friendly accessible UX), adapted from awesome-copilot templates
- Next.js 16 App Router project with TypeScript, Tailwind CSS, and ESLint (closes #3)
- Vitest unit test setup (`pnpm test`) with a first test for `formatCents` in `lib/money.ts`
- Prettier dev dependency required by the Lint workflow
- `vitest.config.mts` limiting Vitest to `tests/unit/**/*.test.ts`

### Changed
- README tech stack, Node.js 20.9+ prerequisite, and command reference updated for the Next.js 16 scaffold
- Moved unit tests from beside source files to `tests/unit/` (`lib/money.test.ts` is now `tests/unit/money.test.ts`); Playwright tests go in `tests/e2e/`
- Documented the changelog update requirement for every change
- `.gitignore` ignores Next.js build output, generated `next-env.d.ts`, coverage reports, and `.DS_Store`

### Fixed
None

---

## [0.0.2] - 2026-10-11

### Added

- CI to block PR into main that aren't from dev branch
- CI to perform security checks on code to detect vulnerabilities and secret exposures using Trivy and Gitleaks.
- Added initial architecture overview document

### Changed
None

### Fixed
None

---

## [0.0.1] - 2026-10-11

### Added

- Added README file
- Added .gitignore file
- Added CONTRIBUTING file
- Added SECURITY file
- Added branching strategy documentation
- Added CHANGELOG file

### Changed
None

### Fixed
None

