import { render, screen } from "@testing-library/react";
import { BookNowButton } from "../src/app/components/BookNowButton/BookNowButton";

describe("BookNowBox Component", () => {
  test("renders the Book Now button and price correctly", () => {
    const mockPrice = "200 USD";
    render(<BookNowButton price={mockPrice} />);

    expect(screen.getByText("Book now")).toBeInTheDocument();

    expect(screen.getByText(mockPrice)).toBeInTheDocument();
  });
});
