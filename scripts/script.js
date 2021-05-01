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


const setTableDisplay = (show) => {
    const divTableRows = document.getElementById("div-table-birthdays");
    show ? divTableRows.style.display = "block" : divTableRows.style.display = "none";
}

setTableDisplay(false);

let birthdaysOutside = [];

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
            date: cleanDate(e[0]),
            name: cleanName(e[1])
        };
    });

    const birthdaysByDate = cleanBirthdays.sort((a, b) => {
        return a.date.month.localeCompare(b.date.month) || a.date.day - b.date.day;
    });

    birthdaysOutside = birthdaysByDate;

    setTableDisplay(true);
    showBirthdays(birthdaysByDate);

    drawCalendar(birthdaysByDate);
};

const showBirthdays = (birthdays) => {
    const tbodyBirthdays = document.getElementById("tbody-birthdays");

    birthdays.forEach((b) => {
        const row = document.createElement("tr");
        const nameCol = document.createElement("td");
        const dateCol = document.createElement("td");
        const optionCol = document.createElement("td");

        const name = document.createTextNode(b.name);
        const date = document.createTextNode(`${b.date.day.replace(/^0+/, "")} ${b.date.monthLong}`);

        const toggleIncludeParent = document.createElement("div");
        toggleIncludeParent.className = "form-check form-switch";

        const toggleIncludeSwitch = document.createElement("input");
        toggleIncludeSwitch.className = "form-check-input";
        toggleIncludeSwitch.type = "checkbox";
        toggleIncludeSwitch.checked = true;

        nameCol.appendChild(name);
        dateCol.appendChild(date);

        toggleIncludeParent.appendChild(toggleIncludeSwitch);
        optionCol.appendChild(toggleIncludeParent);

        row.appendChild(nameCol);
        row.appendChild(dateCol);
        row.appendChild(optionCol);

        tbodyBirthdays.appendChild(row);
    });
}

// clean up date format
const cleanDate = (rawDate) => {
    const month = rawDate.slice(-4, -2);
    const day = rawDate.slice(-2);

    return {
        month: month,
        day: day,
        monthLong: getMonths(month)
    }
};

const getMonths = (monthNum) => {
    if (!monthNum) return console.log("Specify month");
    if (monthNum < 1 || monthNum > 12) return console.log("Specify valid month");

    const months = [
        "January", "February", "March",
        "April", "May", "June",
        "July", "August", "September",
        "October", "November", "December"
    ];

    return months[monthNum - 1];
}

// get first and last name
const cleanName = rawSummary => rawSummary.slice(8, -11);

const drawCalendar = (birthdays) => {
    console.log(birthdays);
};


