const errorHandler = require("./errorHandler");
const requestLog = require("./requestLog");
const session = require("./session");
const requestId = require("./requestId");

const bodyparser = require("koa-bodyparser");
const Koa = require("koa");

/**
 * 
 * @param {Koa} app 
 */
async function Load(app) {
    app.use(bodyparser());
    app.use(session);
    app.use(requestId);
    app.use(requestLog);
    app.use(errorHandler);
    return app;
}

module.exports = { Load };