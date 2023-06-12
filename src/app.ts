import express, { Express } from 'express';
import helmet from 'helmet';
import readingsRouter from "./routes/readings.route"

export const app: Express = express();

app.use(helmet());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use("/data", readingsRouter)
