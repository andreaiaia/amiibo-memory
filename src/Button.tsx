import { LevelType } from "./LevelType";

interface Props {
  btnType: string;
  name: string;
  series: string;
  level: LevelType;
  levelConf: LevelType;
  setSeries?: (_: string) => void;
  setLevel?: (_: LevelType) => void;
  shuffle: (series: string, level: LevelType) => Promise<void>;
}

export default function Button(props: Props) {
  // functions
  const set = (): void => {
    if (props.setSeries) {
      props.setSeries(props.name);
    } else if (props.setLevel) {
      props.setLevel(props.levelConf);
    }
  };
  const assignClasses = (): string => {
    if (props.btnType === "seriesChoice") {
      if (props.series === props.name) return "selectedBtn";
    } else {
      if (props.level.label === props.levelConf.label) {
        return `selectedBtn ${props.name.toLowerCase()}Btn`;
      } else return `${props.name.toLowerCase()}Btn`;
    }
    return "";
  };

  const formatName = (name: string): string => {
    return name
      .replace(/%20/gi, " ")
      .split(" ")
      .map((word) => {
        return word[0].toUpperCase() + word.slice(1);
      })
      .join(" ");
  };

  return (
    <button
      type='button'
      name={`${formatName(props.name)} game`}
      className={assignClasses()}
      onClick={() => {
        set();
        props.shuffle(props.series, props.level);
      }}
    >
      {formatName(props.name)}
    </button>
  );
}
