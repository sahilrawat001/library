/* eslint-disable no-mixed-spaces-and-tabs */


const { mongoose } = require("../utils/constants");


const dataSchema = new mongoose.Schema({
	username: {
		type: String,
		minlength: 5,
		maxlength: 20,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
 	},
	books: {
		type: [Object],
		required: true

	},
	role: {
		type: String,
		required: true
	},
	image: {
		type: String,
 	}
});

module.exports = mongoose.model("data", dataSchema);