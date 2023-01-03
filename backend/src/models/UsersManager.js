const AbstractManager = require("./AbstractManager");

class UsersManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  insert(user) {
    return this.connection.query(
      `INSERT INTO ${this.table} (email, hashedpassword, role) VALUES (?,?,?)`,
      [user.email, user.hashedPassword, "admin"]
    );
  }
}

module.exports = UsersManager;
