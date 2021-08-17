const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');

const logDir = 'logs';  // logs 디렉토리 하위에 로그 파일 저장
const { combine, timestamp, printf, label } = winston.format;

const colorize = winston.format.colorize();

// Define log format
const logFormat = printf(({ level, message, label, timestamp }) => {
    return `${colorize.colorize(level, `[${timestamp}] [${level.toUpperCase()}] ${label ?? 'default'}:`)} ${message}`;
});

/**
 *
 * @param path{string}: label
 * @returns {winston.Logger}
 */
const getLogger = (path) => {
    /**
     * Log Level
     * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
     */
    const logger = winston.createLogger({
        format: combine(
            label({ label: path }),
            timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }),
            logFormat,
        ),
        transports: [
            // info 레벨 로그를 저장할 파일 설정
            new winstonDaily({
                level: 'info',
                datePattern: 'YYYY-MM-DD',
                dirname: logDir,
                filename: `%DATE%.log`,
                maxFiles: 30,  // 30일치 로그 파일 저장
                zippedArchive: true,
            }),
            // error 레벨 로그를 저장할 파일 설정
            new winstonDaily({
                level: 'error',
                datePattern: 'YYYY-MM-DD',
                dirname: logDir + '/error',  // error.log 파일은 /logs/error 하위에 저장
                filename: `%DATE%.error.log`,
                maxFiles: 30,
                zippedArchive: true,
            }),
        ],
    });

    /**
     * http log
     */
    const httpLogger = winston.createLogger({
        format: combine(
            label({ label: 'http' }),
            timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }),
            logFormat,
        ),
        transports: [
            // info 레벨 로그를 저장할 파일 설정
            new winstonDaily({
                level: 'info',
                datePattern: 'YYYY-MM-DD',
                dirname: logDir,
                filename: `%DATE%.http.log`,
                maxFiles: 30,  // 30일치 로그 파일 저장
                zippedArchive: true,
            })
        ],
    });

    logger.stream = {
        write: (message, encoding) => {
            httpLogger.info(message);
        }
    };

    // Production 환경이 아닌 경우(dev 등)
    if (process.env.NODE_ENV !== 'production') {
        logger.add(new winston.transports.Console({
            // handleExceptions: true,
            // json: false,
            format: combine(
                label({ label: path }),
                timestamp(),
                logFormat,
                // winston.format.simple(),  // `${info.level}: ${info.message} JSON.stringify({ ...rest })` 포맷으로 출력
            )
        }));
    }

    return logger;
};

module.exports = getLogger;