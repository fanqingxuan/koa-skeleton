const { accessLogger } = require("../global/logger");

module.exports = async function(ctx,next) {
    let request = {
        method: ctx.request.method,
        url: ctx.url,
        get: ctx.request.query,
        ip: ctx.request.ip,
        post: ctx.request.body,
    };
    accessLogger.info("request",request);
    await next();
    accessLogger.info("response",ctx.response.body);
}