import fs from "fs";
import sqlite3 from "sqlite3";
import path from "path";
// WARNING: this file is meant to be run locally to dump json into sqlite

const filePath = "public/assets/static";
// const altPath = "../../public/assets/static/movies.db"; // use this path if above does not work
const db = new sqlite3.Database(
	path.resolve(process.cwd(), filePath, "movies.db")
);

const sampleDb = fs.readFileSync("./sample_database.json", "utf8");
const jsonData = JSON.parse(sampleDb);

const createTableSql = `
CREATE TABLE IF NOT EXISTS movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    thumbnail_name TEXT,
    video_id TEXT,
    duration INTEGER,
    release_year INTEGER,
    director TEXT

)
`;
db.run(createTableSql);

// insert data into the table
const insertStatement = `INSERT INTO movies (
    title, thumbnail_name, video_id, duration, release_year, director
) VALUES (?, ?, ?, ?, ?, ?)`;

db.serialize(() => {
	db.run("BEGIN TRANSACTION");

	jsonData.forEach((item: Movie) => {
		db.run(insertStatement, [
			item.title,
			item.thumbnail_name,
			item.video_id,
			item.duration,
			item.release_year,
			item.director,
		]);
	});

	db.run("COMMIT");
});

db.close();
