import { Link } from "react-router-dom";

export default function Footer({ privacyPath = "/privacy-policy" }) {
  const linkClass =
    "text-[0.82rem] text-tw-muted no-underline transition-colors hover:text-tw-primary focus-visible:text-tw-primary focus-visible:outline-none";

  return (
    <footer
      className="border-t border-tw-border py-10 px-[5%]"
      role="contentinfo"
    >
      <div className="max-w-[1280px] mx-auto flex items-center justify-between flex-wrap gap-4 max-md:justify-center max-md:text-center">
        <div className="font-heading font-extrabold text-[1.15rem] text-tw-dark">
          tail<span className="text-tw-primary">webs</span>
        </div>
        <div
          className="flex gap-6 flex-wrap max-md:justify-center"
          role="navigation"
          aria-label="Footer links"
        >
          <span className="text-[0.82rem] text-tw-muted">
            Bengaluru, Karnataka
          </span>
          <Link className={linkClass} to={privacyPath}>
            Privacy Policy
          </Link>
        </div>
        <div className="text-[0.78rem] text-tw-muted w-full text-center mt-5 pt-5 border-t border-tw-border">
          &copy; {new Date().getFullYear()} Tailwebs Technology Pvt. Ltd. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
}
