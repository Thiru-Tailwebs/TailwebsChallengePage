# Tailwebs Challenge Page — Component Restructure + Tailwind CSS

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the monolithic `TailwebsChallengePage.jsx` into a proper React project with organized components, hooks, data files, Tailwind CSS, and placeholder images.

**Architecture:** Move everything into `src/` with components split by section (Navbar, Hero, Stats, HowItWorks, UrgencyBar, Deliverables, Testimonials, FAQ, ChallengeForm, Footer). Extract reusable hooks and static data into their own files. Replace all inline CSS with Tailwind utility classes. Add placeholder images via picsum.photos URLs in Hero, Deliverables, and Testimonials sections.

**Tech Stack:** React 18, Vite 6, Tailwind CSS v3, PostCSS, Autoprefixer

---

## File Structure

```
src/
  App.jsx                    — Main page composing all section components
  main.jsx                   — ReactDOM entry point (moved from root)
  index.css                  — Tailwind directives + custom CSS variables + keyframes
  hooks/
    useCountUp.js            — Animated counter hook
    useIntersectionObserver.js — Scroll-triggered visibility hook
  data/
    faqs.js                  — FAQ questions/answers array
    steps.js                 — How-it-works steps array
    deliverables.js          — "What you get" cards array
    testimonials.js          — Testimonial cards array
  components/
    Navbar.jsx               — Fixed top navigation
    Hero.jsx                 — Hero section with badge, heading, CTAs, trust strip
    Stats.jsx                — Stats counter cards section (includes StatCard)
    HowItWorks.jsx           — 4-step process section
    UrgencyBar.jsx           — Slots remaining bar
    Deliverables.jsx         — "What you get" cards section
    Testimonials.jsx         — Client testimonials section
    FAQ.jsx                  — Accordion FAQ section (includes FAQItem)
    ChallengeForm.jsx        — Form section with validation + success state
    Footer.jsx               — Footer with links
    FadeUp.jsx               — Reusable scroll-reveal wrapper
server/
  api.js                     — (unchanged)
index.html                   — Update script src to /src/main.jsx
vite.config.js               — Update server/api import path
tailwind.config.js           — New: Tailwind config with custom theme
postcss.config.js            — New: PostCSS config for Tailwind
```

---

### Task 1: Install Tailwind CSS and configure

**Files:**
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `src/index.css`

- [ ] **Step 1: Install Tailwind CSS, PostCSS, and Autoprefixer**

```bash
cd /Users/thiru/Desktop/Projects/TailwebsChallengePage
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init
```

