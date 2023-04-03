const { friendRequestService, acceptRequestService, detailFriendService } = require("../services/friendService");


const sendrequestController = async (req, res) => {
	let result = await friendRequestService(req.body);
	if (result.status == 400) {
		return res.status(400).send({ message: result.message });
	}

	return res.status(200).send({ message: result.message });
};

const acceptRequestController = async (req, res) => {
	let result = await acceptRequestService(req.body);
	if (result.status == 400) {
		return res.status(400).send({ message: result.message });
	}

	return res.status(200).send({ message: result.message });
};

const detailFriendController = async (req, res) => {
	let result = await detailFriendService(req.body);
	if (result.status == 400) {
		return res.status(400).send({ message: result.message });
	}

	return res.status(200).send({ message: result.message });
};


module.exports = { detailFriendController, sendrequestController ,acceptRequestController};