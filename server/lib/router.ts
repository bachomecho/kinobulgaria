import express from "express";
import fs from "fs";

const data = fs.readFileSync("sample_database.json", "utf8");

export const router = express.Router();
const movies = JSON.parse(data); // check each entry if it conforms to the movie interface

router.get("/movies", (_req, res) => {
	res.send({ data: movies });
});
