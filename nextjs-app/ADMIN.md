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

After making changes in `/admin`, click **Export Content Now** on the
Dashboard (runs `npm run export-content` for you), or run it yourself:

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
  Posts also have a **search box + category/status filter** on the list
  page (`/admin/posts`), and the list is searchable by English title.
- **Categories** — EN/FR/AR names, assigned to posts.
- **Media Library** — upload PDFs and images (20MB max) with optional alt
  text; delete files; alt text is editable inline on each thumbnail. A
  **Media Picker** (rather than pasting raw `/uploads/...` URLs) is used
  everywhere an image or PDF is referenced: the post Cover Image field, the
  rich-text editor's image/PDF-link toolbar buttons, and the Certificate
  PDF field.
- **Certificates** — ISO 9001 / Eco Friendly / REACH / RoHS text plus an
  optional PDF attachment, picked via the Media Picker. Once a PDF is set,
  the public Certificates page shows a real "View Certificate" download
  link instead of the "coming soon" modal. New certificate types can be
  added ("+ Add a new certificate type") and removed ("Delete") — the
  public page renders whatever certificates exist, no fixed set required.
- **Pages** — per-locale meta title/description overrides for every static
  (non-blog) page: Home, Contact, Blog index, Certificates, the 5 Corporate
  pages, the 3 product category pages, and all 15 individual product pages.
  Each page shows its dictionary-driven default copy for reference; leaving
  a field blank keeps using that default. The list shows a "Custom"/"Default"
  badge per page. Backed by the `PageMeta` table, keyed by the page's entry
  in `lib/data/page-registry.ts` (e.g. `home`, `corporate/about`,
  `products/pvc-rigid`) — adding a new product or corporate page to its data
  file automatically makes it manageable here too.
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

## Known limitations vs. WordPress

Not built (flagged during a WordPress-parity review, intentionally left out
to keep the CMS scoped to the original ask — blog publishing, categories,
PDF upload, admin login, content editing):

- Single admin account, no roles/permissions.
- No draft revision history or autosave.
- No scheduled ("publish at a future date") posts.
- No bulk actions (bulk delete/publish) on the Posts, Media or Messages
  lists.
- No tags — posts have one optional category, not a tag system.
- Publishing still requires an explicit **Export Content Now** click plus a
  rebuild/redeploy — it is not instant the way a live-database-backed
  WordPress site is (see "How content gets from the admin to the live
  site" above; this is a deliberate tradeoff of the static-export
  architecture, not an oversight).

## Notes

- `/admin` only runs where the SQLite file exists — i.e. locally. It is not
  reachable/functional on the Vercel deployment by design (ephemeral
  filesystem, no persistent DB there).
- Rich text bodies are stored as HTML (from the Tiptap editor) and rendered
  with `dangerouslySetInnerHTML` on the public post page — only content you
  or the client author should go through this field.
