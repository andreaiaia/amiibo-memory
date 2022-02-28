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
type AmiiboType = Omit<CardType, "id">;

export default function App() {
  const [info, setInfo] = useState<string>("Easy");
  const [level, setLevel] = useState<number>(4);
  const [series, setSeries] = useState<string>("Pokemon");
  const [cards, setCards] = useState<CardType[]>([]);
  const [turns, setTurns] = useState<number>(0);
  const [choiceOne, setChoiceOne] = useState<CardType | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<CardType | null>(null);
  const [disabled, setDisabled] = useState(false);

  const shuffle = async (series: string, level: number) => {
    // Fai funzione a parte per il recupero dati
    const url: string =
      "https://www.amiiboapi.com/api/amiibo/?gameseries=" + series;
    const data: AmiiboFetched[] | undefined = await getData(url);
    const items: AmiiboType[] = generateItems(data, level);

    const shuffled: CardType[] = [...items, ...items].map((item, index) => {
      const itemWithId: CardType = {
        ...item,
        id: index,
      };
      return itemWithId;
    });

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffled);
    setTurns(0);
  };

  useEffect(() => {
    console.log(cards);
  }, [cards]);

  const handleChoice = (card: CardType): void => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    setCards(
      cards.map((c, index) => {
        if (card.id === index) c.selected = true;
        return c;
      })
    );
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      console.log(choiceOne);
      console.log(choiceTwo);
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
    setCards(
      cards.map((c) => {
        if (c.matched === false) c.selected = false;
        return c;
      })
    );
  };

  useEffect(() => {
    shuffle(series, level);
    console.log(cards);
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
        {cards!.map((card, index) => (
          <Card
            key={index}
            card={card}
            handleChoice={handleChoice}
            clicked={card.selected}
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
): AmiiboType[] {
  const items: AmiiboType[] = [];
  if (data) {
    for (let i = 0; i < level; i++) {
      const randNum: number = Math.floor(Math.random() * data.length);
      const { image } = data[randNum];
      items.push({
        image,
        matched: false,
        selected: false,
      });
      data.splice(randNum, randNum + 1);
    }
  }

  return items;
}
