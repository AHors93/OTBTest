import styles from "./BookNowButton.module.css";

export const BookNowButton = ({ price }: { price: string }) => {
    return (
      <div className={styles.bookNowBox}>
        <button className={styles.bookNowButton}>Book now</button>
        <p className={styles.priceText}>{price}</p>
      </div>
    );
};
  