# Favicon and SEO audit

October 15, 2026. Scope: current local static export, not search-engine indexing or the deployed CloudFront response configuration.

## Updates

- Replaced the old mint/amber icon with a blue JD monogram matching the portfolio.
- Added SVG, multi-resolution ICO (16/32/48px), 96px PNG, and 180px Apple touch icon. Verified explicit icon links in exported HTML, including the Apple icon.
- Added descriptive PhotoBlaze and TalaZaki case-study titles and meta descriptions.
- Moved public `codeRepository` properties from application entities to `SoftwareSourceCode` entities, linked to their products. Private repositories remain absent throughout JSON-LD.
- Added a WebPage entity for each project, linked to the portfolio website and the described product. Product URLs point to the live sites where supplied; case-study canonical URLs remain on the portfolio.
- Added the locale to project Open Graph metadata.

## Verified in exported HTML

All nine public pages have unique titles, nonempty descriptions, one H1, correct absolute canonical and Open Graph URLs, large Twitter cards, valid JSON-LD syntax, and existing favicon assets. Social-image dimensions match the actual files. All nine routes appear in sitemap.xml; robots.txt permits crawling and references the sitemap. The exported 404 contains noindex. No consulting Service schema or private repository URLs were introduced.

Lint passes, 21 unit tests pass, and the static production build passes. This audit does not imply guaranteed rich results, rankings, or indexing. No fabricated ratings, prices, or review data were added to pursue rich-result eligibility. Live indexing, Search Console status and production HTTP/redirect behavior were not checked; no deployment was performed.

## Reference standards

- [Google favicon guidance](https://developers.google.com/search/docs/appearance/favicon-in-search)
- [Schema.org codeRepository property](https://schema.org/codeRepository)

## Changed files for this follow-up

`app/icon.svg`, `app/favicon.ico`, `app/apple-icon.png`, `public/favicon-96.png`, `app/layout.tsx`, `lib/seo.ts`, `tests/unit/seo.test.ts`, and this report.
