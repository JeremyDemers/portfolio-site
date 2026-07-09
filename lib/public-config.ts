const LOCALHOST_NAMES = new Set(["localhost", "127.0.0.1", "::1"]);

export function getPublicApiBase(value: string | undefined, localPort: number) {
  const trimmed = value?.trim().replace(/\/+$/, "");

  if (!trimmed) {
    return process.env.NODE_ENV === "development" ? `http://localhost:${localPort}` : "";
  }

  try {
    const url = new URL(trimmed);
    const isLocalhost = LOCALHOST_NAMES.has(url.hostname);
    const isAllowedProtocol = url.protocol === "https:" || (process.env.NODE_ENV === "development" && isLocalhost);

    return isAllowedProtocol ? trimmed : "";
  } catch {
    return "";
  }
}

export function buildApiUrl(apiBase: string, path: string) {
  if (path.startsWith("/api/")) return path;
  if (!apiBase) throw new Error("Public API URL is not configured.");
  return `${apiBase}${path.startsWith("/") ? path : `/${path}`}`;
}
