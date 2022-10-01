const { errorLogger } = require("../global/logger");
const { error } = require("../utils/response");

module.exports = async function(ctx,next) {
    try{
        await next();
    } catch(err) {
        ctx.status = err.status || 500;
        let stacks = [];
        let arr_stack = err.stack.split('\n');
        for(let i=0;i<arr_stack.length;i++) {
            if(!arr_stack[i].includes("/node_modules/")) {
                stacks.push(arr_stack[i]);
            }
        }
        let err_stack = stacks.join("\r\n");
        errorLogger.error("error",err_stack);
        ctx.body = error("服务器内部错误",500);
        return false;
    } finally {
        if(ctx.status != 200) {
            status = ctx.status;
            ctx.body = error(ctx.message,ctx.status);
            console.log(ctx.status);
            ctx.status = status;
        }
    }
}