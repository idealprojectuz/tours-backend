const Joi = require("joi");
module.exports = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  trips: Joi.string().required(),
  roads: Joi.string().required(),
  plans_id: Joi.array().required(),
});
