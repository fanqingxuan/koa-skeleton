module.exports = function(name,defaultValue) {
    if(name in process.env) {
        return process.env[name];
    }
    return defaultValue;
}