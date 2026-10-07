# Rushab Tours, Scope of Work

**Client:** Rushab Tours (rushabtours.com)
**Build:** Package first website + CMS + CRM
**Commercials:** INR 49,000 all in, 50 / 25 / 25, one year of maintenance included
**Reference prototype:** `/site/` (public site), `/dashboard/` (admin). Build to match these screens.
**Content reference:** the client's live Andaman package page. Every block on it is a field in the CMS, nothing is hard coded.

---

## 1. Stack, fixed

| Layer | Choice |
|---|---|
| Frontend | Next.js (App Router), React, TypeScript, Bootstrap 5 with a custom theme |
| Backend | Node.js, NestJS, REST, class-validator, Swagger at `/api/docs` |
| Database | PostgreSQL 16, Prisma or TypeORM (pick one, stay with it) |
| Auth | JWT access + refresh, httpOnly cookies, bcrypt |
| Files | S3 compatible object storage, image resize on upload (sharp) |
| Hosting | Frontend on Vercel, API + DB on a managed host in the India region |
| Repo | Monorepo: `apps/web`, `apps/api`, `packages/shared-types` |

Rules: no `any` in shared types, API types generated from one source, all list endpoints paginated, every mutating endpoint role guarded.

---

## 2. Data model (core tables)

- **package** id, slug, name, destination_id, country, nights, days, base_price, strike_price, status (draft/live), themes[], departure_cities[], best_months[], blurb, rating, review_count, seo_title, seo_description, og_image, created_by, updated_at
- **package_city** package_id, city_name, nights, sort
- **testimonial** id, name, city, package_id, rating, text, photo_id, status (pending/approved), travel_date
- **gallery_photo** id, media_id, caption, package_id (nullable), source (guest/instagram), sort, status
- **package_hotel** package_id, city, hotel_name, star, room_type, meal_plan, room_inclusion, date_from, date_to, sort
- **itinerary_day** package_id, day_no, travel_date, title, media_id (the photo shown against that day), sort
- **itinerary_line** day_id, text, sort, parent_line_id (nullable, one level of sub bullets, as on the live Andaman page)
- **sight** id, name, note, image_id (reusable across packages) + **package_sight** join with sort
- **package_list** package_id, type (inclusion/exclusion/note/cancellation/payment), line, sort
- **package_price** package_id, date_from, date_to, label (regular/peak), price_per_person, child_with_bed_pct, child_no_bed_pct
- **package_media** package_id, media_id, sort (first = cover)
- **destination** id, slug, name, hero_media_id, description, best_months[], sort
- **media** id, url, width, height, alt, size, uploaded_by
- **review** id, package_id, name, rating, text, status (pending/approved), travel_date
- **lead** (see section 5)
- **lead_event** lead_id, type (status_change/note/call/whatsapp), payload, user_id, created_at
- **user** id, name, email, password_hash, role (owner/manager/sales/content), last_active_at
- **audit_log** user_id, entity, entity_id, action, diff, created_at

Soft delete everywhere (`deleted_at`). Slugs unique and immutable once live.

---

## 3. Public website (`apps/web`)

Server rendered, revalidated on publish (ISR or on-demand revalidation webhook from the API).

| Page | Route | Notes |
|---|---|---|
| Home | `/` | Hero search (destination, month, nights, budget), featured packages, destination grid, third party strip (flights/hotels/bus/insurance, outbound links), why us |
| Listing | `/holidays` | Filters: destination, nights, budget, theme, departure city. Sort: popular, price asc/desc, shortest. Filters in the URL query so a filtered list is shareable. No full reload |
| Destination | `/holidays/[destination]` | Hero, description, best months, its packages. This is the SEO page |
| Package | `/holidays/[destination]/[slug]` | Blocks in this exact order, matching the client's current page: title with nights/days and (2N) city breakdown, gallery, hotels, day wise itinerary with dates, sightseeing, inclusions, exclusions, special notes, cancellation policy, payment policy, reviews, and a sticky booking box (date picker, adults and children steppers, per person rate, total amount) |
| Compare | `/compare` | Up to 3 shortlisted packages side by side (shortlist in localStorage) |
| Gallery | `/gallery` | Guest photos plus an Instagram feed, both managed in the dashboard |
| Static | `/group-tours`, `/visa`, `/about`, `/contact` | CMS driven blocks |

