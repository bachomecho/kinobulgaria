import express from "express";
import cors from "cors"
import  { router } from "./lib/router";
import path from "path"

const app = express();
app.use(express.json());
app.use(cors())

app.use("/api", router)

app.use(express.static("dist/app"))

app.get('*', (_req, res) => {
  console.log('investigating dirname: ', __dirname) // TODO: run and test print statement
  res.sendFile(path.join(__dirname, "app/index.html"))
})

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`listening on port ${port}`));

