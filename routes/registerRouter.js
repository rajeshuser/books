const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel");

const registerRouter = express.Router();

registerRouter.post("/api/register", async (req, res) => {
	try {
		const user = req.body;
		const hash = await bcrypt.hash(user.password, 3);
		user.password = hash;
		const userDoc = new UserModel(user);
		await userDoc.save();
		res.status(201).send({
			message: "The user is registered successfully"
		});
	} catch (error) {
		res.status(500).send({
			error: error.message
		});
	}
});

module.exports = registerRouter;
