import express from "express";
import sqlite3 from "sqlite3";
import path from "path";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";

const router = express.Router();
let filePath = "public/assets/static";
if (process.env.VITE_ENVIRONMENT === "PROD") {
    filePath = "dist/app/assets/static";
}

const usersDbName = process.env.VITE_USERS_DB_NAME || null;
if (!usersDbName) {
    throw new Error(
        "Database file name for users not provided in environment variables"
    );
}

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
                const isPasswordMatch: boolean = await bcrypt.compare(
                    password,
                    row.password
                );
                if (isPasswordMatch) {
                    const date = new Date();
                    usersDB.run(
                        "UPDATE users SET isLoggedIn=1, lastLogin=? WHERE userUuid=?",
                        [date.toISOString(), row.userUuid]
                    );
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
            const isPasswordMatch: boolean = await bcrypt.compare(
                oldPassword,
                row.password
            );
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
    const { username, password, confirmPassword } = req.body;
    if (!username || !password || !confirmPassword) {
        res.send({
            successfulRegistration: false,
            message: "missingCredentials",
        });
        return;
    }
    if (password !== confirmPassword) {
        res.send({
            successfulRegistration: false,
            message: "passwordMismatch",
        });
        return;
    }
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
                return res.send({
                    successfulRegistration: false,
                    message: "existingUser",
                });
            } else {
                const id: string = uuid();
                const date = new Date();
                const passwordHash = await bcrypt.hash(password, 10);
                usersDB.run(
                    "INSERT INTO users (userUuid, username, password, lastLogin, isLoggedIn, watchlist, registrationDate) VALUES (?, ?, ?, ?, ?, ?, ?)",
                    id,
                    username,
                    passwordHash,
                    date.toISOString(),
                    1,
                    "",
                    date.toISOString()
                );
                return res.send({ successfulRegistration: true, userUuid: id });
            }
        }
    );
});
export default router;
