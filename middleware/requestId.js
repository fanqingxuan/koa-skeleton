const Session = require('../global/session');
const { v4: uuidv4 } = require("uuid");

module.exports = async function(ctx,next) {
    let requestId = uuidv4();
    await Session.set('requestId',requestId);
    await next();
}