export const complexItemToStr = (key, dates) => {
  let toReturn = "" + key;
  let start = dates[0];
  let end = dates[1];
  let month = start.getMonth() + 1;
  let year = start.getYear() + 1900;

  toReturn += (month < 10 ? "\nod: 0" : "\nod: ") + month + "/" + year;

  if (end === undefined) {
    toReturn += "\ndo: teraz";
  } else {
    month = end.getMonth() + 1;
    year = end.getYear() + 1900;
    toReturn += (month < 10 ? "\ndo: 0" : "\ndo: ") + month + "/" + year;
  }
  toReturn += " (" + dates[2] + ")";
  return toReturn;
};
