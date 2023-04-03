/* eslint-disable no-undef */
require("dotenv").config();
const port = process.env.PORT || 5500;
const url = process.env.URL;
const imageurl = process.env.IMAGEURL;
const saltRounds = process.env.SALTROUNDS;
const secret = process.env.SECRET;
module.exports = { port, url ,imageurl ,saltRounds ,secret };