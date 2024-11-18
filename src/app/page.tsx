"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { HotelList } from "@/components/HotelList";
import { Hotel } from "./types/types";

const Home = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await fetch("/data/hotels.json");
        const data: Hotel[] = await res.json();
        
        
        // I was getting something called a hydration error which i've done come across before, this useEffect formats the departureDate only on the client. 
        // When the component mounts, it can format the date on initial render which prevents the error i was getting
        // What i've done is created a new array 'updatedHotels' where you format the date using toLocalDateString
        const updatedHotels = data.map((hotel) => ({
          ...hotel,
          flightDetails: {
            ...hotel.flightDetails,
            departureDate: new Date(hotel.flightDetails.departureDate).toLocaleDateString("en-GB"),
          },
        }));

        setHotels(updatedHotels); 
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels(); 
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.background}>
        <Image
          src="https://static.onthebeach.co.uk/fe-code-test/background.png"
          alt="Background Image"
          layout="fill"
          className={styles.image}
        />
      </div>
      <main className={styles.main}>
        <HotelList hotels={hotels} />
      </main>
    </div>
  );
};

export default Home;
