import "./style.css";
import { get, post, del } from "./http.js";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const form = $('[data-js="cars-form"]');
const table = $('[data-js="cars-table"]');

const baseURL = "http://localhost:3333/cars";

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

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const getElement = getFormElement(e);

  const data = {
    image: getElement("image").value,
    brandModel: getElement("brand-model").value,
    year: getElement("year").value,
    plate: getElement("plate").value,
    color: getElement("color").value,
  };

  const result = await post(baseURL, data);
  const hasError = result.error;

  if (hasError) {
    showError(result.message);
    return;
  }

  const noContent = $('[data-js="no-content"]');
  if (noContent) {
    table.removeChild(noContent);
  }

  createTableRow(data);

  e.target.reset();
  image.focus();
});

const createTableRow = (data) => {
  const elements = [
    { type: "image", value: { src: data.image, alt: data.brandModel } },
    { type: "text", value: data.brandModel },
    { type: "text", value: data.year },
    { type: "text", value: data.plate },
    { type: "color", value: data.color },
  ];

  const tr = document.createElement("tr");
  tr.dataset.plate = data.plate;

  elements.forEach((element) => {
    const td = elementsTypes[element.type](element.value);
    tr.appendChild(td);
  });

  const button = document.createElement("button");
  button.textContent = "Excluir";
  button.dataset.plate = data.plate;

  button.addEventListener("click", handleDelete);

  tr.appendChild(button);

  table.appendChild(tr);
};

const handleDelete = async (e) => {
  const button = e.target;
  const plate = button.dataset.plate;

  const result = await del(baseURL, { plate });
  const hasError = result.error;

  if (hasError) {
    showError(result.message);
    return;
  }

  const tr = document.querySelector(`tr[data-plate="${plate}"]`);
  table.removeChild(tr);
  button.removeEventListener("click", handleDelete);

  const allTrs = table.querySelector("tr");
  if (!allTrs) {
    createNoCarRow();
  }
};

const createNoCarRow = () => {
  const tr = document.createElement("tr");
  const td = document.createElement("td");
  const thsLength = $$("table th").length;
  td.setAttribute("colspan", thsLength);
  td.textContent = "Nenhum carro encontrado";

  tr.dataset.js = "no-content";
  tr.appendChild(td);
  table.appendChild(tr);
};

const showError = (errorMessage) => {
  console.log("Erro ao cadastrar:", errorMessage);
  const error = $('[data-js="error"]');
  error.classList.remove("hide");
  error.textContent = errorMessage;
};

const main = async () => {
  const result = await get(baseURL);
  const hasError = result.error;

  if (hasError) {
    showError(result.message);
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
