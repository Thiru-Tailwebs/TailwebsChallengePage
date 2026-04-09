import FadeUp from "./FadeUp";
import { steps } from "../data/content";

export default function HowItWorks() {
  return (
    <section className="py-[100px] px-[5%]" id="how" aria-labelledby="how-heading">
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-14">
          <FadeUp>
            <span className="inline-block text-[0.72rem] font-bold tracking-[0.12em] uppercase text-tw-primary bg-tw-primary-dim border border-tw-primary-mid rounded px-3.5 py-[5px] mb-[18px]">The Process</span>
            <h2 className="font-heading text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold tracking-tight leading-[1.12] mb-3.5 max-w-[640px] text-tw-text" id="how-heading">
              From idea to prototype in <span className="font-serif italic font-normal">four steps</span>
            </h2>
            <p className="text-[1.05rem] text-tw-muted leading-[1.7] max-w-[560px]">No long contracts, no months of waiting, no vague timelines. Here's exactly how the 24-hour challenge works.</p>
          </FadeUp>
        </div>

        {/* Process illustration image */}
        <FadeUp>
          <div className="mb-10 rounded-xl overflow-hidden max-w-[800px] mx-auto">
            <img
              src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=400&fit=crop"
              alt="Planning and design process workflow"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </FadeUp>

        <FadeUp>
          <div className="grid grid-cols-4 max-[900px]:grid-cols-2 max-[520px]:grid-cols-1 gap-px bg-tw-border rounded-xl overflow-hidden shadow-tw-sm" role="list">
            {steps.map((s) => (
              <div className="bg-tw-bg2 px-8 py-10 relative transition-colors hover:bg-tw-off-white" key={s.num} role="listitem">
                <div className="font-heading font-extrabold w-14 h-14 flex items-center justify-center text-[1.2rem] text-tw-primary bg-tw-primary-dim border border-tw-primary-mid rounded-lg mb-[22px]" aria-hidden="true">{s.num}</div>
                <div className="font-heading text-[1.1rem] font-bold mb-2.5 text-tw-text">{s.title}</div>
                <div className="text-[0.88rem] text-tw-muted leading-[1.7]">{s.desc}</div>
                <span className="inline-block mt-[18px] text-[0.72rem] font-bold text-tw-primary tracking-[0.06em] uppercase bg-tw-primary-dim rounded px-3 py-1">{s.time}</span>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
