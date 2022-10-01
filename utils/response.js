module.exports = {
    success:function(message,data) {
        return {
            code:0,
            message:message,
            data:data
        }
    },
    error:function(message,code) {
        return {
            code:code || 1,
            message:message,
            data:[]
        }
    }
}