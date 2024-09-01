import Trip from '../models/trip.model.js';
import User from '../models/user.model.js';

export const createTrip = async (req, res) => {
    try {
        const { title, source, destination, itinerary, dates, budget, participants = [] } = req.body;
       
        const creator = req.user.id; // Assuming user ID is set in req.user by an auth middleware

        // Validate input fields
        if (!title || !source || !destination ||  !itinerary || !budget) {
            return res.status(400).json({
                success: false,
                message: "All fields are required, including title, source, destination, itinerary, dates, and budget.",
            });
        }

        // Ensure the creator is in the participants list
        const participantsList = participants.length > 0 ? [...participants, creator] : [creator];

        // Remove duplicates from participantsList
        const uniqueParticipants = [...new Set(participantsList)];

        // Create the trip
        const trip = await Trip.create({
            title,
            source,
            destination,
            itinerary,
            dates,
            budget,
            creator,
            participants: uniqueParticipants,
        });

        // Return the created trip
        return res.status(201).json({
            success: true,
            message: "Trip created successfully.",
            trip,
        });

    } catch (error) {
        console.error("Error creating trip:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating the trip. Please try again later.",
            error: error
        });
    }
};
