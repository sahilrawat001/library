const express = require("express");
const { validateData } = require("../middleware/validatorFunction");
const { bookValidator } = require("../validation/bookValidation");
const { authenticateUser } = require("../middleware/authenticationJWT");
const { bookPubish, ownBook } = require("../controller/bookController");
const book = express.Router();


 


 

 
//author routes
book.route("/publishbook").post(validateData(bookValidator),authenticateUser, bookPubish);



// user routes
book.put("/ownbook" ,authenticateUser,ownBook );


module.exports = book; 

