export function convertKelvin(kelvin) {
  return kelvin - 273.15;
}

export function setDate(date, addDays = 0) {
  date.setDate(date.getDate() + addDays);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;
}

export function setWeekday(date, addDays) {
  date.setDate(date.getDate() + addDays);
  return date.getDay();
}

export const minTemp = (arr) =>
  Math.round(convertKelvin(arr.sort((a, b) => a - b)[0]));

export const maxTemp = (arr) =>
  Math.round(convertKelvin(arr.sort((a, b) => b - a)[0]));

export function descriptionUppercase(description) {
  return `${description?.slice(0, 1).toUpperCase()}${description?.slice(1)}`;
}
