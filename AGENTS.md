# FOS-Agri V3 Agent Instructions

These instructions are for Codex and AI assistants working on this repo.

## Read first

Before editing, read:

- README.md
- PROJECT_RULES.md
- ARCHITECTURE.md
- CONTENT_STRUCTURE.md
- SEO_I18N_RULES.md
- NO_DATABASE_PLAN.md
- BACKLOG.md

## Homepage protection

The homepage is approved by the client. Do not change it visually.

Do not edit homepage hero, video, slider, agenda, map, animations, content, or layout.

Allowed homepage edits are limited to safe menu/header link fixes.

## Development rules

- Keep Phase 1 static.
- Do not add dependencies.
- Do not add a backend.
- Do not add a database.
- Keep GitHub Pages compatibility.
- Make small commits.
- Summarize all changed files after each commit.

## Translation and navigation rules

1. Always check the existing translation system before adding new content.
2. Never hardcode French text directly inside components if the page supports multiple languages.
3. Every menu item, card, title, subtitle, button, aria-label, and hidden label must exist in all supported languages: French, Arabic, and Amazigh.
4. When adding a new page or section, create or update one shared data source and map the UI from it.
5. Do not create separate arrays for each language unless they contain the exact same number of items and matching IDs.
6. Use stable IDs for menu items and translate only the labels/content.
7. For navigation labels, never use aggressive letter-spacing or `word-break: break-all`.
8. Arabic must support RTL.
9. Amazigh must not be treated like French uppercase text if it breaks typography.
10. Never treat top-level translation as complete. If a translated object uses a French fallback or object spread, every nested array/object that renders visible text must be explicitly translated too, except brand names, phone numbers, acronyms, and legal/technical abbreviations that should remain unchanged.
11. Before finishing any task, verify:
    - FR has all content.
    - AR has all content.
    - AMAZIGH has all content.
    - Menu item count is identical across languages.
    - Nested cards, accordions, tabs, lists, notes, CTA blocks, aria-labels, and hidden panel text are translated.
    - AR/ZGH page views do not show French fallback text inside newly added sections.
    - No label breaks letter by letter.
    - Mobile and desktop layouts are both checked.

## Future migration

Next.js migration may happen later, but only after approval. The approved homepage must be migrated carefully, not redesigned.
