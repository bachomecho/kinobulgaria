import supertest from "supertest";
import createServer from "../../server/app";
import apiRouter from "../../server/api";

const app = createServer();
app.use("/api", apiRouter);
const dbName = process.env.VITE_DB_NAME || null;
if (!dbName) {
    throw new Error(
        "Database file name for movies not provided in environment variables"
    );
}

describe("testing api reads and writes to the movies database", () => {
    describe("test correctness of movie site fields", () => {
        it("should return a 200 if database has no faulty entries otherwise it returns 422 for Unprocessable Entity", async () => {
            const res = await supertest(app).get(`/api/movies`);
            if (res.status !== 200) {
                console.error(
                    `Error ${res.status}:`,
                    JSON.stringify(res.body, null, 2)
                );
            }
            expect(res.status).toBe(200);
        });
    });
});
