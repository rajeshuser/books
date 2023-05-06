const express = require("express");
const cors = require("cors");
const connection = require("./database");
const usersRouter = require("./routes/usersRouter");
const registerRouter = require("./routes/registerRouter");
const loginRouter = require("./routes/loginRouter");
const booksRouter = require("./routes/booksRouter");
const orderRouter = require("./routes/orderRouter");
const ordersRouter = require("./routes/ordersRouter");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(usersRouter);
app.use(registerRouter);
app.use(loginRouter);
app.use(booksRouter);
app.use(orderRouter);
app.use(ordersRouter);

app.get("/", (req, res) => {
	res.status(200).send({
		message: "Home"
	});
});

connectThenListen();

async function connectThenListen() {
	try {
		await connection;
		console.log("The app is connected to the mongodb");
		await app.listen(process.env.PORT);
		console.log("The app is listening at", `http://localhost:${process.env.PORT}`);
	} catch (error) {
		console.log({ error: error.message });
	}
}
