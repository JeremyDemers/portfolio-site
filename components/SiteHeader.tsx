import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

const navigation = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="JD, Jeremy Demers home">
          <span className="brand-mark" aria-hidden="true">JD</span>
          <span>Jeremy Demers</span>
        </Link>
        <nav className="main-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </nav>
        <div className="header-socials" aria-label="Professional profiles">
          <a className="nav-social" href="https://www.linkedin.com/in/jeremy-demers/" target="_blank" rel="noopener noreferrer">
            <Linkedin size={14} aria-hidden="true" /> LinkedIn
          </a>
          <a className="nav-social" href="https://github.com/JeremyDemers" target="_blank" rel="noopener noreferrer">
            <Github size={14} aria-hidden="true" /> GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
