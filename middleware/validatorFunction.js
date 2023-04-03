/* eslint-disable no-undef */
 
function validateData(schema) {
	return (req, res, next) => {
		const result = schema.validate(req.body);
		if (result.error) {
			res.status(400).send({ error: result.error.message });
		}
		else {
			next();
		}
	};
}



module.exports = { validateData };