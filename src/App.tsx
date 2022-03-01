import { useEffect, useState } from "react";
import Card from "./Card";
import "./styles.scss";

export interface CardType {
  image: string;
  id: number;
  matched: boolean;
  selected: boolean;
}
type AmiiboFetched = Pick<CardType, "image">;

export default function App() {
  const [info, setInfo] = useState<string>("Easy");
  const [level, setLevel] = useState<number>(4);
  const [series, setSeries] = useState<string>("Pokemon");
  const [cards, setCards] = useState<CardType[]>([]);
  const [turns, setTurns] = useState<number>(0);
  const [choiceOne, setChoiceOne] = useState<CardType | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<CardType | null>(null);

  const shuffle = async (series: string, level: number) => {
    const items: CardType[] = generateItems(await getData(series), level);
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(items);
    setTurns(0);
  };

  // useEffect(() => {
  //   console.log(cards);
  // }, [cards]);

  const reset = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns! + 1);
    setCards(
      cards.map((c) => {
        if (c.matched === false) return { ...c, selected: false };
        return { ...c, matched: true, selected: true };
      })
    );
  };

  const handleChoice = (card: CardType): void => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    setCards(
      cards.map((c) => {
        if (card.id === c.id) c.selected = true;
        return c;
      })
    );
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      console.log(choiceOne);
      console.log(choiceTwo);
      if (choiceOne.image === choiceTwo.image) {
        setCards((prevCards) => {
          return prevCards!.map((card) => {
            if (card.id === choiceOne.id || card.id === choiceTwo.id) {
              return { ...card, matched: true, selected: true };
            } else {
              return card;
            }
          });
        });
      }
      setTimeout(() => reset(), 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shuffle(series, level);
  }, [level, series]);

  return (
    <div className='App'>
      <h1>Credimi coding challenge</h1>
      <h2>An amiibo card game</h2>
      <h3>Difficulty: {info}</h3>
      <div>
        {/* TODO: Aggiungere info per screenreader */}
        {/* TODO: Prova con UseEffect */}
        {/* TODO: fai componente per i bottoni */}
        <button
          type='button'
          onClick={() => {
            setLevel(4);
            setInfo("Easy");
            shuffle(series, level);
          }}
        >
          Easy
        </button>
        <button
          onClick={() => {
            setLevel(6);
            setInfo("Medium");
            shuffle(series, level);
          }}
        >
          Medium
        </button>
        <button
          onClick={() => {
            setLevel(8);
            setInfo("Hard");
            shuffle(series, level);
          }}
        >
          Hard
        </button>
      </div>
      <button
        onClick={() => {
          setSeries("Pokemon");
          shuffle(series, level);
        }}
      >
        Pokemons
      </button>
      <button
        onClick={() => {
          setSeries("animal%20crossing");
          shuffle(series, level);
        }}
      >
        Animal Crossing
      </button>
      <button
        onClick={() => {
          setSeries("Mario%20Sports%20Superstars");
          shuffle(series, level);
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
            clicked={card.selected}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

// Helpers
async function getData(series: string) {
  const theUrl: string =
    "https://www.amiiboapi.com/api/amiibo/?gameseries=" + series;
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
    console.log(err);
  }
}

function generateItems(
  data: AmiiboFetched[] | undefined,
  level: number
): CardType[] {
  const items: CardType[] = [];
  const itemsWithId: CardType[] = [];
  if (data) {
    for (let i = 0; i < level; i++) {
      const randNum: number = Math.floor(Math.random() * data.length);
      const { image } = data[randNum];
      items.push({
        image,
        matched: false,
        selected: false,
        id: 0,
      });
      data.splice(randNum, randNum + 1);
    }
    items.push(...items);
    items.forEach((value, index) => {
      itemsWithId.push({
        ...value,
        id: index,
      });
      return value;
    });
  }
  return shuffleArray(itemsWithId);
}

function shuffleArray(items: CardType[]): CardType[] {
  return items.sort(() => Math.random() - 0.5);
}
