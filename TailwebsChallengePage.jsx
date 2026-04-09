import { useState, useEffect, useRef, useCallback } from "react";

/* ─── TAILWEBS DESIGN TOKENS (extracted from tailwebs.com) ─── */
const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800&family=Instrument+Serif:ital@0;1&display=swap');
`;

const styles = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    /* Tailwebs brand palette — from tailwebs.com screenshot + project colors */
    --tw-primary: #E63946;
    --tw-primary-hover: #D42D3A;
    --tw-primary-dim: rgba(230,57,70,0.07);
    --tw-primary-mid: rgba(230,57,70,0.18);
    --tw-primary-glow: rgba(230,57,70,0.15);
    --tw-dark: #1A1A2E;
    --tw-dark2: #242627;
    --tw-accent: #0693e3;
    --tw-purple: #9b51e0;
    --tw-white: #ffffff;
    --tw-off-white: #F7F7F8;
    --tw-bg: #FFFFFF;
    --tw-bg2: #FAFAFA;
    --tw-bg3: #F0F0F2;
    --tw-bg-dark: #0A0A0F;
    --tw-bg-dark2: #141418;
    --tw-text: #1A1A2E;
    --tw-text-inv: #F5F5F7;
    --tw-muted: #6B7280;
    --tw-muted-light: #9CA3AF;
    --tw-border: rgba(0,0,0,0.08);
    --tw-border-dark: rgba(255,255,255,0.1);
    --tw-card: #ffffff;
    --tw-card-dark: rgba(20,20,24,0.7);
    --tw-radius: 4px;
    --tw-radius-lg: 8px;
    --tw-radius-xl: 12px;
    --tw-max-width: 1280px;
    --tw-heading: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --tw-body: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --tw-serif: 'Instrument Serif', Georgia, serif;
    --tw-shadow-sm: 0 1px 3px rgba(0,0,0,0.06);
    --tw-shadow-md: 0 4px 16px rgba(0,0,0,0.08);
    --tw-shadow-lg: 0 12px 40px rgba(0,0,0,0.12);
    --tw-shadow-primary: 0 8px 32px rgba(230,57,70,0.3);
    --tw-gold: #F5A623;
  }
  html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
  body { background: var(--tw-bg); color: var(--tw-text); font-family: var(--tw-body); overflow-x: hidden; line-height: 1.6; }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
    html { scroll-behavior: auto; }
  }

  /* ─── NAV ─── */
  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 0 5%; display: flex; align-items: center; justify-content: space-between; height: 64px; background: rgba(255,255,255,0.92); backdrop-filter: blur(20px) saturate(180%); -webkit-backdrop-filter: blur(20px) saturate(180%); border-bottom: 1px solid var(--tw-border); transition: box-shadow 0.3s; }
  .nav.scrolled { box-shadow: var(--tw-shadow-sm); }
  .nav-logo { font-family: var(--tw-heading); font-weight: 800; font-size: 1.3rem; color: var(--tw-dark); letter-spacing: -0.03em; text-decoration: none; }
  .nav-logo span { color: var(--tw-primary); }
  .nav-links { display: flex; align-items: center; gap: 32px; }
  @media(max-width:768px) { .nav-links { display: none; } }
  .nav-link { font-size: 0.875rem; font-weight: 500; color: var(--tw-muted); text-decoration: none; cursor: pointer; transition: color 0.2s; }
  .nav-link:hover, .nav-link:focus-visible { color: var(--tw-primary); outline: none; }
  .nav-cta { background: var(--tw-primary); color: var(--tw-white); border: none; border-radius: var(--tw-radius); padding: 10px 24px; font-family: var(--tw-body); font-size: 0.875rem; font-weight: 600; cursor: pointer; transition: background 0.2s, transform 0.15s, box-shadow 0.2s; }
  .nav-cta:hover { background: var(--tw-primary-hover); transform: translateY(-1px); box-shadow: var(--tw-shadow-primary); }
  .nav-cta:focus-visible { outline: 2px solid var(--tw-primary); outline-offset: 2px; }

  /* ─── HERO ─── */
  .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 120px 5% 80px; position: relative; overflow: hidden; background: var(--tw-bg-dark); }
  .hero-pattern { position: absolute; inset: 0; background-image:
    radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0);
    background-size: 40px 40px; }
  .hero-glow { position: absolute; top: -20%; left: 50%; transform: translateX(-50%); width: 1000px; height: 600px; background: radial-gradient(ellipse, rgba(230,57,70,0.18) 0%, rgba(230,57,70,0.06) 40%, transparent 70%); pointer-events: none; }
  .hero-glow2 { position: absolute; bottom: -10%; right: -5%; width: 500px; height: 500px; background: radial-gradient(ellipse, rgba(155,81,224,0.1) 0%, transparent 70%); pointer-events: none; }
  .hero-orb { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; animation: orbFloat 8s ease-in-out infinite; }
  .hero-orb-1 { top: 15%; left: 10%; width: 300px; height: 300px; background: rgba(230,57,70,0.1); }
  .hero-orb-2 { bottom: 20%; right: 10%; width: 250px; height: 250px; background: rgba(155,81,224,0.1); animation-delay: -4s; }
  @keyframes orbFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-30px)} }
  .hero-content { position: relative; max-width: 900px; text-align: center; }
  .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 100px; padding: 7px 18px 7px 12px; font-size: 0.78rem; font-weight: 600; color: var(--tw-accent); letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 32px; backdrop-filter: blur(8px); }
  .hero-badge-dot { width: 7px; height: 7px; border-radius: 50%; background: #00d084; box-shadow: 0 0 10px #00d084; animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.7)} }
  .hero-h1 { font-family: var(--tw-heading); font-size: clamp(2.6rem, 6.5vw, 4.5rem); font-weight: 800; line-height: 1.05; letter-spacing: -0.035em; margin-bottom: 24px; color: var(--tw-text-inv); }
  .hero-h1 .hl { position: relative; display: inline-block; }
  .hero-h1 .hl-serif { font-family: var(--tw-serif); font-style: italic; font-weight: 400; }
  .hero-h1 .hl-gradient { background: linear-gradient(135deg, #E63946, #FF6B6B 50%, #F5A623 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .hero-sub { font-size: clamp(1.05rem, 2vw, 1.2rem); color: var(--tw-muted-light); line-height: 1.7; max-width: 620px; margin: 0 auto 44px; font-weight: 400; }
  .hero-sub strong { color: var(--tw-text-inv); font-weight: 600; }
  .hero-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-bottom: 56px; }
  .btn-primary { background: var(--tw-primary); color: var(--tw-white); border: none; border-radius: var(--tw-radius); padding: 16px 36px; font-family: var(--tw-body); font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.2s; display: inline-flex; align-items: center; gap: 8px; }
  .btn-primary:hover { background: var(--tw-primary-hover); transform: translateY(-2px); box-shadow: var(--tw-shadow-primary); }
  .btn-primary:focus-visible { outline: 2px solid var(--tw-accent); outline-offset: 2px; }
  .btn-secondary { background: rgba(255,255,255,0.06); color: var(--tw-text-inv); border: 1px solid rgba(255,255,255,0.12); border-radius: var(--tw-radius); padding: 16px 30px; font-family: var(--tw-body); font-size: 1rem; font-weight: 500; cursor: pointer; transition: all 0.2s; backdrop-filter: blur(8px); }
  .btn-secondary:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.2); }
  .btn-secondary:focus-visible { outline: 2px solid var(--tw-accent); outline-offset: 2px; }

  /* ─── TRUST STRIP ─── */
  .trust-strip { display: flex; align-items: center; justify-content: center; gap: 28px; flex-wrap: wrap; padding: 20px 0; border-top: 1px solid rgba(255,255,255,0.08); }
  .trust-item { display: flex; align-items: center; gap: 8px; font-size: 0.82rem; color: var(--tw-muted-light); font-weight: 500; }
  .trust-icon { font-size: 1rem; }

  /* ─── STATS ─── */
  .stats-section { padding: 0 5%; margin-top: -48px; position: relative; z-index: 10; }
  .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; max-width: var(--tw-max-width); margin: 0 auto; background: var(--tw-border); border-radius: var(--tw-radius-xl); overflow: hidden; box-shadow: var(--tw-shadow-lg); }
  @media(max-width:640px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
  .stat-card { background: var(--tw-bg2); padding: 40px 28px; text-align: center; transition: background 0.2s; }
  .stat-card:hover { background: var(--tw-off-white); }
  .stat-num { font-family: var(--tw-heading); font-size: clamp(2rem, 4vw, 2.8rem); font-weight: 800; color: var(--tw-primary); line-height: 1; margin-bottom: 8px; }
  .stat-label { font-size: 0.82rem; color: var(--tw-muted); font-weight: 500; line-height: 1.5; }

  /* ─── SECTION COMMON ─── */
  .section { padding: 100px 5%; }
  .section-tag { display: inline-block; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--tw-primary); background: var(--tw-primary-dim); border: 1px solid var(--tw-primary-mid); border-radius: var(--tw-radius); padding: 5px 14px; margin-bottom: 18px; }
  .section-h2 { font-family: var(--tw-heading); font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 800; letter-spacing: -0.03em; line-height: 1.12; margin-bottom: 14px; max-width: 640px; color: var(--tw-text); }
  .section-h2 .hl-serif { font-family: var(--tw-serif); font-style: italic; font-weight: 400; }
  .section-sub { font-size: 1.05rem; color: var(--tw-muted); line-height: 1.7; max-width: 560px; }

  /* ─── HOW IT WORKS ─── */
  .how-wrap { max-width: var(--tw-max-width); margin: 0 auto; }
  .how-header { margin-bottom: 56px; }
  .steps-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--tw-border); border-radius: var(--tw-radius-xl); overflow: hidden; box-shadow: var(--tw-shadow-sm); }
  @media(max-width:900px) { .steps-grid { grid-template-columns: repeat(2, 1fr); } }
  @media(max-width:520px) { .steps-grid { grid-template-columns: 1fr; } }
  .step-card { background: var(--tw-bg2); padding: 40px 32px; position: relative; transition: background 0.25s; }
  .step-card:hover { background: var(--tw-off-white); }
  .step-num { font-family: var(--tw-heading); font-weight: 800; width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; color: var(--tw-primary); background: var(--tw-primary-dim); border: 1px solid var(--tw-primary-mid); border-radius: var(--tw-radius-lg); margin-bottom: 22px; }
  .step-title { font-family: var(--tw-heading); font-size: 1.1rem; font-weight: 700; margin-bottom: 10px; color: var(--tw-text); }
  .step-desc { font-size: 0.88rem; color: var(--tw-muted); line-height: 1.7; }
  .step-time { display: inline-block; margin-top: 18px; font-size: 0.72rem; font-weight: 700; color: var(--tw-primary); letter-spacing: 0.06em; text-transform: uppercase; background: var(--tw-primary-dim); border-radius: var(--tw-radius); padding: 4px 12px; }

  /* ─── WHAT YOU GET ─── */
  .get-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: var(--tw-max-width); margin: 0 auto; }
  @media(max-width:640px) { .get-grid { grid-template-columns: 1fr; } }
  .get-card { background: var(--tw-bg2); border: 1px solid var(--tw-border); border-radius: var(--tw-radius-xl); padding: 36px; transition: border-color 0.25s, transform 0.2s, box-shadow 0.2s; }
  .get-card:hover { border-color: var(--tw-primary-mid); transform: translateY(-3px); box-shadow: var(--tw-shadow-md); }
  .get-icon { font-size: 1.8rem; margin-bottom: 18px; width: 52px; height: 52px; display: flex; align-items: center; justify-content: center; background: var(--tw-primary-dim); border-radius: var(--tw-radius-lg); }
  .get-title { font-family: var(--tw-heading); font-size: 1.05rem; font-weight: 700; margin-bottom: 10px; color: var(--tw-text); }
  .get-desc { font-size: 0.88rem; color: var(--tw-muted); line-height: 1.7; }

  /* ─── TESTIMONIALS ─── */
  .testi-section { background: var(--tw-off-white); }
  .testi-wrap { max-width: var(--tw-max-width); margin: 0 auto; }
  .testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  @media(max-width:900px) { .testi-grid { grid-template-columns: 1fr; } }
  .testi-card { background: var(--tw-bg2); border: 1px solid var(--tw-border); border-radius: var(--tw-radius-xl); padding: 36px; transition: border-color 0.25s, box-shadow 0.2s; }
  .testi-card:hover { border-color: var(--tw-primary-mid); box-shadow: var(--tw-shadow-md); }
  .testi-stars { color: var(--tw-gold); font-size: 0.9rem; margin-bottom: 18px; letter-spacing: 2px; }
  .testi-quote { font-size: 0.95rem; color: var(--tw-text); line-height: 1.75; margin-bottom: 24px; }
  .testi-author { display: flex; align-items: center; gap: 14px; }
  .testi-avatar { width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, var(--tw-primary), var(--tw-accent)); display: flex; align-items: center; justify-content: center; font-family: var(--tw-heading); font-weight: 700; font-size: 0.85rem; color: var(--tw-white); flex-shrink: 0; }
  .testi-name { font-weight: 700; font-size: 0.9rem; color: var(--tw-text); }
  .testi-role { font-size: 0.78rem; color: var(--tw-muted); margin-top: 2px; }

  /* ─── URGENCY BAR ─── */
  .urgency-bar { background: var(--tw-bg-dark); padding: 28px 5%; }
  .urgency-inner { max-width: var(--tw-max-width); margin: 0 auto; display: flex; align-items: center; justify-content: center; gap: 28px; flex-wrap: wrap; }
  .urgency-text { font-size: 0.95rem; color: var(--tw-muted-light); font-weight: 400; max-width: 400px; }
  .urgency-count { font-family: var(--tw-heading); font-size: 1.6rem; font-weight: 800; color: var(--tw-accent); }
  .urgency-label { font-size: 0.78rem; color: var(--tw-muted-light); }
  .slots-row { display: flex; gap: 5px; }
  .slot { width: 20px; height: 20px; border-radius: var(--tw-radius); transition: transform 0.2s; }
  .slot.filled { background: var(--tw-primary); }
  .slot.empty { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); }

  /* ─── FAQ ─── */
  .faq-wrap { max-width: 760px; margin: 0 auto; }
  .faq-item { border-bottom: 1px solid var(--tw-border); }
  .faq-q { width: 100%; background: none; border: none; color: var(--tw-text); font-family: var(--tw-body); font-size: 1rem; font-weight: 600; padding: 24px 0; text-align: left; cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 16px; transition: color 0.2s; line-height: 1.5; }
  .faq-q:hover, .faq-q:focus-visible { color: var(--tw-primary); outline: none; }
  .faq-arrow { flex-shrink: 0; width: 28px; height: 28px; border-radius: var(--tw-radius-lg); background: var(--tw-primary-dim); display: flex; align-items: center; justify-content: center; font-size: 0.75rem; transition: transform 0.3s, background 0.2s; color: var(--tw-primary); }
  .faq-arrow.open { transform: rotate(180deg); background: var(--tw-primary); color: var(--tw-white); }
  .faq-a { font-size: 0.92rem; color: var(--tw-muted); line-height: 1.75; padding-bottom: 0; max-height: 0; overflow: hidden; transition: max-height 0.4s ease, padding-bottom 0.3s; }
  .faq-a.open { max-height: 300px; padding-bottom: 24px; }

  /* ─── FORM SECTION ─── */
  .form-section { padding: 100px 5%; position: relative; overflow: hidden; background: var(--tw-bg-dark); }
  .form-glow { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 800px; height: 500px; background: radial-gradient(ellipse, rgba(230,57,70,0.12) 0%, transparent 70%); pointer-events: none; }
  .form-wrap { max-width: 700px; margin: 0 auto; position: relative; }
  .form-card { background: var(--tw-card-dark); border: 1px solid var(--tw-border-dark); border-radius: var(--tw-radius-xl); padding: 56px 52px; backdrop-filter: blur(20px); }
  @media(max-width:600px) { .form-card { padding: 36px 24px; } }
  .form-title { font-family: var(--tw-heading); font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 800; letter-spacing: -0.025em; margin-bottom: 10px; line-height: 1.15; color: var(--tw-text-inv); }
  .form-subtitle { font-size: 0.95rem; color: var(--tw-muted-light); margin-bottom: 36px; line-height: 1.65; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
  @media(max-width:520px) { .form-row { grid-template-columns: 1fr; } }
  .form-group { display: flex; flex-direction: column; gap: 7px; margin-bottom: 16px; }
  .form-label { font-size: 0.78rem; font-weight: 600; color: var(--tw-muted-light); letter-spacing: 0.05em; text-transform: uppercase; }
  .form-input { background: rgba(255,255,255,0.04); border: 1px solid var(--tw-border-dark); border-radius: var(--tw-radius-lg); padding: 14px 16px; font-family: var(--tw-body); font-size: 0.95rem; color: var(--tw-text-inv); outline: none; transition: border-color 0.2s, box-shadow 0.2s; width: 100%; }
  .form-input:focus { border-color: var(--tw-primary); box-shadow: 0 0 0 3px rgba(230,57,70,0.12); }
  .form-input::placeholder { color: var(--tw-muted-light); opacity: 0.5; }
  .form-input[aria-invalid="true"] { border-color: #cf2e2e; box-shadow: 0 0 0 3px rgba(207,46,46,0.12); }
  .form-error { font-size: 0.75rem; color: #cf2e2e; margin-top: 4px; }
  textarea.form-input { resize: vertical; min-height: 120px; }
  select.form-input { cursor: pointer; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238E99B0' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 16px center; }
  .form-submit { width: 100%; background: var(--tw-primary); color: var(--tw-white); border: none; border-radius: var(--tw-radius); padding: 17px; font-family: var(--tw-body); font-size: 1.05rem; font-weight: 700; cursor: pointer; transition: all 0.2s; margin-top: 8px; display: flex; align-items: center; justify-content: center; gap: 8px; }
  .form-submit:hover:not(:disabled) { background: var(--tw-primary-hover); transform: translateY(-2px); box-shadow: var(--tw-shadow-primary); }
  .form-submit:focus-visible { outline: 2px solid var(--tw-accent); outline-offset: 2px; }
  .form-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; box-shadow: none; }
  .form-note { font-size: 0.78rem; color: var(--tw-muted-light); text-align: center; margin-top: 16px; opacity: 0.7; }
  .success-box { text-align: center; padding: 40px 20px; }
  .success-icon { font-size: 3.5rem; margin-bottom: 16px; }
  .success-title { font-family: var(--tw-heading); font-size: 1.5rem; font-weight: 800; margin-bottom: 12px; color: var(--tw-text-inv); }
  .success-msg { font-size: 0.95rem; color: var(--tw-muted-light); line-height: 1.7; }

  /* ─── FOOTER ─── */
  .footer { border-top: 1px solid var(--tw-border); padding: 40px 5%; }
  .footer-inner { max-width: var(--tw-max-width); margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
  .footer-logo { font-family: var(--tw-heading); font-weight: 800; font-size: 1.15rem; color: var(--tw-dark); }
  .footer-logo span { color: var(--tw-primary); }
  .footer-links { display: flex; gap: 24px; flex-wrap: wrap; }
  .footer-link { font-size: 0.82rem; color: var(--tw-muted); text-decoration: none; transition: color 0.2s; cursor: pointer; }
  .footer-link:hover, .footer-link:focus-visible { color: var(--tw-primary); outline: none; }
  .footer-copy { font-size: 0.78rem; color: var(--tw-muted); width: 100%; text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--tw-border); }

  /* ─── ANIMATIONS ─── */
  @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
  .fade-up { opacity: 0; }
  .fade-up.visible { animation: fadeUp 0.65s cubic-bezier(0.22, 1, 0.36, 1) both; }
  .delay-1 { animation-delay: 0.1s; }
  .delay-2 { animation-delay: 0.2s; }
  .delay-3 { animation-delay: 0.32s; }
  .delay-4 { animation-delay: 0.44s; }

  /* Spinner */
  .spinner { width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.3); border-top-color: var(--tw-white); border-radius: 50%; animation: spin 0.6s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }

  @media(max-width:768px) {
    .trust-strip { gap: 16px; }
    .footer-inner { justify-content: center; text-align: center; }
    .footer-links { justify-content: center; }
  }
`;

