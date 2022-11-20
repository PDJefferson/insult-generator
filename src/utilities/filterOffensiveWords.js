import Filter from "bad-words";
export function filterOffensiveWords(insult) {
  const filter = new Filter();
  return filter.clean(insult);
}
