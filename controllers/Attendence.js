import Student from "../models/Student.js";
import mongoose from "mongoose";
import Attendence from "../models/Attendence.js";

const AddAttendence = async (req, res) => {
    try {
      const { Student, Ratings, Attendance } = req.body;
      const currentDate = new Date().toISOString().split('T')[0];
  
      // Check if attendance has already been entered for the student today
      const existingAttendance = await Attendence.findOne({
        Student,
        Date: currentDate,
      });
  
      if (existingAttendance) {
        return res
          .status(409)
          .json({ message: 'Attendance already entered for today' });
      }
  
      // Create a new attendance record
      const newAttendance = new Attendence({
        Student: new mongoose.Types.ObjectId(Student),
        Ratings: {
          ListeningSkills: Ratings.ListeningSkills,
          AttentionSpan: Ratings.AttentionSpan,
          Curiosity: Ratings.Curiosity,
          ReflectingAbility: Ratings.ReflectingAbility,
        },
        Attendance,
        Date: currentDate, // Add date field to store the date of the attendance entry
      });
  
      await newAttendance.save();
  
      res.status(201).json(newAttendance);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };

const GetAttendence = async (req, res) => {
    try {
        const Attendences = await Attendence.find();
        res.status(200).json(Attendences);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const GetAttendenceById = async (req, res) => {
    try {
        const { id } = req.params;
        const Attendence = await Attendence
            .findById(id)
            .populate("Student");

        res.status(200).json(Attendence);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export { AddAttendence, GetAttendence, GetAttendenceById };