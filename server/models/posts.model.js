const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    description: {
        type: String,
    },
    media: [{
        type: String,
        required: false,
    }],
}, { timestamps: true });


const Post = mongoose.model('Post', postSchema);
export default Post
