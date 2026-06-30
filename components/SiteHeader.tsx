import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

const navigation = [
  { label: "Tetris", href: "/games/tetris/" },
  { label: "Neon Shatter", href: "/games/neon-shatter/" },
  { label: "Digital Twin", href: "/digital-twin/" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="Jeremy Demers home">
          <span className="brand-mark" aria-hidden="true">JD</span>
          <span>Jeremy Demers</span>
        </Link>
        <nav className="main-nav" aria-label="Projects">
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
