const Book = require("../model/bookModel");
 
const Data = require("../model/dataModel");
const { AUTHORIZATIONERROR, BOOKNOTEXIST, UPDATESUCCESS } = require("../utils/messages");

const bookPublishService = async (body) => {
	try {
 		const { title, preview, cost, bookname,prole } = body;
		console.log("22");
		let userForId;
		userForId = await Data.findOne({email: body.usermail });
		console.log(userForId._id, "--");
		if (prole == "user") {
			return { message: AUTHORIZATIONERROR , status:400 };
		}
		const book = new Book({
			title,
			authorid:userForId._id, 
			preview,
			cost,
			bookname,
			
		});
		await book.save(); 
		return { message: "book published successfully", status: 200 };
	}
	catch (err) {
		return { message: err.message, status: 400 };
	}
};


const ownBookService = async (body) => {
	let userbookId,userData;
	console.log(body);
	userbookId = await Book.findOne({ _id: body.bookid });
	// userData = await Data.findOne({ email: body.usermail });

	console.log(userData,userbookId,"[[");
	if (!userbookId ) {
		return {message:BOOKNOTEXIST};
	}
	await Data.findOneAndUpdate({
		email:body.usermail
	}, { $push: { books: body.bookid } });
	return {message:UPDATESUCCESS ,status :200};


};

 
module.exports = { bookPublishService ,ownBookService};