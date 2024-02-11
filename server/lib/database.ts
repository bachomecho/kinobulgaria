import mysql, { Pool, RowDataPacket } from "mysql2";
import dotenv from "dotenv";
dotenv.config();

function customCreatePool() {
  return mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
  });
}

function establishConnection(pool_con: Pool) {
  return new Promise((resolve, reject) => {
    pool_con.getConnection((err, con) => {
      if (err || !con) {
        reject(err);
      } else {
        resolve(con);
      }
    });
  });
}

async function checkConnection() {
  const pool_con = customCreatePool();
  try {
    await establishConnection(pool_con);
    console.log("MySQL connected.");
  } catch (error) {
    console.log(`Cannot connect to MySQL. ${error}`);
  }
}

console.log("Checking connection...");
checkConnection();

// proper pool object
const pool = customCreatePool().promise();

export async function getMovies(): Promise<RowDataPacket[]> {
  const [rows] = await pool.query(
      "SELECT title, thumbnail_name, video_id FROM movies"
  );
  return rows as RowDataPacket[];
}

export async function getMovie(id: number) {
  const [entries, info] = await pool.query(`SELECT * FROM movies WHERE id=?`, [
    id,
  ]);
  console.log("selected movie is: ", (entries as RowDataPacket[])[0]);
  console.log("info about the sql database: ", info);
}

// TODO: for later
type Movie = {
  [key in
      | "title"
      | "director"
      | "duration_minutes"
      | "release_year"
      | "thumbnail_name"
      | "video_id"]: string;
};

export async function createMovie(movie: Movie) {
  const [entries] = await pool.query(
      `INSERT INTO movies (title, director, duration_minutes, release_year, thumbnail_name, video_id) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        movie.title,
        movie.director,
        movie.duration_minutes,
        movie.release_year,
        movie.thumbnail_name,
        movie.video_id,
      ]
  );
  const id = (entries as RowDataPacket).insertId;
  getMovie(id);
}
