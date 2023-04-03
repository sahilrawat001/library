/* eslint-disable no-mixed-spaces-and-tabs */
const Data = require("../model/dataModel");
const bcrypt = require("bcrypt");
const { saltRounds, secret } = require("../utils/config");
const { jwt } = require("../utils/constants");

const { ALREADYEXIST, DEFAULTIMAGE, NOTEXIST, WRONGPASSWORD, UPDATESUCCESS } = require("../utils/messages");
 
let signupService = async (body,filepath) => {
	const { username, password, email, role } = body; 
	let existingUser;
	try {
		existingUser = await Data.findOne({ email });

     
		if (existingUser) {
			return { message: ALREADYEXIST, status: 400};
		}
		const hashPassword = bcrypt.hashSync(password, parseInt(saltRounds));
		let imagePath;
		if (filepath) {
			imagePath = filepath.path;
		}
		else {
			imagePath = DEFAULTIMAGE;
		}
		const data = new Data({
			username,
			email,
			password: hashPassword,
			role,
			image: imagePath,
			books: []
		});
		let token;

 
		data.save();
		token = jwt.sign({ email: email ,role:data.role}, secret, { expiresIn: "5h" });

		return {token ,status :200};
	}
	catch (err) {
		return {message:err.message ,status:400};
	}
};
 
let signinService = async (body) => {
	const { password, email } = body;
	let existingUser;
	try {
		existingUser = await Data.findOne({ email });
		if (!existingUser) {
			return { message: NOTEXIST , status:400};
		}
		const checkUser = bcrypt.compareSync(password, existingUser.password);
		if (!checkUser) {
			return { message:  WRONGPASSWORD  ,status:400};
		}
		let token;
		token = jwt.sign({ email: email ,role:existingUser.role }, secret, { expiresIn: "5h" });
		return { token , status:200};
	}

	catch (err) {
		console.log(err.message);
		return { message:err.message ,status:400};
	}

};

const updateDataService = async (body, filepath) => {
	const { username, password } = body;
	let existingUser;
	try {
		existingUser =await Data.findOne({ email: body.usermail });
		if (!existingUser) {
			return { message: NOTEXIST };
		}   
		let imagePath;
		if (filepath) {
			imagePath = filepath.path;
		}
		else {
			imagePath = existingUser.image;
		}
        
		const hashPassword = bcrypt.hashSync(password, parseInt(saltRounds));
		await Data.findOneAndUpdate({ email: body.usermail }, { username: username, password: hashPassword ,image:imagePath});
		return { message:  UPDATESUCCESS ,status:200 };
	}
	catch (err) {
		return { message: err.message ,status:400};
	}


};

const getAggregateService = async (body) => {
	console.log(body);
	let inputMail = body.usermail;
	console.log(inputMail);
	let data = await Data.aggregate([
		{ $match: { email: inputMail } },
		
		{ $lookup: {
		  from: "books",
		  localField: "_id",
		  foreignField: "authorid",
		  as: "bookdata"
		}
		},
		{ 
			$unwind: "$bookdata"
		},
		{ $project: { _id: 1, username: 1, email: 1,books:1, "bookdata":1}}
	]);
	return data;
	//	console.log(data);
	
};


const getReadBooksService = async (body) => {
	console.log(body, "===");
	let inputMail = body.usermail;
	let data = await Data.aggregate([
		{ $match: { email: inputMail } },
	 
		{
			$lookup: {
		  from: "books",
		  localField: "books",
		  foreignField: "_id",
		  as: "bookreading"
			}
		},
		{
			$project: {
				password: 0, role: 0, books: 0, __v:0
			}}
	]);
	return data;
	
};
module.exports = { signupService, getReadBooksService, signinService,updateDataService,getAggregateService};