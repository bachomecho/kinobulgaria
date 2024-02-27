import sqlite3 from "sqlite3";
// import  dotenv from 'dotenv'
// dotenv.config()

let db = new sqlite3.Database('movies.db', sqlite3.OPEN_READONLY, (err) => {
    if (err) console.log(err)
    console.log('Connected to database')
})

db.serialize(() => {db.all(`SELECT title, thumbnail_name, video_id FROM movies`, (err, rows: any) => {
    if (err) {
        console.log(err.message)
    }
    else {
        console.log('sucessfully queried')
        // for (const row of rows) console.log(row.title)
        console.log([...rows])
    }
})})

db.close()
