import Link from "next/link";

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
        <a className="nav-github" href="https://github.com/JeremyDemers" target="_blank" rel="noreferrer noopener">
          GitHub <span aria-hidden="true">↗</span>
        </a>
        <a className="nav-github" href="https://www.linkedin.com/in/jeremydemers/" target="_blank" rel="noreferrer noopener">
          LinkedIn <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  );
}

