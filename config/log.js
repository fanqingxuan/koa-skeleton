const env = require("../utils/env");

module.exports = {
    level:env('LOG_LEVEL','warn')
};