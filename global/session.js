const {createNamespace,Context} = require('continuation-local-storage');
const session = createNamespace('session');

async function get(key) {
    return session.get(key);
}

async function set(key,val) {
    return session.set(key,val);
}

/**
 * 
 * @param {Context} ctx 
 */
async function start(ctx) {
    session.active = ctx;
}

module.exports = {
    get,
    set,
    start
}