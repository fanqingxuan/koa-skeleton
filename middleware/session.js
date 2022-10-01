const Session = require('../global/session');

module.exports = async function(ctx,next) {
    await Session.start(ctx);
    await next();
}