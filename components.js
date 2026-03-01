/**
 * components.js — Shared Components & Behaviours
 * ================================================
 * Single source of truth for the entire site.
 *
 * EXPORTS (via window.YB namespace)
 * ──────────────────────────────────
 *   YB.PROJECTS             — Array of all project objects
 *   YB.initShared()         — Mounts nav + footer, starts cursor,
 *                             progress bar, blob parallax, smooth scroll
 *   YB.initReveal()         — Starts IntersectionObserver for .reveal elements
 *   YB.renderFeaturedRows() — Renders featured projects as list rows (homepage)
 *   YB.renderFeaturedCards()— Renders featured projects as cards (projects page)
 *   YB.renderAllProjects()  — Renders full accordion list (projects page)
 *
 * USAGE (in each page's inline <script>)
 * ──────────────────────────────────────
 *   document.addEventListener('DOMContentLoaded', () => {
 *     YB.initShared();
 *     // ... page-specific render calls ...
 *     YB.initReveal(); // always last — observes all rendered content
 *   });
 *
 * ADDING A PROJECT
 * ────────────────
 *   1. Add a new object to the PROJECTS array below.
 *   2. Set featured: true to show it in the homepage teaser.
 *   3. That's it — both pages update automatically.
 */

'use strict';

/* ================================================================
   PROJECT DATA
   ================================================================
   TODO: Replace placeholder entries with your real projects.

   Fields
   ──────
   id          {string}   Unique slug used for anchor links
   index       {string}   Display number e.g. "01"
   title       {string}   Project name
   shortDesc   {string}   One-liner for homepage rows and card subtitles
   description {string}   Full case study paragraph (shown on projects page)
   challenges  {string}   What was hard (shown on projects page)
   learned     {string}   Key takeaway (shown on projects page)
   tags        {string[]} Technologies / skills used
   liveUrl     {string}   Live demo URL — use "#" if none
   githubUrl   {string}   GitHub repo URL — use "#" if none
   featured    {boolean}  true → appears in homepage teaser (aim for 2–3)
   ================================================================ */
const PROJECTS = [
  {
    id: 'portfolio',
    index: '01',
    title: 'This Portfolio',
    shortDesc: 'Personal website built with HTML, CSS & JS. Hosted on GitHub Pages.',
    description:
      'A single-page portfolio built entirely with vanilla HTML, CSS, and JavaScript — ' +
      'no frameworks, no build tools. Designed with a festival-inspired aesthetic: animated ' +
      'colour blobs, gradient typography, and a scrolling marquee ticker. ' +
      'Fully responsive and deployed on GitHub Pages.',
    challenges:
      'Getting the blob parallax and CSS animations to feel natural without hurting scroll ' +
      'performance. Settling on a colour palette that felt vibrant but not overwhelming on a dark background.',
    learned:
      'How much you can achieve with zero dependencies. Constraint breeds creativity — ' +
      'no framework forced me to deeply understand CSS animations and the IntersectionObserver API.',
    tags: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
    liveUrl:    'https://yourusername.github.io',
    githubUrl:  'https://github.com/yourusername/yourusername.github.io',
    featured: true,
  },
  {
    id: 'project-2',
    index: '02',
    title: 'Project Title',
    shortDesc: 'Short one-line description of what this project does.',
    description:
      'Full description of the project — what it does, who it\'s for, what problem it ' +
      'solves, and how you approached building it. 2–4 sentences is plenty.',
    challenges:
      'Describe the hardest part of building this. What blocked you? How did you work through it?',
    learned:
      'What was your single biggest takeaway from this project? A technical insight, a process ' +
      'lesson, or something about yourself as a builder.',
    tags: ['Tag', 'Tag'],
    liveUrl:   '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 'project-3',
    index: '03',
    title: 'Project Title',
    shortDesc: 'Short one-line description of what this project does.',
    description:
      'Full description of the project — what it does, who it\'s for, what problem it ' +
      'solves, and how you approached building it.',
    challenges:
      'Describe the hardest part of building this.',
    learned:
      'What was your single biggest takeaway from this project?',
    tags: ['Tag', 'Tag'],
    liveUrl:   '#',
    githubUrl: '#',
    featured: false,
  },
  // ── Add more projects here ─────────────────────────────────────
  // {
  //   id: 'my-new-project',
  //   index: '04',
  //   title: 'My New Project',
  //   shortDesc: 'One-liner.',
  //   description: 'Full description.',
  //   challenges: 'What was hard.',
  //   learned: 'What I took away.',
  //   tags: ['React', 'Node.js'],
  //   liveUrl:   'https://my-project.com',
  //   githubUrl: 'https://github.com/yourusername/my-new-project',
  //   featured: false,
  // },
];


