const prepositions = ["da", "das", "de", "do", "dos"];
const masks = {
  nome(value) {
    return value
      .toLowerCase()
      .replace(/(?:^|\s)\S/g, (word) => word.toUpperCase());
  },
};

const $ = (selector) => document.querySelector(selector);

const nameInput = $("[data-js='inputName']");

nameInput.addEventListener("input", (e) => {
  const wordsAsArray = e.target.value.split(" ");
  e.target.value = wordsAsArray
    .map((word) => verifyPreposition(word))
    .join(" ");
});

const verifyPreposition = (word) => {
  return prepositions.includes(word.toLowerCase())
    ? word.toLowerCase()
    : masks.nome(word);
};
