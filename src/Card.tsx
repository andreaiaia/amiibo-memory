import { CardType } from "./App";
import "./card.scss";

interface Props {
  handleChoice: (card: CardType) => void;
  card: CardType;
  clicked: boolean;
  gridLabel: string;
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
        className={
          props.clicked
            ? "cardContainer " + props.gridLabel
            : "cardContainer cardHidden " + props.gridLabel
        }
      >
        <img
          className={props.clicked ? "front" : "front hidden"}
          src={props.card.image}
          alt='amiibo'
          onClick={handleClick}
        />
        <img
          className={props.clicked ? "back hidden" : "back"}
          src={require("./img/back.png")}
          alt='card back'
        />
      </div>
    </div>
  );
}
