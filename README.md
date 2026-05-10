# FOS-Agri V3 — Static demonstration

This repository contains a static demonstration for the first part of the FOS-Agri project.

## Objective

Phase 1 creates:

- A public website for FOS-Agri.
- A simple back office demonstration.
- No database and no Hostinger backend requirement.
- Deployment-ready files for GitHub Pages.

## Project phases

1. **Phase 1:** public website + static back office demo.
2. **Phase 2:** espace adhérents and dashboards after client approval.
3. **Phase 3:** separate Club Agri website linked to FOS-Agri as part of the same family of sites.

## File organization

```text
/
├── index.html   # Public website and back office demo sections
├── style.css    # Responsive layout and visual identity
├── script.js    # Services search, mobile menu, localStorage demo back office
└── README.md    # Project documentation
```

## Back office demo

The demo back office uses `localStorage`, so it works without a database. This is enough for a client demonstration on GitHub Pages. Data added in the back office remains only in the visitor browser.

## Deployment on GitHub Pages

1. Open repository settings.
2. Go to **Pages**.
3. Select branch `main` and root folder `/`.
4. Save and wait for the GitHub Pages URL.

## Notes

The content structure follows the supplied project document: Accueil, La fondation, Adhésion, Prestations, Médiathèque, Contact, Espace adhérent placeholder, partner dropdown objective, and a future Club Agri section.