/* ================================================================
   NAV & FOOTER HTML BUILDERS
   ================================================================ */

/**
 * Builds the nav HTML string.
 * Detects the current page to set the correct href on each link
 * and applies .nav-active to the matching item.
 *
 * @returns {string} HTML string to inject into #nav-mount
 */
function buildNavHTML() {
  const path = window.location.pathname;
  const isHome = path === '/' || path === '' || path.endsWith('index.html');

  // Each link has a href for use on the homepage and one for other pages
  const links = [
    { label: 'About',    homeHref: '#about',        awayHref: '/#about',        active: false },
    { label: 'Skills',   homeHref: '#skills',       awayHref: '/#skills',       active: false },
    { label: 'Life',     homeHref: '#life',         awayHref: '/#life',         active: false },
    { label: 'Projects', homeHref: '#projects',     awayHref: 'projects.html',  active: path.includes('projects') },
    { label: 'Contact',  homeHref: '#contact',      awayHref: '/#contact',      active: false },
  ];

  const linksHTML = links
    .map(({ label, homeHref, awayHref, active }) => {
      const href = isHome ? homeHref : awayHref;
      const cls  = active ? ' class="nav-active"' : '';
      const aria = active ? ' aria-current="page"' : '';
      return `<li><a href="${href}"${cls}${aria}>${label}</a></li>`;
    })
    .join('');

  return `
    <nav role="navigation" aria-label="Main navigation">
      <div class="nav-inner">
        <a href="/" class="nav-logo">Yusuf<em>.</em></a>
        <ul class="nav-links">${linksHTML}</ul>
      </div>
    </nav>
  `;
}

/**
 * Builds the footer HTML string.
 * TODO: Update year and name as needed.
 *
 * @returns {string} HTML string to inject into #footer-mount
 */
function buildFooterHTML() {
  return `
    <footer role="contentinfo">
      <p>© 2026 Yusuf Baig</p>
      <p>Built with HTML &amp; CSS<span class="footer-star" aria-hidden="true">★</span>Hosted on GitHub Pages</p>
    </footer>
  `;
}


/* ================================================================
   SHARED BEHAVIOUR INITIALISERS
   ================================================================ */

/**
 * Moves the custom dot cursor and lagging ring on mouse movement.
 * Cycles through accent colours when hovering over interactive elements.
 */
function initCursor() {
  const dot  = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  const ACCENT_COLORS = ['#ff4d6d', '#ffbe0b', '#3bceac', '#8338ec', '#ff6b35'];
  let colorIdx = 0;

  document.addEventListener('mousemove', (e) => {
    dot.style.left  = e.clientX + 'px';
    dot.style.top   = e.clientY + 'px';
    ring.style.left = e.clientX + 'px';
    ring.style.top  = e.clientY + 'px';
  });

  document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      colorIdx = (colorIdx + 1) % ACCENT_COLORS.length;
      const c = ACCENT_COLORS[colorIdx];
      dot.style.cssText  += `; width:32px; height:32px; background:${c}`;
      ring.style.cssText += `; width:60px; height:60px; border-color:${c}`;
    });
    el.addEventListener('mouseleave', () => {
      dot.style.cssText  += '; width:12px; height:12px; background:#ff4d6d';
      ring.style.cssText += '; width:36px; height:36px; border-color:rgba(255,77,109,0.5)';
    });
  });
}

