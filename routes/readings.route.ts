import { Router } from "express";
import { postReadings, getReadings } from "../controllers/readings.controller"
const readingsRouter = Router();

readingsRouter.get("/", getReadings);
readingsRouter.post("/", postReadings);

export default readingsRouter
