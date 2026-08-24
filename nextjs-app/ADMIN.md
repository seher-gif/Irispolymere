# Iris Polymere — Admin CMS

A local content-management backend for blog posts, categories, media (PDF/image
uploads) and certificates. Runs alongside the public Next.js site.

## Running locally

```bash
npm install
npm run dev
```

Open **http://localhost:3300/admin/login**.

Admin credentials (local/testing only — change before any real deployment):

- Username: `admin@admin.com`
- Password: `123456`

Reset the local database (re-creates the admin user above) with:

```bash
npx prisma migrate reset   # wipes and re-seeds the local database
```

## How content gets from the admin to the live site

The admin panel edits a local SQLite database (`dev.db`, gitignored — never
deployed). The public site does **not** query that database at runtime; it
reads from static files in `lib/data/` that are committed to git and built
into the site (same pattern as a headless CMS + SSG).

After making changes in `/admin`:

```bash
npm run export-content   # regenerates lib/data/blog.ts and lib/data/certificates.ts
npm run build             # rebuilds the static site with the new content
```

Then commit the updated `lib/data/*.ts` files (and any new files under
`public/uploads/`) and redeploy (`vercel --prod`).

## What's editable

- **Blog Posts** — title/excerpt/body (rich text) in English, French and
  Arabic; category; published toggle; URL slug; and per-locale SEO meta
  title / meta description. French/Arabic content fields fall back to the
  English text at export time if left blank; meta title/description fall
  back to the post's title/excerpt (in that locale) if left blank.
  - **URL Slug** is editable directly on the edit form (`/blog/<slug>`).
    Leave it blank on a new post to auto-generate from the English title.
    Changing it re-validates uniqueness and updates the post's live URL —
    remember any existing external links/backlinks to the old slug will
    break, since there is no redirect table.
  - **SEO fields** (Meta Title / Meta Description, optional, per language)
    control the `<title>` tag and `<meta name="description">` on that
    post's public page independently of the on-page title/excerpt.
- **Categories** — EN/FR/AR names, assigned to posts.
- **Media Library** — upload PDFs and images (20MB max), copy their URL to
  paste into a post's cover image, an editor link, or a certificate.
- **Certificates** — ISO 9001 / Eco Friendly / REACH / RoHS text plus an
  optional PDF attachment. Once a PDF URL is set, the public Certificates
  page shows a real "View Certificate" download link instead of the
  "coming soon" modal.
- **Messages** — read-only inbox of submissions from the public Contact
  form (`/[locale]/contact`). Shows an unread-count badge in the sidebar
  and on the dashboard. Click a row to expand full details (and mark it
  read); "Delete" removes it permanently. "Reply by Email" opens a
  `mailto:` link to the sender.

## Contact form submissions

The public Contact form is a real Server Action (`lib/actions/contact.ts`)
with server-side validation (required fields + email format), independent
of the client-side checks. On success it writes a `ContactSubmission` row
to the same local SQLite database as the rest of the CMS, visible under
**Messages** above.

This only works where the app is running with access to that database —
i.e. locally (`npm run dev` / `npm run build && npm start`). On the Vercel
deployment (ephemeral filesystem, no persistent DB) the write fails
silently server-side and the visitor still sees the normal success message,
so the public form never appears broken — but no message is actually
captured there. To collect real inquiries from the live site, point
`submitContactForm` at an external store (e.g. a hosted Postgres DB, or an
email/webhook integration) before go-live.

## Notes

- `/admin` only runs where the SQLite file exists — i.e. locally. It is not
  reachable/functional on the Vercel deployment by design (ephemeral
  filesystem, no persistent DB there).
- Rich text bodies are stored as HTML (from the Tiptap editor) and rendered
  with `dangerouslySetInnerHTML` on the public post page — only content you
  or the client author should go through this field.
