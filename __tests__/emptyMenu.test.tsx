import { expect, it, test, describe, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import EmptyMenu from "@/components/emptyMenu";

describe("EmptyMenu", () => {
  it("renders empty message", () => {
    const handleClick = vi.fn();
    render(<EmptyMenu onAddMenu={handleClick} />);
    expect(screen.getByTestId("empty-message")).toBeDefined();
    expect(screen.getByTestId("empty-message")).toHaveTextContent(
      "Menu jest puste",
    );
  });
  it("should emit clicked button", () => {
    const handleClick = vi.fn();
    render(<EmptyMenu onAddMenu={handleClick} />);
    expect(screen.getByTestId("menu-button")).toBeDefined();
    fireEvent.click(screen.getAllByTestId("menu-button")[0]);
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
