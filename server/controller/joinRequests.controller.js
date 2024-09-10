import User from '../models/user.model.js'
import Trip from '../models/trip.model.js'
import JoinRequest from '../models/joinRequest.model.js'



export const getJoinRequests = async (req, res) => {
    try {
      const userId = req.params.userId; 
  
      // Fetch all join requests for trips where the user is the creator
      // First, find the trips created by this user
      const tripsCreatedByUser = await Trip.find({ creator: userId });
  
      // Extract the IDs of the trips created by the user
      const tripIds = tripsCreatedByUser.map(trip => trip._id);
      // console.log("trip ids: ", tripIds)

      // Find join requests for the trips created by the user
      const requests = await JoinRequest.find({ tripId: { $in: tripIds } })
        .populate('tripId') 
        .populate('userId'); 
  
      if (requests.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No join requests found for your trips."
        });
      }
  
     
      res.status(200).json({
        success: true,
        message: "Join requests fetched successfully!",
        requests,
      });
    } catch (error) {
      console.error("Error fetching join requests:", error);
      res.status(500).json({
        success: false,
        message: "Something went wrong while fetching join requests.",
        error: error.message,
      });
    }
  };
  

