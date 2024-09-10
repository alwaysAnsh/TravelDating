import User from '../models/user.model.js'
import Trip from '../models/trip.model.js'


export const getAllTrips = async (req, res) => {
    try {
        
        // console.log("inside getalltrips api")
        const trips = await Trip.find().populate('creator');

        
        if (!trips || trips.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No trips found.",
            });
        }

        
        res.status(200).json({
            success: true,
            message: "All trips fetched successfully!",
            trips,
        });
    } catch (error) {
        console.error("Error fetching all trips:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong fetching all trips.",
            error: error.message,
        });
    }
};
