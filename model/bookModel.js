/* eslint-disable no-mixed-spaces-and-tabs */
 
 const { mongoose } = require("../utils/constants");


const bookSchema = new mongoose.Schema({
	bookname: {
		type: String,
		minlength: 5,
		maxlength: 20,
		required: true
	},
	title: {
		type: String, 
		required: true
	},  
	preview: {
		type: String,
		required: true,
	},
	cost: {
		type: Number,
		required: true
	},
	authorid: {
		type: Object,
		required: true

	}
});

module.exports = mongoose.model("book", bookSchema);