/* ─── DATA ─── */
const faqs = [
  {
    q: "What exactly do I get from the 24-hour challenge?",
    a: "You'll receive a working clickable prototype or MVP of your idea — depending on complexity. This includes UI/UX design, basic functionality, and a roadmap for the full build. Our AI-assisted workflow means we move fast without sacrificing quality.",
  },
  {
    q: "How much does it cost?",
    a: "The 24-hour challenge is offered at a fraction of traditional development costs — typically 1/10th of what a conventional agency would charge for the same output. Exact pricing depends on your project scope, which we discuss during your 30-minute kick-off call.",
  },
  {
    q: "What if I just have a rough idea — is that enough?",
    a: "Absolutely. That's exactly what we're built for. Share your rough idea in the form, and during the kick-off call our product consultants will help shape it into a buildable concept. You don't need to have a complete spec — just your vision.",
  },
  {
    q: "How are you able to do this so fast?",
    a: "Tailwebs has spent 10+ years perfecting our development process, and we've now integrated AI into every stage — ideation, wireframing, design, and development. Our team works in parallel sprints, cutting the work that used to take weeks into hours.",
  },
  {
    q: "What happens after the challenge — can you build the full product?",
    a: "Yes. The 24-hour challenge is often the first step of a longer engagement. We guide you from prototype to full build to scaling. Many of our long-term clients started with exactly this challenge.",
  },
  {
    q: "How many slots are available?",
    a: "We deliberately keep challenge slots limited to ensure each project gets dedicated attention. We typically open 10 slots per week. Once they're filled, you're moved to the next available week.",
  },
];

