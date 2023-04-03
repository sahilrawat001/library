/* eslint-disable no-mixed-spaces-and-tabs */

const {signupService,signinService, updateDataService, getAggregateService, getReadBooksService} = require("../services/dataService");


const signup = async (req, res) => {
 	let ans=await signupService(req.body, req.file);
 	if (ans.status==400) {
		return res.status(400).send({ message: ans.message });
	}  
   	res.status(200).cookie("token", ans.token ).send({message:"osendedk"}); 
	console.log(req.cookies,"===");
	
//	return res.status(200).send({ token: ans.token, role: ans.role });
}; 

const signin = async (req, res) => {
  	let result = await signinService(req.body);
	if (result.status==400) {
		return res.status(400).send({ message: result.message });
	}
	res.status(200).cookie("token", result.token).send(); 

//	return res.status(200).send({ token: result.token, role: result.role });
 
};

const updateData = async (req, res) => {
 	
	let result = await updateDataService(req.body, req.file);
 	if (result.status==400) {
		return res.status(400).send({ message: result.message });
	}
	return res.status(200).send({ message: result.message });	
}; 

const aggregateController = async (req, res) => {
	 console.log(req.cookies.token);
	let result = await getAggregateService(req.body);
	console.log(result);
	if (result.status == 400) {
		return res.status(400).send({ message: result.message });
	}
	return res.status(200).send({ data: result });
};
const getReadbooks = async (req, res) => {
	let result = await getReadBooksService(req.body);
	console.log(result);
	if (result.status == 400) {
		return res.status(400).send({ message: result.message });
	}
	return res.status(200).json({  result });
};
// const deleteData = async (req, res) => {
// 	let result = await deleteDataService(req.body);
// 	if (result.status == 400) {
// 		return res.status(400).send({ message: result.message });
// 	}
// 	return res.status(200).send({ message: result.message });
// };

module.exports = { signup, signin,getReadbooks, updateData, aggregateController };
 