import express from "express";
import sqlite3 from "sqlite3";
import path from "path";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
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

type TUpdateMethod = "add" | "remove";
function updateWatchlist(
	req: any,
	userUuid: string,
	updateMethod: TUpdateMethod,
	watchlist: TWatchlist[]
) {
	// TODO: do some kind of validation that title and year are present
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
				year: req.body.year,
			});
			break;
		default:
			break;
	}
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
}
router.put("/watchlist/:userUuid", (req, res) => {
	const { userUuid } = req.params;
	const updateMethod = req.headers["x-watchlist-update-method"];
	function isUpdateMethod(updateMethod: any): updateMethod is TUpdateMethod {
		return updateMethod === "add" || updateMethod === "remove";
	}
	usersDB.get(
		"SELECT watchlist FROM users WHERE userUuid=?",
		[userUuid],
		(err, row: any) => {
			if (err) {
				throw new Error("Watchlist could not be fetched for this user.");
			}
			if (row.watchlist && row.watchlist.length > 0) {
				const watchlist = JSON.parse(row.watchlist.split("|").join(","));
				if (isUpdateMethod(updateMethod))
					updateWatchlist(req, userUuid, updateMethod, watchlist);

				console.log("on server put watchlist body: ", watchlist);
				res.sendStatus(204);
			} else {
				const watchlist: TWatchlist[] = [];

				if (isUpdateMethod(updateMethod))
					updateWatchlist(req, userUuid, updateMethod, watchlist);
				res.sendStatus(204);
			}
		}
	);
});

router.get("/watchlist/:userUuid", (req, res) => {
	const { userUuid } = req.params;

	if (userUuid === "null") {
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
				res.send({ loginStatus: true, watchlist: row.watchlist });
				return;
			} else {
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
		async (err, row: any) => {
			if (err) {
				res.sendStatus(404);
				return;
			}
			if (row) {
				console.log("User exists");
				const isPasswordMatch: boolean = await bcrypt.compare(
					password,
					row.password
				);
				if (isPasswordMatch) {
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

router.post("/change-password/:userUuid", (req, res) => {
	const { userUuid } = req.params;
	const { oldPassword, newPassword } = req.body;

	usersDB.get(
		"SELECT password FROM users WHERE userUuid=?",
		userUuid,
		async (err, row: any) => {
			if (err) {
				res.sendStatus(404);
			}
			console.log("testing userpass: ", row.password);
			const isPasswordMatch: boolean = await bcrypt.compare(
				oldPassword,
				row.password
			);
			console.log(isPasswordMatch);
			if (row.password && isPasswordMatch) {
				res.send({ oldPasswordCorrect: true });
				const passwordHash = await bcrypt.hash(newPassword, 10);
				usersDB.run(
					"UPDATE users SET password=? WHERE userUuid=?",
					passwordHash,
					userUuid
				);
			} else {
				res.send({ oldPasswordCorrect: false });
			}
		}
	);
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
				const passwordHash = await bcrypt.hash(password, 10);
				usersDB.run(
					"INSERT INTO users (userUuid, username, password, lastLogin, isLoggedIn, watchlist) VALUES (?, ?, ?, ?, ?, ?)",
					id,
					username,
					passwordHash,
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
