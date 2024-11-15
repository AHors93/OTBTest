import Image from "next/image";
import styles from "./page.module.css";
import { HotelList } from "./components/HotelList";
import path from "path";
import fs from 'fs'

async function fetchHotels() {
  const filePath = path.join(process.cwd(), "public", "data", "hotels.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
}

const Home = async () => {
  const hotels = await fetchHotels();

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
}

export default Home;
