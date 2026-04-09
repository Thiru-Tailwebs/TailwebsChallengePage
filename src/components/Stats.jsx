import { useRef, useState, useEffect } from "react";
import { useCountUp } from "../hooks/useCountUp";
import { stats } from "../data/content";

function StatCard({ num, suffix, label, start }) {
  const count = useCountUp(num, 1800, start);
  return (
    <div className="bg-tw-bg2 px-7 py-10 text-center transition-colors hover:bg-tw-off-white" role="figure" aria-label={`${num}${suffix} — ${label}`}>
      <div className="font-heading text-[clamp(2rem,4vw,2.8rem)] font-extrabold text-tw-primary leading-none mb-2" aria-hidden="true">{count}{suffix}</div>
      <div className="text-[0.82rem] text-tw-muted font-medium leading-relaxed">{label}</div>
    </div>
  );
}

export default function Stats() {
  const statsRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="px-[5%] -mt-12 relative z-10" ref={statsRef} aria-label="Company statistics">
      <div className="grid grid-cols-4 max-sm:grid-cols-2 gap-px max-w-[1280px] mx-auto bg-tw-border rounded-xl overflow-hidden shadow-tw-lg">
        {stats.map((s) => (
          <StatCard key={s.label} num={s.num} suffix={s.suffix} label={s.label} start={visible} />
        ))}
      </div>
    </section>
  );
}
