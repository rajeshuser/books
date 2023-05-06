const express = require("express");
const UserModel = require("../models/UserModel");

const usersRouter = express.Router();

usersRouter.get("/api/users", async (req, res) => {
	try {
		const users = await UserModel.find({});
		res.status(200).send(users);
	} catch (error) {
		res.status(500).send({
			error: error.message
		});
	}
});

module.exports = usersRouter;
