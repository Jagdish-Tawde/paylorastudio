# Paylora Studio

A complete React 19 + TypeScript marketing website with Vite, Tailwind CSS 4, Motion, Lucide, React Router, React Hook Form and Zod. All eight public routes are prerendered during the production build. The quote calculator and FAQ assistant run entirely in the browser.

## Run locally or in IntelliJ IDEA

1. Install a current Node.js LTS version, at least 22.12 (Node 24 LTS recommended), and npm.
2. Open this directory in IntelliJ IDEA using **File → Open**. Enable JavaScript/TypeScript support where available; the built-in terminal works regardless of IDE plugin availability.
3. In the IDE terminal run `npm ci`.
4. Copy `.env.example` to `.env.local`, then fill in the values you know. Leave unknown contact values empty.
5. Run `npm run dev` and open the local URL printed in the terminal, usually `http://localhost:5173`.
6. For an IDE run configuration, add an **npm** configuration with this project's `package.json` and script `dev`.
7. Run `npm run build` for the production output in `dist`, then `npm run preview` to inspect that build locally.

## Configuration before launch

All contact data is read by `src/config/site.ts`. Never place secrets in `VITE_` variables: those values are public and baked into the browser bundle.

| Variable | Value |
| --- | --- |
| `VITE_BRAND_NAME` | Final agency name; default is Paylora Studio |
| `VITE_WHATSAPP_NUMBER` | International number including country code, e.g. digits only; no fake number is supplied |
| `VITE_BUSINESS_EMAIL` | Actual business email |
| `VITE_SITE_URL` | Absolute HTTPS production origin without a trailing slash |
| `VITE_BUSINESS_LOCATION` | Actual business location; no invented address is used |
| `VITE_INSTAGRAM_URL` / `VITE_FACEBOOK_URL` | Optional real social profile URLs |

Restart development or rebuild after changing environment variables. Without a valid production URL, indexing is disabled and no invented canonical or structured-data URL is generated. Build generates `dist/robots.txt` and `dist/sitemap.xml`; the source files in `public` deliberately default to a non-indexable preview.

`src/config/pricing.ts` owns package amounts, annual fees, included features and add-ons. `src/utils/quote.ts` owns the calculation and formatted enquiry. Additional pages are beyond the package allowance; an extra gallery is additional to any included gallery. Basic metadata is not charged again as advanced SEO. Estimates are not binding quotations. Agree on scope, maintenance terms, third-party fees and applicable taxes separately.

The selected package ID can be passed as `/get-quote?package=business`. Calculator state and form data live only in browser memory. Reset clears selections, customer data and the generated quote. If clipboard permission is denied, quotation text remains selectable.

## Content and honest demo material

The three portfolio entries in `src/data/content.ts` are explicitly labelled demo concepts, not client work. Their website previews are code-native React/CSS compositions. No live demo links are shown because no valid live URLs were provided. Replace demo content with real project information and add verified URLs when supplied. Never present the sample ordering or dashboard previews as functioning client systems.

Demo photos are downloaded and served locally from Unsplash (no runtime image requests):
- Sweets: https://images.unsplash.com/photo-1666190092159-3171cf0fbb12
- Restaurant: https://images.unsplash.com/photo-1414235077428-338989a2e8c0
- Interior: https://images.unsplash.com/photo-1600210492486-724fe5c67fb0

Confirm image licensing and replace photos with owned business photography when finalising branding. The sweets image is illustrative Indian sweets, not a product claim.

## Enquiries and FAQ

Contact uses React Hook Form and Zod. Submitting prepares an enquiry and displays it for review; it does not save a lead or send email. Visitors explicitly open WhatsApp or their email app and confirm sending there. Empty WhatsApp configuration disables contact actions with an explanation. Email fallback appears only when configured.

The FAQ widget is an automated rule-based assistant. Its provider interface in `src/data/faq.ts` allows a future server-backed implementation; paid AI integration and its recurring provider costs are outside this frontend. No AI keys belong in this repository or frontend variables. All contact fields are validated locally; any future backend must validate again server-side.

