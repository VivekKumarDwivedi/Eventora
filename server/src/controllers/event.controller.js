import { Event } from "../models/Event.js";

export async function getAllEvents(req,res){
    try{
        // filter
        const filters = {};
        if(req.query.category){
            filters.category = req.query.category;
        }
        if(req.query.ticketPrice){
            filters.ticketPrice = req.query.ticketPrice;
        }

        const events = await Event.find(filters);
        res.json(events);
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

export async function getEventById(req,res){
    try{
        const event = await Event.findById(req.params.id);
        if(!event){
            return res.status(404).json({message: "Event not found"});
        }
        res.json(event);
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

export async function createEvent(req,res){
    const { title, description, date, location, category, totalSeats, ticketPrice, imageUrl } = req.body;
    try{
        const event = await new Event({
            title,
            description,
            date,
            location,
            category,
            totalSeats,
            ticketPrice,
            imageUrl,
            createdBy: req.user._id
        });
        
        res.status(201).json(event);
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

export async function updateEvent(req,res){
     const { title, description, date, location, category, totalSeats, ticketPrice, imageUrl } = req.body
    try{
        const event = await Event.findByIdAndUpdate(req.params.id, {
            title,
            description,
            date,
            location,
            category,
            totalSeats,
            ticketPrice,
            imageUrl
        }, {new: true});
        if(!event){
            return res.status(404).json({message: "Event not found"});
        }
        res.json(event);
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

export async function deleteEvent(req,res){
    try{
        const event = await Event.findByIdAndDelete(req.params.id);
        if(!event){
            return res.status(404).json({message: "Event not found"});
        }
        res.json({message: "Event deleted successfully"});
    }catch(error){
        res.status(500).json({message: error.message});
    }
};
