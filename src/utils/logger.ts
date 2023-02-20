import { createLogger, format, transports } from "winston";

export function Logger(label: string) {
	const { combine, label: _label, timestamp } = format;

	return createLogger({
		format: combine(
			_label({ label }),
			timestamp({ format: new Date().toISOString() }),
			format.json(),
		),
		transports: [new transports.Console({ level: "debug" })],
	});
}
