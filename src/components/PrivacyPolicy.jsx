import { Link } from "react-router-dom";

export default function PrivacyPolicy({ homePath = "/" }) {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-tw-border py-5 px-[5%]">
        <div className="max-w-[800px] mx-auto flex items-center justify-between">
          <Link to={homePath} className="font-heading font-extrabold text-[1.15rem] text-tw-dark no-underline">
            tail<span className="text-tw-primary">webs</span>
          </Link>
          <Link
            to={homePath}
            className="text-[0.85rem] text-tw-primary no-underline font-medium hover:underline"
          >
            &larr; Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-[800px] mx-auto px-[5%] py-16">
        <h1 className="font-heading text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold tracking-tight text-tw-text mb-2">
          Privacy Policy
        </h1>
        <p className="text-[0.9rem] text-tw-muted mb-10">
          for Tailwebs Technology Pvt. Ltd.
        </p>

        <section className="mb-8">
          <h2 className="font-heading text-[1.25rem] font-bold text-tw-text mb-3">
            What information do we collect?
          </h2>
          <p className="text-[0.95rem] text-tw-muted leading-[1.8]">
            When you interact with us, we may collect your name, address, email
            address(es), telephone number(s), and, where appropriate, date of
            birth.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-[1.25rem] font-bold text-tw-text mb-3">
            How do we collect information?
          </h2>
          <p className="text-[0.95rem] text-tw-muted leading-[1.8]">
            We may collect information about you whenever you interact with us.
            For example, when you contact regarding our activities, register as a
            supporter, send or receive information or sign a petition, you
            specifically and knowingly provide us with your personal information.
            We may also receive information about you from third parties — but
            only if you have given them permission to share your information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-[1.25rem] font-bold text-tw-text mb-3">
            Confidentiality
          </h2>
          <p className="text-[0.95rem] text-tw-muted leading-[1.8]">
            We will not be responsible for the privacy of data collected by
            websites not owned or managed by Tailwebs Technology Pvt. Ltd.,
            including those linked through our website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-[1.25rem] font-bold text-tw-text mb-3">
            Making a complaint
          </h2>
          <p className="text-[0.95rem] text-tw-muted leading-[1.8]">
            If you are not satisfied with the response, please contact us at{" "}
            <a
              href="mailto:hello@tailwebs.com"
              className="text-tw-primary no-underline hover:underline"
            >
              hello@tailwebs.com
            </a>{" "}
            with the details explaining your concerns. We will review your
            complaint and investigate if the right procedures have been followed
            and respond back to you as appropriate. We aim to complete this
            investigation within 15 working days of receiving your complaint,
            however, in some cases it may take longer.
          </p>
        </section>
      </main>

      <footer className="border-t border-tw-border py-6 px-[5%]">
        <div className="max-w-[800px] mx-auto text-center text-[0.78rem] text-tw-muted">
          &copy; {new Date().getFullYear()} Tailwebs Technology Pvt. Ltd. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
