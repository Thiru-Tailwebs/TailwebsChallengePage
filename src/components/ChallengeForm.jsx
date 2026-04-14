import { useState, useCallback } from "react";
import ReactGA from "react-ga4";

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  if (!phone) return true;
  return /^[+]?[\d\s()-]{7,20}$/.test(phone);
}

export default function ChallengeForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    idea: "",
    budget: "",
    hear: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validate = useCallback(() => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = "First name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!validateEmail(formData.email)) errs.email = "Enter a valid email";
    if (!formData.company.trim())
      errs.company = "Company / Project name is required";
    if (!validatePhone(formData.phone))
      errs.phone = "Enter a valid phone number";
    if (!formData.idea.trim()) errs.idea = "Tell us about your idea";
    return errs;
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      // Get reCAPTCHA v3 token
      const recaptchaToken = await new Promise((resolve, reject) => {
        window.grecaptcha.ready(() => {
          window.grecaptcha
            .execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY, {
              action: "submit",
            })
            .then(resolve)
            .catch(reject);
        });
      });

      // Send to Google Apps Script
      const scriptUrl = import.meta.env.VITE_APPS_SCRIPT_URL;
      const eventId = Date.now().toString();
      const payload = new URLSearchParams({
        ...formData,
        recaptchaToken,
        eventId,
      });

      const res = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
      });

      const result = await res.json();

      if (result.status === "success") {
        ReactGA.event({
          category: "Form",
          action: "Challenge Form Submitted",
        });
        // Meta Pixel (IMPORTANT)
        if (window.fbq) {
          window.fbq("track", "Lead", {}, { eventID: eventId });

          setTimeout(() => {
            setSubmitted(true);
          }, 500);
        } else {
          setSubmitted(true);
        }
      } else {
        setSubmitError(
          result.message || "Submission failed. Please try again.",
        );
      }
    } catch (err) {
      setSubmitError(
        "Network error. Please check your connection and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const updateField = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const inputClass =
    "bg-white/[0.04] border border-tw-border-dark rounded-lg px-4 py-3.5 font-body text-[0.95rem] text-tw-text-inv outline-none transition-all w-full focus:border-tw-primary focus:shadow-[0_0_0_3px_rgba(230,57,70,0.12)] placeholder:text-tw-muted-light/50";
  const labelClass =
    "text-[0.78rem] font-semibold text-tw-muted-light tracking-[0.05em] uppercase";

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
        <div className="bg-tw-card-dark border border-tw-border-dark rounded-xl p-[56px_52px] max-[600px]:p-[36px_24px] backdrop-blur-[20px]">
          {submitted ? (
            <div className="text-center py-10 px-5" role="alert">
              <div className="text-[3.5rem] mb-4" aria-hidden="true">
                🚀
              </div>
              <div className="font-heading text-2xl font-extrabold mb-3 text-tw-text-inv">
                You're in. We'll be in touch within 2 hours.
              </div>
              <p className="text-[0.95rem] text-tw-muted-light leading-[1.7]">
                Thanks {formData.firstName}! Your challenge slot is being
                confirmed. Keep an eye on{" "}
                <strong className="text-tw-text-inv">{formData.email}</strong> —
                our product team will reach out with your kick-off call link.
              </p>
            </div>
          ) : (
            <>
              <span className="inline-block text-[0.72rem] font-bold tracking-[0.12em] uppercase text-tw-primary bg-[rgba(230,57,70,0.1)] border border-[rgba(230,57,70,0.2)] rounded px-3.5 py-[5px] mb-4">
                Start the Challenge
              </span>
              <div
                className="font-heading text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold tracking-tight mb-2.5 leading-[1.15] text-tw-text-inv"
                id="form-heading"
              >
                Reserve your slot.
                <br />
                Share your idea.
              </div>
              <p className="text-[0.95rem] text-tw-muted-light mb-9 leading-[1.65]">
                We'll confirm your slot and book your 30-minute kick-off call
                within 2 hours. No commitment needed — just your idea.
              </p>

              {submitError && (
                <div
                  role="alert"
                  className="bg-[rgba(207,46,46,0.1)] border border-[rgba(207,46,46,0.2)] rounded-lg px-4 py-3 mb-5 text-[0.88rem] text-[#ff6b6b]"
                >
                  {submitError}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-2 max-[520px]:grid-cols-1 gap-4 mb-4">
                  <div className="flex flex-col gap-[7px]">
                    <label className={labelClass} htmlFor="firstName">
                      First Name *
                    </label>
                    <input
                      id="firstName"
                      required
                      className={inputClass}
                      placeholder="Rahul"
                      value={formData.firstName}
                      onChange={updateField("firstName")}
                      aria-invalid={!!errors.firstName}
                      aria-describedby={
                        errors.firstName ? "err-firstName" : undefined
                      }
                    />
                    {errors.firstName && (
                      <span
                        id="err-firstName"
                        className="text-[0.75rem] text-[#cf2e2e] mt-1"
                        role="alert"
                      >
                        {errors.firstName}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-[7px]">
                    <label className={labelClass} htmlFor="lastName">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      className={inputClass}
                      placeholder="Sharma"
                      value={formData.lastName}
                      onChange={updateField("lastName")}
                      aria-invalid={!!errors.lastName}
                      aria-describedby={
                        errors.lastName ? "err-lastName" : undefined
                      }
                    />
                    {errors.lastName && (
                      <span
                        id="err-lastName"
                        className="text-[0.75rem] text-[#cf2e2e] mt-1"
                        role="alert"
                      >
                        {errors.lastName}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 max-[520px]:grid-cols-1 gap-4 mb-4">
                  <div className="flex flex-col gap-[7px]">
                    <label className={labelClass} htmlFor="email">
                      Email *
                    </label>
                    <input
                      id="email"
                      required
                      type="email"
                      className={inputClass}
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={updateField("email")}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "err-email" : undefined}
                    />
                    {errors.email && (
                      <span
                        id="err-email"
                        className="text-[0.75rem] text-[#cf2e2e] mt-1"
                        role="alert"
                      >
                        {errors.email}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-[7px]">
                    <label className={labelClass} htmlFor="phone">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className={inputClass}
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={updateField("phone")}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "err-phone" : undefined}
                    />
                    {errors.phone && (
                      <span
                        id="err-phone"
                        className="text-[0.75rem] text-[#cf2e2e] mt-1"
                        role="alert"
                      >
                        {errors.phone}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-[7px] mb-4">
                  <label className={labelClass} htmlFor="company">
                    Company / Project Name *
                  </label>
                  <input
                    id="company"
                    required
                    className={inputClass}
                    placeholder="Your startup or company"
                    value={formData.company}
                    onChange={updateField("company")}
                    aria-invalid={!!errors.company}
                    aria-describedby={
                      errors.company ? "err-company" : undefined
                    }
                  />
                  {errors.company && (
                    <span
                      id="err-company"
                      className="text-[0.75rem] text-[#cf2e2e] mt-1"
                      role="alert"
                    >
                      {errors.company}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-[7px] mb-4">
                  <label className={labelClass} htmlFor="idea">
                    Tell us your idea *
                  </label>
                  <textarea
                    id="idea"
                    required
                    className={`${inputClass} resize-y min-h-[120px]`}
                    placeholder="Describe your idea in plain language. What problem does it solve? Who is it for?"
                    value={formData.idea}
                    onChange={updateField("idea")}
                    aria-invalid={!!errors.idea}
                    aria-describedby={errors.idea ? "err-idea" : undefined}
                  />
                  {errors.idea && (
                    <span
                      id="err-idea"
                      className="text-[0.75rem] text-[#cf2e2e] mt-1"
                      role="alert"
                    >
                      {errors.idea}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 max-[520px]:grid-cols-1 gap-4 mb-4">
                  <div className="flex flex-col gap-[7px]">
                    <label className={labelClass} htmlFor="budget">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      className={`${inputClass} form-select cursor-pointer`}
                      value={formData.budget}
                      onChange={updateField("budget")}
                    >
                      <option value="">Select range</option>
                      <option>Under ₹1 Lakh</option>
                      <option>₹1L – ₹5L</option>
                      <option>₹5L – ₹20L</option>
                      <option>₹20L+</option>
                      <option>Not sure yet</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-[7px]">
                    <label className={labelClass} htmlFor="hear">
                      How did you hear about us?
                    </label>
                    <select
                      id="hear"
                      className={`${inputClass} form-select cursor-pointer`}
                      value={formData.hear}
                      onChange={updateField("hear")}
                    >
                      <option value="">Select</option>
                      <option>YouTube / Reels</option>
                      <option>LinkedIn</option>
                      <option>Instagram</option>
                      <option>Referral</option>
                      <option>Google Search</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <button
                  className="w-full bg-tw-primary text-white border-none rounded py-[17px] font-body text-[1.05rem] font-bold cursor-pointer transition-all mt-2 flex items-center justify-center gap-2 hover:bg-tw-primary-hover hover:-translate-y-0.5 hover:shadow-tw-primary focus-visible:outline-2 focus-visible:outline-tw-accent focus-visible:outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <div className="spinner" aria-hidden="true" /> Reserving
                      your slot...
                    </>
                  ) : (
                    <>
                      Start My 24-Hour Challenge{" "}
                      <span aria-hidden="true">→</span>
                    </>
                  )}
                </button>
                <p className="text-[0.78rem] text-tw-muted-light text-center mt-4 opacity-70">
                  No payment required. No long contracts. Just your idea — we'll
                  handle the rest.
                </p>
                <p className="text-[0.65rem] text-tw-muted-light/40 text-center mt-3">
                  This site is protected by reCAPTCHA and the Google{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-tw-muted-light/60"
                  >
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://policies.google.com/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-tw-muted-light/60"
                  >
                    Terms of Service
                  </a>{" "}
                  apply.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
