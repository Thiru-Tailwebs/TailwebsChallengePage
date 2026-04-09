import { useState } from "react";
import FadeUp from "./FadeUp";
import { faqs } from "../data/content";

function FAQItem({ q, a, id }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-tw-border">
      <button
        className="w-full bg-transparent border-none text-tw-text font-body text-base font-semibold py-6 text-left cursor-pointer flex justify-between items-center gap-4 transition-colors leading-relaxed hover:text-tw-primary focus-visible:text-tw-primary focus-visible:outline-none"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`faq-answer-${id}`}
      >
        {q}
        <span
          className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-[0.75rem] transition-all duration-300 ${open ? "rotate-180 bg-tw-primary text-white" : "bg-tw-primary-dim text-tw-primary"}`}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>
      <div
        id={`faq-answer-${id}`}
        className={`text-[0.92rem] text-tw-muted leading-[1.75] overflow-hidden transition-all duration-400 ${open ? "max-h-[300px] pb-6" : "max-h-0 pb-0"}`}
        role="region"
        aria-hidden={!open}
      >
        {a}
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="py-[100px] px-[5%]" id="faq" aria-labelledby="faq-heading">
      <div className="max-w-[760px] mx-auto">
        <div className="mb-[52px]">
          <FadeUp>
            <span className="inline-block text-[0.72rem] font-bold tracking-[0.12em] uppercase text-tw-primary bg-tw-primary-dim border border-tw-primary-mid rounded px-3.5 py-[5px] mb-[18px]">Questions</span>
            <h2 className="font-heading text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold tracking-tight leading-[1.12] mb-3.5 max-w-[640px] text-tw-text" id="faq-heading">
              Everything you're <span className="font-serif italic font-normal">wondering</span>
            </h2>
          </FadeUp>
        </div>
        {faqs.map((f, i) => <FAQItem key={i} id={i} q={f.q} a={f.a} />)}
      </div>
    </section>
  );
}
