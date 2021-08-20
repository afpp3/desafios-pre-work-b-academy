const $ = (selector) => document.querySelector(selector);

const form = $('[data-js="cars-form"]');
const table = $('[data-js="cars-table"]');

const getFormElement = (event) => (elementName) => {
  return event.target.elements[elementName];
};

const createElementByType = {
  createImage(value) {
    const td = document.createElement("td");
    const img = document.createElement("img");
    img.src = value;
    img.width = 100;
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

  const elements = [
    { type: "image", value: getElement("image").value },
    { type: "text", value: getElement("marca-modelo").value },
    { type: "text", value: getElement("year").value },
    { type: "text", value: getElement("placa").value },
    { type: "color", value: getElement("color").value },
  ];

  const tr = document.createElement("tr");
  elements.forEach((element) => {
    const td = elementsTypes[element.type](element.value);
    tr.appendChild(td);
  });

  table.appendChild(tr);
  e.target.reset();
  image.focus();
});