- [ ] **Step 2: Create `postcss.config.js`**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 3: Configure `tailwind.config.js` with custom theme**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        tw: {
          primary: "#E63946",
          "primary-hover": "#D42D3A",
          dark: "#1A1A2E",
          dark2: "#242627",
          accent: "#0693e3",
          purple: "#9b51e0",
          "off-white": "#F7F7F8",
          bg: "#FFFFFF",
          bg2: "#FAFAFA",
          bg3: "#F0F0F2",
          "bg-dark": "#0A0A0F",
          "bg-dark2": "#141418",
          text: "#1A1A2E",
          "text-inv": "#F5F5F7",
          muted: "#6B7280",
          "muted-light": "#9CA3AF",
          gold: "#F5A623",
        },
      },
      fontFamily: {
        heading: ["'Plus Jakarta Sans'", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "sans-serif"],
        body: ["'Plus Jakarta Sans'", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "sans-serif"],
        serif: ["'Instrument Serif'", "Georgia", "serif"],
      },
      maxWidth: {
        container: "1280px",
      },
      borderRadius: {
        sm: "4px",
        lg: "8px",
        xl: "12px",
      },
      boxShadow: {
        sm: "0 1px 3px rgba(0,0,0,0.06)",
        md: "0 4px 16px rgba(0,0,0,0.08)",
        lg: "0 12px 40px rgba(0,0,0,0.12)",
        primary: "0 8px 32px rgba(230,57,70,0.3)",
      },
      keyframes: {
        orbFloat: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-30px)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.7)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(28px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        spin: {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "orb-float": "orbFloat 8s ease-in-out infinite",
        pulse: "pulse 2s infinite",
        "fade-up": "fadeUp 0.65s cubic-bezier(0.22, 1, 0.36, 1) both",
        spin: "spin 0.6s linear infinite",
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 4: Create `src/index.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800&family=Instrument+Serif:ital@0;1&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  html { scroll-behavior: auto; }
}
```

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.js postcss.config.js src/index.css
git commit -m "feat: add Tailwind CSS v3 with custom theme config"
```

---

### Task 2: Create data files

**Files:**
- Create: `src/data/faqs.js`
- Create: `src/data/steps.js`
- Create: `src/data/deliverables.js`
- Create: `src/data/testimonials.js`

- [ ] **Step 1: Create `src/data/faqs.js`**

Extract the `faqs` array from `TailwebsChallengePage.jsx` lines 237-244.

- [ ] **Step 2: Create `src/data/steps.js`**

Extract the `steps` array from lines 246-251.

- [ ] **Step 3: Create `src/data/deliverables.js`**

Extract the `gets` array from lines 253-260.

- [ ] **Step 4: Create `src/data/testimonials.js`**

Extract the `testimonials` array from lines 262-266. Add `avatar` field with picsum placeholder URLs:
```js
{ ..., avatar: "https://i.pravatar.cc/150?img=11" }
```

- [ ] **Step 5: Commit**

```bash
git add src/data/
git commit -m "feat: extract static data into separate data files"
```

---

### Task 3: Create hooks

**Files:**
- Create: `src/hooks/useCountUp.js`
- Create: `src/hooks/useIntersectionObserver.js`

- [ ] **Step 1: Create `src/hooks/useCountUp.js`**

Extract `useCountUp` from lines 269-285.

- [ ] **Step 2: Create `src/hooks/useIntersectionObserver.js`**

Extract `useIntersectionObserver` from lines 287-301.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/
git commit -m "feat: extract custom hooks into hooks directory"
```

---

### Task 4: Create FadeUp component

**Files:**
- Create: `src/components/FadeUp.jsx`

- [ ] **Step 1: Create `src/components/FadeUp.jsx`**

Uses `useIntersectionObserver` hook. Applies Tailwind classes for opacity-0 default, animate-fade-up when visible.

- [ ] **Step 2: Commit**

```bash
git add src/components/FadeUp.jsx
git commit -m "feat: add FadeUp scroll-reveal component"
```

---

### Task 5: Create Navbar component

**Files:**
- Create: `src/components/Navbar.jsx`

- [ ] **Step 1: Create `src/components/Navbar.jsx`**

Props: `scrollTo` function. Internal `navScrolled` state with scroll listener. Convert all `.nav*` CSS classes to Tailwind utilities. Keep the nav-logo, nav-links, and nav-cta structure.

- [ ] **Step 2: Commit**

---

### Task 6: Create Hero component with images

**Files:**
- Create: `src/components/Hero.jsx`

- [ ] **Step 1: Create `src/components/Hero.jsx`**

Props: `slotsLeft`, `scrollTo`. Convert hero section to Tailwind. Add a placeholder illustration image beside or below the hero content (e.g., `https://images.unsplash.com/photo-1551434678-e076c223a692?w=600` — team working at computers). The image should be visible on desktop, hidden on mobile.

- [ ] **Step 2: Commit**

---

### Task 7: Create Stats component

**Files:**
- Create: `src/components/Stats.jsx`

- [ ] **Step 1: Create `src/components/Stats.jsx`**

Includes internal `StatCard` sub-component. Uses `useCountUp` hook. Convert to Tailwind.

- [ ] **Step 2: Commit**

---

### Task 8: Create HowItWorks component with image

**Files:**
- Create: `src/components/HowItWorks.jsx`

- [ ] **Step 1: Create `src/components/HowItWorks.jsx`**

Import `steps` from data. Convert to Tailwind. Add a placeholder process/workflow image above or beside the steps grid (e.g., `https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600` — whiteboard planning).

- [ ] **Step 2: Commit**

---

### Task 9: Create UrgencyBar component

**Files:**
- Create: `src/components/UrgencyBar.jsx`

- [ ] **Step 1: Create `src/components/UrgencyBar.jsx`**

Props: `slotsLeft`, `totalSlots`, `scrollTo`. Convert to Tailwind.

- [ ] **Step 2: Commit**

---

### Task 10: Create Deliverables component with images

**Files:**
- Create: `src/components/Deliverables.jsx`

- [ ] **Step 1: Create `src/components/Deliverables.jsx`**

Import `deliverables` from data. Convert to Tailwind. Add a placeholder image at the top of the section (e.g., `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600` — dashboard/analytics screen).

- [ ] **Step 2: Commit**

---

### Task 11: Create Testimonials component with avatar images

**Files:**
- Create: `src/components/Testimonials.jsx`

- [ ] **Step 1: Create `src/components/Testimonials.jsx`**

Import `testimonials` from data. Replace the gradient-circle initials avatars with `<img>` tags using the pravatar.cc placeholder URLs from the data file. Convert to Tailwind.

- [ ] **Step 2: Commit**

---

### Task 12: Create FAQ component

**Files:**
- Create: `src/components/FAQ.jsx`

- [ ] **Step 1: Create `src/components/FAQ.jsx`**

Contains `FAQItem` sub-component with open/close state. Import `faqs` from data. Convert to Tailwind.

- [ ] **Step 2: Commit**

---

### Task 13: Create ChallengeForm component

**Files:**
- Create: `src/components/ChallengeForm.jsx`

- [ ] **Step 1: Create `src/components/ChallengeForm.jsx`**

Contains all form state, validation logic, submit handler. Convert to Tailwind. This is the largest component — keep `validateEmail` and `validatePhone` as local helpers inside the file.

- [ ] **Step 2: Commit**

---

### Task 14: Create Footer component

**Files:**
- Create: `src/components/Footer.jsx`

- [ ] **Step 1: Create `src/components/Footer.jsx`**

Convert to Tailwind.

- [ ] **Step 2: Commit**

---

### Task 15: Create App.jsx and update entry points

**Files:**
- Create: `src/App.jsx`
- Modify: `main.jsx` → move to `src/main.jsx`
- Modify: `index.html:61` — update script src
- Modify: `vite.config.js:3` — update server import path

- [ ] **Step 1: Create `src/App.jsx`**

Composes all section components. Manages shared state: `slotsLeft`, `totalSlots`, `scrollTo` helper. Passes props down.

- [ ] **Step 2: Move `main.jsx` to `src/main.jsx`**

Update imports: `import App from "./App.jsx"` and `import "./index.css"`.

- [ ] **Step 3: Update `index.html` script src**

Change `/main.jsx` to `/src/main.jsx`.

- [ ] **Step 4: Update `vite.config.js` server import**

Change `"./server/api.js"` to `"./server/api.js"` (stays the same since server is at root).

- [ ] **Step 5: Delete old `TailwebsChallengePage.jsx` and root `main.jsx`**

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: restructure project with component architecture and Tailwind CSS"
```

---

### Task 16: Verify the app runs

- [ ] **Step 1: Run `npm run dev` and verify no errors**
- [ ] **Step 2: Check each section renders correctly in the browser**
- [ ] **Step 3: Verify images load in Hero, HowItWorks, Deliverables, and Testimonials**
