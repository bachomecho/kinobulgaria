import express from "express";
import cors from "cors"
import  { router } from "./lib/router.js"; // typescript infers the .ts extension

const app = express();
app.use(express.json());
app.use(cors())

app.use("/api", router)

app.use(express.static("dist/app"))

app.get('*', (_req, res) => {
  res.sendFile("./app/index.html", {root: "./"})
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}`));