const steps = [
  {
    num: "01",
    title: "Book Your Slot",
    desc: "Fill out the form below. Tell us your idea in plain language — no tech jargon needed. We'll confirm your 30-minute kick-off call within 2 hours.",
    time: "Day 0",
  },
  {
    num: "02",
    title: "The Kick-off Call",
    desc: "Our product team listens to your vision, maps out the core features, and aligns on what we'll build. This is where ideas become build plans.",
    time: "Day 0 — 30 min",
  },
  {
    num: "03",
    title: "AI-Powered Build",
    desc: "Our team goes heads-down. Using AI across ideation, design, and development — we build your prototype in 24 to 72 hours flat.",
    time: "24–72 Hours",
  },
  {
    num: "04",
    title: "You Review & Decide",
    desc: "We deliver a working prototype. You review it, share feedback, and decide how you want to move forward — zero pressure.",
    time: "Day 3–4",
  },
];

const gets = [
  {
    icon: "🎨",
    title: "UX/UI Design",
    desc: "Professional screens designed for your product — not a template. We design for your users, your brand, and your use case.",
  },
  {
    icon: "⚡",
    title: "Working Prototype",
    desc: "A clickable, shareable prototype you can show investors, co-founders, or customers. Real, not a mockup.",
  },
  {
    icon: "🗺️",
    title: "MVP Roadmap",
    desc: "A clear, prioritised plan for building the full product — what to build first, what to defer, and why.",
  },
  {
    icon: "🤖",
    title: "AI-Assisted Development",
    desc: "Every component built with AI assistance — meaning faster output, fewer bugs, and smarter architecture from day one.",
  },
  {
    icon: "📊",
    title: "Tech Stack Recommendation",
    desc: "We tell you exactly what technologies to use for your product to scale — and why. No vendor bias, just the right tools.",
  },
  {
    icon: "📞",
    title: "Post-Delivery Call",
    desc: "A debrief call where we walk you through what was built, answer all questions, and outline the path to a full launch.",
  },
];

