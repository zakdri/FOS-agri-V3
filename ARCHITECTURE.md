# FOS-Agri V3 — Master Architecture

This file is the single source of truth for the FOS-Agri V3 demonstration architecture.

## Objective

Create a clean, professional and safe static demonstration for the client.

Phase 1 must include:

- Public website.
- Static back office demo.
- GitHub Pages deployment.
- No database.
- No Hostinger backend.

## Project roadmap

```text
FOS-Agri digital ecosystem
│
├── Phase 1 — Current repository
│   ├── Public institutional website
│   ├── Public services / prestations pages or sections
│   ├── Adhesion information
│   ├── Mediatheque overview
│   ├── Contact and regional relays
│   └── Static back office demo using localStorage
│
├── Phase 2 — After client approval
│   ├── Espace adherents
│   ├── Member dashboards
│   ├── Secure authentication
│   ├── Real back office
│   └── Database and hosting decision
│
└── Phase 3 — Separate linked website
    ├── Club Agri website
    ├── Separate identity and pages
    └── Linked to FOS-Agri as a family / sister website
```

## Current static architecture

```text
/
├── index.html
├── style.css
├── script.js
├── README.md
├── AGENTS.md
├── ARCHITECTURE.md
├── PROJECT_RULES.md
├── CONTENT_STRUCTURE.md
├── SEO_I18N_RULES.md
├── NO_DATABASE_PLAN.md
└── BACKLOG.md
```

## Frontend responsibilities

### `index.html`

Contains the static page structure:

- Header and navigation.
- Hero section.
- Fondation section.
- Prestations section.
- Adhesion section.
- Mediatheque section.
- Club Agri future bridge.
- Contact section.
- Back office demo section.

### `style.css`

Contains the visual identity:

- Responsive layout.
- Premium institutional look.
- Green agricultural identity.
- Cards, grids, forms and mobile menu styling.

### `script.js`

Contains safe browser-only interactions:

- Mobile navigation.
- Prestations filtering.
- Demo back office posts.
- localStorage persistence.

## No database in Phase 1

The current back office is only a demonstration. It uses browser localStorage. Data is not shared between users and is not permanent on the server.

## Future architecture after validation

If the client validates Phase 2, the project can evolve to:

- Next.js or Laravel / other selected stack.
- Real admin authentication.
- Real member accounts.
- Database.
- File storage.
- Role-based dashboards.
- Production hosting.

Do not introduce this complexity into Phase 1.

## Safety rules

- Keep the repository simple and demonstrable.
- Do not add build tooling unless the client approves a real application phase.
- Do not add dependencies for the static version.
- Do not break GitHub Pages compatibility.
- Do not implement automatic translation.
