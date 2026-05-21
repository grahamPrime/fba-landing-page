# FBA Landing Page vNext r2 — Preserved Style

Deploy-ready static landing page package using the earlier uploaded `styles.css` as canonical style base.

## Files

- `index.html`
- `thanks.html`
- `styles.css`
- `script.js`
- `README.md`
- `netlify.toml`
- `assets/`

## Important Asset Step

Before deploying to Netlify, add the coach image here:

```text
assets/Maddie Binks.png
```

The HTML already references:

```html
<img src="assets/Maddie Binks.png" alt="Madeleine Binks, MBA" />
```

Image handling:
- CSS crops via `object-fit: cover`
- anchored to `object-position: center top`
- bottom half can safely crop depending on viewport

## Hero Headline

Updated to:

```text
Clinical skill isn’t a business plan.
```

This preserves the emotional positioning while taking less visual space in the Playfair Display hero font.

## Video

Current hero video uses a temporary Google Drive CTA link:

```text
https://drive.google.com/file/d/1vPaxJoX8Hv-IRGrou_sovTahENOUyWsp/preview?autoplay=1&mute=1
```

Google Drive embeds proved unreliable during testing, so the hero now opens the Drive-hosted video in a new tab. Vimeo is still recommended for production.

## Netlify Form

The waitlist form uses Netlify Forms and captures:

- First Name
- Last Name
- Email
- Phone Number
- Current Stage

It redirects to:

```text
/thanks.html
```

Success message:

```text
Thanks for applying—we will be in touch shortly!
```

## Email Notification Setup

Static HTML cannot force Netlify to email a specific address by itself. Configure this in Netlify:

1. Site dashboard
2. Forms
3. Form notifications
4. Add email notification
5. Recipient:

```text
grahambinks@gmail.com
```

The form includes a hidden field called `email_subject`, populated by JavaScript as:

```text
Waitlist application from first_name last_name email
```

If Netlify notification templates are available in your plan/workspace, use that field in the email subject/body. Otherwise it will still appear in the form submission payload.

## r4 Layout Update

- Moved video CTA to a top band above the hero.
- Converted hero back to a single-column message area for breathing room.
- Moved full bio/photo into a wider Meet Your Coach section below.


## r6 Update

- Restored autoplay video using Vimeo player.
- Vimeo embed: https://player.vimeo.com/video/1192059687?autoplay=1&muted=1&loop=1&playsinline=1&title=0&byline=0&portrait=0
- Added uploaded coach photo at `assets/Maddie Binks.png`.
- Updated Meet Your Coach section so photo appears first and full bio appears beneath.

## r7 Update

- Changed nav labels: Mini MBA, Meet Your Coach.
- Updated hero headline to: “Add business skills to your clinical expertise.”
- Vimeo embed now requests unmuted autoplay using `muted=0`.
- Important: most modern browsers block unmuted autoplay unless the visitor has previously interacted with the site/browser. Vimeo may still start muted or require click-to-play.
- Apply for Consulting now preselects `Interested in consulting` in the Current Stage field.

## r8 Update

- Added scroll restoration fix so the homepage opens at the top on fresh load unless a hash anchor is intentionally present.


## r9 Video Update

- Replaced always-loaded Vimeo iframe with a click-to-play thumbnail.
- Thumbnail uses `assets/Maddie Binks.png`.
- On click, Vimeo loads with `autoplay=1`, `muted=0`, and `loop=0`.
- This avoids muted autoplay issues and prevents repeat playback.


## r10 Video Behavior Update

- Video loads and requests autoplay on page load.
- Vimeo loop is disabled: `loop=0`.
- Vimeo Player API listens for the `ended` event.
- When the video finishes, the iframe is hidden and the Maddie portrait thumbnail is shown.
- Note: browsers may still mute or block autoplay with sound, especially on mobile, but the page now implements the requested behavior structurally.

## r11 Netlify Forms Detection Hardening

- Added a hidden static detector form named `fba-waitlist` near the top of `index.html`.
- Added both `data-netlify="true"` and `netlify` attributes to improve Netlify parser compatibility.
- After deploying this version, Netlify Forms should list `fba-waitlist` after the deploy is processed.

## r12 Thank-You Page Styling Restore

- Restored styled `thanks.html` page.
- Visible waitlist form now posts to `./thanks.html`.
- Added redirect hidden field fallback.
- Preserved r11 hardened Netlify form detection.

## r13 Thank-You Page Hardening

- Replaced thank-you page styling with inline CSS.
- Removes reliance on Tailwind CDN or external `styles.css` path after Netlify form redirect.
- Keeps same FBA visual language and Return to Main Page button.


## r14 Inline Success Fix

- Removed fragile post-submit redirect.
- Form now submits to Netlify using AJAX/fetch.
- On success, the form hides and a styled success card appears inline on the same page.
- This avoids Netlify's default unstyled success page entirely.
