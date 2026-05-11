# FOS-Agri V3 — SEO and I18N Rules

## SEO baseline

Phase 1 should include static SEO support without a backend:

- descriptive page titles
- meta descriptions on important pages
- `robots.txt`
- `sitemap.xml`
- structured data when safe

## Language strategy

The project supports French, Arabic, and Amazigh/Tifinagh.

Rules:

- Do not use uncontrolled automatic translation.
- Keep language labels and repeated content in controlled data/config where possible.
- Test RTL/LTR behavior before publishing Arabic changes.
- Do not break existing language switcher behavior.
- Keep French as the stable base unless approved content exists for Arabic/Amazigh.

## Homepage safety

Do not change homepage visual sections while adding SEO or language support.

Allowed homepage changes are limited to safe menu/header link fixes.