import { useEffect, useState } from "react";
import Card from "./Card";
import "./styles.scss";

interface AmiiboFetched {
  image: string;
}

export interface AmiiboCard {
  image: string;
  matched: boolean;
}
export interface CardType {
  image: string;
  matched: boolean;
  id: number;
}

export default function App() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [turns, setTurns] = useState<number>(0);
  const [choiceOne, setChoiceOne] = useState<AmiiboCard | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<AmiiboCard | null>(null);
  const [disabled, setDisabled] = useState(false);

  const shuffle = (series: string) => {
    const url: string =
      "https://www.amiiboapi.com/api/amiibo/?gameseries=" + series;
    const data: AmiiboFetched[] = getData(url);
    const items: AmiiboCard[] = generateItems(data);

    const shuffled: CardType[] = [...items, ...items]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffled);
    setTurns(0);
  };

  const handleChoice = (card: AmiiboCard): void => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.image === choiceTwo.image) {
        setCards((prevCards) => {
          return prevCards!.map((card) => {
            if (card.image === choiceOne.image) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
      }
      setTimeout(() => reset(), 500);
    }
  }, [choiceOne, choiceTwo]);

  const reset = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns! + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffle("Pokemon");
  }, []);

  return (
    <div className='App'>
      <h1>Credimi coding challenge</h1>
      <h2>An amiibo card game</h2>
      <button
        onClick={() => {
          shuffle("Pokemon");
        }}
      >
        Pokemons
      </button>
      <button
        onClick={() => {
          shuffle("animal%20crossing");
        }}
      >
        Animal Crossing
      </button>
      <button
        onClick={() => {
          shuffle("Mario%20Sports%20Superstars");
        }}
      >
        Mario Sports Superstars
      </button>

      <div className='grid'>
        {cards!.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            hidden={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

// Helpers
// Prova a usare un fetch o qualche libreria (axios)
function getData(theUrl: string): AmiiboFetched[] {
  // const fetchedData = JSON.parse(fetch(theUrl).toString());
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false);
  xmlHttp.send(null);
  const fetchedData = JSON.parse(xmlHttp.responseText);
  const myCards: AmiiboFetched[] = [];
  fetchedData.amiibo.forEach((amiibo: any) => {
    const image: AmiiboFetched = { image: amiibo.image };
    myCards.push(image);
  });

  return myCards;
}

function generateItems(data: AmiiboFetched[]): AmiiboCard[] {
  const items: AmiiboCard[] = [];
  for (let i = 0; i < 4; i++) {
    const randNum: number = Math.floor(Math.random() * data.length);
    const { image } = data[randNum];
    items.push({
      image,
      matched: false,
    });
    data.splice(randNum, randNum + 1);
  }

  return items;
}
