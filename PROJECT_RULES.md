# FOS-Agri V3 — Project Rules

## Non-negotiable rules

1. Do not break the working static demo.
2. Do not add a database in Phase 1.
3. Do not require Hostinger backend in Phase 1.
4. Do not add automatic translation.
5. Do not damage the existing JavaScript IDs or selectors.
6. Keep the project deployable on GitHub Pages.

## Current technical scope

- HTML
- CSS
- JavaScript
- localStorage only for demo back office
- GitHub Pages compatible

## Content rules

The public website must follow the supplied FOS-Agri document:

- Accueil
- La fondation
- Adhésion
- Prestations
- Médiathèque
- Contact
- Search button / search experience
- Espace adhérent button or placeholder
- Partner organisms selector or placeholder

The current document says `Adhésion` must be added and `Réalisations` should be removed from the main navigation.

## Phase rules

### Phase 1

Build public website and back office demo only.

### Phase 2

Create espace adhérents and dashboards only after client approval.

### Phase 3

Create Club Agri as a separate website linked to FOS-Agri.

## Back office rules

The Phase 1 back office is a demo. It must:

- Work without login.
- Work without a server.
- Save demo items in browser localStorage.
- Clearly communicate that it is not production storage.

## Language rules

Languages must be manual and safe. For Amazigh or Arabic:

- Do not convert the whole site automatically.
- Do not rewrite the layout.
- Test RTL and LTR separately.
- Keep French as the stable base until translation content is approved.

## Git rules

- Make focused commits.
- Avoid large rewrites.
- Prefer documentation before restructuring.
- Do not delete working files unless there is a clear replacement.
