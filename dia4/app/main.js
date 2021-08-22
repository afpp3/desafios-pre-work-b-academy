import "./style.css";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const form = $('[data-js="cars-form"]');
const table = $('[data-js="cars-table"]');

const baseURL = "http://localhost:3333";

const getFormElement = (event) => (elementName) => {
  return event.target.elements[elementName];
};

const createElementByType = {
  createImage(data) {
    const td = document.createElement("td");
    const img = document.createElement("img");
    img.src = data.src;
    img.alt = data.alt;
    img.width = 200;
    td.appendChild(img);
    return td;
  },

  createText(value) {
    const td = document.createElement("td");
    td.textContent = value;
    return td;
  },

  createColor(value) {
    const td = document.createElement("td");
    const div = document.createElement("div");
    div.style.height = "100px";
    div.style.width = "100px";
    div.style.background = value;
    td.appendChild(div);
    return td;
  },
};

const elementsTypes = {
  image: createElementByType.createImage,
  text: createElementByType.createText,
  color: createElementByType.createColor,
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const getElement = getFormElement(e);

  const data = {
    image: getElement("image").value,
    brandModel: getElement("brand-model").value,
    year: getElement("year").value,
    plate: getElement("plate").value,
    color: getElement("color").value,
  };

  createTableRow(data);

  e.target.reset();
  image.focus();
});

function createTableRow(data) {
  const elements = [
    { type: "image", value: { src: data.image, alt: data.brandModel } },
    { type: "text", value: data.brandModel },
    { type: "text", value: data.year },
    { type: "text", value: data.plate },
    { type: "color", value: data.color },
  ];

  const tr = document.createElement("tr");

  elements.forEach((element) => {
    const td = elementsTypes[element.type](element.value);
    tr.appendChild(td);
  });

  table.appendChild(tr);
}

function createNoCarRow() {
  const tr = document.createElement("tr");
  const td = document.createElement("td");
  const thsLength = $$("table th").length;
  td.setAttribute("colspan", thsLength);
  td.textContent = "Nenhum carro encontrado";

  tr.appendChild(td);
  table.appendChild(tr);
}

const main = async () => {
  const result = await fetch(`${baseURL}/cars`)
    .then((r) => r.json())
    .catch((e) => ({ error: true, message: e.message }));

  if (result.error) {
    console.log("Erro ao buscar carros", result.message);
    return;
  }

  const noCars = result.length === 0;

  if (noCars) {
    createNoCarRow();
    return;
  }

  result.forEach(createTableRow);
};

main();
