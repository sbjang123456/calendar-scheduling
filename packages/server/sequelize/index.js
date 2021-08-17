const { Sequelize, Op, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const yaml = require('js-yaml');
const config = yaml.load(
    fs.readFileSync(path.join(__dirname, "..", "config", "config.yaml"), 'utf8')
)[process.env.NODE_ENV || "development"];

const db = {};
const sequelize = new Sequelize(config.db);

const isDirCheck = file => fs.statSync(path.join(__dirname, file)).isDirectory();

/* sequelize model define */
fs.readdirSync(__dirname).filter((file) => {
    return (file.indexOf('.') !== 0)
        && (file !== basename)
        && (file.slice(-3) === '.js' || (isDirCheck(file)));
}).forEach((file) => {
    if (isDirCheck(file)) {
        fs.readdirSync(path.join(__dirname, file)).forEach(inFile => {
            const model = require(path.join(__dirname, file, inFile))(sequelize, DataTypes);
            db[model.name] = model;
        });
    } else {
        const model = require(path.join(__dirname, file))(sequelize, DataTypes);
        db[model.name] = model;
    }
});

Object.values(db).filter(model => model.hasOwnProperty('association'))
    .forEach(model => model['association'](db));

module.exports = {
    sequelize,
    db,
    Op,
}