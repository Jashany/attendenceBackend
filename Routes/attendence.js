import { GetAttendence,AddAttendence,GetAttendenceById } from "../controllers/Attendence.js";
import express from "express";

const AttendenceRouter = express.Router();

AttendenceRouter.get("/", GetAttendence);
AttendenceRouter.post("/", AddAttendence);
AttendenceRouter.get("/:id", GetAttendenceById);

export default AttendenceRouter;

