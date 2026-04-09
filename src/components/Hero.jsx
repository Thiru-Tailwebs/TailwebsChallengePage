import { useEffect, useRef } from "react";
import { scrollTo } from "../utils/scroll";
import { SLOTS_LEFT } from "../data/content";

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    if (heroRef.current) {
      heroRef.current.querySelectorAll(".fade-up").forEach((el) => el.classList.add("visible"));
    }
  }, []);

  return (
    <section
      className="min-h-screen flex items-center justify-center px-[5%] pt-[120px] pb-20 relative overflow-hidden bg-tw-bg-dark"
      ref={heroRef}
      aria-labelledby="hero-heading"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.03)_1px,transparent_0)] bg-[length:40px_40px]" aria-hidden="true" />
      <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse,rgba(230,57,70,0.18)_0%,rgba(230,57,70,0.06)_40%,transparent_70%)] pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-[10%] -right-[5%] w-[500px] h-[500px] bg-[radial-gradient(ellipse,rgba(155,81,224,0.1)_0%,transparent_70%)] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-[15%] left-[10%] w-[300px] h-[300px] rounded-full bg-[rgba(230,57,70,0.1)] blur-[80px] pointer-events-none animate-[orbFloat_8s_ease-in-out_infinite]" aria-hidden="true" />
      <div className="absolute bottom-[20%] right-[10%] w-[250px] h-[250px] rounded-full bg-[rgba(155,81,224,0.1)] blur-[80px] pointer-events-none animate-[orbFloat_8s_ease-in-out_infinite_-4s]" aria-hidden="true" />

      <div className="relative max-w-[900px] text-center">
        <div className="fade-up inline-flex items-center gap-2 bg-white/[0.06] border border-white/10 rounded-full py-[7px] px-[18px] pl-3 text-[0.78rem] font-semibold text-tw-accent uppercase tracking-[0.05em] mb-8 backdrop-blur-sm">
          <span className="w-[7px] h-[7px] rounded-full bg-[#00d084] shadow-[0_0_10px_#00d084] animate-[pulse_2s_infinite]" aria-hidden="true" />
          Limited Slots — Only {SLOTS_LEFT} Remaining This Week
        </div>

        <h1 className="fade-up delay-1 font-heading text-[clamp(2.6rem,6.5vw,4.5rem)] font-extrabold leading-[1.05] tracking-[-0.035em] mb-6 text-tw-text-inv" id="hero-heading">
          Your Idea. Built in{" "}
          <span className="inline-block bg-gradient-to-br from-[#E63946] via-[#FF6B6B] to-[#F5A623] bg-clip-text text-transparent">72 Hours.</span>
          <br />Powered by <span className="font-serif italic font-normal">AI.</span>
        </h1>

        <p className="fade-up delay-2 text-[clamp(1.05rem,2vw,1.2rem)] text-tw-muted-light leading-[1.7] max-w-[620px] mx-auto mb-11 font-normal">
          Tailwebs is a <strong className="text-tw-text-inv font-semibold">10+ year tech company</strong> that has mastered AI-driven development. We ideate, design, and deliver your product in 24–72 hours — at <strong className="text-tw-text-inv font-semibold">1/10th the traditional cost.</strong>
        </p>

        <div className="fade-up delay-3 flex gap-3.5 justify-center flex-wrap mb-14">
          <button
            className="bg-tw-primary text-white border-none rounded px-9 py-4 font-body text-base font-semibold cursor-pointer transition-all inline-flex items-center gap-2 hover:bg-tw-primary-hover hover:-translate-y-0.5 hover:shadow-tw-primary focus-visible:outline-2 focus-visible:outline-tw-accent focus-visible:outline-offset-2"
            onClick={scrollTo("challenge-form")}
          >
            Start the Challenge
            <span aria-hidden="true">→</span>
          </button>
          <button
            className="bg-white/[0.06] text-tw-text-inv border border-white/[0.12] rounded px-[30px] py-4 font-body text-base font-medium cursor-pointer transition-all backdrop-blur-sm hover:bg-white/10 hover:border-white/20 focus-visible:outline-2 focus-visible:outline-tw-accent focus-visible:outline-offset-2"
            onClick={scrollTo("how")}
          >
            See How It Works
          </button>
        </div>

        {/* Hero image */}
        <div className="fade-up delay-3 mb-14 rounded-xl overflow-hidden border border-white/10 shadow-tw-lg mx-auto max-w-[700px]">
          <img
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=450&fit=crop"
            alt="Team collaborating on software development"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>

        <div className="fade-up delay-4 flex items-center justify-center gap-7 flex-wrap pt-5 border-t border-white/[0.08]" role="list" aria-label="Trust signals">
          <div className="flex items-center gap-2 text-[0.82rem] text-tw-muted-light font-medium" role="listitem"><span aria-hidden="true">⭐</span> 4.8 on Clutch</div>
          <div className="flex items-center gap-2 text-[0.82rem] text-tw-muted-light font-medium" role="listitem"><span aria-hidden="true">✅</span> 100+ Projects Delivered</div>
          <div className="flex items-center gap-2 text-[0.82rem] text-tw-muted-light font-medium" role="listitem"><span aria-hidden="true">🏆</span> Forbes 2022 Recognised</div>
          <div className="flex items-center gap-2 text-[0.82rem] text-tw-muted-light font-medium" role="listitem"><span aria-hidden="true">🚀</span> 98% Client Satisfaction</div>
        </div>
      </div>
    </section>
  );
}
