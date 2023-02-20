import { google } from "googleapis";

const spreadsheetId = "1Xw9MXMkD0gMfCuh71ivT2tq15EpLkC5jqPqru2RpIeY";

async function getSheets() {
	const auth = new google.auth.GoogleAuth({
		keyFile: "credentials.json",
		scopes: "https://www.googleapis.com/auth/spreadsheets",
	});

	const client = await auth.getClient();

	return { googleSheets: google.sheets({ version: "v4", auth: client }), auth };
}

export async function createSheetData<T extends Array<Array<unknown>>>(values: T) {
	const { googleSheets, auth } = await getSheets();

	void googleSheets.spreadsheets.values.append({
		auth,
		spreadsheetId,
		valueInputOption: "RAW",
		range: "students!A1",
		requestBody: { values },
	});
}

export async function getSheetData() {
	const { googleSheets, auth } = await getSheets();

	const getRows = await googleSheets.spreadsheets.values.get({
		auth,
		spreadsheetId,
		range: "students",
	});

	return getRows.data;
}
