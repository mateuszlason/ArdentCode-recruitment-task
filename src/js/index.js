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
  const json = { text: textArea.value };
  const a = document.createElement("a");
  const file = new Blob([JSON.stringify(json, null, 2)], {
    type: "application/json",
  });
  a.href = URL.createObjectURL(file);
  a.download = "text.json";
  a.click();
}

function importText() {
  const file = document.getElementById("file").files[0];
  const fileReader = new FileReader();
  fileReader.onload = (e) => {
    const { text } = JSON.parse(e.target.result);

    textArea.value = text;
  };

  fileReader.readAsText(file, "UTF-8");
}
