const express = require("express");
  const { authenticateUser } = require("../middleware/authenticationJWT");
const { sendrequestController, acceptRequestController, detailFriendController } = require("../controller/friendController");
 const friend = express.Router();







 
//author routes
friend.route("/sendrequest").post(authenticateUser ,sendrequestController);



// user routes
friend.route("/acceptrequest").post(authenticateUser ,acceptRequestController );
friend.route("/detailfriend").post(authenticateUser,detailFriendController )

module.exports = friend;

