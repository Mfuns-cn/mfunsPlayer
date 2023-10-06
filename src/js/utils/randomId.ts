let count = 1000;
const ar = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

export function randomId() {
  const hs = [];
  const al = ar.length;
  for (let i = 0; i < 8; i++) {
    hs.push(ar[Math.floor(Math.random() * al)]);
  }
  count++;
  return hs.join("") + `${count}`;
}
