import { useEffect, useState } from "react";
import Card from "./Card";
import "./styles.scss";

export interface CardType {
  image: string;
  matched: boolean;
  id: number;
}
export type AmiiboCard = Omit<CardType, "id">;

type AmiiboFetched = Pick<CardType, "image">;

export default function App() {
  const [level, setLevel] = useState<number>(4);
  const [cards, setCards] = useState<CardType[]>([]);
  const [turns, setTurns] = useState<number>(0);
  const [choiceOne, setChoiceOne] = useState<AmiiboCard | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<AmiiboCard | null>(null);
  const [disabled, setDisabled] = useState(false);

  const shuffle = async (series: string, level: number) => {
    const url: string =
      "https://www.amiiboapi.com/api/amiibo/?gameseries=" + series;
    const data: AmiiboFetched[] | undefined = await getData(url);
    const items: AmiiboCard[] = generateItems(data, level);

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
    shuffle("Pokemon", level);
  }, []);

  return (
    <div className='App'>
      <h1>Credimi coding challenge</h1>
      <h2>An amiibo card game</h2>
      <div>
        <button
          onClick={() => {
            setLevel(4);
          }}
        >
          Easy
        </button>
        <button
          onClick={() => {
            setLevel(6);
          }}
        >
          Medium
        </button>
        <button
          onClick={() => {
            setLevel(8);
          }}
        >
          Hard
        </button>
      </div>
      <button
        onClick={() => {
          shuffle("Pokemon", level);
        }}
      >
        Pokemons
      </button>
      <button
        onClick={() => {
          shuffle("animal%20crossing", level);
        }}
      >
        Animal Crossing
      </button>
      <button
        onClick={() => {
          shuffle("Mario%20Sports%20Superstars", level);
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
async function getData(theUrl: string) {
  try {
    const fetchedData = await fetch(theUrl);
    const data = await fetchedData.json();
    const myCards: AmiiboFetched[] = [];
    data.amiibo.forEach((amiibo: any) => {
      const image: AmiiboFetched = { image: amiibo.image };
      myCards.push(image);
    });
    return myCards;
  } catch (err) {
    alert(err);
  }
}

// TODO: permetti di scegliere quante carte usare
function generateItems(
  data: AmiiboFetched[] | undefined,
  level: number
): AmiiboCard[] {
  const items: AmiiboCard[] = [];
  if (data) {
    for (let i = 0; i < level; i++) {
      const randNum: number = Math.floor(Math.random() * data.length);
      const { image } = data[randNum];
      items.push({
        image,
        matched: false,
      });
      data.splice(randNum, randNum + 1);
    }
  }

  return items;
}
