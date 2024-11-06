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
	throw new Error(
		"Database file name for movies not provided in environment variables"
	);
}
const usersDbName = process.env.VITE_USERS_DB_NAME || null;
if (!usersDbName) {
	throw new Error(
		"Database file name for users not provided in environment variables"
	);
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
const usersDB = new sqlite3.Database(
	path.resolve(process.cwd(), filePath, usersDbName),
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

type TWatchlist = {
	id: number;
	title: string;
	year: number;
};

router.put("/watchlist/:userUuid", (req, res) => {
	const { userUuid } = req.params;
	const updateMethod = req.headers["x-watchlist-update-method"];
	let watchlist: TWatchlist[] = [];
	usersDB.get(
		"SELECT watchlist FROM users WHERE userUuid=?",
		[userUuid],
		(err, row: any) => {
			if (err) {
				throw new Error("Watchlist could not be fetched for this user.");
			}
			if (row.watchlist && row.watchlist.length > 0) {
				watchlist = JSON.parse(row.watchlist.split("|").join(","));
				switch (updateMethod) {
					case "remove":
						watchlist = watchlist?.filter(
							(movie: TWatchlist) => movie.title !== req.body.title
						);
						break;
					case "add":
						watchlist?.push({
							id: watchlist.length + 1,
							title: req.body.title,
							year: req.body.year, // TODO: do some kind of validation that title and year are present
						});
						break;
					default:
						break;
				}

				console.log("on server put watchlist body: ", watchlist);
				usersDB.run(
					"UPDATE users SET watchlist=? WHERE userUuid=?",
					[JSON.stringify(watchlist), userUuid],
					(updateErr) => {
						if (updateErr) {
							console.error("Error updating watchlist:", updateErr.message);
							return;
						}
						console.log("Watchlist updated successfully.");
					}
				);
				res.sendStatus(204);
			}
		}
	);
});

router.get("/watchlist/:userUuid", (req, res) => {
	const { userUuid } = req.params;
	console.log("get useruuid: ", userUuid);
	userUuid;

	if (userUuid === "null") {
		console.log("userUuid empty: ", userUuid);
		// send some json message and check the json in the component, that way you won't have to check for statuses
		res.send({ loginStatus: false });
		return;
	}

	usersDB.get(
		"SELECT watchlist FROM users WHERE userUuid=?",
		[userUuid],
		(err, row: any) => {
			if (err) {
				res.status(500).json({ error: err.message });
				return;
			}
			if (row) {
				console.log("yes row");
				res.send({ loginStatus: true, watchlist: row.watchlist });
				return;
			} else {
				console.log("no row");
				res.sendStatus(404);
				return;
			}
		}
	);
});

router.post("/login", (req, res) => {
	const { username, password } = req.body;

	usersDB.get(
		"SELECT userUuid, username, password FROM users WHERE username=?",
		[username],
		(err, row: any) => {
			if (err) {
				res.sendStatus(404);
				return;
			}
			console.log("User exists");
			if (row) {
				if (row.password === password) {
					console.log("Password is correct");
					res.send({
						userUuid: row.userUuid,
					});
					return;
				} else {
					res.sendStatus(401);
					return;
				}
			} else {
				res.sendStatus(404);
			}
		}
	);
});

router.post("/logout", (req, res) => {
	const { userUuid } = req.query;
	usersDB.run(
		"UPDATE users SET isLoggedIn=0 WHERE userUuid=?",
		userUuid,
		function (err) {
			if (err) {
				console.error("Error updating user:", err.message);
				return;
			}
			if (this.changes === 0) {
				console.log("No user found with the specified userUuid.");
			} else {
				console.log("User successfully logged out.");
			}
		}
	);
	res.sendStatus(200);
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

router.post("/change-password", (req, res) => {
	const { userUuid } = req.query;
	const { oldPassword, newPassword } = req.body;

	const userPass = usersDB.run(
		"SELECT password FROM users WHERE userUuid=?",
		userUuid
	);
	if (userPass) {
		if (userPass === oldPassword) {
			res.send({ oldPasswordCorrect: true });
			usersDB.run(
				"UPDATE users SET password=? WHERE userUuid=?",
				newPassword,
				userUuid
			);
		} else {
			res.send({ oldPasswordCorrect: false });
		}
	} else {
		throw new Error(`User with following id does not exist ${userUuid}`);
	}
});

router.post("/register", (req, res) => {
	const { username, password } = req.body;
	usersDB.get(
		`SELECT * FROM users WHERE username=?`,
		[username],
		async (getErr, row: any) => {
			if (getErr) {
				console.error(
					"Error checking if username is available:",
					getErr.message
				);
				return;
			}
			if (row) {
				return res.send({ successfulRegistration: false });
			} else {
				const id: string = uuid();
				const date = new Date();
				usersDB.run(
					"INSERT INTO users (userUuid, username, password, lastLogin, isLoggedIn, watchlist) VALUES (?, ?, ?, ?, ?, ?)",
					id,
					username,
					password,
					date.toISOString(),
					1,
					""
				);
				return res.send({ successfulRegistration: true, userUuid: id });
			}
		}
	);
});

export default router;