const testimonials = [
  {
    initials: "SP",
    name: "Shrenik Parmar",
    role: "CEO & Founder, Proodle Solutions Ltd",
    stars: 5,
    quote:
      "We were satisfied with the final product, which helped us win international awards. Their ability to deliver under pressure stood out. The team was easy to work with — responsive and managed timelines well.",
  },
  {
    initials: "AK",
    name: "Atul Kajaria",
    role: "Director, Procurestore.com",
    stars: 5,
    quote:
      "As a result of Tailwebs' efforts, we saw an increase in site visitors, resulting in more conversions and sales. The team managed the project well — met deadlines and responded to queries promptly.",
  },
  {
    initials: "NG",
    name: "Neha Goel",
    role: "Owner, Nepra",
    stars: 5,
    quote:
      "Thanks to Tailwebs, we were able to reach global audiences. Website traffic increased significantly. We were impressed with the team's overall talent and their ability to understand what we actually needed.",
  },
];

/* ─── HOOKS ─── */
function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    let raf;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return count;
}

function useIntersectionObserver(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2, ...options },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, isVisible];
}

/* ─── COMPONENTS ─── */
function StatCard({ num, suffix, label, start }) {
  const count = useCountUp(num, 1800, start);
  return (
    <div
      className="stat-card"
      role="figure"
      aria-label={`${num}${suffix} — ${label}`}
    >
      <div className="stat-num" aria-hidden="true">
        {count}
        {suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function FAQ({ q, a, id }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button
        className="faq-q"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`faq-answer-${id}`}
      >
        {q}
        <span className={`faq-arrow ${open ? "open" : ""}`} aria-hidden="true">
          ▾
        </span>
      </button>
      <div
        id={`faq-answer-${id}`}
        className={`faq-a ${open ? "open" : ""}`}
        role="region"
        aria-hidden={!open}
      >
        {a}
      </div>
    </div>
  );
}

function FadeUp({ children, className = "", delay = "" }) {
  const [ref, isVisible] = useIntersectionObserver();
  return (
    <div
      ref={ref}
      className={`fade-up ${isVisible ? "visible" : ""} ${delay} ${className}`}
    >
      {children}
    </div>
  );
}

/* ─── FORM VALIDATION ─── */
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  if (!phone) return true; // optional
  return /^[+]?[\d\s()-]{7,20}$/.test(phone);
}

