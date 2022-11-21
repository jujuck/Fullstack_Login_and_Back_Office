const models = require("../models");

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

module.exports = {
  browse,
  read,
};
