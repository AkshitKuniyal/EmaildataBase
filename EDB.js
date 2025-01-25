const scriptURL = 'https://script.google.com/macros/s/AKfycbzFcQh_BgZ9HuzhX8O17WVSXrljmJvcVnZdO8UeQqEWVzJh7EE_mjdDX9KcPnTiYxTi/exec';
const form = document.forms['submit-to-google-sheet'];
const Feedback = document.getElementById("Feedback");
const field = document.getElementById("Email");
const Btn = document.getElementById("Submit");
const txt = document.getElementById("t1");
const txt1 = document.getElementById("t2");
const name=document.getElementById("name")

form.addEventListener('submit', e => {
    e.preventDefault();
    
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            console.log("Form submitted successfully");
            Feedback.textContent = "Registration Successful.";
            Feedback.style.display = "inline"; 
            field.style.display="none";
            Btn.style.display="none";
            name.style.display="none";
            txt.textContent="";
            txt1.textContent="Thank You";
            txt1.style.color="rgba(255, 255, 255, 0.7)";

        })
        .catch(error => {
            console.log("Error occurred:", error.message);
            Feedback.textContent = "Sorry, there was an error. Please try again later."; // Error message
            Feedback.style.display = "inline"; // Ensure span is visible
            txt.textContent="";
        });
});
function doPost(e) {
    // Parse the form data
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1"); // Change 'Sheet1' to your sheet's name
    var data = e.parameter; // Access the form data
    sheet.appendRow([data.Name, data.Email]); // Ensure column headers are in the same order
    return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
  }
  