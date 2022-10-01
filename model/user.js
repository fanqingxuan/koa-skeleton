const Model = require("./model");

class User extends Model  {

    TABLE_NAME = "users";
    PRIMARY_KEY = "id";

    async getUser(id) {
        return await this.findBySql("select * from users where id>?",[15]);
    }

    async updateUser(id) {
        return await this.update("update users set age=?",[12])
    }

    async insertUser() {
        return await this.create({age:"43",username:"json",status:32});
    }
}

module.exports = new User;