import * as express from "express";

import { Config } from "./config";
import { createSheetData, getSheetData } from "./utils/google";
import { Logger } from "./utils/logger";

const app = express();

app.use(express.json());

app.get("/", function (req, res) {
	const logger = Logger(req.url);

	logger.info(`[${req.method}]: client connected`);

	void createSheetData([[26, "a", "b", "d"]]);

	void getSheetData().then((data) => {
		res.send(data);
	});

	logger.info(`[${req.method}]: client disconnected`);
});

app.post("/sheet", function (req, res) {
	const logger = Logger(req.url);

	logger.info("Hello");

	res.send("Hello World");
});

app.listen(Config.PORT, () => {
	const logger = Logger("SERVER");
	logger.info(`Listening on http://localhost:${Config.PORT}`);
});