Also: enquiry modal (reusable, works from any page), **lead popup on package pages** (fires once per session on whichever comes first: 16 seconds, scrolling past 45 percent, or desktop exit intent; name and mobile only, WhatsApp opt in checked by default, creates a lead with `source = package_popup` and the package it fired on; suppressed once the traveller has already enquired), WhatsApp widget (section 6), 404, sitemap.xml, robots.txt, JSON-LD (`Product` + `AggregateRating` + `BreadcrumbList`), OG tags per package, 301 redirects from every current rushabtours.com URL (client supplies the list, dev implements in middleware).

**Performance budget:** LCP under 2.5s on 4G mid range Android, CLS under 0.1, package page JS under 180KB gzipped. Images via `next/image`, AVIF/WebP, lazy below the fold.

---

## 4. Dashboard (`dashboard.rushabtours.com`)

Same Next.js app, separate subdomain and route group, auth gated.

- **Overview:** KPI cards (enquiries this month, open pipeline + value, bookings, average trip value), 14 day enquiry chart, lead source breakdown, latest 5 enquiries
- **Leads:** table + status tabs (All/New/Contacted/Quoted/Won/Lost) with counts, search by name/number/package, CSV export, row click opens the detail drawer
- **Lead drawer:** every captured field (section 5), one click status change, assign owner, follow up reminder, call and WhatsApp buttons (WhatsApp prefilled with name and package), activity timeline
- **Packages:** table with views (30d), enquiry count, status, last updated. Search, duplicate, draft/live toggle
- **Package editor:** 8 tabs, each saving independently
  1. Overview (name, destination, nights/days, themes, departure cities, blurb, cities and nights, best months)
  2. Hotels (per city: name, star, room type, meal plan, dates), add/remove/reorder
  3. Itinerary (drag to reorder days, each day has a travel date, a title and ordered lines, and any line can hold a sub list)
  4. Sightseeing (pick from the shared library or add new, with photo and note)
  5. Inclusions (5 lists, one per block on the live page: inclusions, exclusions, special notes, cancellation policy, payment policy)
  6. Pricing (base, strike through, date range rows with regular/peak, child with and without bed percentages)
  7. Gallery (drag to reorder, first is cover, upload from here)
  8. SEO (page title, meta description, slug, share image)
- **Destinations:** cards, create/edit, attach packages
- **Media:** grid library, upload, alt text, replace, usage count, delete blocked if in use
- **Reviews:** approve or reject before they appear on the site
- **Team and roles:** invite, role per user, last active
  - owner: everything, including billing and users
  - manager: packages, destinations, media, leads
  - sales: leads only
  - content: packages, destinations, media, no leads
- **Preview:** any draft package opens on the public site behind a preview token
- **Audit:** who changed what, visible to owner

---

## 5. Lead capture (CRM)

**Form fields:** name, mobile (with "this number is on WhatsApp" checkbox), email, package (prefilled), travel date + flexible yes/no, **rooms**, adults, children + ages, budget band, free text note.

**Captured silently:** source (Google Ads / organic / Instagram / referral / WhatsApp widget / package popup / direct), full UTM set, landing page, referrer, search term where available, page view path and count in session, time on site, city (IP lookup), device and browser, first package viewed vs package enquired, returning visitor matched on mobile number.

**Notification:** every new lead is pushed to the assigned user on WhatsApp as it arrives, with the name, number, package and source, alongside the email notification.

**Behaviour:** duplicate mobile within 30 days attaches to the existing lead as a new event rather than creating a second lead. Instant email + WhatsApp notification to the assigned user. Spam: honeypot field + rate limit per IP + Cloudflare Turnstile. Google Ads conversion fired on submit. GA4 event with package and value.

---

## 6. WhatsApp widget

1. Bubble bottom right, labelled **Chat With Expert**, scripted chat opens in place. Four button questions: destination, month, travellers, budget.
2. On finish, create the lead server side (source = `whatsapp_widget`) with the answers and all silent fields.
3. Then deep link to `wa.me/<number>?text=` with the answers written into the first message.
4. Mobile: full screen sheet. Desktop: 360px panel. Dismiss state remembered for the session.

