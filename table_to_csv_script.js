// Converting a table's data into comma-separated values
function tableToCSV() {
  // Store the final CSV Data
  let csvInfo = [];

  // Grabs each row of data
  let rows = document.getElementsByTagName("tr");
  for (let tableRow = 0; tableRow < rows.length; tableRow++) {
    // Grab each column's data
    let cols = rows[tableRow].querySelectorAll("td, th");
    // Store each row
    let csvRows = [];
    for (let csvRow = 0; csvRow < cols.length; csvRow++) {
      // Get text data of each cell of a row and push it to csv_rows
      csvRows.push(cols[csvRow].innerHTML);
    }
    // Combine each column's value with a comma
    csvInfo.push(csvRows.join(","));
  }
  // Combine each row of data with a new line character
  csvInfo = csvInfo.join("\n");

  // Ask user to name the file ()
  let fileName = prompt("Enter a Name for your File: ");

  // Calls the download csv function
  downloadCSVFile(csvInfo, fileName);
}

// Allow user to download the data as a CSV file
function downloadCSVFile(csvInfo, fileName) {
  // Create a new CSV file object to push the csv_info into
  csvFile = new Blob([csvInfo], { type: "text/csv" });

  // Create a temporary link to initiate the downloading process
  let tempLink = document.createElement("a");

  // Downloading csv file
  tempLink.download = fileName + ".csv";
  let url = window.URL.createObjectURL(csvFile);
  tempLink.href = url;

  // Hidden link
  tempLink.style.display = "none";
  document.body.appendChild(tempLink);

  // Clicking the link will trigger the download
  tempLink.click();
  document.body.removeChild(tempLink);
}
