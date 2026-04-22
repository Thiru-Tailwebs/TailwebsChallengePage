import { useEffect, useRef } from "react";
import { scrollTo } from "../utils/scroll";
import { SLOTS_LEFT } from "../data/content";
import ChallengeFormCard from "./ChallengeFormCard";

export default function HeroBuild() {
  const heroRef = useRef(null);

  useEffect(() => {
    if (heroRef.current) {
      heroRef.current.querySelectorAll(".fade-up").forEach((el) => el.classList.add("visible"));
    }
  }, []);

  return (
    <section
      className="min-h-screen flex items-center px-[5%] pt-[120px] pb-20 relative overflow-hidden bg-tw-bg-dark"
      ref={heroRef}
      aria-labelledby="hero-heading"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.03)_1px,transparent_0)] bg-[length:40px_40px]" aria-hidden="true" />
      <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse,rgba(230,57,70,0.18)_0%,rgba(230,57,70,0.06)_40%,transparent_70%)] pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-[10%] -right-[5%] w-[500px] h-[500px] bg-[radial-gradient(ellipse,rgba(155,81,224,0.1)_0%,transparent_70%)] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-[15%] left-[10%] w-[300px] h-[300px] rounded-full bg-[rgba(230,57,70,0.1)] blur-[80px] pointer-events-none animate-[orbFloat_8s_ease-in-out_infinite]" aria-hidden="true" />
      <div className="absolute bottom-[20%] right-[10%] w-[250px] h-[250px] rounded-full bg-[rgba(155,81,224,0.1)] blur-[80px] pointer-events-none animate-[orbFloat_8s_ease-in-out_infinite_-4s]" aria-hidden="true" />

      <div className="relative max-w-[1280px] mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left column — content */}
        <div className="text-center lg:text-left">
          <div className="fade-up inline-flex items-center gap-2 bg-white/[0.06] border border-white/10 rounded-full py-[7px] px-[18px] pl-3 text-[0.78rem] font-semibold text-tw-accent uppercase tracking-[0.05em] mb-8 backdrop-blur-sm">
            <span className="w-[7px] h-[7px] rounded-full bg-[#00d084] shadow-[0_0_10px_#00d084] animate-[pulse_2s_infinite]" aria-hidden="true" />
            Now Booking — {SLOTS_LEFT} Build Slots Open This Week
          </div>

          <h1 className="fade-up delay-1 font-heading text-[clamp(2.4rem,5.5vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.035em] mb-6 text-tw-text-inv" id="hero-heading">
            Build your product{" "}
            <span className="inline-block bg-gradient-to-br from-[#E63946] via-[#FF6B6B] to-[#F5A623] bg-clip-text text-transparent">with AI.</span>
            <br />Shipped in <span className="font-serif italic font-normal">72 hours.</span>
          </h1>

          <p className="fade-up delay-2 text-[clamp(1.05rem,2vw,1.2rem)] text-tw-muted-light leading-[1.7] max-w-[560px] mx-auto lg:mx-0 mb-10 font-normal">
            Tailwebs is a <strong className="text-tw-text-inv font-semibold">10+ year tech company</strong> that pairs senior engineers with AI to design, build, and deliver your product in 24–72 hours — at <strong className="text-tw-text-inv font-semibold">1/10th the traditional cost.</strong>
          </p>

          <div className="fade-up delay-3 flex gap-3.5 justify-center lg:justify-start flex-wrap mb-10">
            <button
              className="bg-white/[0.06] text-tw-text-inv border border-white/[0.12] rounded px-[30px] py-4 font-body text-base font-medium cursor-pointer transition-all backdrop-blur-sm hover:bg-white/10 hover:border-white/20 focus-visible:outline-2 focus-visible:outline-tw-accent focus-visible:outline-offset-2"
              onClick={scrollTo("how")}
            >
              See How It Works
            </button>
          </div>

          <div className="fade-up delay-4 flex items-center justify-center lg:justify-start gap-x-7 gap-y-3 flex-wrap pt-5 border-t border-white/[0.08]" role="list" aria-label="Trust signals">
            <div className="flex items-center gap-2 text-[0.82rem] text-tw-muted-light font-medium" role="listitem"><span aria-hidden="true">⭐</span> 4.8 on Clutch</div>
            <div className="flex items-center gap-2 text-[0.82rem] text-tw-muted-light font-medium" role="listitem"><span aria-hidden="true">✅</span> 100+ Projects Delivered</div>
            <div className="flex items-center gap-2 text-[0.82rem] text-tw-muted-light font-medium" role="listitem"><span aria-hidden="true">🏆</span> Forbes 2022 Recognised</div>
            <div className="flex items-center gap-2 text-[0.82rem] text-tw-muted-light font-medium" role="listitem"><span aria-hidden="true">🚀</span> 98% Client Satisfaction</div>
          </div>
        </div>

        {/* Right column — form */}
        <div className="fade-up delay-2" id="challenge-form">
          <ChallengeFormCard compact />
        </div>
      </div>
    </section>
  );
}
