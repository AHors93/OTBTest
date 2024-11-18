import { SortingButton } from "@/components/SortingButton";
import { render, screen, fireEvent } from "@testing-library/react";


describe("SortingButton Component", () => {
  const mockOnClick = jest.fn();

  test("renders with correct label", () => {
    render(
      <SortingButton
        sortBy="price"
        currentSort="price"
        onClick={mockOnClick}
      />
    );

    expect(screen.getByText("Sort by Price")).toBeInTheDocument();
  });

  test("activates the button when it matches currentSort", () => {
    render(
      <SortingButton
        sortBy="price"
        currentSort="price"
        onClick={mockOnClick}
      />
    );

    expect(screen.getByText("Sort by Price")).toHaveClass("active");
  });

  test("calls onClick when clicked", () => {
    render(
      <SortingButton
        sortBy="rating"
        currentSort="price"
        onClick={mockOnClick}
      />
    );

    fireEvent.click(screen.getByText("Sort by Rating"));
    expect(mockOnClick).toHaveBeenCalledWith("rating");
  });
});
