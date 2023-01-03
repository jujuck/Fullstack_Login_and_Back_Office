const AbstractManager = require("./AbstractManager");

class UsersManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  findOne(user) {
    return this.connection.query(
      `select * from  ${this.table} where email = ?`,
      [user.email]
    );
  }

  insert(user) {
    return this.connection.query(
      `INSERT INTO ${this.table} (email, hashedpassword, role) VALUES (?,?,?)`,
      [user.email, user.hashedPassword, "admin"]
    );
  }
}

module.exports = UsersManager;