/**
 * Fills the #progress bar proportionally to scroll position.
 */
function initScrollProgress() {
  const bar = document.getElementById('progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const total = document.body.scrollHeight - window.innerHeight;
    bar.style.width = total > 0 ? (window.scrollY / total * 100) + '%' : '0%';
  }, { passive: true });
}

/**
 * Applies a gentle Y-axis parallax to the three largest background blobs.
 * Uses requestAnimationFrame for smooth, jank-free motion.
 */
function initParallaxBlobs() {
  const b1 = document.querySelector('.blob-1');
  const b2 = document.querySelector('.blob-2');
  const b3 = document.querySelector('.blob-3');
  if (!b1 || !b2 || !b3) return;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    b1.style.transform = `translate(0, ${y * 0.09}px)`;
    b2.style.transform = `translate(0, ${-(y * 0.05)}px)`;
    b3.style.transform = `translate(0, ${y * 0.06}px)`;
  }, { passive: true });
}

/**
 * Intercepts all internal anchor clicks and scrolls smoothly to the target.
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}


/* ================================================================
   REVEAL ANIMATION
   ================================================================ */

/**
 * Uses IntersectionObserver to add .visible to any .reveal element
 * when it enters the viewport. Call this AFTER rendering dynamic content
 * so all elements are in the DOM before observation begins.
 */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  els.forEach((el) => observer.observe(el));
}


/* ================================================================
   PROJECT RENDERERS
   ================================================================ */

/**
 * Renders the action buttons for a project (Live Demo + GitHub).
 * Skips a button if its URL is "#".
 *
 * @param {Object} project
 * @returns {string} HTML string
 */
function renderProjectLinks(project) {
  const parts = [];
  if (project.liveUrl && project.liveUrl !== '#') {
    parts.push(
      `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer"
          class="btn btn-primary btn-sm">Live Demo ↗</a>`
    );
  }
  if (project.githubUrl && project.githubUrl !== '#') {
    parts.push(
      `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer"
          class="btn btn-outline btn-sm">GitHub ↗</a>`
    );
  }
  return parts.join('');
}

/**
 * Renders featured projects as compact list rows for the homepage.
 * Matches the existing project-row visual style.
 *
 * @param {string} mountId — ID of the element to render into
 */
function renderFeaturedRows(mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;

  const featured = PROJECTS.filter((p) => p.featured);
  mount.innerHTML = featured.map((p) => `
    <a href="projects.html#${p.id}" class="project-row reveal" aria-label="Project: ${p.title}">
      <span class="project-index" aria-hidden="true">${p.index}</span>
      <div class="project-info">
        <h3>${p.title}</h3>
        <p>${p.shortDesc}</p>
        <div class="project-tags">
          ${p.tags.map((t) => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
      <span class="project-arrow" aria-hidden="true">View project →</span>
    </a>
  `).join('');
}

/**
 * Renders featured projects as large visual cards for the projects page.
 * Cards are arranged in a 2-column grid and include full action buttons.
 *
 * @param {string} mountId — ID of the element to render into
 */
function renderFeaturedCards(mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;

  const featured = PROJECTS.filter((p) => p.featured);
  // Cycle through accent colours per card
  const accents = ['var(--c1)', 'var(--c3)', 'var(--c2)', 'var(--c4)'];

  mount.innerHTML = featured.map((p, i) => `
    <article
      class="feat-card reveal"
      style="--card-accent: ${accents[i % accents.length]}"
      id="${p.id}"
      aria-label="Featured project: ${p.title}"
    >
      <div class="feat-card-top">
        <span class="feat-card-index" aria-hidden="true">${p.index}</span>
        <div class="feat-card-tags">
          ${p.tags.map((t) => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
      <h3 class="feat-card-title">${p.title}</h3>
      <p class="feat-card-desc">${p.shortDesc}</p>
      <div class="feat-card-links">${renderProjectLinks(p)}</div>
    </article>
  `).join('');
}

