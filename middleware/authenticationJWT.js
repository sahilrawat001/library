const jwt = require("jsonwebtoken");
const Data = require("../model/dataModel");
const { TOKENERROR, NOTEXIST } = require("../utils/messages");
const { secret } = require("../utils/config");
 
  
 
const authenticateUser = async (req, res, next) => {
	try {

		let token = req.cookies.token;
		let result = jwt.verify(token, secret);
		console.log(result,"---");
		if (!result) {
			return { message: TOKENERROR };
		}
		else {
			let checkEmail;
			checkEmail = await Data.findOne({ email: result.email });
			if (checkEmail) {
				req.body.usermail = result.email;
				req.body.prole = result.role;
				console.log("passed");
				next();
			}
			else {
				return { error: NOTEXIST };
			}
                
		}
         
	}
	catch (err) {
		res.status(401).send({ error: err.message });
	}

};
module.exports = { authenticateUser }; 