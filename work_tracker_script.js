let btnAdd = document.querySelector("button");
let table = document.querySelector("table");

let titleInput = document.querySelector("#title");
let startTimeInput = document.querySelector("#startTime");
let endTimeInput = document.querySelector("#endTime");
let hoursWorkedInput = document.querySelector("#hoursWorked");
let notesInput = document.querySelector("#notes");

btnAdd.addEventListener("click", () => {
  let title = titleInput.value;
  let startTime = startTimeInput.value;
  let endTime = endTimeInput.value;
  let hoursWorked = hoursWorkedInput.value;
  let notes = notesInput.value;

  let template = `   <tr>
                    <td>${title}</td>
                    <td>${startTime}</td>
                    <td>${endTime}</td>
                    <td>${hoursWorked}</td>
                    <td>${notes}</td>
                </tr>
                `;

  table.innerHTML += template;
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
