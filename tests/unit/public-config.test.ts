import { afterEach, describe, expect, it, vi } from "vitest";
import { buildApiUrl, getPublicApiBase } from "@/lib/public-config";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("getPublicApiBase", () => {
  it("fails closed when production API configuration is missing", () => {
    vi.stubEnv("NODE_ENV", "production");

    expect(getPublicApiBase(undefined, 8000)).toBe("");
    expect(getPublicApiBase("   ", 8000)).toBe("");
  });

  it("falls back to localhost only in development", () => {
    vi.stubEnv("NODE_ENV", "development");

    expect(getPublicApiBase(undefined, 8000)).toBe("http://localhost:8000");
  });

  it("accepts https API origins and normalizes trailing slashes", () => {
    vi.stubEnv("NODE_ENV", "production");

    expect(getPublicApiBase(" https://api.jeremysdemers.com/// ", 8000)).toBe(
      "https://api.jeremysdemers.com",
    );
  });

  it("rejects unsafe or malformed production origins", () => {
    vi.stubEnv("NODE_ENV", "production");

    expect(getPublicApiBase("http://api.jeremysdemers.com", 8000)).toBe("");
    expect(getPublicApiBase("javascript:alert(1)", 8000)).toBe("");
    expect(getPublicApiBase("not a url", 8000)).toBe("");
  });

  it("allows localhost http origins only in development", () => {
    vi.stubEnv("NODE_ENV", "development");

    expect(getPublicApiBase("http://127.0.0.1:8001/", 8001)).toBe("http://127.0.0.1:8001");
  });
});

describe("buildApiUrl", () => {
  it("preserves same-origin API paths", () => {
    expect(buildApiUrl("", "/api/health")).toBe("/api/health");
  });

  it("joins configured API base and paths consistently", () => {
    expect(buildApiUrl("https://api.jeremysdemers.com", "health")).toBe(
      "https://api.jeremysdemers.com/health",
    );
    expect(buildApiUrl("https://api.jeremysdemers.com", "/chat")).toBe(
      "https://api.jeremysdemers.com/chat",
    );
  });

  it("throws when an external API path has no safe base URL", () => {
    expect(() => buildApiUrl("", "/chat")).toThrow("Public API URL is not configured.");
  });
});
