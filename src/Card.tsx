import { useEffect, useRef } from "react";
import { CardType } from "./App";
import "./Card.scss";

interface Props {
  handleChoice: (card: CardType) => void;
  card: CardType;
  clicked: boolean;
  gridLabel: string;
}

export default function Card(props: Props) {
  const animDiv = useRef<HTMLDivElement>(null);
  // Animation stuff
  useEffect(() => {
    if (props.card.matched) {
      setTimeout(() => {
        if (animDiv.current) {
          animDiv.current.style.opacity = "1";
          animDiv.current.style.zIndex = "2";
        }
      }, 100);

      setTimeout(() => {
        if (animDiv.current) {
          animDiv.current.style.opacity = "0";
          animDiv.current.style.zIndex = "-1";
        }
      }, 750);
    }
  }, [props.card.matched]);

  // Functions
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
        <div ref={animDiv} className='cardAnimation'>
          <img src={require("./img/checkmark.svg")} alt='checkmark' />
        </div>
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
