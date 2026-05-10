# FOS-Agri V3 — No Database Plan

## Phase 1 decision

Phase 1 must work without a database and without Hostinger backend.

The objective is a client demonstration, not a production member platform.

## What is allowed in Phase 1

- Static HTML, CSS and JavaScript.
- GitHub Pages hosting.
- Browser localStorage for demo-only back office content.
- Static content from approved documents.
- Placeholder buttons for future secure areas.

## What is not allowed in Phase 1

- Database connection.
- Production login system.
- Real member records.
- Real uploaded files storage.
- Hostinger backend dependency.
- Server-side admin panel.

## Back office demo behavior

The back office can show the client how administration may feel, but it is not a real CMS.

Current demo features:

- Add an announcement.
- Select category.
- Save in browser localStorage.
- Delete from browser localStorage.

Limitations:

- Data is visible only in the same browser.
- Data is not shared with other users.
- Data is not saved to GitHub.
- Data is not a production database.

## Phase 2 future decision

After client green light, choose the real production stack:

- Database.
- Authentication.
- Member dashboards.
- Admin roles.
- Real hosting.
- File storage.
- Security model.

Until then, do not add backend complexity.
