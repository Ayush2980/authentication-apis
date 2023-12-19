const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().min(8).max(12).required(),
});


module.exports = schema;