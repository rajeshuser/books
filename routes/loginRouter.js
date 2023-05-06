const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
const dotenv = require("dotenv");

dotenv.config();

const loginRouter = express.Router();

loginRouter.post("/api/login", async (req, res) => {
	try {
		const userCredentials = req.body;
		const userDoc = await UserModel.findOne({ email: userCredentials.email });
		if (userDoc) {
			const isPasswordCorrect = await bcrypt.compare(
				userCredentials.password,
				userDoc.password
			);
			if (isPasswordCorrect) {
				const token = jwt.sign({ userId: userDoc._id }, process.env.SECRET);
				res.status(201).send({ token });
			} else {
				res.status(404).send({
					error: "Password is wrong"
				});
			}
		} else {
			res.status(404).send({
				error: "User not found"
			});
		}
	} catch (error) {
		res.status(500).send({
			error: error.message
		});
	}
});

module.exports = loginRouter;
