import { CardType, AmiiboCard } from "./App";

interface Props {
  disabled: boolean | null;
  handleChoice: (card: AmiiboCard) => void;
  card: CardType;
  hidden: boolean;
}

export default function Card(props: Props) {
  const handleClick = () => {
    if (!props.disabled) {
      props.handleChoice(props.card);
    }
  };

  return (
    <div className='card'>
      <div
        className={props.hidden ? "cardContainer" : "cardContainer cardHidden"}
      >
        <img
          className={props.hidden ? "image" : "image hidden"}
          src={props.card.image}
          alt='amiibo'
          onClick={handleClick}
        ></img>
      </div>
    </div>
  );
}
