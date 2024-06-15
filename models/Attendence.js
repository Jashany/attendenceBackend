import mongoose from "mongoose";

const attendenceSchema = new mongoose.Schema({
    Student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    ListeningSkills: {
        type: String,
        required: true,
    },
    AttentionSpan: {
        type: String,
        required: true,
    },
    Curiosity: {
        type: String,
        required: true,
    },
    ReflectingAbility: {
        type: String,
        required: true,
    },
    Ratings: {
        ListeningSkills: {
            type: Number,
            required: true,
        },
        AttentionSpan: {
            type: Number,
            required: true,
        },
        Curiosity: {
            type: Number,
            required: true,
        },
        ReflectingAbility: {
            type: Number,
            required: true,
        },
    },
    Attendance: {
        type: String,
        enum: ['Yes', 'No'],
        required: true,
    },
    Date: {
        type: String,
        required: true,
    },
});

const Attendence = mongoose.model("Attendence", attendenceSchema);

export default Attendence;
