const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const uri = "mongodb+srv://admin:lHw94KvgrQzwspYO@cluster0.azfzy.mongodb.net/iliad_test?retryWrites=true&w=majority";

db.mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log("Successfully connect to MongoDB.");
		//initial();
	})
	.catch(err => {
		console.error("Connection error", err);
		process.exit();
	});

const app = express();
const PORT = 3002;

app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
	})
);
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"OPTIONS, GET, POST, PUT, PATCH, DELETE"
	);
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

app.get('/', (req, res) => { res.send("hello from my iliad server"); });

app.listen(PORT, () => { console.log(`Running on portss: http://localhost:${PORT}`); });
