import { LevelType } from "./LevelType";
import DifficultyButton from "./DifficultyButton";
import SeriesButton from "./SeriesButton";
import "./Header.scss";

interface Props {
  turns: number;
  level: LevelType;
  series: string;
  setLevel: (_: LevelType) => void;
  setSeries: (_: string) => void;
  shuffle: (series: string, level: LevelType) => Promise<void>;
  levelConf: LevelType[];
}

export default function Header(props: Props) {
  const diff = ["easy", "medium", "hard"];
  const choice = [
    "pokemon",
    "animal%20crossing",
    "Mario%20Sports%20Superstars",
  ];

  return (
    <div className='header_bg'>
      <div className='header'>
        <div className='hero'>
          <img
            className='logo'
            src={require("./img/credimi_logo.jpg")}
            alt='Credimi'
          />
          <div className='texts'>
            <h1>Coding Challenge</h1>
            <h2>An Amiibo Card Game</h2>
            <p className='turns'>Turni: {props.turns}</p>
          </div>
        </div>
        <div className='buttons'>
          <div className='diffChoice'>
            {diff!.map((val, index) => {
              return (
                <DifficultyButton
                  key={Math.floor(Math.random() * 900)}
                  setting={val}
                  series={props.series}
                  level={props.level}
                  levelConf={props.levelConf[index]}
                  setLevel={props.setLevel}
                  shuffle={props.shuffle}
                />
              );
            })}
          </div>
          <div className='seriesChoice'>
            {choice!.map((val) => {
              return (
                <SeriesButton
                  key={Math.floor(Math.random() * 900)}
                  setting={val}
                  series={props.series}
                  level={props.level}
                  setSeries={props.setSeries}
                  shuffle={props.shuffle}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
