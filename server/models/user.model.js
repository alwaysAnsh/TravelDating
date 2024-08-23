import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    token : {
        type : String,
    },
    image:{
        type: String,
    },
    role: {
        type: String,
        enum: ['creator', 'joiner'],
        required: true,
    },
    createdTrips: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Trip' 
        }
    ],
    joinedTrips: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Trip' 
        }
    ],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
}, { timestamps: true });


const User = mongoose.model('User', userSchema);
export default User
