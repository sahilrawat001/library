const multer = require("multer");
const multerFunction = multer({

	storage: multer.diskStorage({
		destination: function (req, file, func) {
			func(null, "uploads");
		},
		filename: function (req, file, fun) {
			let filetyp = /jpeg|jpg|png|gif/;
			if (!file.originalname.match(filetyp)) {
				return fun(new Error("images files allowded"));
			}
			fun(null, file.fieldname + "-" + Date.now() + "." + file.originalname.split(".")[1]);
		}

	})

}).single("image");

module.exports = multerFunction; 