import mongoose from 'mongoose'
const { Schema } = mongoose;

const pollSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },  
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    },
    timestamps: true 
});

module.exports = mongoose.model('Poll', pollSchema);