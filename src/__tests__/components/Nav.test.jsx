/**
 * Nav Component Tests
 * Critical: Navigation must always render the correct links and logo.
 * A broken nav = users can't reach any page.
 */
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Nav from "../../components/Nav";

// Mock audioSynth — we don't need real Web Audio API in tests
vi.mock("../../utils/audioSynth", () => ({
  audioSynth: {
    playClickSound: vi.fn(),
    playCoinSound: vi.fn(),
    toggleMute: vi.fn(() => false),
    isMuted: vi.fn(() => false),
  },
}));

const renderNav = (path = "/") =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Nav />
    </MemoryRouter>
  );

describe("Nav", () => {
  it("renders the logo text", () => {
    renderNav();
    expect(screen.getByText(/TARUNYA KESH/i)).toBeInTheDocument();
  });

  it("renders the Book Call CTA button", () => {
    renderNav();
    expect(screen.getByText(/Book Call/i)).toBeInTheDocument();
  });

  it("renders all 4 navigation icon links with aria-labels", () => {
    renderNav();
    expect(screen.getByLabelText("Home")).toBeInTheDocument();
    expect(screen.getByLabelText("Projects")).toBeInTheDocument();
    expect(screen.getByLabelText("Blogs")).toBeInTheDocument();
    expect(screen.getByLabelText("Resume")).toBeInTheDocument();
  });

  it("Home link points to /", () => {
    renderNav();
    const homeLink = screen.getByLabelText("Home").closest("a");
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("Projects link points to /systems", () => {
    renderNav();
    const link = screen.getByLabelText("Projects").closest("a");
    expect(link).toHaveAttribute("href", "/systems");
  });

  it("Blogs link points to /blogs", () => {
    renderNav();
    const link = screen.getByLabelText("Blogs").closest("a");
    expect(link).toHaveAttribute("href", "/blogs");
  });

  it("Resume link points to /resume", () => {
    renderNav();
    const link = screen.getByLabelText("Resume").closest("a");
    expect(link).toHaveAttribute("href", "/resume");
  });

  it("renders the sound toggle button", () => {
    renderNav();
    expect(screen.getByLabelText(/sound effects/i)).toBeInTheDocument();
  });

  it("does NOT render Open for collaboration text", () => {
    renderNav();
    expect(screen.queryByText(/open for collaboration/i)).not.toBeInTheDocument();
  });
});
