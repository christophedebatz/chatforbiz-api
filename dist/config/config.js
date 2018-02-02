"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let env = process.env.NODE_ENV || 'development';
// default development settings
let config = {
    name: 'chatforbiz',
    version: '1.0.0',
    port: 3000,
    env: env === 'production' ? 'prod' : 'dev',
    database: {
        host: 'localhost',
        port: 3307,
        username: 'root',
        password: '',
        database: 'chatforbiz'
    }
};
// production settigns
if (config.env === 'prod') {
    config.database = {
        host: '172.18.0.2',
        port: 3306,
        username: 'root',
        password: '',
        database: 'chatforbiz'
    };
}
exports.default = config;
//# sourceMappingURL=config.js.map