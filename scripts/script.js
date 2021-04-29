// function for reading file
const readFile = (file, callBack) => {
    if (!file || !file.type.startsWith("text/cal")) return console.log("Specify file");

    const reader = new FileReader(); // reader
    reader.readAsText(file);
    reader.addEventListener("load", () => {
        callBack(reader.result); // do callBack with text result
    });
};

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
    const rawLines = text.split(/\r/);

    const infoLines = [];
    rawLines.forEach((line) => {
        if (line.includes("DTSTART") || line.includes("SUMMARY")) infoLines.push(line);
    });

    const linesPerEvent = 2;

    const rawBirthdays = infoLines.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / linesPerEvent);

        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = []; // start a new chunk
        }

        resultArray[chunkIndex].push(item);

        return resultArray;
    }, []);

    const cleanBirthdays = rawBirthdays.map((e) => {
        return {
            date: cleanDate(e[0], "dm"),
            summary: cleanSummary(e[1])
        };
    });

    drawCalendar(cleanBirthdays);
};

// clean up date format
const cleanDate = (rawDate, type) => {
    const month = rawDate.slice(-4, -2);
    const day = rawDate.slice(-2);
    return type === "dm" ? `${day}/${month}` : `${month}/${day}`;
};

// get first and last name
const cleanSummary = rawSummary => rawSummary.slice(8, -11);

const drawCalendar = (birthdays) => {
    console.log(birthdays);
};


