# FOS-Agri V3 — Architecture

## Current architecture

The project is currently a static website for GitHub Pages.

```text
/
├── index.html
├── fondation.html
├── adhesion.html
├── prestations.html
├── actualites.html
├── agenda-solidaire.html
├── mediatheque.html
├── contact.html
├── espace-adherent.html
├── club-agri.html
├── services/
└── assets/
```

## Approved homepage

`index.html` is client-approved and should be treated as locked visually. The homepage is the design reference for all secondary pages.

`assets/home-nav-fix.js` connects the approved homepage menu to the separate pages without redesigning the homepage.

## Static shared assets

- `assets/styles.css`: current visual system and homepage styles
- `assets/app.js`: current homepage behavior
- `assets/data.js`: current static data
- `assets/secondary-pages.css`: secondary-page styles
- `assets/secondary-pages.js`: secondary-page menu/footer/language behavior
- `assets/nav-submenu.css`: submenu styling

## Future Next.js migration plan

Next.js may be used after client approval for Phase 2. The approved homepage must be migrated carefully and visually preserved.

Potential future structure:

```text
/app
  /page.tsx
  /fondation/page.tsx
  /adhesion/page.tsx
  /prestations/page.tsx
  /actualites/page.tsx
  /agenda-solidaire/page.tsx
  /mediatheque/page.tsx
  /contact/page.tsx
/components
  Header.tsx
  Footer.tsx
  LanguageSwitcher.tsx
  ServiceCard.tsx
/data
  navigation.ts
  services.ts
  news.ts
  agenda.ts
  contact.ts
/styles
  globals.css
```

Do not start this migration until it is explicitly approved.