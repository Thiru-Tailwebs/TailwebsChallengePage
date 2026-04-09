import FadeUp from "./FadeUp";
import { testimonials } from "../data/content";

export default function Testimonials() {
  return (
    <section className="py-[100px] px-[5%] bg-tw-off-white" aria-labelledby="testi-heading">
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-14">
          <FadeUp>
            <span className="inline-block text-[0.72rem] font-bold tracking-[0.12em] uppercase text-tw-primary bg-tw-primary-dim border border-tw-primary-mid rounded px-3.5 py-[5px] mb-[18px]">Client Stories</span>
            <h2 className="font-heading text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold tracking-tight leading-[1.12] mb-3.5 max-w-[640px] text-tw-text" id="testi-heading">
              What our clients <span className="font-serif italic font-normal">actually say</span>
            </h2>
            <p className="text-[1.05rem] text-tw-muted leading-[1.7] max-w-[560px]">We've built products that won international awards, hit top app charts, and raised funding.</p>
          </FadeUp>
        </div>

        {/* Client project showcase image */}
        <FadeUp>
          <div className="mb-10 rounded-xl overflow-hidden shadow-tw-md border border-tw-border">
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=350&fit=crop"
              alt="Dashboard analytics showing project success metrics"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </FadeUp>

        <div className="grid grid-cols-3 max-[900px]:grid-cols-1 gap-5">
          {testimonials.map((t, i) => (
            <FadeUp key={t.name} delay={i === 0 ? "delay-1" : i === 1 ? "delay-2" : "delay-3"}>
              <div className="bg-tw-bg2 border border-tw-border rounded-xl p-9 transition-all hover:border-tw-primary-mid hover:shadow-tw-md">
                <div className="text-tw-gold text-[0.9rem] mb-[18px] tracking-[2px]" aria-label={`${t.stars} out of 5 stars`}>{"★".repeat(t.stars)}</div>
                <blockquote className="text-[0.95rem] text-tw-text leading-[1.75] mb-6">"{t.quote}"</blockquote>
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-tw-primary to-tw-accent flex items-center justify-center font-heading font-bold text-[0.85rem] text-white shrink-0" aria-hidden="true">{t.initials}</div>
                  <div>
                    <div className="font-bold text-[0.9rem] text-tw-text">{t.name}</div>
                    <div className="text-[0.78rem] text-tw-muted mt-0.5">{t.role}</div>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
