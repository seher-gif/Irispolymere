# Iris Polymere — Admin CMS

A local content-management backend for blog posts, categories, media (PDF/image
uploads), certificates, homepage banners, site-wide brand assets, and
per-page SEO. Runs alongside the public Next.js site.

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
npm run export-content   # regenerates the lib/data/*.ts files (blog, banners,
                          # certificates, pages, site assets, product photos…)
npm run build             # rebuilds the static site with the new content
```

Then commit the updated `lib/data/*.ts` files (and any new files under
`public/uploads/`) and redeploy (`vercel --prod`).

## What's editable

- **Homepage Banners** — the images that rotate in the homepage hero. 1 to
  5 images; at least 1 is required (the last one can't be deleted), up to 5
  (upload is disabled past that). Shown full-bleed, in upload order — no
  text, gradient or logo is placed on top of them by the site. Each banner
  has its own artwork **per language** (English required, French/Arabic
  optional — falls back to the English image if left blank), since the
  source photography has language-specific text baked in.
- **Product Photos** — one real photo per product (PVC and Filler
  Masterbatch), shown on that product's detail page and its category-page
  card. Not localized — plain product photography with no on-image text. A
  product with no photo shows a placeholder graphic instead.
- **Site Assets** — the brand-wide images used across the whole site: the
  header logo mark, the full logo lockup on the footer, the social-share
  (Open Graph) image, and the favicon and Apple touch icon — each with one
  current image (bundled default, or an admin-uploaded replacement), a
  "Replace" upload and, once replaced, a "Reset to default" button. The
  Contact page **QR code** is the one exception: it's 3 separate slots (one
  per language), since the QR artwork differs by language too. The favicon
  and Apple touch icon are a special case: Next.js reads `app/icon.png` /
  `app/apple-icon.png` directly from disk at build time, so uploading those
  writes straight to those files (with the original backed up once,
  automatically, so "Reset to default" has something to restore) — a
  **rebuild + redeploy** is required for a favicon/icon change to actually
  appear, same as any other publish. Certificate badges (ISO, REACH,
  RoHS…) aren't listed here — they're coded as SVG icons, not images.
- **Blog Posts** — title/excerpt/body (rich text) in English, French and
  Arabic; category; published toggle; URL slug; per-locale SEO meta
  title / meta description; and a per-locale **cover image** (used both in
  the blog list and as the featured banner atop the post). French/Arabic
  content and cover image fall back to the English version at export time
  if left blank; meta title/description fall back to the post's
  title/excerpt (in that locale) if left blank.
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
  pages, the 2 product category pages (PVC, Filler Masterbatch), and all 4 individual product pages.
  Each page shows its dictionary-driven default copy for reference; leaving
  a field blank keeps using that default. The list shows a "Custom"/"Default"
  badge per page. Backed by the `PageMeta` table, keyed by the page's entry
  in `lib/data/page-registry.ts` (e.g. `home`, `corporate/about`,
  `products/pvc-rigid`) — adding a new product or corporate page to its data
  file automatically makes it manageable here too. Every **Corporate** page
  (`/admin/pages/corporate/<slug>` — About Us, Vision and Mission, Quality
  Policy, Sustainability, Production and Technology) additionally shows a
  **Hero Image** card above its SEO fields — a full-width photo, roughly
  2400×1050px (21:9), English required and French/Arabic optional (falls
  back to the English image), independent of the SEO meta below it. On the
  public page it's optional: nothing renders there until an image is
  uploaded, so a page with no photo yet just looks like it does today.
- **Messages** — read-only inbox of submissions from the public Contact
  form (`/[locale]/contact`). Shows an unread-count badge in the sidebar
  and on the dashboard. Click a row to expand full details (and mark it
  read); "Delete" removes it permanently. "Reply by Email" opens a
  `mailto:` link to the sender.
- **Settings** — currently just the Contact Form Notification Email: the
  address new Contact page submissions are meant to notify. It's stored so
  it can be changed without a code change, but as of now nothing sends to
  it — new submissions still only show up under Messages above. Wire up
  actual email delivery (e.g. a transactional email API, or the existing
  mailbox's SMTP) separately, reading whatever address is saved here.

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
