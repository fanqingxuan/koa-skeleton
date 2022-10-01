const Router = require("koa-router");
const { Logger } = require("../global/logger");
const RedisSingleton = require("../global/redis");
const user = require("../model/user");
const { success, error } = require("../utils/response");

const router = new Router();


router.get("/home",async function(ctx) {
    Logger.info("测试",'这是info');
    Logger.warn("warn测试",'这是warn');
    Logger.debug("这是debug",['这是测试内容']);
    Logger.error("这是error",{a:333});
    ctx.body = success("获取列表成功",[1,2,3,4]);
});

router.get("/list",async function(ctx) {
    const redis = RedisSingleton.getInstance();
    const result = await redis.set("name");
    const r = RedisSingleton.getInstance();
    const data = await r.get("name");
    ctx.body = success('成功',data);
});

router.get("/show",async function(ctx) {
    const data = await user.delete('16');
    ctx.body = success("成功",data);
})

router.get('/insert',async function(ctx) {
    const result = await user.Save({name:"ddd"});
    ctx.body = success("cehngg",result);
})

module.exports = router;