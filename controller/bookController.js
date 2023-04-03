const { bookPublishService, ownBookService } = require("../services/bookService");


const bookPubish = async (req, res) => {
	let result = await bookPublishService(req.body); 
	if (result.status == 400) {
		return res.status(400).send({ message: result.message });
    }
    
	return res.status(200).send({ message: result.message });
};
const ownBook = async (req, res) => {
	let result = await ownBookService(req.body);
	if (result.status == 400) {
		return res.status(400).send({ message: result.message });
	}

	return res.status(200).send({ message: result.message });
};


module.exports = { bookPubish ,ownBook};