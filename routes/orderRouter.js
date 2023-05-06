const express = require("express");
const OrderModel = require("../models/OrderModel");

const orderRouter = express.Router();

orderRouter.post("/api/order", async (req, res) => {
	try {
		const order = req.body;
		const orderDoc = new OrderModel(order);
		await orderDoc.save();
		res.status(201).send({
			message: "The order is placed successfully"
		});
	} catch (error) {
		res.status(500).send({
			error: error.message
		});
	}
});

module.exports = orderRouter;
