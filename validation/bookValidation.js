const Joi = require("joi");

const bookValidator = Joi.object().keys({
	authorid: Joi.string().min(4),
	title: Joi.string().lowercase(),
	preview: Joi.string().min(6).max(15).label("Password"),
	cost: Joi.number(),
	bookname: Joi.string(),
      

});

module.exports = { bookValidator };