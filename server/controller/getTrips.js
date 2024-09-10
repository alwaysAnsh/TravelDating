import User from '../models/user.model.js'
import Trip from '../models/trip.model.js';



export const getTripDetails = async( req, res )=> {
    try {
        
        const userId = req.params.id;
        const trips = await Trip.find({creator: userId});
        // console.log("trips: ",trips)
        if (!trips || trips.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No trips found for this user.",
            });
        }
        res.status(200).json({
            success: true,
            message: "User trips fetched succesfully!",
            trips
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong fetching trips details",
            error: error,
        })
    }
}