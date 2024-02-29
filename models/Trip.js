import { Schema, model } from "mongoose"

const tripSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        category: {
            type: String,
            enum: ['land', 'sea', 'flight'],
            required: true
        },
        interests: {
            type: [String],
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        duration: {
            type: Number
        },
        price: {
            type: Number,
            required: true
        },
        images: {
            type: [String],
            required: true
        },
        capacity: {
            type: Number,
            required: true
        },
        reservedPlaces: {
            type: Number
        },
        country: {
            type: String,
            required: true
        },
        hotel: {
            type: String,
            required: true
        },
        users: {
            type: [Schema.Types.ObjectId],
            ref: 'Users'
        }
    },
    {
        timestamps: true
    }
)

const trips = model('Trips', tripSchema)

export default trips