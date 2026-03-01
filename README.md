# Yusuf Baig — Personal Portfolio

> Festival-inspired portfolio. Live at **https://yourusername.github.io**

---

## File Structure

```
yourusername.github.io/
│
├── index.html              # Homepage (about, skills, life, featured projects, contact)
├── projects.html           # Full projects page (cards + expandable case studies)
├── 404.html                # Custom error page
├── robots.txt              # Search engine crawl rules
├── sitemap.xml             # Page index for Google / Bing
├── README.md               # This file
│
└── assets/
    ├── css/
    │   └── global.css      # Shared design system (tokens, nav, footer, utilities)
    ├── js/
    │   └── components.js   # PROJECTS data + nav/footer injection + shared JS
    ├── favicon/            # Favicon files (generate at favicon.io)
    └── og-image.png        # Social share preview (1200×630px)
```

---

## Adding a Project

Open `assets/js/components.js`. Find the `PROJECTS` array. Add a new object:

```javascript
{
  id:          'my-project',         // unique slug (used as anchor link)
  index:       '04',                 // display number
  title:       'My Project',
  shortDesc:   'One-line summary.',
  description: 'Full case study paragraph.',
  challenges:  'What was hard.',
  learned:     'Key takeaway.',
  tags:        ['React', 'Node.js'],
  liveUrl:     'https://my-project.com',   // use '#' if none
  githubUrl:   'https://github.com/...',   // use '#' if none
  featured:    true,   // true = also shows on homepage teaser (aim for 2–3)
},
```

That's it. Both `index.html` and `projects.html` update automatically.

---

## Customisation Quick-Reference

| What to change          | Where                                   |
|-------------------------|-----------------------------------------|
| Name & tagline          | `index.html` → hero section             |
| Marquee keywords        | `index.html` → `.marquee-track`         |
| About cards             | `index.html` → `.about-cards`           |
| Skills tiles            | `index.html` → `.skills-grid`           |
| Life/hobbies cards      | `index.html` → `#life`                  |
| Contact links           | `index.html` → `.contact-links`         |
| All project data        | `assets/js/components.js` → `PROJECTS`  |
| Accent colours          | `assets/css/global.css` → `:root`       |
| Nav logo / footer text  | `assets/js/components.js` → builder fns |
| SEO meta tags           | `<head>` of each HTML file              |
| Sitemap dates           | `sitemap.xml` → `<lastmod>`             |

---

## How the Shared Component System Works

`assets/js/components.js` exposes a `window.YB` namespace:

```javascript
YB.initShared()                          // mounts nav + footer, starts cursor etc.
YB.renderFeaturedRows(mountId)           // homepage: featured project rows
YB.renderFeaturedCards(mountId)          // projects page: featured cards grid
YB.renderAllProjects(mountId)            // projects page: full accordion list
YB.initReveal()                          // scroll-reveal (call last, after renders)
YB.PROJECTS                              // raw data array
```

Each page's inline `<script>` calls these in order:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  YB.initShared();
  YB.renderFeaturedRows('mount-id');  // page-specific
  YB.initReveal();                    // always last
});
```

**Nav active state** is detected automatically via `window.location.pathname`. The Projects link is highlighted on `projects.html`; home-page section anchors get `/#` prefixes when linked from other pages.

---

## Deployment

```bash
git clone https://github.com/yourusername/yourusername.github.io.git
cd yourusername.github.io

# Drop in all files, then:
git add .
git commit -m "Initial portfolio"
git push origin main
# Live at https://yourusername.github.io in ~60 seconds
```

### Adding a Custom Domain

1. Add `A` records pointing to GitHub's IPs (`185.199.108–111.153`)
2. Repo → **Settings → Pages → Custom domain**
3. Enable **Enforce HTTPS** after DNS propagates (~24 h)

---

## SEO Checklist

- [ ] All `TODO` comments resolved in both HTML files
- [ ] `og:image` → real 1200×630px image at `assets/og-image.png`
- [ ] Favicon files at `assets/favicon/` (generate at https://favicon.io)
- [ ] `sitemap.xml` dates updated, URL correct
- [ ] Site submitted to [Google Search Console](https://search.google.com/search-console)

---

## Browser Support

Chrome 90+, Firefox 90+, Safari 14+, Edge 90+, Mobile Safari (cursor hidden automatically).
