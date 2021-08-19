const masks = {
  nome(value) {
    return value
      .toLowerCase()
      .replace(/(?:^|\s)\S/g, (upper) => upper.toUpperCase());
  },
};

const nameInput = document.querySelector("[data-js='inputName']");

nameInput.addEventListener(
  "input",
  (e) => {
    e.target.value = masks.nome(e.target.value);
  },
  false
);
