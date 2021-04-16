const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("dotenv").config();
const { check } = require("express-validator");

const data = {
	page: 1,
	per_page: 6,
	total: 12,
	total_pages: 2,
	data: [
		{
			id: 1,
			name: "cerulean",
			year: 2000,
			color: "#98B2D1",
			pantone_value: "15-4020",
		},
		{
			id: 2,
			name: "fuchsia rose",
			year: 2001,
			color: "#C74375",
			pantone_value: "17-2031",
		},
		{
			id: 3,
			name: "true red",
			year: 2002,
			color: "#BF1932",
			pantone_value: "19-1664",
		},
		{
			id: 4,
			name: "aqua sky",
			year: 2003,
			color: "#7BC4C4",
			pantone_value: "14-4811",
		},
		{
			id: 5,
			name: "tigerlily",
			year: 2004,
			color: "#E2583E",
			pantone_value: "17-1456",
		},
		{
			id: 6,
			name: "blue turquoise",
			year: 2005,
			color: "#53B0AE",
			pantone_value: "15-5217",
		},
		{
			id: 7,
			name: "sand dollar",
			year: 2006,
			color: "#DECDBE",
			pantone_value: "13-1106",
		},
		{
			id: 8,
			name: "chili pepper",
			year: 2007,
			color: "#9B1B30",
			pantone_value: "19-1557",
		},
		{
			id: 9,
			name: "blue iris",
			year: 2008,
			color: "#5A5B9F",
			pantone_value: "18-3943",
		},
		{
			id: 10,
			name: "mimosa",
			year: 2009,
			color: "#F0C05A",
			pantone_value: "14-0848",
		},
		{
			id: 11,
			name: "turquoise",
			year: 2010,
			color: "#45B5AA",
			pantone_value: "15-5519",
		},
		{
			id: 12,
			name: "honeysuckle",
			year: 2011,
			color: "#D94F70",
			pantone_value: "18-2120",
		},
	],
	support: {
		url: "https://reqres.in/#support-heading",
		text:
			"To keep ReqRes free, contributions towards server costs are appreciated!",
	},
};

function generateAccessToken(username) {
	return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "10h" });
}

function authenticateToken(req, res, next) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (token == null) return res.sendStatus(401);

	jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
		// console.log(err);

		if (err) return res.sendStatus(403);

		req.user = user;

		next();
	});
}

app.post(
	"/api/token",
	[
		check("userId").isLength({ min: 3 }).trim().escape(),
		check("password").isLength({ min: 3 }).trim().escape(),
	],
	(req, res) => {
		const userId = req.body.userId;
		const password = req.body.password;
		if (password !== "") {
			const token = generateAccessToken({ username: userId });
			res.json({ token: "Bearer " + token });
		} else {
			return res.sendStatus(403);
		}
	}
);

app.get("/api/data", (req, res) => {
	res.json(data);
});

app.post("/api/authenticate", authenticateToken, (req, res) => {
	// executes after authenticateToken
	res.json({ tokenAuthentication: "Sucess" });
	// ...
});

app.listen(port, () => console.log(`Listening on port ${port}`));
