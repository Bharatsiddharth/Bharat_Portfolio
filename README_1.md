# Bharat Siddharth Yadav — Portfolio

A dark, animated portfolio built with **Three.js**, **GSAP**, and vanilla JavaScript.

## 🚀 Tech Stack
- **Three.js** — 3D particle field, rotating wireframe orbs
- **GSAP + ScrollTrigger** — Scroll-driven animations, magnetic card tilt effects
- **CSS animations** — Marquee scrolling, reveal transitions, cursor effects
- **No build step needed** — Just open `index.html` in a browser or deploy!

---

## 📁 Structure
```
bharat-portfolio/
├── index.html          ← Main HTML (all sections)
├── src/
│   ├── styles.css      ← All styles (dark neon theme)
│   └── main.js         ← Three.js + GSAP + all animations
└── README.md
```

---

## ➕ Adding Your GitHub Projects

Open `index.html` and find the **`#projects`** section. Copy this block for each new project:

```html
<div class="project-card reveal-up" style="--d:0.Xs" data-color="#e8ff5a">
  <div class="project-num">0N</div>
  <div class="project-body">
    <h3>Your Project Name</h3>
    <p>Brief description of what the project does and what problem it solves.</p>
    <div class="project-tags">
      <span>Tech1</span><span>Tech2</span><span>Tech3</span>
    </div>
  </div>
  <div class="project-links">
    <a href="YOUR_LIVE_DEMO_URL" class="proj-link" target="_blank">Live ↗</a>
    <a href="YOUR_GITHUB_REPO_URL" class="proj-link" target="_blank">GitHub ↗</a>
  </div>
  <div class="project-glow"></div>
</div>
```

**Tips:**
- Change `--d:0.Xs` (e.g. `0.4s`) to stagger the animation delay
- Change `0N` to your project number (04, 05, etc.)
- `data-color` can be `#e8ff5a`, `#5affe8`, or `#ff8a5a`
- Remove the `<a href="...">Live ↗</a>` line if there's no live demo

---

## 🔗 Updating Your Links

In `index.html`, search for these placeholders and replace:
- `https://github.com/bharatsiddharthyadav` → your actual GitHub URL
- `https://linkedin.com` → your LinkedIn URL
- Live demo links in each project card

---

## 🎨 Customizing Colors

In `src/styles.css`, the `:root` block controls all colors:

```css
:root {
  --bg: #080810;          /* Main background */
  --accent: #e8ff5a;      /* Neon yellow — primary accent */
  --accent2: #5affe8;     /* Cyan — secondary accent */
  --accent3: #ff8a5a;     /* Orange — tertiary accent */
}
```

---

## 🌐 Deploying

**Vercel (recommended):**
1. Push folder to GitHub
2. Import repo on vercel.com
3. Deploy — no configuration needed!

**Netlify:**
1. Drag & drop the `bharat-portfolio/` folder on netlify.com/drop

---

## 📞 Contact Info to Update

Search `index.html` for:
- `bharatsiddharthyadav@gmail.com`
- `+91-9589359892`
- `Indore, M.P.`

Replace with updated details if needed.
