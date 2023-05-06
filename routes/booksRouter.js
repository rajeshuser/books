const express = require("express");
const BookModel = require("../models/BookModel");
const authorizationMiddleware = require("../middlewares/authorizationMiddleware");

const booksRouter = express.Router();

booksRouter.get("/api/books", async (req, res) => {
	try {
		const query = req.query;
		const books = await BookModel.find(query);
		res.status(200).send(books);
	} catch (error) {
		res.status(500).send({
			error: error.message
		});
	}
});

booksRouter.get("/api/books/:id", async (req, res) => {
	try {
		const { id: _id } = req.params;
		const book = await BookModel.findOne({ _id });
		res.status(200).send(book);
	} catch (error) {
		res.status(500).send({
			error: error.message
		});
	}
});

booksRouter.post("/api/books", authorizationMiddleware, async (req, res) => {
	try {
		const book = req.body;
		const bookDoc = new BookModel(book);
		await bookDoc.save();
		res.status(201).send({
			message: "The book is added successfully"
		});
	} catch (error) {
		res.status(500).send({
			error: error.message
		});
	}
});

booksRouter.put("/api/books/:id", authorizationMiddleware, async (req, res) => {
	try {
		const { id: _id } = req.params;
		const replace = req.body;
		const bookDoc = await BookModel.findOneAndReplace({ _id }, replace, {
			returnDocument: "after"
		});
		res.status(204).send({
			message: "The book is replaced successfully"
		});
	} catch (error) {
		res.status(500).send({
			error: error.message
		});
	}
});

booksRouter.patch("/api/books/:id", authorizationMiddleware, async (req, res) => {
	try {
		const { id: _id } = req.params;
		const update = req.body;
		const bookDoc = await BookModel.findOneAndUpdate({ _id }, update, {
			returnDocument: "after"
		});
		res.status(204).send({
			message: "The book is updated successfully"
		});
	} catch (error) {
		res.status(500).send({
			error: error.message
		});
	}
});

booksRouter.delete("/api/books/:id", authorizationMiddleware, async (req, res) => {
	try {
		const { id: _id } = req.params;
		const bookDoc = await BookModel.findOneAndDelete(
			{ _id },
			{
				returnDocument: "after"
			}
		);
		res.status(202).send({
			message: "The book is deleted successfully"
		});
	} catch (error) {
		res.status(500).send({
			error: error.message
		});
	}
});

module.exports = booksRouter;