Official WhatsApp Business API is **out of scope** for v1, but keep the send layer behind an interface so it can be swapped in later.

---

## 6b. Added in the client's second round

- **Social links** in the header and footer, managed in the dashboard
- **Guest image gallery** plus an **Instagram feed** section, both CMS managed, with a dedicated `/gallery` page and a strip on the home page
- **Testimonials**, collected after travel, approved in the dashboard before they appear, shown on the home page and on each package
- **A photo per itinerary day**, picked from the media library in the itinerary tab
- **Rooms** captured alongside adults and children, everywhere a traveller states their group
- **Share this package**: WhatsApp, copy link and email, with Open Graph tags so the shared link previews correctly
- **Download this package as a PDF**, gated on name, mobile and email, which creates a lead with `source = pdf_download`; the PDF is generated server side from the same package data, so it can never go stale
- **Lead popup** anchored to the **right side** of the screen, not centred, once per session
- **Employee accounts** with per role access as in section 4
- **Lead source tracking** across Google Ads, organic search, Instagram, referral, WhatsApp and direct, down to campaign and search term, reported by source

## 7. Non functional

- HTTPS only, HSTS, secure cookies, CORS allowlist
- Passwords hashed with bcrypt, rate limited login, lockout after 10 failures
- All inputs validated server side, Prisma/TypeORM parameterised queries only
- Daily automated DB backup with 30 day retention, restore tested once before launch
- Error tracking (Sentry) on both apps, uptime monitor on the API
- Accessibility: keyboard reachable nav, filters and modal, visible focus, alt text on every image, colour contrast AA
- Analytics: GA4 + Google Ads conversion + Search Console verified
- Seed script with the 8 prototype packages so any dev can run the project in one command

---

## 8. Phases and deliverables

| Phase | Week | Deliverable |
|---|---|---|
| 1. Setup, schema, design | 1 | Monorepo, CI, environments, PostgreSQL schema, migrations, seed data, Swagger skeleton, signed off page designs |
| 2. API and auth | 2 | All CRUD endpoints, auth, roles, media upload, publish and revalidate webhook, API docs complete |
| 3. Dashboard | 3 | Every screen in section 4, working against the real API |
| 4. Website | 4 | Every page in section 3, real data, enquiry flow, lead popup, WhatsApp widget, lead capture |
| 5. Content, QA, launch | 5 | Migration of existing packages with the client, training, SEO and redirects, speed pass, cross device QA, analytics, go live, then **one year of maintenance** |

Five weeks is the working plan. Build in client review into weeks 1 and 4, and if sign off slips the schedule moves with it, which is the usual reason a build like this lands in week six rather than week five.

Weekly: a deployed staging link and a short written note of what moved. No phase is closed until its acceptance list passes.

---

## 9. Acceptance criteria

- A non technical staff member creates a complete package from scratch, publishes it, and it appears on the site within 60 seconds, without a developer
- An enquiry submitted on the site appears in the dashboard with every field in section 5 inside 5 seconds
- The WhatsApp widget creates a lead even if the traveller never opens WhatsApp
- Lighthouse mobile: performance 90+, SEO 100, accessibility 95+ on home, listing and package pages
- Every old URL returns 301 to the right new URL
- Roles enforced server side, not just hidden in the UI (verified by direct API calls)
- Zero console errors and zero horizontal scroll at 390px, 768px and 1440px
- Seed + `docker compose up` gets a new developer running in under 15 minutes

---

## 10. Out of scope for v1

Flight and hotel inventory or booking (outbound links to the partner only), online payment and instant booking, loyalty or coupon engine, mobile app, official WhatsApp Business API, photography and videography, writing new package copy (existing copy is migrated and tidied), ad campaign management, multi language, multi currency.

---

## 11. Client provides

One decision maker for sign off, existing package content in any format, the photo library, the old URL list, domain DNS access, Google Analytics and Google Ads access, the WhatsApp business number, and the logo in vector form.

## 12. Handover

Repository transferred to the client org, environment variables documented, deployment runbook, database export, Swagger docs, recorded training videos, and one year of maintenance after launch: hosting support, backups and monitoring, security updates, bug fixes and small content or design changes, at no extra cost.
