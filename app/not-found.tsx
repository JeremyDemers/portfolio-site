import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found shell">
      <p className="eyebrow">404 / Lost signal</p>
      <h1>This route hasn&apos;t been built.</h1>
      <p>The good news: the way home has.</p>
      <Link className="button button-primary" href="/">Return home</Link>
    </main>
  );
}

