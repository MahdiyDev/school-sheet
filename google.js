const { google } = require("googleapis");

const spreadsheetId = "1Xw9MXMkD0gMfCuh71ivT2tq15EpLkC5jqPqru2RpIeY";

const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

async function getSheetData() {
  const client = await auth.getClient();

  const googleSheets = google.sheets({ version: "v4", auth: client });

  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "students",
  });

  return getRows.data;
}

getSheetData().then((data) => console.log(data));
