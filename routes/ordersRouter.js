const express = require("express");
const OrderModel = require("../models/OrderModel");
const UserModel = require("../models/UserModel");
const BookModel = require("../models/BookModel");

const ordersRouter = express.Router();

ordersRouter.get("/api/orders", async (req, res) => {
	try {
		const orders = await OrderModel.find({});
		const populatedOrders = [];
		for (let order of orders) {
			const populatedOrder = { ...order };
			populatedOrder.user = await UserModel.findOne({ _id: order.user.valueOf() });
			populatedOrder.books = [];
			for (let i = 0; i < order.books.length; i++) {
				const book = await BookModel.findOne({ _id: order.books[i].valueOf() });
				populatedOrder.books.push();
			}
			populatedOrders.push(populatedOrder);
		}
		res.status(200).send(populatedOrders);
	} catch (error) {
		res.status(500).send({
			error: error.message
		});
	}
});

module.exports = ordersRouter;