## Checks

```sh
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

Unit checks cover every package, annual maintenance, additional pages, add-ons, quote text, number validation and WhatsApp message encoding. Browser checks cover all routes on desktop and mobile, overflow, quote generation/reset, contact validation, FAQ replies and mobile navigation. Browser tests assume blank WhatsApp configuration; use the supplied empty environment defaults.

## Cloudflare Pages

1. Create a GitHub repository, initialise Git in this directory if needed, commit the project and lockfile, and push. Do not commit `.env.local`, `node_modules` or `dist`.
2. In Cloudflare **Workers & Pages**, create a Pages project and connect the repository. Choose Vite or no framework preset.
3. Set build command to **`npm run build`**, output directory to **`dist`**, and root directory to the repository root.
4. Set Node.js to a supported LTS version (for example `NODE_VERSION=24`). Add the `VITE_` environment variables above for Production. Use separate values for Preview; omit `VITE_SITE_URL` on previews to keep them non-indexable. The build uses Node-side React rendering and does not need a browser installed.
5. Deploy. In the Pages project's **Custom domains**, add your real domain and follow the DNS instructions. Cloudflare provisions HTTPS; confirm the certificate is active and use HTTPS in `VITE_SITE_URL`.
6. Update `VITE_SITE_URL` to the final canonical domain and rebuild. Changing environment values requires a new build. If a provider redirects an apex or www domain, ensure this value matches the final destination.
7. Confirm `/services`, `/portfolio`, `/pricing`, `/get-quote`, `/about`, `/contact` and `/privacy-policy` work when opened directly and refreshed. Also test an unknown URL, mobile navigation, calculator totals, clipboard fallback and real WhatsApp links.
8. Inspect `/robots.txt`, `/sitemap.xml`, page source titles/descriptions/canonicals, structured data and sharing metadata. Public pages have real HTML at build time; React handles later navigation. React 19's built-in metadata support supplies route-specific titles and metadata.
9. Add the domain to Google Search Console, verify ownership with a DNS TXT record, and submit `https://your-real-domain/sitemap.xml`. Request indexing of key pages and check canonical selection after crawling. No rankings or sales are guaranteed.

`public/_redirects` supplies the SPA fallback; prerendered route files are served directly. `404.html` provides a styled static error document, while the React wildcard route handles client-side misses. Cloudflare's blanket SPA fallback can return HTTP 200 for unknown URLs; the error page has `noindex`. If strict HTTP 404 status is required, replace the blanket fallback with a Pages Function or Cloudflare route handling rule that returns the built `404.html` with status 404 for unknown paths. Test platform-specific routing after deployment.

`public/_headers` includes security headers and immutable caching for fingerprinted assets. CSP allows inline style/script for Motion and generated structured data; no third-party scripts are loaded. Tighten the policy with hashes/nonces if adding server infrastructure. HTTPS is provided by the deployment platform. No analytics or trackers are included.

Before accepting enquiries publicly, confirm the final business identity, privacy contact and actual retention practices, and update the privacy page accordingly. Backend services, payment processing, admin authentication and database features describe agency offerings; they are not implemented as agency-site backend services.

## Structure

- `src/components`: layout, shared UI, home previews, pricing, chatbot
- `src/pages`: all route implementations
- `src/config`: brand, pricing and SEO configuration
- `src/data`: services, demo projects and FAQ provider
- `src/utils`: validation, quotation calculations and WhatsApp URLs
- `src/entry-server.tsx` + `scripts/prerender.mjs`: static HTML and SEO files at build time
- `tests`: responsive browser scenarios
- `public`: locally served photos, security headers and route fallback

## Paylora Studio logo

Original code-native vector artwork is in `public/brand/paylora-mark.svg`. It uses a geometric P with a detached forward ribbon and a blue/violet gradient. The header and footer pair this mark with accessible live brand text. `public/brand/paylora-logo.svg` is the standalone horizontal lockup for dark backgrounds; `public/favicon.svg` is the matching browser icon. SVGs remain sharp at any size and can be edited directly.
