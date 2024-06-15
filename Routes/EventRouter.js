import express from 'express';
import Event from '../models/Event.js';
import moment from 'moment-timezone';
const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();

        //convert start and end to date from string in iso format//remove +5:30 from date

        events.forEach(event => {
            event.start = moment(event.start).format('YYYY-MM-DDTHH:mm:ss');
            event.end = moment(event.end).format('YYYY-MM-DDTHH:mm:ss');
        });


        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single event
router.get('/:id', getEvent, (req, res) => {

    console.log(res.event.start, res.event.end)

    res.json(res.event);
});

// Create an event
router.post('/', async (req, res) => {
    const text = req.body.text;
    // Convert start and end time to IST
    const start = req.body.start;
    const end = req.body.end;


    console.log(start, end)

    const event = new Event({
        text: text,
        start: start,
        end: end
    });


    try {
        const newEvent = await event.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update an event
router.put('/:id', getEvent, async (req, res) => {
    if (req.body.text != null) {
        res.event.text = req.body.text;
    }
    if (req.body.start != null) {
        res.event.start = req.body.start;
    }
    if (req.body.end != null) {
        res.event.end = req.body.end;
    }

    try {
        const updatedEvent = await res.event.save();
        res.json(updatedEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete an event
router.delete('/:id', getEvent, async (req, res) => {
    try {
        await res.event.remove();
        res.json({ message: 'Event deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function getEvent(req, res, next) {
    try {
        const event = await Event.findById(req.params.id);
        if (event == null) {
            return res.status(404).json({ message: 'Event not found' });
        }

        //change the timezone to uct 
        event.start = moment(event.start).utc().format();
        event.end = moment(event.end).utc().format();
        

        res.event = event;
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export default router;