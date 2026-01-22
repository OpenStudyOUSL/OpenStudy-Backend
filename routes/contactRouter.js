import express from "express";
import { sendContactEmail } from "../controllers/contactController.js";

const contactRouter = express.Router();

contactRouter.post("/", sendContactEmail);

export default contactRouter;
