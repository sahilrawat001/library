const Joi = require("joi");


const signupValidator = Joi.object().keys({
	username: Joi.string().min(4),
	email: Joi.string().email({ tlds: { allow: ["com", "in", "net"] } }).lowercase(),
	password: Joi.string().min(6).max(15).label("Password"),
	books: Joi.array().items(Joi.string()),
	role: Joi.string().valid("author", "user").lowercase().required(),
	

});


const signinValidator = Joi.object().keys({
	email: Joi.string().email({ tlds: { allow: ["com", "in", "net"] } }).lowercase().required(),
	password: Joi.string().min(6).max(15).required().label("Password"),
 
});


const updateUserValidator = Joi.object().keys({
	username: Joi.string().min(4),
	password: Joi.string().min(6).max(15).label("Password"),
});


module.exports = { signupValidator, updateUserValidator, signinValidator };