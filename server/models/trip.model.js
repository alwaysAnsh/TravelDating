import mongoose from 'mongoose'

const tripSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    itinerary: {
        type: String,
        required: true,
    },
    dates: {
        start: 
        { 
            type: Date, 
            required: true 
        },
        end: 
        { 
            type: Date, 
            required: true 
        },
    },
    budget: {
        type: Number,
        required: true,
    },
    participants: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        }
    ],
    creator: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
}, { timestamps: true });


const Trip = mongoose.model('Trip', tripSchema);
export default Trip
