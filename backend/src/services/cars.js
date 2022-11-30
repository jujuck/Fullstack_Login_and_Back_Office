const Joi = require("joi");
// ajouter au service
const validate = (data, type) => {
  return Joi.object({
    car_make: Joi.string().min(3).max(255).presence(type),
    car_model: Joi.string().min(3).max(255).presence(type),
    car_year_model: Joi.string().min(3).max(255).presence(type),
    color: Joi.string().min(3).max(255).presence(type),
    city: Joi.string().min(3).max(255).presence(type),
    descr: Joi.string().min(10).presence("optional"),
    title: Joi.string().min(10).presence(type),
    keyword: Joi.string().min(3).max(255).presence("optional"),
  }).validate(data, { aborEarly: false }).error;
};
module.exports = validate;
