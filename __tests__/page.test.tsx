import { expect, it, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home", () => {
  it("renders header correctly", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Dodaj pozycję menu" }),
    ).toBeDefined();
  });
});
