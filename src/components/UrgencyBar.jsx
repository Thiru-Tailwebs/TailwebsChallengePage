import { scrollTo } from "../utils/scroll";
import { SLOTS_LEFT, TOTAL_SLOTS } from "../data/content";

export default function UrgencyBar() {
  return (
    <div className="bg-tw-bg-dark py-7 px-[5%]" role="status" aria-label="Availability status">
      <div className="max-w-[1280px] mx-auto flex items-center justify-center gap-7 flex-wrap">
        <div className="text-center">
          <div className="font-heading text-[1.6rem] font-extrabold text-tw-accent">{SLOTS_LEFT}</div>
          <div className="text-[0.78rem] text-tw-muted-light">slots left this week</div>
        </div>
        <div className="flex gap-[5px]" aria-label={`${TOTAL_SLOTS - SLOTS_LEFT} of ${TOTAL_SLOTS} slots filled`} role="img">
          {Array.from({ length: TOTAL_SLOTS }).map((_, i) => (
            <div
              key={i}
              className={`w-5 h-5 rounded transition-transform ${i < TOTAL_SLOTS - SLOTS_LEFT ? "bg-tw-primary" : "bg-white/[0.06] border border-white/10"}`}
            />
          ))}
        </div>
        <div className="text-[0.95rem] text-tw-muted-light font-normal max-w-[400px]">
          We limit slots to ensure every project gets dedicated focus.
        </div>
        <button
          className="bg-tw-primary text-white border-none rounded px-6 py-3 font-body text-[0.9rem] font-semibold cursor-pointer transition-all inline-flex items-center gap-2 hover:bg-tw-primary-hover hover:-translate-y-0.5 hover:shadow-tw-primary"
          onClick={scrollTo("challenge-form")}
        >
          Reserve My Slot →
        </button>
      </div>
    </div>
  );
}
