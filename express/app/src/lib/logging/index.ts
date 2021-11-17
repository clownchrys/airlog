import {createLogger, format, transports, info} from "winston";
import winstonDaily from "winston-daily-rotate-file";
import moment from "moment-timezone";
import fs from "fs";
import path from "path";

// RFC5424 Log levels
enum Levels {
    error = 0,
    warn = 1,
    info = 2,
    http = 3,
    verbose = 4,
    debug = 5,
    silly = 6
}

// Timezone
moment.tz.setDefault(process.env.TZ);
const timestamp = () => moment().format("YYYY-MM-DD HH:mm:ss");

// Format
const loggingFormat = format.printf(({ level, message}) => {
    return `${timestamp()} : ${level.toUpperCase()} : ${message}`;
});

// File System
const logDir = path.join(__dirname, "logs");
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

// Transports
const dailyRotateFileTransport = new winstonDaily({
    filename: path.join(logDir, "log_%DATE%.log"),
    datePattern: "YYYY-MM-DD-HH",
    zippedArchive: true,
    maxFiles: "14d"
});
const infoTransport = new transports.Console({level: "info"});
const errorTransport = new transports.Console({level: "error"});

// Logger
const logger = createLogger({
    format: format.combine(loggingFormat),
    transports: [infoTransport, dailyRotateFileTransport]
})

// Stream
const stream = {
    write: message => logger.info(message.trim())
};

export { logger, stream };