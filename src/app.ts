import express, { Application } from "express";
import path from "node:path";
import router from "./routes";

const app: Application = express();
app.disable('x-powered-by');

app.use(express.json());
app.use("/uploads", express.static(path.resolve("uploads")));

app.use(router);

export default app;