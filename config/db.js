const env = require("../utils/env");

module.exports = {
    host: env('DB_HOST','127.0.0.1'),
    port:env('DB_PORT',3306),
    user: env('DB_USER','root'),
    password:env('DB_PASS','root'),
    database: env('DB_NAME','demo'),
    charset:env('DB_CHARSET','utf8mb4'),
}