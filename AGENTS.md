# FOS-Agri V3 — Agent Workflow

This file protects the project from risky changes.

## Before coding

Always read these files first:

1. `README.md`
2. `ARCHITECTURE.md`
3. `PROJECT_RULES.md`
4. `CONTENT_STRUCTURE.md`
5. `SEO_I18N_RULES.md`
6. `NO_DATABASE_PLAN.md`
7. `BACKLOG.md`

## Golden rule

Do not break the current static demo. The project must continue to open directly from `index.html` and must stay deployable on GitHub Pages without a backend.

## Safe change process

- Make small changes.
- Keep `index.html`, `style.css`, and `script.js` connected.
- Do not rename existing files unless the HTML references are updated.
- Do not add a database, server, build step, or Hostinger dependency during Phase 1.
- Test navigation, search, mobile menu, and the back office demo after every change.

## Multilingual safety

Past versions were damaged when Amazigh language support was added. For any language work:

- Do not duplicate the whole HTML page.
- Do not rewrite the layout.
- Do not change element IDs used by JavaScript.
- Add translations through a controlled dictionary in JavaScript or through static content blocks.
- Each language must be manually reviewed before publishing.

## Project phases

1. Phase 1: public website and static back office demo.
2. Phase 2: espace adhérents and dashboards after client green light.
3. Phase 3: separate Club Agri website linked to FOS-Agri as a family website.
