"use client";

import Image from "next/image";
import styles from "./HotelList.module.css";
import { useEffect, useMemo, useState } from "react";
import { Hotel } from "../../types/types";
import { SortingButton } from "../SortingButton/SortingButton";

interface HotelListProps {
  hotels: Hotel[];
}

export const HotelList: React.FC<HotelListProps> = ({ hotels }) => {
  const [sortBy, setSortBy] = useState<"price" | "rating" | "name">("price");
  const [expanded, setExpanded] = useState<{ [id: string]: boolean }>({});
  const [formattedHotels, setFormattedHotels] = useState<Hotel[]>([]);

  // I was getting something called a hydration error which i've not come across before, this useEffect formats the departureDate only on the client. 
  // When the component mounts, it can format the date on initial render which prevents the error i was getting
  // What i've done is created a new array 'updatedHotels' where you format the date using toLocalDateString

  useEffect(() => {
    const updatedHotels = hotels.map((hotel) => ({
      ...hotel,
      flightDetails: {
        ...hotel.flightDetails,
        departureDate: new Date(hotel.flightDetails.departureDate).toLocaleDateString("en-GB"),
      },
    }));
    setFormattedHotels(updatedHotels);
  }, [hotels]);

  const sortedHotels = useMemo(() => {
    return [...formattedHotels].sort((a, b) => {
      if (sortBy === "price") {
        return a.bookingDetails.price.amount - b.bookingDetails.price.amount;
      }
      if (sortBy === "rating") {
        return b.resort.starRating - a.resort.starRating;
      }
      if (sortBy === "name") {
        return a.resort.name.localeCompare(b.resort.name);
      }
      return 0;
    });
  }, [formattedHotels, sortBy]);

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderHotelDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB");
  };

  return (
    <div className={styles.hotelList}>
      <div className={styles.sortOptions}>
        {["price", "rating", "name"].map((criteria) => (
          <SortingButton
            key={criteria}
            sortBy={criteria as "price" | "rating" | "name"}
            currentSort={sortBy}
            onClick={setSortBy}
          />
        ))}
      </div>

      {sortedHotels.map((hotel) => (
        <div key={hotel.resort.id} className={styles.hotelItem}>
          <h2>{hotel.resort.name}</h2>
          <p>
            {hotel.resort.regionName}, {hotel.resort.countryName}
          </p>
          <Image
            src={hotel.resort.image.url}
            alt={hotel.resort.image.description}
            width={300}
            height={200}
          />
          <p>
            <strong>Price:</strong> {hotel.bookingDetails.price.amount}{" "}
            {hotel.bookingDetails.price.currency}
          </p>
          <p>
            <strong>Star Rating:</strong> {hotel.resort.starRating} ★
          </p>
          <p>
            <strong>Flight:</strong> {hotel.flightDetails.departureAirport} on{" "}
            {renderHotelDate(hotel.flightDetails.departureDate)}
          </p>
          <button
            onClick={() => toggleExpand(hotel.resort.id)}
            className={styles.expandButton}
          >
            {expanded[hotel.resort.id] ? "Collapse" : "Expand"} Description
          </button>
          {expanded[hotel.resort.id] && (
            <p className={styles.description}>{hotel.resort.overview}</p>
          )}
        </div>
      ))}
    </div>
  );
};
