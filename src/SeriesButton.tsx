import Button from "./Button";
import { LevelType } from "./LevelType";

interface Props {
  setting: string;
  series: string;
  level: LevelType;
  setSeries: (_: string) => void;
  shuffle: (series: string, level: LevelType) => Promise<void>;
}

export default function SeriesButton(props: Props) {
  // functions
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
    <Button
      name={`${formatName(props.setting)} game`}
      classes={props.series === props.setting ? "selectedBtn" : ""}
      callback={() => {
        props.setSeries(props.setting);
        props.shuffle(props.series, props.level);
      }}
      label={formatName(props.setting)}
    />
  );
}
