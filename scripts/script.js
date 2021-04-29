// function for reading file
const readFile = (file, callBack) => {
    if (!file || !file.type.startsWith("text/cal")) return console.log("Specify file");

    const reader = new FileReader(); // reader
    reader.readAsText(file);
    reader.addEventListener("load", () => {
        callBack(reader.result); // do callBack with text result
    });
}

// when file is selected
const fileSelector = document.getElementById("file-selector");
fileSelector.addEventListener("change", () => {
    const files = fileSelector.files; // get files
    if (!files.length) return console.log("No file selected");
    const file = files[0];

    // read file and convert in callBack
    readFile(file, (text) => {
        convert(text);
    });
});

// function for converting the text
const convert = (text) => {
    const t = text;
    console.log(t);
}

