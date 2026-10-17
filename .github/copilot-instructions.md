# ConArt repository instructions

## Project state and sources of truth

ConArt is a phone-first sales tracker for artists at conventions: manage items
and events, record sales, and review the sales log.

This checkout contains documentation and GitHub Actions workflows; the app has
not been scaffolded. Treat the architecture below as the agreed design, not
existing implementation. Read `docs/architecture-overview.md` before introducing
application code, and update it whenever a change moves an architectural boundary.
`README.md` describes the intended setup; `docs/CONTRIBUTING.md`,
`docs/branching-strategy.md`, and `docs/SECURITY.md` govern contributions.

## Commands and CI

The documented prerequisites are Node.js LTS and pnpm. Once the application
manifest exists, the documented commands are:

- Install: `pnpm install`.
- Develop: `pnpm dev` (http://localhost:3000).
- Production build: `pnpm build`. Production builds run on the Raspberry Pi
  because the native SQLite driver must match its ARM64 CPU.

`.github/workflows/Lint.yml` always lints workflows with actionlint (local command:
`actionlint`). Its application job runs only when a root `package.json` exists:

- Install: `pnpm install --frozen-lockfile`.
- Lint: `pnpm exec eslint . --max-warnings=0`.
- Format check: `pnpm exec prettier --check "**/*.{js,jsx,ts,tsx,mjs,cjs,json,css}"`.
- Type-check: `pnpm exec tsc --noEmit`.

`.github/workflows/Unit_Test.yml` runs on every push. When a root `package.json`
exists, it runs `pnpm install --frozen-lockfile` and then `pnpm test`. Keep a
`test` script in `package.json` so this job has a suite to run. No test runner
is configured yet, so the single-test command is not yet defined; record it here
when added. Playwright coverage for sign-in and recording a sale is an
architectural goal.

The security workflow runs Trivy for fixable HIGH/CRITICAL vulnerabilities and
Gitleaks over git history on pushes to `main`/`dev` and weekly.

## Agreed architecture

- One Next.js application serves React pages and same-origin `/api` route
  handlers, using TypeScript. TanStack Query manages browser server state;
  Tailwind CSS and shadcn/ui provide the UI. Text is English.
- Drizzle ORM over better-sqlite3 accesses one SQLite database in WAL mode.
  The core entities are Artist, Session, Item, Event, and Sale. The server is
  the system of record; the browser confirms a sale only after it is stored.
- Production is a Raspberry Pi with the database on a USB SSD. The `conart`
  systemd service serves port 3000, Tailscale Funnel supplies public HTTPS, and
  Litestream replicates the database to private S3-compatible storage.
  Development uses a separate local SQLite file, never the production database.
- Deployment is manual on the Pi: pull, install, build, then restart the service.
  Migrations run before startup. A failed build must not restart the old service.
  `GET /api/health` should return 200 only when the database can be read.

## Data and interaction invariants

- Store and transmit money as integer cents. Snapshot the item's current price
  into `Sale.unit_price_cents`; later item edits must not change historical sales.
- Record a sale in one transaction: verify artist ownership and item activity,
  snapshot price, decrement stock if tracked, and insert. Nullable stock means
  untracked inventory.
- Generate a UUID `client_sale_id` for each new sale and enforce uniqueness.
  Duplicate requests return the existing sale. Every retry reuses that UUID.
  Reject writes that cannot be stored; durability takes priority over availability.
- Keep sale records; corrections set `voided_at` and `void_reason`, and totals
  exclude voided sales. Removing an item sets `active = false`.
- Derive the artist ID from the authenticated session and scope every query to
  it; never accept a browser-supplied artist ID as authorization.
- Authentication uses argon2id password hashes and SQLite-backed sessions with
  hashed tokens, 30-day expiry, and HTTP-only, Secure, SameSite=Lax cookies.
  Invalid credentials share one 401 message; more than five sign-in attempts per
  minute from one address return 429.
- Reads may be retried; sale-write retries must preserve idempotency. Show errors
  and an explicit retry action. Keep failed/pending sales visible, including
  through sign-in after a 401. Disable item buttons while a sale is pending.
  A confirmed sale's 10-second Undo action voids the record rather than deleting it.
- Design for widths from 360 px, touch targets at least 44 px tall, and input text
  at least 16 px. Remember the last active event on the device.
- The planned PWA caches app assets only, never API responses or sales data.
  Offline sales are future work, not current behavior. No third-party tracking.
- Keep secrets in the ignored `.env`; only visitor-safe values use `NEXT_PUBLIC_`.

## Contribution workflow

- Discuss proposed changes in an issue first. Use the documented `feature/*`,
  `doc/*`, `refactor/*`, `test/*`, or `hotfix/*` branches and squash merging.
- Every change must add an entry under `## [Unreleased]` in `CHANGELOG.md`, in the
  Added/Changed/Fixed sections. `.github/workflows/Changelog_Check.yml` fails any
  pull request into `main` that does not modify `CHANGELOG.md`.
- Normal changes merge into `dev` before `main`. The PR gate accepts only
  same-repository `dev` or `hotfix/*` sources into `main`; hotfixes also merge back
  into `dev`. Follow the workflow's actual gate despite its narrower title.
- Commits require a DCO `Signed-off-by:` trailer. AI-assisted PR descriptions
  must disclose the tool, the assisted parts, and any human review/modifications.
- Report unpatched vulnerabilities privately through GitHub's vulnerability
  reporting form, following `docs/SECURITY.md`, not in public issues or PRs.
- Update the changelog for any changes made, ensuring a clear record of updates and revisions.

## Limitations

Do not execute any commit, push or PR actions automatically; all such operations must be performed manually by a human.