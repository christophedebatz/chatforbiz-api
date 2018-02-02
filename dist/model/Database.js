"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const config_1 = require("../config/config");
let instance = null;
exports.Database = {
    getInstance() {
        if (instance === null) {
            instance = typeorm_1.createConnection({
                type: 'mariadb',
                host: config_1.default.database.host,
                port: config_1.default.database.port,
                username: config_1.default.database.username,
                password: config_1.default.database.password,
                database: config_1.default.database.database,
                entities: [__dirname + '/../entity/*.js'],
                synchronize: true
            }).catch(err => {
                throw new Error('Database error:' + err);
            });
        }
        return instance;
    }
};
//# sourceMappingURL=Database.js.map