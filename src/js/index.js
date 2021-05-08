import "../scss/main.scss";

const buttonImport = document.getElementById("buttonImport");
const buttonSave = document.getElementById("buttonSave");
const textArea = document.querySelector(".editor--js");
buttonImport.addEventListener("click", () => {
  importText();
});

buttonSave.addEventListener("click", () => {
  download();
});

function download() {
  if (!textArea.value) return;
  const obj = { text: textArea.value };
  const link = document.createElement("a");
  const prompt = window.prompt(
    "Name your file before downloading.(Default is 'text')"
  );
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

    textArea.value = content[Object.keys(content)[0]];
  };
  file && fileReader.readAsText(file, "UTF-8");
}
