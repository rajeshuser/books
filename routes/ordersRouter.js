const express = require("express");
const OrderModel = require("../models/OrderModel");
const UserModel = require("../models/UserModel");
const BookModel = require("../models/BookModel");

const ordersRouter = express.Router();

ordersRouter.get("/api/orders", async (req, res) => {
	try {
		const orders = await OrderModel.find({}).populate(["user", "books"]);
		res.status(200).send(orders);
	} catch (error) {
		res.status(500).send({
			error: error.message
		});
	}
});

module.exports = ordersRouter;
