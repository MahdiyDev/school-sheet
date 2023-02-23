"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSheetData = exports.createSheetData = void 0;
const googleapis_1 = require("googleapis");
const spreadsheetId = "1Xw9MXMkD0gMfCuh71ivT2tq15EpLkC5jqPqru2RpIeY";
async function getSheets() {
    const auth = new googleapis_1.google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    const client = await auth.getClient();
    return { googleSheets: googleapis_1.google.sheets({ version: "v4", auth: client }), auth };
}
async function createSheetData(values) {
    const { googleSheets, auth } = await getSheets();
    void googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        valueInputOption: "RAW",
        range: "students!A1",
        requestBody: { values },
    });
}
exports.createSheetData = createSheetData;
async function getSheetData() {
    const { googleSheets, auth } = await getSheets();
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "students",
    });
    return getRows.data;
}
exports.getSheetData = getSheetData;
//# sourceMappingURL=google.js.map