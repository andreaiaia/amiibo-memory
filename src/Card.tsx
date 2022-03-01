import { CardType } from "./App";

interface Props {
  handleChoice: (card: CardType) => void;
  card: CardType;
  clicked: boolean;
}

export default function Card(props: Props) {
  const handleClick = () => {
    if (!props.clicked) {
      props.handleChoice(props.card);
    }
  };

  return (
    <div className='card'>
      <div
        className={props.clicked ? "cardContainer" : "cardContainer cardHidden"}
      >
        <img
          className={props.clicked ? "image" : "image hidden"}
          src={props.card.image}
          alt='amiibo'
          onClick={handleClick}
        ></img>
      </div>
    </div>
  );
}
