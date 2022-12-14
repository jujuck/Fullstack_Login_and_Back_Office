const AbstractManager = require("./AbstractManager");

class CarsManager extends AbstractManager {
  constructor() {
    super({ table: "cars" });
  }

  findAll(query = 1) {
    const page = (query - 1) * 50;
    return this.connection.query(`select * from ${this.table} limit ?, 50`, [
      page,
    ]);
  }

  findCount() {
    return this.connection.query(`SELECT count(*) as pages FROM ${this.table}`);
  }
}

module.exports = CarsManager;
