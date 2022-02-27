import mongoose from 'mongoose'
const { Schema } = mongoose;

const pollSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },  
    question :{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },

    location:{
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