import mysql, { Pool, RowDataPacket } from "mysql2";
import dotenv from "dotenv";
dotenv.config();

function customCreatePool() {
	return mysql.createPool({
		host: process.env.DB_HOST || "localhost",
		user: process.env.VITE_DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DATABASE || "website",
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
	const [rows] = await pool.query("SELECT * FROM movies");
	return rows as RowDataPacket[];
}
