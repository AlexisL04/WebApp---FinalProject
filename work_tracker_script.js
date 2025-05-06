let btnAdd = document.querySelector("button");
let table = document.querySelector("table");

let titleInput = document.querySelector("#title");
let dateInput = document.querySelector("#date");
let startTimeInput = document.querySelector("#startTime");
let endTimeInput = document.querySelector("#endTime");
let hoursWorkedInput = document.querySelector("#hoursWorked");
let notesInput = document.querySelector("#notes");
let currentID = 1;

btnAdd.addEventListener("click", () => {
  let title = titleInput.value;
  let date = dateInput.value;
  let startTime = startTimeInput.value;
  let endTime = endTimeInput.value;
  let hoursWorked = hoursWorkedInput.value;

  let rawNotes = notesInput.value.trim();
  let notes;

  if (rawNotes === "") {
    notes = "";
  } else {
    // Escapes internal quote
    notes = `"${rawNotes.replace(/"/g, '""')}"`;
  }

  const inputs = [
    titleInput,
    dateInput,
    startTimeInput,
    endTimeInput,
    hoursWorkedInput,
  ];

  // Check if Valid
  for (let input of inputs) {
    if (!input.checkValidity()) {
      input.reportValidity();
      return;
    }
  }

  let template = `   <tr data-id="${currentID}">
                    <td>${currentID}</td>
                    <td>${title}</td>
                    <td>${date}</td>
                    <td>${startTime}</td>
                    <td>${endTime}</td>
                    <td>${hoursWorked}</td>
                    <td>${notes}</td>
                </tr>
                `;

  currentID++;
  table.innerHTML += template;
});

// Delete Row by ID
function deleteRowById() {
  const idPrompt = prompt("Enter the row's ID you wish to have deleted:");
  if (idPrompt) {
    const row = table.querySelector(`tr[data-id="${idPrompt}"]`);
    if (row) {
      row.remove();
    } else {
      alert("No row found with that ID!");
    }
  }
}

// Transfer CSV File as a HTML Table (Using PapaParse)
const fileInput = document.getElementById("fileInput");

fileInput.addEventListener("change", (event) => {
  const csv = event.target.files[0];

  if (csv) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const csvData = e.target.result;
      const parsed = Papa.parse(csvData, { header: false });
      const rows = parsed.data;

      let tableHTML = "<tr>";
      rows[0].forEach((header) => {
        tableHTML += `<th>${header}</th>`;
      });
      tableHTML += "</tr>";

      for (let row = 1; row < rows.length; row++) {
        const id = rows[row][0];
        tableHTML += `<tr data-id="${id}">`;
        rows[row].forEach((block) => {
          tableHTML += `<td>${block}</td>`;
        });
        tableHTML += "</tr>";
      }
      table.innerHTML = tableHTML;

      // Updates the currentID to ensure correct ID scheme
      const checkRows = table.querySelectorAll("tr[data-id]");
      let highestID = 0;

      checkRows.forEach((row) => {
        const id = parseInt(row.getAttribute("data-id"));
        if (!isNaN(id) && id > highestID) {
          highestID = id;
        }
      });
      currentID = highestID + 1;
    };
    reader.readAsText(csv);
  }
});

// If there is content in the table, ask user if they wish to reload page
window.onbeforeunload = function () {
  const table = document.querySelector("table");
  // Counts all rows in the table
  const rowCounter = table?.rows.length || 0;

  // If User added a row
  if (rowCounter > 1) {
    return "Are you sure you wish to reload the page?";
  }

  // No alert if empty
  return null;
};

// For customization, need to display file's name correctly
const input = document.getElementById("fileInput");
const fileName = document.getElementById("fileName");

input.addEventListener("change", function () {
  if (input.files.length > 0) {
    fileName.textContent = input.files[0].name;
  } else {
    fileName.textContent = "No file chosen";
  }
});
