/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
const { isValidObjectId } = require("mongoose");
const Data = require("../model/dataModel");
let obj = require("mongoose").Types.ObjectId;
const Friend = require("../model/friendsModel");
const { NOTEXIST, ALREADYSENT, REQUESTSENT, ACCEPTEDREQUEST, NOTINREQUEST } = require("../utils/messages");



const friendRequestService = async (body) => {
	try {
		let check = await Data.findOne({ _id: body.id });
		if (!check) {
			return {message:NOTEXIST,status:400 };
		}
		let data = await Data.findOne({ email: body.usermail });
		// let check3 = await Friend.find({ senderid: data._id });
		// console.log(check3);
		let check2 = await Friend.findOne({ recieverid: body.id , senderid: data._id});
 		if (check2) {
			return { message: ALREADYSENT, status: 400 };
		}
		console.log(data, "//");
		console.log(data, "*");
		let request = new Friend({
			recieverid: body.id,
			senderid : data._id,
		 
             
		}); 
		request.save(); 
		return {message:REQUESTSENT, status:200};
	}
	catch (err) {
		return {message:err.message , status:400 };
	}
};

const acceptRequestService = async (body) => {
	let check = await Data.findOne({ _id: body.id });
	if (!check) {
		return { message: NOTEXIST, status: 400 };
	} 
	let data = await Data.findOne({ email: body.usermail });
	let check2 = await Friend.findOneAndUpdate({ recieverid: data._id, senderid: body.id },
		{ $set: { accepted: true } });
    
	if (!check2) {
		return { message: NOTINREQUEST, status: 400 };
	}
	return { message: ACCEPTEDREQUEST, status: 200 };

      
};   

const detailFriendService = async (body) => {
	console.log(body);
	let data = await Data.findOne({ email: body.usermail });
	console.log(data, "--");
	let check2 = await Friend.findOne({
		$or:[
		
			{ recieverid: data._id, senderid: body.id },
			{ recieverid: body.id, senderid: data._id }]
	
});
	console.log(check2.accepted, "===");
	if (!check2 || !check2.accepted) {
		return { message: NOTEXIST, status: 400 };
	}
 	let result = await Data.aggregate([
		{$match:{_id:new obj( body.id) } },
 		{
		    $project: {
		        "username": 1,
				"email": 1,
				"books":1
		    }
		} 
        
	]); 
 	return result;

};

module.exports = { friendRequestService ,detailFriendService ,acceptRequestService}; 