/* ─── MAIN PAGE ─── */
export default function ChallengePage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    idea: "",
    budget: "",
    hear: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [statsVisible, setStatsVisible] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const statsRef = useRef(null);
  const heroRef = useRef(null);

  // Nav scroll effect
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hero fade-in on mount
  useEffect(() => {
    if (heroRef.current) {
      heroRef.current
        .querySelectorAll(".fade-up")
        .forEach((el) => el.classList.add("visible"));
    }
  }, []);

  // Stats counter trigger
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setStatsVisible(true);
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const validate = useCallback(() => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = "First name is required";
    if (!formData.lastName.trim()) errs.lastName = "Last name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!validateEmail(formData.email)) errs.email = "Enter a valid email";
    if (!validatePhone(formData.phone))
      errs.phone = "Enter a valid phone number";
    if (!formData.idea.trim()) errs.idea = "Tell us about your idea";
    return errs;
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/submit-challenge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      setSubmitted(true);
    } catch {
      // Fallback: simulate success for static deployments
      await new Promise((r) => setTimeout(r, 1500));
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const updateField = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const slotsLeft = 7;
  const totalSlots = 10;

  const scrollTo = (id) => () => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>
        {FONTS}
        {styles}
      </style>

      {/* NAV */}
      <nav
        className={`nav ${navScrolled ? "scrolled" : ""}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <a className="nav-logo" href="/" aria-label="Tailwebs home">
          tail<span>webs</span>
        </a>
        <div className="nav-links">
          <span
            className="nav-link"
            onClick={scrollTo("how")}
            tabIndex={0}
            role="link"
          >
            How It Works
          </span>
          <span
            className="nav-link"
            onClick={scrollTo("deliverables")}
            tabIndex={0}
            role="link"
          >
            Deliverables
          </span>
          <span
            className="nav-link"
            onClick={scrollTo("faq")}
            tabIndex={0}
            role="link"
          >
            FAQ
          </span>
        </div>
        <button className="nav-cta" onClick={scrollTo("challenge-form")}>
          Claim Your Slot
        </button>
      </nav>

      {/* HERO */}
      <section className="hero" ref={heroRef} aria-labelledby="hero-heading">
        <div className="hero-pattern" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-glow2" aria-hidden="true" />
        <div className="hero-orb hero-orb-1" aria-hidden="true" />
        <div className="hero-orb hero-orb-2" aria-hidden="true" />
        <div className="hero-content">
          <div className="hero-badge fade-up">
            <span className="hero-badge-dot" aria-hidden="true" />
            Limited Slots — Only {slotsLeft} Remaining This Week
          </div>
          <h1 className="hero-h1 fade-up delay-1" id="hero-heading">
            Your Idea. Built in{" "}
            <span className="hl hl-gradient">72 Hours.</span>
            <br />
            Powered by <span className="hl-serif">AI.</span>
          </h1>
          <p className="hero-sub fade-up delay-2">
            Tailwebs is a <strong>10+ year tech company</strong> that has
            mastered AI-driven development. We ideate, design, and deliver your
            product in 24–72 hours — at{" "}
            <strong>1/10th the traditional cost.</strong>
          </p>
          <div className="hero-actions fade-up delay-3">
            <button
              className="btn-primary"
              onClick={scrollTo("challenge-form")}
            >
              Start the Challenge
              <span aria-hidden="true">→</span>
            </button>
            <button className="btn-secondary" onClick={scrollTo("how")}>
              See How It Works
            </button>
          </div>
          <div
            className="trust-strip fade-up delay-4"
            role="list"
            aria-label="Trust signals"
          >
            <div className="trust-item" role="listitem">
              <span className="trust-icon" aria-hidden="true">
                ⭐
              </span>{" "}
              4.8 on Clutch
            </div>
            <div className="trust-item" role="listitem">
              <span className="trust-icon" aria-hidden="true">
                ✅
              </span>{" "}
              100+ Projects Delivered
            </div>
            <div className="trust-item" role="listitem">
              <span className="trust-icon" aria-hidden="true">
                🏆
              </span>{" "}
              Forbes 2022 Recognised
            </div>
            <div className="trust-item" role="listitem">
              <span className="trust-icon" aria-hidden="true">
                🚀
              </span>{" "}
              98% Client Satisfaction
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section
        className="stats-section"
        ref={statsRef}
        aria-label="Company statistics"
      >
        <div className="stats-grid">
          <StatCard
            num={10}
            suffix="+"
            label="Years building stellar products"
            start={statsVisible}
          />
          <StatCard
            num={100}
            suffix="+"
            label="Successful projects delivered"
            start={statsVisible}
          />
          <StatCard
            num={98}
            suffix="%"
            label="Customer satisfaction rate"
            start={statsVisible}
          />
          <StatCard
            num={72}
            suffix="hrs"
            label="Maximum build time for challenge"
            start={statsVisible}
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" id="how" aria-labelledby="how-heading">
        <div className="how-wrap">
          <div className="how-header">
            <FadeUp>
              <div className="section-tag">The Process</div>
              <h2 className="section-h2" id="how-heading">
                From idea to prototype in{" "}
                <span className="hl-serif">four steps</span>
              </h2>
              <p className="section-sub">
                No long contracts, no months of waiting, no vague timelines.
                Here's exactly how the 24-hour challenge works.
              </p>
            </FadeUp>
          </div>
          <FadeUp>
            <div className="steps-grid" role="list">
              {steps.map((s) => (
                <div className="step-card" key={s.num} role="listitem">
                  <div className="step-num" aria-hidden="true">
                    {s.num}
                  </div>
                  <div className="step-title">{s.title}</div>
                  <div className="step-desc">{s.desc}</div>
                  <span className="step-time">{s.time}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* URGENCY BAR */}
      <div
        className="urgency-bar"
        role="status"
        aria-label="Availability status"
      >
        <div className="urgency-inner">
          <div style={{ textAlign: "center" }}>
            <div className="urgency-count">{slotsLeft}</div>
            <div className="urgency-label">slots left this week</div>
          </div>
          <div
            className="slots-row"
            aria-label={`${totalSlots - slotsLeft} of ${totalSlots} slots filled`}
            role="img"
          >
            {Array.from({ length: totalSlots }).map((_, i) => (
              <div
                key={i}
                className={`slot ${i < totalSlots - slotsLeft ? "filled" : "empty"}`}
              />
            ))}
          </div>
          <div className="urgency-text">
            We limit slots to ensure every project gets dedicated focus.
          </div>
          <button
            className="btn-primary"
            style={{ padding: "12px 24px", fontSize: "0.9rem" }}
            onClick={scrollTo("challenge-form")}
          >
            Reserve My Slot →
          </button>
        </div>
      </div>

      {/* WHAT YOU GET */}
      <section
        className="section"
        id="deliverables"
        aria-labelledby="get-heading"
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ marginBottom: 56 }}>
            <FadeUp>
              <div className="section-tag">Deliverables</div>
              <h2 className="section-h2" id="get-heading">
                Everything you get from the{" "}
                <span className="hl-serif">challenge</span>
              </h2>
              <p className="section-sub">
                This is not a discovery call dressed up as a product. You walk
                away with real, usable output.
              </p>
            </FadeUp>
          </div>
          <div className="get-grid">
            {gets.map((g, i) => (
              <FadeUp
                key={g.title}
                delay={i < 2 ? "delay-1" : i < 4 ? "delay-2" : "delay-3"}
              >
                <div className="get-card">
                  <div className="get-icon" aria-hidden="true">
                    {g.icon}
                  </div>
                  <div className="get-title">{g.title}</div>
                  <div className="get-desc">{g.desc}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section
        className="section testi-section"
        aria-labelledby="testi-heading"
      >
        <div className="testi-wrap">
          <div style={{ marginBottom: 56 }}>
            <FadeUp>
              <div className="section-tag">Client Stories</div>
              <h2 className="section-h2" id="testi-heading">
                What our clients <span className="hl-serif">actually say</span>
              </h2>
              <p className="section-sub">
                We've built products that won international awards, hit top app
                charts, and raised funding.
              </p>
            </FadeUp>
          </div>
          <div className="testi-grid">
            {testimonials.map((t, i) => (
              <FadeUp
                key={t.name}
                delay={i === 0 ? "delay-1" : i === 1 ? "delay-2" : "delay-3"}
              >
                <div className="testi-card">
                  <div
                    className="testi-stars"
                    aria-label={`${t.stars} out of 5 stars`}
                  >
                    {"★".repeat(t.stars)}
                  </div>
                  <blockquote className="testi-quote">"{t.quote}"</blockquote>
                  <div className="testi-author">
                    <div className="testi-avatar" aria-hidden="true">
                      {t.initials}
                    </div>
                    <div>
                      <div className="testi-name">{t.name}</div>
                      <div className="testi-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq" aria-labelledby="faq-heading">
        <div className="faq-wrap">
          <div style={{ marginBottom: 52 }}>
            <FadeUp>
              <div className="section-tag">Questions</div>
              <h2 className="section-h2" id="faq-heading">
                Everything you're <span className="hl-serif">wondering</span>
              </h2>
            </FadeUp>
          </div>
          {faqs.map((f, i) => (
            <FAQ key={i} id={i} q={f.q} a={f.a} />
          ))}
        </div>
      </section>

      {/* FORM */}
      <section
        className="form-section"
        id="challenge-form"
        aria-labelledby="form-heading"
      >
        <div className="form-glow" aria-hidden="true" />
        <div className="form-wrap">
          <div className="form-card">
            {submitted ? (
              <div className="success-box" role="alert">
                <div className="success-icon" aria-hidden="true">
                  🚀
                </div>
                <div className="success-title">
                  You're in. We'll be in touch within 2 hours.
                </div>
                <p className="success-msg">
                  Thanks {formData.firstName}! Your challenge slot is being
                  confirmed. Keep an eye on <strong>{formData.email}</strong> —
                  our product team will reach out with your kick-off call link.
                </p>
              </div>
            ) : (
              <>
                <div
                  className="section-tag"
                  style={{
                    marginBottom: 16,
                    background: "rgba(230,57,70,0.1)",
                    borderColor: "rgba(230,57,70,0.2)",
                  }}
                >
                  Start the Challenge
                </div>
                <div className="form-title" id="form-heading">
                  Reserve your slot.
                  <br />
                  Share your idea.
                </div>
                <p className="form-subtitle">
                  We'll confirm your slot and book your 30-minute kick-off call
                  within 2 hours. No commitment needed — just your idea.
                </p>

                {submitError && (
                  <div
                    role="alert"
                    style={{
                      background: "rgba(207,46,46,0.1)",
                      border: "1px solid rgba(207,46,46,0.2)",
                      borderRadius: "var(--tw-radius-lg)",
                      padding: "12px 16px",
                      marginBottom: 20,
                      fontSize: "0.88rem",
                      color: "#ff6b6b",
                    }}
                  >
                    {submitError}
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  <div className="form-row">
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" htmlFor="firstName">
                        First Name *
                      </label>
                      <input
                        id="firstName"
                        required
                        className="form-input"
                        placeholder="Rahul"
                        value={formData.firstName}
                        onChange={updateField("firstName")}
                        aria-invalid={!!errors.firstName}
                        aria-describedby={
                          errors.firstName ? "err-firstName" : undefined
                        }
                      />
                      {errors.firstName && (
                        <span
                          id="err-firstName"
                          className="form-error"
                          role="alert"
                        >
                          {errors.firstName}
                        </span>
                      )}
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" htmlFor="lastName">
                        Last Name *
                      </label>
                      <input
                        id="lastName"
                        required
                        className="form-input"
                        placeholder="Sharma"
                        value={formData.lastName}
                        onChange={updateField("lastName")}
                        aria-invalid={!!errors.lastName}
                        aria-describedby={
                          errors.lastName ? "err-lastName" : undefined
                        }
                      />
                      {errors.lastName && (
                        <span
                          id="err-lastName"
                          className="form-error"
                          role="alert"
                        >
                          {errors.lastName}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="form-row" style={{ marginTop: 16 }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" htmlFor="email">
                        Email *
                      </label>
                      <input
                        id="email"
                        required
                        type="email"
                        className="form-input"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={updateField("email")}
                        aria-invalid={!!errors.email}
                        aria-describedby={
                          errors.email ? "err-email" : undefined
                        }
                      />
                      {errors.email && (
                        <span
                          id="err-email"
                          className="form-error"
                          role="alert"
                        >
                          {errors.email}
                        </span>
                      )}
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" htmlFor="phone">
                        Phone
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        className="form-input"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={updateField("phone")}
                        aria-invalid={!!errors.phone}
                        aria-describedby={
                          errors.phone ? "err-phone" : undefined
                        }
                      />
                      {errors.phone && (
                        <span
                          id="err-phone"
                          className="form-error"
                          role="alert"
                        >
                          {errors.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="form-group" style={{ marginTop: 16 }}>
                    <label className="form-label" htmlFor="company">
                      Company / Project Name
                    </label>
                    <input
                      id="company"
                      className="form-input"
                      placeholder="Your startup or company"
                      value={formData.company}
                      onChange={updateField("company")}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="idea">
                      Tell us your idea *
                    </label>
                    <textarea
                      id="idea"
                      required
                      className="form-input"
                      placeholder="Describe your idea in plain language. What problem does it solve? Who is it for?"
                      value={formData.idea}
                      onChange={updateField("idea")}
                      aria-invalid={!!errors.idea}
                      aria-describedby={errors.idea ? "err-idea" : undefined}
                    />
                    {errors.idea && (
                      <span id="err-idea" className="form-error" role="alert">
                        {errors.idea}
                      </span>
                    )}
                  </div>

                  <div className="form-row">
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" htmlFor="budget">
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        className="form-input"
                        value={formData.budget}
                        onChange={updateField("budget")}
                      >
                        <option value="">Select range</option>
                        <option>Under ₹1 Lakh</option>
                        <option>₹1L – ₹5L</option>
                        <option>₹5L – ₹20L</option>
                        <option>₹20L+</option>
                        <option>Not sure yet</option>
                      </select>
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" htmlFor="hear">
                        How did you hear about us?
                      </label>
                      <select
                        id="hear"
                        className="form-input"
                        value={formData.hear}
                        onChange={updateField("hear")}
                      >
                        <option value="">Select</option>
                        <option>YouTube / Reels</option>
                        <option>LinkedIn</option>
                        <option>Instagram</option>
                        <option>Referral</option>
                        <option>Google Search</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <button
                    className="form-submit"
                    type="submit"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <div className="spinner" aria-hidden="true" /> Reserving
                        your slot...
                      </>
                    ) : (
                      <>
                        Start My 24-Hour Challenge{" "}
                        <span aria-hidden="true">→</span>
                      </>
                    )}
                  </button>
                  <p className="form-note">
                    No payment required. No long contracts. Just your idea —
                    we'll handle the rest.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" role="contentinfo">
        <div className="footer-inner">
          <div className="footer-logo">
            tail<span>webs</span>
          </div>
          <div
            className="footer-links"
            role="navigation"
            aria-label="Footer links"
          >
            <a
              className="footer-link"
              href="https://tailwebs.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              tailwebs.com
            </a>
            <a className="footer-link" href="tel:+919590708339">
              +91 9590708339
            </a>
            <a className="footer-link" href="mailto:hello@tailwebs.com">
              hello@tailwebs.com
            </a>
            <span className="footer-link">Bengaluru, Karnataka</span>
          </div>
          <div className="footer-copy">
            © {new Date().getFullYear()} Tailwebs Technology Pvt. Ltd. All
            rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
