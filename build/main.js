"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const config_1 = require("./config");
const logger_1 = require("./utils/logger");
const app = express();
app.use(express.json());
app.get("/", function (req, res) {
    const logger = (0, logger_1.Logger)(req.url);
    logger.info(`[${req.method}]: client connected`);
    logger.info(`[${req.method}]: client disconnected`);
    res.end();
});
app.post("/sheet", function (req, res) {
    const logger = (0, logger_1.Logger)(req.url);
    const sheetRequestBody = req.body;
    const sheetResponseBody = {};
    for (let i = 0; i < sheetRequestBody.data[0].length; i++) {
        sheetResponseBody[sheetRequestBody.data[0][i]] = sheetRequestBody.data[1][i];
    }
    logger.info(sheetResponseBody);
    res.send("Hello World");
});
app.listen(config_1.Config.PORT, () => {
    const logger = (0, logger_1.Logger)("SERVER");
    logger.info(`Listening on http://localhost:${config_1.Config.PORT}`);
});
//# sourceMappingURL=main.js.map