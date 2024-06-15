import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    text: String,
    start: String,
    end: String
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
