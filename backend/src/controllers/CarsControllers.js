const models = require("../models");
const validate = require("../services/cars");

const browse = (req, res) => {
  models.cars
    .findAll(req.query.page)
    .then(([cars]) => {
      models.cars
        .findCount()
        .then(([count]) => {
          res.status(200).json({ cars, pages: count[0].pages / 50 });
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.cars
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const car = req.body;
  if (car) res.status(200).send(car);
  else res.status(500).send("Error on adding a new car");
};

module.exports = {
  browse,
  read,
  add,
};
