import "./WeekDays.css";

export default function WeekDay({ text, src, minTemp, maxTemp }) {
  return (
    <div className="weekDay">
      <h3>{text}</h3>
      <img src={src} alt={src} />
      <p>
        {minTemp} °C / {maxTemp} °C
      </p>
    </div>
  );
}
