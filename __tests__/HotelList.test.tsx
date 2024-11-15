import { render, screen, fireEvent } from "@testing-library/react";
import { HotelList } from "../src/app/components/HotelList/HotelList";
import { Hotel } from "src/app/types/types";

// Just some sample hotel data
const mockHotels: Hotel[] = [
  {
    resort: {
      id: "1",
      name: "Hotel A",
      regionName: "Region A",
      countryName: "Country A",
      starRating: 5,
      image: { "url": "https://static.onthebeach.co.uk/fe-code-test/hotel-image-1.jpg",
        "description": "A tranquil resort swimming pool with clear blue water, surrounded by two-story villas with terracotta roofs under a bright blue sky."},
      overview: "Hotel A Overview",
    },
    bookingDetails: {
      price: { amount: 200, currency: "USD" },
      party: { adults: 2, children: 1, infants: 1 },
      lengthOfStay: 7,
    },
    flightDetails: {
      departureAirport: "Airport A",
      departureDate: "2030-07-03T00:00:00Z",
    },
  },
  // Could add more hotel data here if needed
];

describe("HotelList Component", () => {
  test("renders without crashing", () => {
    render(<HotelList hotels={mockHotels} />);

    expect(screen.getByText("Hotel A")).toBeInTheDocument();

    expect(screen.getByText("Sort by Price")).toBeInTheDocument();
  });

  test("sorts hotels by price", () => {
    render(<HotelList hotels={mockHotels} />);

    fireEvent.click(screen.getByText("Sort by Price"));

    expect(screen.getByText("Sort by Price")).toHaveClass("active");
  });

  test("expands and collapses hotel description", () => {
    render(<HotelList hotels={mockHotels} />);

    expect(screen.queryByText("Hotel A Overview")).toBeNull();

    fireEvent.click(screen.getByText("Expand Description"));
    
    expect(screen.getByText("Hotel A Overview")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Collapse Description"));

    expect(screen.queryByText("Hotel A Overview")).toBeNull();
  });
});
