import { useState, useEffect } from "react";
import { scrollTo } from "../utils/scroll";

export default function Navbar({ homePath = "/" }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-[5%] bg-white/92 backdrop-blur-[20px] backdrop-saturate-[180%] border-b border-tw-border transition-shadow duration-300 ${scrolled ? "shadow-tw-sm" : ""}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <a className="font-heading font-extrabold text-[1.3rem] text-tw-dark tracking-tight no-underline" href={homePath} aria-label="Tailwebs home">
        tail<span className="text-tw-primary">webs</span>
      </a>

      <div className="hidden md:flex items-center gap-8">
        <span className="text-sm font-medium text-tw-muted cursor-pointer transition-colors hover:text-tw-primary focus-visible:text-tw-primary focus-visible:outline-none" onClick={scrollTo("how")} tabIndex={0} role="link">How It Works</span>
        <span className="text-sm font-medium text-tw-muted cursor-pointer transition-colors hover:text-tw-primary focus-visible:text-tw-primary focus-visible:outline-none" onClick={scrollTo("deliverables")} tabIndex={0} role="link">Deliverables</span>
        <span className="text-sm font-medium text-tw-muted cursor-pointer transition-colors hover:text-tw-primary focus-visible:text-tw-primary focus-visible:outline-none" onClick={scrollTo("faq")} tabIndex={0} role="link">FAQ</span>
      </div>

      <button
        className="bg-tw-primary text-white border-none rounded px-6 py-2.5 font-body text-sm font-semibold cursor-pointer transition-all hover:bg-tw-primary-hover hover:-translate-y-px hover:shadow-tw-primary focus-visible:outline-2 focus-visible:outline-tw-primary focus-visible:outline-offset-2"
        onClick={scrollTo("challenge-form")}
      >
        Claim Your Slot
      </button>
    </nav>
  );
}
