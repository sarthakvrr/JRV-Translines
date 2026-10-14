# JRV Translines - website

Single-page cinematic marketing site. Pure HTML, CSS and JavaScript. No build step, no frameworks, no dependencies.

## Run it

Double-click index.html.

Optional local server:

    python3 -m http.server 8080

then open http://localhost:8080

## Files

    index.html        the page
    css/style.css     all styling and animation
    js/main.js        scroll effects, counters, lightbox, mobile nav
    assets/           logo + 9 fleet photographs

## Publish

Upload the folder to Netlify (drag and drop), Vercel, GitHub Pages, Cloudflare Pages or any shared host. Nothing to configure.

## Editing

- Text lives directly in index.html
- Brand colours are CSS variables at the top of css/style.css - change --gold, --orange and --bg to reskin the whole site
- Fleet photos are referenced in two places: the gallery figures in index.html, and the hero slideshow background images in css/style.css
- The phone number appears in index.html (nav and contact) and in the tel: links

## Included

- Fixed navigation that solidifies on scroll, with mobile slide-down menu
- Scroll progress bar and back-to-top button
- Hero with auto-crossfading fleet backdrop, animated perspective road grid, parallax
- Scroll-reveal animations on every section
- Animated counters and animated ERP dashboard bars
- Click-to-zoom lightbox on the fleet gallery
- Reduced-motion support and responsive layout down to mobile

## Contact

JRV Translines - S.N. 177/1, Namdev Rukari Baug, 3rd Floor, Office No. 1, Narayan Chamber, Saswad Rd, Phursungi, Bhekrai Nagar, Maharashtra 412308
+91 96898 87241

The move in the right direction.
