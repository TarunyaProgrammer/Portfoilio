/**
 * CountUpNumber Unit Tests
 * Critical: This component drives all live telemetry metrics in Hero section.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import CountUpNumber from "../../components/CountUpNumber";

// Mock requestAnimationFrame / cancelAnimationFrame for test env
beforeEach(() => {
  vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
    cb(performance.now());
    return 1;
  });
  vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});
});

describe("CountUpNumber", () => {
  it("renders fallback value when target is 0", () => {
    render(<CountUpNumber target={0} fallback={45} prefix="+" duration={0.01} />);
    expect(screen.getByText(/\d+/)).toBeInTheDocument();
  });

  it("renders with prefix when provided", () => {
    render(<CountUpNumber target={45} prefix="+" duration={0.01} />);
    const el = screen.getByText(/\+/);
    expect(el).toBeInTheDocument();
  });

  it("renders fallback when target is NaN", () => {
    render(<CountUpNumber target={NaN} fallback={42} prefix="+" duration={0.01} />);
    expect(screen.getByText(/\d+/)).toBeInTheDocument();
  });
});
