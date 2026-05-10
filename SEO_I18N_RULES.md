# FOS-Agri V3 — SEO and Language Rules

## SEO objective

The website must be clear for visitors and search engines while staying simple for the Phase 1 static demo.

## Required public SEO files for later

These can be added safely after the content is stable:

```text
robots.txt
sitemap.xml
llms.txt
schema.json
```

## Page metadata

Every future page should have:

- Clear title.
- Clear meta description.
- One H1.
- Descriptive section headings.
- Human readable URLs if the site is split into pages.

## Language strategy

French is the stable base for Phase 1.

Amazigh, Arabic or other languages must be added carefully and manually.

## No automatic translation

Do not generate automatic translations directly inside the layout. Each language should have:

- Manual content.
- Manual menu labels.
- Manual SEO title.
- Manual meta description.
- Manual direction handling when needed.

## Amazigh safety rules

Past code was damaged during Amazigh integration, so use this process:

1. Keep the French version untouched.
2. Add a small isolated translation dictionary.
3. Test only one section first.
4. Do not rename existing HTML IDs.
5. Do not change JavaScript selectors.
6. Test the mobile menu, prestations search and back office after language changes.

## Recommended future language structure

For static Phase 1:

```text
/lang/fr.js
/lang/ar.js
/lang/zgh.js
```

Only add this when approved. Do not add it before the content is ready.

## RTL and Tifinagh

- Arabic requires RTL layout checks.
- Amazigh/Tifinagh may require font checks.
- Do not apply RTL globally unless the selected language requires it.
