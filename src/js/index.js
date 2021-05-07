import "../scss/main.scss";

const buttonImport = document.getElementById("buttonImport");
const buttonSave = document.getElementById("buttonSave");
buttonImport.addEventListener("click", () => {
  importText();
});

buttonImport.addEventListener("click", () => {
  importText();
});

function importText() {
  const file = document.getElementById("file").files[0];
  const fileReader = new FileReader();
  fileReader.onload = (e) => {
    const loadedText = JSON.parse(e.target.result);

    document.querySelector(".editor--js").value = loadedText.text;
  };

  fileReader.readAsText(file, "UTF-8");
}
