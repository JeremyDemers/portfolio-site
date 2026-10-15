# Portfolio redesign review

Implemented October 15, 2026 on `redesign/dark-professional`. No production deployment, commit, push, infrastructure change, authentication change, or API-contract change was performed.

## What changed

- Navy/blue visual system, Inter and JetBrains Mono, responsive navigation, compact systems illustration, and a recruiter-focused introduction.
- Removed consulting offers, availability copy, Services navigation and Service structured data.
- Featured order: PhotoBlaze, TalaZaki Pizza, Digital Twin, jd Financial Advisor, LLE Vial Analysis, Empower API. Games remain accessible in a separate experiments section.
- Added both private-source case studies with real desktop/mobile captures, live-site actions, optional content sections and related-project navigation. Neither project exposes a repository link or `codeRepository` schema.
- Preserved the existing Twin route, chat, service checks, sessions and architecture viewer. Its health status is now visible on mobile; the decorative always-on avatar dot is hidden.
- Updated canonical/social metadata and sitemap-derived routes. Replaced synthetic financial-project artwork with a labeled architecture graphic, and replaced the old synthetic social preview with an editable branded graphic.

## Verification

- Windows 11, Node 24.19.0, npm 11.11.0; dependencies installed with `npm ci`, existing lockfile unchanged.
- Baseline: 18 unit tests and static build passed. Lint passed after removing a temporary capture helper's CommonJS import errors; no preexisting application lint failure.
- Final: `npm run lint`, `npm run test` (20 tests), and `npm run build` pass. All five case studies, both games, Twin, sitemap and robots statically export.
- Production-export Chrome review at 390, 768, 1024, 1366×768, 1440 and 1920 pixels: no horizontal overflow on the homepage. Screenshots are below.
- Automated axe WCAG 2 A/AA and 2.1 AA checks: homepage, five case studies and Digital Twin have no reported violations at desktop and 390px mobile widths. This is an automated check, not a full accessibility certification.
- Mobile navigation opens/closes, Escape restores trigger focus, and selecting a section closes the menu. Twin architecture opens and closes by keyboard.
- Tetris starts, moves, rotates, drops and pauses. Neon Shatter starts, launches and pauses. Game engines and auth/score implementations are unchanged.
- Twin health reports unavailable in this local setup. Suggested and typed prompts both render the existing error message correctly. Real model replies, persistent backend sessions, authenticated accounts and score submission were not verified against live services.
- All nine public page routes return HTTP 200, have no mobile horizontal overflow or broken images, and both new routes appear in the sitemap. Exported private-project pages have no source links or codeRepository fields.
- All six retained public GitHub source links returned HTTP 200. Both new live sites opened successfully in Chrome.
- `npm ci` reported 16 dependency advisories (3 moderate, 12 high, 1 critical) on the existing lockfile. Dependency upgrades were outside the redesign scope.

## Screenshots

- [Desktop, 1440px](screenshots/home-1440.png)
- [Mobile, 390px](screenshots/home-390.png)
- [Tablet, 768px](screenshots/home-768.png)
- [1024px](screenshots/home-1024.png)
- [Laptop, 1366×768](screenshots/home-1366.png)
- [Wide desktop, 1920px](screenshots/home-1920.png)
- [PhotoBlaze case study](screenshots/photo-blaze.png)
- [TalaZaki case study](screenshots/talazaki-pizza.png)

## Evidence and remaining content gaps

PhotoBlaze captures came from `https://photo-blaze.com/editor/` using its public sample artwork, without uploading personal files. The visible editor has tools and a layer stack; the public site has task guides. Advanced feature correctness, PSD/RAW round-tripping, performance and local-processing guarantees were not tested or newly claimed. The site recommends desktop use; the case study explicitly describes the narrow editor capture as a current limitation, not mobile feature parity.

TalaZaki captures came from `https://talazakipizza.com/`, including its actual homepage and mobile menu/ordering entry. No orders were submitted, and no POS/backend integration claims were added. The public identity and photographs are preserved.

Digital Twin screenshots show the real portfolio integration in its initial, service-unavailable state, with no fabricated conversations. The high-level AWS flow was checked against the adjacent repository README. No AI concept screenshot from the supplied package is published. PhotoBlaze's promotional banner was optional and is not used because genuine editor captures were available.

Pfizer, Eurofins and MEDITECH descriptions were checked against `digital-twin/backend/data/summary.txt`. Dates, current employment status, formal role titles and quantified achievements are intentionally omitted pending owner résumé confirmation. New private-project stacks and detailed implementation responsibilities also remain omitted pending owner confirmation. A real Financial Advisor dashboard capture would improve its case study; the present graphic is explicitly architecture, not product UI. LLE retains its existing repository screenshot.

## Changed files

- `app/page.tsx`, `app/globals.css`, `app/layout.tsx`
- `components/SiteHeader.tsx`, `components/SiteFooter.tsx`, `components/ProjectDetail.tsx`, `components/ProjectVisual.tsx`
- `lib/projects.ts`, `lib/seo.ts`
- `tests/unit/projects.test.ts`, `tests/unit/seo.test.ts`
- `public/images/portfolio-social.svg`, `public/images/portfolio-social.png`
- `public/images/projects/photo-blaze/editor-desktop.webp`, `editor-mobile.webp`
- `public/images/projects/talazaki-pizza/homepage-desktop.webp`, `homepage-mobile.webp`, `menu-mobile.webp`
- `public/images/projects/digital-twin/chat-desktop.webp`, `chat-mobile.webp`
- This review and the eight screenshots above.

The supplied `portfolio_redesign_for_codex/` directory was already untracked and was preserved. The adjacent `digital-twin` checkout was read only. Local environment configuration was not modified.

## Run on Windows

From `C:\Users\jdemers\Projects\portfolio-site`, run `npm run dev` and open `http://localhost:3000`. The redesign does not require Bash or WSL. Use `npm run build` to produce `out/`; `next start` is not the server for a static export.

The interactive frontend still needs the existing configured API services for real chat, accounts and scores. Keep the API URLs in local configuration aligned with the services you run. AWS deployment remains the existing workflow and requires a separate owner decision.

## Deployment preparation — October 15, 2026

The owner requested production deployment after the redesign, game thumbnails and favicon/SEO follow-ups. Next.js and its ESLint configuration were upgraded to 16.4.2, PostCSS to 8.5.30, and compatible lockfile dependencies refreshed. Lint, 21 tests, static build and the nine-page exported SEO audit pass. The production dependency audit reports zero vulnerabilities. Full dependency auditing still reports a high advisory in the development-only ESLint/fast-glob/braces chain, for which the installed supported version has no patched braces release. Deployment remains gated until the audit policy decision is resolved.
