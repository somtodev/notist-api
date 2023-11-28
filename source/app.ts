import express, { Express, Request, Response, json, urlencoded } from "express";
import config from "config";
import router from "./route";
import errorHandler from "./utils/handlers/error.util";
import logger from "./utils/logger.utils";

export const app: Express = express();
const PORT = config.get<number>("port") || 8000;

// Express Middlewares
app.use(urlencoded({ extended: true }));
app.use(json());

// Custom Middlewares
app.use(logger);

app.get("/", (req: Request, res: Response) => {
  res.send("Nota Api: What are you looking for ?");
});

app.use("/api", router);

// Custom Middleware
app.use(errorHandler);
