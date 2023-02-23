"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const winston_1 = require("winston");
function Logger(label) {
    const { combine, label: _label, timestamp } = winston_1.format;
    return (0, winston_1.createLogger)({
        format: combine(_label({ label }), timestamp({ format: new Date().toISOString() }), winston_1.format.json()),
        transports: [new winston_1.transports.Console({ level: "debug" })],
    });
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map