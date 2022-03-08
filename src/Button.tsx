import "./Button.scss";

interface Props {
  name: string;
  label: string;
  classes: string;
  callback: () => void;
}

export default function Button(props: Props) {
  return (
    <button
      type='button'
      name={props.name}
      onClick={props.callback}
      className={props.classes}
    >
      {props.label}
    </button>
  );
}
