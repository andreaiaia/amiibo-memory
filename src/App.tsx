import { useEffect, useState } from "react";
import Card from "./Card";
import "./styles.scss";

export interface CardType {
  src: string;
  matched: boolean;
  id: number;
}

export type AmiiboCard = Omit<CardType, "id">;

export default function App() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [turns, setTurns] = useState<number>(0);
  const [choiceOne, setChoiceOne] = useState<AmiiboCard | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<AmiiboCard | null>(null);
  const [disabled, setDisabled] = useState(false);

  const shuffle = (series: string) => {
    const url: string =
      "https://www.amiiboapi.com/api/amiibo/?gameseries=" + series;
    const data: AmiiboCard = httpGet(url);
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
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards!.map((card) => {
            if (card.src === choiceOne.src) {
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
function httpGet(theUrl: string): AmiiboCard {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false);
  xmlHttp.send(null);
  console.log(xmlHttp.responseText);

  return JSON.parse(xmlHttp.responseText);
}

function generateItems(data: any): AmiiboCard[] {
  console.log(data);
  const items: AmiiboCard[] = [
    {
      src: data.amiibo[
        Math.floor(Math.random() * Object.keys(data.amiibo).length)
      ].image,
      matched: false,
    },
    {
      src: data.amiibo[
        Math.floor(Math.random() * Object.keys(data.amiibo).length)
      ].image,
      matched: false,
    },
    {
      src: data.amiibo[
        Math.floor(Math.random() * Object.keys(data.amiibo).length)
      ].image,
      matched: false,
    },
    {
      src: data.amiibo[
        Math.floor(Math.random() * Object.keys(data.amiibo).length)
      ].image,
      matched: false,
    },
  ];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (items[i].src === items[j].src) {
        items[j].src =
          data.amiibo[
            Math.floor(Math.random() * Object.keys(data.amiibo).length)
          ].image;
      }
    }
  }

  return items;
}
