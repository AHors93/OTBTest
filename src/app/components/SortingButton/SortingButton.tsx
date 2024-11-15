import styles from "../HotelList/HotelList.module.css";

interface SortingButtonProps {
  sortBy: "price" | "rating" | "name";
  currentSort: string;
  onClick: (sortBy: "price" | "rating" | "name") => void;
}

export const SortingButton: React.FC<SortingButtonProps> = ({
  sortBy,
  currentSort,
  onClick,
}) => {
  const isActive = currentSort === sortBy;
  const buttonText = `Sort by ${sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}`;

  return (
    <button
      className={isActive ? styles.active : ""}
      onClick={() => onClick(sortBy)}
    >
      {buttonText}
    </button>
  );
};
