"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

type ShadowSurfaceProps = {
  children: ReactNode;
  label: string;
  stylesheet: string;
};

export function ShadowSurface({ children, label, stylesheet }: ShadowSurfaceProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [mountNode, setMountNode] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const shadow = host.shadowRoot ?? host.attachShadow({ mode: "open" });
    const link = document.createElement("link");
    const mount = document.createElement("div");

    link.rel = "stylesheet";
    link.href = stylesheet;
    mount.className = "game-root";
    shadow.replaceChildren(link, mount);
    setMountNode(mount);

    return () => {
      setMountNode(null);
      shadow.replaceChildren();
    };
  }, [stylesheet]);

  return (
    <div ref={hostRef} className="embedded-game-host" aria-label={label}>
      {mountNode ? createPortal(children, mountNode) : <p className="game-loading">Loading game…</p>}
    </div>
  );
}

