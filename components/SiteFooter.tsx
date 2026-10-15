import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <div>
          <span className="footer-mark">JD</span>
          <p>
            © {new Date().getFullYear()} Jeremy Demers. Designed & built with
            care.
          </p>
        </div>
        <div className="footer-links">
          <Link href="/#work">Work</Link>
          <Link href="/#contact">Contact</Link>
          <a href="mailto:JeremySD99@gmail.com">Email</a>
          <a
            href="https://www.linkedin.com/in/jeremy-demers/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/JeremyDemers"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
