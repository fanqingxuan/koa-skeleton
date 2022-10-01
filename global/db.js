const mysql = require('mysql2/promise');
const config = require('../config/db');
const DBError = require('../exception/DBError');

// Create the connection pool. The pool-specific settings are the defaults
const promisePool = mysql.createPool(config);

class DB {

    async execute(sql,values) {   
        try {
            const [result] = await promisePool.execute(sql,values);
        }catch(e) {
            throw new DBError(e);
        }
        return result;
    }

    // 查询
    async select(sql,values) {
        if(!sql.toUpperCase().startsWith('SELECT')) {
            throw new Error("select() only support for select record(s)");
        }
        return await this.execute(sql,values);
    }

    // 修改
    async update(sql,values) {
        if(!sql.toUpperCase().startsWith('UPDATE')) {
            throw new Error("update() only support for update record(s)");
        }
        const result = await this.execute(sql,values);
        return result.affectedRows;
    }

    //删除
    async delete(sql,values) {
        if(!sql.toUpperCase().startsWith('DELETE')) {
            throw new Error("delete() only support for delete record(s)");
        }
        const result = await this.execute(sql,values);
        return result.affectedRows;
    }
    
    // 新增
    async insert(sql,values) {
        if(!sql.toUpperCase().startsWith('INSERT')) {
            throw new Error("insert() only support for insert record(s)");
        }
        const result = await this.execute(sql,values);
        return result.insertId;
    }
}

module.exports = new DB;