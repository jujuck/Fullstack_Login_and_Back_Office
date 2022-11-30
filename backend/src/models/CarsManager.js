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

  insert(car) {
    return this.connection.query(
      `INSERT INTO ${this.table} (car_make, car_model, car_year_model, color, city, descr, title, keyword) VALUES (?,?,?,?,?,?,?,?)`,
      [
        car.car_make,
        car.car_model,
        car.car_year_model,
        car.color,
        car.city,
        car.descr,
        car.title,
        car.keyword,
      ]
    );
  }
}

module.exports = CarsManager;
