import "../scss/main.scss";

const buttonSave = document.getElementById("buttonDownload");
const fileInput = document.getElementById("file");
const editableDiv = document.querySelector(".main__content");
const buttons = document.querySelectorAll(".toolbar-list__button");
const input = document.querySelector(".toolbar-list__input");
const select = document.querySelectorAll(".toolbar-list__select");
fileInput.addEventListener("change", () => {
  importText();
});

buttonSave.addEventListener("click", () => {
  download();
});

function download() {
  if (!editableDiv.innerHTML) return;
  const obj = { text: editableDiv.innerHTML };
  const link = document.createElement("a");
  const prompt = window.prompt(`
  You are about to download your document.
  Name your .json file (default is 'text').
  `);
  const file = new Blob([JSON.stringify(obj)], {
    type: "application/json",
  });
  link.href = URL.createObjectURL(file);
  if (prompt) link.download = `${prompt}.json`;
  else if (prompt === "") link.download = "text.json";
  else if (prompt === null) return;
  link.click();
}

function importText() {
  const file = document.getElementById("file").files[0];
  const fileReader = new FileReader();
  fileReader.onload = (e) => {
    const content = JSON.parse(e.target.result);

    editableDiv.innerHTML = content[Object.keys(content)[0]];
  };
  file && fileReader.readAsText(file, "UTF-8");
}

for (let button of buttons) {
  button.addEventListener("mousedown", (e) => {
    e.preventDefault();
    const dataCommand = button.dataset["command"];
    if (dataCommand === "createLink") {
      const prompt = window.prompt("Provide valid URL");
      return document.execCommand(dataCommand, true, prompt);
    }
    document.execCommand(dataCommand, true, null);
  });
}

input.addEventListener("input", (e) => {
  e.preventDefault();
  const dataCommand = input.dataset["command"];
  document.execCommand(dataCommand, true, input.value);
});
input.addEventListener("change", (e) => {
  e.preventDefault();
  editableDiv.focus();
});

for (let item of select) {
  item.addEventListener("change", (e) => {
    e.preventDefault();
    console.log("changed");
    const dataCommand = item.dataset["command"];
    document.execCommand(dataCommand, true, item.value);
    editableDiv.focus();
  });
}
