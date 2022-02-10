export default function Card(props) {
  const handleClick = () => {
    if (!props.disabled) {
      props.handleChoice(props.card);
    }
  };

  return (
    <div className="card">
      <div
        className={props.hidden ? "cardContainer" : "cardContainer cardHidden"}
      >
        <img
          className={props.hidden ? "image" : "image hidden"}
          src={props.card.src}
          alt="amiibo"
          onClick={handleClick}
        ></img>
      </div>
    </div>
  );
}
