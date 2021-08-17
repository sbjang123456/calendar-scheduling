const app = require('./app');
const http = require('http');
const logger = require('./config/winston')('server');
const { sequelize } = require('./sequelize');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const config = yaml.load(
    fs.readFileSync(path.join(__dirname, "config", "config.yaml"), 'utf8')
)[process.env.NODE_ENV || "development"];

const PORT = config.comm.nodePort || 8080;

const assertDatabaseConnectionOK = async () => {
    logger.info(`Checking database connection...`);
    try {
        try {
            await sequelize.authenticate();
            await sequelize.sync({ force: false });
            logger.info('✓ DB connection success.');
            logger.info('  Press CTRL-C to stop\n');
        } catch (e) {
            logger.error('✗ DB connection error. Please make sure DB is running.');
            logger.error(e.message);
            process.exit();
        }
        logger.info('Database connection OK!');
    } catch (err) {
        logger.error('Unable to connect to the database:');
        logger.error(err.message);
        process.exit(1);
    }
};

(async () => {
    await assertDatabaseConnectionOK();

    const httpServer = http.createServer(app);
    httpServer.listen(PORT, (err) => {
        if (err) {
            logger.error(`Express Server has failed on port: ${PORT}`);
            throw err;
        }
        logger.info(`Express server has started on port ${PORT}`);
    });
})();

