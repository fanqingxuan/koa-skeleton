const Koa = require("koa");
const home_router = require("../controller/home");

/**
 * 
 * @param {Koa} app 
 */
async function Load(app) {
    app.use(home_router.routes()).use(home_router.allowedMethods());
}

module.exports = {Load};