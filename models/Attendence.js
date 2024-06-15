import mongoose from "mongoose";

const attendenceSchema = new mongoose.Schema({
    Student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
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
    ReflectingAbility : {
        type: String,
        required: true,
    },
    ratings: {
        type: Number,
    },
    Date: {
        type: String,
        required: true,
    },
});

const Attendence = mongoose.model("Attendence", attendenceSchema);

export default Attendence;
