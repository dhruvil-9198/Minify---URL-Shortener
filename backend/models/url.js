import mongoose from 'mongoose';

const URLSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    short_id: {
        type: String,
        required: true,
        unique: true,
    },
    og_URL: {
        type: String,
        required: true,
    },
    visits: [{ timestamps: { type: Number } }],
},
    { timestamps: true },
);

const URL = mongoose.model('url', URLSchema);

export default URL;