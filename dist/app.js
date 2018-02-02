"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
require("reflect-metadata");
const restify = require("restify");
const config_1 = require("./config/config");
const logger_1 = require("./service/logger");
const Database_1 = require("./model/Database");
const UserAuthFilter_1 = require("./filter/UserAuthFilter");
exports.api = restify.createServer({ name: config_1.default.name });
let authFilter = new UserAuthFilter_1.default();
Database_1.Database.getInstance(); // initialize database instance
exports.api.pre(restify.pre.sanitizePath());
exports.api.use(restify.plugins.acceptParser(exports.api.acceptable));
exports.api.use(restify.plugins.bodyParser());
exports.api.use(restify.plugins.queryParser());
exports.api.use(restify.plugins.fullResponse());
exports.api.use(authFilter.authenticateUser);
fs.readdirSync(__dirname + '/route').forEach((routeFile) => {
    if (routeFile.substr(-3) === '.js') {
        const routes = require(__dirname + '/route/' + routeFile).routes;
        routes.initialize(exports.api);
    }
});
exports.api.listen(config_1.default.port, () => {
    logger_1.logger.info(`INFO: ${config_1.default.name} is running at ${exports.api.url}`);
});
exports.api.on('uncaughtException', (req, res, route, err) => {
    console.error('error = ', err);
});
exports.api.on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
});
//# sourceMappingURL=app.js.map