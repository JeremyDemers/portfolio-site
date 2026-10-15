"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Github, Linkedin, Menu, X } from "lucide-react";

const navigation = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, []);
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link
          className="brand"
          href="/"
          aria-label="Jeremy Demers home"
          onClick={() => setOpen(false)}
        >
          <span className="brand-mark" aria-hidden="true">
            JD
          </span>
          <span>Jeremy Demers</span>
        </Link>
        <button
          ref={trigger}
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          id="primary-navigation"
          className={`main-nav ${open ? "is-open" : ""}`}
          aria-label="Primary navigation"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={
                item.label === "Work" && pathname !== "/"
                  ? "location"
                  : undefined
              }
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-socials" aria-label="Professional profiles">
          <a
            className="nav-social"
            aria-label="GitHub profile"
            href="https://github.com/JeremyDemers"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={19} aria-hidden="true" />
          </a>
          <a
            className="nav-social"
            aria-label="LinkedIn profile"
            href="https://www.linkedin.com/in/jeremy-demers/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={19} aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  );
}
