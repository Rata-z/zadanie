import { expect, it, test, describe, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import AddMenu from "@/components/menuForm.tsx/addMenuForm";

describe("AddMenu", () => {
  it("renders form correctly", () => {
    const handleClick = vi.fn();
    const submitEvent = vi.fn();
    render(<AddMenu handleCancel={handleClick} onSubmit={submitEvent} />);
    expect(screen.getAllByTestId("submit-button")[0]).toHaveTextContent(
      "Dodaj",
    );
  });
});
