import ChallengeFormCard from "./ChallengeFormCard";

export default function ChallengeForm() {
  return (
    <section
      className="py-[100px] px-[5%] relative overflow-hidden bg-tw-bg-dark"
      id="challenge-form"
      aria-labelledby="form-heading"
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse,rgba(230,57,70,0.12)_0%,transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[700px] mx-auto relative">
        <ChallengeFormCard />
      </div>
    </section>
  );
}
