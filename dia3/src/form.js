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

const form = $("[data-js='form']");
const select = document.createElement("select");
const colors = [
  {
    cor: "vermelho",
    hex: "#DD2C00",
  },
  {
    cor: "preto",
    hex: "#000000",
  },
  {
    cor: "roxo",
    hex: "#4A148C",
  },
  {
    cor: "verde",
    hex: "#1B5E20",
  },
  {
    cor: "azul",
    hex: "#01579B",
  },
];

const colorsContainer = document.createElement("div");
colorsContainer.style.display = "flex";
colorsContainer.style.gap = "10px";

const createOption = (color) => {
  const option = document.createElement("option");
  option.value = color.hex;
  option.textContent = color.cor;
  return option;
};

colors.forEach((color) => {
  const option = createOption(color);
  select.appendChild(option);
});

const createColorsDiv = (color) => {
  const div = document.createElement("div");
  div.style.height = "50px";
  div.style.width = "50px";
  div.style.borderRadius = "50%";
  div.style.background = color;
  return div;
};

select.addEventListener("change", (e) => {
  colorsContainer.innerHTML = "";

  Array.from(e.target.selectedOptions).forEach((option) => {
    const div = createColorsDiv(option.value);
    colorsContainer.appendChild(div);
  });
});

select.setAttribute("multiple", "");
form.appendChild(select);
document.body.appendChild(colorsContainer);
