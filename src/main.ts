import * as express from "express";

import { Config } from "./config";
import { createSheetData, getSheetData } from "./utils/google";
import { Logger } from "./utils/logger";
import { run } from "./utils/message_queue";

export interface RequestMessage {
	sheet: string;
	data: Array<Array<string>>;
}

const app = express();

app.use(express.json());

app.get("/", function (req, res) {
	const logger = Logger(req.url);

	logger.info(`[${req.method}]: client connected`);

	// void createSheetData([[26, "a", "b", "d"]]);

	// void getSheetData().then((data) => {
	// 	res.send(data);
	// });

	// void run();

	logger.info(`[${req.method}]: client disconnected`);

	res.end();
});

app.post("/sheet", function (req, res) {
	const logger = Logger(req.url);

	const sheetRequestBody = req.body as RequestMessage;

	const sheetResponseBody = {};

	for (let i = 0; i < sheetRequestBody.data[0].length; i++) {
		sheetResponseBody[sheetRequestBody.data[0][i]] = sheetRequestBody.data[1][i];
	}

	logger.info(sheetResponseBody);

	res.send("Hello World");
});

app.listen(Config.PORT, () => {
	const logger = Logger("SERVER");
	logger.info(`Listening on http://localhost:${Config.PORT}`);
});
