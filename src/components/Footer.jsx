export default function Footer() {
  return (
    <footer className="border-t border-tw-border py-10 px-[5%]" role="contentinfo">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between flex-wrap gap-4 max-md:justify-center max-md:text-center">
        <div className="font-heading font-extrabold text-[1.15rem] text-tw-dark">
          tail<span className="text-tw-primary">webs</span>
        </div>
        <div className="flex gap-6 flex-wrap max-md:justify-center" role="navigation" aria-label="Footer links">
          <a className="text-[0.82rem] text-tw-muted no-underline transition-colors hover:text-tw-primary focus-visible:text-tw-primary focus-visible:outline-none" href="https://tailwebs.com" target="_blank" rel="noopener noreferrer">tailwebs.com</a>
          <a className="text-[0.82rem] text-tw-muted no-underline transition-colors hover:text-tw-primary focus-visible:text-tw-primary focus-visible:outline-none" href="tel:+919590708339">+91 9590708339</a>
          <a className="text-[0.82rem] text-tw-muted no-underline transition-colors hover:text-tw-primary focus-visible:text-tw-primary focus-visible:outline-none" href="mailto:hello@tailwebs.com">hello@tailwebs.com</a>
          <span className="text-[0.82rem] text-tw-muted cursor-pointer">Bengaluru, Karnataka</span>
        </div>
        <div className="text-[0.78rem] text-tw-muted w-full text-center mt-5 pt-5 border-t border-tw-border">
          © {new Date().getFullYear()} Tailwebs Technology Pvt. Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
