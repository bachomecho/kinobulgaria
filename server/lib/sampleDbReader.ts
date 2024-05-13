import fs from "fs";
import path from "path";

const databaseFile = path.resolve(
	process.cwd(),
	"./dist/app/assets/static/sample_database.json"
);
const data = fs.readFileSync("sample_database.json", "utf8");
console.log(JSON.parse(data));
