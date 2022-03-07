import { useEffect, useState } from "react";
import Card from "./Card";
import { LevelType } from "./LevelType";
import Header from "./Header";
import Theming from "./Theming";
import "./App.scss";

export interface CardType {
  image: string;
  id: number;
  matched: boolean;
  selected: boolean;
}
type AmiiboFetched = Pick<CardType, "image">;

export default function App() {
  const levelConf: LevelType[] = [
    {
      label: "Easy",
      cardsNumber: 4,
    },
    {
      label: "Medium",
      cardsNumber: 6,
    },
    {
      label: "Hard",
      cardsNumber: 9,
    },
  ];
  const [level, setLevel] = useState<LevelType>(levelConf[0]);
  const [series, setSeries] = useState<string>("Pokemon");
  const [cards, setCards] = useState<CardType[]>([]);
  const [turns, setTurns] = useState<number>(0);
  const [choiceOne, setChoiceOne] = useState<CardType | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<CardType | null>(null);

  const shuffle = async (series: string, level: LevelType) => {
    const items: CardType[] = generateItems(await getData(series), level);
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(items);
    setTurns(0);
  };

  const reset = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns! + 1);
    setCards((cards) => {
      return cards.map((c) => {
        if (c.matched === false) {
          return { ...c, selected: false };
        } else {
          return { ...c, matched: true, selected: true };
        }
      });
    });
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
      <Header
        key={Math.floor(Math.random() * 100)}
        turns={turns}
        level={level}
        series={series}
        setLevel={setLevel}
        setSeries={setSeries}
        shuffle={shuffle}
        levelConf={levelConf}
      />
      <div className={level.label + " cardGrid"}>
        {cards!.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            clicked={card.selected || card.matched}
            gridLabel={"card" + level.label}
          />
        ))}
      </div>
      <Theming />
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
  level: LevelType
): CardType[] {
  const items: CardType[] = [];
  const itemsWithId: CardType[] = [];
  if (data) {
    for (let i = 0; i < level.cardsNumber; i++) {
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