/**
 * Renders ALL projects as an expandable accordion list for the projects page.
 * Clicking a row reveals its full description, challenges, and learned sections.
 *
 * @param {string} mountId — ID of the element to render into
 */
function renderAllProjects(mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;

  mount.innerHTML = PROJECTS.map((p) => `
    <div
      class="proj-row reveal"
      id="detail-${p.id}"
      role="button"
      tabindex="0"
      aria-expanded="false"
      aria-label="Expand project: ${p.title}"
    >
      <div class="proj-row-header">
        <span class="proj-index" aria-hidden="true">${p.index}</span>
        <div class="proj-row-meta">
          <h3 class="proj-row-title">${p.title}</h3>
          <div class="proj-row-tags">
            ${p.tags.map((t) => `<span class="tag">${t}</span>`).join('')}
          </div>
        </div>
        <span class="proj-toggle" aria-hidden="true">+</span>
      </div>

      <div class="proj-row-body" aria-hidden="true">
        <div class="proj-row-body-inner">

          <div class="proj-detail-block">
            <div class="proj-detail-label">Overview</div>
            <p class="proj-detail-text">${p.description}</p>
          </div>

          <div class="proj-detail-cols">
            <div class="proj-detail-block">
              <div class="proj-detail-label">Challenges</div>
              <p class="proj-detail-text">${p.challenges}</p>
            </div>
            <div class="proj-detail-block">
              <div class="proj-detail-label">What I Learned</div>
              <p class="proj-detail-text">${p.learned}</p>
            </div>
          </div>

          <div class="proj-detail-actions">${renderProjectLinks(p)}</div>
        </div>
      </div>
    </div>
  `).join('');

  initAccordion();
}

/**
 * Wires up click and keyboard handlers on .proj-row elements.
 * Opens the clicked row and closes any previously open row.
 */
function initAccordion() {
  document.querySelectorAll('.proj-row').forEach((row) => {
    const open = () => {
      const isOpen = row.classList.contains('is-open');

      // Close all open rows first
      document.querySelectorAll('.proj-row.is-open').forEach((r) => {
        r.classList.remove('is-open');
        r.setAttribute('aria-expanded', 'false');
        r.querySelector('.proj-toggle').textContent = '+';
        r.querySelector('.proj-row-body').setAttribute('aria-hidden', 'true');
      });

      // Toggle the clicked row
      if (!isOpen) {
        row.classList.add('is-open');
        row.setAttribute('aria-expanded', 'true');
        row.querySelector('.proj-toggle').textContent = '−';
        row.querySelector('.proj-row-body').setAttribute('aria-hidden', 'false');
      }
    };

    row.addEventListener('click', open);
    row.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open();
      }
    });
  });
}


/* ================================================================
   PUBLIC API  —  window.YB
   ================================================================ */

window.YB = {
  /** All project data. Exposed for any custom page-level scripting. */
  PROJECTS,

  /**
   * Call once per page after DOMContentLoaded.
   * Mounts nav + footer, starts all shared interactive behaviours.
   */
  initShared() {
    // Mount nav
    const navMount = document.getElementById('nav-mount');
    if (navMount) navMount.innerHTML = buildNavHTML();

    // Mount footer
    const footerMount = document.getElementById('footer-mount');
    if (footerMount) footerMount.innerHTML = buildFooterHTML();

    // Shared behaviours
    initCursor();
    initScrollProgress();
    initParallaxBlobs();
    initSmoothScroll();
  },

  /**
   * Start observing .reveal elements. Call AFTER all dynamic
   * content has been rendered so every element is in the DOM.
   */
  initReveal,

  /** Render featured projects as list rows (homepage). */
  renderFeaturedRows,

  /** Render featured projects as visual cards (projects page). */
  renderFeaturedCards,

  /** Render all projects as an expandable accordion (projects page). */
  renderAllProjects,
};
