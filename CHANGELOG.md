# Changelog

All notable changes to this project are documented here.

---

## [Unreleased]

### Added

- Unit test CI workflow that runs `pnpm test` on every push when a `package.json` exists
- Changelog check CI that fails pull requests into `main` that do not update `CHANGELOG.md`
- Repository Copilot instructions in `.github/copilot-instructions.md`

### Changed
- Documented the changelog update requirement for every change

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

