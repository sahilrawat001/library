/* eslint-disable no-undef */
const express = require("express");
let cookieParser = require("cookie-parser");

const { port, url } = require("./utils/config");
const { mongoose } = require("./utils/constants");
const { INVALIDPATH } = require("./utils/messages");



const app = express();
app.use(cookieParser());
app.use(express.json());
 
 
app.use("/data", require("./router/dataRouter")); 

app.use("/book", require("./router/bookRouter")); 

app.use("/friend", require("./router/friendRouter"));


app.use("*", (req, res) => {
	res.send({ message: INVALIDPATH });
});
mongoose.connect(url).then(
	app.listen(port)
).then(() => {
	console.log(`sucessfully running at port ${port}`);
}).catch((err) => {
	console.log(err.message);
});
