const DB = require("../global/db");

module.exports = class Model {

    tableName() {
        return this.TABLE_NAME || this.constructor.name.toLowerCase();
    }

    primaryKey() {
        return this.PRIMARY_KEY || 'id';
    }

    async Create(data) {
        let tablename = this.tableName();
        let values = [];
        let fields = [];
        let values_arr = [];
        for(let field in data) {
            values.push(data[field]);
            fields.push(field);
            values_arr.push('?');
        }
        let sql = "INSERT INTO "+tablename+" ("+ fields.join(',') +") VALUES (" + values_arr.join(',') + ")";
        return await DB.insert(sql,values);
    }

    async Destroy(pks) {
        if(!pks) {
            return false;
        }
        let values = Array.isArray(pks)?(new Array(pks.length)).fill('?'):['?'];
        pks = Array.isArray(pks)?pks:[pks];
        return await DB.delete("DELETE FROM "+ this.tableName() + " WHERE " + this.primaryKey() + ' IN (' + values.join(',') + ')',pks);
    }

    async Save(data) {
        if(data[this.primaryKey()]) {//更新
            let pk = parseInt(data[this.primaryKey()]);
            delete data[this.primaryKey()];

            let tablename = this.tableName();
            let values = [];
            let fields = [];
            for(let field in data) {
                values.push(data[field]);
                fields.push('`' + field + '`=?');
            }
            let sql = "UPDATE "+tablename+" SET "+ fields.join(',') +" WHERE " + this.primaryKey() + ' = ' + pk;
            return await DB.update(sql,values);
        } else {
            return await this.Create(data);
        }
    }

    async Find(pk) {
        let result = await this.FindAll(pk);
        if(Array.isArray(result)) {
            return result.length ? result[0]:[];
        }
        return result;
    }

    async FindAll(pks) {
        if(!pks) {
            return false;
        }
        pks = Array.isArray(pks)?pks:[pks];
        let values = Array.isArray(pks)?(new Array(pks.length)).fill('?'):['?'];
        let sql = 'SELECT * FROM ' + this.tableName() + ' WHERE ' + this.primaryKey() + ' IN ( ' + values.join(',') + ' )';
        return await this.FindBySql(sql,pks); 
    }

    async FindBySql(sql,values) {
        return await DB.select(sql,values);
    }
}