"use client";

import Image from "next/image";
import styles from "./HotelList.module.css";
import { useMemo, useState } from "react";
import { Hotel } from "../../types/types";
import { BookNowBox } from "../BookNowButton/BookNowButton";

interface HotelListProps {
  hotels: Hotel[];
}

export const HotelList: React.FC<HotelListProps> = ({ hotels }) => {
  const [sortBy, setSortBy] = useState<"price" | "rating" | "name">("price");
  const [expanded, setExpanded] = useState<{ [id: string]: boolean }>({});

  const sortedHotels = useMemo(() => {
    return [...hotels].sort((a, b) => {
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
  }, [hotels, sortBy]);

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className={styles.hotelList}>
  <div className={styles.sortCard}>
    <div className={styles.sortOptions}>
      {["price", "rating", "name"].map((criteria) => (
        <button
          key={criteria}
          className={criteria === sortBy ? styles.active : ""}
          onClick={() => setSortBy(criteria as "price" | "rating" | "name")}
        >
          {criteria.charAt(0).toUpperCase() + criteria.slice(1)}
        </button>
      ))}
    </div>
  </div>

  {sortedHotels.map((hotel) => (
    <div key={hotel.resort.id} className={styles.hotelCard}>
      <div className={styles.hotelImage}>
        <Image
          src={hotel.resort.image.url}
          alt={hotel.resort.image.description}
          width={300}
          height={200}
        />
      </div>
      <div className={styles.hotelDetails}>
        <h2 className={styles.hotelName}>{hotel.resort.name}</h2>
        <p className={styles.hotelLocation}>
          {hotel.resort.regionName}, {hotel.resort.countryName}
        </p>
        <p className={styles.starRating}>
          {"⭐".repeat(hotel.resort.starRating)}
        </p>

        <p>
          {hotel.bookingDetails.party.adults} Adults,{" "}
          {hotel.bookingDetails.party.children} Children
        </p>
        <p>
          departing from {hotel.flightDetails.departureAirport} on{" "}
          {hotel.flightDetails.departureDate}
        </p>
        <BookNowBox price={`${hotel.bookingDetails.price.amount} ${hotel.bookingDetails.price.currency}`} />
        <button
          onClick={() => toggleExpand(hotel.resort.id)}
          className={styles.expandButton}
        >
          {expanded[hotel.resort.id]
            ? "Read less about this hotel"
            : "Read more about this hotel"}{" "}
          {expanded[hotel.resort.id] ? "▲" : "▼"}
        </button>
        {expanded[hotel.resort.id] && (
          <p className={styles.overview}>{hotel.resort.overview}</p>
        )}
      </div>
    </div>
  ))}
</div>

  );
};
