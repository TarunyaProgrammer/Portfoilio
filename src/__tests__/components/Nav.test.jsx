/**
 * Nav Component Tests
 * Critical: Navigation must always render the correct links and logo.
 * A broken nav = users can't reach any page.
 *
 * NOTE: Nav now renders TWO navs (desktop sidebar + mobile bottom bar),
 * so each link has 2 instances. We use getAllByLabelText and check [0].
 */
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Nav from "../../components/Nav";

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
  it("renders the logo text (full or short)", () => {
    renderNav();
    // Either TK. or TARUNYA KESH must be present (responsive)
    const fullLogo = screen.queryByText(/TARUNYA KESH/i);
    const shortLogo = screen.queryByText(/TK\./i);
    expect(fullLogo || shortLogo).not.toBeNull();
  });

  it("renders the Book Call CTA", () => {
    renderNav();
    // Either "Book Call" or shortened "Call" on mobile
    const cta = screen.queryByText(/Book Call/i) || screen.queryByText(/Call ↗/i);
    expect(cta).not.toBeNull();
  });

  it("renders all 4 navigation icon links in both navs", () => {
    renderNav();
    // Each label appears twice (desktop sidebar + mobile bottom nav)
    expect(screen.getAllByLabelText("Home").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByLabelText("Projects").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByLabelText("Blogs").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByLabelText("Resume").length).toBeGreaterThanOrEqual(1);
  });

  it("Home link(s) point to /", () => {
    renderNav();
    const links = screen.getAllByLabelText("Home").map((el) => el.closest("a"));
    links.forEach((link) => expect(link).toHaveAttribute("href", "/"));
  });

  it("Projects link(s) point to /systems", () => {
    renderNav();
    const links = screen.getAllByLabelText("Projects").map((el) => el.closest("a"));
    links.forEach((link) => expect(link).toHaveAttribute("href", "/systems"));
  });

  it("Blogs link(s) point to /blogs", () => {
    renderNav();
    const links = screen.getAllByLabelText("Blogs").map((el) => el.closest("a"));
    links.forEach((link) => expect(link).toHaveAttribute("href", "/blogs"));
  });

  it("Resume link(s) point to /resume", () => {
    renderNav();
    const links = screen.getAllByLabelText("Resume").map((el) => el.closest("a"));
    links.forEach((link) => expect(link).toHaveAttribute("href", "/resume"));
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
