const Event = require('../Models/event');

//Add Event Controller

exports.addEvent = async (req, res) => {
    const { name, address, locationLink, description } = req.body;

    if (!name || !address || !locationLink || !description) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required field'
        });
    }

    try {
        const newEvent = new Event({
            name,
            address,
            locationLink,
            description,
            user: req.user.id
        });

        const event = await newEvent.save();
       
        res.status(200).json({
            success : true,
            message:"Event created successfully",
            data:event
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            success:false,
            message:"Error while Add Event"
        });
    }
};


//Get All Event Controller

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find({ user: req.user.id });
       
        res.status(200).json({
            success : true,
            message:"Data Fetched successfully",
            data:events
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            success:false,
            message:"Error while Get Events"
        });
    }
};
