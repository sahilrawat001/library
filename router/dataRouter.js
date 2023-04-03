const express = require("express");
const data = express.Router();

 
const multerFunction = require("../middleware/multer");
const { validateData } = require("../middleware/validatorFunction");
const { signupValidator, signinValidator, updateUserValidator } = require("../validation/dataValidation");
const { signup, signin, updateData, aggregateController, getReadbooks } = require("../controller/dataController");
const { authenticateUser } = require("../middleware/authenticationJWT");
 

// show data to normal user and also book data to publisher
data.get("/read", authenticateUser, aggregateController);
 
data.get("/booksread" , authenticateUser, getReadbooks);
 
data.post("/signup", multerFunction, validateData(signupValidator) ,signup);

data.post("/signin",  validateData(signinValidator) ,signin);  

data.put("/update", validateData(updateUserValidator), multerFunction, authenticateUser, updateData );

data.delete("/delete"  ); 



module.exports = data;

