import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { HotelList } from "../src/app/components/HotelList/HotelList";
import { Hotel } from "app/types/types";

// Some sample hotel data
const mockHotels: Hotel[] = [
  {
    resort: {
      id: "1",
      name: "Hotel A",
      regionName: "Region A",
      countryName: "Country A",
      starRating: 5,
      image: { url: "https://static.onthebeach.co.uk/fe-code-test/hotel-image-1.jpg", description: "A tranquil resort swimming pool with clear blue water, surrounded by two-story villas with terracotta roofs under a bright blue sky." },
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

    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText("Rating")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
  });

  test("sorts hotels by price", () => {
    render(<HotelList hotels={mockHotels} />);

    fireEvent.click(screen.getByText("Price"));

    expect(screen.getByText("Price")).toHaveClass("active");
    // This test only accounts for one hotel, so I'd add more in the future to include multiple
  });
});

describe("HotelList Component", () => {
  test("expands and collapses hotel description", async () => {
    render(<HotelList hotels={mockHotels} />);

    expect(screen.queryByText("Hotel A Overview")).toBeNull();

    fireEvent.click(screen.getByText(/Read more about this hotel/i));

    await waitFor(() => screen.getByText("Hotel A Overview"));

    expect(screen.getByText("Hotel A Overview")).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Read less about this hotel/i));

    await waitFor(() => expect(screen.queryByText("Hotel A Overview")).toBeNull());
  });
});
