class DBError {

    message = '';
    code = 0;
    errno = 0;
    sqlState = '';
    sqlMessage = '';
    sql = '';
    stack = '';

    constructor(err) {
        this.message = err.message;
        this.sql = err.sql;
        this.code = err.code;
        this.errno = err.errno;
        this.sqlState = err.sqlState;
        this.sqlMessage = err.sqlMessage;
        this.stack = this.constructor.name + ":" + err.stack.substring(6);
    }
}

module.exports = DBError;