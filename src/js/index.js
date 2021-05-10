import "../scss/main.scss";

const buttonSave = document.getElementById("buttonDownload");
const fileInput = document.getElementById("file");
const editableDiv = document.querySelector(".content__text");
const buttons = document.querySelectorAll(".toolbar-list__button");
const input = document.querySelector(".toolbar-list__input");
const select = document.querySelectorAll(".toolbar-list__select");
const storage = document.getElementById("storage");
const newpage = document.getElementById("new-page");
window.onload = () => {
  if (localStorage.getItem("text"))
    editableDiv.innerHTML = JSON.parse(localStorage.getItem("text"));
  editableDiv.focus();
};

newpage.addEventListener("click", () => {
  editableDiv.innerHTML = "";
  localStorage.removeItem("text");
});
storage.addEventListener("click", () => {
  localStorage.setItem("text", JSON.stringify(editableDiv.innerHTML));
  alert(
    "Saved! Your current session will be available next time you open this site."
  );
});

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
  Name your file (default is 'text').
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
    if (!dataCommand) return;
    if (dataCommand === "createLink") {
      const prompt = window.prompt("Provide valid URL");
      return document.execCommand(dataCommand, false, prompt);
    }
    document.execCommand(dataCommand, false, null);
  });
}

input.addEventListener("input", (e) => {
  e.preventDefault();
  const dataCommand = input.dataset["command"];
  document.execCommand(dataCommand, false, input.value);
});
input.addEventListener("change", (e) => {
  e.preventDefault();
  editableDiv.focus();
});

for (let item of select) {
  item.addEventListener("change", (e) => {
    e.preventDefault();
    const dataCommand = item.dataset["command"];
    document.execCommand(dataCommand, false, item.value);
    editableDiv.focus();
  });
}
