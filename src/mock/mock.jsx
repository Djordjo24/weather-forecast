export const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const initialDaysData = Array(5)
  .fill()
  .map(() => ({
    temps: [],
    icon: null,
  }));
