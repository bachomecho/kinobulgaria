import express from "express";
import sqlite3 from "sqlite3";
import path from "path";
import dotenv from "dotenv";
import { v4 as uuid } from "uuid";
dotenv.config();

const router = express.Router();

let filePath = "public/assets/static";
if (process.env.VITE_ENVIRONMENT === "PROD") {
	filePath = "dist/app/assets/static";
}

const dbName = process.env.VITE_DB_NAME || null;
if (!dbName) {
	throw new Error("Database file name not provided in environment variables");
}

const moviesDb = new sqlite3.Database(
	path.resolve(process.cwd(), filePath, dbName),
	(err: any) => {
		if (err) {
			console.error("Could not connect to db");
		} else {
			console.log("Successfully connected to db");
		}
	}
);

router.get("/movies", (_req, res) => {
	moviesDb.all("SELECT * FROM movies", [], (err, rows) => {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		res.send({ data: rows });
	});
});
const sampleDB = [
	{
		userUuid: "s12312dxm",
		username: "sample",
		password: "sample",
		lastLogin: new Date(),
		isLoggedIn: 0,
	},
];

router.post("/login", (req, res) => {
	const { username, password } = req.body;

	for (const entry of sampleDB) {
		if (username === entry.username) {
			console.log("User exists");
			if (password === entry.password) {
				res.send({
					credentials: {
						userUuid: entry.userUuid,
						username: username,
						password: password,
					},
				});
				console.log("Password is correct");
				return;
			} else {
				res.send({ credentials: { username: username, password: false } });
				console.log("Password is incorrect");
				return;
			}
		}
	}

	res.send({ credentials: { username: false, password: false } });
});

router.get("/is-verified/user/:token", (req, res) => {
	const { token } = req.params;
	console.log("testing token: ", token);
	if (!token) {
		console.log("no token on verification");
		res.sendStatus(401).json({ error: "Unauthorized" });
		return;
	} else {
		console.log("yes token on verification");
		res.status(200).json({ success: "User is verified" });
		usersDB.run("UPDATE users SET isLoggedIn=1 WHERE userUuid=?", [token]);
	}
});

let allUsernames: string[] = [];
for (let i = 0; i < sampleDB.length; i++) {
	allUsernames.push(sampleDB[i].username);
}
setInterval(() => {
	for (let i = 0; i < sampleDB.length; i++) {
		allUsernames.push(sampleDB[i].username);
	}

	console.log("All usernames have been fetched from the user database");
}, 10000);

router.post("/check-username", (req, res) => {
	const { username } = req.query;
	if (!allUsernames.includes(username as string)) {
		res.send({ available: true });
	} else {
		res.send({ available: false });
	}
});

router.post("/register", (req, res) => {
	const { username, password } = req.body;

	sampleDB.push({ username: username, password: password });
	res.send({ registrationStatus: true });
});

export default router;
