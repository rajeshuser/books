const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
const dotenv = require("dotenv");

dotenv.config();

async function authorizationMiddleware(req, res, next) {
	try {
		const token = req.get("authorization");
		const decoded = jwt.verify(token, process.env.SECRET);
		const userDoc = await UserModel.findOne({ _id: decoded.userId });
		next();
	} catch (error) {
		res.status(400).send({
			error: error.message
		});
	}
}

module.exports = authorizationMiddleware;
