const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
	{
		title: String,
		author: String,
		category: String,
		price: Number,
		quantity: Number
	},
	{
		versionKey: false
	}
);

const BookModel = mongoose.model("book", bookSchema);

module.exports = BookModel;
