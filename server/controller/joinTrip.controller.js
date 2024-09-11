import JoinRequest from "../models/joinRequest.model.js";
import User from '../models/user.model.js'
import Trip from '../models/trip.model.js'
import admin from "../firebaseAdmin.js";

export const joinTrip = async (req, res) => {
  try {
    const { tripId, userId } = req.body;

    // Check if a request already exists
    const alreadyRequested = await JoinRequest.findOne({ tripId, userId });
    if (alreadyRequested) {
      return res.status(409).json({
        success: false,
        message: "Request already sent.",
      });
    }

    // Create the join request
    const joinRequest = await JoinRequest.create({ tripId, userId });

    // Fetch the trip and creator's FCM token
    const trip = await Trip.findById(tripId).populate('creator');
    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found.",
      });
    }

    const creatorFCMToken = trip.creator.fcmToken;

    // Create the FCM notification
    const message = {
      token: creatorFCMToken,
      notification: {
        title: 'Join Request',
        body: `User ${userId} wants to join your trip ${trip.title}`,
      },
    };

    // Send the notification
    await admin.messaging().send(message);

    return res.status(200).json({ 
      success: true, 
      message: 'Join request sent and notification delivered!',
      joinRequest: joinRequest 
    });

  } catch (error) {
    console.error("Error processing join request:", error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error processing join request', 
      error: error.message 
    });
  }
};