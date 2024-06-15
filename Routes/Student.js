import { getStudents,addStudents,getStudentById } from "../controllers/Student.js";

import express from "express";

const StudentRouter = express.Router();

StudentRouter.get("/", getStudents);
StudentRouter.post("/", addStudents);
StudentRouter.get("/:id", getStudentById);

export default StudentRouter;

