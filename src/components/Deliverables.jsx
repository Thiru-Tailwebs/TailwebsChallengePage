import FadeUp from "./FadeUp";
import { deliverables } from "../data/content";

export default function Deliverables() {
  return (
    <section className="py-[100px] px-[5%]" id="deliverables" aria-labelledby="get-heading">
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-14">
          <FadeUp>
            <span className="inline-block text-[0.72rem] font-bold tracking-[0.12em] uppercase text-tw-primary bg-tw-primary-dim border border-tw-primary-mid rounded px-3.5 py-[5px] mb-[18px]">Deliverables</span>
            <h2 className="font-heading text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold tracking-tight leading-[1.12] mb-3.5 max-w-[640px] text-tw-text" id="get-heading">
              Everything you get from the <span className="font-serif italic font-normal">challenge</span>
            </h2>
            <p className="text-[1.05rem] text-tw-muted leading-[1.7] max-w-[560px]">This is not a discovery call dressed up as a product. You walk away with real, usable output.</p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5">
          {deliverables.map((g, i) => (
            <FadeUp key={g.title} delay={i < 2 ? "delay-1" : i < 4 ? "delay-2" : "delay-3"}>
              <div className="bg-tw-bg2 border border-tw-border rounded-xl p-9 transition-all hover:border-tw-primary-mid hover:-translate-y-[3px] hover:shadow-tw-md">
                <div className="text-[1.8rem] mb-[18px] w-[52px] h-[52px] flex items-center justify-center bg-tw-primary-dim rounded-lg" aria-hidden="true">{g.icon}</div>
                <div className="font-heading text-[1.05rem] font-bold mb-2.5 text-tw-text">{g.title}</div>
                <div className="text-[0.88rem] text-tw-muted leading-[1.7]">{g.desc}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
