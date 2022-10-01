const env = require("../utils/env");

module.exports = {
    host:env('REDIS_HOST','localhost'),
    port:env('REDIS_PORT',6379),
    db:env('REDIS_DB',0),
    username:env('REDIS_USER',''),
    password:env('REDIS_PASS',''),
    connectTimeout:env('REDIS_TIMEOUT',10000)
}