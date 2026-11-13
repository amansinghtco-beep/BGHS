/**
 * =========================================================================
 * BALDWIN GIRLS' HIGH SCHOOL — DYNAMIC GOOGLE SHEETS FORM HANDLER
 * =========================================================================
 *
 * This Apps Script endpoint receives submissions from all website forms:
 *   1. Home Page Enquiry Form
 *   2. Admissions Page Enquiry Form
 *   3. Contact Page Enquiry Form
 *   4. Popup Admissions Enquiry Modal
 *
 * KEY CAPABILITY:
 *   - Automatically detects all keys sent in the submission payload.
 *   - Dynamically adds any missing columns to Row 1 of your Google Sheet.
 *   - Formats headers automatically (bold text, BGHS navy background).
 *   - Concurrency-safe using Google Apps Script LockService.
 *
 * -------------------------------------------------------------------------
 * HOW TO DEPLOY:
 * -------------------------------------------------------------------------
 * 1. Open Google Sheets (create a new blank spreadsheet, e.g., "BGHS Website Enquiries").
 * 2. In Google Sheets menu, click: Extensions > Apps Script.
 * 3. Delete any code in Code.gs, paste this entire file, and click Save (💾).
 * 4. Click the blue "Deploy" button at top-right > "New deployment".
 * 5. Click the gear icon next to "Select type" and choose "Web app".
 * 6. Set:
 *      - Description: "BGHS Form Submissions"
 *      - Execute as: "Me" (your Google account)
 *      - Who has access: "Anyone" (crucial for web forms)
 * 7. Click "Deploy". Authorize permissions when prompted by Google.
 * 8. Copy the "Web app URL" (looks like https://script.google.com/macros/s/.../exec).
 * 9. Paste this URL into `src/app/googleSheetsConfig.ts` or in your `.env` file as:
 *      VITE_GOOGLE_SHEETS_WEBAPP_URL=https://script.google.com/macros/s/.../exec
 * =========================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    // Wait up to 30 seconds for any other simultaneous submission to finish
    lock.waitLock(30000);

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse the incoming JSON payload from website
    var contents = e.postData.contents;
    var data = JSON.parse(contents);

    // 1. Read existing headers from Row 1
    var lastCol = sheet.getLastColumn();
    var existingHeaders = [];
    if (lastCol > 0) {
      existingHeaders = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    }

    // 2. Identify all keys sent in this submission
    var keysInData = Object.keys(data);

    // Filter out keys that don't already exist in the sheet headers
    var newColumnsToAdd = [];
    for (var i = 0; i < keysInData.length; i++) {
      var key = keysInData[i];
      if (existingHeaders.indexOf(key) === -1) {
        newColumnsToAdd.push(key);
      }
    }

    // 3. Dynamically append any new columns to Row 1
    if (newColumnsToAdd.length > 0) {
      var startCol = existingHeaders.length + 1;
      var newHeadersRange = sheet.getRange(1, startCol, 1, newColumnsToAdd.length);
      newHeadersRange.setValues([newColumnsToAdd]);

      // Style header columns with polished styling
      newHeadersRange.setFontWeight("bold");
      newHeadersRange.setBackground("#0A1628"); // BGHS Navy
      newHeadersRange.setFontColor("#FFFFFF");
      newHeadersRange.setHorizontalAlignment("center");

      // Update existingHeaders array
      existingHeaders = existingHeaders.concat(newColumnsToAdd);
    }

    // Freeze header row and style row 1 if first row
    if (sheet.getFrozenRows() === 0) {
      sheet.setFrozenRows(1);
    }

    // 4. Map the submitted data into the exact column positions
    var rowValues = existingHeaders.map(function (header) {
      var value = data[header];
      if (value === undefined || value === null) {
        return "";
      }
      if (typeof value === "object") {
        return JSON.stringify(value);
      }
      return value;
    });

    // 5. Append the data row to the sheet
    sheet.appendRow(rowValues);

    // Format alternate row colors & alignment
    var newRowIndex = sheet.getLastRow();
    var rowRange = sheet.getRange(newRowIndex, 1, 1, existingHeaders.length);
    rowRange.setVerticalAlignment("middle");
    if (newRowIndex % 2 === 0) {
      rowRange.setBackground("#F8FAFC");
    }

    // Auto-resize columns during initial submissions for readability
    if (newRowIndex <= 25) {
      for (var c = 1; c <= existingHeaders.length; c++) {
        sheet.autoResizeColumn(c);
      }
    }

    lock.releaseLock();

    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
        message: "Enquiry recorded successfully.",
        row: newRowIndex,
        formName: data.formName || "Unknown Form",
      })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    if (lock) {
      try {
        lock.releaseLock();
      } catch (e) {}
    }

    return ContentService.createTextOutput(
      JSON.stringify({
        status: "error",
        error: err.toString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: "online",
      service: "Baldwin Girls' High School Form Endpoint",
      timestamp: new Date().toISOString(),
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

