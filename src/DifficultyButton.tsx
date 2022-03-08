import Button from "./Button";
import { LevelType } from "./LevelType";

interface Props {
  setting: string;
  series: string;
  level: LevelType;
  levelConf: LevelType;
  setLevel: (_: LevelType) => void;
  shuffle: (series: string, level: LevelType) => Promise<void>;
}

export default function DifficultyButton(props: Props) {
  // functions
  const assignClasses = (): string => {
    if (props.level.label === props.levelConf.label) {
      return `selectedBtn ${props.setting.toLowerCase()}Btn`;
    } else return `${props.setting.toLowerCase()}Btn`;
  };

  return (
    <Button
      name={`${props.setting} game`}
      classes={assignClasses()}
      callback={() => {
        props.setLevel(props.levelConf);
        props.shuffle(props.series, props.level);
      }}
      label={
        props.setting.charAt(0).toUpperCase() +
        props.setting.slice(1).toLowerCase()
      }
    />
  );
}
