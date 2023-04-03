/* eslint-disable no-mixed-spaces-and-tabs */
const obj = require("mongoose").Types.ObjectId;

const { mongoose } = require("../utils/constants");


const dataSchema = new mongoose.Schema({
	senderid: obj,
	recieverid: obj,
	accepted: {
		type: Boolean,
		default:false
	}
 
});

module.exports = mongoose.model("friend", dataSchema);