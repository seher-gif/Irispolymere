# Iris Polymere — Admin CMS

A content-management backend for blog posts, categories, media (PDF/image
uploads), certificates, homepage banners, site-wide brand assets, product
photos and per-page SEO. It runs inside the public Next.js site at `/admin`,
both on the live site and locally.

## Where things live

| What | Hosted (Vercel) | Local development |
| --- | --- | --- |
| Database | **Turso** (`TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`) | SQLite file `dev.db` (when those variables are absent) |
| Uploaded files | **Vercel Blob** (`BLOB_READ_WRITE_TOKEN`) — browser uploads straight to Blob | `public/uploads/` |
| Admin session | `SESSION_SECRET` env variable | `.env` |

Content saved in the admin is live right away: every save purges the cached
public pages (`lib/publish.ts`), and pages are otherwise regenerated every 5
minutes. There is **nothing to export or publish** any more. Public pages
read the database through `lib/content.ts`.

Admin sign-in is on the live site at `/admin/login`. Change the password under
**Settings → Admin Password** (10+ characters).

## Running locally

```bash
npm install
npm run dev          # http://localhost:3300/admin/login
```

Without the Turso/Blob variables the app uses the local `dev.db` and
`public/uploads/`, a separate sandbox from the live data. To work against the
live data locally, put `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` in
`.env.local` (and `BLOB_READ_WRITE_TOKEN` to upload to the live Blob store) —
be careful, edits then change the live site.

### Database changes (Prisma migrations)

```bash
npx prisma migrate dev --name something   # creates + applies it to dev.db
npm run db:migrate:turso                  # applies new migrations to Turso
                                          # (needs the Turso variables in .env.turso)
```

## What's editable

- **Homepage Banners** — the images that rotate in the homepage hero. 1 to
  5 images; at least 1 is required (the last one can't be deleted), up to 5
  (upload is disabled past that). Shown full-bleed, in upload order — no
  text, gradient or logo is placed on top of them by the site. Each banner
  has its own artwork **per language** (English required, French/Arabic
  optional — falls back to the English image if left blank), since the
  source photography has language-specific text baked in.
- **Product Photos** — one real photo per product (PVC, Color
  Masterbatch and Filler Masterbatch), shown on that product's detail page and its category-page
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
  pages, the 3 product category pages (PVC, Color Masterbatch, Filler Masterbatch), and all 5 individual product pages.
  Each page shows its dictionary-driven default copy for reference; leaving
  a field blank keeps using that default. The list shows a "Custom"/"Default"
  badge per page. Backed by the `PageMeta` table, keyed by the page's entry
  in `lib/data/page-registry.ts` (e.g. `home`, `corporate/about`,
  `products/pvc-rigid`) — adding a new product or corporate page to its data
  file automatically makes it manageable here too. Every **Corporate** page
  (`/admin/pages/corporate/<slug>` — About Us, Vision and Mission, Quality
  Policy, Sustainability, Production and Technology) also has a **Header
  Background Image** card above its SEO fields: a photo for the page's title
  band, one image per page (not per language). Recommended 2400×600px (4:1)
  but any size works. The page title is white text over the photo with a
  dark-navy fade on its left side (the artwork keeps that side empty; the
  title block moves left in Arabic too), and the subject on the right. The
  band is at least the photo's own shape, so on wide screens the whole image
  shows; on narrow screens only its empty left edge is trimmed. Until one is
  uploaded the band stays plain navy.
  **About Us** additionally has an **About Section Photo** (the side photo in
  its body, per language), and the **Home** page has an optional **About
  Section Photo (homepage)** — leave it empty and the homepage About text is
  simply centered with no image.

### Images fit themselves — no resizing needed

Every uploaded image (homepage banners, blog covers, product photos, Corporate
header/side photos) is shown at its **own shape, whole, never cropped** — wide,
square or tall all work, on every device. The recommended sizes in the admin
are just what the designs were made at, not requirements. How: the upload
writes the image's pixel size into its file name (`<id>-2400x1050.jpg`) and
pages render with that ratio. The homepage slider takes the shape of the
tallest banner; banners of the same shape (the normal case) fill it exactly, a
differently shaped one is centered on navy rather than cropped. Logos uploaded
under Site Assets also have their transparent margins trimmed automatically.

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
with server-side validation (required fields + email format). On success it
writes a `ContactSubmission` row to the database (Turso when hosted), visible
under **Messages** above. The notification address in Settings is stored but
nothing emails it yet — new messages only appear in the admin.

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

## Notes

- Rich text bodies are stored as HTML (from the Tiptap editor) and rendered
  with `dangerouslySetInnerHTML` on the public post page — only content you
  or the client author should go through this field.
- Keep the Turso token, Blob token and `SESSION_SECRET` out of git (they live
  in Vercel's environment variables and git-ignored `.env*` files).
