const { default: Redis } = require("ioredis");
const config = require('../config/redis');

class RedisSingleton {

    static instance = null;

    /**
     * 
     * @returns {Redis}
     */
    static getInstance() {
        if(!RedisSingleton.instance) {
            config.showFriendlyErrorStack = true;
            config.maxRetriesPerRequest = 3;
            const redis = new Redis(config);
            redis.on('error',async function(err) {
            });
            RedisSingleton.instance = redis;
        }
        return RedisSingleton.instance;
    }
}
module.exports = RedisSingleton;