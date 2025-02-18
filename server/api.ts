import express from "express";
import sqlite3 from "sqlite3";
import path from "path";
import dotenv from "dotenv";
import {
    TWatchlist,
    Movie,
    MovieSite,
    IPrimaryAndOtherVideoSources,
} from "../src/types/types";
import { objectFromArray } from "../src/types/utils.js";
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
            console.log("Successfully connected to movies database.");
        }
    }
);
const usersDB = new sqlite3.Database(
    path.resolve(process.cwd(), filePath, usersDbName),
    (err: any) => {
        if (err) {
            console.error("Could not connect to db");
        } else {
            console.log("Successfully connected to user database.");
        }
    }
);

function isMovieSiteCorrect(movieSite: any): movieSite is MovieSite {
    const movieSites: MovieSite[] = [
        "youtube",
        "dailymotion",
        "vk",
        "gledambg",
        "playtube",
    ];
    return movieSites.includes(movieSite);
}
router.get("/movies", (_req, res) => {
    moviesDb.all("SELECT * FROM movies", [], (err, rows: Movie[]) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        const availableMovies: Movie[] = new Array();
        for (const row of rows) {
            const movieSiteMapping = new Map<MovieSite, string>([
                [row.site, row.video_id],
                [row.site_1, row.video_id_1],
                ["gledambg", row.gledambg_video_id],
            ]);
            movieSiteMapping.forEach((val, key, m) => {
                if (!val || !key) m.delete(key);
                else if (!isMovieSiteCorrect(key)) {
                    res.status(422).json({
                        error: `Typo or wrong site has been given to ${row.title}: ${key}`,
                    });
                    return;
                }
            });
            if (movieSiteMapping.size !== 0) {
                const mappingArray = Array.from(movieSiteMapping.entries());
                const primaryMovieInfo = objectFromArray(mappingArray.shift()!);
                const otherMovieInfo = mappingArray.map((elem) => {
                    return objectFromArray(elem);
                });
                const movieInfo: IPrimaryAndOtherVideoSources = {
                    primaryMovieInfo: primaryMovieInfo,
                    other: otherMovieInfo,
                };

                availableMovies.push(
                    Object.assign(row, { movieInfo: movieInfo })
                );
            } else {
                res.status(422).json({
                    error: `There is a missing video id and site combo for movie ${row.title}`,
                });
                return;
            }
        }
        res.send(Array.from(availableMovies));
        return;
    });
});

type TUpdateMethod = "add" | "remove";
function updateWatchlist(
    req: any,
    userUuid: string,
    updateMethod: TUpdateMethod,
    watchlist: TWatchlist[]
) {
    const body = req.body as TWatchlist;
    switch (updateMethod) {
        case "remove":
            watchlist = watchlist?.filter(
                (movie: TWatchlist) => movie.title !== req.body.title
            );
            break;
        case "add":
            watchlist?.push({
                title: body.title,
                thumbnail_name: body.thumbnail_name,
                release_year: body.release_year,
                video_id: body.video_id,
                site: body.site,
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
                throw new Error(
                    "Watchlist could not be fetched for this user."
                );
            }
            if (row.watchlist && row.watchlist.length > 0) {
                const watchlist = JSON.parse(
                    row.watchlist.split("|").join(",")
                );
                if (isUpdateMethod(updateMethod))
                    updateWatchlist(req, userUuid, updateMethod, watchlist);

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
                res.status(200).json({
                    loginStatus: true,
                    watchlist: row.watchlist,
                });
                return;
            } else {
                res.status(404).json({ loginStatus: false });
                return;
            }
        }
    );
});

router.get("/userdata/:userUuid", (req, res) => {
    const { userUuid } = req.params;

    if (userUuid === "null") {
        res.sendStatus(404);
        return;
    }

    usersDB.get(
        "SELECT watchlist, username, registrationDate FROM users WHERE userUuid=?",
        [userUuid],
        (err, row: any) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            if (row) {
                res.send({
                    loginStatus: true,
                    watchlist: row.watchlist,
                    username: row.username,
                    registrationDate: row.registrationDate,
                });
                return;
            } else {
                res.sendStatus(404);
                return;
            }
        }
    );
});

export default router;
