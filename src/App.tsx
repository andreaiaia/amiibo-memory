import { useEffect, useState } from "react";
import Card from "./Card";
import "./styles.scss";

export interface cardobj {
  src: string;
  matched: boolean;
  id: number;
}

type obj = Omit<cardobj, 'id'>;

export default function App() {
  const [cards, setCards] = useState<cardobj[] | null>([]);
  const [turns, setTurns] = useState<number | null>(0);
  const [choiceOne, setChoiceOne] = useState<obj | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<obj | null>(null);
  const [disabled, setDisabled] = useState<boolean | null>(false);

  const shuffle = (series: string) => {
    const url: string =
      "https://www.amiiboapi.com/api/amiibo/?gameseries=" + series;
    const data: obj = httpGet(url);
    const items: obj[] = generateItems(data);

    const shuffled: cardobj[] = [...items, ...items]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffled);
    setTurns(0);
  };

  const handleChoice = (card: obj) => {
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
    <div className="App">
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

      <div className="grid">
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
function httpGet(theUrl: string): obj {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false);
  xmlHttp.send(null);
  return JSON.parse(xmlHttp.responseText);
}

function generateItems(data: any): obj[] {
  const items: obj[] = [
    {
      src:
        data.amiibo[Math.floor(Math.random() * Object.keys(data.amiibo).length)]
          .image,
      matched: false
    },
    {
      src:
        data.amiibo[Math.floor(Math.random() * Object.keys(data.amiibo).length)]
          .image,
      matched: false
    },
    {
      src:
        data.amiibo[Math.floor(Math.random() * Object.keys(data.amiibo).length)]
          .image,
      matched: false
    },
    {
      src:
        data.amiibo[Math.floor(Math.random() * Object.keys(data.amiibo).length)]
          .image,
      matched: false
    }
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
